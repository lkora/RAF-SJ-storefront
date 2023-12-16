<template>
  <form method="post" id="category-details-form" @submit.prevent="handleSubmit">
    <input type="hidden" id="category-id" name="categoryId" v-model="localCategoryId">
    <div class="form-group row">
      <div class="col-sm-6">
        <input type="text" class="form-control" id="category-name" v-model="categoryName" required placeholder="Name">
      </div>
    </div>
    <div class="form-group row">
      <div class="col-sm-12">
        <textarea class="form-control" id="category-description" v-model="categoryDescription"
          placeholder="Description"></textarea>
      </div>
    </div>
    <div class="form-group row">
      <div class="col-sm-8 mb-3 mb-sm-0">
        <button type="submit" class="btn btn-primary btn-block">Save Category Changes</button>
      </div>
      <div class="col-sm-2">
        <button class="btn btn-danger btn-block" @click.prevent="deleteCategory">Delete</button>
      </div>
      <div class="col-sm-2">
        <router-link to="/categories" class="btn btn-info btn-block">Back</router-link>
      </div>
    </div>
  </form>
</template>
  
<script>
export default {
  props: ['categoryId'],

  data() {
    return {
      localCategoryId: this.categoryId,
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

        // Send a PUT request to the API
        fetch(`http://localhost:9000/category/${this.categoryId}`, {
          method: 'PUT',
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
    },
    deleteCategory() {
      fetch(`http://localhost:9000/category/${this.categoryId}`, {
        method: 'DELETE',
      })
        .then(response => {
          console.log('Deleted category with:', response);
          this.$router.push('/categories');
        })
        .catch(error => {
          console.error('Failed deleting category with: ', error);
        });
    },
    loadCategory() {
      fetch(`http://localhost:9000/category/${this.categoryId}`)
        .then(response => response.json())
        .then(category => {
          this.localCategoryId = category.id;
          this.categoryName = category.name;
          this.categoryDescription = category.description;
        })
        .catch(error => {
          console.error('Failed loading category with: ', error);
        });
    }
  },
  created() {
    this.localCategoryId = this.$route.params.id;
    this.loadCategory();
  }
}
</script>
  
<style scoped>
/* Your edit category form CSS goes here */
</style>
  