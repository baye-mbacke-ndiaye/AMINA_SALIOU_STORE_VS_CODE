// AMINA SALIOU STORE — front-end demonstration.
// Before production, connect a real database, authentication, payment and order management backend.
const STORE = {
  whatsapp: "221772496257", // Replace with the real business number, digits only, e.g. 221771234567
  currency: "FCFA",
  products: [
    { id: 1, name: "Abaya Élégance", category: "Abayas", price: 25000, color: "Prune", swatches: ["#51243f", "#28252a", "#d9c8c7"], image: "https://i.pinimg.com/736x/4a/f1/5c/4af15c7b972365efe79685de6fb20221.jpg", badge: "SÉLECTION" },
    { id: 2, name: "Robe Modeste", category: "Robes pudiques", price: 18000, color: "Rose poudré", swatches: ["#d9b8c2", "#d9d2e5", "#29242a"], image: "https://i.pinimg.com/736x/4a/f1/5c/4af15c7b972365efe79685de6fb20221.jpg", badge: "NOUVEAU" },
    { id: 3, name: "Hijab Premium", category: "Hijabs", price: 5000, color: "Lavande", swatches: ["#dcd4e8", "#f1e5d8", "#51243f"], image: "https://i.pinimg.com/736x/4a/f1/5c/4af15c7b972365efe79685de6fb20221.jpg" },
    { id: 4, name: "Ensemble Signature", category: "Ensembles", price: 22000, color: "Beige", swatches: ["#d8c9b9", "#28252a", "#6d344b"], image: "https://i.pinimg.com/736x/4a/f1/5c/4af15c7b972365efe79685de6fb20221.jpg" },
    { id: 5, name: "Jalaba Premium", category: "Abayas", price: 20000, color: "Bleu profond", swatches: ["#176e85", "#c6dce7", "#9e7a5b"], image: "https://i.pinimg.com/736x/4a/f1/5c/4af15c7b972365efe79685de6fb20221.jpg", badge: "NOUVEAU" },
    { id: 6, name: "Kimar Signature", category: "Hijabs", price: 12500, color: "Crème", swatches: ["#f1e9dc", "#89717c", "#242124"], image: "https://i.pinimg.com/736x/4a/f1/5c/4af15c7b972365efe79685de6fb20221.jpg" },
    { id: 7, name: "Pantalon Fluide", category: "Ensembles", price: 12000, color: "Caramel", swatches: ["#9a5b32", "#252328", "#e1d7ca"], image: "https://i.pinimg.com/736x/4a/f1/5c/4af15c7b972365efe79685de6fb20221.jpg" },
    { id: 8, name: "Parure Dorée", category: "Accessoires", price: 8000, color: "Or", swatches: ["#c4a46a", "#e9d9b9"], image: "https://i.pinimg.com/736x/4a/f1/5c/4af15c7b972365efe79685de6fb20221.jpg" },
    { id: 9, name: "Montre Élégance", category: "Accessoires", price: 15000, color: "Champagne", swatches: ["#c4a46a", "#28252a"], image: "https://i.pinimg.com/736x/4a/f1/5c/4af15c7b972365efe79685de6fb20221.jpg" },
    { id: 10, name: "Abaya Sérénité", category: "Abayas", price: 27500, color: "Vert profond", swatches: ["#164b3b", "#51243f", "#e1d6cb"], image: "https://i.pinimg.com/736x/4a/f1/5c/4af15c7b972365efe79685de6fb20221.jpg", badge: "SIGNATURE" },
    { id: 11, name: "Foulard Douceur", category: "Hijabs", price: 4500, color: "Taupe", swatches: ["#b8a3a1", "#e5d9ce", "#6e3d4c"], image: "https://i.pinimg.com/736x/4a/f1/5c/4af15c7b972365efe79685de6fb20221.jpg" },
    { id: 12, name: "Robe Céleste", category: "Robes pudiques", price: 19500, color: "Bleu ciel", swatches: ["#9cbfdd", "#d9c6d1", "#51243f"], image: "https://i.pinimg.com/736x/4a/f1/5c/4af15c7b972365efe79685de6fb20221.jpg" }
  ]
};
const $ = s => document.querySelector(s);
const money = n => `${Number(n).toLocaleString("fr-FR")} ${STORE.currency}`;
let cart = JSON.parse(localStorage.getItem("amina_cart") || "[]");
let wishlist = JSON.parse(localStorage.getItem("amina_wishlist") || "[]");
let searchTerm = "", showAll = false;
function persist() { localStorage.setItem("amina_cart", JSON.stringify(cart)); localStorage.setItem("amina_wishlist", JSON.stringify(wishlist)); }
function toast(message) { const el = $("#toast"); el.textContent = message; el.classList.add("show"); clearTimeout(window.toastTimer); window.toastTimer = setTimeout(() => el.classList.remove("show"), 2400); }
function renderProducts() {
  let list = STORE.products.filter(p => (!searchTerm || (p.name + " " + p.category + " " + p.color).toLowerCase().includes(searchTerm.toLowerCase())) && ($("#categoryFilter").value === "Toutes" || p.category === $("#categoryFilter").value));
  const sort = $("#sortFilter").value; if (sort === "asc") list.sort((a, b) => a.price - b.price); if (sort === "desc") list.sort((a, b) => b.price - a.price);
  if (!showAll) list = list.slice(0, 8);
  $("#resultsNote").textContent = searchTerm ? `${list.length} résultat(s) pour « ${searchTerm} »` : `${list.length} pièces sélectionnées`;
  $("#productGrid").innerHTML = list.length ? list.map(p => `<article class="product-card"><div class="product-image"><img loading="lazy" src="${p.image}" alt="${p.name}" onerror="this.src='https://i.pinimg.com/736x/4a/f1/5c/4af15c7b972365efe79685de6fb20221.jpg'">${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}<button class="wish-btn ${wishlist.includes(p.id) ? "active" : ""}" data-wish="${p.id}" aria-label="Ajouter ${p.name} aux favoris">${wishlist.includes(p.id) ? "♥" : "♡"}</button><button class="quick-add" data-add="${p.id}">Ajouter au panier +</button></div><div class="product-info"><span class="product-category">${p.category}</span><h3>${p.name}</h3><div class="product-price">${money(p.price)}</div><div class="swatches">${p.swatches.map(c => `<span class="swatch" style="background:${c}" title="${p.color}"></span>`).join("")}</div></div></article>`).join("") : `<div class="empty-state">Aucun produit trouvé.<br><small>Essayez un autre terme ou une autre catégorie.</small></div>`;
  $("#showAll").classList.toggle("hidden", showAll || STORE.products.length <= 8);
}
function updateCounts() { $("#cartCount").textContent = cart.reduce((n, i) => n + i.qty, 0); $("#wishCount").textContent = wishlist.length; $("#drawerCount").textContent = `(${cart.reduce((n, i) => n + i.qty, 0)})`; }
function addToCart(id) { const p = STORE.products.find(x => x.id === id); if (!p) return; const found = cart.find(x => x.id === id); if (found) found.qty++; else cart.push({ id, qty: 1 }); persist(); renderCart(); updateCounts(); toast(`${p.name} ajouté au panier`); }
function toggleWish(id) { wishlist = wishlist.includes(id) ? wishlist.filter(x => x !== id) : [...wishlist, id]; persist(); renderProducts(); renderWishlist(); updateCounts(); toast(wishlist.includes(id) ? "Ajouté aux favoris" : "Retiré des favoris"); }
function renderCart() {
  const target = $("#cartItems");
  if (!cart.length) { target.innerHTML = '<div class="empty-state"><span>♡</span>Votre panier est actuellement vide.<br><small>Découvrez les pièces qui vous ressemblent.</small></div>'; $("#cartBottom").classList.add("hidden"); return; }
  $("#cartBottom").classList.remove("hidden");
  target.innerHTML = cart.map(i => { const p = STORE.products.find(x => x.id === i.id); if (!p) return ""; return `<div class="cart-row"><img src="${p.image}" alt="${p.name}"><div><h4>${p.name}</h4><small>${p.category} · ${p.color}</small><div class="qty-controls"><button data-qty="${p.id}" data-delta="-1" aria-label="Diminuer">−</button><span>${i.qty}</span><button data-qty="${p.id}" data-delta="1" aria-label="Augmenter">+</button></div><strong>${money(p.price * i.qty)}</strong></div><button class="remove-item" data-remove="${p.id}" aria-label="Supprimer">×</button></div>` }).join("");
  const subtotal = cart.reduce((n, i) => n + STORE.products.find(p => p.id === i.id).price * i.qty, 0); $("#cartSubtotal").textContent = money(subtotal);
}
function renderWishlist() { const target = $("#wishlistItems"); const items = wishlist.map(id => STORE.products.find(p => p.id === id)).filter(Boolean); target.innerHTML = items.length ? items.map(p => `<div class="cart-row"><img src="${p.image}" alt="${p.name}"><div><h4>${p.name}</h4><small>${p.category}</small><p><strong>${money(p.price)}</strong></p><button class="text-link" data-add="${p.id}">Ajouter au panier</button></div><button class="remove-item" data-wish="${p.id}" aria-label="Retirer">×</button></div>`).join("") : '<div class="empty-state"><span>♡</span>Votre liste de favoris est vide.<br><small>Ajoutez vos coups de cœur en cliquant sur ♡.</small></div>'; }
function openDrawer(id) { $("#overlay").classList.remove("hidden"); $("#" + id).classList.add("open"); document.body.style.overflow = "hidden"; }
function closeDrawers() { $(".drawer.open")?.classList.remove("open"); $("#overlay").classList.add("hidden"); document.body.style.overflow = ""; }
function whatsappUrl(message) { return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(message)}`; }
function startWhatsAppOrder() {
  if (STORE.whatsapp.includes("X")) { toast("Configurez le numéro WhatsApp dans app.js avant de commander."); return; }
  if (!cart.length) { toast("Votre panier est vide."); return; }
  const subtotal = cart.reduce((n, i) => n + STORE.products.find(p => p.id === i.id).price * i.qty, 0);
  const lines = cart.map(i => { const p = STORE.products.find(p => p.id === i.id); return `• ${p.name} — ${i.qty} × ${money(p.price)} = ${money(p.price * i.qty)}` }).join("\n");
  const message = `Bonjour AMINA SALIOU STORE,\n\nJe souhaite commander :\n${lines}\n\nSous-total estimé : ${money(subtotal)}\nLivraison : à confirmer selon ma zone\nTotal estimé hors livraison : ${money(subtotal)}\n\nMerci de confirmer la disponibilité et les modalités de livraison.`;
  window.open(whatsappUrl(message), "_blank", "noopener");
}
document.addEventListener("click", e => {
  const add = e.target.closest("[data-add]"); if (add) { addToCart(Number(add.dataset.add)); return; }
  const wish = e.target.closest("[data-wish]"); if (wish) { toggleWish(Number(wish.dataset.wish)); return; }
  const qty = e.target.closest("[data-qty]"); if (qty) { const item = cart.find(i => i.id === Number(qty.dataset.qty)); if (item) { item.qty += Number(qty.dataset.delta); if (item.qty < 1) cart = cart.filter(i => i.id !== item.id); persist(); renderCart(); updateCounts(); } return; }
  const remove = e.target.closest("[data-remove]"); if (remove) { cart = cart.filter(i => i.id !== Number(remove.dataset.remove)); persist(); renderCart(); updateCounts(); return; }
  const cat = e.target.closest("[data-category]"); if (cat) { $("#categoryFilter").value = cat.dataset.category; showAll = true; renderProducts(); $("#boutique").scrollIntoView({ behavior: "smooth" }); return; }
  if (e.target.closest(".cart-open")) { renderCart(); openDrawer("cartDrawer"); return; }
  if (e.target.closest("#wishlistToggle")) { renderWishlist(); openDrawer("wishlistDrawer"); return; }
  if (e.target.closest("[data-close]") || e.target.id === "overlay") closeDrawers();
});
$("#categoryFilter").addEventListener("change", () => { showAll = true; renderProducts() });
$("#sortFilter").addEventListener("change", renderProducts);
$("#showAll").addEventListener("click", () => { showAll = true; renderProducts() });
$("#searchToggle").addEventListener("click", () => { $("#searchPanel").classList.toggle("hidden"); if (!$("#searchPanel").classList.contains("hidden")) $("#searchInput").focus() });
$("#searchInput").addEventListener("input", e => { searchTerm = e.target.value; showAll = true; renderProducts(); });
$("#clearSearch").addEventListener("click", () => { $("#searchInput").value = ""; searchTerm = ""; showAll = false; renderProducts() });
$("#menuToggle").addEventListener("click", () => $("#nav").classList.toggle("open"));
$("#nav").querySelectorAll("a").forEach(a => a.addEventListener("click", () => $("#nav").classList.remove("open")));
$("#checkoutBtn").addEventListener("click", startWhatsAppOrder);
$("#floatingWhatsapp").addEventListener("click", () => { if (STORE.whatsapp.includes("X")) { toast("Configurez le numéro WhatsApp dans app.js avant de commander."); return; } window.open(whatsappUrl("Bonjour AMINA SALIOU STORE, je souhaite obtenir des renseignements sur vos produits."), "_blank", "noopener") });
$("#footerWhatsapp").addEventListener("click", e => { if (STORE.whatsapp.includes("X")) { e.preventDefault(); toast("Configurez le numéro WhatsApp dans app.js avant de commander."); return; } e.currentTarget.href = whatsappUrl("Bonjour AMINA SALIOU STORE, je souhaite vous contacter.") });
$("#newsletterForm").addEventListener("submit", e => { e.preventDefault(); $("#newsletterMessage").textContent = "Merci ! Le formulaire est prêt côté interface, mais nécessite un service newsletter pour enregistrer les inscriptions."; $("#newsletterForm").reset(); toast("Merci pour votre intérêt !"); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeDrawers() });
renderProducts(); renderCart(); renderWishlist(); updateCounts();
