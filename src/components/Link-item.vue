<template>
    <a
        :href="config.link"
        target="_blank"
        @touchstart="t_start"
        @touchmove="t_move"
        @touchend="t_end"
        class="item-wrapper">
        <Icon type="md-open" class="icon"/>
        <h5 class="title">{{config.name}}</h5>
        <p class="link">{{config.link}}</p>
    </a>
</template>
<script>
export default {
    name: 'Link-item',
    props: {
        config: {
            type: Object,
            default: () => {}
        }
    },
    data () {
        return {
            timer: 0,
        }
    },
    methods: {
        t_start () {
            console.log('start')
            clearTimeout(this.timer);
            this.timer = setTimeout(this.notice, 600)
        },
        t_move () {
            console.log('move')
            clearTimeout(this.timer);;
        },
        t_end () {
            console.log('end')
            clearTimeout(this.timer);;
        },
        notice () {
            console.log('long-touch');
        }
    }
}
</script>
<style lang="less">
.item-wrapper {
    min-width: 300px;
    height: 50px;
    text-align: left;
    display: inline-block;
    border-radius: 16px;
    background-color: #fefefe;
    padding: 6px 18px;
    margin-right: 10px;
    margin-bottom: 10px;
    .icon {
        float: right;
        font-size: 20px;
        line-height: 38px;
    }
    .title {
        color: #282828;
        font-size: 13px;
    }
    .link {
        padding: 0;
        margin: 0;
        font-size: 12px;
        color: #bfbfbf;
    }
}
</style>