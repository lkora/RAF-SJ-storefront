<template>
    <form id="item-details-form" @submit.prevent="handleSubmit">
        <input type="hidden" id="item-id" name="itemId" v-model="localItemId">
        <div class="form-group row">
            <div class="col-sm-12">
                <label for="item-name" class="form-label">Item Name</label>
                <input type="text" class="form-control" id="item-name" v-model="itemName" required placeholder="Name">
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-12">
                <label for="item-description" class="form-label">Item Description</label>
                <textarea class="form-control" id="item-description" v-model="itemDescription"
                    placeholder="Description"></textarea>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-6">
                <label for="item-manufacturer" class="form-label">Manufacturer</label>
                <select class="form-control" name="itemManufacturer" id="item-manufacturer" v-model="selectedManufacturer">
                    <option v-for="manufacturer in manufacturers" :key="manufacturer.id" :value="manufacturer.id">
                        {{ manufacturer.name }}
                    </option>
                </select>
            </div>
            <div class="col-sm-6">
                <label for="item-category" class="form-label">Category</label>
                <select class="form-control" name="itemCategory" id="item-category" v-model="selectedCategories" multiple>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                        {{ category.name }}
                    </option>
                </select>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-6">
                <label for="item-price" class="form-label">Item Price</label>
                <input type="number" step="0.01" min="0" class="form-control" id="item-price" v-model="itemPrice"
                    placeholder="Price" required>
            </div>
            <div class="col-sm-6">
                <label for="items-available" class="form-label">Items Available</label>
                <input type="number" step="1" min="0" class="form-control" id="items-available" v-model="itemsAvailable"
                    placeholder="Number of available items" required>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-8 mb-3 mb-sm-0">
                <button type="submit" class="btn btn-primary btn-block">Save Item Changes</button>
            </div>
            <div class="col-sm-2">
                <button class="btn btn-danger btn-block" @click.prevent="deleteItem">Delete</button>
            </div>
            <div class="col-sm-2">
                <router-link to="/catalog" class="btn btn-info btn-block">Back</router-link>
            </div>
        </div>
    </form>
</template>
  
<script>
export default {
    props: ['itemId'],

    data() {
        return {
            localItemId: this.itemId,
            itemName: '',
            itemDescription: '',
            selectedManufacturer: null,
            selectedCategories: [],
            itemPrice: null,
            itemsAvailable: null,
            manufacturers: [],
            categories: []
        }
    },
    methods: {
        handleSubmit() {
            if (this.itemName.length < 3) {
                // Handle validation error...
            } else {
                var data = {
                    itemId: this.localItemId,
                    name: this.itemName,
                    description: this.itemDescription,
                    available: this.itemsAvailable,
                    price: this.itemPrice,
                    manufacturerId: this.selectedManufacturer,
                    categories: this.selectedCategories
                };

                // Send a PUT request to the API
                fetch(`http://localhost:9000/item/${this.itemId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => response.json())
                    .then(updatedItem => {
                        console.log('Item updated:', updatedItem);
                        this.$router.push('/catalog');
                    })
                    .catch(error => {
                        console.error('Failed updating item with: ', error);
                        alert(error);
                    });
            }
        },
        deleteItem() {
            fetch(`http://localhost:9000/item/${this.itemId}`, {
                method: 'DELETE'
            })
                .then(() => {
                    console.log('Item deleted');
                    this.$router.push('/catalog');
                })
                .catch(error => {
                    console.error('Failed deleting item with: ', error);
                    alert(error);
                });
        },

        getCategories() {
            fetch('http://localhost:9000/category')
                .then(response => response.json())
                .then(categories => {
                    this.categories = categories;
                })
                .catch(error => {
                    console.error('Failed fetching categories with: ', error);
                });
        },
        getManufacturers() {
            fetch('http://localhost:9000/manufacturer')
                .then(response => response.json())
                .then(manufacturers => {
                    this.manufacturers = manufacturers;
                })
                .catch(error => {
                    console.error('Failed fetching manufacturers with: ', error);
                });
        },
        getItem(itemId) {
            fetch(`http://localhost:9000/item/${this.itemId}`)
                .then(response => response.json())
                .then(item => {
                    this.localItemId = itemId
                    this.itemName = item.name;
                    this.itemDescription = item.description;
                    this.selectedManufacturer = item.manufacturer.id;
                    this.selectedCategories = item.categories.map(category => category.id);
                    this.itemPrice = item.price;
                    this.itemsAvailable = item.available;
                })
                .catch(error => {
                    console.error('Failed fetching item with: ', error);
                });
        }
    },
    created() {
        console.log('Route ID:', this.$route.params.id);
        this.localItemId = this.itemId;
        this.getCategories();
        this.getManufacturers();
        this.getItem(this.itemId);
    }
}
</script>
  
<style scoped></style>
  