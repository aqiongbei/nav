<template>
    <div class="wrapper">
        <div class="content">
            <transition appear>
                <keep-alive>
                    <router-view />
                </keep-alive>
            </transition>
        </div>
        <transition appear>
            <Affix :offset-bottom="20" v-show="show_navbar">
                <div class="nav">
                    <router-link
                        v-for="item of NAV_CONFIG"
                        :to="item.path"
                        :key="item.path"
                        :class="['item', active == item.path && 'active']">
                        <Icon :type="item.icon" />
                        <br>
                        <span>{{item.name}}</span>
                    </router-link>
                </div>
            </Affix>
        </transition>
    </div>
</template>
<script>

const NAV_CONFIG = [{
    path: '/playground',
    name: '广场',
    icon: 'md-wifi',
}, {
    path: '/home',
    name: '我的',
    icon: 'md-home',
}, {
    path: '/settings',
    name: '设置',
    icon: 'md-settings',
}];

export default {
    name: 'Home',
    components: {},
    data () {
        return {
            NAV_CONFIG,
            active: NAV_CONFIG[1].path,
            last_offset: 0,
            show_navbar: true,
        }
    },
    computed: {},
    watch: {
        last_offset (new_val, old_val) {
            if (new_val > 140) {
                if (new_val < old_val) {
                    this.show_navbar = true;
                } else {
                    this.show_navbar = false;
                }
            } else {
                this.show_navbar = true;
            }
        },
        '$route' (to) {
            this.active = to.path;
        }
    },
    created () {
        if (this.$route.path == '/') {
            this.active = '/home';
        } else {
            this.active = this.$route.path;
        }
        window.addEventListener('scroll', (e) => {
            this.last_offset = window.pageYOffset;
        });
        window.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    },
    methods: {},
}
</script>
<style lang="less">
.content {
    padding: 10px 8px;
    background: #f4f4f4;
    min-height: calc(100vh);
    -webkit-touch-callout:none;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
}
.nav {
    margin: 0 20px;
    padding: 4px 0;
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 2px 7px rgba(0,0,0,.15);
    .item {
        width: 30%;
        color: #282828;
        text-align: center;
        i {
            line-height: 32px;
            font-size: 28px;
        }
        span {
            font-size: 12px;
        }
        display: inline-block;
        &.active {
            color: #6a8de5;
        }
    }
}
</style>