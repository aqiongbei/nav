<template>
    <div class="settings-wrapper">
        <CellGroup @on-click="cellAction">
            <Cell
                v-for="item of settings"
                :title="item.title"
                :name="item.name"
                :disabled="item.disabled"
                :extra="item.extra"
                :to="item.to">
                <Icon :type="item.icon" slot="icon" size="18"/>
                <iSwitch v-if="item.value != undefined" v-model="item.value" size="large" false-color="#13ce66" slot="extra">
                    <span slot="open">合并</span>
                    <span slot="close">覆盖</span>
                </iSwitch>
            </Cell>
        </CellGroup>
        <Switch :value="true"/>
        <a ref="download" download="nav_data.json" style="display: none;"></a>
        <input ref="file_input" type="file" @change="fileReady" accept=".json" style="display: none;">
    </div>
</template>
<script>
import settings from '@/config/settings'

export default {
    name: 'Home',
    components: {
    },
    data () {
        return {
            settings,
            file: {},
        }
    },
    methods: {
        cellAction (name) {
            switch (name) {
                case 'export':
                    this.download(this.$links.export());
                    break;
                case 'import':
                    this.$refs.file_input.click();
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
                merge: this.settings[3].value
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