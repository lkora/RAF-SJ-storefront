<template>
    <div id="wrapper">
        <AppSidebar />
        <div id="content-wrapper" class="d-flex flex-column">
            <main id="content">
                <AppNavbar />
                <MainContent title="Catalog">
                    <CatalogTable />
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

import CatalogTable from '@/components/CatalogTable.vue';


@Component({
    components: {
        AppSidebar, MainContent, AppNavbar, AppFooter, CatalogTable
    },
})
export default class CatalogView extends Vue { }
</script>
  