const cartKey = 'aspiring-ai-cart';
const cartCount = document.querySelector('#cart-count');
const toast = document.querySelector('#toast');
const productGrid = document.querySelector('.product-grid');
let toastTimer;

// The first cart version stored only a total count, so it cannot show product names or prices.
if (!sessionStorage.getItem(cartKey) && sessionStorage.getItem('aspiring-ai-cart-count')) {
  sessionStorage.removeItem('aspiring-ai-cart-count');
}

const extraProducts = [
  ['Content Compass', 24, 'photo-1460925895917-afdab827c52f'], ['Pixel Pilot', 34, 'photo-1558655146-d09347e92766'],
  ['Launch Lens', 45, 'photo-1497366811353-6870744d04b2'], ['Voice Canvas', 32, 'photo-1589903308904-1010c2294adc'],
  ['Research Room', 36, 'photo-1456324504439-367cee3b32'], ['Code Current', 54, 'photo-1515879218367-8466d910aaa4'],
  ['Social Spark', 27, 'photo-1611162617474-5b21e879e113'], ['Brief Builder', 31, 'photo-1552664730-d307ca884978'],
  ['Idea Atlas', 38, 'photo-1516321318423-f06f85e504b3'], ['Studio Script', 42, 'photo-1485846234645-a62644f84728'],
  ['Brand Beacon', 35, 'photo-1556761175-b413da4baf72'], ['Signal Search', 29, 'photo-1499750310107-5fef28a66643'],
  ['Meet Memo', 21, 'photo-1551836022-d5d88e9218df'], ['Campaign Craft', 47, 'photo-1460925895917-afdab827c52f'],
  ['Data Draft', 44, 'photo-1551288049-bebda4e38f71'], ['Prompt Pocket', 19, 'photo-1484417894907-623942c8ee29'],
  ['Growth Grid', 41, 'photo-1556761175-4b46a572b786'], ['Focus Flow', 26, 'photo-1516321165247-4aa89a48be28'],
  ['Future Frame', 48, 'photo-1516321318423-f06f85e504b3'], ['Creator Cloud', 33, 'photo-1451187580459-43490279c0fa']
];

function getCart() { return JSON.parse(sessionStorage.getItem(cartKey) || '[]'); }
function saveCart(cart) { sessionStorage.setItem(cartKey, JSON.stringify(cart)); updateCartCount(); }
function updateCartCount() { if (cartCount) cartCount.textContent = getCart().reduce((total, item) => total + item.quantity, 0); }
function money(value) { return `$${Number(value).toFixed(2)}`; }
function showToast(message) { if (!toast) return; toast.textContent = message; toast.classList.add('show'); window.clearTimeout(toastTimer); toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2200); }

if (productGrid) {
  productGrid.insertAdjacentHTML('beforeend', extraProducts.map(([name, price, imageId], index) => `
    <article class="product-card"><img src="https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=900&q=80" alt="AI product preview for ${name}" />
      <div class="product-info"><p class="product-type">${['CREATOR', 'WORKFLOW', 'MARKETING', 'PRODUCTIVITY'][index % 4]}</p><h3>${name}</h3><p class="price">$${price}</p>
        <button class="add-to-cart" data-product="${name}" data-price="${price}" type="button">Add to cart <span>+</span></button></div></article>`).join(''));
  document.querySelectorAll('.add-to-cart').forEach((button) => button.addEventListener('click', () => {
    const cart = getCart(); const existing = cart.find((item) => item.name === button.dataset.product);
    if (existing) existing.quantity += 1; else cart.push({ name: button.dataset.product, price: Number(button.dataset.price), quantity: 1 });
    saveCart(cart); showToast(`${button.dataset.product} added to cart`);
  }));
}

function renderCart() {
  const list = document.querySelector('#cart-items'); const total = document.querySelector('#cart-total'); const checkout = document.querySelector('#checkout-area');
  if (!list || !total) return;
  const cart = getCart(); const amount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0); total.textContent = money(amount);
  if (!cart.length) { list.innerHTML = '<div class="empty-cart"><h2>Your cart is empty.</h2><p>Explore the AI tools and add something useful.</p><a class="hero-button" href="products.html">Shop AI tools <span>→</span></a></div>'; if (checkout) checkout.hidden = true; return; }
  list.innerHTML = cart.map((item) => `<article class="cart-item"><div><p class="product-type">AI TOOL</p><h2>${item.name}</h2><p>${money(item.price)} each</p></div><div class="cart-item-actions"><div class="quantity-control" aria-label="Quantity for ${item.name}"><button type="button" data-action="decrease" data-name="${item.name}" aria-label="Decrease quantity">−</button><span>${item.quantity}</span><button type="button" data-action="increase" data-name="${item.name}" aria-label="Increase quantity">+</button></div><strong>${money(item.price * item.quantity)}</strong><button class="remove-item" type="button" data-action="remove" data-name="${item.name}">Remove</button></div></article>`).join('');
  list.querySelectorAll('button[data-action]').forEach((button) => button.addEventListener('click', () => {
    const updated = getCart(); const item = updated.find((entry) => entry.name === button.dataset.name); if (!item) return;
    if (button.dataset.action === 'increase') item.quantity += 1; if (button.dataset.action === 'decrease') item.quantity -= 1;
    saveCart(button.dataset.action === 'remove' || item.quantity < 1 ? updated.filter((entry) => entry.name !== item.name) : updated); renderCart();
  }));
}

document.querySelector('#checkout-form')?.addEventListener('submit', (event) => { event.preventDefault(); document.querySelector('#checkout-message').textContent = 'Your order details are ready. Connect a secure payment provider before accepting payments.'; });
updateCartCount(); renderCart();
