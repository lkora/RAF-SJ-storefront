window.addEventListener("load", function () {
    const form = document.getElementById("category-details-form");
    form.addEventListener("submit", handleFormSubmit);
});

function handleFormSubmit(event) {
    event.preventDefault();
    
    validateForm();
    submitDataToTable();
}

function submitDataToTable() {
    const categoryName = document.getElementById('category-name').value;
    const categoryDescription = document.getElementById('category-description').value;

    const categoryData = {
        name: categoryName,
        description: categoryDescription
    };

    fetch('http://localhost:9000/category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        window.location.href = './categories.html';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function validateForm() {
    var categoryName = document.getElementById("category-name");
    var categoryNameValue = categoryName.value.trim();

    if (!categoryName) {
        categoryName.classList.add("form-error");
        return false;
    } else {
        categoryName.classList.remove("form-error");
        return true;
    }
}