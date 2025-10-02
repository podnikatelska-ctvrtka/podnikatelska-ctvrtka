import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar, Clock, Phone, Mail, MessageCircle, CheckCircle, User, ExternalLink } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface BookingModalProps {
  children: React.ReactNode;
  variant?: "consultation" | "demo" | "callback";
}

export function BookingModal({ children, variant = "consultation" }: BookingModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingMethod, setBookingMethod] = useState<"form" | "external">("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    businessType: "",
    timePreference: "",
    message: "",
    urgency: "normal"
  });

  // Externí booking systémy - nahraďte vlastními URL
  const externalBookingUrls = {
    consultation: "https://calendly.com/your-business/canvas-consultation", // Nahraďte svým Calendly URL
    demo: "https://tidycal.com/your-business/canvas-demo", // Nahraďte svým Tidy Cal URL
    callback: "mailto:info@vase-firma.cz?subject=Callback request&body=Prosím zavolejte mi zpět"
  };

  const titles = {
    consultation: "Objednat kurz Podnikatelské čtvrtky za 4.999 Kč",
    demo: "Ukázka z kurzu zdarma", 
    callback: "Zavolejte mi zpět"
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleExternalBooking = () => {
    const url = externalBookingUrls[variant];
    window.open(url, '_blank');
    setIsOpen(false);
    
    toast.success("Přesměrování na rezervační systém...");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Integrace s booking systémy:
      
      // 1. TIDY CAL API
      // const tidyCalResponse = await fetch('https://api.tidycal.com/v1/bookings', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': 'Bearer YOUR_TIDY_CAL_API_KEY',
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     event_type_id: 'your-event-type-id',
      //     name: formData.name,
      //     email: formData.email,
      //     phone: formData.phone,
      //     notes: `${formData.business} - ${formData.message}`,
      //     time_preference: formData.timePreference
      //   })
      // });

      // 2. CALENDLY API
      // const calendlyResponse = await fetch('https://api.calendly.com/scheduled_events', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': 'Bearer YOUR_CALENDLY_ACCESS_TOKEN',
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     event_type: 'your-event-type-uuid',
      //     invitee: {
      //       name: formData.name,
      //       email: formData.email,
      //       phone: formData.phone
      //     }
      //   })
      // });

      // 3. GOOGLE CALENDAR API
      // const googleCalendarResponse = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': 'Bearer YOUR_GOOGLE_ACCESS_TOKEN',
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     summary: `Konzultace Podnikatelské čtvrtky - ${formData.name}`,
      //     description: `Podnik: ${formData.business}\nTelefon: ${formData.phone}\nPozn: ${formData.message}`,
      //     attendees: [{ email: formData.email }],
      //     start: { dateTime: '2024-01-01T10:00:00Z' },
      //     end: { dateTime: '2024-01-01T10:45:00Z' }
      //   })
      // });

      // 4. EMAIL NOTIFICATIONS (např. EmailJS, SendGrid)
      // await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     service_id: 'YOUR_SERVICE_ID',
      //     template_id: 'YOUR_TEMPLATE_ID',
      //     user_id: 'YOUR_USER_ID',
      //     template_params: {
      //       to_email: formData.email,
      //       from_name: 'Expert na Podnikatelskou čtvrtku',
      //       client_name: formData.name,
      //       business_name: formData.business,
      //       phone: formData.phone,
      //       message: formData.message
      //     }
      //   })
      // });

      // 5. WEBHOOK k vašemu systému
      // await fetch('https://your-webhook-url.com/booking', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     ...formData,
      //     variant,
      //     timestamp: new Date().toISOString()
      //   })
      // });

      // Simulace API volání pro demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (process.env.NODE_ENV === 'development') {
        console.log("Booking data:", { ...formData, variant });
      }
      
      setStep(3);
      setIsSubmitting(false);
      
      toast.success("Konzultace byla úspěšně naplánována!");
      
      // Zavření modalu po 3 sekundách
      setTimeout(() => {
        setIsOpen(false);
        setStep(1);
        setBookingMethod("form");
        setFormData({
          name: "",
          email: "",
          phone: "",
          business: "",
          businessType: "",
          timePreference: "",
          message: "",
          urgency: "normal"
        });
      }, 3000);

    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Booking error:", error);
      }
      toast.error("Něco se pokazilo. Zkuste to prosím znovu.");
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name && formData.email && formData.phone && formData.business;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            {titles[variant]}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            {variant === "consultation" 
              ? "Získejte přístup k nejúspěšnějšímu business nástroji současnosti" 
              : variant === "demo" 
              ? "Podívejte se na ukázky z kurzu a rozhodněte se"
              : "Napište nám a my vám zavoláme zpět"}
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 py-4"
            >
              {/* Booking method selection */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <h3 className="font-semibold mb-4 text-blue-900">📅 Jak si chcete rezervovat čas?</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <motion.button
                    className={`p-4 rounded-xl border-2 transition-all ${
                      bookingMethod === "external" 
                        ? "border-blue-500 bg-blue-50" 
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => setBookingMethod("external")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <ExternalLink className="w-6 h-6 text-blue-600" />
                      <div className="text-left">
                        <div className="font-medium text-blue-900">Rychlá rezervace</div>
                        <div className="text-sm text-blue-700">Okamžitě vyberte termín</div>
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    className={`p-4 rounded-xl border-2 transition-all ${
                      bookingMethod === "form" 
                        ? "border-blue-500 bg-blue-50" 
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => setBookingMethod("form")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="w-6 h-6 text-blue-600" />
                      <div className="text-left">
                        <div className="font-medium text-blue-900">S dotazníkem</div>
                        <div className="text-sm text-blue-700">Popište svou situaci</div>
                      </div>
                    </div>
                  </motion.button>
                </div>
              </div>

              {bookingMethod === "external" ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h4 className="font-semibold text-green-800 mb-2">
                      Přesměrujeme vás na rezervační systém
                    </h4>
                    <p className="text-green-700 text-sm mb-4">
                      V novém okně se otevře kalendář, kde si můžete vybrat přesný termín 
                      a zadat své kontaktní údaje.
                    </p>
                    <div className="flex justify-center space-x-3">
                      <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Zrušit
                      </Button>
                      <Button onClick={handleExternalBooking}>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Otevřít kalendář
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Výhody konzultace */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
                    <h3 className="font-semibold mb-4 text-blue-900">✨ Co obsahuje kurz Podnikatelské čtvrtky:</h3>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Kompletní video lekce (4+ hodiny)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Šablony čtvrtky pro různé obory</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Praktické příklady a případové studie</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Celoživotní přístup + aktualizace</span>
                      </div>
                      <div className="flex items-center space-x-2 col-span-2">
                        <CheckCircle className="w-4 h-4 text-orange-500" />
                        <span className="font-medium text-orange-700">BONUS: Konzultace ZDARMA pro prvních 50 zákazníků!</span>
                      </div>
                    </div>
                  </div>

                  {/* Základní informace */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Jméno a příjmení *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Vaše celé jméno"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="vas@email.cz"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Telefon *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+420 xxx xxx xxx"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="business">Název podniku *</Label>
                      <Input
                        id="business"
                        value={formData.business}
                        onChange={(e) => handleInputChange("business", e.target.value)}
                        placeholder="Název vašeho podniku"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="businessType">Typ podnikání</Label>
                    <Select onValueChange={(value) => handleInputChange("businessType", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Vyberte typ vašeho podnikání" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kavarna">☕ Kavárna / Restaurace</SelectItem>
                        <SelectItem value="autoservis">🔧 Autoservis</SelectItem>
                        <SelectItem value="salon">✂️ Salon / Kadeřnictví</SelectItem>
                        <SelectItem value="fitness">🏋️ Fitness / Wellness</SelectItem>
                        <SelectItem value="maloobchod">🏪 Maloobchod</SelectItem>
                        <SelectItem value="sluzby">🛠️ Služby</SelectItem>
                        <SelectItem value="jine">❓ Jiné</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                      Zrušit
                    </Button>
                    <Button 
                      onClick={() => setStep(2)} 
                      disabled={!isFormValid}
                      className="min-w-[120px]"
                    >
                      Pokračovat
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 py-4"
            >
              <div>
                <Label htmlFor="timePreference">Preferovaný čas konzultace</Label>
                <Select onValueChange={(value) => handleInputChange("timePreference", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Kdy vám to nejvíce vyhovuje?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">🌅 Ráno (8:00 - 11:00)</SelectItem>
                    <SelectItem value="afternoon">☀️ Odpoledne (12:00 - 16:00)</SelectItem>
                    <SelectItem value="evening">🌆 Večer (17:00 - 20:00)</SelectItem>
                    <SelectItem value="anytime">⏰ Kdykoli</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="urgency">Jak rychle potřebujete čtvrtku?</Label>
                <Select onValueChange={(value) => handleInputChange("urgency", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Vyberte urgenci" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">🔥 Urgentní - situace je kritická (do 24h)</SelectItem>
                    <SelectItem value="soon">⚡ Brzy - chci začít co nejdříve (do týdne)</SelectItem>
                    <SelectItem value="normal">📅 Standardní - mám čas (do měsíce)</SelectItem>
                    <SelectItem value="planning">💭 Zvažuji - sbírám informace</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message">Popište svou situaci a výzvy</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Například: 'Mám kavárnu v centru, ale málo zákazníků. Nevím, jak správně cílit marketing a jestli mám správné ceny...'"
                  className="mt-1 min-h-[100px]"
                />
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-orange-800">🎁 BONUS pro prvních 50 zákazníků:</div>
                    <ul className="text-sm text-orange-700 mt-2 space-y-1">
                      <li>✅ <strong>ZDARMA konzultace</strong> (běžná cena 2.500 Kč)</li>
                      <li>✅ <strong>90 minut</strong> - vyplníme čtvrtku společně</li>
                      <li>✅ <strong>Video call</strong> - personalizované řešení</li>
                      <li>✅ <strong>Konkrétní akční plán</strong> pro váš podnik</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Zpět
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting}
                  className="min-w-[160px] bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isSubmitting ? "Rezervuji..." : "🎯 Rezervovat Canvas session"}
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-2xl font-semibold mb-4 text-green-800">
                🎉 Canvas session rezervována!
              </h3>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <p className="text-green-700 mb-4">
                  Perfektně! Vaše Canvas konzultace byla úspěšně naplánována.
                </p>
                
                <div className="space-y-2 text-sm text-green-600">
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Detaily odešleme na <strong>{formData.email}</strong></span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Zavoláme na <strong>{formData.phone}</strong></span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Příprava Canvas šablony pro <strong>{formData.business}</strong></span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800 text-sm">
                  <strong>Tip:</strong> Než se spojíme, můžete si připravit otázky o vašem podnikání. 
                  Čím více detailů budeme znát, tím přesnější Canvas vytvoříme!
                </p>
              </div>
              
              <p className="text-gray-600 text-sm">
                Tento dialog se automaticky zavře za chvíli...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}