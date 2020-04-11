function getID() {
    let id = 'link_500';
    if (localStorage.last_id) {
        id = localStorage.last_id.split('_')[1];
        id = `link_${++id}`;
    }
    return id;
}

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
    get() {
        let link_id_list = getStorageItem('link_id_list', []);
        let ret = [];
        link_id_list.map(id => {
            ret.push(getStorageItem(id));
        })
        return ret;
    },
    insert(item = []) {
        item.map(i => {
            i.id = getID();
            let link_id_list = getStorageItem('link_id_list', []);
            link_id_list.push(i.id);
            setStorageItem('link_id_list', link_id_list);
            localStorage.last_id = i.id;
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
            links: this.get(),
            link_id_list: getStorageItem('link_id_list', []),
            last_id: localStorage.last_id
        };
    },
    import(data, opt) {
        let current_data = this.export();
        console.log(data, current_data);
        data.link_id_list.map(id => {
            if (current_data.link_id_list.includes(id)) {
                // if (opt.merge)
            }
        })
    }
};

function utils(vue) {
    vue.prototype.$links = links;
}

export default utils