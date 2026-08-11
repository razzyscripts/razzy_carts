let cart = JSON.parse(localStorage.getItem("razzyCart")) || [];


// ==============================
// SAVE CART
// ==============================

function saveCart() {
    localStorage.setItem("razzyCart", JSON.stringify(cart));
}


// ==============================
// UPDATE CART NUMBER
// ==============================

function updateCartCount() {

    const cartCounts = document.querySelectorAll("#cart-count");

    const totalItems = cart.reduce(function(total, product) {
        return total + product.quantity;
    }, 0);

    cartCounts.forEach(function(counter) {
        counter.textContent = totalItems;
    });
}


// ==============================
// SHOW ADDED MESSAGE
// ==============================

function showAddedMessage(productName) {

    const message = document.createElement("div");

    message.className = "cart-message";

    message.textContent = productName + " added to cart!";

    document.body.appendChild(message);

    setTimeout(function() {
        message.classList.add("show");
    }, 10);

    setTimeout(function() {
        message.classList.remove("show");

        setTimeout(function() {
            message.remove();
        }, 300);

    }, 2000);
}


// ==============================
// GET PRODUCT INFORMATION
// ==============================

function getProductInformation(button) {

    const card =
        button.closest(".category-product-card") ||
        button.closest(".product-card") ||
        button.closest(".featured-product-card") ||
        button.closest(".category-product") ||
        button.parentElement;


    let name = "Product";
    let price = 0;
    let image = "";


    // PRODUCT NAME

    const nameElement =
        card.querySelector("h1") ||
        card.querySelector("h2") ||
        card.querySelector("h3");

    if (nameElement) {
        name = nameElement.textContent.trim();
    }


    // PRODUCT PRICE

    const priceElement =
        card.querySelector(".category-price") ||
        card.querySelector(".product-price") ||
        card.querySelector(".price");

    if (priceElement) {

        const priceText = priceElement.textContent
            .replace(/,/g, "")
            .replace("$", "")
            .trim();

        price = parseFloat(priceText) || 0;
    }


    // PRODUCT IMAGE

    const imageElement = card.querySelector("img");

    if (imageElement) {

        image = imageElement.getAttribute("src");

    } else {

        const imageBox =
            card.querySelector(".category-product-image") ||
            card.querySelector(".product-image");

        if (imageBox) {

            const background =
                getComputedStyle(imageBox).backgroundImage;

            const match = background.match(/url\(["']?(.*?)["']?\)/);

            if (match) {
                image = match[1];
            }
        }
    }


    return {
        name: name,
        price: price,
        image: image,
        quantity: 1
    };
}


// ==============================
// ADD PRODUCT TO CART
// ==============================

function addToCart(button) {

    const product = getProductInformation(button);


    const existingProduct = cart.find(function(item) {
        return item.name === product.name;
    });


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push(product);

    }


    saveCart();

    updateCartCount();

    showAddedMessage(product.name);
}


// ==============================
// ADD TO CART BUTTONS
// ==============================

document.addEventListener("click", function(event) {

    const button = event.target.closest("button");

    if (!button) {
        return;
    }


    const buttonText = button.textContent.trim().toLowerCase();


    if (buttonText.includes("add to cart")) {

        event.preventDefault();

        addToCart(button);

    }

});


// ==============================
// DISPLAY CART
// ==============================

function displayCart() {

    const cartContainer = document.getElementById("cart-items");

    if (!cartContainer) {
        return;
    }


    cartContainer.innerHTML = "";


    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h2>Your cart is empty</h2>
                <p>Add some products and they will appear here.</p>

                <a href="index.html">
                    Continue Shopping
                </a>
            </div>
        `;

        updateCartSummary();

        return;
    }


    cart.forEach(function(product, index) {

        const item = document.createElement("div");

        item.className = "cart-item";


        let imageHTML = "";

        if (product.image) {

            imageHTML = `
                <img
                    src="${product.image}"
                    alt="${product.name}"
                >
            `;

        } else {

            imageHTML = `
                <div class="cart-item-placeholder">
                    🛍️
                </div>
            `;
        }


        item.innerHTML = `

            <div class="cart-product-image">
                ${imageHTML}
            </div>

            <div class="cart-product-info">

                <h2>${product.name}</h2>

                <p class="cart-product-price">
                    $${product.price.toFixed(2)}
                </p>

                <p>
                    Quantity:
                    ${product.quantity}
                </p>

            </div>

            <div class="cart-product-actions">

                <button
                    class="remove-cart-item"
                    data-index="${index}">
                    Remove
                </button>

            </div>
        `;


        cartContainer.appendChild(item);

    });


    updateCartSummary();
}


// ==============================
// REMOVE PRODUCT
// ==============================

document.addEventListener("click", function(event) {

    const removeButton =
        event.target.closest(".remove-cart-item");

    if (!removeButton) {
        return;
    }


    const index =
        parseInt(removeButton.dataset.index);


    cart.splice(index, 1);

    saveCart();

    updateCartCount();

    displayCart();

});


// ==============================
// CART SUMMARY
// ==============================

function updateCartSummary() {

    const itemCounter =
        document.getElementById("cart-total-items");

    const priceCounter =
        document.getElementById("cart-total-price");


    if (!itemCounter || !priceCounter) {
        return;
    }


    const totalItems = cart.reduce(function(total, product) {
        return total + product.quantity;
    }, 0);


    const totalPrice = cart.reduce(function(total, product) {
        return total + (product.price * product.quantity);
    }, 0);


    itemCounter.textContent = totalItems;

    priceCounter.textContent =
        "$" + totalPrice.toFixed(2);
}


// ==============================
// START
// ==============================

updateCartCount();

displayCart();