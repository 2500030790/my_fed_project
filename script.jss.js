// ===============================
// MOBILE MENU
// ===============================

function toggleMenu() {
    const navMenu = document.getElementById("navMenu");
    const menuButton = document.querySelector(".menu-btn");

    if (navMenu) {
        const isOpen = navMenu.classList.toggle("active");
        menuButton?.setAttribute("aria-expanded", String(isOpen));
    }
}

function closeMenu() {
    const navMenu = document.getElementById("navMenu");
    const menuButton = document.querySelector(".menu-btn");
    navMenu?.classList.remove("active");
    menuButton?.setAttribute("aria-expanded", "false");
}


// ===============================
// SCROLL TO PETS
// ===============================

function scrollToPets() {
    const petsSection = document.getElementById("pets");

    if (petsSection) {
        petsSection.scrollIntoView({
            behavior: "smooth"
        });
    }
}


// ===============================
// PET FILTER
// ===============================

function filterPets() {

    const typeFilter = document.getElementById("typeFilter");
    const breedFilter = document.getElementById("breedFilter");
    const locationFilter = document.getElementById("locationFilter");

    if (!typeFilter || !breedFilter) {
        return;
    }

    const selectedType = typeFilter.value;
    const selectedBreed = breedFilter.value;
    const selectedLocation = locationFilter ? locationFilter.value : "all";

    updateGoogleMap(selectedLocation);

    const petCards = document.querySelectorAll(".pet-card");

    let visiblePets = 0;

    petCards.forEach(function (pet, index) {

        const petType = pet.getAttribute("data-type");
        const petBreed = pet.getAttribute("data-breed");
        const petLocation = pet.querySelector(".pet-bottom span")?.textContent.replace("📍 ", "").trim();

        const typeMatches =
            selectedType === "all" ||
            petType === selectedType;

        const breedMatches =
            selectedBreed === "all" ||
            petBreed === selectedBreed;

        const locationMatches =
            selectedLocation === "all" ||
            petLocation === selectedLocation;

        if (typeMatches && breedMatches && locationMatches) {
            pet.classList.remove("is-hidden");
            pet.style.animationDelay = (visiblePets * 70) + "ms";
            visiblePets += 1;
        } else {
            pet.classList.add("is-hidden");
        }

    });

    showToast(visiblePets + (visiblePets === 1 ? " pet" : " pets") + " found");
}


// ===============================
// RESET FILTERS
// ===============================

function resetFilters() {

    const typeFilter = document.getElementById("typeFilter");
    const breedFilter = document.getElementById("breedFilter");
    const locationFilter = document.getElementById("locationFilter");

    if (typeFilter) {
        typeFilter.value = "all";
        typeFilter.dispatchEvent(new Event("change", { bubbles: true }));
    }

    if (breedFilter) {
        breedFilter.value = "all";
        breedFilter.dispatchEvent(new Event("change", { bubbles: true }));
    }

    if (locationFilter) {
        locationFilter.value = "all";
        locationFilter.dispatchEvent(new Event("change", { bubbles: true }));
    }

    const petCards = document.querySelectorAll(".pet-card");

    petCards.forEach(function (pet, index) {
        pet.classList.remove("is-hidden");
        pet.style.animationDelay = (index * 70) + "ms";
    });

    document.querySelectorAll(".region-chip").forEach(function (chip) {
        chip.classList.toggle("active", chip.dataset.region === "all");
    });

    showToast("Showing all pets");
}


// ===============================
// FAVORITE BUTTON
// ===============================

function toggleFavorite(button) {

    button.classList.toggle("active");

    if (button.classList.contains("active")) {
        button.innerHTML = "♥";
    } else {
        button.innerHTML = "♡";
    }
}


// ===============================
// LOGIN MODAL
// ===============================

function openLogin() {

    const modal = document.getElementById("loginModal");

    if (modal) {
        modal.classList.add("show");
    }
}

function unlockApp() {
    document.body.classList.add("is-authenticated");
    const gate = document.getElementById("welcomeGate");
    if (gate) {
        gate.classList.add("is-hidden");
    }
}


