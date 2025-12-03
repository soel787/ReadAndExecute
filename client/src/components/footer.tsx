import { Link } from "wouter";
import { Sparkles, Send, Mail, Phone, MapPin, Truck } from "lucide-react";
import { SiTelegram } from "react-icons/si";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="relative">
                <Sparkles className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-[#ff1493] bg-clip-text text-transparent">
                GlowShop
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Магазин модной одежды в Улан-Удэ. Качественные вещи по доступным ценам.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Контакты</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://t.me/pdfola"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                  data-testid="link-footer-telegram"
                >
                  <SiTelegram className="h-4 w-4" />
                  @pdfola
                </a>
              </li>
              <li>
                <a
                  href="mailto:tudunovs@gmail.com"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                  data-testid="link-footer-email"
                >
                  <Mail className="h-4 w-4" />
                  tudunovs@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+79834232305"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                  data-testid="link-footer-phone"
                >
                  <Phone className="h-4 w-4" />
                  +7 983 423-23-05
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Улан-Удэ
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Доставка</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-green-500" />
                <span className="text-green-500 font-medium">Бесплатно</span> по Улан-Удэ
              </li>
              <li className="flex items-start gap-2">
                <Send className="h-4 w-4 mt-0.5 shrink-0" />
                <span>По России: СДЭК, Почта России, Авито доставка (1-5 дней)</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Как заказать</h3>
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li>Выберите товар в каталоге</li>
              <li>Нажмите "Заказать"</li>
              <li>Укажите размер и Telegram</li>
              <li>Мы свяжемся с вами</li>
            </ol>
            <p className="text-xs text-muted-foreground mt-4">
              Также выкупаем товары из Китая. Подробности в Telegram.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} GlowShop. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
