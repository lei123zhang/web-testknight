
<template>
   <div style="background:#f9f8f9">
       <Row type="flex" justify="center" class="code-row-bg" style="padding-top:25px">
        <Col span="15" style="background:#fff;padding:10px 10px">
            <Form :model="formItem" :label-width="80">
                <Row style="padding-top:15px">
                     <Col span='11'>
                         <Row>                 
                            <FormItem label="币 种">
                                <Select v-model="formItem.select" @on-change="feechange(formItem.select)">
                                     <Option v-for="(index,item) in coindata" :value="item" :key="index.unit">{{index.unit}}</Option>                      
                                </Select>
                               <!-- {{formItem.select}} -->
                          </FormItem>
                        </Row>
                     </Col>
                     <Col span='12' offset="1">
                         <Row>
                            <FormItem label="转账地址">
                                    <Input v-model="formItem.adr"  ></Input>
                            </FormItem>
                        </Row>
                     </Col>
                </Row>
                 <Row style="padding-top:15px">
                     <Col span='11'>
                         <Row>                 
                            <FormItem label="转账数量">
                                <Input v-model="formItem.amount" @on-keyup="showfixed($event)"></Input>
                            </FormItem>
                        </Row>
                     </Col>
                     <Col span='12' offset="1">
                         <Row>
                            <FormItem label="手续费">
                                <Slider v-model="formItem.fee" show-tip="always" input-size='large' :step="step" :max="max" :min="min"></Slider>
                                    
                            </FormItem>
                        </Row>
                     </Col>
                </Row>
                 <FormItem label="备注">
                        <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="转账备注 (50字以内)"></Input>
                    </FormItem>
                    <Row type="flex" justify="center" class="code-row-bg">
                        <Col span="10">
                         <FormItem>
                            <Button type="primary" @click="handleSubmit()" long>提交</Button>  
                        </FormItem>
                        </Col>
                    </Row>         
            </Form>
            <Row style="height:20px;background:#f9f8f8"></Row>
            <Row style="height:40px;line-height:40px;text-align:left;"> <span style='font-size:30px;color:#2688d2'>|</span> 转账记录</Row>
            <Row style="padding-top:20px">
                <Col span="24" style="width:100%">
                  <Table :columns="columns1" :data="data1"></Table>
                </Col>
                <Col span="24" style='margin-top:20px'>
                   <Page :total="recodelength"  :pageSize="pageSize" :current="current" @on-change="changePage"></Page>
                </Col>
            </Row>
        </Col>
        <Col span="8" style="margin-left:15px;background:#fff">
          <Row style="height:40px;line-height:40px;text-align:left;"> <span style='font-size:30px;color:#2688d2'>|</span> 转账余额</Row>
          <Row type="flex" justify="center" class="code-row-bg">
              <Col span="22" class='coindatail' v-for=" (index,item) in coindata" >
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
        v-model="modal1"
        @on-ok="oksend"
        title="确认资金密码">
          <Input v-model="formItem.jypsaa" placeholder="请输入资金密码" type="password" ></Input>
    </Modal>
   </div>
