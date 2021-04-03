const Translator = {
    data() {
        return {
            text: '',
            translated: ''
        }
    },
    methods: {
        translate() {
            return fetch(`/api/?in=${ this.text }`)
            .then(data => data.json())
            .then(data => {
                this.translated = data.text
            })
        }
    }
}

Vue.createApp(Translator).mount(`#app`);