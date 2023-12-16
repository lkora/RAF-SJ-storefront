<template>
    <form method="post" id="new-order-form" @submit.prevent="handleSubmit">
        <div class="form-group row">
            <div class="col-sm-6">
                <label for="order-address">Address:</label>
                <input type="text" class="form-control" id="order-address" v-model="orderAddress" required
                    placeholder="Address">
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-6">
                <label for="items-select">Items:</label>
                <select multiple class="form-control" id="items-select" v-model="selectedItems">
                    <option v-for="item in items" :key="item.id" :value="item.id">
                        {{ item.name }}
                    </option>
                </select>
            </div>
            <div class="col-sm-2">
                <label for="item-quantity">Amount:</label>
                <input type="number" min="1" id="item-quantity" v-model="itemQuantity" value="1">
                <button type="button" class="btn btn-primary btn-info mb-3" @click="addItemToOrder">Add
                    Item</button>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-12">
                <label for="order-items">Order Items:</label>
                <select multiple class="form-control" id="order-items" v-model="orderItems">
                    <option v-for="item in orderItemsList" :key="item.id" :value="item.id">
                        {{ item.name }} x{{ item.quantity }} = ${{ (item.quantity * item.price).toFixed(2) }}
                    </option>
                </select>
                <button class="btn btn-danger btn-block" type="button" @click="removeItemFromOrder">Remove
                    Item</button>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-6">
                <label for="order-total">Total:</label>
                <input type="text" readonly class="form-control" id="order-total" v-model="orderTotal">
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-10 mb-3 mb-sm-0">
                <button type="submit" class="btn btn-primary btn-block" :disabled="isSaveDisabled">Create New
                    Order</button>
            </div>
            <div class="col-sm-2">
                <router-link to="/orders" class="btn btn-info btn-block">Back</router-link>
            </div>
        </div>
    </form>
</template>
  
<script>
export default {
    data() {
        return {
            orderAddress: '',
            selectedItems: [],
            itemQuantity: 1,
            orderItemsList: [],
            items: [],
            isSaveDisabled: true
        }
    },
    computed: {
        orderItems: {
            get() {
                return this.orderItemsList.map(item => item.id);
            },
            set(value) {
                value.forEach(itemId => {
                    if (!this.orderItems.includes(itemId)) {
                        const item = this.items.find(item => item.id === itemId);
                        if (item) {
                            this.orderItemsList.push({
                                ...item,
                                quantity: this.itemQuantity
                            });
                        }
                    }
                });
            }
        },
        orderTotal() {
            return `$${this.orderItemsList.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}`;
        }
    },
    methods: {
        handleSubmit() {
            if (this.orderAddress && this.orderItemsList.length > 0) {
                const data = {
                    items: this.orderItemsList.map(item => ({
                        id: item.id,
                        quantity: item.quantity
                    })),
                    address: this.orderAddress
                };

                // Send a POST request to the API
                fetch('http://localhost:9000/order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        this.$router.push('/orders');
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            }
        },
        addItemToOrder() {
            this.selectedItems.forEach(itemId => {
                const item = this.items.find(item => item.id === itemId);
                if (item) {
                    const orderItem = this.orderItemsList.find(orderItem => orderItem.id === itemId);
                    if (orderItem) {
                        orderItem.quantity = Number(orderItem.quantity) + Number(this.itemQuantity);
                    } else {
                        this.orderItemsList.push({
                            ...item,
                            quantity: Number(this.itemQuantity)
                        });
                    }
                }
            });
            this.selectedItems = [];
            this.itemQuantity = 1;
        }, removeItemFromOrder() {
            this.orderItems.forEach(itemId => {
                const index = this.orderItemsList.findIndex(item => item.id === itemId);
                if (index !== -1) {
                    this.orderItemsList.splice(index, 1);
                }
            });
        },
        loadItems() {
            // Fetch the items from the API
            fetch('http://localhost:9000/item')
                .then(response => response.json())
                .then(items => {
                    this.items = items;
                })
                .catch(error => {
                    console.error('Failed loading items with: ', error);
                });
        }
    },
    watch: {
        orderAddress(value) {
            this.isSaveDisabled = !value || this.orderItemsList.length === 0;
        },
        orderItemsList(value) {
            this.isSaveDisabled = !this.orderAddress || value.length === 0;
        }
    },
    created() {
        this.loadItems();
    }
}
</script>
  
<style scoped></style>
  