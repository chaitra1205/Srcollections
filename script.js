/**
 * SAIRAM COLLECTIONS - CORE APPLICATION & ANIMATIONS SCRIPT
 * Handles immediate entrance animations, particle shimmer,
 * interactive cart, category filtering, FAQ accordions, and WhatsApp ordering.
 */

// --- 1. PRODUCT DATABASE ---
const PRODUCTS_DATA = [
  {
    id: 'prod-1',
    name: 'Antique Gold Jhumka',
    category: 'earrings',
    categoryLabel: 'Earrings',
    price: 1299,
    originalPrice: 1799,
    badge: 'NEW',
    rating: 5.0,
    image: 'assets/images/product-jhumka.jpg',
    description: 'Hand-finished jhumkas with traditional floral motifs, fine filigree work, and delicate pearl drop beads. Lightweight and hypoallergenic.',
    features: ['18K Micro Gold Polish', 'Skin-Safe Brass Alloy', 'Weight: 22g', 'Secure Push-Back Closure']
  },
  {
    id: 'prod-2',
    name: 'Engraved Bangle Duo',
    category: 'bangles',
    categoryLabel: 'Bangles',
    price: 1899,
    originalPrice: 2499,
    badge: 'NEW',
    rating: 4.9,
    image: 'assets/images/product-bangle-duo.jpg',
    description: 'A pair of richly engraved bangles, perfect for festive stacks and special celebrations. Textured with artisan geometric carvings.',
    features: ['Set of 2 Matching Bangles', 'Anti-Tarnish Protective Coating', 'Standard Size: 2.6 (Customizable)', 'Festive Velvet Pouch Included']
  },
  {
    id: 'prod-3',
    name: 'Little Charm Bracelets',
    category: 'kids',
    categoryLabel: 'Kids Jewellery',
    price: 799,
    originalPrice: 1199,
    badge: 'NEW',
    rating: 4.9,
    image: 'assets/images/product-charms.jpg',
    description: 'Soft gold-tone bracelets with tiny heart and star charms — gentle pieces crafted safely for little ones and sensitive skin.',
    features: ['Ultra-Smooth Rounded Edges', 'Lead & Nickel Free', 'Adjustable Extension Chain', 'Safe For Sensitive Skin']
  },
  {
    id: 'prod-4',
    name: 'Royal Kundan Bridal Heirloom',
    category: 'bridal',
    categoryLabel: 'Bridal Collection',
    price: 4499,
    originalPrice: 6200,
    badge: 'BESTSELLER',
    rating: 5.0,
    image: 'assets/images/product-bridal-heirloom.jpg',
    description: 'Grand royal bridal necklace set featuring intricate handcrafted kundan work, emerald green droplet stones, and matching statement earrings.',
    features: ['Complete Necklace + Jhumka Set', '24K Micron Gold Dip', 'Hand-Strung Pearl Drops', 'Luxury Heirloom Velvet Box']
  },
  {
    id: 'prod-5',
    name: 'Layered Golden Grace Chain',
    category: 'necklaces',
    categoryLabel: 'Necklaces',
    price: 1499,
    originalPrice: 1999,
    badge: 'TRENDING',
    rating: 4.8,
    image: 'assets/images/product-layered-necklace.jpg',
    description: 'Dainty triple-layered chain featuring delicate paperclip link, snake chain, and a shimmering crystal medallion pendant.',
    features: ['3-in-1 Layered Styling', 'Water-Resistant Coating', '16\" + 2\" Extension', 'Featherlight Weight (14g)']
  },
  {
    id: 'prod-6',
    name: 'Minimalist Pearl Drops',
    category: 'earrings',
    categoryLabel: 'Earrings',
    price: 899,
    originalPrice: 1250,
    badge: 'DAILY WEAR',
    rating: 4.9,
    image: 'assets/images/product-pearl-drops.jpg',
    description: 'Contemporary everyday earrings featuring lustrous freshwater replica teardrop pearls dangling from polished gold hoops.',
    features: ['Freshwater Pearl Finish', 'Comfort Huggie Clasp', 'Tarnish-Resistant Gold Vermeil', 'Daily Wear Appropriate']
  },
  {
    id: 'prod-7',
    name: 'Heritage Daily Gold Stack',
    category: 'bangles',
    categoryLabel: 'Bangles',
    price: 2199,
    originalPrice: 2899,
    badge: 'POPULAR',
    rating: 5.0,
    image: 'assets/images/product-gold-stack.jpg',
    description: 'Rich set of 6 slender gold-polished bangles with assorted micro-dotted and hammered textures for effortless stacking.',
    features: ['Set of 6 Complementary Bangles', 'Scratch-Resistant Coating', 'Comfortable Slip-on Fit', 'Daily Washable Quality']
  },
  {
    id: 'prod-8',
    name: 'Sweet Heart Kids Kada',
    category: 'kids',
    categoryLabel: 'Kids Jewellery',
    price: 849,
    originalPrice: 1150,
    badge: 'GENTLE',
    rating: 4.9,
    image: 'assets/images/cat-kids.jpg',
    description: 'Delicate openable baby kada with protective black nazariya beads and cute polished heart embellishment.',
    features: ['Expandable Open-Close Hinge', 'No Sharp Edges', 'Traditional Nazariya Accent', '1-5 Years Recommended']
  }
];

