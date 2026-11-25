const h = React.createElement;

const supportChannels = [
    {
        id: "whatsapp",
        className: "whatsapp-support",
        icon: "◉",
        label: "QUICK CHAT",
        name: "WhatsApp",
        description: "Chat with PawConnect support at +91 6309928174.",
        action: "Start a WhatsApp chat ↗",
        href: "https://wa.me/916309928174?text=Hi%20PawConnect%2C%20I%20need%20help.",
        external: true
    },
    {
        id: "email",
        className: "email-support",
        icon: "✉",
        label: "SEND AN EMAIL",
        name: "Email us",
        description: "Send your question and we'll pick it up in your inbox.",
        action: "Compose an email ↗",
        href: "mailto:stdemonica11@gmail.com?subject=PawConnect%20Support"
    },
    {
        id: "instagram",
        className: "instagram-support",
        icon: "◎",
        label: "DM US",
        name: "Instagram",
        description: "Message us on Instagram at @sir_judebellingham.",
        action: "Open Instagram chat ↗",
        href: "https://ig.me/m/sir_judebellingham",
        external: true
    }
];

const pawconnectFeatures = [
    {
        icon: "🩺",
        title: "Health Records",
        description: "Access vaccination and health information before making an adoption decision."
    },
    {
        icon: "✓",
        title: "Verified Listings",
        description: "Verified shelters and owners help create a safer adoption environment."
    },
    {
        icon: "💬",
        title: "Real-Time Chat",
        description: "Communicate directly with shelters and owners during the adoption process."
    },
    {
        icon: "⭐",
        title: "Smart Matching",
        description: "Get pet recommendations based on your preferences and lifestyle."
    }
];

function SupportChannel({ channel }) {
    return h("a", {
        className: "support-card " + channel.className,
        href: channel.href,
        target: channel.external ? "_blank" : undefined,
        rel: channel.external ? "noopener noreferrer" : undefined
    },
    h("span", { className: "support-icon" }, channel.icon),
    h("span", { className: "support-tag" }, channel.label),
    h("h3", null, channel.name),
    h("p", null, channel.description),
    h("span", { className: "support-action" }, channel.action));
}

function SupportChannels() {
    return supportChannels.map(function (channel) {
        return h(SupportChannel, { key: channel.id, channel: channel });
    });
}

function FeatureCard({ feature }) {
    return h("article", { className: "feature" },
        h("div", { "aria-hidden": true }, feature.icon),
        h("h3", null, feature.title),
        h("p", null, feature.description));
}

function FeatureCards() {
    return pawconnectFeatures.map(function (feature) {
        return h(FeatureCard, { key: feature.title, feature: feature });
    });
}

const supportRoot = document.getElementById("reactSupportCards");
const featuresRoot = document.getElementById("reactFeatureCards");

if (supportRoot) {
    ReactDOM.createRoot(supportRoot).render(h(SupportChannels));
}

if (featuresRoot) {
    ReactDOM.createRoot(featuresRoot).render(h(FeatureCards));
}
