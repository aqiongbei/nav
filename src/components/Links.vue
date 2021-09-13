<template>
    <div class="links-wrapper">
        <a
            v-for="(item, index) of data"
            :key="index"
            :href="item.link"
            target="_blank"
            @touchstart.stop="t_start(item)"
            @touchmove="t_move"
            @touchend="t_end"
            class="item-wrapper">
            <div class="icon-wrapper">
                <img v-if="item.icon" :src="item.icon" alt="">
                <Icon v-else type="md-globe" class="icon"/>
            </div>
            <div class="content-wrapper">
                <h5 class="title">{{item.name}}</h5>
                <p class="link">{{openPage(item.link)}}</p>
            </div>
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
            this.touch_item = item;
            clearTimeout(this.timer);
            this.timer = setTimeout(this.notice, 500)
        },
        t_move () {
            clearTimeout(this.timer);;
        },
        t_end () {
            clearTimeout(this.timer);;
        },
        notice () {
            this.$emit('long-touch', JSON.parse(JSON.stringify(this.touch_item)))
        },
        openPage (url) {
            return url.replace(/(https|http):\/\//, '').split('/')[0];
        }
    }
}
</script>
<style lang="less">
.links-wrapper {
    .item-wrapper {
        height: 50px;
        max-width: calc(100vw - 16px);
        display: inline-flex;
        vertical-align: top;
        justify-content: space-between;
        border-radius: 25px;
        background-color: #fefefe;
        padding: 6px 18px 6px 6px;
        margin-right: 10px;
        margin-bottom: 10px;
        border: 2px solid #6a8de5;
        box-shadow: 0 2px 5px 3px rgba(40, 40, 40, 0.09);

        .icon-wrapper {
            width: 34px;
            height: 34px;
            border-radius: 24px;
            background-color: #6a8de5;
            img {
                width: 100%;
                height: 100%;
                border-radius: 24px;
                object-position: center;
                object-fit: cover;
            }
            .icon {
                margin-top: 5px;
                margin-left: 5px;
                color: #fff;
                font-size: 24px;
            }
        }
        .content-wrapper {
            margin-left: 8px;
            max-width: calc(100% - 42px);
            .title, .link {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .title {
                color: #282828;
                font-size: 14px;
            }
            .link {
                padding: 0;
                margin: 0;
                font-size: 12px;
                color: #bfbfbf;
            }
        }
    }
}
</style>