<template>
    <!-- Your sidebar HTML goes here -->
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      <!-- Sidebar - Brand -->
      <router-link class="sidebar-brand d-flex align-items-center justify-content-center" to="/">
        <div class="sidebar-brand-icon rotate-n-15">
          <i class="fas fa-screwdriver"></i>
        </div>
        <div class="sidebar-brand-text mx-3">Part store</div>
      </router-link>
      <!-- Divider -->
      <hr class="sidebar-divider my-0">
      <!-- Nav Item - Dashboard -->
      <li class="nav-item" :class="{ 'active': $route.path === '/' }">
        <router-link class="nav-link" to="/">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </router-link>
      </li>
      <!-- Divider -->
      <hr class="sidebar-divider">
      <!-- Heading -->
      <div class="sidebar-heading">
        Pages
      </div>
      <!-- Nav Item - Catalog -->
      <li class="nav-item" :class="{ 'active': $route.path === '/catalog' }">
        <router-link class="nav-link" to="/catalog">
          <i class="fas fa-fw fa-chart-area"></i>
          <span>Catalog</span>
        </router-link>
      </li>
      <!-- Nav Item - Orders -->
      <li class="nav-item" :class="{ 'active': $route.path === '/orders' }">
        <router-link class="nav-link" to="/orders">
          <i class="fas fa-fw fa-table"></i>
          <span>Orders</span>
        </router-link>
      </li>
      <!-- Divider -->
      <hr class="sidebar-divider">
      <!-- Heading -->
      <div class="sidebar-heading">
        Product
      </div>
      <!-- Nav Item - Categories -->
      <li class="nav-item" :class="{ 'active': $route.path === '/categories' }">
        <router-link class="nav-link" to="/categories">
          <i class="far fa-list-alt"></i>
          <span>Categories</span>
        </router-link>
      </li>
    </ul>
  </template>
  
<script>
export default {
    name: 'AppSidebar',
    props: {
    }
}
</script>
  
<style scoped>
</style>
