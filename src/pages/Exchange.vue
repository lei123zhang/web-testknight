<template>
<!-- 兑换币种显示 完善...  兑换比例需要数据测试 刷新-->
   <div style="background:#f9f8f9">
       <Row type="flex" justify="center" class="code-row-bg" style="padding-top:5px">
        <Col span="15" style="background:#fff;padding:10px 10px">
          
            <Form :model="formItem" :label-width="80">
                <Row style="padding-top:20px">
                    <Col span='23' offset='1' style="padding-bottom:20px">
                         <Row  type="flex" justify="start" class="code-row-bg">                 
                             <Select v-model="moneytype" style="width:200px" @on-change="inputdis(moneytype)">
                                <Option value="0" label="市价"></Option>
                                <Option value="1" label="限价"></Option>
                            </Select>
                            <!-- {{moneytype}} -->
                        </Row>
                     </Col>
                     <Col span='11'>
                         <Row>                 
                            <FormItem label="兑 换">
                                 <Input v-model="formItem.select" readonly ></Input>
                            </FormItem>
                        </Row>
                     </Col>
                     <Col span='12' offset="1">
                         <Row>
                            <FormItem label="接 收">
                                   <Select v-model="formItem.setconin" @on-change="feereduce">
                                        <Option v-for="(index,item) in unitsup" :value="item" >{{ index.coinSymbol }}</Option>
                                    </Select>
                                   <!-- {{formItem.setconin}}  -->
                             </FormItem>
                        </Row>
                     </Col>
                </Row>
                 <Row style="padding-top:15px">
                     <Col span='11'>
                         <Row>                 
                            <FormItem label="数 量">
                               
                                <Input v-model="formItem.amount" @on-keyup="showfour($event)">
                                   <span slot="append">BTC</span>
                                </Input>
                            </FormItem>
                        </Row>
                     </Col>
                     <Col span="4" style="  text-align: center;"> 
                      <Row type="flex" justify="center" class="code-row-bg">
                          <Col span="24">
                               <img src="../assets/img/duihuan.png"> 
                          </Col>
                      </Row>
                   </Col>
                     <Col span='9'>                                
                               <span v-if="this.moneytype=='0'"> <Input v-model="fee" :disabled='typedis'></Input></span> 
                               <span v-else><Input v-model="formItem.moneyfee" @on-keyup="showfour($event)"></Input> </span> 
                     </Col>
                </Row>
                 <Row type="flex" justify="start" class="code-row-bg">
                        <Col span="10">
                           <FormItem label="手 续 费">
                              <Input v-model="formItem.jyfee" readonly></Input>
                          </FormItem>
                        </Col>
                 </Row>  
                   <Row type="flex" justify="center" class="code-row-bg" style="padding-bottom:10px">
                        <Col span="23">
                           <p><i><img src="../assets/img/gantan2.png" style=" vertical-align: middle"></i> 不同币种对应相应的收币地址,请选择对应的收币地址收币.</p>
                        </Col>
                 </Row>  
                  <Row type="flex" justify="center" class="code-row-bg">
                        <Col span="10">
                           <FormItem>
                             <Button type="primary" @click="handleSubmit()" long>提交</Button>  
                          </FormItem>
                        </Col>
                 </Row>    
            </Form>
            <Row style="height:20px;background:#f9f8f8"></Row>
            <Row style="height:40px;line-height:40px;text-align:left"> <span style='font-size:30px;color:#2688d2'>|</span> 交易记录</Row>
            <Row style="padding-top:20px">
                <Col span="24">
                   <Table  :columns="columns" :data="zhuanzhangdata"></Table>
                </Col>
                <Col span="24" style='margin-top:20px'>
                   <Page :total="recoedlength"  :current="current" @on-change="changePage"></Page>
                </Col>
            </Row>
        </Col>
        <Col span="8" style="margin-left:15px;background:#fff">
          <Row style="height:40px;line-height:40px;text-align:left"> <span style='font-size:30px;color:#2688d2'>|</span> 账户余额</Row>
          <Row type="flex" justify="center" class="code-row-bg">
              <Col span="22" class='coindatail' v-for=" (index,item) in coinadress" >
                   <Row style="height:45px;line-height:45px">
                      <Col span="4"  > 
                        <div :class="index.unit">&nbsp;</div>
                    </Col>
                     <Col span="3">{{index.unit}}</Col> 
                     <Col span="10" offset="7" style="text-align:right;line-height:22px">{{index.balance}} <br><span style="color:#999;font-size:14px"> ≈ {{index.balance * index.cnyRate | savetow}} CNY</span> </Col>     
                  </Row> 
              </Col>
              
     </Row>
        </Col>
      </Row>
        <Modal
        v-model="modalex"
        title="请输入交易密码"
        @on-ok="okexchange"
       >
        <Input v-model="formItem.jypsaa"  type="password" placeholder="请输入资金密码" ></Input>
    </Modal>
   </div>
</template>
<style scoped>
.ivu-form-item-content{margin-left: 0px !important;  
    position: relative;
    line-height: 32px;
    font-size: 12px;}
