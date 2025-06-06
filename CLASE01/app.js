const orderList = document.getElementById('orderList');
const orderForm = document.getElementById('orderForm');
const clienteInput = document.getElementById('cliente');
const productoInput = document.getElementById('producto');

let orderId = 1;

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const cliente = clienteInput.value.trim();
    const producto = productoInput.value.trim();

    if (cliente && producto) {
        const order = {
            id: orderId++,
            estado: 'En Proceso',
            cliente,
            producto
        };

        addOrder(order);
        processOrder(order);

        orderForm.reset(); // Limpiar formulario
    }
});

function addOrder(order) {
    const listItem = document.createElement('li');
    listItem.id = `order-${order.id}`;
    listItem.classList.add('en-proceso');
    listItem.textContent = `Pedido #${order.id} - ${order.cliente} pidió ${order.producto} [${order.estado}]`;
    orderList.appendChild(listItem);
}

function updateOrderStatus(order, estado) {
    const listItem = document.getElementById(`order-${order.id}`);
    if (listItem) {
        listItem.className = '';
        listItem.classList.add(estado === 'Completado' ? 'completado' : 'en-proceso');
        listItem.textContent = `Pedido #${order.id} - ${order.cliente} pidió ${order.producto} [${estado}]`;
    }
}

function prepararPedido() {
    return new Promise(resolve => {
        const tiempoPreparacion = Math.floor(Math.random() * 5000) + 1000;
        setTimeout(resolve, tiempoPreparacion);
    });
}

async function processOrder(order) {
    await prepararPedido();
    updateOrderStatus(order, 'Completado');
}
