const paymentCart =
    JSON.parse(localStorage.getItem("razzyCart")) || [];

const DELIVERY_FEE = 15;


function formatPrice(price) {

    return "$" + price.toFixed(2);

}


function displayPaymentProducts() {

    const productsContainer =
        document.getElementById("payment-products");

    if (!productsContainer) {
        return;
    }

    productsContainer.innerHTML = "";


    if (paymentCart.length === 0) {

        productsContainer.innerHTML = `

            <div class="payment-empty-cart">

                <div>🛒</div>

                <h3>Your cart is empty</h3>

                <p>
                    Add some products before checking out.
                </p>

                <a href="index.html">
                    Continue Shopping
                </a>

            </div>

        `;

        updatePaymentTotals();

        return;
    }


    paymentCart.forEach(function(product) {

        const productElement =
            document.createElement("div");

        productElement.className =
            "summary-product";


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
                🛍️
            `;

        }


        const productTotal =
            product.price * product.quantity;


        productElement.innerHTML = `

            <div class="product-placeholder">

                ${imageHTML}

            </div>

            <div class="summary-product-info">

                <strong>
                    ${product.name}
                </strong>

                <span>
                    Qty: ${product.quantity}
                </span>

                <b>
                    ${formatPrice(productTotal)}
                </b>

            </div>

        `;


        productsContainer.appendChild(productElement);

    });


    updatePaymentTotals();

}


function getSubtotal() {

    return paymentCart.reduce(
        function(total, product) {

            return total +
                (product.price * product.quantity);

        },
        0
    );

}


function getTotalItems() {

    return paymentCart.reduce(
        function(total, product) {

            return total + product.quantity;

        },
        0
    );

}


function updatePaymentTotals() {

    const subtotal = getSubtotal();

    const totalItems = getTotalItems();

    const delivery =
        paymentCart.length > 0
            ? DELIVERY_FEE
            : 0;

    const discount = 0;

    const finalTotal =
        subtotal + delivery - discount;


    const itemCount =
        document.getElementById("payment-item-count");

    if (itemCount) {

        itemCount.textContent =
            totalItems +
            (totalItems === 1 ? " Item" : " Items");

    }


    const subtotalElement =
        document.getElementById("payment-subtotal");

    if (subtotalElement) {

        subtotalElement.textContent =
            formatPrice(subtotal);

    }


    const deliveryElement =
        document.getElementById("payment-delivery");

    if (deliveryElement) {

        deliveryElement.textContent =
            formatPrice(delivery);

    }


    const discountElement =
        document.getElementById("payment-discount");

    if (discountElement) {

        discountElement.textContent =
            "-$" + discount.toFixed(2);

    }


    const totalElement =
        document.getElementById("payment-total");

    if (totalElement) {

        totalElement.textContent =
            formatPrice(finalTotal);

    }

}


displayPaymentProducts();