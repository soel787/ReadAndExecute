import { useState } from "react";
import { ShoppingBag, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  onOrder: (product: Product) => void;
}

export function ProductCard({ product, onOrder }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price);
  };

  return (
    <div
      className="group relative rounded-xl overflow-hidden bg-card/60 backdrop-blur-md border border-border/50 transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
      data-testid={`card-product-${product.id}`}
    >
      <div className="absolute top-3 right-3 z-10">
        <Badge
          variant={product.inStock ? "default" : "destructive"}
          className={`text-xs font-medium ${
            product.inStock
              ? "bg-green-500/90 hover:bg-green-500/90 text-white"
              : "bg-red-500/90 hover:bg-red-500/90 text-white"
          }`}
          data-testid={`badge-stock-${product.id}`}
        >
          {product.inStock ? (
            <>
              <Check className="h-3 w-3 mr-1" />
              В наличии
            </>
          ) : (
            <>
              <X className="h-3 w-3 mr-1" />
              Нет в наличии
            </>
          )}
        </Badge>
      </div>

      <div className="aspect-[4/5] relative overflow-hidden bg-muted/30">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
          </div>
        ) : (
          <img
            src={product.imageUrl}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onError={() => setImageError(true)}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        )}
      </div>

      <div className="p-4 space-y-3">
        <h3
          className="font-semibold text-foreground line-clamp-2 min-h-[2.5rem]"
          data-testid={`text-product-name-${product.id}`}
        >
          {product.name}
        </h3>

        <p
          className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]"
          data-testid={`text-product-description-${product.id}`}
        >
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span
            className="text-xl font-bold text-primary"
            data-testid={`text-product-price-${product.id}`}
          >
            {formatPrice(product.price)} ₽
          </span>
        </div>

        <Button
          className="w-full bg-gradient-to-r from-primary to-[#ff1493] hover:from-primary/90 hover:to-[#ff1493]/90 text-white font-medium shadow-lg shadow-primary/25 transition-all duration-300"
          onClick={() => onOrder(product)}
          disabled={!product.inStock}
          data-testid={`button-order-${product.id}`}
        >
          <ShoppingBag className="h-4 w-4 mr-2" />
          {product.inStock ? "Заказать" : "Нет в наличии"}
        </Button>
      </div>
    </div>
  );
}
