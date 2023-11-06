
function createNewTag() {
    const tagList = document.getElementById("tags");
    const newTagInput = document.getElementById("tag-name");
    
    let newTag = newTagInput.value.trim();
    if (!newTag) {
        alert("Please input a new tag name before trying to add a new tag.");
        return;
    }
    addNewTag(newTag);
    newTagInput.value = "";
}

var tags = []
function addNewTag(newTag) {
    if (tags.includes(newTag)) {
        alert("Tag already exists in list!");
        return
    }
    
    tags.push(newTag);

    
    // Create DOM
    let span = document.createElement("span");
    span.classList.add("badge");
    span.classList.add("btn-info");
    span.classList.add("p-2");
    span.classList.add("mr-2");
    span.innerHTML = newTag;

    let button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-default");
    button.classList.add("btn-sm");

    button.innerHTML = "X";
    button.addEventListener("click", function(){
        this.parentNode.parentNode.removeChild(this.parentNode);
    });
    

    span.appendChild(button);
    document.getElementById("tags").appendChild(span);

}

function handleFormSubmit(event) {
    validateNameField(event);
    serializeTags();
}


function serializeTags() {
    let tagArray = [];
    let spanElements = document.querySelectorAll('span.badge');
    spanElements.forEach((spanElement) => {
        tagArray.push(spanElement.innerHTML);
    });

    let input = document.getElementById("tags-input");
    input.value = JSON.stringify(textArray);
    
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

    const addTagButton = this.document.getElementById("add-tag");
    addTagButton.addEventListener("click", createNewTag);
});
