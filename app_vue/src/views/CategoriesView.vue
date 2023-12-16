<template>
    <div id="wrapper">
        <AppSidebar />
        <div id="content-wrapper" class="d-flex flex-column">
            <main id="content">
                <AppNavbar />
                <MainContent title="Categories">
                    <CategoriesTable />
                </MainContent>
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

import CategoriesTable from '@/components/CategoriesTable.vue';


@Component({
    components: {
        AppSidebar, MainContent, AppNavbar, AppFooter, CategoriesTable
    },
})
export default class CategoriesView extends Vue { }
</script>
  