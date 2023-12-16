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
                                <NewOrderForm></NewOrderForm>
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

import NewOrderForm from '@/components/NewOrderForm.vue';


@Component({
    components: {
        AppSidebar, MainContent, AppNavbar, AppFooter, NewOrderForm
    },
})
export default class NewOrderView extends Vue { }

</script>
  