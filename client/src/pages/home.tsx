import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Sparkles, Truck, Package, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { OrderModal } from "@/components/order-modal";
import { Button } from "@/components/ui/button";
import type { Product } from "@shared/schema";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#ff1493]/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              Магазин модной одежды
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-foreground">
              Добро пожаловать в{" "}
              <span className="bg-gradient-to-r from-primary to-[#ff1493] bg-clip-text text-transparent">
                GlowShop
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Выбирайте стильную одежду из нашего каталога. Доставляем по всей России!
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
                <Truck className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  Бесплатно по Улан-Удэ
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <Package className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  По России 1-5 дней
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex-1 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground" data-testid="text-catalog-title">
              Каталог
            </h2>
            {products && (
              <span className="text-sm text-muted-foreground" data-testid="text-products-count">
                {products.length} товаров
              </span>
            )}
          </div>

          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="h-10 w-10 text-primary animate-spin" />
              <p className="text-muted-foreground">Загрузка каталога...</p>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10">
                <AlertCircle className="h-8 w-8 text-destructive" />
              </div>
              <p className="text-muted-foreground text-center">
                Не удалось загрузить товары
              </p>
              <Button
                variant="outline"
                onClick={() => refetch()}
                className="gap-2"
                data-testid="button-retry-load"
              >
                <RefreshCw className="h-4 w-4" />
                Попробовать снова
              </Button>
            </div>
          )}

          {products && products.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted">
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-center">
                Каталог пуст. Скоро появятся новые товары!
              </p>
            </div>
          )}

          {products && products.length > 0 && (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              data-testid="grid-products"
            >
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOrder={setSelectedProduct}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedProduct && (
        <OrderModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
