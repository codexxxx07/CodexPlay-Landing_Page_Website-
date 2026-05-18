(function () {
  'use strict';

  /* ── Cart System ── */
  let cart = [];
  let pendingCartItem = null;

  /* ── Message System ── */
  function showMessage(text, type = 'success') {
    const container = document.getElementById('message-container');
    const msg = document.createElement('div');
    msg.className = 'glass-strong px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 text-sm';
    msg.style.animation = 'fadeIn 0.3s ease-out';
    msg.innerHTML = `
      <svg class="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
      <span class="text-gray-900 dark:text-white">${text}</span>
    `;
    container.appendChild(msg);
    setTimeout(() => {
      msg.style.animation = 'fadeOut 0.3s ease-out forwards';
      setTimeout(() => msg.remove(), 300);
    }, 2500);
  }

  /* ── Update Cart UI (renderCart) ── */
  function renderCart() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    let cartEmpty = document.getElementById('cart-empty');
    const cartTotalSection = document.getElementById('cart-total-section');
    const cartTotal = document.getElementById('cart-total');

    console.log('renderCart() called, cart:', cart);

    cartCount.textContent = cart.length;
    if (cart.length > 0) {
      cartCount.classList.remove('hidden');
      cartTotalSection.classList.remove('hidden');
      
      cartItems.innerHTML = cart.map((item, index) => `
        <div class="flex items-center justify-between glass p-3 rounded-lg">
          <div>
          <p class="font-semibold text-sm">${item.name}</p>
          <p class="text-gray-500 dark:text-gray-400 text-xs">$${item.price}</p>
          </div>
          <button type="button" class="text-xs text-gray-500 hover:text-red-500" data-remove="${index}">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
      `).join('');
      
      const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
      cartTotal.textContent = `$${total.toFixed(2)}`;
    } else {
      cartCount.classList.add('hidden');
      cartTotalSection.classList.add('hidden');
      cartItems.innerHTML = '';
      
      if (!cartEmpty) {
        cartEmpty = document.createElement('p');
        cartEmpty.id = 'cart-empty';
        cartEmpty.className = 'text-gray-500 dark:text-gray-400 text-sm';
        cartEmpty.textContent = 'Your cart is empty';
      }
      cartItems.appendChild(cartEmpty);
    }

    cartItems.querySelectorAll('[data-remove]').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.remove);
        cart.splice(index, 1);
        renderCart();
      });
    });
  }

  /* ── Cart Modal ── */
  const cartBtn = document.getElementById('cart-btn');
  const cartModal = document.getElementById('cart-modal');
  const closeCart = document.getElementById('close-cart');
  const cartOverlay = document.getElementById('cart-overlay');
  const buyCart = document.getElementById('buy-cart');

  cartBtn?.addEventListener('click', () => {
    cartModal.classList.remove('hidden');
  });
  closeCart?.addEventListener('click', () => {
    cartModal.classList.add('hidden');
  });
  cartOverlay?.addEventListener('click', () => {
    cartModal.classList.add('hidden');
  });
  buyCart?.addEventListener('click', () => {
    if (cart.length > 0) {
      showMessage('Order Successful ✓');
      cart = [];
      renderCart();
      cartModal.classList.add('hidden');
    }
  });

  /* ── Add to Cart Confirmation Modal ── */
  const addToCartModal = document.getElementById('add-to-cart-modal');
  const addToCartOverlay = document.getElementById('add-to-cart-overlay');
  const addToCartCancel = document.getElementById('add-to-cart-cancel');
  const addToCartProceed = document.getElementById('add-to-cart-proceed');
  const addToCartModalContent = addToCartModal.querySelector('.glass-strong');
  const addToCartMessage = document.getElementById('add-to-cart-message');

  function showAddToCartModal(name, price) {
    pendingCartItem = { name, price };
    addToCartMessage.textContent = `Do you want to add "${name}" to your cart?`;
    addToCartModal.classList.remove('hidden');
    addToCartModalContent.style.animation = 'modalFadeIn 0.2s ease-out';
  }

  function closeModal(modalElement, modalContent) {
    modalContent.style.animation = 'modalFadeOut 0.15s ease-in forwards';
    setTimeout(() => {
      modalElement.classList.add('hidden');
      modalContent.style.animation = '';
    }, 150);
  }

  function addToCartConfirmed() {
    if (pendingCartItem) {
      cart.push(pendingCartItem);
      renderCart();
      showMessage('Added to cart ✓');
      pendingCartItem = null;
    }
  }

  addToCartCancel?.addEventListener('click', () => {
    closeModal(addToCartModal, addToCartModalContent);
  });
  addToCartOverlay?.addEventListener('click', () => {
    closeModal(addToCartModal, addToCartModalContent);
  });
  addToCartProceed?.addEventListener('click', () => {
    closeModal(addToCartModal, addToCartModalContent);
    setTimeout(() => {
      addToCartConfirmed();
    }, 150);
  });

  /* ── Game Buttons ── */
  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.game-card');
      const name = card.dataset.name;
      const price = card.dataset.price;
      showAddToCartModal(name, price);
    });
  });

  /* ── Buy Now Confirmation Modal ── */
  const buyNowModal = document.getElementById('buy-now-modal');
  const buyNowOverlay = document.getElementById('buy-now-overlay');
  const buyNowCancel = document.getElementById('buy-now-cancel');
  const buyNowProceed = document.getElementById('buy-now-proceed');
  const buyNowModalContent = buyNowModal.querySelector('.glass-strong');

  document.querySelectorAll('.btn-buy-now').forEach(btn => {
    btn.addEventListener('click', () => {
      buyNowModal.classList.remove('hidden');
      buyNowModalContent.style.animation = 'modalFadeIn 0.2s ease-out';
    });
  });

  function closeBuyNowModal() {
    buyNowModalContent.style.animation = 'modalFadeOut 0.15s ease-in forwards';
    setTimeout(() => {
      buyNowModal.classList.add('hidden');
      buyNowModalContent.style.animation = '';
    }, 150);
  }

  buyNowCancel?.addEventListener('click', closeBuyNowModal);
  buyNowOverlay?.addEventListener('click', closeBuyNowModal);
  buyNowProceed?.addEventListener('click', () => {
    closeBuyNowModal();
    setTimeout(() => {
      showMessage('Order Placed Successfully ✓');
    }, 150);
  });

  /* ── Dark Mode ── */
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  function setTheme(dark) {
    html.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }

  themeToggle?.addEventListener('click', () => {
    setTheme(!html.classList.contains('dark'));
  });

  /* ── Mobile Menu ── */
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconMenu = document.getElementById('icon-menu');
  const iconClose = document.getElementById('icon-close');

  function closeMobileMenu() {
    mobileMenu?.classList.add('hidden');
    iconMenu?.classList.remove('hidden');
    iconClose?.classList.add('hidden');
    menuBtn?.setAttribute('aria-expanded', 'false');
  }

  menuBtn?.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    if (isOpen) {
      closeMobileMenu();
    } else {
      mobileMenu.classList.remove('hidden');
      iconMenu.classList.add('hidden');
      iconClose.classList.remove('hidden');
      menuBtn.setAttribute('aria-expanded', 'true');
    }
  });

  mobileMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  /* ── Navbar scroll effect ── */
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  function onScroll() {
    const y = window.scrollY;
    if (y > 60) {
      navbar?.querySelector('nav')?.classList.add('nav-scrolled');
    } else {
      navbar?.querySelector('nav')?.classList.remove('nav-scrolled');
    }
    lastScroll = y;
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Active nav link highlight ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.dataset.section === id);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  /* ── Scroll reveal animations ── */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  /* ── Hero entrance animation ── */
  requestAnimationFrame(() => {
    document.querySelectorAll('.hero-enter').forEach((el) => {
      el.classList.add('animate');
    });
  });

  /* ── Smooth anchor scroll offset for sticky navbar ── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 100;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
