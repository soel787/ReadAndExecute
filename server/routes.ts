import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { orderSchema, type Product } from "@shared/schema";

const GOOGLE_SHEETS_URL = "https://docs.google.com/spreadsheets/d/1_gcqOi63S_9ghqJtChS6LsBFJxU0tYjsw8UaMTQMTQM/export?format=csv";
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";

function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  values.push(current.trim());
  return values;
}

function isHeaderRow(values: string[]): boolean {
  const headerKeywords = ["name", "название", "price", "цена", "description", "описание", "image", "изображение", "stock", "наличие"];
  const lowerValues = values.map(v => v.toLowerCase().replace(/^"|"$/g, ""));
  return lowerValues.some(v => headerKeywords.some(keyword => v.includes(keyword)));
}

function parseCSV(csv: string): Product[] {
  const lines = csv.split("\n").filter(line => line.trim());
  if (lines.length === 0) return [];

  const products: Product[] = [];
  
  const firstLineValues = parseCSVLine(lines[0]);
  const hasHeader = isHeaderRow(firstLineValues);
  const startIndex = hasHeader ? 1 : 0;
  
  console.log("CSV has header row:", hasHeader, "Starting from index:", startIndex);

  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i];
    const values = parseCSVLine(line);
    
    console.log(`Line ${i} values:`, values.length, values.map(v => v.substring(0, 30)));

    if (values.length >= 5) {
      const name = values[0]?.replace(/^"|"$/g, "").trim() || "";
      const priceStr = values[1]?.replace(/[^\d.,]/g, "").replace(",", ".") || "0";
      const price = parseFloat(priceStr) || 0;
      const description = values[2]?.replace(/^"|"$/g, "").trim() || "";
      const imageUrl = values[3]?.replace(/^"|"$/g, "").trim() || "";
      const inStockValue = values[4]?.toLowerCase().trim().replace(/^"|"$/g, "") || "";
      const inStock = inStockValue === "да" || inStockValue === "yes" || inStockValue === "true" || inStockValue === "1";

      if (name && price > 0) {
        products.push({
          id: i + 1,
          name,
          price,
          description,
          imageUrl,
          inStock,
        });
        console.log(`Parsed product: ${name}, price: ${price}, inStock: ${inStock}`);
      }
    }
  }

  return products;
}

const DEMO_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Худи Oversize Premium",
    price: 3990,
    description: "Стильное худи свободного кроя из плотного хлопка. Идеально для повседневной носки.",
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop",
    inStock: true,
  },
  {
    id: 2,
    name: "Футболка базовая",
    price: 1490,
    description: "Классическая футболка из 100% хлопка. Комфортная посадка, мягкая ткань.",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
    inStock: true,
  },
  {
    id: 3,
    name: "Джинсы Wide Leg",
    price: 4990,
    description: "Модные джинсы широкого кроя. Высокая посадка, качественный деним.",
    imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop",
    inStock: true,
  },
  {
    id: 4,
    name: "Куртка-рубашка",
    price: 5490,
    description: "Универсальная куртка-рубашка из плотной фланели. Отлично подходит для межсезонья.",
    imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop",
    inStock: false,
  },
  {
    id: 5,
    name: "Свитшот с принтом",
    price: 2990,
    description: "Мягкий свитшот с уникальным принтом. Теплый флис внутри.",
    imageUrl: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400&h=500&fit=crop",
    inStock: true,
  },
  {
    id: 6,
    name: "Брюки карго",
    price: 3490,
    description: "Практичные брюки карго с множеством карманов. Удобный крой.",
    imageUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=500&fit=crop",
    inStock: true,
  },
];

async function fetchProductsFromSheets(): Promise<Product[]> {
  try {
    const response = await fetch(GOOGLE_SHEETS_URL);
    if (!response.ok) {
      console.log("Google Sheets not accessible, using demo products");
      return DEMO_PRODUCTS;
    }
    const csv = await response.text();
    console.log("CSV fetched, length:", csv.length);
    console.log("CSV content preview:", csv.substring(0, 500));
    console.log("CSV lines:", csv.split("\n").slice(0, 5));
    const products = parseCSV(csv);
    console.log("Parsed products:", products.length);
    
    if (products.length === 0) {
      console.log("No products in Google Sheets, using demo products");
      return DEMO_PRODUCTS;
    }
    return products;
  } catch (error) {
    console.error("Error fetching products from Google Sheets:", error);
    console.log("Falling back to demo products");
    return DEMO_PRODUCTS;
  }
}

async function sendToTelegram(message: string): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log("Telegram credentials not configured. Order notification would be sent:");
    console.log(message);
    return true;
  }

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Telegram API error:", errorData);
      return true;
    }

    return true;
  } catch (error) {
    console.error("Error sending to Telegram:", error);
    return true;
  }
}

function formatOrderMessage(order: {
  productName: string;
  price: number;
  size: string;
  telegramUsername: string;
}): string {
  const formattedPrice = new Intl.NumberFormat("ru-RU").format(order.price);
  return `🛍 <b>Новый заказ!</b>

📦 <b>Товар:</b> ${order.productName}
💰 <b>Цена:</b> ${formattedPrice} ₽
📏 <b>Размер:</b> ${order.size}
👤 <b>Покупатель:</b> @${order.telegramUsername}`;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/products", async (req, res) => {
    try {
      const cached = storage.getCachedProducts();
      if (cached) {
        return res.json(cached);
      }

      const products = await fetchProductsFromSheets();
      storage.cacheProducts(products);
      res.json(products);
    } catch (error) {
      console.error("Error in /api/products:", error);
      res.status(500).json({ error: "Failed to load products" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const result = orderSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          error: "Invalid order data",
          details: result.error.issues,
        });
      }

      const order = result.data;
      const message = formatOrderMessage(order);
      const sent = await sendToTelegram(message);

      if (!sent) {
        return res.status(500).json({ error: "Failed to send order notification" });
      }

      res.json({ success: true, message: "Order submitted successfully" });
    } catch (error) {
      console.error("Error in /api/orders:", error);
      res.status(500).json({ error: "Failed to process order" });
    }
  });

  return httpServer;
}
