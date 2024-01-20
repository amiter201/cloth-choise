// Fetch data from the API
async function fetchData() {
    const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
    const data = await response.json();
    console.log(data)
    return data;


}

// Display products based on category
function showProducts(categoryName) {
    fetchData().then(data => {
        const category = data.categories.find(cat => cat.category_name === categoryName);

        if (category) {
            const productsContainer = document.getElementById(categoryName + 'Products');
            productsContainer.innerHTML = '';

            category.category_products.forEach(product => {
                const discountPercentage = calculateDiscountPercentage(product.price, product.compare_at_price);

                const productCard = document.createElement('div');
                productCard.className = 'product-card';

                productCard.innerHTML = `
                  <img src="${product.image}" alt="${product.title}" class="product-image">
                  <div class="cart-view">
                  <h3>${product.title}</h3>
                  <p>${product.vendor}</p>
                  </div>
                  <div class="cart-view">
                  <p>Price: $${product.price}</p>
                  <p> <del> $${product.compare_at_price}<del></p>
                  <p> ${discountPercentage}% off</p>
                  </div>
                  <button class="button">Add to Cart</button>
              `;

                productsContainer.appendChild(productCard);
            });
        } else {
            // Handle the case when the category is not found
            console.error(`Category '${categoryName}' not found in the data.`);
        }
    });

    // Hide all product containers
    document.querySelectorAll('.products').forEach(container => {
        container.style.display = 'none';
    });

    // Show the selected product container
    document.getElementById(categoryName + 'Products').style.display = 'flex';
}

// Calculate discount percentage
function calculateDiscountPercentage(price, compareAtPrice) {
    if (compareAtPrice && compareAtPrice > price) {
        const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
        return Math.round(discount);
    }
    return 0;
}

// Show default category on page load
showProducts('Men');