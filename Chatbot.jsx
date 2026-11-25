import { useEffect, useRef, useState } from "react";

function replyTo(question) {
  const text = question.toLowerCase();
  if (text.includes("apartment") || text.includes("small home")) return "For an apartment, try a calm cat, Shih Tzu, rabbit, or hamster. Use the directory filters to explore pets nearby.";
  if (text.includes("work") || text.includes("process") || text.includes("adopt")) return "Browse a pet, check their health notes, submit an application, then meet the shelter team. Start with the Adopt button on a pet card.";
  if (text.includes("home") || text.includes("prepare")) return "Prepare food, water, a quiet settling-in space, and safe transport. The shelter can share the pet's routine before handover.";
  if (["dog", "cat", "rabbit", "bird", "hamster"].some((pet) => text.includes(pet))) return "Lovely choice. Use the Find a Pet filters to browse that animal, then tap a heart to save a favourite.";
  if (text.includes("region") || text.includes("near") || text.includes("location")) return "Explore Regions to search shelters in Hyderabad, Bangalore, Chennai, and Vijayawada on Google Maps.";
  return "I can help with pets, regions, adoption steps, and preparing your home. Try asking: Which pet is best for an apartment?";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([{ id: 1, role: "bot", text: "Hi! I can help you find a pet, understand adoption steps, or prepare your home. What are you curious about?" }]);
  const sequence = useRef(2);
  const inputRef = useRef(null);
  const messagesRef = useRef(null);

  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);
  useEffect(() => { if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight; }, [messages]);

  function ask(question) {
    const prompt = question.trim();
    if (!prompt) return;
    setMessages((current) => [...current, { id: sequence.current++, role: "user", text: prompt }]);
    setDraft("");
    window.setTimeout(() => setMessages((current) => [...current, { id: sequence.current++, role: "bot", text: replyTo(prompt) }]), 350);
  }

  return (
    <>
      <button className="chat-launcher" type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close PawPal assistant" : "Open PawPal assistant"} aria-controls="chatPanel" aria-expanded={open}>
        <span className="chat-pulse" /><span aria-hidden="true">🐾</span><small>Ask PawPal</small>
      </button>
      <aside className={`chat-panel${open ? " open" : ""}`} id="chatPanel" aria-label="PawPal adoption assistant" aria-hidden={!open}>
        <div className="chat-header"><div><strong>PawPal</strong><span>Your adoption sidekick</span></div><button type="button" aria-label="Close chat" onClick={() => setOpen(false)}>×</button></div>
        <div className="chat-messages" ref={messagesRef} aria-live="polite">{messages.map((message) => <div className={`chat-message ${message.role}`} key={message.id}>{message.text}</div>)}</div>
        <div className="chat-suggestions"><button type="button" onClick={() => ask("Which pet is best for an apartment?")}>Apartment pets</button><button type="button" onClick={() => ask("How does adoption work?")}>How it works</button></div>
        <form className="chat-form" onSubmit={(event) => { event.preventDefault(); ask(draft); }}>
          <input ref={inputRef} type="text" placeholder="Ask PawPal anything..." autoComplete="off" value={draft} onChange={(event) => setDraft(event.target.value)} />
          <button type="submit" aria-label="Send message">↑</button>
        </form>
      </aside>
    </>
  );
}
