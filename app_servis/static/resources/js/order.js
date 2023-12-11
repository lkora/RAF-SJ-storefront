let savedStatus = null

window.addEventListener("load", function () {
    const form = document.getElementById("order-details-form");
    form.addEventListener("submit", handleFormSubmit);

    loadOrderStatuses();
});


function handleFormSubmit(event) {
    event.preventDefault();

    const orderId = document.getElementById('order-id').value;
    const orderStatus = document.getElementById('order-status').value;

    const orderData = {
        status: orderStatus
    };

    fetch(`http://localhost:9000/order/${orderId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            window.location.href = './orders.html';
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function loadOrder() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id');

    fetch(`http://localhost:9000/order/${orderId}`)
        .then(response => response.json())
        .then(order => {
            document.getElementById('order-id').value = order.id;
            document.getElementById('order-date').textContent = new Date(order.createdAt).toLocaleString();
            document.getElementById('order-amount').textContent = `$${order.price.toFixed(2)}`;
            document.getElementById('order-address').textContent = order.address;
            document.getElementById('order-items').textContent = order.items.map(item => `${item.ItemOrder.quantity} x ${item.name}`).join('\n');


            savedStatus = order.status.id

            const statusSelect = document.getElementById('order-status');
            for (let i = 0; i < statusSelect.options.length; i++) {
                if (statusSelect.options[i].value == order.status.id) {
                    statusSelect.selectedIndex = i;
                    break;
                }
            }

            document.getElementById('save-button').disabled = true;
        })
        .catch(error => {
            console.error('Failed loading order with: ', error);
        });
}


function loadOrderStatuses() {
    fetch('http://localhost:9000/order/statuses')
        .then(response => response.json())
        .then(statuses => {
            const statusSelect = document.getElementById('order-status');
            statusSelect.innerHTML = '';

            statuses.forEach((status, index) => {
                const option = document.createElement('option');
                option.value = status.id;
                option.textContent = status.name;
                statusSelect.appendChild(option);
            });

            statusSelect.addEventListener('change', function () {
                if (Number(this.value) !== savedStatus) {
                    document.getElementById('save-button').disabled = false;
                } else {
                    document.getElementById('save-button').disabled = true;
                }
            });            

            loadOrder();
        })
        .catch(error => {
            console.error('Failed loading order statuses with: ', error);
        });
}
