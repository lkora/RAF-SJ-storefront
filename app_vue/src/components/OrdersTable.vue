<template>
    <div>
        <!-- New Order button -->
        <div class="d-flex flex-row-reverse justify-content-between mb-2 mr-2">
            <router-link to="/new-order" class="btn btn-primary btn-icon-split btn-lg">
                <span class="icon text-white-50">
                    <i class="far fa-plus-square"></i>
                </span>
                <span class="text">Place a new order</span>
            </router-link>
        </div>

        <div class="row">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Ordered at</th>
                                <th>Status</th>
                                <th>Price</th>
                                <th>Address</th>
                                <th>Order</th>
                                <th>Order details</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Ordered at</th>
                                <th>Status</th>
                                <th>Price</th>
                                <th>Address</th>
                                <th>Order</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr v-for="order in orders" :key="order.id">
                                <td>{{ new Date(order.createdAt).toLocaleString() }}</td>
                                <td>{{ order.status.name }}</td>
                                <td>{{ `$${Math.round(order.price * 100) / 100}` }}</td>
                                <td>{{ order.address }}</td>
                                <td>{{ order.items.map(item => `${item.ItemOrder.quantity} x ${item.name}`).join('\n') }}
                                </td>
                                <td>
                                    <router-link :to="`/order/${order.id}`" class="btn btn-info">
                                        Details
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            orders: []
        }
    },
    created() {
        this.fetchOrders();
    },
    methods: {
        fetchOrders() {
            fetch('http://localhost:9000/order')
                .then(response => response.json())
                .then(orders => {
                    this.orders = orders;
                })
                .catch(error => {
                    console.error('Failed fetching orders with: ', error);
                });
        }
    }
}
</script>
  
<style scoped>
</style>
  