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
            location.href = "http://localhost:8000/pages/catalog.html"
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
    const categorySelect = document.getElementById('item-category');
    const selectedCategories = Array.from(categorySelect.selectedOptions).map(option => option.value);

    const manufacturerSelect = document.getElementById('item-manufacturer');
    const selectedManufacturer = manufacturerSelect.value;

    const formData = new FormData(event.target);
    formData.append('categories', JSON.stringify(selectedCategories));
    formData.append('manufacturerId', selectedManufacturer);

    const data = Object.fromEntries(formData);
    const itemId = document.getElementById('item-id').value;

    // Send a PUT request to the API
    fetch(`http://localhost:9000/item/${itemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(updatedItem => {
            console.log('Item updated:', updatedItem);
        })
        .catch(error => {
            console.error('Failed updating item with: ', error);
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