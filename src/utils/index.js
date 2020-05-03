const default_id = "link_500";

function getID() {
    let id = default_id;
    if (localStorage.last_id) {
        id = localStorage.last_id.split('_')[1];
        id = `link_${++id}`;
    }
    setLastId(id);
    return id;
}

function isLargeThenLastId (id) {
    let current_last_id = localStorage.last_id || default_id;
    let current_id_number = Number(current_last_id.split('_')[1]);
    let new_id_number = Number(id.split('_')[1]);
    return new_id_number > current_id_number;
}

function setLastId (id) {
    if (!localStorage.last_id || isLargeThenLastId(id)) {
        localStorage.last_id = id;
    }
};

function getStorageItem(key, default_value = {}) {
    let ret = default_value;
    try {
        ret = JSON.parse(localStorage[key]);
    } catch (e) {

    }
    return ret;
}

function setStorageItem(key, value) {
    localStorage[key] = JSON.stringify(value);
}

const links = {
    get(type) {
        let link_id_list = getStorageItem('link_id_list', []);
        if (type == 'export') {
            let ret = {};
            link_id_list.map(id => {
                ret[id] = getStorageItem(id);
            })
            return ret;
        } else {
            let ret = [];
            link_id_list.map(id => {
                ret.push(getStorageItem(id));
            })
            return ret;
        }
    },
    insert(item = []) {
        item.map(i => {
            i.id = i.id || getID();
            let link_id_list = getStorageItem('link_id_list', []);
            if (!link_id_list.includes(i.id)) {
                link_id_list.push(i.id);
                setStorageItem('link_id_list', link_id_list);
            }
            setLastId(i.id);
            setStorageItem(i.id, i);
        })
    },
    update(item = {}) {
        setStorageItem(item.id, item);
    },
    remove(id) {
        delete localStorage[id];
        let link_id_list = getStorageItem('link_id_list', []);
        link_id_list = link_id_list.filter(_id => {
            return id != _id;
        })
        setStorageItem('link_id_list', link_id_list);
    },
    export() {
        return {
            links: this.get('export'),
            link_id_list: getStorageItem('link_id_list', []),
            last_id: localStorage.last_id
        };
    },
    import(data, opt) {
        let current_data = this.export();
        data.link_id_list.map(id => {
            if (current_data.link_id_list.includes(id)) {
                // 导入数据重复的时候处理逻辑 合并还是覆盖
                if (data.links[id].name == current_data.links[id].name && data.links[id].link == current_data.links[id].link) {
                    // skip this data
                } else {
                    let link = data.links[id];
                    if (opt.merge) {
                        delete link.id;
                    }
                }
            } else {
                let link = data.links[id];
                this.insert([data.links[id]]);
            }
        })
    }
};

function utils(vue) {
    vue.prototype.$links = links;
}

export default utils