import { useEffect, useState } from "react";

const links = [
  ["#home", "Home"], ["#pets", "Find a Pet"], ["#regions", "Regions"],
  ["#hostel", "Pet Hostel"], ["#how", "How It Works"], ["#support", "Support"], ["#about", "About"],
];

export default function NavigationBar({ onLogin, onAdopt }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event) => event.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className="navbar">
      <a className="logo" href="#home" onClick={() => setMenuOpen(false)} aria-label="PawConnect home">
        <span className="logo-icon">🐾</span><span>Paw<span>Connect</span></span>
      </a>
      <nav id="navMenu" className={menuOpen ? "active" : ""} aria-label="Main navigation">
        {links.map(([href, label]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </nav>
      <div className="nav-actions">
        <button className="login-btn" type="button" onClick={onLogin}>Login</button>
        <button className="adopt-btn" type="button" onClick={onAdopt}>Adopt a Pet</button>
        <button className="menu-btn" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-controls="navMenu" aria-expanded={menuOpen}>{menuOpen ? "×" : "☰"}</button>
      </div>
    </header>
  );
}
