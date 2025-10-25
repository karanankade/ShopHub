// Global Variables
let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let currentProduct = null;
let currentQuantity = 1;

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const loading = document.getElementById('loading');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const sortFilter = document.getElementById('sort-filter');
const priceRange = document.getElementById('price-range');
const priceValue = document.getElementById('price-value');
const productModal = document.getElementById('product-modal');
const closeModal = document.getElementById('close-modal');
const cartSidebar = document.getElementById('cart-sidebar');
const cartBtn = document.getElementById('cart-btn');
const closeCart = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const wishlistSidebar = document.getElementById('wishlist-sidebar');
const wishlistBtn = document.getElementById('wishlist-btn');
const closeWishlist = document.getElementById('close-wishlist');
const wishlistItems = document.getElementById('wishlist-items');
const wishlistCount = document.getElementById('wishlist-count');
const themeToggle = document.getElementById('theme-toggle');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notification-text');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Sample Product Data
const sampleProducts = [
    {
        id: 1,
        title: "Wireless Bluetooth Headphones",
        price: 99.99,
        originalPrice: 149.99,
        category: "electronics",
        rating: 4.5,
        reviews: 128,
        description: "Premium wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400",
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400"
        ],
        badge: "Sale",
        inStock: true
    },
    {
        id: 2,
        title: "Smart Fitness Watch",
        price: 199.99,
        originalPrice: 249.99,
        category: "electronics",
        rating: 4.7,
        reviews: 89,
        description: "Advanced fitness tracking with heart rate monitor, GPS, and water resistance. Track your health and fitness goals.",
        images: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
            "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400",
            "https://images.unsplash.com/photo-1579586337278-3f436f25d4d8?w=400"
        ],
        badge: "New",
        inStock: true
    },
    {
        id: 3,
        title: "Designer Leather Jacket",
        price: 299.99,
        originalPrice: 399.99,
        category: "fashion",
        rating: 4.3,
        reviews: 67,
        description: "Premium leather jacket with modern design. Perfect for any occasion, from casual outings to formal events.",
        images: [
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400",
            "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400"
        ],
        badge: "Popular",
        inStock: true
    },
    {
        id: 4,
        title: "Organic Cotton T-Shirt",
        price: 29.99,
        originalPrice: 39.99,
        category: "fashion",
        rating: 4.2,
        reviews: 156,
        description: "Comfortable organic cotton t-shirt with sustainable materials. Available in multiple colors and sizes.",
        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
            "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400",
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400"
        ],
        badge: "Eco",
        inStock: true
    },
    {
        id: 5,
        title: "Smart Home Speaker",
        price: 149.99,
        originalPrice: 199.99,
        category: "electronics",
        rating: 4.6,
        reviews: 203,
        description: "Voice-controlled smart speaker with premium sound quality and home automation features.",
        images: [
            "https://images.unsplash.com/photo-1543512214-318c7553f230?w=400",
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
            "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400"
        ],
        badge: "Smart",
        inStock: true
    },
    {
        id: 6,
        title: "Minimalist Desk Lamp",
        price: 79.99,
        originalPrice: 99.99,
        category: "home",
        rating: 4.4,
        reviews: 94,
        description: "Modern desk lamp with adjustable brightness and USB charging port. Perfect for home office or study.",
        images: [
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"
        ],
        badge: "Modern",
        inStock: true
    },
    {
        id: 7,
        title: "Yoga Mat Premium",
        price: 49.99,
        originalPrice: 69.99,
        category: "sports",
        rating: 4.8,
        reviews: 178,
        description: "Non-slip yoga mat with extra cushioning and carrying strap. Perfect for all types of yoga and fitness.",
        images: [
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
            "https://images.unsplash.com/photo-1506629905607-1a1b1b1b1b1b?w=400"
        ],
        badge: "Best Seller",
        inStock: true
    },
    {
        id: 8,
        title: "Programming Book Collection",
        price: 89.99,
        originalPrice: 119.99,
        category: "books",
        rating: 4.9,
        reviews: 245,
        description: "Complete collection of programming books covering JavaScript, Python, and web development.",
        images: [
            "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400"
        ],
        badge: "Bundle",
        inStock: true
    },
    {
        id: 9,
        title: "Wireless Gaming Mouse",
        price: 79.99,
        originalPrice: 99.99,
        category: "electronics",
        rating: 4.5,
        reviews: 112,
        description: "High-precision gaming mouse with customizable RGB lighting and ergonomic design.",
        images: [
            "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
            "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400",
            "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400"
        ],
        badge: "Gaming",
        inStock: true
    },
    {
        id: 10,
        title: "Ceramic Coffee Mug Set",
        price: 34.99,
        originalPrice: 44.99,
        category: "home",
        rating: 4.3,
        reviews: 87,
        description: "Set of 4 handcrafted ceramic mugs with beautiful glazes. Perfect for your morning coffee routine.",
        images: [
            "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400",
            "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=400"
        ],
        badge: "Handmade",
        inStock: true
    },
    {
        id: 11,
        title: "Running Shoes Pro",
        price: 129.99,
        originalPrice: 159.99,
        category: "sports",
        rating: 4.6,
        reviews: 198,
        description: "Professional running shoes with advanced cushioning and breathable mesh upper.",
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400"
        ],
        badge: "Pro",
        inStock: true
    },
    {
        id: 12,
        title: "Art History Book",
        price: 45.99,
        originalPrice: 59.99,
        category: "books",
        rating: 4.7,
        reviews: 134,
        description: "Comprehensive guide to art history with beautiful illustrations and detailed analysis.",
        images: [
            "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400"
        ],
        badge: "Educational",
        inStock: true
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    products = [...sampleProducts];
    updateCartCount();
    updateWishlistCount();
    loadProducts();
    setupEventListeners();
    loadTheme();
    showLoading();
    
    // Simulate loading delay
    setTimeout(() => {
        hideLoading();
        renderProducts(products);
    }, 1000);
}

