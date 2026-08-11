let wishlist = JSON.parse(localStorage.getItem("razzyWishlist")) || [];


// ==============================
// SAVE WISHLIST
// ==============================

function saveWishlist() {
    localStorage.setItem(
        "razzyWishlist",
        JSON.stringify(wishlist)
    );
}


// ==============================
// UPDATE WISHLIST COUNT
// ==============================

function updateWishlistCount() {

    const counters =
        document.querySelectorAll("#wishlist-count");

    counters.forEach(function(counter) {
        counter.textContent = wishlist.length;
    });
}


// ==============================
// ADD TO WISHLIST
// ==============================

function addToWishlist(button) {

    const card =
        button.closest(".category-product-card") ||
        button.closest(".product-card") ||
        button.closest(".featured-product-card");

    if (!card) return;


    const nameElement =
        card.querySelector("h1") ||
        card.querySelector("h2") ||
        card.querySelector("h3");

    const priceElement =
        card.querySelector(".category-price") ||
        card.querySelector(".product-price") ||
        card.querySelector(".price");

    const imageElement =
        card.querySelector("img");


    const name = nameElement
        ? nameElement.textContent.trim()
        : "Product";


    let price = 0;

    if (priceElement) {

        price = parseFloat(
            priceElement.textContent
                .replace(/,/g, "")
                .replace("$", "")
        ) || 0;

    }


    const image = imageElement
        ? imageElement.getAttribute("src")
        : "";


    const exists = wishlist.some(function(item) {
        return item.name === name;
    });


    if (exists) {

        wishlist = wishlist.filter(function(item) {
            return item.name !== name;
        });

        button.classList.remove("wishlisted");
        button.innerHTML = "♡";

    } else {

        wishlist.push({
            name: name,
            price: price,
            image: image
        });

        button.classList.add("wishlisted");
        button.innerHTML = "♥";

    }


    saveWishlist();
    updateWishlistCount();

}


// ==============================
// HEART BUTTONS
// ==============================

document.addEventListener("click", function(event) {

    const button =
        event.target.closest(".wishlist-button");

    if (!button) return;

    event.preventDefault();

    addToWishlist(button);

});


// ==============================
// DISPLAY WISHLIST
// ==============================

function displayWishlist() {

    const container =
        document.getElementById("wishlist-items");

    if (!container) return;


    container.innerHTML = "";


    if (wishlist.length === 0) {

        container.innerHTML = `
            <div class="empty-wishlist">

                <div class="empty-wishlist-icon">
                    ♡
                </div>

                <h2>Your wishlist is empty</h2>

                <p>
                    Save products you like and find them here later.
                </p>

                <a href="index.html">
                    Continue Shopping
                </a>

            </div>
        `;

        return;
    }


    wishlist.forEach(function(product, index) {

        const item =
            document.createElement("div");

        item.className = "wishlist-item";


        item.innerHTML = `

            <div class="wishlist-product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="wishlist-product-info">

                <h2>${product.name}</h2>

                <p>
                    $${product.price.toFixed(2)}
                </p>

            </div>


            <button
                class="remove-wishlist"
                data-index="${index}">

                Remove

            </button>

        `;


        container.appendChild(item);

    });

}


// ==============================
// REMOVE FROM WISHLIST
// ==============================

document.addEventListener("click", function(event) {

    const button =
        event.target.closest(".remove-wishlist");

    if (!button) return;


    const index =
        parseInt(button.dataset.index);


    wishlist.splice(index, 1);

    saveWishlist();

    updateWishlistCount();

    displayWishlist();

});


// ==============================
// START
// ==============================

updateWishlistCount();
displayWishlist();