// Carrito

alert ("Bienvenido al carrito de compras");
const nombredelUsuario = prompt("Ingrese su nombre");
const carrito = [];
alert(`Hola ${nombredelUsuario}, ¡comencemos a agregar productos a tu carrito!`);

function agregarProducto() {
        let nombre = prompt("Ingrese el nombre del producto");
        while (nombre === "" || nombre === null || !isNaN(nombre)) {
                nombre = prompt("Ingrese un nombre válido");
        }
        let precio = parseInt(prompt("Ingrese el precio del producto"));
        while (precio <= 0 || isNaN(precio)) {
                precio = parseInt(prompt("Ingrese un precio válido"));
        }
        return {
                nombre: nombre,
                precio: precio
        };
}

while (confirm("¿Desea agregar un producto al carrito?")) {
        const producto = agregarProducto();
        carrito.push(producto);
        alert(`Producto agregado: ${producto.nombre} - Precio: $${producto.precio}`);
}
mostrarCarrito();

function mostrarCarrito() {
        let listado = 'Carrito de compras:\n';
        if (carrito.length === 0) {
                listado += 'El carrito está vacío.';
        } else {
                let total = 0;
                for (let i = 0; i < carrito.length; i++) {
                        listado += `Nombre: ${carrito[i].nombre}
Precio: $${carrito[i].precio}\n`;
total += carrito[i].precio;
        }
                listado += `Total: $${total}\n`;
}
return alert(listado)
}

while (confirm("¿Desea eliminar un producto del carrito?")) {
        eliminarProducto();
}

function eliminarProducto() {
        const nombreProducto = prompt("Ingrese el nombre del producto a eliminar");
        for (let i = 0; i < carrito.length; i++) {
                if (carrito[i].nombre.toLowerCase() === nombreProducto.toLowerCase()) {
                        carrito.splice(i, 1);
                        alert(`El producto ${nombreProducto} ha sido eliminado del carrito.`);
                        mostrarCarrito();
                        return;
                }
        }
        console.log(`El producto ${nombreProducto} no se encuentra en el carrito.`);
        
}

mostrarCarrito();
