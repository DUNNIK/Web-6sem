
const editApp = new Vue({
    el: '#editApp',
    data: {
        id: '',
        portfolioImage: File
    },
    methods: {
        async updateImage() {
            try {
                let formData = new FormData();
                formData.append('file', this.portfolioImage[0])
                formData.append('id', this.id)
                const message = {
                    id: this.id,
                    portfolioImage: formData,
                }
                const response = await fetch('http://localhost:12345/portfolio/changeImage', {
                    method: 'Post',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(message)
                });
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                console.log(response);
            } catch (err) {
                console.log(err);
            }
        },
        addPortfolioId(id) {
            this.id = id;
        }
    },
})
