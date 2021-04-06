const App = {
    data() {
        return {
            list: [],
        }
    },
    methods: {
        getList() {
            fetch('/api/', { method: 'GET' })
            .then(data => data.json())
            .then(data => {
                if(data.result) {
                    this.list = data.list
                }
                else {
                    console.log('error get list');
                }
            })
        },

        createDigit() {
            const digitAdd = this.getRandom();
            fetch(`/api/${digitAdd}/`, { method: 'POST' })
            .then(data => data.json())
            .then(data => {
                if(data.result) {
                    this.list.push(digitAdd)
                }
                else {
                    console.log('error add digit');
                }
            })
        },

        deleteDigit() {
            fetch('/api/', { method: 'DELETE' })
            .then(data => data.json())
            .then(data => {
                if(data.result) {
                    this.list.pop();
                }
                else {
                    console.log('error del digit');
                }
            })
        },

        changeDigit() {
            const digitAdd = this.getRandom();
            fetch(`/api/${digitAdd}/`, { method: 'PUT' })
            .then(data => data.json())
            .then(data => {
                this.list.pop();
                this.list.push(digitAdd)
            })
        },

        getRandom() {
            return Math.floor(Math.random() * 9);
        }
    }
}

Vue.createApp(App).mount(`#app`);