window.addEventListener("load", function () {
    fetchOrders()
})

function fetchOrders() {
    fetch('http://localhost:9000/order')
        .then(response => response.json())
        .then(orders => {
            const tbody = document.querySelector('#dataTable tbody')
            console.log(orders)
            tbody.innerHTML = ''

            orders.forEach((order, index) => {
                const tr = document.createElement('tr')

                const orderedAtTd = document.createElement('td')
                orderedAtTd.textContent = new Date(order.createdAt).toLocaleString()
                tr.appendChild(orderedAtTd)

                const statusTd = document.createElement('td')
                statusTd.textContent = order.status.name
                tr.appendChild(statusTd)

                const priceTd = document.createElement('td')
                priceTd.textContent = `$${order.price.toFixed(2)}`
                tr.appendChild(priceTd)

                const addressTd = document.createElement('td')
                addressTd.textContent = order.address
                tr.appendChild(addressTd)

                const orderDetailsTd = document.createElement('td');
                orderDetailsTd.textContent = order.items.map(item => `${item.ItemOrder.quantity} x ${item.name}`).join('\n');
                tr.appendChild(orderDetailsTd);           

                const detailsTd = document.createElement('td')
                const detailsLink = document.createElement('a')
                detailsLink.href = `order.html?id=${order.id}`
                detailsLink.className = 'btn btn-info'
                detailsLink.textContent = 'Details'
                detailsTd.appendChild(detailsLink)
                tr.appendChild(detailsTd)

                tbody.appendChild(tr)
            })
        })
        .catch(error => {
            console.error('Failed fetching orders with: ', error)
            alert(error)
        })
}
