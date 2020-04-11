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
        <a :href="download_url" ref="download" download="nav_data.json" style="display: none;"></a>
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
            download_url: '',
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
            this.download_url = URL.createObjectURL(blob);
            this.$refs.download.click();
            setTimeout(() => {
                URL.revokeObjectURL(this.download_url);
                this.download_url = '';
            })
        },
        fileReady (s) {
            let option = {
                merge: this.settings[3].value
            };
            console.log(s, option);
            let reader = new FileReader();
            reader.onload = () => {
                this.$links.import(JSON.parse(reader.result), option);
            }
            reader.readAsText(this.$refs.file_input.files[0]);
        }
    }
}
</script>
<style lang="less">
.settings-wrapper {
}
</style>