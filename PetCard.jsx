import { useState } from "react";

const formatPrice = (amount) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

export default function PetCard({ pet, onAdopt }) {
  const [favorite, setFavorite] = useState(false);
  return (
    <article className="pet-card reveal visible">
      <div className="pet-image">
        <img src={pet.image} alt={pet.name} loading="lazy" />
        <button className={`favorite${favorite ? " active" : ""}`} type="button" onClick={() => setFavorite((saved) => !saved)} aria-label={favorite ? `Remove ${pet.name} from favourites` : `Add ${pet.name} to favourites`} aria-pressed={favorite}>{favorite ? "♥" : "♡"}</button>
        <span className="status">{pet.status}</span>
      </div>
      <div className="pet-info">
        <div className="pet-title"><h3>{pet.name}</h3><span>{pet.gender}</span></div>
        <p>{pet.breed} · {pet.age}</p>
        <div className="health">✓ {pet.health}</div>
        <div className="listed-price"><span>Listed price</span><strong>{formatPrice(pet.price)}</strong></div>
        <div className="pet-bottom"><span>📍 {pet.location}</span><button type="button" onClick={() => onAdopt(pet)}>Adopt</button></div>
      </div>
    </article>
  );
}
