<template>
    <form method="post" id="order-details-form" @submit.prevent="handleSubmit">
        <input type="hidden" id="order-id" name="orderId" v-model="localOrderId">
        <dl class="row">
            <dt class="col-sm-3">Date:</dt>
            <dd class="col-sm-9">{{ orderDate }}</dd>

            <dt class="col-sm-3">Status:</dt>
            <dd class="col-sm-9">
                <select class="form-control" name="orderStatus" id="order-status" v-model="orderStatus">
                    <option v-for="status in statuses" :key="status.id" :value="status.id">
                        {{ status.name }}
                    </option>
                </select>
            </dd>

            <dt class="col-sm-3">Amount:</dt>
            <dd class="col-sm-9">{{ orderAmount }}</dd>

            <dt class="col-sm-3">Shipping Address:</dt>
            <dd class="col-sm-9">{{ orderAddress }}</dd>

            <dt class="col-sm-3">Order Items:</dt>
            <dd class="col-sm-9">{{ orderItems }}</dd>
        </dl>

        <div class="form-group row">
            <div class="col-sm-10 mb-3 mb-sm-0">
                <button type="submit" class="btn btn-primary btn-block" :disabled="isSaveDisabled">Save Order
                    Changes</button>
            </div>
            <div class="col-sm-2">
                <router-link to="/orders" class="btn btn-info btn-block">Back</router-link>
            </div>
        </div>
    </form>
</template>
  
<script>
export default {
    props: ['orderId'],

    data() {
        return {
            localOrderId: null,
            orderDate: '',
            orderStatus: null,
            orderAmount: null,
            orderAddress: '',
            orderItems: [],
            statuses: [],
            isSaveDisabled: true
        }
    },
    methods: {
        handleSubmit() {
            if (this.orderStatus !== this.savedStatus) {
                const data = {
                    status: this.orderStatus
                };

                // Send a PUT request to the API
                fetch(`http://localhost:9000/order/${this.orderId}`, {
                    method: 'PUT',
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
        loadOrderStatuses() {
            fetch('http://localhost:9000/order/statuses')
                .then(response => response.json())
                .then(statuses => {
                    this.statuses = statuses;
                    this.loadOrder();
                })
                .catch(error => {
                    console.error('Failed loading order statuses with: ', error);
                });
        },
        loadOrder() {
            fetch(`http://localhost:9000/order/${this.orderId}`)
                .then(response => response.json())
                .then(order => {
                    this.localOrderId = order.id;
                    this.orderDate = new Date(order.createdAt).toLocaleString();
                    this.orderAmount = `$${Math.round(order.price * 100) / 100}`;
                    this.orderAddress = order.address;
                    this.orderItems = order.items.map(item => `${item.ItemOrder.quantity} x ${item.name}`).join('\n');
                    this.orderStatus = order.status.id;
                    this.savedStatus = order.status.id;
                })
                .catch(error => {
                    console.error('Failed loading order with: ', error);
                });
        }
    },
    watch: {
        orderStatus(newStatus) {
            this.isSaveDisabled = Number(newStatus) === this.savedStatus;
        }
    },
    created() {
        this.localOrderId = this.$route.params.id;
        this.loadOrderStatuses();
    }
}
</script>
  
<style scoped>
/* Your edit order form CSS goes here */
</style>
  