</template>
<style scoped>
.cimg img{vertical-align: middle; width:32px; height:32px}
.coindatail{ background:#f8f8f8;margin-top:8px;padding:8px;font-size:18px;border-radius:3px;-moz-box-shadow:0px 0px 3px #333333; -webkit-box-shadow:0px 0px 3px #333333; box-shadow:0px 0px 3px #333333;}
</style>
<script>

    export default{
         data(){
              return{
                    recodelength:0,
                    pageSize:10,
                    current:1,
                    step:0.000001,
                    max:0,
                    min:0.00001,
                    coindata:[],
                    modal1:false,
                    formItem: {
                        jypsaa:'',
                        select:0,
                        adr:'',
                        amount:'',
                        fee:0.001,
                        textarea:''
                    },
                     columns1: [
                    {
                        title: '币种',
                        key: 'coin',
                        render:(h,params)=>{
                            return h('div', [
                                h('p', params.row.coin.unit),
                            ]);
                        }
                    },
                    {
                        title: '转账数量',
                        key: 'totalAmount'
                    },
                    {
                        title: '转账地址',
                        key: 'address'
                    },
                    {
                        title: '手续费',
                        key: 'fee'
                    },
                    {
                        title: '时间',
                        key: 'createTime'
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    }
                ],
                data1: [
                  
                ]
            
              }
         }, 
         filters: {
             savetow:function(val){
                  let numbe=Number(val);
                  return numbe.toFixed(2)
             }
         },
         watch:{
             formItem:function(){
                 this.formItem.fee = this.min;
             }
         },
         methods:{
              handleSubmit(){
                    if(this.formItem.adr=='' ){
                        this.$Message.error('请填写转账地址');
                    }else if(this.formItem.amount==''){
                        this.$Message.error('请填写转账数量');
                    }else{
                        this.modal1=true;
                    }
                    
              },
              oksend(){
                 
                    let _data={
                        unit:this.coindata[this.formItem.select].unit,
                        address:this.formItem.adr,
                        amount:this.formItem.amount,
                        fee:this.formItem.fee,
                        remark:this.formItem.textarea,
                        jyPassword:this.formItem.jypsaa
                    }
                    this.$http.post(this.host+'/uc/withdraw/apply',_data).then(res=>{
                    
                        if(res.body.code=='0'){
                                this.$Message.success(res.body.message);
                                this.formItem={
                                        jypsaa:'',
                                        select:0,
                                        adr:'',
                                        amount:'',
                                        fee:0.001,
                                        textarea:''
                                };
                                this.feechange();
                                this.coindatas();
                                this.initrecord(0);
                                
                        }
                        else{
                                this.$Message.error(res.body.message);
                        }
                    })
                    
              },
              initrecord(pageNo){
                  let _data={
                      page:pageNo,
                      pageSize:this.pageSize
                  }
                    // this.$http.post(this.host+'/uc/transfer/record',_data).then(res=>{     
                    this.$http.post(this.host+'/uc/withdraw/record',_data).then(res=>{   
                        this.data1=res.body.data.content;
                        this.recodelength=parseFloat(res.body.data.totalElements);   
                                        
                    })
              },
              coindatas(){
                   this.$http.post(this.host+'/uc/asset/wallet').then(res=>{
                      if(res.body.code=='0'){
                        this.coindata=res.body.data;
                     
                        this.max= parseFloat(this.coindata[0].maxTransferFee);
                        this.min=parseFloat(this.coindata[0].minTransferFee);
                        this.step=parseFloat(((this.max)/500).toFixed(10));
                    
                      }else{
                    
                      }
                   })
              },
              feechange(ev){
                    if(this.coindata[this.formItem.select]!=undefined || this.coindata[this.formItem.select]!=null){

                        this.formItem.fee=parseFloat(parseFloat(this.coindata[this.formItem.select].minTransferFee).toFixed(8));   
                        this.max=parseFloat(parseFloat(parseFloat(this.coindata[this.formItem.select].maxTransferFee)).toFixed(8)); 
                        this.min=parseFloat(parseFloat(this.coindata[this.formItem.select].minTransferFee).toFixed(8));   
                        this.step=parseFloat(((this.max )/500).toFixed(10));
                    }
                       
                } ,
             showfixed(ev){
                    if(this.coindata[this.formItem.select]!=undefined){
                        var re1 = new RegExp("\([0-9]+\.[0-9]{"+this.coindata[this.formItem.select].withdrawScale+"})[0-9]*","");
                        this.formItem.amount=this.formItem.amount.toString().replace(re1,'$1'); 
                    }
                    else{
                       
                    }
             },
            changePage(index) {
                this.initrecord(index-1)
            },
            // changePage(page){
            //      this.pageNo= page;
            //      this.$http.post(this.host+'/uc/withdraw/record?page='+this.pageNo+'&pageSize=10'+this.pageSize).then(res=>{
            //           if(res.body.code=='0'){
            //                   this.zhuanzhangdata=res.body.data.content;
            //                   this.recodelength=parseFloat(res.body.totalElements);
            //              }  
            //              else{
            //                  this.$Message.error(res.body.message)
            //              }
            //            })
            //   }
         },
      
         created(){
            // this.$http.post(this.host+'/uc/withdraw/support/coin').then(res=>{
            //      console.log(res)
            // })
            this.coindatas();
            this.$store.commit('navigate','4');
            this.initrecord(0);
         }
    }
</script>


