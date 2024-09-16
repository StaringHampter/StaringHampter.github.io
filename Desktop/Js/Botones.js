
const botonesAgregar = document.querySelectorAll('.boton-comprar');
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

botonesAgregar.forEach(boton => {
    boton.addEventListener('click', Agregar);
});

function Agregar(event) {
    event.preventDefault();
    const elemento = event.target.closest('.producto');
    const productoID = elemento.getAttribute('data-id');
    const nombre = elemento.querySelector('h3').textContent;
    const precio = elemento.querySelector('.precio').textContent;
    const producto = {
        id: productoID,
        nombre: nombre,
        precio: precio
    };
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    Mostrar();
}

function Mostrar() {
    const carritoDiv = document.getElementById('carrito');
    carritoDiv.innerHTML = '';
    let total = 0;
    carrito.forEach(producto => {
        const divProducto = document.createElement('div');
        divProducto.textContent = `${producto.nombre} - ${producto.precio}`;
        carritoDiv.appendChild(divProducto);
        total += parseFloat(producto.precio.replace('Q', ''));
    });
    document.getElementById('total').textContent = total.toFixed(2);
}

Mostrar();

document.getElementById('finalizar-compra').addEventListener('click', finalizarCompra);

function finalizarCompra() {
    let message = "Hola, me gustaría comprar los siguientes productos:\n\n";
    carrito.forEach(producto => {
        message += `${producto.nombre} - ${producto.precio}\n`;
    });
    message += `\nTotal: Q${document.getElementById('total').textContent}`;
    const phoneNumber = "+50252820425";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}
document.getElementById('borrar-compra').addEventListener('click', eliminar);
function eliminar() {
    carrito = [];
    localStorage.removeItem('carrito');
    Mostrar();
}