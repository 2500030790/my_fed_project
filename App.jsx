import { useMemo, useState } from "react";
import NavigationBar from "./components/NavigationBar.jsx";
import PetCard from "./components/PetCard.jsx";
import SupportChannels from "./components/SupportChannels.jsx";
import FeatureCards from "./components/FeatureCards.jsx";
import Chatbot from "./components/Chatbot.jsx";
import { pets as initialPets, regions } from "./data/pets.js";

const supportLinks = [
  { label: "WhatsApp support", href: "https://wa.me/916309928174?text=Hi%20PawConnect%2C%20I%20need%20help.", external: true },
  { label: "Email support", href: "mailto:stdemonica11@gmail.com?subject=PawConnect%20Support" },
  { label: "Instagram DM", href: "https://ig.me/m/sir_judebellingham", external: true },
];
const locations = ["Hyderabad", "Chennai", "Bangalore", "Vijayawada"];
const animalTypes = [["dog", "Dogs"], ["cat", "Cats"], ["rabbit", "Rabbits"], ["bird", "Birds"], ["hamster", "Small pets"]];
const listingImageFallback = "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=700&q=80";
const hostelRate = 500;
const formatINR = (amount) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
const getNights = (start, end) => start && end ? Math.max(0, Math.round((new Date(`${end}T00:00:00`) - new Date(`${start}T00:00:00`)) / 86400000)) : 0;
const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);

function Modal({ title, icon, children, onClose, className = "" }) {
  return (
    <div className="modal show" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className={`modal-box ${className}`} role="dialog" aria-modal="true" aria-label={title}>
        <button className="close" type="button" onClick={onClose} aria-label="Close dialog">×</button>
        <div className="modal-icon">{icon}</div>
        {children}
      </section>
    </div>
  );
}

function Hero({ onListPet }) {
  return (
    <section className="hero" id="home">
      <div className="hero-content reveal visible">
        <div className="hero-badge">🐾 Find your perfect companion</div>
        <h1>Give a Pet a <span>Forever Home.</span></h1>
        <p>Discover loving pets waiting for a family. Browse verified adoption listings and find your perfect companion today.</p>
        <div className="hero-buttons"><button className="primary-btn" type="button" onClick={() => document.getElementById("pets")?.scrollIntoView({ behavior: "smooth" })}>Find a Pet →</button><button className="secondary-btn" type="button" onClick={onListPet}>List a Pet</button></div>
        <div className="hero-stats"><div><strong>1,250+</strong><span>Pets Listed</span></div><div><strong>850+</strong><span>Happy Adoptions</span></div><div><strong>120+</strong><span>Verified Shelters</span></div></div>
      </div>
      <div className="hero-image reveal visible"><div className="image-card"><img src={listingImageFallback.replace("w=700", "w=900")} alt="Golden Retriever" /></div><div className="floating-card"><div className="heart">♥</div><div><strong>Max found a home!</strong><small>2 minutes ago</small></div></div></div>
    </section>
  );
}

function SearchBar({ filters, setFilters, onSearch }) {
  const breeds = [...new Set(initialPets.map((pet) => pet.breed))];
  return (
    <section className="search-section"><div className="search-box">
      <div className="search-field"><label htmlFor="typeFilter">I'm looking for</label><select id="typeFilter" value={filters.type} onChange={(event) => setFilters((current) => ({ ...current, type: event.target.value }))}><option value="all">Any Pet</option>{animalTypes.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></div>
      <div className="search-field"><label htmlFor="breedFilter">Breed</label><select id="breedFilter" value={filters.breed} onChange={(event) => setFilters((current) => ({ ...current, breed: event.target.value }))}><option value="all">Any Breed</option>{breeds.map((breed) => <option value={breed} key={breed}>{breed}</option>)}</select></div>
      <div className="search-field"><label htmlFor="locationFilter">Location</label><select id="locationFilter" value={filters.location} onChange={(event) => { setFilters((current) => ({ ...current, location: event.target.value })); onSearch(event.target.value); }}><option value="all">All Locations</option>{locations.map((location) => <option key={location}>{location}</option>)}</select></div>
      <button className="search-btn" type="button" onClick={() => onSearch(filters.location)}>🔍 Search</button>
    </div></section>
  );
}

