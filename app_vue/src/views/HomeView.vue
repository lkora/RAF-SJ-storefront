<template>
  <div id="wrapper">
    <AppSidebar />
    <div id="content-wrapper" class="d-flex flex-column">
      <main id="content">
        <AppNavbar />
        <MainContent title="Welcome to the dashboard" />
      </main>
      <AppFooter />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppSidebar from '@/components/AppSidebar.vue';
import MainContent from '@/components/MainContent.vue';
import AppNavbar from '@/components/AppNavbar.vue';
import AppFooter from '@/components/AppFooter.vue';

@Component({
  components: {
    AppSidebar, MainContent, AppNavbar, AppFooter
  },
})
export default class HomeView extends Vue { }
</script>
