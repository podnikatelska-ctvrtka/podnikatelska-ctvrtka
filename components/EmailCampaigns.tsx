/**
 * 📧 EMAIL CAMPAIGNS INDEX - Všechny email šablony na jednom místě
 * 
 * Route: /email-campaigns
 * 
 * Shows:
 * - Skupina A: Leden kvíz invite (14 lidí ze staré výzvy)
 * - Skupina B: Quiz follow-up empathy (lidé co udělali kvíz)
 */

import React, { useState } from 'react';
import { JanuaryQuizInviteEmail, JANUARY_QUIZ_EMAIL_PLAINTEXT, JANUARY_QUIZ_EMAIL_SUBJECT, JANUARY_QUIZ_EMAIL_PREVIEW } from './emails/JanuaryQuizInvite';
import { QuizFollowUpEmpathyEmail, QUIZ_FOLLOWUP_EMPATHY_PLAINTEXT, QUIZ_FOLLOWUP_EMPATHY_SUBJECT, QUIZ_FOLLOWUP_EMPATHY_PREVIEW } from './emails/QuizFollowUpEmpathy';
import { Copy, Check, Mail, Users, Heart } from 'lucide-react';

export function EmailCampaigns() {
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  if (selectedEmail === 'grupa-a-preview') {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <button
          onClick={() => setSelectedEmail(null)}
          className="mb-8 bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition-shadow font-semibold"
        >
          ← Zpět na index
        </button>
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <JanuaryQuizInviteEmail />
        </div>
      </div>
    );
  }

  if (selectedEmail === 'grupa-b-preview') {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <button
          onClick={() => setSelectedEmail(null)}
          className="mb-8 bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition-shadow font-semibold"
        >
          ← Zpět na index
        </button>
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <QuizFollowUpEmpathyEmail />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-white text-5xl font-black mb-4">
            📧 Email Kampaně - Leden 2026
          </h1>
          <p className="text-white/60 text-xl">
            Klikni na kartu → Kopíruj HTML/Text → Použij v Mailchimp/Klaviyo
          </p>
        </div>

        {/* Email Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          
          {/* SKUPINA A */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">
                  SKUPINA A
                </h2>
                <p className="text-slate-600 text-sm">
                  14 lidí ze staré výzvy (listopad)<br/>
                  ❌ NEUDĚLALI kvíz
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
              <p className="text-blue-900 font-semibold mb-2">
                🎯 Framing:
              </p>
              <p className="text-blue-800 text-sm leading-relaxed">
                "Leden = nová šance, čistý štít, začni správně"
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-xs text-slate-500 mb-1 font-semibold">SUBJECT LINE:</p>
                <div className="bg-slate-100 p-3 rounded-lg flex items-center justify-between gap-2">
                  <p className="text-sm text-slate-900 flex-1">
                    {JANUARY_QUIZ_EMAIL_SUBJECT}
                  </p>
                  <button
                    onClick={() => copyToClipboard(JANUARY_QUIZ_EMAIL_SUBJECT, 'a-subject')}
                    className="text-blue-600 hover:text-blue-700 p-2"
                  >
                    {copiedSection === 'a-subject' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-500 mb-1 font-semibold">PREVIEW TEXT:</p>
                <div className="bg-slate-100 p-3 rounded-lg flex items-center justify-between gap-2">
                  <p className="text-sm text-slate-900 flex-1">
                    {JANUARY_QUIZ_EMAIL_PREVIEW}
                  </p>
                  <button
                    onClick={() => copyToClipboard(JANUARY_QUIZ_EMAIL_PREVIEW, 'a-preview')}
                    className="text-blue-600 hover:text-blue-700 p-2"
                  >
                    {copiedSection === 'a-preview' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedEmail('grupa-a-preview')}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
              >
                👁️ Preview HTML
              </button>
              <button
                onClick={() => copyToClipboard(JANUARY_QUIZ_EMAIL_PLAINTEXT, 'a-plaintext')}
                className="bg-slate-800 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                {copiedSection === 'a-plaintext' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                Plain Text
              </button>
            </div>

            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-800 text-xs">
                ✅ <strong>CTA:</strong> Udělat kvíz ZDARMA<br/>
                ✅ <strong>Urgency:</strong> Končí 31. ledna (soft)<br/>
                ✅ <strong>Tone:</strong> Empatie + nová šance
              </p>
            </div>
          </div>

          {/* SKUPINA B */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">
                  SKUPINA B
                </h2>
                <p className="text-slate-600 text-sm">
                  Lidé z kvízu (Vánoce)<br/>
                  ✅ UDĚLALI kvíz
                </p>
              </div>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6">
              <p className="text-green-900 font-semibold mb-2">
                💚 Framing:
              </p>
              <p className="text-green-800 text-sm leading-relaxed">
                "Empatie, pomoc, zájem - BEZ prodeje 5k!"
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-xs text-slate-500 mb-1 font-semibold">SUBJECT LINE:</p>
                <div className="bg-slate-100 p-3 rounded-lg flex items-center justify-between gap-2">
                  <p className="text-sm text-slate-900 flex-1">
                    {QUIZ_FOLLOWUP_EMPATHY_SUBJECT}
                  </p>
                  <button
                    onClick={() => copyToClipboard(QUIZ_FOLLOWUP_EMPATHY_SUBJECT, 'b-subject')}
                    className="text-green-600 hover:text-green-700 p-2"
                  >
                    {copiedSection === 'b-subject' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-500 mb-1 font-semibold">PREVIEW TEXT:</p>
                <div className="bg-slate-100 p-3 rounded-lg flex items-center justify-between gap-2">
                  <p className="text-sm text-slate-900 flex-1">
                    {QUIZ_FOLLOWUP_EMPATHY_PREVIEW}
                  </p>
                  <button
                    onClick={() => copyToClipboard(QUIZ_FOLLOWUP_EMPATHY_PREVIEW, 'b-preview')}
                    className="text-green-600 hover:text-green-700 p-2"
                  >
                    {copiedSection === 'b-preview' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedEmail('grupa-b-preview')}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
              >
                👁️ Preview HTML
              </button>
              <button
                onClick={() => copyToClipboard(QUIZ_FOLLOWUP_EMPATHY_PLAINTEXT, 'b-plaintext')}
                className="bg-slate-800 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                {copiedSection === 'b-plaintext' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                Plain Text
              </button>
            </div>

            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-yellow-900 text-xs">
                ❌ <strong>BEZ prodeje 5k!</strong><br/>
                ✅ <strong>Focus:</strong> Používáš plán? Co tě brzdí?<br/>
                ✅ <strong>Tone:</strong> Warm, caring, genuine interest
              </p>
            </div>
          </div>

        </div>

        {/* Instructions */}
        <div className="bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8">
          <h3 className="text-white text-2xl font-black mb-4 flex items-center gap-3">
            <Mail className="w-8 h-8" />
            JAK POUŽÍT:
          </h3>
          <div className="text-white/90 space-y-3 text-sm leading-relaxed">
            <p className="flex items-start gap-3">
              <span className="text-blue-400 font-black">1.</span>
              <span><strong>Preview HTML:</strong> Klikni na tlačítko → Otevře se email preview → Inspect element → Copy HTML</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-blue-400 font-black">2.</span>
              <span><strong>Plain Text:</strong> Klikni na "Plain Text" → Text zkopírován do clipboardu → Vlož do Mailchimp</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-blue-400 font-black">3.</span>
              <span><strong>Subject + Preview:</strong> Klikni na Copy ikonku → Vlož do email platformy</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-blue-400 font-black">4.</span>
              <span><strong>Merge tags:</strong> Nezapomeň nahradit <code className="bg-white/20 px-2 py-1 rounded">{'{jméno}'}</code> za tvůj merge tag (např. <code className="bg-white/20 px-2 py-1 rounded">*|FNAME|*</code> v Mailchimp)</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-blue-400 font-black">5.</span>
              <span><strong>Unsubscribe:</strong> Nahraď <code className="bg-white/20 px-2 py-1 rounded">{'{unsubscribe_url}'}</code> za tvůj unsubscribe link</span>
            </p>
          </div>
        </div>

        {/* Strategy Notes */}
        <div className="mt-8 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-xl border-2 border-yellow-400/30 rounded-3xl p-8">
          <h3 className="text-yellow-300 text-2xl font-black mb-4">
            🧠 STRATEGIE:
          </h3>
          <div className="text-white/90 space-y-4 text-sm leading-relaxed">
            <div>
              <p className="font-bold text-white mb-2">📅 TIMING:</p>
              <p className="text-white/80">
                • <strong>Skupina A:</strong> Poslat DNES/ZÍTRA (leden momentum!)<br/>
                • <strong>Skupina B:</strong> Poslat 2-3 dny po kvízu (dej jim čas na prozkoumání)
              </p>
            </div>
            <div>
              <p className="font-bold text-white mb-2">🎯 CÍL:</p>
              <p className="text-white/80">
                • <strong>Skupina A:</strong> Dostat je do kvízu → Warm lead → Budoucí prodej<br/>
                • <strong>Skupina B:</strong> Zjistit kde jsou → Pomoct jim → Build trust (NE push na prodej!)
              </p>
            </div>
            <div>
              <p className="font-bold text-white mb-2">⚠️ DŮLEŽITÉ:</p>
              <p className="text-white/80">
                Skupina B je <strong>testovací email</strong>. Čekáme na replies! Pokud lidé odpoví "nevím jak začít" → TEPRVE POTOM soft mention kurzu v další follow-up emailu.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
