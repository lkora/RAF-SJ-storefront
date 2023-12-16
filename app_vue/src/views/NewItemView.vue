<template>
    <div id="app">
        <div id="wrapper">
            <AppSidebar />
            <div id="content-wrapper" class="d-flex flex-column">
                <main id="content">
                    <AppNavbar />
                    <MainContent title="New Item">
                        <div class="row d-flex justify-content-center">
                            <div class="card-body col-lg-7 p-5 center">
                                <NewItemForm></NewItemForm>
                            </div>
                        </div>
                    </MainContent>
                </main>
                <AppFooter />
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppSidebar from '@/components/AppSidebar.vue';
import MainContent from '@/components/MainContent.vue';
import AppNavbar from '@/components/AppNavbar.vue';
import AppFooter from '@/components/AppFooter.vue';

import NewItemForm from '@/components/NewItemForm.vue';


@Component({
    components: {
        AppSidebar, MainContent, AppNavbar, AppFooter, NewItemForm
    },
})
export default class NewItemView extends Vue { }

</script>
  