function Regions({ selected, onSelect, mapLocation }) {
  const mapPlace = mapLocation === "all" ? "India" : mapLocation;
  const zoom = mapLocation === "all" ? 5 : 12;
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(`pet adoption shelters in ${mapPlace}`)}&z=${zoom}&output=embed`;
  return (
    <section className="regions-section" id="regions">
      <div className="section-heading reveal visible"><div><span className="section-label">EXPLORE BY REGION</span><h2>Find your match <span>nearby.</span></h2><p>Discover trusted shelters and adoptable companions across India.</p></div><div className="region-count"><strong>24</strong><span>active shelters</span></div></div>
      <div className="region-layout"><div className="region-list">{regions.map((region) => <button key={region.name} className={`region-chip${selected === region.name ? " active" : ""}`} type="button" onClick={() => onSelect(region.name)}><span>{region.icon}</span>{region.label}<strong>{region.count}</strong></button>)}</div><div className="map-shell"><iframe title={`Google Maps pet shelter search in ${mapPlace}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={mapSrc} /><div className="map-legend">Google Maps · Choose a region to explore nearby shelters</div></div></div>
    </section>
  );
}

function PetDirectory({ listings, onAdopt, filters, onReset }) {
  const filtered = listings.filter((pet) => (filters.type === "all" || pet.type === filters.type) && (filters.breed === "all" || pet.breed === filters.breed) && (filters.location === "all" || pet.location === filters.location));
  return (
    <section className="pets-section" id="pets">
      <div className="section-heading reveal visible"><div><span className="section-label">MEET YOUR MATCH</span><h2>Pets waiting for <span>you.</span></h2><p>Every pet deserves a loving family. Maybe you're the one they've been waiting for.</p></div><button className="view-all" type="button" onClick={onReset}>View All Pets →</button></div>
      <p className="price-disclaimer">Prices are illustrative sample amounts in INR. Confirm the final price and details with the listing owner.</p>
      <div className="pet-grid">{filtered.map((pet) => <PetCard key={pet.id} pet={pet} onAdopt={onAdopt} />)}</div>
      {filtered.length === 0 && <p className="empty-results">No pets match those filters yet. Try another location or pet type.</p>}
    </section>
  );
}

