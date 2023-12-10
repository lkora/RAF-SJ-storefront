function handleFormSubmit(event) {
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
    const form = document.getElementById("new-item-form");
    form.addEventListener("submit", handleFormSubmit);

    const itemName = document.getElementById("item-name");
    itemName.addEventListener("keypress", function () {
        this.classList.remove("form-error");
    });

    getCategories();
    getManufacturers();
});

function submitDataToTable(event) {
    event.preventDefault();

    const categorySelect = document.getElementById('item-category');
    const selectedCategories = Array.from(categorySelect.selectedOptions).map(option => option.value);

    const manufacturerSelect = document.getElementById('item-manufacturer');
    const selectedManufacturer = manufacturerSelect.value;

    const itemName = document.getElementById('item-name').value;
    const itemDescription = document.getElementById('item-description').value;
    const itemPrice = document.getElementById('item-price').value;
    const itemsAvailable = document.getElementById('items-available').value;

    const data = {
        name: itemName,
        description: itemDescription,
        manufacturerId: selectedManufacturer,
        available: itemsAvailable,
        price: itemPrice,
        categories: selectedCategories
    };

    // Send a POST request to the API
    fetch('http://localhost:9000/item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(updatedItem => {
            console.log('Item posted:', updatedItem);
            location.href = "http://localhost:8000/pages/catalog.html"
        })
        .catch(error => {
            console.error('Failed creating item with: ', error);
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