<template>
    <div class="playground-wrapper">
            <!-- autoplay -->
        <Carousel
            loop
            arrow="always"
            :autoplay-speed="5000"
        >
            <CarouselItem
                v-for="item of banner"
                :key="item.id"
                class="banner-item"
            >
                <a :href="item.link" target="_blank">
                    <img
                        v-if="item.noImg !== true && item.img"
                        :src="item.img"
                        @error="setImg(item)"
                    />
                    <div
                        v-else
                        class="no-img"
                        :style="item.style"
                    >{{ item.title || clearUrl(item.link)}}</div>
                    <div class="banner-info" v-if="item.title || item.desc">
                        <h3>{{item.title}}</h3>
                        <p>{{item.desc}}</p>
                    </div>
                </a>
            </CarouselItem>
        </Carousel>
        <Links
            :data="list"
            show-style="card"
            class="playground-links"
        ></Links>
    </div>
</template>
<script>
import Links from '@/components/Links.vue'
import config from'@/config/playground/index'

export default {
    name: 'Home',
    components: {
        Links
    },
    data () {
        return {
            list: config.links,
            banner: config.banner
        }
    },
    created () {},
    methods: {
        setImg(item) {
            this.$set(item, 'noImg', true);
        },
        clearUrl(url) {
            // https://www.baidu.com => baidu.com
            url = url.replace(/(https|http):\/\//, '');
            url = url.replace('www.', '');
            url = url.replace(/\.[^.]+$/gi, '');
            return url;
        }
    }
}
</script>
<style lang="less">
.playground-wrapper {
    .ivu-carousel-dots {
        bottom: 2px;
        li {
            padding: 13px 0 0;
        }
    }
    .ivu-carousel {
        border-radius: 8px;
        overflow: hidden;
    }
    .banner-item {
        border-radius: 8px;
        font-size: 0px;
        position: relative;
        text-align: center;
        overflow: hidden;
        .no-img,
        img {
            height: 30vh;
            width: 100%;
            overflow: hidden;
            border-radius: 8px;
        }
        img {
            object-fit: cover;
            object-position: center;
        }
        .no-img {
            line-height: 3;
            color: #fff;
            font-size: 60px;
            font-weight: 900;
            font-style: italic;
            background: #c0c4cc;
            font-family: Arial, Helvetica, sans-serif;
        }
        .banner-info {
            position: absolute;
            bottom: 0;
            width: 100%;
            text-align: left;
            padding: 4px 0 4px 10px;
            background-color: rgba(255,255,255,0.5);
            h3, p {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            h3 {
                color: #464c5b;
                font-size: 16px;
            }
            p {
                color: #657180;
                font-size: 14px;
            }
        }
    }
    .playground-links {
        margin-top: 20px;
    }
}
</style>