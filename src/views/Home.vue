<template>
    <div class="home-wrapper">
        <LinkItem v-for="item of list" :config="item" :key="item.id"></LinkItem>
    </div>
</template>
<script>
import LinkItem from '@/components/Link-item.vue'
const list = [{
    id: 1,
    name: '百度一下',
    link: 'http://baidu.com'
}, {
    id: 2,
    name: '百度两下',
    link: 'http://baidu.com'
}, {
    id: 3,
    name: '百度三下',
    link: 'http://baidu.com'
}, {
    id: 4,
    name: '百度四下',
    link: 'http://baidu.com'
}, ]
export default {
    name: 'Home',
    components: {
        LinkItem
    },
    data () {
        return {
            list,
        }
    }
}
</script>
<style lang="less">
.home-wrapper {
    text-align: left;
}
</style>