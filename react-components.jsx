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
        category: "care",
        description: "Access vaccination and health information before making an adoption decision."
    },
    {
        icon: "✓",
        title: "Verified Listings",
        category: "trust",
        description: "Verified shelters and owners help create a safer adoption environment."
    },
    {
        icon: "💬",
        title: "Real-Time Chat",
        category: "connections",
        description: "Communicate directly with shelters and owners during the adoption process."
    },
    {
        icon: "⭐",
        title: "Smart Matching",
        category: "connections",
        description: "Get pet recommendations based on your preferences and lifestyle."
    }
];

const navigationLinks = [
    { href: "#home", label: "Home" },
    { href: "#pets", label: "Find a Pet" },
    { href: "#regions", label: "Regions" },
    { href: "#hostel", label: "Pet Hostel" },
    { href: "#how", label: "How It Works" },
    { href: "#support", label: "Support" },
    { href: "#about", label: "About" }
];

function NavigationBar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    React.useEffect(() => {
        function handleEscape(event) {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
            }
        }

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, []);

    function handleNavigate() {
        setIsMenuOpen(false);
    }

    return (
        <header className="navbar">
            <a className="logo" href="#home" onClick={handleNavigate} aria-label="PawConnect home">
                <span className="logo-icon">🐾</span>
                <span>Paw<span>Connect</span></span>
            </a>

            <nav id="navMenu" className={isMenuOpen ? "active" : ""} aria-label="Main navigation">
                {navigationLinks.map((link) => (
                    <a key={link.href} href={link.href} onClick={handleNavigate}>{link.label}</a>
                ))}
            </nav>

            <div className="nav-actions">
                <button className="login-btn" type="button" onClick={() => window.openLogin()}>Login</button>
                <button className="adopt-btn" type="button" onClick={() => window.scrollToPets()}>Adopt a Pet</button>
                <button
                    className="menu-btn"
                    type="button"
                    onClick={() => setIsMenuOpen((open) => !open)}
                    aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-controls="navMenu"
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? "×" : "☰"}
                </button>
            </div>
        </header>
    );
}

function useRevealOnScroll() {
    const [isVisible, setIsVisible] = React.useState(false);
    const elementRef = React.useRef(null);

    React.useEffect(() => {
        const element = elementRef.current;
        if (!element) {
            return undefined;
        }

        if (!("IntersectionObserver" in window)) {
            setIsVisible(true);
            return undefined;
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { threshold: 0.12 });

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return { elementRef, isVisible };
}

function SupportChannel({ channel }) {
    const { elementRef, isVisible } = useRevealOnScroll();

    return (
        <a
            ref={elementRef}
            className={`support-card reveal ${channel.className}${isVisible ? " visible" : ""}`}
            href={channel.href}
            target={channel.external ? "_blank" : undefined}
            rel={channel.external ? "noopener noreferrer" : undefined}
        >
            <span className="support-icon">{channel.icon}</span>
            <span className="support-tag">{channel.label}</span>
            <h3>{channel.name}</h3>
            <p>{channel.description}</p>
            <span className="support-action">{channel.action}</span>
        </a>
    );
}

function SupportChannels() {
    return (
        <>
            {supportChannels.map((channel) => (
                <SupportChannel key={channel.id} channel={channel} />
            ))}
        </>
    );
}

function FeatureCard({ feature }) {
    const { elementRef, isVisible } = useRevealOnScroll();

    return (
        <article ref={elementRef} className={`feature reveal${isVisible ? " visible" : ""}`}>
            <div aria-hidden="true">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
        </article>
    );
}

function FeatureCards() {
    const [activeCategory, setActiveCategory] = React.useState("all");
    const categories = [
        { id: "all", label: "All features" },
        { id: "care", label: "Care" },
        { id: "trust", label: "Trust & safety" },
        { id: "connections", label: "Connections" }
    ];
    const visibleFeatures = activeCategory === "all"
        ? pawconnectFeatures
        : pawconnectFeatures.filter((feature) => feature.category === activeCategory);

    return (
        <>
            <div className="feature-filters" role="group" aria-label="Filter features">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        type="button"
                        className={`feature-filter${activeCategory === category.id ? " active" : ""}`}
                        aria-pressed={activeCategory === category.id}
                        onClick={() => setActiveCategory(category.id)}
                    >
                        {category.label}
                    </button>
                ))}
            </div>
            <div className="features-grid" aria-live="polite">
                {visibleFeatures.map((feature) => (
                    <FeatureCard key={feature.title} feature={feature} />
                ))}
            </div>
        </>
    );
}

