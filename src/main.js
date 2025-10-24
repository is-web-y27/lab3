import './styles/app.scss'

const API_BASE = 'https://ceramic-api.onrender.com/api';
const PRODUCTS_API = `${API_BASE}/products`;
const POSTS_API = `${API_BASE}/posts`;

async function fetchProducts(category = null) {
    try {
        const url = category ? `${PRODUCTS_API}/?category=${category}` : PRODUCTS_API;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch products');
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

async function fetchPosts() {
    try {
        const response = await fetch(POSTS_API);
        if (!response.ok) throw new Error('Failed to fetch posts');
        return await response.json();
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

function renderProducts(products) {
    const productsGrid = document.querySelector('.catalog_products_grid');
    if (!productsGrid) return;

    productsGrid.innerHTML = products.map(product => `
        <div class="catalog_product_card">
            <div class="catalog_product_image" style="background-image: url('${product.image}')"></div>
            <div class="catalog_product_info">
                <h3 class="catalog_product_name">${product.title}</h3>
                <p class="catalog_product_price">${product.price} ${product.currency}</p>
            </div>
        </div>
    `).join('');
}

function renderPosts(posts) {
    const postsGrid = document.querySelector('.blog_posts_grid');
    if (!postsGrid) return;

    postsGrid.innerHTML = posts.map(post => `
        <div class="blog_post_card">
            <div class="blog_post_top">
                <div class="blog_post_image" style="background-image: url('${post.image}')"></div>
                <div class="blog_post_content">
                    <h3 class="blog_post_title">${post.title}</h3>
                    <button class="blog_read_btn">Read More</button>
                </div>
            </div>
            <div class="blog_post_text">
                <p>${post.excerpt}</p>
            </div>
        </div>
    `).join('');
}

async function initCatalog() {
    const filterButtons = document.querySelectorAll('.filter_btn');
    const productsGrid = document.querySelector('.catalog_products_grid');
    
    if (!productsGrid) return;

    const activeButton = document.querySelector('.filter_btn.active');
    const defaultCategory = activeButton ? activeButton.textContent.toLowerCase() : 'tea';
    const defaultProducts = await fetchProducts(defaultCategory);
    renderProducts(defaultProducts);

    filterButtons.forEach(button => {
        button.addEventListener('click', async () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.textContent.toLowerCase();
            const products = await fetchProducts(category);
            renderProducts(products);
        });
    });
}

async function initBlog() {
    const posts = await fetchPosts();
    renderPosts(posts);
}

document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburger_menu');
    const mobileMenu = document.getElementById('mobile_menu');
    const mobileMenuClose = document.getElementById('mobile_menu-close');

    if (hamburgerMenu && mobileMenu && mobileMenuClose) {
        hamburgerMenu.addEventListener('click', function() {
            mobileMenu.classList.add('active');
        });

        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });

        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        });
    }

    const galleryImages = document.querySelectorAll('.gallery_image');
    const indicators = document.querySelectorAll('.indicator');
    const prevArrow = document.querySelector('.gallery_arrow:first-child');
    const nextArrow = document.querySelector('.gallery_arrow:last-child');
    let currentIndex = 0;

    function showImage(index) {
        galleryImages.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }

    if (prevArrow && nextArrow) {
        prevArrow.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            showImage(currentIndex);
        });

        nextArrow.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            showImage(currentIndex);
        });
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            currentIndex = index;
            showImage(currentIndex);
        });
    });

    showImage(0);

    const currentPage = window.location.pathname;
    
    if (currentPage.includes('catalog.html')) {
        initCatalog();
    } else if (currentPage.includes('blog.html')) {
        initBlog();
    }
});
