$(document).ready(function() {
    // Preloader with GSAP animation
    const preloaderTL = gsap.timeline();
    preloaderTL
        .from('.sneaker', { 
            y: -50, 
            rotation: -10, 
            duration: 0.8, 
            ease: "bounce.out" 
        })
        .from('.shadow', { 
            scale: 1.5, 
            duration: 0.8, 
            ease: "power2.out" 
        }, "-=0.8")
        .from('.loading-text', { 
            opacity: 0, 
            y: 20, 
            duration: 0.5 
        }, "-=0.5");

    // Hide preloader after animation
    setTimeout(function() {
        gsap.to('.preloader', { 
            opacity: 0, 
            duration: 0.5, 
            onComplete: function() {
                $('.preloader').remove();
            }
        });
    }, 2500);

    // Hero section animations
    gsap.from('.hero h1', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5,
        ease: "power3.out"
    });

    gsap.from('.hero p', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.8,
        ease: "power3.out"
    });

    gsap.from('.hero-buttons', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 1.1,
        ease: "power3.out"
    });

    gsap.from('.scroll-down', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1.5,
        ease: "power3.out"
    });

    // Typed.js for hero text with enhanced options
    var typed = new Typed('.typed-text', {
        strings: ["Step In Style^1000", "Unleash the Hype^1000", "Sneakers That Speak^1000"],
        typeSpeed: 60,
        backSpeed: 30,
        backDelay: 1500,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        contentType: 'html',
        onComplete: function() {
            gsap.to('.typed-cursor', {
                opacity: 0,
                duration: 0.5,
                repeat: -1,
                yoyo: true
            });
        }
    });

    // Initialize AOS for scroll animations with custom settings
    AOS.init({
        duration: 800,
        easing: 'ease-in-out-quad',
        once: false,
        mirror: true,
        anchorPlacement: 'top-bottom',
        disable: window.innerWidth < 768
    });

    // Mobile menu toggle with GSAP animation
    $('.hamburger').click(function() {
        $(this).toggleClass('active');
        $('.mobile-menu').toggleClass('active');

        if ($('.mobile-menu').hasClass('active')) {
            gsap.from('.mobile-menu a', {
                opacity: 0,
                x: -20,
                duration: 0.3,
                stagger: 0.1,
                ease: "power2.out"
            });
        }
    });

    // Smooth scrolling for anchor links with GSAP
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        
        const target = $(this).attr('href');
        const offset = $(target).offset().top - 80;
        
        gsap.to(window, {
            scrollTo: offset,
            duration: 1,
            ease: "power2.inOut"
        });
        
        // Close mobile menu if open
        $('.hamburger').removeClass('active');
        $('.mobile-menu').removeClass('active');
    });

    // Navbar scroll effect with GSAP for smoother transitions
    let lastScroll = 0;
    $(window).scroll(function() {
        const currentScroll = $(this).scrollTop();
        
        if (currentScroll > 100) {
            if (currentScroll > lastScroll) {
                // Scrolling down
                gsap.to('.navbar', {
                    y: -80,
                    duration: 0.3,
                    ease: "power2.out"
                });
            } else {
                // Scrolling up
                gsap.to('.navbar', {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
            
            $('.navbar').addClass('scrolled');
        } else {
            gsap.to('.navbar', {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
            $('.navbar').removeClass('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Ripple effect on buttons with GSAP
    $('.ripple').on('click', function(e) {
        // Remove any existing ripple effects
        $('.ripple-effect').remove();
        
        // Get click position relative to button
        const posX = e.pageX - $(this).offset().left;
        const posY = e.pageY - $(this).offset().top;
        
        // Create ripple element
        const ripple = $('<span class="ripple-effect"></span>').css({
            left: posX,
            top: posY
        });
        
        // Add ripple to button
        $(this).prepend(ripple);
        
        // Animate ripple with GSAP
        gsap.fromTo(ripple, 
            { 
                scale: 0,
                opacity: 1 
            },
            { 
                scale: 10, 
                opacity: 0, 
                duration: 0.8,
                ease: "power2.out",
                onComplete: function() {
                    ripple.remove();
                }
            }
        );
    });

    // Initialize Magnific Popup for image previews
    $('.sneaker-grid').magnificPopup({
        delegate: 'a.image-popup',
        type: 'image',
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300,
            easing: 'ease-in-out'
        },
        mainClass: 'mfp-with-zoom',
        removalDelay: 300
    });

    // Sneaker data
    const sneakers = [
        {
            id: 1,
            name: "Air Jordan 1 Retro High",
            price: 180,
            image: "assets/sneakers/air-jordan-1.jpg",
            badge: "Bestseller",
            description: "The Air Jordan 1 Retro High remakes the classic sneaker, giving you a fresh look with a familiar feel."
        },
        {
            id: 2,
            name: "Nike Dunk Low Retro",
            price: 110,
            image: "assets/sneakers/nike-dunk-low.jpg",
            badge: "New",
            description: "The Nike Dunk Low Retro delivers a timeless design that's perfect for everyday wear."
        },
        {
            id: 3,
            name: "Adidas Yeezy Boost 350 V2",
            price: 220,
            image: "assets/sneakers/yeezy-350.jpg",
            badge: "Limited",
            description: "The adidas Yeezy Boost 350 V2 continues to push the boundaries of sneaker design."
        },
        {
            id: 4,
            name: "New Balance 550",
            price: 120,
            image: "assets/sneakers/nb-550.jpg",
            description: "The New Balance 550 combines retro basketball styling with modern comfort."
        },
        {
            id: 5,
            name: "Converse Chuck 70",
            price: 85,
            image: "assets/sneakers/chuck-70.jpg",
            description: "The Converse Chuck 70 is a premium version of the classic sneaker with improved comfort."
        },
        {
            id: 6,
            name: "Puma Suede Classic",
            price: 75,
            image: "assets/sneakers/puma-suede.jpg",
            description: "The Puma Suede Classic is a timeless sneaker with a rich heritage in street culture."
        }
    ];

    // Reviews data
    const reviews = [
        {
            name: "Alex Johnson",
            avatar: "assets/avatars/avatar1.jpg",
            rating: 5,
            text: "The best sneaker store I've found! Fast shipping and authentic products. Will definitely order again."
        },
        {
            name: "Sarah Miller",
            avatar: "assets/avatars/avatar2.jpg",
            rating: 4,
            text: "Great selection of sneakers. My order arrived quickly and was exactly as described. Very happy!"
        },
        {
            name: "Michael Chen",
            avatar: "assets/avatars/avatar3.jpg",
            rating: 5,
            text: "Excellent customer service! They helped me find the perfect size and the shoes are incredibly comfortable."
        }
    ];

    // Generate sneaker cards
    function generateSneakerCards() {
        const sneakerGrid = $('.sneaker-grid');
        sneakerGrid.empty();
        
        sneakers.forEach((sneaker, index) => {
            const badge = sneaker.badge ? `<span class="sneaker-badge">${sneaker.badge}</span>` : '';
            
            const card = `
                <div class="sneaker-card" data-aos="fade-up" data-aos-delay="${index * 100}">
                    ${badge}
                    <div class="sneaker-image">
                        <a href="${sneaker.image}" class="image-popup">
                            <img src="${sneaker.image}" alt="${sneaker.name}">
                        </a>
                    </div>
                    <div class="sneaker-info">
                        <h3 class="sneaker-title">${sneaker.name}</h3>
                        <div class="sneaker-price">$${sneaker.price}</div>
                        <div class="sneaker-actions">
                            <button class="btn btn-add-to-cart ripple" data-id="${sneaker.id}">Add to Cart</button>
                            <button class="btn btn-view-details ripple" data-id="${sneaker.id}">View Details</button>
                        </div>
                    </div>
                </div>
            `;
            
            sneakerGrid.append(card);
        });
        
        // Re-initialize Magnific Popup for new elements
        $('.sneaker-grid').magnificPopup({
            delegate: 'a.image-popup',
            type: 'image',
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true
            }
        });
    }

    // Generate review cards
    function generateReviewCards() {
        const reviewCards = $('.review-cards');
        reviewCards.empty();
        
        reviews.forEach((review, index) => {
            const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
            
            const card = `
                <div class="review-card" data-aos="fade-up" data-aos-delay="${index * 150}">
                    <div class="reviewer">
                        <div class="reviewer-avatar">
                            <img src="${review.avatar}" alt="${review.name}">
                        </div>
                        <div class="reviewer-info">
                            <h4>${review.name}</h4>
                            <p>Verified Buyer</p>
                        </div>
                    </div>
                    <div class="stars">${stars}</div>
                    <p class="review-text">"${review.text}"</p>
                </div>
            `;
            
            reviewCards.append(card);
        });
    }

    // Initialize cart functionality
    let cart = [];
    
    function updateCartCount() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        $('.cart-count').text(count);
    }
    
    function renderCartItems() {
        const cartItems = $('.cart-items');
        const emptyCart = $('.empty-cart');
        const cartFooter = $('.cart-footer');
        
        if (cart.length === 0) {
            emptyCart.show();
            cartFooter.hide();
            cartItems.html('<div class="empty-cart"><i class="fas fa-shopping-cart"></i><p>Your cart is empty</p></div>');
            return;
        }
        
        emptyCart.hide();
        cartFooter.show();
        
        let itemsHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const sneaker = sneakers.find(s => s.id === item.id);
            total += sneaker.price * item.quantity;
            
            itemsHTML += `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="${sneaker.image}" alt="${sneaker.name}">
                    </div>
                    <div class="cart-item-details">
                        <h4>${sneaker.name}</h4>
                        <div class="cart-item-price">$${sneaker.price}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn minus" data-id="${sneaker.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn plus" data-id="${sneaker.id}">+</button>
                        </div>
                        <div class="remove-item" data-id="${sneaker.id}">Remove</div>
                    </div>
                </div>
            `;
        });
        
        cartItems.html(itemsHTML);
        $('.total-amount').text('$' + total.toFixed(2));
    }
    
    // Add to cart functionality
    $(document).on('click', '.btn-add-to-cart', function() {
        const id = parseInt($(this).data('id'));
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, quantity: 1 });
        }
        
        updateCartCount();
        renderCartItems();
        
        // Animate cart icon
        gsap.to('.cart-icon', {
            y: -10,
            duration: 0.3,
            ease: "power2.out",
            yoyo: true,
            repeat: 1
        });
        
        // Show success message
        const successMsg = $('<div class="cart-success-msg">Added to cart!</div>');
        $('body').append(successMsg);
        
        gsap.fromTo(successMsg, 
            { opacity: 0, y: 20 },
            { 
                opacity: 1, 
                y: 0,
                duration: 0.3,
                onComplete: function() {
                    gsap.to(successMsg, {
                        opacity: 0,
                        y: -20,
                        delay: 1,
                        duration: 0.3,
                        onComplete: function() {
                            successMsg.remove();
                        }
                    });
                }
            }
        );
    });
    
    // Cart quantity controls
    $(document).on('click', '.quantity-btn.plus', function() {
        const id = parseInt($(this).data('id'));
        const item = cart.find(item => item.id === id);
        
        if (item) {
            item.quantity += 1;
            updateCartCount();
            renderCartItems();
        }
    });
    
    $(document).on('click', '.quantity-btn.minus', function() {
        const id = parseInt($(this).data('id'));
        const itemIndex = cart.findIndex(item => item.id === id);
        
        if (itemIndex !== -1) {
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity -= 1;
            } else {
                cart.splice(itemIndex, 1);
            }
            
            updateCartCount();
            renderCartItems();
        }
    });
    
    // Remove item from cart
    $(document).on('click', '.remove-item', function() {
        const id = parseInt($(this).data('id'));
        cart = cart.filter(item => item.id !== id);
        
        updateCartCount();
        renderCartItems();
    });
    
    // Cart drawer toggle
    $('.cart-icon').click(function(e) {
        e.preventDefault();
        $('.cart-drawer').addClass('active');
        $('.cart-overlay').addClass('active');
        
        // Animate cart drawer
        gsap.from('.cart-drawer', {
            x: 100,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    $('.close-cart, .cart-overlay').click(function() {
        $('.cart-drawer').removeClass('active');
        $('.cart-overlay').removeClass('active');
    });
    
    // View details modal (simplified for example)
    $(document).on('click', '.btn-view-details', function() {
        const id = parseInt($(this).data('id'));
        const sneaker = sneakers.find(s => s.id === id);
        
        // In a real implementation, you would show a detailed modal here
        alert(`Details for ${sneaker.name}:\n\n${sneaker.description}`);
    });
    
    // Newsletter form submission
    $('.newsletter-form').submit(function(e) {
        e.preventDefault();
        const email = $(this).find('input[type="email"]').val();
        
        // Simulate submission
        $(this).find('button').text('Subscribing...');
        
        setTimeout(() => {
            $(this).find('button').text('Subscribed!');
            $(this).find('input[type="email"]').val('');
            
            // Show success message
            const successMsg = $('<div class="newsletter-success-msg">Thanks for subscribing!</div>');
            $(this).append(successMsg);
            
            gsap.fromTo(successMsg, 
                { opacity: 0, y: 10 },
                { 
                    opacity: 1, 
                    y: 0,
                    duration: 0.3,
                    onComplete: function() {
                        gsap.to(successMsg, {
                            opacity: 0,
                            y: -10,
                            delay: 2,
                            duration: 0.3,
                            onComplete: function() {
                                successMsg.remove();
                                $(this).find('button').text('Subscribe');
                            }.bind(this)
                        });
                    }.bind(this)
                }
            );
        }, 1500);
    });
    
    // Initialize all generated content
    generateSneakerCards();
    generateReviewCards();
    
    // Parallax effect for hero section
    $(window).scroll(function() {
        const scroll = $(this).scrollTop();
        $('.hero-video video').css('transform', `translateY(${scroll * 0.5}px)`);
    });
    
    // Scroll reveal animations for sections
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });
    
    // Hover effects for sneaker cards
    $('.sneaker-grid').on('mouseenter', '.sneaker-card', function() {
        gsap.to($(this).find('img'), {
            scale: 1.05,
            duration: 0.5,
            ease: "power2.out"
        });
    });
    
    $('.sneaker-grid').on('mouseleave', '.sneaker-card', function() {
        gsap.to($(this).find('img'), {
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
        });
    });
    
    // Animate review cards on hover
    $('.review-cards').on('mouseenter', '.review-card', function() {
        gsap.to(this, {
            y: -10,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    $('.review-cards').on('mouseleave', '.review-card', function() {
        gsap.to(this, {
            y: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});
// Sneaker data
const sneakers = [
    {
        id: 1,
        name: "Air Jordan 1 Retro High",
        price: 180,
        image: "assets/sneakers/air-jordan-1.jpg",
        badge: "Bestseller",
        description: "The Air Jordan 1 Retro High remakes the classic sneaker."
    },
    {
        id: 2,
        name: "Nike Dunk Low Retro",
        price: 110,
        image: "assets/sneakers/nike-dunk-low.jpg",
        badge: "New",
        description: "Timeless design perfect for everyday wear."
    },
    {
        id: 3,
        name: "Adidas Yeezy Boost 350 V2",
        price: 220,
        image: "assets/sneakers/yeezy-350.jpg",
        badge: "Limited",
        description: "Pushes the boundaries of sneaker design."
    }
];

// Generate sneaker cards
function generateSneakerCards() {
    const sneakerGrid = $('.sneaker-grid');
    sneakerGrid.empty();
    
    sneakers.forEach((sneaker, index) => {
        const badge = sneaker.badge ? `<span class="sneaker-badge">${sneaker.badge}</span>` : '';
        
        const card = `
            <div class="sneaker-card" data-aos="fade-up" data-aos-delay="${index * 100}">
                ${badge}
                <div class="sneaker-image">
                    <a href="${sneaker.image}" class="image-popup">
                        <img src="${sneaker.image}" alt="${sneaker.name}">
                    </a>
                </div>
                <div class="sneaker-info">
                    <h3 class="sneaker-title">${sneaker.name}</h3>
                    <div class="sneaker-price">$${sneaker.price}</div>
                    <div class="sneaker-actions">
                        <button class="btn btn-add-to-cart ripple" data-id="${sneaker.id}">Add to Cart</button>
                        <button class="btn btn-view-details ripple" data-id="${sneaker.id}">View Details</button>
                    </div>
                </div>
            </div>
        `;
        
        sneakerGrid.append(card);
    });
}

// Initialize on page load
generateSneakerCards();

// Reviews data
const reviews = [
    {
        name: "Alex Johnson",
        avatar: "assets/avatars/avatar1.jpg",
        rating: 5,
        text: "The best sneaker store I've found! Fast shipping and authentic products."
    },
    {
        name: "Sarah Miller",
        avatar: "assets/avatars/avatar2.jpg",
        rating: 4,
        text: "Great selection of sneakers. My order arrived quickly and was exactly as described."
    },
    {
        name: "Michael Chen",
        avatar: "assets/avatars/avatar3.jpg",
        rating: 5,
        text: "Excellent customer service! They helped me find the perfect size."
    }
];

// Generate review cards
function generateReviewCards() {
    const reviewCards = $('.review-cards');
    reviewCards.empty();
    
    reviews.forEach((review, index) => {
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        
        const card = `
            <div class="review-card" data-aos="fade-up" data-aos-delay="${index * 150}">
                <div class="reviewer">
                    <div class="reviewer-avatar">
                        <img src="${review.avatar}" alt="${review.name}">
                    </div>
                    <div class="reviewer-info">
                        <h4>${review.name}</h4>
                        <p>Verified Buyer</p>
                    </div>
                </div>
                <div class="stars">${stars}</div>
                <p class="review-text">"${review.text}"</p>
            </div>
        `;
        
        reviewCards.append(card);
    });
}

// Initialize on page load
generateReviewCards();