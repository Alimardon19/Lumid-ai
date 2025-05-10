/**
 * Matnni foydalanuvchi clipboard-iga nusxalaydi
 * @param text - Nusxalanadigan matn
 * @returns Promise<boolean> - Muvaffaqiyatli nusxalangan bo'lsa true, aks holda false
 */
export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        // Modern usul (navigator.clipboard API)
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(text);
            return true;
        }

        // Eski brauzerlar uchun fallback usul
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed'; // Brauzer render bug'larini oldini olish
        document.body.appendChild(textArea);
        textArea.select();

        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);

        return successful;
    } catch (err) {
        console.error('Matnni nusxalashda xato:', err);
        return false;
    }
}