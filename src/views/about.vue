<template>
    <div class="about-page-wrapper">
        <Card :bordered="false">
            <p slot="title">关于应用</p>
            <p>应用版本: {{version}}</p>
            <p>创建时间: {{create_at}}</p>
            <p>应用部署在coding page / github pages</p>
            <p>本应用使用vue + vue-router等vue生态技术栈开发</p>
            <p>应用定位为纯本地的简单干净移动端导航页,不用注册不用登陆</p>
            <p>最初的开发目的视为了满足自己使用需求,如果恰好也帮助了你,希望你用的高兴</p>
        </Card>
        <Card :bordered="false">
            <p slot="title">关于作者</p>
            <p>aqiongbei</p>
            <p>一个不务正业的小码农</p>
            <p>github地址: <a href="https://github.com/aqiongbei">https://github.com/aqiongbei</a></p>
            <p>联系作者: <a href="mailto:aqiongbei@gmail.com">aqiongbei@gmail.com</a></p>
        </Card>
        <Button icon="md-arrow-back" @click="goBack">看完了吧</Button>
    </div>
</template>
<script>
import package_json from '@/../package.json'

export default {
    name: 'about',
    components: {},
    data () {
        return {
            version: package_json.version,
            create_at: package_json.create_at,
        }
    },
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