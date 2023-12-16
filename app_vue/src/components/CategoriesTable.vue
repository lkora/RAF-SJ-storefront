<template>
    <div>
        <!-- New Category button -->
        <div class="d-flex flex-row-reverse justify-content-between mb-2 mr-2">
            <router-link to="/new-category" class="btn btn-primary btn-icon-split btn-lg">
                <span class="icon text-white-50">
                    <i class="far fa-plus-square"></i>
                </span>
                <span class="text">Create a new category</span>
            </router-link>
        </div>

        <div class="row">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Edit</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr v-for="category in categories" :key="category.id">
                                <td>{{ category.name }}</td>
                                <td>{{ category.description || 'No description' }}</td>
                                <td>
                                    <router-link :to="`/category/${category.id}`" class="btn btn-info btn-circle">
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
            categories: []
        }
    },
    created() {
        this.fetchCategories();
    },
    methods: {
        fetchCategories() {
            fetch('http://localhost:9000/category')
                .then(response => response.json())
                .then(categories => {
                    this.categories = categories;
                })
                .catch(error => {
                    console.error('Failed fetching categories with: ', error);
                });
        }
    }
}
</script>
  
<style scoped>
</style>
  