function getPawPalReply(question) {
    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes("apartment") || lowerQuestion.includes("small home")) {
        return "For an apartment, try a calm cat, Shih Tzu, rabbit, or hamster. I can filter the directory by animal and region for you.";
    }
    if (lowerQuestion.includes("work") || lowerQuestion.includes("process") || lowerQuestion.includes("adopt")) {
        return "Browse a pet, check their health notes, submit an application, then meet the shelter team. The whole journey starts with the Adopt button on a pet card.";
    }
    if (lowerQuestion.includes("home") || lowerQuestion.includes("prepare")) {
        return "Prepare food, water, a quiet settling-in space, and a safe way to travel. Shelters will share the pet's specific routine before handover.";
    }
    if (["dog", "cat", "rabbit", "bird", "hamster"].some((pet) => lowerQuestion.includes(pet))) {
        return "Lovely choice. Use the Find a Pet filters above to browse that animal, then tap a heart to save a favourite or Adopt to start a conversation.";
    }
    if (lowerQuestion.includes("region") || lowerQuestion.includes("near") || lowerQuestion.includes("location")) {
        return "Open Explore by Region to see shelter searches in Hyderabad, Bangalore, Chennai, and Vijayawada on Google Maps. Selecting a region also filters the pet directory.";
    }
    return "I can help with pets, regions, adoption steps, and preparing your home. Try asking: Which pet is best for an apartment?";
}

function Chatbot() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [draft, setDraft] = React.useState("");
    const [messages, setMessages] = React.useState([
        { id: 1, role: "bot", text: "Hi! I can help you find a pet, understand adoption steps, or prepare your home. What are you curious about?" }
    ]);
    const nextMessageId = React.useRef(2);
    const messageListRef = React.useRef(null);
    const inputRef = React.useRef(null);

    React.useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    React.useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages]);

    function ask(question) {
        const text = question.trim();
        if (!text) {
            return;
        }

        const userMessage = { id: nextMessageId.current++, role: "user", text };
        setMessages((currentMessages) => [...currentMessages, userMessage]);
        setDraft("");

        window.setTimeout(() => {
            const botMessage = { id: nextMessageId.current++, role: "bot", text: getPawPalReply(text) };
            setMessages((currentMessages) => [...currentMessages, botMessage]);
        }, 350);
    }

    function handleSubmit(event) {
        event.preventDefault();
        ask(draft);
    }

    return (
        <>
            <button
                className="chat-launcher"
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                aria-label={isOpen ? "Close PawPal assistant" : "Open PawPal assistant"}
                aria-controls="chatPanel"
                aria-expanded={isOpen}
            >
                <span className="chat-pulse" />
                <span aria-hidden="true">🐾</span>
                <small>Ask PawPal</small>
            </button>

            <aside
                className={`chat-panel${isOpen ? " open" : ""}`}
                id="chatPanel"
                aria-label="PawPal adoption assistant"
                aria-hidden={!isOpen}
            >
                <div className="chat-header">
                    <div><strong>PawPal</strong><span>Your adoption sidekick</span></div>
                    <button type="button" onClick={() => setIsOpen(false)} aria-label="Close chat">×</button>
                </div>
                <div className="chat-messages" id="chatMessages" ref={messageListRef} aria-live="polite">
                    {messages.map((message) => (
                        <div className={`chat-message ${message.role}`} key={message.id}>{message.text}</div>
                    ))}
                </div>
                <div className="chat-suggestions">
                    <button type="button" onClick={() => ask("Which pet is best for an apartment?")}>Apartment pets</button>
                    <button type="button" onClick={() => ask("How does adoption work?")}>How it works</button>
                </div>
                <form className="chat-form" onSubmit={handleSubmit}>
                    <input
                        ref={inputRef}
                        id="chatInput"
                        type="text"
                        placeholder="Ask PawPal anything..."
                        autoComplete="off"
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                    />
                    <button type="submit" aria-label="Send message">↑</button>
                </form>
            </aside>
        </>
    );
}

const supportRoot = document.getElementById("reactSupportCards");
const featuresRoot = document.getElementById("reactFeatureCards");
const chatbotRoot = document.getElementById("reactChatbot");
const navigationRoot = document.getElementById("reactNavbar");

if (supportRoot) {
    ReactDOM.createRoot(supportRoot).render(<SupportChannels />);
}

if (featuresRoot) {
    ReactDOM.createRoot(featuresRoot).render(<FeatureCards />);
}

if (chatbotRoot) {
    ReactDOM.createRoot(chatbotRoot).render(<Chatbot />);
}

if (navigationRoot) {
    ReactDOM.createRoot(navigationRoot).render(<NavigationBar />);
}