// --- 2. GLOBAL STATE ---
let cart = JSON.parse(localStorage.getItem('sairam_cart') || '[]');
let activeFilter = 'all';
let searchQuery = '';

// WhatsApp details
const WHATSAPP_PHONE = '918885822322';
const FREE_SHIPPING_THRESHOLD = 1499;

// --- 3. MINIMAL INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  initStatsCounter();
  initScrollObserver();
  initHeaderScroll();
  renderProducts();
  updateCartUI();
  initFaqAccordion();
  initSearchAndFilters();
  initMobileNav();
});

/**
 * Clean & Instant Stats Numbers (500+, 120+, 4.9★)
 */
function initStatsCounter() {
  const statElements = document.querySelectorAll('.stat-num');
  statElements.forEach(el => {
    const target = parseFloat(el.getAttribute('data-target'));
    const isDecimal = el.getAttribute('data-decimals') === '1';
    el.textContent = isDecimal ? target.toFixed(1) : target;
  });
}

/**
 * Scroll Reveal using Intersection Observer
 */
function initScrollObserver() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/**
 * Sticky Header Glassmorphism on Scroll
 */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// --- 4. PRODUCT RENDERING & FILTERING ---

function renderProducts() {
  const container = document.getElementById('products-grid');
  if (!container) return;

  const filtered = PRODUCTS_DATA.filter(prod => {
    const matchCat = (activeFilter === 'all') || (prod.category === activeFilter);
    const matchSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <i class="ph ph-sparkle" style="font-size: 2.5rem; color: var(--gold-primary); margin-bottom: 12px; display: block;"></i>
        <h3 class="font-serif" style="font-size: 1.5rem; margin-bottom: 8px;">No pieces found</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Try selecting another category or searching for "jhumka", "bangle", "bridal".</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((prod, index) => {
    return `
      <div class="product-card reveal-on-scroll is-revealed stagger-${(index % 4) + 1}">
        <div class="product-img-wrap">
          <span class="product-badge ${prod.badge === 'BESTSELLER' ? 'gold' : ''}">${prod.badge}</span>
          <img src="${prod.image}" alt="${prod.name}" class="product-img" loading="lazy">
          <div class="product-card-actions">
            <button class="btn btn-outline btn-sm" onclick="openQuickView('${prod.id}')" title="Quick View">
              <i class="ph ph-eye"></i> Quick View
            </button>
            <button class="btn btn-primary btn-sm" onclick="addToCart('${prod.id}')" title="Add to Bag">
              <i class="ph ph-shopping-bag"></i> Add
            </button>
          </div>
        </div>
        <div class="product-details">
          <span class="product-category-tag">${prod.categoryLabel}</span>
          <h3 class="product-title">${prod.name}</h3>
          <p class="product-snippet">${prod.description}</p>
          <div class="product-price-row">
            <div>
              <span class="price-current">₹${prod.price.toLocaleString('en-IN')}</span>
              <span class="price-original">₹${prod.originalPrice.toLocaleString('en-IN')}</span>
            </div>
            <button class="btn-icon-round" onclick="orderItemDirectWhatsApp('${prod.id}')" title="Order via WhatsApp">
              <i class="ph ph-whatsapp-logo" style="color: #25D366; font-size: 1.25rem;"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function initSearchAndFilters() {
  // Category Pills
  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeFilter = pill.getAttribute('data-category');
      renderProducts();
    });
  });

  // Search Input
  const searchInput = document.getElementById('catalog-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderProducts();
    });
  }
}

/**
 * Trigger category selection from Category cards in Section 2
 */
window.filterByCategory = function(category) {
  activeFilter = category;
  
  // Highlight corresponding pill
  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(pill => {
    if (pill.getAttribute('data-category') === category) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });

  renderProducts();

  // Smooth scroll to catalog section
  const catalogSection = document.getElementById('shop-catalog');
  if (catalogSection) {
    catalogSection.scrollIntoView({ behavior: 'smooth' });
  }
};

// --- 5. SHOPPING CART SYSTEM ---

window.addToCart = function(productId, qty = 1) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: qty
    });
  }

  saveCart();
  updateCartUI();
  showToast(`✨ Added "${product.name}" to your bag`);
  
  // Bump animation on cart icon
  const badge = document.querySelector('.cart-count-badge');
  if (badge) {
    badge.classList.add('bump');
    setTimeout(() => badge.classList.remove('bump'), 300);
  }
};

window.updateQty = function(productId, delta) {
  const index = cart.findIndex(item => item.id === productId);
  if (index === -1) return;

  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  saveCart();
  updateCartUI();
};

window.removeFromCart = function(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
};

function saveCart() {
  localStorage.setItem('sairam_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const countBadges = document.querySelectorAll('.cart-count-badge');
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  
  countBadges.forEach(b => {
    b.textContent = totalCount;
  });

  // Render items in cart drawer
  const cartList = document.getElementById('cart-items-list');
  const subtotalEl = document.getElementById('cart-subtotal');
  const progressText = document.getElementById('shipping-tracker-text');
  const progressFill = document.getElementById('shipping-progress-fill');

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  if (subtotalEl) {
    subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  }

  // Free shipping tracker
  if (progressText && progressFill) {
    if (subtotal >= FREE_SHIPPING_THRESHOLD) {
      progressText.innerHTML = `🎉 You've unlocked <strong>FREE SHIPPING!</strong>`;
      progressFill.style.width = '100%';
    } else {
      const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
      const pct = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
      progressText.innerHTML = `Add <strong>₹${remaining.toLocaleString('en-IN')}</strong> more for <strong>FREE SHIPPING</strong>`;
      progressFill.style.width = `${pct}%`;
    }
  }

  if (cartList) {
    if (cart.length === 0) {
      cartList.innerHTML = `
        <div style="text-align: center; padding: 48px 16px; color: var(--text-muted);">
          <i class="ph ph-shopping-bag-open" style="font-size: 2.8rem; color: var(--gold-primary); margin-bottom: 12px; display: block;"></i>
          <p class="font-serif" style="font-size: 1.25rem; color: var(--text-dark); margin-bottom: 6px;">Your bag is empty</p>
          <p style="font-size: 0.85rem;">Discover quiet luxury and handcrafted jewellery</p>
        </div>
      `;
    } else {
      cartList.innerHTML = cart.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.name}</h4>
            <span class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</span>
            <div class="cart-qty-ctrl">
              <button class="qty-btn" onclick="updateQty('${item.id}', -1)">-</button>
              <span style="font-size: 0.85rem; font-weight: 600;">${item.qty}</span>
              <button class="qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
              <button onclick="removeFromCart('${item.id}')" style="margin-left: auto; color: var(--text-light); font-size: 0.8rem; text-decoration: underline;">Remove</button>
            </div>
          </div>
        </div>
      `).join('');
    }
  }
}

// Drawer Toggle
window.toggleCartDrawer = function(open = true) {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  if (!drawer || !overlay) return;

  if (open) {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  } else {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
};

// WhatsApp Order Checkout
window.checkoutWhatsApp = function() {
  if (cart.length === 0) {
    showToast('Your bag is empty. Please add items to order!');
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const itemsText = cart.map(i => `• ${i.qty}x ${i.name} (₹${(i.price * i.qty).toLocaleString('en-IN')})`).join('%0A');

  const message = `Hello Sairam Collections! 🌸%0A%0AI would like to place an order from your website:%0A${itemsText}%0A%0A*Total Amount: ₹${subtotal.toLocaleString('en-IN')}*%0A${subtotal >= FREE_SHIPPING_THRESHOLD ? '🚚 Free Shipping Eligible' : 'Standard Shipping Applicable'}%0A%0APlease let me know payment and delivery details. Thank you!`;

  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${message}`;
  window.open(waUrl, '_blank');
};

// Direct Single Item WhatsApp Order
window.orderItemDirectWhatsApp = function(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const message = `Hello Sairam Collections! 🌸%0A%0AI am interested in ordering:%0A*${product.name}*%0APrice: ₹${product.price.toLocaleString('en-IN')}%0A%0ACould you please confirm availability and dispatch details?`;
  
  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${message}`;
  window.open(waUrl, '_blank');
};

// --- 6. QUICK VIEW MODAL ---

window.openQuickView = function(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('quickview-modal');
  const content = document.getElementById('quickview-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="modal-dialog">
      <button class="modal-close-btn" onclick="closeQuickView()">&times;</button>
      <div class="modal-content-grid">
        <div class="modal-img-wrap">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="modal-body">
          <span class="kicker">${product.categoryLabel}</span>
          <h2 class="font-serif" style="font-size: 2rem; margin-bottom: 8px;">${product.name}</h2>
          <div style="display: flex; align-items: baseline; gap: 10px; margin-bottom: 16px;">
            <span style="font-size: 1.5rem; font-weight: 700; color: var(--text-dark);">₹${product.price.toLocaleString('en-IN')}</span>
            <span style="font-size: 1rem; color: var(--text-light); text-decoration: line-through;">₹${product.originalPrice.toLocaleString('en-IN')}</span>
            <span class="product-badge gold" style="position: static; margin-left: 6px;">SAVE ₹${product.originalPrice - product.price}</span>
          </div>
          <p style="color: var(--text-muted); font-size: 0.94rem; line-height: 1.6; margin-bottom: 22px;">${product.description}</p>
          
          <div style="background: var(--bg-card-subtle); padding: 16px; border-radius: var(--radius-sm); margin-bottom: 24px;">
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--gold-primary); display: block; margin-bottom: 8px;">Craftsmanship & Details</span>
            <ul style="list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 0.8rem; color: var(--text-dark);">
              ${product.features.map(f => `<li><i class="ph ph-check" style="color: var(--gold-primary); margin-right: 4px;"></i>${f}</li>`).join('')}
            </ul>
          </div>

          <div style="display: flex; gap: 12px; margin-top: auto;">
            <button class="btn btn-primary" style="flex: 1;" onclick="addToCart('${product.id}'); closeQuickView();">
              <i class="ph ph-shopping-bag"></i> Add to Bag
            </button>
            <button class="btn btn-outline" style="border-color: #25D366; color: #18863F;" onclick="orderItemDirectWhatsApp('${product.id}');">
              <i class="ph ph-whatsapp-logo" style="font-size: 1.1rem;"></i> WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeQuickView = function() {
  const modal = document.getElementById('quickview-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
};

// --- 7. FAQ ACCORDION ---
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// --- 8. MOBILE NAV ---
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-close-btn');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-backdrop');

  if (menuBtn && drawer && backdrop) {
    menuBtn.addEventListener('click', () => {
      drawer.classList.add('open');
      backdrop.classList.add('open');
    });

    const closeNav = () => {
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeNav);
    backdrop.addEventListener('click', closeNav);

    // Close on link click
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
  }
}

// --- 9. TOAST ALERTS ---
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="ph ph-sparkle text-gold"></i><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hiding');
    setTimeout(() => toast.remove(), 350);
  }, 2600);
}
