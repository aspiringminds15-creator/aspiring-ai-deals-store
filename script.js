const cartCount = document.querySelector('#cart-count');
const toast = document.querySelector('#toast');
const productGrid = document.querySelector('.product-grid');
let itemsInCart = Number(sessionStorage.getItem('aspiring-ai-cart-count')) || 0;
let toastTimer;

const extraProducts = [
  ['Content Compass', '$24', 'photo-1460925895917-afdab827c52f'],
  ['Pixel Pilot', '$34', 'photo-1558655146-d09347e92766'],
  ['Launch Lens', '$45', 'photo-1497366811353-6870744d04b2'],
  ['Voice Canvas', '$32', 'photo-1589903308904-1010c2294adc'],
  ['Research Room', '$36', 'photo-1456324504439-367cee3b3c32'],
  ['Code Current', '$54', 'photo-1515879218367-8466d910aaa4'],
  ['Social Spark', '$27', 'photo-1611162617474-5b21e879e113'],
  ['Brief Builder', '$31', 'photo-1552664730-d307ca884978'],
  ['Idea Atlas', '$38', 'photo-1516321318423-f06f85e504b3'],
  ['Studio Script', '$42', 'photo-1485846234645-a62644f84728'],
  ['Brand Beacon', '$35', 'photo-1556761175-b413da4baf72'],
  ['Signal Search', '$29', 'photo-1499750310107-5fef28a66643'],
  ['Meet Memo', '$21', 'photo-1551836022-d5d88e9218df'],
  ['Campaign Craft', '$47', 'photo-1460925895917-afdab827c52f'],
  ['Data Draft', '$44', 'photo-1551288049-bebda4e38f71'],
  ['Prompt Pocket', '$19', 'photo-1484417894907-623942c8ee29'],
  ['Growth Grid', '$41', 'photo-1556761175-4b46a572b786'],
  ['Focus Flow', '$26', 'photo-1516321165247-4aa89a48be28'],
  ['Future Frame', '$48', 'photo-1516321318423-f06f85e504b3'],
  ['Creator Cloud', '$33', 'photo-1451187580459-43490279c0fa']
];

if (cartCount) cartCount.textContent = itemsInCart;

if (productGrid) productGrid.insertAdjacentHTML('beforeend', extraProducts.map(([name, price, imageId], index) => `
  <article class="product-card">
    <img src="https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=900&q=80" alt="AI product preview for ${name}" />
    <div class="product-info">
      <p class="product-type">${['CREATOR', 'WORKFLOW', 'MARKETING', 'PRODUCTIVITY'][index % 4]}</p>
      <h3>${name}</h3>
      <p class="price">${price}</p>
      <button class="add-to-cart" data-product="${name}" type="button">Add to cart <span>+</span></button>
    </div>
  </article>
`).join(''));

document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    itemsInCart += 1;
    sessionStorage.setItem('aspiring-ai-cart-count', itemsInCart);
    cartCount.textContent = itemsInCart;
    toast.textContent = `${button.dataset.product} added to cart`;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2400);
  });
});
