window.addEventListener("load", function () {
    const form = document.getElementById("new-order-form");
    form.addEventListener("submit", handleFormSubmit);

    document.getElementById('add-item-button').addEventListener('click', addItemToOrder);
    document.getElementById('remove-item-button').addEventListener('click', removeItemFromOrder);
    document.getElementById('order-address').addEventListener('input', validateForm);
    document.getElementById('order-items').addEventListener('change', validateForm);

    loadItems();
});

function handleFormSubmit(event) {
    event.preventDefault();

    const address = document.getElementById('order-address').value;
    const items = Array.from(document.getElementById('order-items').options).map(option => ({
        id: option.value,
        quantity: parseInt(option.dataset.quantity) // Get the quantity from the data-quantity attribute
    }));

    const orderData = {
        items,
        address
    };

    fetch('http://localhost:9000/order', {
        method: 'POST',
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

function addItemToOrder() {
    const itemsSelect = document.getElementById('items-select');
    const orderItemsSelect = document.getElementById('order-items');
    const quantityInput = document.getElementById('item-quantity');

    Array.from(itemsSelect.selectedOptions).forEach(option => {
        const orderOption = option.cloneNode(true);
        const quantity = parseInt(quantityInput.value);
        orderOption.textContent += ` x${quantity} = $${(quantity * parseFloat(option.dataset.price)).toFixed(2)}`; // Add the quantity and price to the option text
        orderOption.dataset.quantity = quantity; // Store the quantity in a data attribute
        orderItemsSelect.appendChild(orderOption);
    });

    updateTotal();
    validateForm();
}

function removeItemFromOrder() {
    const orderItemsSelect = document.getElementById('order-items');

    Array.from(orderItemsSelect.selectedOptions).forEach(option => {
        orderItemsSelect.removeChild(option);
    });

    updateTotal();
    validateForm();
}

function updateTotal() {
    const orderItemsSelect = document.getElementById('order-items');
    const totalInput = document.getElementById('order-total');

    let total = 0;
    Array.from(orderItemsSelect.options).forEach(option => {
        total += parseFloat(option.dataset.price) * parseInt(option.dataset.quantity);
    });

    totalInput.value = `$${total.toFixed(2)}`;
}

function validateForm() {
    const address = document.getElementById('order-address').value;
    const orderItems = document.getElementById('order-items').options;

    document.getElementById('save-button').disabled = !address || orderItems.length === 0;
}

function loadItems() {
    // Fetch the items from the API
    fetch('http://localhost:9000/item')
    .then(response => response.json())
    .then(items => {
        const itemsSelect = document.getElementById('items-select');
        itemsSelect.innerHTML = '';

        items.forEach((item, index) => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.name;
            option.dataset.price = item.price; // Store the item price in a data attribute
            itemsSelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Failed loading items with: ', error);
    });
}
