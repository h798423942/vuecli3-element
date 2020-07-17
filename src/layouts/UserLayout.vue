<template>
    <div style="height: 100%">
        <router-view :key="key"/>
    </div>
</template>

<script>
    export default {
        name: "UserLayout",
        computed: {
            key(){
                return this.$route.path + Math.random();
            }
        }
    }
</script>
