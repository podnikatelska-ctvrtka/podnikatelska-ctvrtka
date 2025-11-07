import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function EmailPreview() {
  const [selectedEmail, setSelectedEmail] = useState<'early' | 'normal'>('early');
  
  // 🎯 EMAIL TEMPLATES (zkopírované z webhooks)
  const mainCourseUrl = "https://podnikatelskactvrtka.cz/course-v3?token=DEMO_TOKEN_12345";
  const miniCourseUrl = "https://podnikatelskactvrtka.cz/minikurz";
  const testName = "Jan Novák";
  
  const earlyBirdEmailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🔥 PRŮKOPNÍK! Vítejte v kurzu!</h1>
        </div>
        
        <div style="background: white; padding: 40px 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
          <p style="font-size: 18px; margin-top: 0;">Ahoj ${testName}!</p>
          
          <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-bottom: 20px;">
            <p style="margin: 0; font-weight: 700; color: #92400e;">🚀 GRATULUJEME! Jste mezi průkopníky!</p>
            <p style="margin: 8px 0 0 0; font-size: 14px; color: #78350f;">Koupili jste během prvních 24 hodin a získáváte exkluzivní bonus! 🎁</p>
          </div>
          
          <p>Děkujeme za zakoupení kurzu <strong>Podnikatelská Čtvrtka</strong>! 🚀</p>
          
          <p><strong>Váš přístup je připraven:</strong></p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 30px 0;">
            <p style="margin: 0 0 15px 0; font-weight: 600; color: #667eea;">📚 HLAVNÍ KURZ - Podnikatelská Čtvrtka</p>
            <a href="${mainCourseUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; margin-bottom: 10px;">
              Vstoupit do hlavního kurzu
            </a>
            <p style="margin: 10px 0 0 0; font-size: 13px; color: #666;">⏱️ 16 lekcí • 90 minut práce • Kompletní byznys plán</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px; border-radius: 8px; margin: 30px 0; border: 2px solid #f59e0b;">
            <p style="margin: 0 0 15px 0; font-weight: 600; color: #92400e;">🎁 BONUS PRO PRŮKOPNÍKY - Mini Kurz</p>
            <a href="${miniCourseUrl}" style="display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; margin-bottom: 10px;">
              Vstoupit do mini kurzu
            </a>
            <p style="margin: 10px 0 0 0; font-size: 13px; color: #78350f;">⚡ 5 interaktivních nástrojů • Okamžité výsledky • Praktická příprava</p>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            💡 <strong>Tip:</strong> Uložte si tento email - odkazy fungují natrvalo a můžete se kdykoliv vrátit!
          </p>
          
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
          
          <p style="color: #999; font-size: 13px; margin-bottom: 0;">
            Pokud máte jakékoliv dotazy, neváhejte odpovědět na tento email.<br>
            Přejeme hodně úspěchů! 💪
          </p>
        </div>
      </body>
    </html>
  `;
  
  const normalEmailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Vítejte v kurzu!</h1>
        </div>
        
        <div style="background: white; padding: 40px 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
          <p style="font-size: 18px; margin-top: 0;">Ahoj ${testName}!</p>
          
          <p>Děkujeme za zakoupení kurzu <strong>Podnikatelská Čtvrtka</strong>! 🚀</p>
          
          <p>Váš přístup do LMS systému je připraven:</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 30px 0;">
            <p style="margin: 0 0 15px 0; font-weight: 600; color: #667eea;">🔑 Váš přístupový odkaz:</p>
            <a href="${mainCourseUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
              Vstoupit do kurzu
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            💡 <strong>Tip:</strong> Uložte si tento email - odkaz funguje natrvalo a můžete se kdykoliv vrátit ke kurzu!
          </p>
          
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
          
          <p style="color: #999; font-size: 13px; margin-bottom: 0;">
            Pokud máte jakékoliv dotazy, neváhejte odpovědět na tento email.<br>
            Přejeme hodně úspěchů! 💪
          </p>
        </div>
      </body>
    </html>
  `;
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">📧 Email Preview - FAPI Webhook</h1>
              <p className="text-sm text-gray-600">Testování dvou email šablon podle ceny</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Email Selector */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Vyber email šablonu:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setSelectedEmail('early')}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedEmail === 'early'
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-orange-300'
              }`}
            >
              <div className="text-left">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🔥</span>
                  <h3 className="font-bold text-gray-900">PRŮKOPNÍK</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">Zaplatil 4.999 Kč (Early Bird)</p>
                <div className="space-y-1 text-xs text-gray-500">
                  <p>✅ Hlavní kurz "Čtvrtka PRO"</p>
                  <p>🎁 BONUS: Mini kurz</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => setSelectedEmail('normal')}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedEmail === 'normal'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="text-left">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🎉</span>
                  <h3 className="font-bold text-gray-900">NORMÁLNÍ ZÁKAZNÍK</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">Zaplatil 8.499 Kč (Full Price)</p>
                <div className="space-y-1 text-xs text-gray-500">
                  <p>✅ Hlavní kurz "Čtvrtka PRO"</p>
                  <p>❌ Žádný bonus</p>
                </div>
              </div>
            </button>
          </div>
        </div>
        
        {/* Email Preview */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Email Preview:</h2>
            <div className="text-sm text-gray-500">
              {selectedEmail === 'early' ? '🔥 Průkopník (4.999 Kč)' : '🎉 Normální (8.499 Kč)'}
            </div>
          </div>
          
          {/* Email Container */}
          <div className="border rounded-lg overflow-hidden">
            <iframe
              srcDoc={selectedEmail === 'early' ? earlyBirdEmailHtml : normalEmailHtml}
              className="w-full"
              style={{ height: '800px' }}
              title="Email Preview"
            />
          </div>
          
          {/* Debug Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2 text-sm">🔧 Debug Info:</h3>
            <div className="space-y-1 text-xs text-gray-600 font-mono">
              <p><strong>Email typ:</strong> {selectedEmail === 'early' ? 'EARLY_BIRD' : 'NORMAL'}</p>
              <p><strong>Detekce:</strong> amount === {selectedEmail === 'early' ? '4999' : '8499'} || amount === {selectedEmail === 'early' ? '6049' : '10289'}</p>
              <p><strong>Subject:</strong> {selectedEmail === 'early' ? '🔥 PRŮKOPNÍK! Přístup do kurzu + BONUS Mini Kurz' : '🎉 Přístup do kurzu Podnikatelská Čtvrtka'}</p>
              <p><strong>Hlavní kurz:</strong> ✅ Ano</p>
              <p><strong>Mini kurz:</strong> {selectedEmail === 'early' ? '✅ Ano (bonus)' : '❌ Ne'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
