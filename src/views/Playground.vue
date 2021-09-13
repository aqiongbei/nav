<template>
    <div class="playground-wrapper">
        <Carousel loop :autoplay-speed="5000">
            <CarouselItem v-for="item of banner" :key="item.id" class="banner-item">
                <a :href="item.link" target="_blank">
                    <img :src="item.img" alt="">
                    <div class="banner-info" v-if="item.title || item.desc">
                        <h3>{{item.title}}</h3>
                        <p>{{item.desc}}</p>
                    </div>
                </a>
            </CarouselItem>
        </Carousel>
        <Links :data="list" class="playground-links"></Links>
    </div>
</template>
<script>
import Links from '@/components/Links.vue'
import config from'@/config/playground'

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
    methods: {}
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
    .banner-item {
        border-radius: 8px;
        position: relative;
        overflow: hidden;
        height: 200px;
        font-size: 0px;
        text-align: center;
        img {
            height: 200px;
            width: 100%;
            border-radius: 8px;
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