<template>
    <div class="error-page-wrapper">
        <h5>404</h5>
        <p>你要找的页面好像有自己的想法<br>就随他去吧</p>
        <Button icon="md-arrow-back" @click="goBack">施主请回吧</Button>
    </div>
</template>
<script>

export default {
    name: 'ErrorPage',
    components: {},
    methods: {
        goBack() {
            this.$router.back();
        }
    }
}
</script>
<style lang="less">
    .error-page-wrapper {
        text-align: center;
        h5 {
            padding-top: calc(15vh);
            font-size: 140px;
            opacity: 0.6;
        }
        p {
            font-size: 20px;
        }
        button {
            margin-top: 10px;
            background-color: transparent;
        }
    }
</style>