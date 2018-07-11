<template>
  <div>
      <Row type="flex" justify="start" class="code-row-bg">
              <Col span="11" offset='1' class='coindatail' v-for=" (index,item) in coinadress" >
                   <Row style="height:42px;line-height:42px">
                        <Col span="4"  > 
                            <div :class="index.unit">&nbsp;</div>
                        </Col> 
                     <Col span="3">{{index.unit}}</Col> 
                     <Col span="10" offset="7" style="text-align:right;line-height:22px">{{index.balance}} <br><span style="color:#999;font-size:14px"> ≈ {{index.balance * index.cnyRate | savetow}} CNY</span> </Col>     
                  </Row> 
             </Col>     
     </Row>
  </div>
</template>
<style>
.cimg img{vertical-align: middle; width:32px; height:32px}
.coindatail{ background:#f8f8f8;margin-top:8px;padding:8px;font-size:18px;border-radius:3px;-moz-box-shadow:0px 0px 3px #333333; -webkit-box-shadow:0px 0px 3px #333333; box-shadow:0px 0px 3px #333333;}
</style>

<script>
    export default{
         data(){
             return{
                 path:'../assets/img/',
                 coinadress:[] 
             }
         },
         filters: {
             savetow:function(val){
                  let numbe=Number(val);
                  return numbe.toFixed(2)
             }
         },
         methods:{
               getcoinadress(){
                        this.$http.post(this.host+'/uc/asset/wallet').then(res=>{
                            if(res.body.code=='0'){
                               let arr=res.body.data;
                                this.coinadress=arr;
                                console.log(arr)
                                }
                            else{
                                this.coinadress=[] 
                            }
                                    })
                   }   
         },
         created(){
             this.getcoinadress()
         }
    }

</script>
