<template>
    <div class="settings-wrapper">
        <CellGroup @on-click="cellAction">
            <Cell
                v-for="item of settings"
                :title="item.title"
                :name="item.name"
                :disabled="item.disabled"
                :extra="item.extra"
                :to="item.to"
                :target="item.target">
                <Icon :type="item.icon" slot="icon" size="18"/>
                <iSwitch
                    v-if="item.type == 'i_switch'"
                    v-model="item.value"
                    size="large"
                    :true-color="item.options.true.color"
                    :false-color="item.options.false.color"
                    slot="extra">
                    <span slot="open">{{item.options.true.label}}</span>
                    <span slot="close">{{item.options.false.label}}</span>
                </iSwitch>
            </Cell>
        </CellGroup>
        <a ref="download" download="nav_data.json" style="display: none;"></a>
        <input ref="file_input" type="file" @change="fileReady" accept=".json" style="display: none;">
    </div>
</template>
<script>
import settings from '@/config/settings'

export default {
    name: 'Home',
    data () {
        return {
            settings,
            file: {},
        }
    },
    methods: {
        cellAction (name) {
            this.$utils.report('点击', '设置项', settings.getDataByName(name).title);
            switch (name) {
                case 'export':
                    this.download(this.$links.export());
                    break;
                case 'import':
                    this.$refs.file_input.click();
                    break;
                case 'full_screen':
                    if (settings.getDataByName(name).value) {
                        this.$utils.fullScreen();
                    } else {
                        this.$utils.exitFullscreen();
                    }
                    break;
                case 'storage_clear':
                    localStorage.clear();
                    this.$Message.success('数据清空成功!');
                    break;
            }
        },
        download (data) {
            let blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
            let download_url = URL.createObjectURL(blob);
            this.$refs.download.href = download_url;
            this.$refs.download.click();
            setTimeout(() => {
                URL.revokeObjectURL(download_url);
                this.$refs.download.href = '';
            }, 30)
        },
        fileReady (s) {
            let option = {
                merge: settings.getDataByName('merge').value
            };
            let reader = new FileReader();
            reader.onload = () => {
                try {
                    this.$links.import(JSON.parse(reader.result), option);
                    this.$Message.success('导入成功!');
                } catch (e) {
                    this.$Message.error({
                        content: `导入失败!:${e}`,
                        duration: 3
                    });
                }
                this.$refs.file_input.value = '';
            }
            let file = this.$refs.file_input.files[0];
            if (file) {
                if (file.type != 'application/json') {
                    this.$Message.warning({
                        content: `别骗我,你这可不是.json文件哦${file.type}`,
                        duration: 3
                    });
                    this.$refs.file_input.value = '';
                } else {
                    reader.readAsText(file);
                }
            }
        }
    }
}
</script>
<style lang="less">
.settings-wrapper {
}
</style>