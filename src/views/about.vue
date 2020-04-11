<template>
    <div class="about-page-wrapper">
        <Card :bordered="false">
            <p slot="title">关于应用</p>
            <p>本应用使用vue + vue-router等vue生态技术栈开发</p>
            <p>应用部署在coding page</p>
            <p>应用定位为纯本地的干净导航页面</p>
            <p>最初的开发目的视为了满足自己使用需求</p>
        </Card>
        <Card :bordered="false">
            <p slot="title">关于作者</p>
            <p>aqiongbei</p>
            <p>github地址: <a href="https://github.com/aqiongbei">https://github.com/aqiongbei</a></p>
        </Card>
        <Button icon="md-arrow-back" @click="goBack">看完了吧</Button>
    </div>
</template>
<script>

export default {
    name: 'about',
    components: {},
    methods: {
        goBack() {
            this.$router.back();
        }
    }
}
</script>
<style lang="less">
    .about-page-wrapper {
        text-align: center;
        .ivu-card {
            text-align: left;
            background: transparent;
        }
        button {
            background: transparent;
        }
    }
</style>