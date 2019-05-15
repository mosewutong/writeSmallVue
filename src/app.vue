<template>
    <div class="a">
        {{message}}
    </div>
</template>

<script>
import util from "./util.js"
export default {
    data(){
        return{
            message:"123456"
        }
    },
    methods:{
        async fetchData() {
            console.log('app页面')
            const data = await util.getData();
            this.message = data;
        }
    },
    mounted(){
        console.log("mounted456");
        this.fetchData();
    }
}
</script>

<style lang="less" scoped>
.a{
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
