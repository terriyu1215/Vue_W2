import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';
  
createApp({
    data() {
      return {
        apiUrl: 'https://vue3-course-api.hexschool.io/v2',// 加入站點
        apiPath: 'yuyutest',// 個人 API Path
        products: [],
        temp: {}
      }
    },
    methods: {
        checkAdmin() {
            const URL = `${this.apiUrl}/api/user/check`;

            axios.post(URL)
            .then(() => {
                this.getData();
            })
            .catch((error) => {
                alert(error.data.message);
                window.location='login.html';
            })
        },

        getData(){
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;//注意s
            axios.get(url)
            .then((res) => {
                this.products = res.data.products;
            })
            .catch((error) => {
                alert(error.data.message);
            })
        },

        viewDetail(item){
            this.temp = item;
          }

    },

    mounted() {
        //取出Token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common.Authorization = token;

        this.checkAdmin();
    }
}).mount('#app');
