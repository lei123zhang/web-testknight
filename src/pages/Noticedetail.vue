<template>
    <div class="noticedatal">
         <Row type="flex" justify="center" class="code-row-bg noticetitle">
                <!-- <Col span="4"><Button type="success">上一篇</Button></Col> -->
                <Col span="10" v-html="title" class="titlenotice"></Col>  
                <!-- <Col span="4"><Button type="success">下一篇</Button></Col> -->
                <Col span="20" v-html="content" class="noticecontent"></Col>
        </Row>
         
    </div>
</template>
<style>
.noticedatal{ padding: 10px 20px;background:#f8f8f8;min-height: 600px}
.noticetitle{ text-align: center;height: auto;}
.titlenotice{ font-size: 15px;color:#000;padding: 10px 20px}
.noticecontent{ text-align: left;font-size: 14px;line-height: 1.5;word-wrap: break-word;}
</style>
<script>
  export default{
       data(){
            return{
                title:'ssdss',
                content:'sadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsasadadsa'
            }
       },
       methods:{
           getinfo(id){
                this.$http.post(this.host+''+id).then(res=>{
                     //....
                })
           }
       },
       created(){
         let noticeid=this.$route.query.name;
         // this.getinfo(noticeid);
         console.log(this.$route.query.name)
    
       }
  }
</script>