function HostelSection({ notify }) {
  const [stay, setStay] = useState({ checkIn: "", checkOut: "" });
  const nights = getNights(stay.checkIn, stay.checkOut);
  function submitStay(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!nights) { notify("Check-out must be after check-in."); return; }
    const details = ["Hi PawConnect, I'd like to request a temporary pet stay.", `Owner: ${data.get("ownerName")}`, `Phone: ${data.get("ownerPhone")}`, `Pet: ${data.get("petName")} (${data.get("petType")})`, `Dates: ${stay.checkIn} to ${stay.checkOut}`, `Estimated stay: ${nights} ${nights === 1 ? "night" : "nights"} at ${formatINR(hostelRate)}/night = ${formatINR(nights * hostelRate)}`, `Preferred area: ${data.get("stayCity")}`, `Care notes: ${data.get("careNotes") || "None provided"}`].join("\n");
    window.open(`https://wa.me/916309928174?text=${encodeURIComponent(details)}`, "_blank", "noopener,noreferrer");
    notify("Your WhatsApp stay request is ready to send.");
    event.currentTarget.reset();
    setStay({ checkIn: "", checkOut: "" });
  }
  return (
    <section className="hostel-section" id="hostel">
      <div className="hostel-copy reveal visible"><span className="section-label">A SAFE PLACE WHILE YOU TRAVEL</span><h2>Going away? <span>We've got your pet.</span></h2><p>Request a short-term stay for your pet while you are on a trip. Share the dates and care details, and our team will follow up on WhatsApp to confirm availability.</p><div className="hostel-points"><span>♡ Short stays for a few days</span><span>♡ Share your pet's routine and needs</span><span>♡ Human-confirmed booking requests</span><span>♡ Indicative rate: {formatINR(hostelRate)} per night</span></div></div>
      <form className="hostel-form reveal visible" id="hostelForm" onSubmit={submitStay}>
        <div className="hostel-form-heading"><span>🐾</span><div><h3>Request a pet stay</h3><p>We'll continue the conversation on WhatsApp.</p></div></div>
        <div className="form-row"><input name="ownerName" placeholder="Your name" autoComplete="name" required /><input name="ownerPhone" type="tel" placeholder="Your phone number" autoComplete="tel" required /></div>
        <div className="form-row"><input name="petName" placeholder="Pet's name" required /><select name="petType" defaultValue="" required><option value="">Pet type</option>{["Dog", "Cat", "Rabbit", "Bird", "Small pet", "Other"].map((type) => <option key={type}>{type}</option>)}</select></div>
        <div className="form-row"><label className="date-field">Check-in<input name="checkIn" type="date" min={today} value={stay.checkIn} onChange={(event) => setStay((current) => ({ checkIn: event.target.value, checkOut: current.checkOut <= event.target.value ? "" : current.checkOut }))} required /></label><label className="date-field">Check-out<input name="checkOut" type="date" min={stay.checkIn || today} value={stay.checkOut} onChange={(event) => setStay((current) => ({ ...current, checkOut: event.target.value }))} required /></label></div>
        <input name="stayCity" placeholder="City / preferred area" required /><textarea name="careNotes" placeholder="Care needs, feeding routine, or anything we should know" />
        <div className="stay-price-estimate" aria-live="polite">{nights ? `${nights} ${nights === 1 ? "night" : "nights"} × ${formatINR(hostelRate)} = ${formatINR(nights * hostelRate)} estimated total` : `Indicative rate: ${formatINR(hostelRate)} per night. Select dates for an estimate.`}</div>
        <button className="primary-btn full" type="submit">Continue on WhatsApp <span>→</span></button><small className="hostel-note">Estimate only; the final stay price and availability are confirmed by the team.</small>
      </form>
    </section>
  );
}

function HowItWorks() {
  const steps = [["01", "🔎", "Find Your Pet", "Browse verified pets using filters for breed, age and location."], ["02", "📋", "Apply for Adoption", "Submit a simple adoption application with your details."], ["03", "💬", "Connect & Meet", "Communicate with the shelter and arrange a meeting."], ["04", "🏠", "Bring Them Home", "Complete the adoption process and welcome your new companion."]];
  return <section className="how-section" id="how"><div className="center-heading"><span className="section-label">SIMPLE & TRANSPARENT</span><h2>How adoption <span>works.</span></h2><p>We've made the process simple so you can focus on finding your new best friend.</p></div><div className="steps">{steps.map(([number, icon, title, text]) => <article className="step" key={number}><div className="step-number">{number}</div><div className="step-icon">{icon}</div><h3>{title}</h3><p>{text}</p></article>)}</div></section>;
}

function Footer({ onListPet }) {
  return <footer><div className="footer-content"><div className="footer-brand"><div className="logo"><span className="logo-icon">🐾</span><span>Paw<span>Connect</span></span></div><p>Connecting loving families with pets waiting for a forever home.</p></div><div><h4>Platform</h4><a href="#pets">Find a Pet</a><a href="#hostel">Pet Hostel</a><a href="#how">How It Works</a><a href="#listPetModal" onClick={(event) => { event.preventDefault(); onListPet(); }}>List a Pet</a></div><div><h4>Support</h4><a href="#support">Contact Us</a>{supportLinks.map((link) => <a key={link.label} href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined}>{link.label}</a>)}<a href="#">Privacy Policy</a></div></div><div className="copyright">© 2026 PawConnect. Built for better pet adoption. 🐾</div></footer>;
}