.cimg img{vertical-align: middle; width:32px; height:32px}
.coindatail{ background:#f8f8f8;margin-top:8px;padding:8px;font-size:18px;border-radius:3px;-moz-box-shadow:0px 0px 3px #333333; -webkit-box-shadow:0px 0px 3px #333333; box-shadow:0px 0px 3px #333333;}
</style>
<script>

    export default{
         data(){
              return{
                 current:1,
                   coinadress:[],
                   step:0.01,
                   max:1,
                   moneytype:'0',
                   typedis:true,
                   modalex:false,
                   recoedlength:1,
                   formItem: {
                        select:'BTC',
                        setconin:0,
                        amount:'',
                        jyfee:'0.1%',
                        moneyfee:'',
                        jypsaa:''
                      },
                    proportion:'',
                    unitsup:[
                        {coinScale:'1',fee:'0.01%'}
                    ],
                    coins:[],
                    setconin:'',  
                   columns: [
                    {
                        title: '兑换金额BTC',
                        key: 'amount'
                    },
                    {
                        title: '交易数量',
                        key: 'tradedAmount'
                    },
                    {
                        title: '手续费',
                        key: 'fee'
                    },
                    
                    {
                        title: '时间',
                        key: 'time'
                    },
                    {
                        title: '币种对',
                        key: 'symbol',
                        width:100
                        
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width:100,
                        render: (h, params) => {
                            const row=params.row;
                            let status=row.status;
                                if(status=='OVERTIMED'){
                                    return  status=row.status='超时'
                                                }
                                    else if(status=='TRADING'){
                                        return    status=row.status='交易中'
                                        }
                                    else if(status=='CANCELED'){
                                        return    status=row.status='交易取消'
                                        }
                                    else if(status=='COMPLETED'){
                                        return   status=row.status='全部成交'
                                        }
                                    else if(status=='APPLIED'){
                                        return   status=row.status='已申请'
                                        }
                                    else if(status=='PARTIAL_CANCELED'){
                                        return   status=row.status='部分成交'
                                                }     
                                return h('span', {
                                },status);
                            }
                                }
                  ],
                  zhuanzhangdata: []
              }
         },  
          filters: {
             savetow:function(val){
                  let numbe=Number(val);
                  return numbe.toFixed(2)
             }
         },
           computed: {
                'fee': function() {    
                 if(this.moneytype=='0'){
                      if(this.formItem.setconin!=null){    
                        return parseFloat(this.formItem.amount*this.proportion).toFixed(this.unitsup[this.formItem.setconin].coinScale)
                        } 
                        else{
                            return '0'
                        }
                     }
                     else{
                       return '0.01'  
                     }
                 }
                       },
         methods:{
              handleSubmit(){    
                   this.modalex=true;
              
                                 
              },
              changePage(page){
                  let munpage=Number(page)-1;
                  this.excahngerecord(munpage);
              },
              showfour(ev){
                          var re1 = new RegExp("\([0-9]+\.[0-9]{"+this.unitsup[this.formItem.setconin].baseCoinScale+"})[0-9]*","");
                          this.formItem.amount=this.formItem.amount.toString().replace(re1,'$1'); 
                          this.formItem.moneyfee=this.formItem.moneyfee.toString().replace(re1,'$1'); 
              },
              okexchange(){
                        if(this.moneytype=='0'){
                            //市价
                            var _data={
                            type:'MARKET_PRICE',
                            symbol:this.unitsup[this.formItem.setconin].symbol,
                            price:0,
                            amount:this.formItem.amount,
                            jyPassword:this.formItem.jypsaa
                            }
                        }
                        else{
                            var _data={
                            type:'LIMIT_PRICE',
                            symbol:this.unitsup[this.formItem.setconin].symbol,
                            price:parseFloat((this.formItem.amount)/(this.formItem.moneyfee)).toFixed(6),
                            amount:this.formItem.amount,
                            jyPassword:this.formItem.jypsaa
                            }
                        }
                        this.$http.post(this.host+'/exchange/order/add',_data).then(res=>{
                         //    console.log(res)
                             if(res.body.code=='0'){
                                 this.$Message.success(res.body.message);
                                 this.formItem.jypsaa='';
                                  this.supcoin();
                                  this.feereduce();
                                  this.wallet();
                                  this.excahngerecord(0);  
                                //  var that=this;
                                //  setInterval(()=>{
                                //       this.$router.push({name:'exchange'});       
                                //  },500)
                                 //刷新交易记录;
                             }
                             else{
                                   this.$Message.error(res.body.message);
                             }
                        })
              },
              feereduce(){
                  this.$http.post(this.host+'/uc/asset/wallet').then(res=>{
                       this.formItem.jyfee=this.unitsup[this.formItem.setconin].fee;
           
                        if(res.body.code=='0'){  
                            let btcprice=res.body.data[0].cnyRate;
                            let mun=Number(this.formItem.setconin)+1;
                           this.proportion=parseFloat(btcprice/(res.body.data[mun].cnyRate));
                         }
                                })
              },
              inputdis(e){
                    if(e=='0'){
                        this.typedis=true;
                    }
                    else{
                        this.typedis=false; 
                    }
              }, 
              supcoin(){
                     this.$http.post(this.host+'/exchange/order/support').then(res=>{
                        if(res.body.code=='0'){
                            this.unitsup=res.body.data;
                           if(this.unitsup[this.formItem.setconin].coinScale==undefined){
                               this.unitsup[this.formItem.setconin].coinScale=4;
                           }
                        }
                        })
                    }, 
              wallet(){
                    this.$http.post(this.host+'/uc/asset/wallet').then(res=>{
                        if(res.body.code=='0'){  
                            this.coins=res.body.data;    
                              let arr=res.body.data;
                                 this.coinadress=arr;
                           let btcprice=res.body.data[0].cnyRate;
                           this.proportion=parseFloat(btcprice/(res.body.data[1].cnyRate)); 
                         }
                                })
                   } ,
             excahngerecord(a){
                      this.$http.post(this.host+'/exchange/order/record',{pageNo:a,pageSize:'10'}).then(res=>{     
                              this.zhuanzhangdata=res.body.content;
                                console.log(this.zhuanzhangdata)
                                this.recoedlength=res.body.totalElements;
                      
                         })
                }   
         },
         
         created(){
            this.supcoin();
            this.wallet();
            this.excahngerecord(0);       
         }
    }
</script>


