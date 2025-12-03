import { Mail, Phone, MapPin, Truck, Package, Clock, MessageCircle } from "lucide-react";
import { SiTelegram } from "react-icons/si";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Contacts() {
  return (
    <div className="min-h-screen pb-16">
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Контакты
            </h1>
            <p className="text-lg text-muted-foreground">
              Свяжитесь с нами удобным способом. Мы всегда на связи!
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Card className="bg-card/60 backdrop-blur-md border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                Связаться с нами
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <a
                href="https://t.me/pdfola"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-[#0088cc]/10 border border-[#0088cc]/20 hover:bg-[#0088cc]/20 transition-colors group"
                data-testid="link-contact-telegram"
              >
                <div className="w-12 h-12 rounded-full bg-[#0088cc]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <SiTelegram className="h-6 w-6 text-[#0088cc]" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Telegram</p>
                  <p className="text-sm text-muted-foreground">@pdfola</p>
                </div>
              </a>

              <a
                href="mailto:tudunovs@gmail.com"
                className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border border-border/50 hover:bg-muted transition-colors group"
                data-testid="link-contact-email"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">tudunovs@gmail.com</p>
                </div>
              </a>

              <a
                href="tel:+79834232305"
                className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border border-border/50 hover:bg-muted transition-colors group"
                data-testid="link-contact-phone"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Телефон</p>
                  <p className="text-sm text-muted-foreground">+7 983 423-23-05</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border border-border/50">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Адрес</p>
                  <p className="text-sm text-muted-foreground">г. Улан-Удэ</p>
                </div>
              </div>

              <Button
                asChild
                className="w-full bg-gradient-to-r from-primary to-[#ff1493] hover:from-primary/90 hover:to-[#ff1493]/90 text-white font-medium shadow-lg shadow-primary/25 mt-4"
              >
                <a
                  href="https://t.me/pdfola"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-write-telegram"
                >
                  <SiTelegram className="h-5 w-5 mr-2" />
                  Написать в Telegram
                </a>
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-card/60 backdrop-blur-md border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  Доставка
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-600 dark:text-green-400">
                      Бесплатно по Улан-Удэ
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Доставим в удобное для вас место
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="font-medium text-foreground">По России:</p>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Package className="h-4 w-4 text-primary" />
                      СДЭК
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Package className="h-4 w-4 text-primary" />
                      Почта России
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Package className="h-4 w-4 text-primary" />
                      Авито доставка
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                  <Clock className="h-4 w-4" />
                  Срок доставки: 1-5 дней
                </div>

                <p className="text-sm text-muted-foreground border-t border-border/50 pt-4">
                  Стоимость доставки по России обсуждается в Telegram
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur-md border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Выкуп товаров из Китая
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Мы можем выкупить для вас товары из Китая. Напишите нам в Telegram
                  для уточнения деталей и стоимости.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