function App() {
  const [listings, setListings] = useState(initialPets);
  const [filters, setFilters] = useState({ type: "all", breed: "all", location: "all" });
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [dialog, setDialog] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [toast, setToast] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  function notify(message) {
    setToast(message);
    window.clearTimeout(notify.timeout);
    notify.timeout = window.setTimeout(() => setToast(""), 2800);
  }
  function adopt(pet) { setSelectedPet(pet); setDialog("adoption"); }
  function chooseRegion(region) {
    setSelectedRegion(region);
    setFilters((current) => ({ ...current, location: region }));
    if (region !== "all") document.getElementById("pets")?.scrollIntoView({ behavior: "smooth" });
  }
  function resetFilters() {
    setFilters({ type: "all", breed: "all", location: "all" });
    setSelectedRegion("all");
    notify("Showing all pets");
  }
  function submitListing(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("petName");
    const newPet = { id: `new-${Date.now()}`, name, type: data.get("petType"), breed: data.get("petBreed"), age: data.get("petAge"), gender: data.get("petGender"), location: data.get("petLocation"), price: Number(data.get("petPrice")), image: data.get("petImage") || listingImageFallback, health: "Story shared · Pending review", status: "New listing" };
    setListings((current) => [newPet, ...current]);
    event.currentTarget.reset();
    setDialog(null);
    notify(`${name} is now listed for review!`);
    document.getElementById("pets")?.scrollIntoView({ behavior: "smooth" });
  }
  function submitSimpleForm(event, successMessage) {
    event.preventDefault();
    setDialog(null);
    setAuthenticated(true);
    notify(successMessage);
  }
  function closeDialog() { setDialog(null); }

  const filteredCount = useMemo(() => listings.filter((pet) => (filters.type === "all" || pet.type === filters.type) && (filters.breed === "all" || pet.breed === filters.breed) && (filters.location === "all" || pet.location === filters.location)).length, [filters, listings]);

  return (
    <>
      <NavigationBar onLogin={() => setDialog("login")} onAdopt={() => document.getElementById("pets")?.scrollIntoView({ behavior: "smooth" })} />
      <main>
        <Hero onListPet={() => setDialog("listing")} />
        <SearchBar filters={filters} setFilters={setFilters} onSearch={(location) => { setSelectedRegion(location); notify(`${filteredCount} ${filteredCount === 1 ? "pet" : "pets"} found`); }} />
        <Regions selected={selectedRegion} onSelect={chooseRegion} mapLocation={filters.location} />
        <PetDirectory listings={listings} onAdopt={adopt} filters={filters} onReset={resetFilters} />
        <HostelSection notify={notify} />
        <section className="support-section" id="support"><div className="center-heading reveal visible"><span className="section-label">REAL PEOPLE, HERE TO HELP</span><h2>How can we <span>help?</span></h2><p>Choose the channel that works best for you. WhatsApp opens a direct chat with our support number.</p></div><div className="support-grid"><SupportChannels /></div></section>
        <HowItWorks />
        <section className="features-section" id="about"><div className="center-heading"><span className="section-label">WHY PAWCONNECT?</span><h2>Adoption made <span>better.</span></h2></div><FeatureCards /></section>
      </main>
      <Footer onListPet={() => setDialog("listing")} />
      <div className="floating-pets" aria-hidden="true"><span className="sky-pet sky-pet-one">🐕</span><span className="sky-pet sky-pet-two">🐈</span><span className="sky-pet sky-pet-three">🐇</span><span className="sky-pet sky-pet-four">🦜</span></div>
      <Chatbot />
      {toast && <div className="toast show" role="status" aria-live="polite">{toast}</div>}

      {!authenticated && <div className="welcome-gate"><div className="gate-orbit orbit-one" /><div className="gate-orbit orbit-two" /><div className="gate-content"><div className="gate-mark">🐾</div><span className="section-label">THE KINDER WAY HOME</span><h2>Every story starts<br /><span>with a hello.</span></h2><p>Sign in to explore verified pets, save your favourites, and connect with shelters in your region.</p><button className="primary-btn gate-button" type="button" onClick={() => setDialog("login")}>Enter PawConnect <span>→</span></button><button className="gate-register" type="button" onClick={() => setDialog("register")}>New here? Create an account</button><div className="gate-support-links" aria-label="Customer support shortcuts">{supportLinks.map((link) => <a key={link.label} href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined}>{link.label}</a>)}</div><small>Private, human-led adoption matching</small></div></div>}

      {dialog === "login" && <Modal title="Login" icon="🐾" onClose={closeDialog}><h2>Welcome Back!</h2><p>Login to your PawConnect account.</p><form onSubmit={(event) => submitSimpleForm(event, "Welcome back to PawConnect!")}><input type="email" placeholder="Email address" required /><input type="password" placeholder="Password" required /><button className="primary-btn full">Login</button></form><p className="switch">Don't have an account? <button type="button" onClick={() => setDialog("register")}>Register</button></p></Modal>}
      {dialog === "register" && <Modal title="Create account" icon="🐶" onClose={closeDialog}><h2>Create Account</h2><p>Join our pet adoption community.</p><form onSubmit={(event) => submitSimpleForm(event, "Your PawConnect account is ready!")}><input placeholder="Full name" required /><input type="email" placeholder="Email address" required /><input type="password" placeholder="Create password" required /><select defaultValue="" required><option value="">Select account type</option><option>Adopter</option><option>Shelter / Pet Owner</option></select><button className="primary-btn full">Create Account</button></form><p className="switch">Already have an account? <button type="button" onClick={() => setDialog("login")}>Login</button></p></Modal>}
      {dialog === "listing" && <Modal title="List a pet" icon="🐾" className="listing-modal-box" onClose={closeDialog}><h2>List a Pet</h2><p>Share a few details and help your companion find the right family.</p><form onSubmit={submitListing}><div className="form-row"><input name="petName" placeholder="Pet name" required /><select name="petType" defaultValue="" required><option value="">Animal type</option>{animalTypes.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></div><div className="form-row"><input name="petBreed" placeholder="Breed" required /><input name="petAge" placeholder="Age (e.g. 2 years)" required /></div><input name="petPrice" type="number" min="0" step="1" placeholder="Listing price in ₹" required /><div className="form-row"><select name="petLocation" defaultValue="" required><option value="">Location</option>{locations.map((location) => <option key={location}>{location}</option>)}</select><select name="petGender" defaultValue="" required><option value="">Gender</option><option value="♂">Male</option><option value="♀">Female</option></select></div><input name="petImage" type="url" placeholder="Photo URL (optional)" /><textarea name="petStory" placeholder="Tell adopters about their personality and needs" required /><button className="primary-btn full">Publish Pet Listing <span>→</span></button></form></Modal>}
      {dialog === "adoption" && selectedPet && <Modal title={`Adopt ${selectedPet.name}`} icon="❤️" onClose={closeDialog}><h2>Adopt <span>{selectedPet.name}</span></h2><p>Tell us a little about yourself and your home environment.</p><form onSubmit={(event) => submitSimpleForm(event, `Application for ${selectedPet.name} submitted successfully!`)}><input placeholder="Your full name" required /><input type="tel" placeholder="Phone number" required /><input placeholder="City" required /><select defaultValue="" required><option value="">Do you have previous pet experience?</option><option>Yes</option><option>No</option></select><textarea placeholder="Why would you like to adopt this pet?" required /><button className="primary-btn full">Submit Application</button></form></Modal>}
    </>
  );
}

export default App;
