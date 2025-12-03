import { useState } from "react";
import { X, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { SiTelegram } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Product, Size } from "@shared/schema";
import { sizes } from "@shared/schema";

interface OrderModalProps {
  product: Product;
  onClose: () => void;
}

export function OrderModal({ product, onClose }: OrderModalProps) {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [telegramUsername, setTelegramUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedSize) {
      setError("Выберите размер");
      return;
    }

    const cleanUsername = telegramUsername.replace("@", "").trim();
    if (!cleanUsername) {
      setError("Введите ваш Telegram username");
      return;
    }

    if (cleanUsername.length < 3) {
      setError("Username должен содержать минимум 3 символа");
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(cleanUsername)) {
      setError("Username может содержать только латинские буквы, цифры и _");
      return;
    }

    setIsSubmitting(true);

    try {
      await apiRequest("POST", "/api/orders", {
        productName: product.name,
        price: product.price,
        size: selectedSize,
        telegramUsername: cleanUsername,
      });

      setIsSuccess(true);
      toast({
        title: "Заказ отправлен!",
        description: "Мы свяжемся с вами в Telegram.",
      });

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError("Не удалось отправить заказ. Попробуйте позже.");
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заказ",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      data-testid="modal-order"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-3 right-3 z-10"
          onClick={onClose}
          aria-label="Закрыть"
          data-testid="button-close-modal"
        >
          <X className="h-5 w-5" />
        </Button>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Заказ отправлен!</h3>
            <p className="text-muted-foreground">
              Мы свяжемся с вами в Telegram для уточнения деталей заказа и доставки.
            </p>
          </div>
        ) : (
          <>
            <div className="p-6 border-b border-border/50">
              <div className="flex gap-4">
                <div className="w-20 h-24 rounded-lg overflow-hidden bg-muted/30 shrink-0">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground line-clamp-2" data-testid="text-modal-product-name">
                    {product.name}
                  </h3>
                  <p className="text-xl font-bold text-primary mt-2" data-testid="text-modal-product-price">
                    {formatPrice(product.price)} ₽
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-medium">Выберите размер</Label>
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Размер">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                        selectedSize === size
                          ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                          : "bg-muted/50 text-foreground border-border/50 hover:border-primary/50"
                      }`}
                      role="radio"
                      aria-checked={selectedSize === size}
                      data-testid={`button-size-${size}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="telegram" className="text-sm font-medium flex items-center gap-2">
                  <SiTelegram className="h-4 w-4 text-[#0088cc]" />
                  Ваш Telegram (без @)
                </Label>
                <Input
                  id="telegram"
                  type="text"
                  placeholder="username"
                  value={telegramUsername}
                  onChange={(e) => setTelegramUsername(e.target.value.replace("@", ""))}
                  className="bg-muted/30 border-border/50 focus:border-primary"
                  data-testid="input-telegram-username"
                />
                <p className="text-xs text-muted-foreground">
                  Мы напишем вам для уточнения деталей заказа
                </p>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-[#ff1493] hover:from-primary/90 hover:to-[#ff1493]/90 text-white font-medium shadow-lg shadow-primary/25"
                data-testid="button-submit-order"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Заказать
                  </>
                )}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
