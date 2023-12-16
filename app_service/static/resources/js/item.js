function handleFormSubmit(event) {
    event.preventDefault();
    validateNameField(event);
    submitDataToTable(event);
}

function validateNameField(event) {
    const itemName = document.getElementById("item-name");
    const itemNameValue = itemName.value.trim();

    if (itemNameValue.length < 3) {
        event.preventDefault();
        itemName.classList.add("form-error");
    } else {
        itemName.classList.remove("form-error");
    }
}


window.addEventListener("load", function () {
    const form = document.getElementById("item-details-form");
    form.addEventListener("submit", handleFormSubmit);

    const itemName = document.getElementById("item-name");
    itemName.addEventListener("keypress", function () {
        this.classList.remove("form-error");
    });

    getCategories();
    getManufacturers();
    loadElement();
});

document.getElementById('delete-item-button').onclick = function(e){
    deleteElement()
}

function deleteElement() {
    const itemId = document.getElementById('item-id').value;

    fetch(`http://localhost:9000/item/${itemId}`, {
        method: 'DELETE',
    })
        .then(response => {
            console.log('Deleted item with:', response);
            location.href = "http://localhost:8000/pages/catalog.html";
        })
        .catch(error => {
            console.error('Failed deleting item with: ', error);
            alert(error)
        });

}

function loadElement() {
    // Get the item ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');

    // Fetch the item data from the API
    fetch(`http://localhost:9000/item/${itemId}`)
        .then(response => response.json())
        .then(item => {
            // Fill the form fields with the item data
            document.getElementById('item-id').value = item.id
            document.getElementById('item-name').value = item.name;
            document.getElementById('item-description').value = item.description;
            document.getElementById('items-available').value = item.available;
            document.getElementById('item-price').value = item.price;

            // Select the item's category in the dropdown
            const categorySelect = document.getElementById('item-category');
            for (let i = 0; i < categorySelect.options.length; i++) {
                if (categorySelect.options[i].value == item.categories[0].id) {
                    categorySelect.selectedIndex = i;
                    break;
                }
            }

            const manufacturerSelect = document.getElementById('item-manufacturer');
            for (let i = 0; i < manufacturerSelect.options.length; i++) {
                if (manufacturerSelect.options[i].value == item.manufacturer.id) {
                    manufacturerSelect.selectedIndex = i;
                    break;
                }
            }

        })
        .catch(error => {
            console.error('Failed fetching item with: ', error);
        });
}

function submitDataToTable(event) {
    const itemId = document.getElementById('item-id').value;
    const itemName = document.getElementById('item-name').value;
    const itemDescription = document.getElementById('item-description').value;
    const itemsAvailable = document.getElementById('items-available').value;
    const itemPrice = document.getElementById('item-price').value;
    const itemManufacturer = document.getElementById('item-manufacturer').value;
    const itemCategory = Array.from(document.getElementById('item-category').selectedOptions).map(option => option.value);

    const itemData = {
        name: itemName,
        description: itemDescription,
        available: itemsAvailable,
        price: itemPrice,
        manufacturerId: itemManufacturer,
        categories: itemCategory
    };

    fetch(`http://localhost:9000/item/${itemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        location.href = "http://localhost:8000/pages/catalog.html"
    })
    .catch((error) => {
        console.error('Error:', error);
        alert(error);
    });
}

function getCategories() {
    fetch('http://localhost:9000/category')
        .then(response => response.json())
        .then(categories => {
            const categorySelect = document.getElementById('item-category');

            for (let category of categories) {
                const option = document.createElement('option');
                option.value = category.id;
                option.text = category.name;
                categorySelect.add(option);
            }
        })
        .catch(error => {
            console.error('Failed fetching categories with: ', error);
        });
}

function getManufacturers() {
    fetch('http://localhost:9000/manufacturer')
        .then(response => response.json())
        .then(manufacturers => {
            const manufacturerSelect = document.getElementById('item-manufacturer');

            for (let manufacturer of manufacturers) {
                const option = document.createElement('option');
                option.value = manufacturer.id;
                option.text = manufacturer.name;
                manufacturerSelect.add(option);
            }
        })
        .catch(error => {
            console.error('Failed fetching manufacturers with: ', error);
        });
}