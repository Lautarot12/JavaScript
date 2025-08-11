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
        let cantidad = parseInt(prompt("Ingrese la cantidad del producto"));
        while (cantidad <= 0 || isNaN(cantidad)) {
                cantidad = parseInt(prompt("Ingrese una cantidad válida"));
                precioFinal = precio * cantidad;
        }
        return {
                nombre: nombre,
                precio: precio,
                cantidad: cantidad,
                precioFinal: precio * cantidad
        };
}

while (confirm("¿Desea agregar un producto al carrito?")) {
        const producto = agregarProducto();
        carrito.push(producto);
        alert(`Producto agregado: ${producto.nombre} - Precio: $${producto.precio} - Cantidad: ${producto.cantidad}`);
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
Precio: $${carrito[i].precio}
Cantidad: ${carrito[i].cantidad}
Total: $${carrito[i].precio * carrito[i].cantidad}\n -----------------------\n`;
total += carrito[i].precio * carrito[i].cantidad;
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
