
const app = new Vue({
    el: '#app',
    data: {
        title: 'Nestjs Websockets Chat',
        name: '',
        text: '',
        image: '',
        messages: [],
        counter: 0,
        socket: null
    },
    methods: {
        sendMessage() {
            if(this.validateInput()) {
                const message = {
                    name: this.name,
                    text: this.text,
                    image: this.image,
                }
                this.socket.emit('msgToServer', message)
                this.text = ''
            }
        },
        receivedMessage(message) {
            this.messages.push(message);
            let messageJson = JSON.stringify(message);
            localStorage.setItem(this.counter, messageJson);
            this.counter++;

            /*document.querySelector('.card-block').setAttribute('style', 'display: block;');
            const buildNewMessage = (message) => {
                const li = document.createElement("li");
                li.appendChild(message);
                return li;
            }
            document.appendChild(buildNewMessage(message));*/
        },
        getMessagesFromStorage() {
            this.counter = localStorage.length;
            for (let i = 0; i < this.counter; i++) {
                let messageJson = localStorage.getItem(String(i));
                this.messages.push(JSON.parse(messageJson));
            }
        },
        validateInput() {
            return this.name.length > 0 && this.text.length > 0
        },
        addName(name) {
            this.name = name;
        },
        addImage(image) {
            this.image = image;
        }

    },
    created() {
        this.getMessagesFromStorage()
        this.socket = io('http://localhost:12345')
        this.socket.on('msgToClient', (message) => {
            this.receivedMessage(message)
        })
    }
})


