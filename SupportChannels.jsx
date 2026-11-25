const channels = [
  { id: "whatsapp", className: "whatsapp-support", icon: "◉", tag: "QUICK CHAT", title: "WhatsApp", text: "Chat with PawConnect support at +91 6309928174.", action: "Start a WhatsApp chat ↗", href: "https://wa.me/916309928174?text=Hi%20PawConnect%2C%20I%20need%20help.", external: true },
  { id: "email", className: "email-support", icon: "✉", tag: "SEND AN EMAIL", title: "Email us", text: "Send your question and we'll pick it up in your inbox.", action: "Compose an email ↗", href: "mailto:stdemonica11@gmail.com?subject=PawConnect%20Support" },
  { id: "instagram", className: "instagram-support", icon: "◎", tag: "DM US", title: "Instagram", text: "Message us on Instagram at @sir_judebellingham.", action: "Open Instagram chat ↗", href: "https://ig.me/m/sir_judebellingham", external: true },
];

export default function SupportChannels() {
  return channels.map((channel) => (
    <a key={channel.id} className={`support-card reveal visible ${channel.className}`} href={channel.href} target={channel.external ? "_blank" : undefined} rel={channel.external ? "noopener noreferrer" : undefined}>
      <span className="support-icon">{channel.icon}</span><span className="support-tag">{channel.tag}</span>
      <h3>{channel.title}</h3><p>{channel.text}</p><span className="support-action">{channel.action}</span>
    </a>
  ));
}
