/* =========================
   PRODUCT DATA
========================= */

const products = [

    {
        brand: "NIKE",
        name: "Nike Air Max Pulse",
        price: 2499000,
        category: "Running",
        visual: "NIKE"
    },

    {
        brand: "JORDAN",
        name: "Air Jordan 1 Retro",
        price: 3299000,
        category: "Lifestyle",
        visual: "AJ1"
    },

    {
        brand: "LOUIS VUITTON",
        name: "LV Trainer",
        price: 18500000,
        category: "Luxury",
        visual: "LV"
    },

    {
        brand: "ADIDAS",
        name: "Adidas Samba OG",
        price: 2199000,
        category: "Lifestyle",
        visual: "SAMBA"
    },

    {
        brand: "NEW BALANCE",
        name: "New Balance 9060",
        price: 2799000,
        category: "Lifestyle",
        visual: "9060"
    },

    {
        brand: "NIKE",
        name: "Nike Dunk Low",
        price: 1999000,
        category: "Lifestyle",
        visual: "DUNK"
    }

];


/* =========================
   VARIABLES
========================= */

let cart = [];

let selectedProduct = null;

let currentBrand = "all";


/* =========================
   ELEMENTS
========================= */

const cartElement =
    document.getElementById("cart");

const cartBtn =
    document.getElementById("cartBtn");

const closeCart =
    document.getElementById("closeCart");

const overlay =
    document.getElementById("overlay");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const subtotal =
    document.getElementById("subtotal");

const toast =
    document.getElementById("toast");

const modal =
    document.getElementById("productModal");

const modalClose =
    document.getElementById("modalClose");

const modalAdd =
    document.getElementById("modalAdd");


/* =========================
   FORMAT PRICE
========================= */

function formatPrice(price) {

    return new Intl.NumberFormat("id-ID", {

        style: "currency",

        currency: "IDR",

        maximumFractionDigits: 0

    }).format(price);

}


/* =========================
   OPEN CART
========================= */

function openCart() {

    cartElement.classList.add("open");

    overlay.classList.add("show");

    document.body.classList.add("no-scroll");

}


/* =========================
   CLOSE CART
========================= */

function closeCartPanel() {

    cartElement.classList.remove("open");

    overlay.classList.remove("show");

    document.body.classList.remove("no-scroll");

}


cartBtn.addEventListener(
    "click",
    openCart
);

closeCart.addEventListener(
    "click",
    closeCartPanel
);

overlay.addEventListener(
    "click",
    closeCartPanel
);


/* =========================
   ADD TO CART
========================= */

function addToCart(index) {

    const product = products[index];

    const existing =
        cart.find(
            item => item.index === index
        );

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            index: index,

            quantity: 1

        });

    }

    updateCart();

    showToast(
        product.name + " added to bag ✓"
    );

}


/* =========================
   UPDATE CART
========================= */

