<template>
  <div>
    <!-- New Item button -->
    <div class="d-flex flex-row-reverse justify-content-between mb-2 mr-2">
      <router-link to="/new-item" class="btn btn-primary btn-icon-split btn-lg">
        <span class="icon text-white-50">
          <i class="far fa-plus-square"></i>
        </span>
        <span class="text">Add New Item</span>
      </router-link>
    </div>

    <div class="row">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered" id="data-table" width="100%" cellspacing="0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Manufacturer</th>
                <th>Available</th>
                <th>Price</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Manufacturer</th>
                <th>Available</th>
                <th>Price</th>
              </tr>
            </tfoot>
            <tbody>
              <tr v-for="item in items" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.categories.map(category => category.name).join(', ') }}</td>
                <td>{{ item.manufacturer.name }}</td>
                <td>{{ item.available }}</td>
                <td>{{ item.price }}</td>
                <td>
                  <router-link :to="`/item/${item.id}`" class="btn btn-info btn-circle">
                    <i class="fas fa-edit"></i>
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
      items: []
    }
  },
  created() {
    this.fetchCatalog();
  },
  methods: {
    fetchCatalog() {
      fetch('http://localhost:9000/item')
        .then(response => response.json())
        .then(items => {
          this.items = items;
        })
        .catch(error => {
          console.error('Failed fetching items with: ', error);
        });
    }
  }
}
</script>

<style scoped>
</style>
