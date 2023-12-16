<template>
    <div>
        <!-- New Item Form -->
        <form @submit.prevent="handleSubmit">
            <!-- Item Name -->
            <div class="form-group row">
                <div class="col-sm-12">
                    <label for="item-name" class="form-label">Item Name</label>
                    <input type="text" class="form-control" id="item-name" v-model="itemName" placeholder="Name" required>
                </div>
            </div>

            <!-- Item Description -->
            <div class="form-group row">
                <div class="col-sm-12">
                    <label for="item-description" class="form-label">Item Description</label>
                    <textarea class="form-control" id="item-description" v-model="itemDescription"
                        placeholder="Description"></textarea>
                </div>
            </div>

            <!-- Item Manufacturer -->
            <div class="form-group row">
                <div class="col-sm-6">
                    <label for="item-manufacturer" class="form-label">Manufacturer</label>
                    <select class="form-control" id="item-manufacturer" v-model="selectedManufacturer" required>
                        <option v-for="manufacturer in manufacturers" :key="manufacturer.id" :value="manufacturer.id">
                            {{ manufacturer.name }}
                        </option>
                    </select>
                </div>
                <div class="col-sm-6">
                    <label for="item-category" class="form-label">Category</label>
                    <select class="form-control" id="item-category" v-model="selectedCategories" multiple>
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                </div>

            </div>

            <!-- Item Price -->
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
                <div class="col-sm-10 mb-3 mb-sm-0">
                    <button type="submit" class="btn btn-primary btn-block">Create new item</button>
                </div>
                <div class="col-sm-2">
                    <router-link to="./catalog" class="btn btn-info btn-block">
                        Back
                    </router-link>
                </div>
            </div>

        </form>
    </div>
</template>
  
  
<script>
export default {
    data() {
        return {
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
                const data = {
                    name: this.itemName,
                    description: this.itemDescription,
                    manufacturerId: this.selectedManufacturer,
                    available: this.itemsAvailable,
                    price: this.itemPrice,
                    categories: this.selectedCategories
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
                        this.$router.push('/catalog');
                    })
                    .catch(error => {
                        console.error('Failed creating item with: ', error);
                        alert(error);
                    });
            }
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
        }
    },
    created() {
        this.getCategories();
        this.getManufacturers();
    }
}
</script>
  
<style scoped></style>