function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                Your bag is empty.
            </div>
        `;

        cartCount.textContent = "0";

        subtotal.textContent =
            formatPrice(0);

        return;

    }


    let total = 0;

    let totalQuantity = 0;


    cart.forEach(function(item) {

        const product =
            products[item.index];

        total +=
            product.price *
            item.quantity;

        totalQuantity +=
            item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-thumb">
                ${product.visual}
            </div>

            <div>

                <h4>
                    ${product.name}
                </h4>

                <p>
                    ${formatPrice(product.price)}
                </p>

                <div class="quantity">

                    <button
                        onclick="changeQuantity(${item.index}, -1)"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${item.index}, 1)"
                    >
                        +
                    </button>

                </div>

            </div>

            <button
                class="remove"
                onclick="removeFromCart(${item.index})"
            >
                Remove
            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent =
        totalQuantity;

    subtotal.textContent =
        formatPrice(total);

}


/* =========================
   CHANGE QUANTITY
========================= */

function changeQuantity(index, amount) {

    const item =
        cart.find(
            item => item.index === index
        );

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item => item.index !== index
            );

    }

    updateCart();

}


/* =========================
   REMOVE CART
========================= */

function removeFromCart(index) {

    cart =
        cart.filter(
            item => item.index !== index
        );

    updateCart();

}


/* =========================
   TOAST
========================= */

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(function() {

        toast.classList.remove("show");

    }, 2000);

}


/* =========================
   ADD BUTTONS
========================= */

document
    .querySelectorAll(".add-cart")
    .forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                const index =
                    Number(
                        button.dataset.product
                    );

                addToCart(index);

            }
        );

    });


/* =========================
   FILTER BRAND
========================= */

const brandButtons =
    document.querySelectorAll(
        ".brand-list button"
    );

const productCards =
    document.querySelectorAll(
        ".product"
    );

brandButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            currentBrand =
                button.dataset.brand;


            brandButtons.forEach(
                btn =>
                    btn.classList.remove("active")
            );

            button.classList.add("active");

            filterProducts();

        }
    );

});


function filterProducts() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();


    let visible = 0;


    productCards.forEach(function(card, index) {

        const brand =
            card.dataset.brand;

        const name =
            card.dataset.name
                .toLowerCase();


        const matchBrand =
            currentBrand === "all" ||
            brand === currentBrand;


        const matchSearch =
            name.includes(search);


        if (
            matchBrand &&
            matchSearch
        ) {

            card.style.display = "";

            visible++;

        } else {

            card.style.display = "none";

        }

    });


    document.getElementById(
        "noResult"
    ).style.display =
        visible === 0
            ? "block"
            : "none";

}


/* =========================
   SEARCH
========================= */

const searchBtn =
    document.getElementById("searchBtn");

const searchBox =
    document.getElementById("searchBox");

const closeSearch =
    document.getElementById("closeSearch");

const searchInput =
    document.getElementById("searchInput");


searchBtn.addEventListener(
    "click",
    function() {

        searchBox.classList.add("open");

        searchInput.focus();

    }
);


closeSearch.addEventListener(
    "click",
    function() {

        searchBox.classList.remove("open");

    }
);


searchInput.addEventListener(
    "input",
    filterProducts
);


/* =========================
   SORT
========================= */

const sortSelect =
    document.getElementById("sortSelect");

const productGrid =
    document.getElementById("productGrid");


sortSelect.addEventListener(
    "change",
    function() {

        const cards =
            [...productCards];


        if (
            sortSelect.value === "low"
        ) {

            cards.sort(
                (a, b) =>
                    Number(a.dataset.price) -
                    Number(b.dataset.price)
            );

        }


        if (
            sortSelect.value === "high"
        ) {

            cards.sort(
                (a, b) =>
                    Number(b.dataset.price) -
                    Number(a.dataset.price)
            );

        }


        cards.forEach(card =>
            productGrid.appendChild(card)
        );

    }
);


/* =========================
   PRODUCT MODAL
========================= */

const quickButtons =
    document.querySelectorAll(
        ".quick-view"
    );


quickButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            selectedProduct =
                Number(
                    button.dataset.product
                );

            openProductModal(
                selectedProduct
            );

        }
    );

});


function openProductModal(index) {

    const product =
        products[index];


    document.getElementById(
        "modalBrand"
    ).textContent =
        product.brand;


    document.getElementById(
        "modalName"
    ).textContent =
        product.name;


    document.getElementById(
        "modalCategory"
    ).textContent =
        product.category;


    document.getElementById(
        "modalPrice"
    ).textContent =
        formatPrice(product.price);


    document.getElementById(
        "modalVisual"
    ).textContent =
        product.visual;


    modal.classList.add("open");

}


modalClose.addEventListener(
    "click",
    function() {

        modal.classList.remove("open");

    }
);


modal.addEventListener(
    "click",
    function(e) {

        if (e.target === modal) {

            modal.classList.remove("open");

        }

    }
);


modalAdd.addEventListener(
    "click",
    function() {

        if (selectedProduct === null)
            return;

        addToCart(selectedProduct);

        modal.classList.remove("open");

        openCart();

    }
);


/* =========================
   PROMO
========================= */

const promoBtn =
    document.getElementById("promoBtn");


promoBtn.addEventListener(
    "click",
    function() {

        showToast(
            "Promo 10% berhasil diklaim 🎉"
        );

    }
);


/* =========================
   CHECKOUT
========================= */

const checkoutBtn =
    document.getElementById(
        "checkoutBtn"
    );


checkoutBtn.addEventListener(
    "click",
    function() {

        if (cart.length === 0) {

            showToast(
                "Bag masih kosong."
            );

            return;

        }


        alert(
            "Checkout berhasil disimulasikan! 🛍️"
        );

    }
);


/* =========================
   MOBILE MENU
========================= */

const menuBtn =
    document.getElementById("menuBtn");

const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );


menuBtn.addEventListener(
    "click",
    function() {

        mobileMenu.classList.toggle(
            "open"
        );

    }
);


mobileMenu
    .querySelectorAll("a")
    .forEach(function(link) {

        link.addEventListener(
            "click",
            function() {

                mobileMenu.classList.remove(
                    "open"
                );

            }
        );

    });


/* =========================
   ESCAPE KEY
========================= */

document.addEventListener(
    "keydown",
    function(e) {

        if (e.key === "Escape") {

            searchBox.classList.remove(
                "open"
            );

            modal.classList.remove(
                "open"
            );

            closeCartPanel();

        }

    }
);


/* =========================
   DEFAULT FILTER
========================= */

document
    .querySelector(
        '.brand-list button[data-brand="all"]'
    )
    .classList.add("active");


/* =========================
   START
========================= */

updateCart();

console.log(
    "SOLE Store loaded successfully."
);