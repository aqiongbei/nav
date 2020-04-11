<template>
    <div class="links-wrapper">
        <a
            v-for="item of data"
            :href="item.link"
            target="_blank"
            @touchstart.stop="t_start(item)"
            @touchmove="t_move"
            @touchend="t_end"
            class="item-wrapper">
            <Icon type="md-open" class="icon"/>
            <h5 class="title">{{item.name}}</h5>
            <p class="link">{{getDomain(item.link)}}</p>
        </a>
    </div>
</template>
<script>
export default {
    name: 'Links',
    props: {
        data: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            timer: 0,
            touch_item: {}
        }
    },
    methods: {
        t_start (item) {
            console.log('start', item)
            this.touch_item = item;
            clearTimeout(this.timer);
            this.timer = setTimeout(this.notice, 500)
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
            console.log('long-touch', this.touch_item);
            this.$emit('long-touch', JSON.parse(JSON.stringify(this.touch_item)))
        },
        getDomain (url) {
            return url.replace(/(https|http):\/\//, '').split('/')[0];
        }
    }
}
</script>
<style lang="less">
.links-wrapper {
    .item-wrapper {
        min-width: 80px;
        max-width: 360px;
        height: 50px;
        text-align: left;
        display: inline-block;
        border-radius: 25px;
        background-color: #fefefe;
        padding: 6px 18px;
        padding-right: 44px;
        margin-right: 10px;
        margin-bottom: 10px;

        .icon {
            float: right;
            margin-right: -30px;
            font-size: 20px;
            line-height: 38px;
        }
        .title, .link {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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
}
</style>