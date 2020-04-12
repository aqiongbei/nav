<template>
    <div class="playground-wrapper">
        <Carousel autoplay loop :autoplay-speed="5000">
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
        <Links :data="list" @long-touch="longtouchHandler" class="playground-links"></Links>
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
    methods: {
        longtouchHandler() {}
    }
}
</script>
<style lang="less">
.playground-wrapper {
    .banner-item {
        border-radius: 40px;
        position: relative;
        overflow: hidden;
        height: 200px;
        font-size: 0px;
        text-align: center;
        img {
            height: 200px;
        }
        .banner-info {
            position: absolute;
            bottom: 0;
            width: 100%;
            text-align: left;
            padding-left: 30px;
            background-color: rgba(255,255,255,0.6);
            h3, p {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: #282828;
            }
            h3 {
                font-size: 16px;
            }
            p {
                font-size: 14px;
            }
        }
    }
    .playground-links {
        margin-top: 20px;
    }
}
</style>