<template>
    <div class="home-wrapper">
        <Affix class="tools" v-if="list.length || search">
            <div v-if="edit" class="btns-wrapper">
                <span @click="operateDone('cancel')">
                    <Icon type="md-close" color="#2db7f5"/> 放弃
                </span>
                <span @click="operateDone('ok')">
                    <Icon type="md-checkmark" color="#19be6b"/> 完成
                </span>
            </div>
            <div
                class="search-wrapper"
                v-else-if="search"
            >
                <Input
                    search
                    enter-button
                    @on-search="doSearch"
                    placeholder="请输入链接名称或者链接地址"
                />
                <Button type="text" @click="cancelSearch">取消</Button>
            </div>
            <div v-else class="btns-wrapper">
                <span @click="showSearch">
                    <Icon type="md-search" /> 搜索
                </span>
                <span @click="edit = true;">
                    <Icon type="md-list"/> 批量删除
                </span>
            </div>
        </Affix>
        <Links
            v-if="list.length"
            :data="list"
            :edit="edit"
            @remove="removeTemp"
            @long-touch="longtouchHandler"
        ></Links>
        <div v-else class="no-data-info">
            <h5>空</h5>
            <p v-if="search">暂无满足条件的数据</p>
            <p v-else>我的天呐!这里有个大写的空<br>赶紧去<span @click="openDialog('new')">添加链接</span>吧</p>
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
                <Form ref="form" :model="currentData" :rules="rules">
                    <FormItem prop="name" label="名称">
                        <Input type="text" v-model.trim="currentData.name" placeholder="请输入网站名称"></Input>
                    </FormItem>
                    <FormItem prop="link" label="链接">
                        <Input v-model.trim="currentData.link" placeholder="请输入网站链接"></Input>
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
            search: false,
            is_edit: false,
            show_modal: false,
            toRemoveList: [],
            currentData: {},
            edit: false,
            rules: {
                link: [
                    {required: true, message: '网站链接不能为空呢'},
                    {type: 'url', trigger: 'blur', message: '网站链接格式不对劲儿呢' }
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
            this.currentData = item;
            this.openDialog('edit');
        },
        removeTemp(id) {
            this.toRemoveList.push(id);
            this.list = this.list.filter(item => {
                return item.id !== id;
            });
        },
        operateDone(type) {
            this.edit = false;
            if (type === 'ok') {
                this.toRemoveList.map(id => {
                    this.$links.remove(id);
                });
                this.toRemoveList = [];
            }
            this.getLinks();
        },
        showSearch() {
            this.search = true;
            this.list = [];
        },
        doSearch(keyword) {
            let list = this.$links.find();
            this.list = list.filter(item => {
                if (item.name && item.name.includes(keyword)) {
                    return true;
                } else if(item.link.includes(keyword)) {
                    return true;
                } else {
                    return false;
                }
            });
        },
        cancelSearch() {
            this.search = false;
            this.getLinks();
        },
        openDialog (type) {
            if (type == 'new') {
                this.is_edit = false;
                this.currentData = {};
                this.$utils.report('点击', '新建按钮');
            } else {
                this.$utils.report('长按', '编辑弹窗');
                this.is_edit = true;
            }
            this.show_modal = true;
            this.$refs.form.resetFields();
        },
        closeDialog () {
            this.currentData = {};
            this.show_modal = false;
        },
        getLinks () {
            this.list = this.$links.find();
        },
        save () {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (this.is_edit) {
                        this.$links.update(this.currentData)
                    } else {
                        this.$links.insertOne(this.currentData)
                    }
                    this.getLinks();
                    this.closeDialog();
                }
            });
        },
        remove () {
            this.$links.remove(this.currentData.id);
            this.getLinks();
            this.closeDialog();
        }
    }
}
</script>
<style lang="less">
.home-wrapper {
    text-align: left;
    .tools {
        padding-bottom: 10px;
        .btns-wrapper {
            display: flex;
            justify-content: space-between;
        }
        .search-wrapper {
            display: flex;
        }
    }
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