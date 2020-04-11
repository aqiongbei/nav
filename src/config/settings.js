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
    value: true
}, {
    title: '导入数据',
    name: 'import',
    disabled: false,
    extra: 'json文件',
    icon: 'md-cloud-upload',
}, {
    title: '关于',
    name: 'about',
    disabled: false,
    extra: 'v1.0.1',
    icon: 'md-information-circle',
    to: '/about'
}];

export default settings;