function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    
    // Filter functionality
    categoryFilter.addEventListener('change', handleFilter);
    sortFilter.addEventListener('change', handleFilter);
    priceRange.addEventListener('input', handlePriceRange);
    
    // Modal functionality
    closeModal.addEventListener('click', closeProductModal);
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) closeProductModal();
    });
    
    // Cart functionality
    cartBtn.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', closeCartSidebar);
    
    // Wishlist functionality
    wishlistBtn.addEventListener('click', toggleWishlist);
    closeWishlist.addEventListener('click', closeWishlistSidebar);
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Mobile menu
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Quantity controls
    document.getElementById('decrease-qty').addEventListener('click', decreaseQuantity);
    document.getElementById('increase-qty').addEventListener('click', increaseQuantity);
    
    // Modal actions
    document.getElementById('add-to-cart-modal').addEventListener('click', addToCartFromModal);
    document.getElementById('buy-now-btn').addEventListener('click', buyNow);
    document.getElementById('wishlist-btn-modal').addEventListener('click', toggleWishlistFromModal);
    
    // Checkout
    document.getElementById('checkout-btn').addEventListener('click', handleCheckout);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Product Loading and Display
function showLoading() {
    loading.classList.add('show');
}

function hideLoading() {
    loading.classList.remove('show');
}

function loadProducts() {
    // In a real application, this would fetch from an API
    console.log('Loading products...');
}

