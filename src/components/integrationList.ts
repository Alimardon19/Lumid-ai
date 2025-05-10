import TelegramIcon from "@assets/icons/png/telegram.png";
import InstagramIcon from "@assets/icons/png/instagram.png";
import FacebookIcon from "@assets/icons/png/facebook.png";
import WebsiteChatIcon from "@assets/icons/png/website_chat.png";
import WhatsAppIcon from "@assets/icons/png/whatsapp.png";
import CrmIcon from "@assets/icons/png/crm.png";


export const integrationList = [
    {
        id: 1,
        active: true,
        title: "Telegram",
        description: "Connect your Telegram bot",
        icon: TelegramIcon
    },
    {
        id: 2,
        active: false,
        title: "Instagram",
        description: "Connect Instagram messages",
        icon: InstagramIcon
    },
    {
        id: 3,
        active: false,
        title: "Facebook Messenger",
        description: "Connect Messenger chat",
        icon: FacebookIcon
    },
    {
        id: 4,
        active: true,
        title: "Website Chat",
        description: "Embed chat on your website",
        icon: WebsiteChatIcon
    },
    {
        id: 5,
        active: false,
        title: "WhatsApp",
        description: "Connect WhatsApp Business",
        icon: WhatsAppIcon
    },
    {
        id: 6,
        active: false,
        title: "Other Chat-CRMs",
        description: "Connect additional CRM platforms",
        icon: CrmIcon
    },
];