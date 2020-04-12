<template>
    <div class="home-wrapper">
        <Links v-if="list.length" :data="list" @long-touch="longtouchHandler"></Links>
        <div v-else class="no-data-info">
            <h5>空</h5>
            <p>我的天呐!这里有个大写的空<br>赶紧去<span @click="openDialog('new')">添加链接</span>吧</p>
        </div>
        <Button shape="circle" icon="md-add" type="primary" class="add-btn" @click="openDialog('new')"></Button>
        <Modal
            v-model="show_modal"
            class-name="form-modal-wrapper">
            <p slot="header" style="text-align:center">
                <span v-if="is_edit">修改 或者 删除 ?</span>
                <span v-else>新建一个导航链接</span>
            </p>
            <div>
                <Form ref="form" :model="show_item" :rules="rules">
                    <FormItem prop="name">
                        <Input type="text" v-model.trim="show_item.name" placeholder="请输入网站名称">
                            <Icon type="md-create" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="link">
                        <Input v-model.trim="show_item.link" placeholder="请输入网站链接">
                            <Icon type="ios-link" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button v-if="is_edit" type="text" class="btn-error" @click="remove">删除</Button>
                <Button type="primary" :class="[!is_edit && 'long-btn']" @click="save">保存</Button>
            </div>
    </Modal>
    </div>
</template>
<script>
import Links from '@/components/Links.vue'

export default {
    name: 'Home',
    components: {
        Links
    },
    data () {
        return {
            list: [],
            is_edit: false,
            show_modal: false,
            show_item: {},
            rules: {
                name: [
                    {required: true, message: '咋回事小老弟,网站名称咋为空呢?'}
                ],
                link: [
                    {required: true, message: '咋回事小老弟,网站链接咋为空呢?'},
                    {type: 'url', trigger: 'blur', message: '你的这个网站链接好像有点不对劲儿唉' }
                ]
            }
        }
    },
    watch: {
        '$route' () {
            this.getLinks();
        }
    },
    created () {
        this.getLinks();
    },
    methods: {
        longtouchHandler (item) {
            this.show_item = item;
            this.openDialog('edit');
        },
        openDialog (type) {
            if (type == 'new') {
                this.is_edit = false;
                this.show_item = {};
            } else {
                this.is_edit = true;
            }
            this.show_modal = true;
            this.$refs.form.resetFields();
        },
        closeDialog () {
            this.show_item = {};
            this.show_modal = false;
        },
        getLinks () {
            this.list = this.$links.get();
        },
        save () {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (this.is_edit) {
                        this.$links.update(this.show_item)
                    } else {
                        this.$links.insert([this.show_item])
                    }
                    this.getLinks();
                    this.closeDialog();
                }
            });
        },
        remove () {
            this.$links.remove(this.show_item.id);
            this.getLinks();
            this.closeDialog();
        }
    }
}
</script>
<style lang="less">
.home-wrapper {
    text-align: left;
    
    .no-data-info {
        text-align: center;
        margin-top: calc(14vh);
        h5 {
            opacity: 0.6;
            font-size: 140px;
        }
        p {
            font-size: 20px;
            margin-top: 30px;
            span {
                color: #2d8cf0;
            }
        }
    }
    .add-btn {
        position: fixed;
        bottom: 150px;
        right: 10px;
    }
}
.form-modal-wrapper {
    user-select:none;
    .ivu-modal-footer {
        button {
            width: 48%;
            &.btn-error {
                float: left;
                color: #ed4014;
            }
            &.long-btn {
                width: 100%;
            }
        }
    }
}
</style>