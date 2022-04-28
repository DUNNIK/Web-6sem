
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
            this.counter++;

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
        },
        addMessages(messages) {
            if (messages){
                let allMessages = [];
                for (let i = 0; i < messages.length; i++) {
                    allMessages.push(messages[i]);
                }
                this.messages = allMessages;
            }
        },
        getHistory() {
            this.socket.on('msgHistory', (messages) => {
                this.addMessages(messages)
            })
            this.socket.emit('msgHistory')
        }

    },
    created() {
        this.socket = io('http://localhost:12345')
        this.socket.on('msgToClient', (message) => {
            this.receivedMessage(message)
        })
        this.getHistory();
    }
})


