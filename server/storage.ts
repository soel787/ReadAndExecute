import type { Product, Order } from "@shared/schema";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  cacheProducts(products: Product[]): void;
  getCachedProducts(): Product[] | null;
}

export class MemStorage implements IStorage {
  private productsCache: Product[] | null = null;
  private cacheTime: number = 0;
  private readonly cacheDuration = 5 * 60 * 1000;

  async getProducts(): Promise<Product[]> {
    return this.productsCache || [];
  }

  cacheProducts(products: Product[]): void {
    this.productsCache = products;
    this.cacheTime = Date.now();
  }

  getCachedProducts(): Product[] | null {
    if (this.productsCache && Date.now() - this.cacheTime < this.cacheDuration) {
      return this.productsCache;
    }
    return null;
  }
}

export const storage = new MemStorage();
