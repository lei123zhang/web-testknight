<template>
 <div>
      <div class="bill">
      <Row type="flex" justify="center" class="code-row-bg">
            <Col span="18">
                <Row type="flex" justify="center" class="code-row-bg" style='padding-top:20px'>
                     <Col span='5' style="color:#fff;font-size:18px" >账户总资产</Col>
                     <Col span='18' >
                        <Row>
                            <Col span='20' offset='2'>
                                <blance></blance>
                            </Col>
                        </Row>
                     </Col>  
                </Row>
            </Col>  
      </Row>
    </div>
     <Row type="flex" justify="center" class="code-row-bg" style="background:#f8f8f8">
            <Col span='20'>
                <Row type="flex" justify="start" class="code-row-bg mingxi">                 
                        <Col span='24'>
                            <Row>
                                 <Form :model="formValidate" :label-width="80" style="padding:35px">
                                  <Row>
                                      <Col span='14'>
                                        <Row>
                                               <FormItem label="起止时间">
                                                    <Row>
                                                        <Col span="10">
                                                                <FormItem >
                                                                    <DatePicker type="datetime" placeholder="请选择" format="yyyy-MM-dd"  v-model="formValidate.startdate"  @on-change="formValidate.startdate=$event"></DatePicker>
                                                                </FormItem>
                                                        </Col>    
                                                        <Col span="1" style="text-align: center">-</Col>
                                                        <Col span="10" offset='2'>
                                                        <FormItem>
                                                                 <DatePicker type="datetime" placeholder="请选择" v-model="formValidate.enddate" format="yyyy-MM-dd" @on-change="formValidate.enddate=$event"></DatePicker>
                                                        </FormItem>
                                                        </Col>    
                                                    </Row>
                                                </FormItem>   
                                          </Row>
                                       </Col>
                                       <Col span='6'>
                                           <Row>
                                               <Col span="24">
                                                    <FormItem label="币种">
                                                        <Select v-model="formValidate.select">
                                                            <Option v-for="index in coinunit" :value="index.unit" :key="index.unit">{{index.unit}}</Option>       
                                                        </Select>     
                                                    </FormItem>
                                               </Col>
                                           </Row>
                                        </Col>
                                        <Col span='4'>
                                           <Row>
                                               <Col span="24">
                                                     <FormItem>
                                                        <Button type="primary" @click="handleSubmit('')" long>搜索</Button>         
                                                    </FormItem>
                                               </Col>
                                           </Row>
                                        </Col>
                                   </Row>
                               </Form>
                            </Row>
                        </Col>          
                </Row>
            </Col>
            <Col span='20'>
               <Row type="flex" justify="center" class="code-row-bg"style='background:#fff;padding-bottom:30px'>
                   <Col span='24'>
                       <Table :columns="column1" :data="datas"></Table>
                   </Col>
                   <Page :total="recordlength" style='margin-top:25px' :current="current" @on-change="changePage"></Page>
               </Row>
            </Col>
        </Row>
 </div>
</template>
<style scoped>
.bill{width:100%;height:320px; background:url(../assets/img/banner.png)center center; background-size:cover;} 
.mingxi{ margin: 30px auto;background:#fff;height: 100px;}
</style>

<script>
 import blance from  '../components/Balance.vue'
    export default{
         data(){
              return{
                 formValidate: {
                    startdate:'',
                    enddate: '',
                    select:''
                },
                recordlength:0,
                current:1,
                coinunit:[],
                column1: [
                    {
                        title: '币种',
                        key: 'symbol'
                    },
                    {
                        title: '金额',
                        key: 'amount'
                    },
                    {
                        title: '交易时间',
                        key: 'createTime'
                    },
                    {
                        title: '交易类型',
                        key: 'type',
                        render: (h, params) => {
                            const row=params.row;
                            let type=row.type;
                                    if(type=='0'){
                                        return  type=row.type='充值'
                                    }
                                    
                                    else if(type=='1'){
                                        return    type=row.type='转账'
                                        }
                                    else if(type=='2'){
                                        return  type=row.type='转账'
                                                }
                                    else if(type=='3'){
                                        return    type=row.type='币币交易'
                                        }
                                    else if(type=='4'){
                                    return    type=row.type='法币买入'
                                    }
                                    else if(type=='5'){
                                    return    type=row.type='法币卖出'
                                    }
                                    else if(type=='6'){
                                    return    type=row.type='活动奖励'
                                    }
                                    else if(type=='7'){
                                    return    type=row.type='推广奖励'
                                    }
                                    else if(type=='8'){
                                    return    type=row.type='分红'
                                    }
                                    else if(type=='9'){
                                    return    type=row.type='投票'
                                    }
                                    else if(type=='10'){
                                    return    type=row.type='人工充值'
                                    }  
                                    else if(type=='11'){
                                    return    type=row.type='配对'
                                    }                
                                return h('span', {
                                },type);
                            }
                        
                    }
                ],
                datas:[]
              }
       
         },methods:{
             handleSubmit(){
                 let _data={
                      pageNo:'0',
                      pageSize:'10',
                       unit:this.formValidate.select,
                        
                    //   startDate:this.formValidate.startdate,
                      endDate:this.formValidate.enddate,
                      dateRange:this.formValidate.startdate+'~'+this.formValidate.enddate,
                 }
                this.$http.post(this.host+'/uc/asset/transaction/all',_data).then(res=>{           
                       this.datas=res.body.content;   
                   })
             }
             ,
           
            initrecord(){
                  let _data={
                      pageNo:'0',
                      pageSize:'10',
                      startDate:this.formValidate.startdate,
                      endDate:this.formValidate.enddate
                        }
                this.$http.post(this.host+'/uc/asset/transaction/all',_data).then(res=>{
                    
                      this.recordlength=res.body.totalElements;
                   
                        
                       if (res.body.content) {
                             this.datas=res.body.content; 
                            // this.total = res.body.totalElements;
                            // this.loading = false
                            // this.page = resp.number;
                        } else {
                            this.$Message.error(resp.message);
                        }         
                })  
            },
            getunit(){
                   this.$http.post(this.host+'/uc/asset/wallet').then(res=>{
                      if(res.body.code=='0'){
                          this.coinunit=res.body.data;                
                      }
                   })
              },      
            changePage(page){
              var munpage=Number(page)-1;
                 
                //是否传入币种;
                  if(this.formValidate.select){
                          let _data={
                          pageNo:munpage,
                          pageSize:'10',
                          unit:this.formValidate.select,
                          startDate:this.formValidate.startdate,
                          endDate:this.formValidate.enddate
                        }
                        this.$http.post(this.host+'/uc/asset/transaction/all',_data).then(res=>{
                        //   console.log(res)
                            if(res.body.code=='0'){
                                // this.recordlength=res.body.totalElements;
                            //   this.datas=res.body.data;
                            }
                        })  
                } 
                else{
                  let _data={
                      pageNo:munpage,
                      pageSize:'10',
                      startDate:this.formValidate.startdate,
                      endDate:this.formValidate.enddate
                        }
                   this.$http.post(this.host+'/uc/asset/transaction/all',_data).then(res=>{
                     console.log(res.body)
                     if(res.body.code=='0'){
                  //    this.recordlength=res.body.totalElements;
                       //  this.datas=res.body.content;
                     }          
                    }) 
                }
              }      
         },
      
         components: {      
            'blance': blance
         },
         created(){
             this.initrecord();
             this.getunit();
         }
    }
</script>
