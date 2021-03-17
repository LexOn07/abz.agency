<template>
<div class="main-container">
    <menuBlock />
    <headerComponent />
    <titleSection />
    <acquainted />
    <userList :updateList="updateList" @updateSuccess="updateList = false" />
    <registration @singUpClick="updateList = true" />
</div>
</template>

<script>
import headerComponent from './components/headerComponents.vue'
import titleSection from './components/title.vue'
import acquainted from './components/acquainted.vue'
import userList from './components/userList.vue'
import registration from './components/registration.vue'
import menuBlock from './components/menu.vue' 

export default {
    name: 'App',
    components: {
        headerComponent,
        titleSection,
        acquainted,
        userList,
        registration,
        menuBlock
    },
    data() {
        return {
            updateList: false
        }
    }
}
</script>

<style lang="scss">
body {
    margin: 0;
    overflow-x: hidden;
}

.main-container {
    max-width: 1170px;
    margin: 0 auto;
    overflow: hidden;
}
</style>