function renderProducts(productsToRender) {
    productsGrid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
                <h3 style="color: var(--text-secondary); margin-bottom: 0.5rem;">No products found</h3>
                <p style="color: var(--text-muted);">Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }
    
    productsToRender.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card slide-up';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.images[0]}" alt="${product.title}" loading="lazy">
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            <button class="wishlist-icon ${isInWishlist(product.id) ? 'active' : ''}" 
                    onclick="toggleWishlistItem(event, ${product.id})">
                <i class="fas fa-heart"></i>
            </button>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <div class="product-rating">
                <div class="stars">
                    ${generateStars(product.rating)}
                </div>
                <span class="rating-text">(${product.reviews})</span>
            </div>
            <p class="product-price">
                $${product.price.toFixed(2)}
                ${product.originalPrice ? `<span style="text-decoration: line-through; color: var(--text-muted); font-size: 0.875rem; margin-left: 0.5rem;">$${product.originalPrice.toFixed(2)}</span>` : ''}
            </p>
            <p class="product-description">${product.description}</p>
            <div class="product-actions">
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button class="buy-now-btn" onclick="buyNow(${product.id})">
                    <i class="fas fa-bolt"></i> Buy Now
                </button>
            </div>
        </div>
    `;
    
    card.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
            openProductModal(product);
        }
    });
    
    return card;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt star"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star star"></i>';
    }
    
    return stars;
}

// Search and Filter Functions
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    filterProducts();
}

function handleFilter() {
    filterProducts();
}

function handlePriceRange() {
    const maxPrice = parseInt(priceRange.value);
    priceValue.textContent = `$0 - $${maxPrice}`;
    filterProducts();
}

function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const sortBy = sortFilter.value;
    const maxPrice = parseInt(priceRange.value);
    
    let filteredProducts = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm) ||
                            product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || product.category === category;
        const matchesPrice = product.price <= maxPrice;
        
        return matchesSearch && matchesCategory && matchesPrice;
    });
    
    // Sort products
    switch (sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        default:
            // Keep original order
            break;
    }
    
    renderProducts(filteredProducts);
}

// Product Modal Functions
function openProductModal(product) {
    currentProduct = product;
    currentQuantity = 1;
    
    // Update modal content
    document.getElementById('modal-main-image').src = product.images[0];
    document.getElementById('modal-product-title').textContent = product.title;
    document.getElementById('modal-product-price').innerHTML = `
        $${product.price.toFixed(2)}
        ${product.originalPrice ? `<span style="text-decoration: line-through; color: var(--text-muted); font-size: 1rem; margin-left: 0.5rem;">$${product.originalPrice.toFixed(2)}</span>` : ''}
    `;
    document.getElementById('modal-product-description').textContent = product.description;
    document.getElementById('modal-product-rating').innerHTML = `
        <div class="stars">
            ${generateStars(product.rating)}
        </div>
        <span class="rating-text">(${product.reviews} reviews)</span>
    `;
    
    // Update thumbnails
    const thumbnailContainer = document.getElementById('thumbnail-images');
    thumbnailContainer.innerHTML = '';
    product.images.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.innerHTML = `<img src="${image}" alt="${product.title}">`;
        thumbnail.addEventListener('click', () => {
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
            document.getElementById('modal-main-image').src = image;
        });
        thumbnailContainer.appendChild(thumbnail);
    });
    
    // Update wishlist button
    const wishlistBtn = document.getElementById('wishlist-btn-modal');
    wishlistBtn.classList.toggle('active', isInWishlist(product.id));
    
    // Update quantity
    document.getElementById('quantity').textContent = currentQuantity;
    
    productModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    productModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function decreaseQuantity() {
    if (currentQuantity > 1) {
        currentQuantity--;
        document.getElementById('quantity').textContent = currentQuantity;
    }
}

function increaseQuantity() {
    currentQuantity++;
    document.getElementById('quantity').textContent = currentQuantity;
}

// Cart Functions
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.images[0],
            quantity: quantity
        });
    }
    
    updateCartCount();
    saveCart();
    showNotification(`${product.title} added to cart!`, 'success');
}

function addToCartFromModal() {
    if (currentProduct) {
        addToCart(currentProduct.id, currentQuantity);
        closeProductModal();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    saveCart();
    renderCartItems();
    showNotification('Item removed from cart', 'warning');
}

function updateCartItemQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            saveCart();
            renderCartItems();
        }
    }
}

function renderCartItems() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <h3>Your cart is empty</h3>
                <p>Add some products to get started!</p>
            </div>
        `;
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.title}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-controls">
                    <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    updateCartTotal();
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function toggleCart() {
    renderCartItems();
    cartSidebar.classList.toggle('show');
}

function closeCartSidebar() {
    cartSidebar.classList.remove('show');
}

