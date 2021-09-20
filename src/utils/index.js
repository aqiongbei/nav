const LINK_IDS = 'link_ids';

function generateLinkID() {
    let rnd = parseInt(Math.random(0, 10000) * 100000);;
    return `user_link-${+new Date()}-${rnd}`;
}

function getStorageItem(key) {
    if (localStorage[key]) {
        return JSON.parse(localStorage[key]);
    } else {
        return undefined;
    }
}

function setStorageItem(key, value) {
    localStorage[key] = JSON.stringify(value);
}

const _links = {
    find() {
        let link_ids = getStorageItem(LINK_IDS) || [];
        let ret = [];
        let new_link_ids = link_ids.filter(id => {
            let link = this.findOne(id);
            if (link) {
                ret.push(link);
            }
            return link;
        });
        // 有的项被删除的情况
        if (new_link_ids.length !== link_ids.length) {
            setStorageItem(LINK_IDS, new_link_ids);
        }
        return ret;
    },
    findOne(id) {
        return getStorageItem(id);
    },
    insert(item = []) {
        item.map(i => {
            insertOne(i);
        })
    },
    insertOne(data) {
        data.id = data.id || generateLinkID();
        let link_ids = getStorageItem(LINK_IDS) || [];
        if (!link_ids.includes(data.id)) {
            link_ids.push(data.id);
            setStorageItem(LINK_IDS, link_ids);
        }
        setStorageItem(data.id, data);
    },
    update(item = {}) {
        setStorageItem(item.id, item);
    },
    remove(id) {
        delete localStorage[id];
    },
    export () {
        return {
            links: this.find(),
            link_ids: getStorageItem(LINK_IDS)
        };
    },
    import(data, opt) {
        let saved_link_ids = getStorageItem(LINK_IDS) || [];
        data.links.map(item => {
            if (saved_link_ids.includes(item.id)) {
                let savedData = this.findOne(item.id);
                // 导入数据重复的时候处理逻辑 合并还是覆盖
                if (item.name !== savedData.name || item.link !== savedData.link) {
                    if (opt.merge) {
                        delete item.id;
                    }
                    this.insertOne(item);
                }
            } else {
                this.insertOne(item);
            }
        });
    }
};

const _utils = {
    report(action, category, label) {
        window.gtag && window.gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
};

function utils(vue) {
    if (vue) {
        vue.prototype.$links = _links;
        vue.prototype.$utils = _utils;
    } else {
        return _utils;
    }
}

export default utils
