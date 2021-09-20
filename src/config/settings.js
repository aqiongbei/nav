import package_json from '@/../package.json'

function getStorageUsedSize() {
    var size = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            size += localStorage.getItem(key).length;
        }
    }
    return `${(size / 1024).toFixed(2)} KB`;
}

const settings = [{
    title: '绑定账户',
    name: 'bind-account',
    disabled: true,
    extra: '经费不够,功能被砍了',
    icon: 'md-person',
}, {
    title: '同步数据',
    name: 'sync-data',
    disabled: true,
    extra: '理由同上',
    icon: 'md-sync',
}, {
    title: '导出数据',
    name: 'export',
    disabled: false,
    extra: 'nav_data.json',
    icon: 'md-cloud-download',
}, {
    title: '导入策略',
    name: 'merge',
    disabled: false,
    icon: 'md-git-merge',
    value: true,
    type: 'i_switch',
    options: {
        true: {
            color: '',
            label: '合并'
        },
        false: {
            color: '#ff9900',
            label: '覆盖'
        }
    }
}, {
    title: '导入数据',
    name: 'import',
    disabled: false,
    extra: 'json文件',
    icon: 'md-cloud-upload',
}, {
    title: '存储方式',
    name: 'storage_method',
    disabled: false,
    icon: 'logo-buffer',
    extra: 'localStorage',
}, {
    title: '存储空间',
    name: 'storage_size',
    disabled: false,
    extra: `${getStorageUsedSize()} / 5MB`,
    icon: 'md-pie',
}, {
    title: '清空数据',
    name: 'storage_clear',
    disabled: false,
    extra: '危险操作,慎重啊',
    icon: 'md-trash',
}, {
    title: '意见反馈',
    name: 'feedback',
    disabled: false,
    extra: '吐个槽啥的',
    to: 'https://shimo.im/forms/YPGpC9hV6hvXyKpK/fill',
    target: "_blank",
    icon: 'md-text',
}, {
    title: '关于',
    name: 'about',
    disabled: false,
    extra: package_json.version,
    icon: 'md-information-circle',
    to: '/about'
}];

settings.getDataByName = function(name) {
    return settings.find(item => {
        return item.name == name;
    })
}
export default settings;
