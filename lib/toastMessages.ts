import { toast } from "sonner";

/**
 * Centralizované toast messages pro konzistentní UX
 */

// ✅ SUCCESS MESSAGES
export const toastSuccess = {
  saved: () => toast.success("✅ Uloženo!"),
  lessonComplete: (title: string) => toast.success(`🎉 Lekce "${title}" dokončena!`),
  moduleComplete: (moduleNumber: number) => toast.success(`🎊 Modul ${moduleNumber} dokončen!`),
  copied: () => toast.success("📋 Zkopírováno do schránky"),
  itemAdded: (item: string) => toast.success(`✅ ${item} přidán!`),
  itemUpdated: (item: string) => toast.success(`✅ ${item} upraven!`),
  itemDeleted: (item: string) => toast.success(`🗑️ ${item} smazán!`),
};

// ❌ ERROR MESSAGES
export const toastError = {
  saveFailed: () => toast.error("❌ Nepodařilo se uložit"),
  loadFailed: () => toast.error("❌ Nepodařilo se načíst data"),
  invalidEmail: () => toast.error("⚠️ Neplatná emailová adresa"),
  required: (field: string) => toast.error(`⚠️ ${field} je povinné pole`),
  maxItems: (max: number, item: string) => toast.error(`⚠️ Maximum ${max} ${item}!`),
  duplicate: () => toast.error("❌ Tato položka již existuje!"),
  unauthorized: () => toast.error("🔒 Nemáte oprávnění"),
  networkError: () => toast.error("🌐 Chyba sítě - zkuste to znovu"),
  generic: (message: string) => toast.error(`❌ ${message}`),
};

// ℹ️ INFO MESSAGES
export const toastInfo = {
  completing: () => toast.info("⏳ Dokončuji..."),
  loading: () => toast.info("⏳ Načítám..."),
  processing: () => toast.info("⚙️ Zpracovávám..."),
};

// ⚠️ WARNING MESSAGES
export const toastWarning = {
  completeFirst: (item: string) => toast.error(`🔒 Nejprve dokončete ${item}!`),
  addAtLeast: (min: number, item: string) => toast.error(`⚠️ Přidejte alespoň ${min} ${item}!`),
  unsavedChanges: () => toast.error("⚠️ Máte neuložené změny!"),
};

// 🎉 ACHIEVEMENT MESSAGES (handled by AchievementNotification component)
// Tyto se nezobrazují přes toast, ale přes dedikovaný achievement systém
