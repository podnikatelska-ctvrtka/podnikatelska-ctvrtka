import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Loader2, Lock, CreditCard, CheckCircle, Smartphone, Building2, Check, Shield } from 'lucide-react';
import { toast } from 'sonner';

interface FapiCheckoutFormExpensiveProps {
  productId: string;
  price: number;
  productName: string;
}

type PaymentMethod = 'card' | 'bank_transfer' | 'apple_pay' | 'google_pay';

export default function FapiCheckoutFormExpensive({ productId, price, productName }: FapiCheckoutFormExpensiveProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    isCompany: false,
    companyName: '',
    ico: '',
    dic: '',
  });
  const [gdprConsent, setGdprConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);

  // Calculate price with/without VAT
  const VAT_RATE = 0.21;
  const priceWithoutVat = price;
  const priceWithVat = Math.round(price * (1 + VAT_RATE));
  const vatAmount = priceWithVat - priceWithoutVat;
  const finalPrice = formData.isCompany ? priceWithoutVat : priceWithVat;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!gdprConsent) {
      toast.error('Musíte souhlasit se zpracováním osobních údajů');
      return;
    }

    if (!selectedPaymentMethod) {
      toast.error('Vyberte prosím způsob platby');
      return;
    }

    setLoading(true);

    try {
      // Build FAPI form URL with pre-filled data
      // ✅ FAPI FORM B - Plná cena 8.499,- Kč (bez slevy)
      const fapiFormUrl = new URL('https://form.fapi.cz/');
      
      // ✅ FAPI B Form ID - Běžná cena (8.499 Kč bez DPH / 10.284 Kč s DPH)
      fapiFormUrl.searchParams.append('id', '5d6ebf1c-95ca-4781-93d4-8d1052bea23e');
      
      // Add user data as query parameters to pre-fill the form
      fapiFormUrl.searchParams.append('email', formData.email);
      fapiFormUrl.searchParams.append('first_name', formData.firstName);
      fapiFormUrl.searchParams.append('last_name', formData.lastName);
      
      if (formData.phone) {
        fapiFormUrl.searchParams.append('phone', formData.phone);
      }
      
      // Add payment method preference
      if (selectedPaymentMethod) {
        fapiFormUrl.searchParams.append('payment_method', selectedPaymentMethod);
      }
      
      if (formData.isCompany) {
        fapiFormUrl.searchParams.append('company_name', formData.companyName);
        fapiFormUrl.searchParams.append('ico', formData.ico);
        if (formData.dic) {
          fapiFormUrl.searchParams.append('dic', formData.dic);
        }
      }

      // Show success message
      toast.success('Přesměrovávám na platební bránu...');
      
      // Small delay for better UX
      setTimeout(() => {
        // Redirect to FAPI payment form
        window.location.href = fapiFormUrl.toString();
      }, 500);

    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Omlouváme se, něco se pokazilo. Zkuste to prosím znovu.');
      setLoading(false);
    }
  };

  const paymentMethods = [
    { id: 'card' as PaymentMethod, name: 'Platební karta', icon: CreditCard, description: 'Visa, Mastercard, Maestro' },
    { id: 'bank_transfer' as PaymentMethod, name: 'Bankovní převod', icon: Building2, description: 'Online bankovnictví' },
    { id: 'apple_pay' as PaymentMethod, name: 'Apple Pay', icon: Smartphone, description: 'Rychlá platba' },
    { id: 'google_pay' as PaymentMethod, name: 'Google Pay', icon: Smartphone, description: 'Rychlá platba' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-red-200">
      <div className="flex items-center justify-center gap-3 mb-6">
        <Lock className="w-6 h-6 text-green-600" />
        <h3 className="text-2xl">Bezpečná objednávka</h3>
      </div>

      {/* ⚠️ UPOZORNĚNÍ: Plná cena */}
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
        <p className="text-red-800 text-center">
          ⏰ <strong>Speciální sleva vypršela!</strong><br />
          Objednáváš za běžnou cenu bez slevy.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-sm mb-2 text-gray-700">
            Jméno *
          </label>
          <Input
            id="firstName"
            type="text"
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            placeholder="Jan"
            className="w-full text-lg py-6"
          />
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-sm mb-2 text-gray-700">
            Příjmení *
          </label>
          <Input
            id="lastName"
            type="text"
            required
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            placeholder="Novák"
            className="w-full text-lg py-6"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm mb-2 text-gray-700">
            Email *
          </label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="jan.novak@email.cz"
            className="w-full text-lg py-6"
          />
          <p className="text-xs text-gray-500 mt-1">
            Sem ti pošleme přístup ke kurzu
          </p>
        </div>

        {/* Phone (optional) */}
        <div>
          <label htmlFor="phone" className="block text-sm mb-2 text-gray-700">
            Telefon (volitelné)
          </label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+420 123 456 789"
            className="w-full text-lg py-6"
          />
        </div>

        {/* Company Toggle */}
        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <Checkbox
            id="isCompany"
            checked={formData.isCompany}
            onCheckedChange={(checked) => setFormData({ ...formData, isCompany: checked === true })}
            className="mt-1"
          />
          <label htmlFor="isCompany" className="text-sm text-gray-700 cursor-pointer">
            Nakupuji na firmu (potřebuji fakturu s IČO/DIČ)
          </label>
        </div>

        {/* Company Fields (conditional) */}
        {formData.isCompany && (
          <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div>
              <label htmlFor="companyName" className="block text-sm mb-2 text-gray-700">
                Název firmy *
              </label>
              <Input
                id="companyName"
                type="text"
                required={formData.isCompany}
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="Moje firma s.r.o."
                className="w-full text-lg py-6"
              />
            </div>

            <div>
              <label htmlFor="ico" className="block text-sm mb-2 text-gray-700">
                IČO *
              </label>
              <Input
                id="ico"
                type="text"
                required={formData.isCompany}
                value={formData.ico}
                onChange={(e) => setFormData({ ...formData, ico: e.target.value })}
                placeholder="12345678"
                className="w-full text-lg py-6"
              />
            </div>

            <div>
              <label htmlFor="dic" className="block text-sm mb-2 text-gray-700">
                DIČ (volitelné)
              </label>
              <Input
                id="dic"
                type="text"
                value={formData.dic}
                onChange={(e) => setFormData({ ...formData, dic: e.target.value })}
                placeholder="CZ12345678"
                className="w-full text-lg py-6"
              />
            </div>
          </div>
        )}

        {/* Payment Method Selection */}
        <div>
          <label className="block text-sm mb-3 text-gray-700">
            Způsob platby *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              const isSelected = selectedPaymentMethod === method.id;
              
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setSelectedPaymentMethod(method.id)}
                  className={`relative flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-red-500 bg-red-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-red-300 hover:bg-red-50/30'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isSelected ? 'text-red-600' : 'text-gray-400'}`} />
                  <div className="text-left flex-1">
                    <p className={`text-sm ${isSelected ? 'text-red-900' : 'text-gray-700'}`}>
                      {method.name}
                    </p>
                    <p className="text-xs text-gray-500">{method.description}</p>
                  </div>
                  {isSelected && (
                    <CheckCircle className="w-5 h-5 text-red-600 absolute top-2 right-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border-2 border-red-200">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-gray-600">
              <span>Cena kurzu</span>
              <span>{priceWithoutVat.toLocaleString('cs-CZ')} Kč</span>
            </div>
            
            {!formData.isCompany && (
              <>
                <div className="flex justify-between items-center text-gray-600">
                  <span>DPH (21%)</span>
                  <span>{vatAmount.toLocaleString('cs-CZ')} Kč</span>
                </div>
                <div className="border-t border-red-200 pt-3 flex justify-between items-center">
                  <span className="text-lg">Celkem k úhradě</span>
                  <span className="text-2xl text-red-600">{finalPrice.toLocaleString('cs-CZ')} Kč</span>
                </div>
              </>
            )}
            
            {formData.isCompany && (
              <div className="border-t border-red-200 pt-3 flex justify-between items-center">
                <span className="text-lg">Celkem k úhradě</span>
                <div className="text-right">
                  <span className="text-2xl text-red-600 block">{finalPrice.toLocaleString('cs-CZ')} Kč</span>
                  <span className="text-xs text-gray-500">bez DPH</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* GDPR Consent */}
        <div className="flex items-start gap-3">
          <Checkbox
            id="gdprConsent"
            checked={gdprConsent}
            onCheckedChange={(checked) => setGdprConsent(checked === true)}
            className="mt-1"
          />
          <label htmlFor="gdprConsent" className="text-sm text-gray-700 cursor-pointer">
            Souhlasím se{' '}
            <a href="/ochrana-udaju" target="_blank" className="text-red-600 hover:underline">
              zpracováním osobních údajů
            </a>{' '}
            a{' '}
            <a href="/obchodni-podminky" target="_blank" className="text-red-600 hover:underline">
              obchodními podmínkami
            </a>
            .
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-7 text-lg shadow-xl hover:shadow-2xl transition-all"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Připravuji platbu...
            </>
          ) : (
            <>
              <Lock className="w-5 h-5 mr-2" />
              Zaplatit {finalPrice.toLocaleString('cs-CZ')} Kč
            </>
          )}
        </Button>

        {/* Trust Badges */}
        <div className="flex flex-col items-center gap-3 pt-4">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Lock className="w-4 h-4 text-green-600" />
              <span>SSL šifrování</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-green-600" />
              <span>Bezpečná platba</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="w-4 h-4 text-green-600" />
              <span>Okamžitý přístup</span>
            </div>
          </div>
          
          <p className="text-xs text-gray-500 mt-4 text-center">
            🔒 Platba je zpracována přes zabezpečenou bránu GoPay
          </p>
        </div>
      </form>
    </div>
  );
}