// Wishlist Functions
function toggleWishlistItem(event, productId) {
    event.stopPropagation();
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const index = wishlist.findIndex(item => item.id === productId);
    
    if (index > -1) {
        wishlist.splice(index, 1);
        showNotification(`${product.title} removed from wishlist`, 'warning');
    } else {
        wishlist.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.images[0]
        });
        showNotification(`${product.title} added to wishlist!`, 'success');
    }
    
    updateWishlistCount();
    saveWishlist();
    
    // Update the heart icon
    const heartIcon = event.currentTarget;
    heartIcon.classList.toggle('active');
}

function toggleWishlistFromModal() {
    if (currentProduct) {
        const index = wishlist.findIndex(item => item.id === currentProduct.id);
        const wishlistBtn = document.getElementById('wishlist-btn-modal');
        
        if (index > -1) {
            wishlist.splice(index, 1);
            wishlistBtn.classList.remove('active');
            showNotification(`${currentProduct.title} removed from wishlist`, 'warning');
        } else {
            wishlist.push({
                id: currentProduct.id,
                title: currentProduct.title,
                price: currentProduct.price,
                image: currentProduct.images[0]
            });
            wishlistBtn.classList.add('active');
            showNotification(`${currentProduct.title} added to wishlist!`, 'success');
        }
        
        updateWishlistCount();
        saveWishlist();
    }
}

function isInWishlist(productId) {
    return wishlist.some(item => item.id === productId);
}

function renderWishlistItems() {
    wishlistItems.innerHTML = '';
    
    if (wishlist.length === 0) {
        wishlistItems.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
                <i class="fas fa-heart" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <h3>Your wishlist is empty</h3>
                <p>Add some products to your wishlist!</p>
            </div>
        `;
        return;
    }
    
    wishlist.forEach(item => {
        const wishlistItem = document.createElement('div');
        wishlistItem.className = 'wishlist-item';
        wishlistItem.innerHTML = `
            <div class="wishlist-item-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="wishlist-item-details">
                <h4 class="wishlist-item-title">${item.title}</h4>
                <p class="wishlist-item-price">$${item.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${item.id}); removeFromWishlist(${item.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button class="remove-item" onclick="removeFromWishlist(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        wishlistItems.appendChild(wishlistItem);
    });
}

function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id !== productId);
    updateWishlistCount();
    saveWishlist();
    renderWishlistItems();
    showNotification('Item removed from wishlist', 'warning');
}

function updateWishlistCount() {
    wishlistCount.textContent = wishlist.length;
}

function saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function toggleWishlist() {
    renderWishlistItems();
    wishlistSidebar.classList.toggle('show');
}

function closeWishlistSidebar() {
    wishlistSidebar.classList.remove('show');
}

// Theme Functions
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const themeIcon = themeToggle.querySelector('i');
    themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const themeIcon = themeToggle.querySelector('i');
    themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Mobile Menu Functions
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Utility Functions
function showNotification(message, type = 'success') {
    notificationText.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function buyNow(productId) {
    if (productId) {
        addToCart(productId, 1);
    } else if (currentProduct) {
        addToCart(currentProduct.id, currentQuantity);
    }
    
    showNotification('Redirecting to checkout...', 'info');
    // In a real application, this would redirect to a checkout page
    setTimeout(() => {
        showNotification('Checkout functionality would be implemented here', 'info');
    }, 1000);
}

function handleCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'warning');
        return;
    }
    
    showNotification('Redirecting to checkout...', 'info');
    // In a real application, this would redirect to a payment gateway
    setTimeout(() => {
        showNotification('Payment integration would be implemented here', 'info');
    }, 1000);
}

function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Close sidebars when clicking outside
document.addEventListener('click', (e) => {
    if (!cartSidebar.contains(e.target) && !cartBtn.contains(e.target)) {
        cartSidebar.classList.remove('show');
    }
    
    if (!wishlistSidebar.contains(e.target) && !wishlistBtn.contains(e.target)) {
        wishlistSidebar.classList.remove('show');
    }
    
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProductModal();
        closeCartSidebar();
        closeWishlistSidebar();
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe product cards for animations
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        observer.observe(card);
    });
});

// Contact form submission message
document.getElementById('contact-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you for contacting us! We’ll get back to you soon.');
  e.target.reset();
});