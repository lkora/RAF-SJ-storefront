<template>
    <form method="post" id="category-details-form" @submit.prevent="handleSubmit">
        <div class="form-group row">
            <div class="col-sm-6">
                <input type="text" class="form-control" id="category-name" v-model="categoryName" required
                    placeholder="Name">
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-12">
                <textarea class="form-control" id="category-description" v-model="categoryDescription"
                    placeholder="Description"></textarea>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-10 mb-3 mb-sm-0">
                <button type="submit" class="btn btn-primary btn-block">Create New Category</button>
            </div>
            <div class="col-sm-2">
                <router-link to="/categories" class="btn btn-info btn-block">Back</router-link>
            </div>
        </div>
    </form>
</template>
  
<script>
export default {
    data() {
        return {
            categoryName: '',
            categoryDescription: ''
        }
    },
    methods: {
        handleSubmit() {
            if (this.categoryName.length < 3) {
                // Handle validation error...
            } else {
                const data = {
                    name: this.categoryName,
                    description: this.categoryDescription
                };

                // Send a POST request to the API
                fetch('http://localhost:9000/category', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        this.$router.push('/categories');
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            }
        }
    }
}
</script>
  
<style scoped>
/* Your new category form CSS goes here */
</style>
  