// ===============================
// REGISTER MODAL
// ===============================

function openRegister() {

    const modal = document.getElementById("registerModal");

    if (modal) {
        modal.classList.add("show");
    }
}

function openListPet() {
    const modal = document.getElementById("listPetModal");
    if (modal) {
        modal.classList.add("show");
    }
}

function escapeHTML(value) {
    return String(value).replace(/[&<>'"]/g, function (character) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "'": "&#39;",
            '"': "&quot;"
        }[character];
    });
}

function formatINR(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(amount);
}

function renderPetPrices() {
    document.querySelectorAll(".pet-card[data-price]").forEach(function (petCard) {
        const petInfo = petCard.querySelector(".pet-info");
        const petBottom = petInfo?.querySelector(".pet-bottom");
        if (!petInfo || !petBottom || petInfo.querySelector(".listed-price")) {
            return;
        }

        const priceLine = document.createElement("div");
        priceLine.className = "listed-price";
        priceLine.innerHTML = "<span>Listed price</span><strong>" + formatINR(Number(petCard.dataset.price)) + "</strong>";
        petBottom.before(priceLine);
    });
}

function submitPetListing(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const name = formData.get("petName");
    const type = formData.get("petType");
    const breed = formData.get("petBreed");
    const age = formData.get("petAge");
    const price = Number(formData.get("petPrice"));
    const location = formData.get("petLocation");
    const gender = formData.get("petGender");
    const image = formData.get("petImage") || "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=700&q=80";
    const story = formData.get("petStory");
    const petCard = document.createElement("article");

    petCard.className = "pet-card reveal visible newly-listed";
    petCard.dataset.type = type;
    petCard.dataset.breed = breed;
    petCard.dataset.price = String(price);
    petCard.innerHTML = "<div class=\"pet-image\"><img src=\"" + escapeHTML(image) + "\" alt=\"" + escapeHTML(name) + "\"><button class=\"favorite\" onclick=\"toggleFavorite(this)\">♡</button><span class=\"status\">New listing</span></div>" +
        "<div class=\"pet-info\"><div class=\"pet-title\"><h3>" + escapeHTML(name) + "</h3><span>" + escapeHTML(gender) + "</span></div><p>" + escapeHTML(breed) + " • " + escapeHTML(age) + "</p><div class=\"health\">✓ Story shared &nbsp; ✓ Pending review</div><div class=\"listed-price\"><span>Listed price</span><strong>" + formatINR(price) + "</strong></div><div class=\"pet-bottom\"><span>📍 " + escapeHTML(location) + "</span><button onclick=\"openAdoption('" + escapeHTML(name).replace(/'/g, "\\'") + "')\">Adopt</button></div></div>";

    const storyNode = document.createElement("span");
    storyNode.textContent = story;
    storyNode.className = "listing-story";
    petCard.querySelector(".pet-info").appendChild(storyNode);
    document.getElementById("petGrid")?.prepend(petCard);
    form.reset();
    closeModal("listPetModal");
    showToast(name + " is now listed for review!");
    scrollToPets();
}

const HOSTEL_RATE_PER_NIGHT = 500;

function getStayNights(checkIn, checkOut) {
    if (!checkIn || !checkOut) {
        return 0;
    }
    const start = new Date(checkIn + "T00:00:00");
    const end = new Date(checkOut + "T00:00:00");
    return Math.max(0, Math.round((end - start) / 86400000));
}

function updateHostelEstimate() {
    const form = document.getElementById("hostelForm");
    const estimate = document.getElementById("stayPriceEstimate");
    if (!form || !estimate) {
        return;
    }

    const nights = getStayNights(form.elements.checkIn.value, form.elements.checkOut.value);
    if (!nights) {
        estimate.textContent = "Indicative rate: " + formatINR(HOSTEL_RATE_PER_NIGHT) + " per night. Select dates for an estimate.";
        return;
    }

    estimate.textContent = nights + (nights === 1 ? " night" : " nights") + " × " + formatINR(HOSTEL_RATE_PER_NIGHT) + " = " + formatINR(nights * HOSTEL_RATE_PER_NIGHT) + " estimated total";
}

function submitHostelRequest(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const checkIn = formData.get("checkIn");
    const checkOut = formData.get("checkOut");

    if (new Date(checkOut + "T00:00:00") <= new Date(checkIn + "T00:00:00")) {
        showToast("Check-out must be after check-in.");
        form.elements.checkOut.focus();
        return;
    }

    const nights = getStayNights(checkIn, checkOut);
    const estimatedCost = nights * HOSTEL_RATE_PER_NIGHT;

    const details = [
        "Hi PawConnect, I'd like to request a temporary pet stay.",
        "Owner: " + formData.get("ownerName"),
        "Phone: " + formData.get("ownerPhone"),
        "Pet: " + formData.get("petName") + " (" + formData.get("petType") + ")",
        "Dates: " + checkIn + " to " + checkOut,
        "Estimated stay: " + nights + (nights === 1 ? " night" : " nights") + " at " + formatINR(HOSTEL_RATE_PER_NIGHT) + "/night = " + formatINR(estimatedCost),
        "Preferred area: " + formData.get("stayCity"),
        "Care notes: " + (formData.get("careNotes") || "None provided")
    ].join("\n");

    const whatsappUrl = "https://wa.me/916309928174?text=" + encodeURIComponent(details);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    showToast("Your WhatsApp stay request is ready to send.");
}

function setHostelDateLimits() {
    const checkIn = document.querySelector('#hostelForm [name="checkIn"]');
    const checkOut = document.querySelector('#hostelForm [name="checkOut"]');
    if (!checkIn || !checkOut) {
        return;
    }

    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    checkIn.min = localToday;
    checkOut.min = localToday;
    checkIn.addEventListener("change", function () {
        checkOut.min = checkIn.value || localToday;
        if (checkOut.value && checkOut.value <= checkIn.value) {
            checkOut.value = "";
        }
        updateHostelEstimate();
    });
    checkOut.addEventListener("change", updateHostelEstimate);
    updateHostelEstimate();
}


// ===============================
// ADOPTION MODAL
// ===============================

function openAdoption(petName) {

    const petNameElement =
        document.getElementById("selectedPet");

    const modal =
        document.getElementById("adoptionModal");

    if (petNameElement) {
        petNameElement.textContent = petName;
    }

    if (modal) {
        modal.classList.add("show");
    }
}


// ===============================
// CLOSE MODAL
// ===============================

function closeModal(modalId) {

    const modal = document.getElementById(modalId);

    if (modal) {
        modal.classList.remove("show");
    }
}


// ===============================
// SWITCH LOGIN → REGISTER
// ===============================

function switchToRegister() {

    closeModal("loginModal");

    openRegister();
}


// ===============================
// SWITCH REGISTER → LOGIN
// ===============================

function switchToLogin() {

    closeModal("registerModal");

    openLogin();
}


// ===============================
// LOGIN FORM
// ===============================

function login(event) {

    event.preventDefault();

    showToast("Welcome back to PawConnect!");

    closeModal("loginModal");
    unlockApp();
}


// ===============================
// REGISTER FORM
// ===============================

function register(event) {

    event.preventDefault();

    showToast("Your PawConnect account is ready!");

    closeModal("registerModal");
    unlockApp();
}


// ===============================
// ADOPTION APPLICATION
// ===============================

function submitApplication(event) {

    event.preventDefault();

    const petElement =
        document.getElementById("selectedPet");

    let petName = "the selected pet";

    if (petElement) {
        petName = petElement.textContent;
    }

    showToast("Application for " + petName + " submitted successfully!");

    closeModal("adoptionModal");
}


// ===============================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// ===============================

window.addEventListener("click", function (event) {

    if (event.target.classList.contains("modal")) {

        event.target.classList.remove("show");

    }

});

function showToast(message) {
    const toast = document.getElementById("toast");

    if (!toast) {
        return;
    }

    toast.textContent = message;
    toast.classList.remove("show");
    void toast.offsetWidth;
    toast.classList.add("show");

    window.clearTimeout(showToast.timeout);
    showToast.timeout = window.setTimeout(function () {
        toast.classList.remove("show");
    }, 2800);
}

function setupRevealAnimations() {
    const revealItems = document.querySelectorAll('.reveal');

    if (!revealItems.length) {
        return;
    }

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.18,
        rootMargin: '0px 0px -30px 0px'
    });

    revealItems.forEach(function (item, index) {
        item.style.transitionDelay = (index * 80) + 'ms';
        observer.observe(item);
    });
}

