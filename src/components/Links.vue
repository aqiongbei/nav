<template>
    <div :class="['links-wrapper', showStyle]">
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
                <img
                    v-if="item.noIcon !== true"
                    :src="item.link + '/favicon.ico'"
                    @error="setIcon(item)"
                />
                <span v-else-if="item.name" class="text-icon">{{ item.name }}</span>
                <Icon v-else type="md-globe" class="icon"/>
            </div>
            <div class="content-wrapper">
                <h5 class="title">{{formatName(item)}}</h5>
                <p class="link">{{formatUrl(item.link)}}</p>
            </div>
            <Icon
                v-if="edit"
                type="md-close-circle"
                class="icon-remove"
                @click.stop.prevent="remove(item.id)"
            />
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
        },
        showStyle: {
            type: String,
            default: 'capsule'
        },
        edit: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            timer: 0,
            touchData: {}
        }
    },
    methods: {
        t_start (item) {
            this.touchData = item;
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
            this.$emit('long-touch', JSON.parse(JSON.stringify(this.touchData)))
        },
        formatName(item) {
            if (item.name) {
                return item.name;
            } else if (item.link) {
                // https://baidu.com => baidu
                let link = this.clearUrl(item.link);
                return link.replace(/\.[^.]+$/gi, '');
            }
        },
        formatUrl (url) {
            return this.clearUrl(url);
        },
        getFavicon(link) {
            return '';
        },
        clearUrl(url) {
            // https://www.baidu.com => baidu.com
            url = url.replace(/(https|http):\/\//, '');
            url = url.replace('www.', '');
            return url.split('/')[0];
        },
        remove(id) {
            console.log('id', id);
            this.$emit('remove', id);
        },
        setIcon(item) {
            this.$set(item, 'noIcon', true);
        }
    }
}
</script>
<style lang="less">
.links-wrapper {
    .item-wrapper {
            .icon-wrapper {
                img {
                    width: 100%;
                    height: 100%;
                    object-position: center;
                }
            }
            .content-wrapper {
                .title,
                .link,
                .share-info {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .title {
                    color: #282828;
                    font-size: 14px;
                    text-transform: capitalize;
                }
                .link {
                    padding: 0;
                    margin: 0;
                    font-size: 12px;
                    color: #bfbfbf;
                }
            }
        }
    &.capsule {
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
            position: relative;
            .icon-remove {
                position: absolute;
                right: 0px;
                top: 11px;
                color: #ed4014;
                font-size: 24px;
            }
            .icon-wrapper {
                width: 34px;
                height: 34px;
                overflow: hidden;
                text-align: center;
                border-radius: 24px;
                background-color: #6a8de5;
                img {
                    object-fit: cover;
                }
                .text-icon {
                    color: #fff;
                    font-size: 20px;
                    line-height: 34px;
                    font-weight: bold;
                }
                .icon {
                    margin-top: 5px;
                    color: #fff;
                    font-size: 24px;
                }
            }
            .content-wrapper {
                margin-left: 8px;
                max-width: calc(100% - 42px);
            }
        }
    }
    &.card {
        // column-count: 2;
        // column-gap: 8px;
        .item-wrapper {
            background-color: #fff;
            padding: 8px;
            border-radius: 6px;
            vertical-align: top;
            display: inline-block;
            width: calc((100vw - 26px) / 2);
            box-shadow: 0 2px 7px rgba(0,0,0,.15);
            margin-bottom: 8px;
            &:nth-child(even) {
                margin-left: 10px;
            }
            .icon-wrapper {
                height: 80px;
                overflow: hidden;
                border-radius: 8px;
                background-color: #f7f7f7;
                text-align: center;
                img {
                    object-fit: none;
                }
                .text-icon {
                    color: #dcdee2;
                    font-size: 30px;
                    line-height: 80px;
                    font-weight: bold;
                    font-style: italic;
                }
                .icon {
                    color: #dcdee2;
                    line-height: 80px;
                    font-size: 30px;
                }
            }
            .content-wrapper {
                margin-top: 4px;
            }
        }
    }
}
</style>