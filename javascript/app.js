let products = []
let productId = 1

const form = document.getElementById('productForm')
const container = document.getElementById('productsContainer')

const savedProducts = JSON.parse(localStorage.getItem("products"))
if (savedProducts) {
        products = savedProducts
        productId = products.length > 0 ? products[products.length - 1].id + 1 : 1
        renderProducts()
}

document.getElementById("clearAll").addEventListener("click", () => {
        products = []
        container.innerHTML = ""
        localStorage.removeItem("products")
        productId = 1
})

form.addEventListener("submit", function(event){
        event.preventDefault()
        const name = document.getElementById("productName").value
        const price = document.getElementById("productPrice").value
        const description = document.getElementById("productDescription").value
        const quantity = document.getElementById("productQuantity").value
        
        const product = {
                id: productId++,
                name: name,
                price: price,
                quantity: quantity,
                description: description,
        }

        products.push(product)
        localStorage.setItem("products", JSON.stringify(products))
        renderProducts()
form.reset()
});


function renderProducts() {
        container.innerHTML = ""
        products.forEach((product) => {
                const productDiv = document.createElement("div")
                const productInfo = document.createElement("div")
                productInfo.innerHTML = `<h3>${product.name}</h3>
                                        <p>Precio: $${product.price}</p>
                                        <p>Cantidad: ${product.quantity}</p>
                                        <p>Descripción: ${product.description}</p>
                                        <p>Total: ${product.price * product.quantity}</p>`

                const deleteButton = document.createElement("button")
                deleteButton.textContent = "Eliminar producto"
                deleteButton.addEventListener("click", () => deleteProduct(product.id))

                const displayTotalPrice = document.createElement("div")
                const TotalPrice = products.reduce((acc, prod) => acc + (prod.price * prod.quantity), 0);
                displayTotalPrice.innerHTML = `<h4>Total de los productos: $${TotalPrice}</h4>`

                productDiv.appendChild(productInfo)
                productDiv.appendChild(displayTotalPrice)
                productDiv.appendChild(deleteButton)
                container.appendChild(productDiv)
        });
}

function deleteProduct(id) {
        products = products.filter((product) => product.id !== id)
        localStorage.setItem("products", JSON.stringify(products))
        renderProducts()
}