function updateGoogleMap(regionName) {
    const map = document.getElementById("googleAdoptionMap");
    if (!map) {
        return;
    }

    const place = regionName === "all" ? "India" : regionName;
    const zoom = regionName === "all" ? 5 : 12;
    const query = "pet adoption shelters in " + place;
    map.src = "https://maps.google.com/maps?q=" + encodeURIComponent(query) + "&z=" + zoom + "&output=embed";
    map.title = "Google Maps pet adoption shelter search in " + place;
}

function selectRegion(regionName, button) {
    updateGoogleMap(regionName);

    document.querySelectorAll(".region-chip").forEach(function (chip) {
        chip.classList.toggle("active", chip.dataset.region === regionName);
    });

    const locationFilter = document.getElementById("locationFilter");
    if (locationFilter) {
        locationFilter.value = regionName;
        locationFilter.dispatchEvent(new Event("change", { bubbles: true }));
    }

    if (regionName === "all") {
        resetFilters();
        return;
    }

    filterPets();
    document.getElementById("pets")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function toggleChat() {
    const panel = document.getElementById("chatPanel");
    if (panel) {
        panel.classList.toggle("open");
        if (panel.classList.contains("open")) {
            document.getElementById("chatInput")?.focus();
        }
    }
}

function addChatMessage(message, role) {
    const messages = document.getElementById("chatMessages");
    if (!messages) {
        return;
    }
    const bubble = document.createElement("div");
    bubble.className = "chat-message " + role;
    bubble.textContent = message;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
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
    if (lowerQuestion.includes("dog") || lowerQuestion.includes("cat") || lowerQuestion.includes("rabbit") || lowerQuestion.includes("bird") || lowerQuestion.includes("hamster")) {
        return "Lovely choice. Use the Find a Pet filters above to browse that animal, then tap a heart to save a favourite or Adopt to start a conversation.";
    }
    if (lowerQuestion.includes("region") || lowerQuestion.includes("near") || lowerQuestion.includes("location")) {
        return "Open Explore by Region to see shelter searches in Hyderabad, Bangalore, Chennai, and Vijayawada on Google Maps. Selecting a region also filters the pet directory.";
    }
    return "I can help with pets, regions, adoption steps, and preparing your home. Try asking: Which pet is best for an apartment?";
}

function askPawPal(question) {
    if (!question) {
        return;
    }
    addChatMessage(question, "user");
    window.setTimeout(function () {
        addChatMessage(getPawPalReply(question), "bot");
    }, 350);
}

function sendChat(event) {
    event.preventDefault();
    const input = document.getElementById("chatInput");
    const question = input?.value.trim();
    if (!question) {
        return;
    }
    askPawPal(question);
    input.value = "";
}

function setupCursorEffects() {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches && window.innerWidth > 768;
    if (!canHover) {
        return;
    }

    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    document.body.appendChild(glow);
    const cursorPet = document.createElement("div");
    cursorPet.className = "cursor-pet";
    cursorPet.innerHTML = "<span>🐾</span><i>✦</i>";
    cursorPet.setAttribute("aria-hidden", "true");
    document.body.appendChild(cursorPet);
    document.addEventListener("pointermove", function (event) {
        glow.style.left = event.clientX + "px";
        glow.style.top = event.clientY + "px";
        cursorPet.style.left = event.clientX + 16 + "px";
        cursorPet.style.top = event.clientY + 16 + "px";
    });

    document.addEventListener("pointerdown", function () {
        cursorPet.classList.add("pressed");
    });
    document.addEventListener("pointerup", function () {
        cursorPet.classList.remove("pressed");
    });

    document.querySelectorAll(".pet-card, .feature, .step").forEach(function (card) {
        card.addEventListener("pointermove", function (event) {
            const bounds = card.getBoundingClientRect();
            const rotateX = ((event.clientY - bounds.top) / bounds.height - .5) * -5;
            const rotateY = ((event.clientX - bounds.left) / bounds.width - .5) * 5;
            card.style.transform = "perspective(800px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) translateY(-6px)";
        });
        card.addEventListener("pointerleave", function () {
            card.style.transform = "";
        });
    });
}

function setupCustomDropdowns() {
    document.querySelectorAll("select").forEach(function (select) {
        if (select.dataset.customized === "true") {
            return;
        }

        select.dataset.customized = "true";
        const shell = document.createElement("div");
        shell.className = "select-shell";
        select.parentNode.insertBefore(shell, select);
        shell.appendChild(select);

        const trigger = document.createElement("button");
        trigger.type = "button";
        trigger.className = "select-trigger";
        trigger.setAttribute("aria-haspopup", "listbox");
        trigger.setAttribute("aria-expanded", "false");
        shell.appendChild(trigger);

        const menu = document.createElement("div");
        menu.className = "select-menu";
        menu.setAttribute("role", "listbox");
        shell.appendChild(menu);

        function syncValue() {
            const selectedOption = select.options[select.selectedIndex];
            trigger.innerHTML = "<span>" + (selectedOption ? selectedOption.textContent : "Select an option") + "</span><b>⌄</b>";
            menu.querySelectorAll("[role='option']").forEach(function (option) {
                option.classList.toggle("selected", option.dataset.value === select.value);
            });
        }

        Array.from(select.options).forEach(function (option, index) {
            const item = document.createElement("button");
            item.type = "button";
            item.className = "select-option";
            item.setAttribute("role", "option");
            item.dataset.value = option.value;
            item.innerHTML = "<i>" + String(index + 1).padStart(2, "0") + "</i><span>" + option.textContent + "</span>";
            item.addEventListener("click", function () {
                select.value = option.value;
                select.dispatchEvent(new Event("change", { bubbles: true }));
                syncValue();
                shell.classList.remove("open");
                trigger.setAttribute("aria-expanded", "false");
            });
            menu.appendChild(item);
        });

        trigger.addEventListener("click", function () {
            const isOpen = shell.classList.toggle("open");
            document.querySelectorAll(".select-shell.open").forEach(function (otherShell) {
                if (otherShell !== shell) {
                    otherShell.classList.remove("open");
                    otherShell.querySelector(".select-trigger")?.setAttribute("aria-expanded", "false");
                }
            });
            trigger.setAttribute("aria-expanded", String(isOpen));
        });

        select.addEventListener("change", syncValue);
        if (select.form) {
            select.form.addEventListener("reset", function () {
                window.setTimeout(syncValue, 0);
            });
        }
        syncValue();
    });

    document.addEventListener("click", function (event) {
        if (!event.target.closest(".select-shell")) {
            document.querySelectorAll(".select-shell.open").forEach(function (shell) {
                shell.classList.remove("open");
                shell.querySelector(".select-trigger")?.setAttribute("aria-expanded", "false");
            });
        }
    });
}

window.addEventListener('DOMContentLoaded', function () {
    setupRevealAnimations();
    renderPetPrices();
    setupCursorEffects();
    setupCustomDropdowns();
    setHostelDateLimits();
    document.querySelectorAll("#navMenu a").forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMenu();
            document.querySelectorAll(".modal.show").forEach(function (modal) {
                modal.classList.remove("show");
            });
        }
    });
    document.body.classList.add("auth-required");
});