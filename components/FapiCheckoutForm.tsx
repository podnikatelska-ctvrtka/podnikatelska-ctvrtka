import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Loader2, Lock, CreditCard, CheckCircle, Smartphone, Building2, Check } from 'lucide-react';
import { toast } from 'sonner';

interface FapiCheckoutFormProps {
  productId: string;
  price: number;
  productName: string;
}

type PaymentMethod = 'card' | 'bank_transfer' | 'apple_pay' | 'google_pay';

export default function FapiCheckoutForm({ productId, price, productName }: FapiCheckoutFormProps) {
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
      // Using the specific form UUID for Podnikatelská Čtvrtka
      const fapiFormUrl = new URL('https://form.fapi.cz/');
      fapiFormUrl.searchParams.append('id', '47a3e4ff-233e-11eb-a0d2-0a74406df6c8');
      
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

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-orange-200">
      <div className="flex items-center justify-center gap-3 mb-6">
        <Lock className="w-6 h-6 text-green-600" />
        <h3 className="text-2xl">Bezpečná objednávka</h3>
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
            
            <div className="grid md:grid-cols-2 gap-4">
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
                  maxLength={8}
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
          </div>
        )}

        {/* GDPR Consent */}
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <Checkbox
            id="gdpr"
            checked={gdprConsent}
            onCheckedChange={(checked) => setGdprConsent(checked === true)}
            className="mt-1"
          />
          <label htmlFor="gdpr" className="text-sm text-gray-700 cursor-pointer">
            Souhlasím se{' '}
            <a href="/ochrana-udaju" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">
              zpracováním osobních údajů
            </a>{' '}
            a{' '}
            <a href="/obchodni-podminky" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">
              obchodními podmínkami
            </a>
            . *
          </label>
        </div>

        {/* Price Summary */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 border-2 border-orange-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Produkt:</span>
            <span className="text-sm text-right">{productName}</span>
          </div>
          
          {!formData.isCompany && (
            <>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600 text-sm">Cena bez DPH:</span>
                <span className="text-sm">{priceWithoutVat.toLocaleString('cs-CZ')} Kč</span>
              </div>
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-orange-200">
                <span className="text-gray-600 text-sm">DPH (21%):</span>
                <span className="text-sm">{vatAmount.toLocaleString('cs-CZ')} Kč</span>
              </div>
            </>
          )}
          
          {formData.isCompany && (
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-orange-200">
              <span className="text-gray-600">Cena:</span>
              <span>{priceWithoutVat.toLocaleString('cs-CZ')} Kč</span>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <span className="text-lg">Celkem k zaplacení:</span>
            <span className="text-3xl text-orange-600">{finalPrice.toLocaleString('cs-CZ')} Kč</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {formData.isCompany ? '(bez DPH - firma odvede DPH sama)' : '(včetně 21% DPH)'}
          </p>
        </div>

        {/* Payment Methods Selection */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <p className="text-sm">Vyberte způsob platby: *</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Card Payment */}
            <button
              type="button"
              onClick={() => setSelectedPaymentMethod('card')}
              className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                selectedPaymentMethod === 'card'
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              {selectedPaymentMethod === 'card' && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
              )}
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm">Platební karta</p>
                  <p className="text-xs text-gray-500">Visa, Mastercard</p>
                </div>
              </div>
            </button>

            {/* Bank Transfer */}
            <button
              type="button"
              onClick={() => setSelectedPaymentMethod('bank_transfer')}
              className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                selectedPaymentMethod === 'bank_transfer'
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              {selectedPaymentMethod === 'bank_transfer' && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
              )}
              <div className="flex items-center gap-3">
                <div className="bg-green-100 rounded-full w-10 h-10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm">Bankovní převod</p>
                  <p className="text-xs text-gray-500">Rychlý online převod</p>
                </div>
              </div>
            </button>

            {/* Apple Pay */}
            <button
              type="button"
              onClick={() => setSelectedPaymentMethod('apple_pay')}
              className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                selectedPaymentMethod === 'apple_pay'
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              {selectedPaymentMethod === 'apple_pay' && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
              )}
              <div className="flex items-center gap-3">
                <div className="bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center">
                  <span className="text-white text-lg">🍎</span>
                </div>
                <div>
                  <p className="text-sm">Apple Pay</p>
                  <p className="text-xs text-gray-500">Rychlá platba</p>
                </div>
              </div>
            </button>

            {/* Google Pay */}
            <button
              type="button"
              onClick={() => setSelectedPaymentMethod('google_pay')}
              className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                selectedPaymentMethod === 'google_pay'
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              {selectedPaymentMethod === 'google_pay' && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
              )}
              <div className="flex items-center gap-3">
                <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center border border-gray-300">
                  <Smartphone className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <p className="text-sm">Google Pay</p>
                  <p className="text-xs text-gray-500">Rychlá platba</p>
                </div>
              </div>
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-4 text-center">
            🔒 Platba je zpracována přes zabezpečenou bránu GoPay
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-8 text-2xl shadow-xl"
        >
          {loading ? (
            <>
              <Loader2 className="w-6 h-6 mr-2 animate-spin" />
              Zpracovávám...
            </>
          ) : (
            <>
              <CreditCard className="w-6 h-6 mr-2" />
              Přejít k platbě ({price.toLocaleString('cs-CZ')} Kč)
            </>
          )}
        </Button>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-green-500" />
            <span>Zabezpečená platba</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>14 dní záruka vrácení</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Okamžitý přístup</span>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500">
          Po kliknutí budete přesměrováni na bezpečnou platební bránu.
          <br />
          Přístup ke kurzu dostanete emailem do 5 minut po platbě.
        </p>
      </form>
    </div>
  );
}
