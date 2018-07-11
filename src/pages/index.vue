<template>
  <div>
       <Row type="flex" justify="center" align="middle" class="code-row-bg allcenter">   
          <Col span="16" class="asset_main">  
                <Row type="flex" justify="center" align="middle" class="code-row-bg">
                    <Col span='24' class="mian_tit"><p><i><img src="../assets/img/gantan.png" style=" vertical-align: middle"></i> 不同币种对应相应的收币地址,请选择对应的收币地址收币</p></Col>
                    <Col span='24'>
                    <Row type="flex" justify="center" align="middle" class="code-row-bg" style="margin-top:30px">
                        <Col span='12'>
                                <label style='color:#FFF'>收币地址 &nbsp;&nbsp;&nbsp;</label>
                                <Select v-model="coinitem"  style="width:350px" size='large' @on-change="adrshow">
                                <Option v-for="(index,item) in coinadress" :value="item">{{index.unit}}</Option>                    
                            </Select>
                            
                        </Col>
                    </Row>  
                        <Row type="flex" justify="center" align="middle" class="code-row-bg" >
                        <Col span='4' style="height:160px;width:160px;border:1px solid #ccc;margin-top:15px">
                                <Row type="flex" justify="center" align="middle" class="code-row-bg" >
                                    <Col span='20' style="height:140px;width:140px;border:1px solid #ccc;margin:10px;background:#fff">
                                        <a id="showQRcode" class="link-qrcode" href="javascript:;"> 
                                            <div      class="show-qrcode">
                                            <qriously :value="adress" :size="qrcode.size" />
                                            </div>
                                        </a>
                                    </Col>
                                </Row>
                        </Col>
                    </Row>   
                        <Row type="flex" justify="center" align="middle" class="code-row-bg txt-center" >
                        <Col span='12' style="height:20px;margin-top:25px;color:#fff">
                            {{adress}} &nbsp;&nbsp; <img src="../assets/img/copy.png"  v-clipboard:copy="adress"
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError">            
                        </Col>
                    </Row> 
                    </Col>
                </Row> 
          </Col>
      </Row>
      
      <Row type="flex" justify="center" align="middle" class="code-row-bg">   
          <Col span="20">
                <Row type="flex" justify="start" align="middle" class="code-row-bg coinheight" style="padding: 20px">
                    <Col span='11' offset='1' v-for=" (index,item) in coinadress" style="margin-top:10px">
                       <Card :bordered="false" style="background:#f1f1f1">                  
                                        <Row style="height:45px;line-height:45px">
                                            <Col span="4"  > 
                                               <div :class="index.unit">&nbsp;</div>
                                            </Col>  
                                            <Col span="3">{{index.unit}}</Col> 
                                            <Col span="10" offset="7" style="text-align:right;line-height:22px">{{index.balance}} <br><span style="color:#999;font-size:14px"> ≈ {{index.balance * index.cnyRate | savetow }} CNY</span> </Col>                 
                                      </Row>
                        </Card>
                    </Col>     
               </Row> 
          </Col>
      </Row>
  </div>
</template>
<style scoped>

.txt-center{ text-align: center}
.allcenter{ margin-bottom: 20px; background:url(../assets/img/banner.png)center center; background-size:cover;overflow: hidden}
.coinheight{height: auto; }
.asset_main{height:350px ; text-align:left;padding-top:10px}
.mian_tit{ text-align: left; height: 30px; line-height: 30px;color:#fff}
.cimg img{vertical-align: middle; width:32px; height:32px}
.coindatail{ background:#f8f8f8;margin-top:8px;padding:8px;font-size:18px;border-radius:3px;-moz-box-shadow:0px 0px 3px #333333; -webkit-box-shadow:0px 0px 3px #333333; box-shadow:0px 0px 3px #333333;}

</style>
<script>
import Vue from 'vue'
import VueQriously from 'vue-qriously'
Vue.use(VueQriously);
    export default{
   components: {
        VueQriously
          },
          data(){
               return{
                    coinadress:[
                        // {unit:'BTC',balance:'0',cnyRate:'0'},
                        // {unit:'BCH',balance:'0',cnyRate:'0'},
                        // {unit:'ETH',balance:'0',cnyRate:'0'}
                    ],   
                    cointype:'',      
                    user:{
                        username:'',
                        status:''
                    },
                    qrcode:{
                        size: 140,
                    }
                ,
                coinitem: '',
                adress:''
               }
          },
        
          
          methods:{
               onCopy: function (e){
                this.$Message.success('复制成功 ' + ' '+e.text);
                },
               onError: function (e) {
               alert('Failed to copy texts')
                                    },

              adrshow(){
           
                  this.adress=this.coinadress[this.coinitem].unit+':'+this.coinadress[this.coinitem].address;

                 },                   
              getcoinadress(){
                        this.$http.post(this.host+'/uc/asset/wallet').then(res=>{
                            if(res.body.code=='0'){
                               
                                let arr=res.body.data;     
                                let arr4=[...arr];
                                let newarr=arr4.map((val,item)=>{
                                    //没啥用;../assets/img/${val.unit}.png 会再次解析数据;
                                    let obj={};
                                    obj.address=`${val.address}`;
                                    obj.unit=`${val.unit}`;
                                    obj.balance=`${val.balance}`;
                                    obj.cnyRate=`${val.cnyRate}`;
                                    obj.frozenBalance=`${val.frozenBalance}`;
                                    obj.usdRate=`${val.usdRate}`;
                                    obj.imgpath=`../assets/img/${val.unit}.png`;                      
                                        return obj
                                })
                                console.log(newarr);
                              this.coinadress=newarr;
                            }
                            else{
                             
                            }
                                    })
                   } ,
                init() {     
                  if (localStorage.MEMBER == 'null') {   
                      this.$Message.error('请先登录') ;
                    }
           }            
          },
           filters: {
                totow:function(val){
                    let paval=Number(val);
                     return paval.toFixed(2);
                },
                 tonum:function(val){
                    let paval=Number(val);
                     return paval.toFixed(6);
                },  
                savetow:function(val){
                  let numbe=Number(val);
                  return numbe.toFixed(2)
                  }
           },
          created(){
             this.getcoinadress();
              this.init();  
          }
    }
</script>

