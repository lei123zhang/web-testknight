<template>
    <div>
        <Row type="flex" justify="center" class="code-row-bg">
            <Col span="20">
               <Row type="flex" justify="center" class="code-row-bg notice">
                    <ul>
                        <li v-for="index in list">
                            <router-link :to="{path:'/notice_detail',query:{name:index.id}}" >
                               {{index.title}} <span style='float:right;color:#959595'>{{index.time}}</span>
                            </router-link> 
                        </li>
                    </ul>
                </Row>
            </Col>
            <Col span="20">
               <Row type="flex" justify="center" class="code-row-bg pages">
                  <Page :total="noticelength" @on-change="changepage" :current="current"></Page>
                </Row>
            </Col>
        </Row>
    </div>
</template>
<style>
ul li{ list-style: none;}
.notice{margin-top: 20px;background:#f8f8f8;padding-bottom: 2px;min-height:500px }
.notice ul {width: 100%}
.notice ul li{ padding:12px 20px; border-bottom: 1px dashed #ccc;text-align: left;font-size: 15px}
.notice ul li a{ color:#000}
.pages{ padding: 10px 20px}
</style>
<script>
    export default{
         data(){
             return{
                   noticelength:11,
                   current:1,
                   list:[{title:'测试文字1',time:'2018-4-5',id:'1'},{title:'测试文字2',time:'2018-4-3',id:'2'}]  
             }
         },
       methods:{
            getnotice(){
                 //
            }  ,
            changepage(e){
                 
            }
       },
       created(){
            this.getnotice();
       }
    }
</script>

