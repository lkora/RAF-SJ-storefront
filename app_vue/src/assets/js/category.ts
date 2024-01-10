window.addEventListener("load", function () {
    const form = document.getElementById("category-details-form");
    form.addEventListener("submit", handleFormSubmit);

    document.getElementById('delete-category-button').onclick = function(e){
        deleteCategory()
    }

    loadCategory();
});

function handleFormSubmit(event) {
    event.preventDefault();

    const categoryId = document.getElementById('category-id').value;
    const categoryName = document.getElementById('category-name').value;
    const categoryDescription = document.getElementById('category-description').value;

    const categoryData = {
        name: categoryName,
        description: categoryDescription
    };

    fetch(`http://localhost:9000/category/${categoryId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(categoryData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        location.href = "http://localhost:8000/pages/categories.html";
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function deleteCategory() {
    const categoryId = document.getElementById('category-id').value;

    fetch(`http://localhost:9000/category/${categoryId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        console.log('Deleted category with:', response);
        location.href = "http://localhost:8000/pages/categories.html";
    })
    .catch(error => {
        console.error('Failed deleting category with: ', error);
        alert(error);
    });
}

function loadCategory() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('id');

    fetch(`http://localhost:9000/category/${categoryId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(category => {
        document.getElementById('category-id').value = category.id
        document.getElementById('category-name').value = category.name;
        document.getElementById('category-description').value = category.description;
    })
    .catch(error => {
        console.error('Failed loading category with: ', error);
        alert(error);
    });
}
