<template>
    <div class="container-fluid">
        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">{{ title }}</h1>
        </div>
        <!-- Main Content -->
        <slot></slot>
    </div>
</template>
  
<script>
export default {
    props: {
        title: String
    }
}
</script>
  
<style scoped>
</style>
  