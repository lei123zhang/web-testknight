<template>
    <div class="nav-right">
        <div class="nav-right col-xs-12 col-md-10 padding-right-clear">
            <div class="bill_box rightarea padding-right-clear record">
                <section class="trade-group merchant-top">
                    <i class="merchant-icon tips"></i>
                    <span class="tips-word">转账</span>
                    <span class="head-group">
                        <!-- <router-link to="/transferAddr">转账地址管理</router-link> -->
                    </span>
                </section>
                <section>
                    <div class="table-inner action-box">
                        <i class="angle" style="right: 27px;"></i>
                        <div class="action-inner">
                            <div class="inner-left">
                                <p class="remarkribe">币种</p>
                                <!-- <Select v-model="coinType" style="width:100px;margin-top: 14px;" @on-change="getAddrList">
                                    <Option v-for="item in coinList" :value="item.unit" :key="item.unit">{{ item.unit }}</Option>
                                </Select> -->
                                <Input v-model="coinType" disabled style="width:100px;margin-top: 14px;"></Input>
                            </div>
                            <div class="inner-box">
                                <div class="form-group form-address">
                                    <label for="controlAddress" class="controlAddress remarkribe">转账地址</label>
                                    <div class="control-input-group">
                                        <Select v-model="transferAdress" @on-change="getRate">
                                            <Option v-for="item in addresses" :value="index" :key="item.address">{{item.address}}</Option>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group-container">
                            <div class="form-group form-amount">
                                <label class="label-amount"> 数量
                                    <p class="label-fr">
                                        <span>【可用余额】：
                                            <span class="label-pointer" id="valueAvailable">{{currentCoin.balance}}</span>
                                        </span>
                                        <!-- <span v-if="currentCoin.enableAutotransfer == 0">【温馨提示】：转账数量低于 {{currentCoin.threshold}} 时自动到账，否则需要人工审核</span>
                                        <span>
                                            <a href="javascript:;" id="levelUp" style="display: none;">提升额度</a>
                                        </span> -->
                                    </p>
                                </label>
                                <div class="input-group">
                                    <Poptip trigger="focus" :content="'最多输入6位小数,最小值为'+minAmount+' ,最大值为'+maxAmount" style="width: 100%;">
                                        <InputNumber @on-change="computerAmount" v-model="transferAmount" placeholder="输入转账数量" size="large" style="width: 900px;"></InputNumber>
                                        <span class="input-group-addon addon-tag uppercase firstt">{{coinType}}</span>
                                    </Poptip>

                                </div>
                            </div>
                        </div>
                        <div class="form-group form-amount"  style="margin-top:18px;">
                            <label class="label-amount"> 备注
                            </label>
                            <div class="input-group">
                                <Input v-model="remark" type="textarea" :autosize="{minRows: 1,maxRows: 2}" placeholder="请输入" size="large" style="width: 900px;"></Input>
                            </div>
                        </div>
                        <div class="form-group-container">
                            <div class="form-group form-fee">
                                <label class="label-amount"> 手续费 :&nbsp;&nbsp;&nbsp;&nbsp;{{ transferFees}}
                                    <!-- <p class="label-fr">
                                        <span>范围：{{currentCoin.minTxFee}} - {{currentCoin.maxTxFee}}</span>
                                    </p> -->
                                </label>
                                <div class="input-group">
                              
                                    <!--<Poptip trigger="focus" :content="'最多输入6位小数,最小值为'+currentCoin.minTxFee+'最大值为'+currentCoin.maxTxFee" style="width: 100%;">
                                        <InputNumber @on-change="computerAmount2" v-model="transferFee" placeholder="输入转账费率" :min="currentCoin.minTxFee" :max="currentCoin.maxTxFee" size="large" style="width: 440px;"></InputNumber>
                                        <span class="input-group-addon addon-tag uppercase">{{currentCoin.unit}}</span>
                                    </Poptip>-->
                                </div>
                            </div>
                            <!-- <div class="form-group">
                                <label>到账数量</label>
                                <div class="input-group">
                                    <InputNumber v-model="transferOutAmount" placeholder="到账数量" readonly size="large" style="width: 100%;"></InputNumber>
                                    <span class="input-group-addon addon-tag uppercase" style="top: 32px;">{{currentCoin.unit}}</span>
                                </div>
                            </div> -->
                        </div>
                        <div class="action-foot">
                            <Button id="transferSubmit" long size="large" type="primary" style="height:40px;" @click="apply">转账</Button>
                        </div>
                        <div class="action-content pt10">
                            <div class="action-body">
                                <p class="acb-p1">温馨提示</p>
                                <p class="acb-p2">• 最小转账数量为：{{minAmount}}币。<br>• 为保障资金安全，当您账户安全策略变更、密码修改、使用新地址转账，我们会对转账进行人工审核，请耐心等待工作人员电话或邮件联系<br>• 请务必确认电脑及浏览器安全，防止信息被篡改或泄露。 </p>
                            </div>
                        </div>
                        <div class="action-content">
                            <div class="action-body">
                                <p class="acb-p1">转账记录</p>
                                <div class="order-table">
                                    <Table stripe :columns="tableColumnsTransfer" :data="tableTransfer" :loading="loading"></Table>
                                    <div style="margin: 10px;overflow: hidden">
                                        <div style="float: right;">
                                            <Page :total="dataCount" :current="1" @on-change="changePage"></Page>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <Modal v-model="promptModle" width="360">
            <p slot="header" style="color:#0096ed;text-align:center;font-size:18px">
                <span>温馨提示</span>
            </p>
            <div style="font-size:16px;margin:10px 20px;">
                <p>请用户提现之前先仔细确认所填写的信息</p>
                <p>是否正确，以免造成损失！</p>
            </div>
            <div slot="footer" align="middle">
                <Button @click="cancelEdit" size="large" style="margin:20px 20px 20px 0">否</Button>
                <Button type="primary" size="large" @click="saveEditPass">是</Button>
            </div>
        </Modal>
        <Modal v-model="modal6" title="提示" @on-ok="ok6('tips')">
            <Form ref="tips" :model="tips" :rules="ruleValidate" :label-width="85">
                <FormItem label="资金密码" prop="password">
                    <Input v-model="tips.password" type="password" size="large"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>

export default {
    data() {
        return {
            currentCoin:{},
            dataCount: 0,
            loading: true,
            transferAdress: '',
            transferAmount: 0,
            transferFee: 0,
            // transferOutAmount: 0,
           
            promptModle: false,
            coinType: '',
            remark:'',
            addresses:[],
            index:0,
            minAmount:'',
            maxAmount:'',
            modal6: false,
            tips: {
                password: '',
            },
            ruleValidate: {
                password: [
                    { required: true, message: '请输入正确的资金密码', trigger: 'blur' },
                    { min: 6, message: '密码不得少于6个字符', trigger: 'blur' }
                ],
            },
            tableTransfer: []
        }
    },
   
    created() {
        this.coinType = this.$route.query.name;
        this.getAddrList();
        this.getList(0, 10)
    },

    methods: {
        changePage() {
            this.getList(index, 10)
        },
        accSub(arg1, arg2) {
            var r1, r2, m, n;
            try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
            try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
            m = Math.pow(10, Math.max(r1, r2));
            //last modify by deeka
            //动态控制精度长度
            n = (r1 >= r2) ? r1 : r2;
            return ((arg1 * m - arg2 * m) / m).toFixed(n);
        },
        accMul(arg1,arg2){//乘法：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。 
            var m=0,s1=arg1.toString(),s2=arg2.toString(); 
            try{m+=s1.split(".")[1].length}catch(e){} 
            try{m+=s2.split(".")[1].length}catch(e){} 
            return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m) 
        }, 
        accDiv(arg1,arg2){ //除法：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
            var t1=0,t2=0,r1,r2; 
            try{t1=arg1.toString().split(".")[1].length}catch(e){} 
            try{t2=arg2.toString().split(".")[1].length}catch(e){} 
            r1=Number(arg1.toString().replace(".","")) 
            r2=Number(arg2.toString().replace(".","")) 
            return (r1/r2)*Math.pow(10,t2-t1); 
        },
        round(v, e) {
            var t = 1;
            for (; e > 0; t *= 10, e--);
            for (; e < 0; t /= 10, e++);
            return Math.round(v * t) / t;
        },
        getAddrList() {
            //获取地址
            let params = {}
            params['unit'] = this.coinType;
            this.$http.post(this.host + '/uc/transfer/address', params).then(response => {
                var resp = response.body;
                
                if (resp.code == 0) {
                    this.addresses = resp.data.info;
                   // this.transferFee=parseFloat(this.addresses[this.index].rate/100);
                    this.minAmount=this.addresses[this.index].minAmount;
                    this.currentCoin=resp.data;
                    this.transferFee=this.addresses[this.index].rate;
              
                    // this.maxAmount=this.round(this.currentCoin.balance/(1+this.transferFee),8);
                    this.maxAmount=this.round(this.accDiv(this.currentCoin.balance,(1+this.transferFee)),8);                    
                } else {
                    // this.$Message.error(resp.message);
                }
            })
        },
        getRate(){
          // this.transferAdress=this.addresses[this.index].address;
        },
        getList(pageNo, pageSize) {
            //获取tableTransfer
            let params = {}
            params['pageNo'] = pageNo
            params['pageSize'] = pageSize
            this.$http.post(this.host + '/uc/transfer/record', params).then(response => {
                var resp = response.body;
                if (resp.code== 0) {
                    this.tableTransfer = resp.data.content
                    this.dataCount = resp.data.totalElements
                    this.loading = false
                    
                } else {
                    this.$Message.error(resp.message);
                }
            })
        },
        computerAmount() {
            this.transferOutAmount = this.round(this.accSub(this.transferAmount, this.transferFee), 6)
        },
        computerAmount2() {
            this.transferAmount = (this.transferAmount + '').replace(/([0-9]+\.[0-9]{6})[0-9]*/, "$1") - 0
            this.transferOutAmount = this.round(this.accSub(this.transferAmount, this.transferFee), 6)
        },
        valid() {
            if (this.transferAdress == '') {
                this.$Message.error('请填入地址');
                return false
            } else if (this.transferAmount == '' || this.transferAmount == 0 || (this.transferAmount - 0) < this.minAmount) {
                this.$Message.error('请填写正确转账数量，最小值为' + this.minAmount);
                return false
            }else if ((this.transferAmount - 0) < this.transferFee) {
                this.$Message.error('转账数量不得小于手续费');
                return false
            } else if (this.transferFee == '' ) {
                alert( this.transferFee)
               // this.$Message.error('手续费最小值为 ' + this.currentCoin.minTxFee + ' , 最大值为' + this.currentCoin.maxTxFee);
                return false
            } else {
                return true
            }
        },
        apply(){
            //提交
            if (this.valid()) {
                this.promptModle=true;
            }
        },
        cancelEdit(){
            this.promptModle=false;
        },
        saveEditPass(){
            this.modal6=true;
            this.promptModle=false;
        },
        ok6() {
            let params = {}
            params['unit'] = this.coinType;
            params['address'] = this.transferAdress;
            params['amount'] = this.transferAmount;
            params['remark'] = this.remark;
            params['fee'] = this.round(this.accMul(this.transferFee,this.transferAmount),8);
            params['jyPassword'] = this.tips.password;
            this.$http.post(this.host + '/uc/transfer/apply', params).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.$Modal.success({
                        title: '',
                        content: '<h1 style="margin-left:80px">转账成功!</h1>'
                    });
                    // this.$Message.success("转账成功");
                }else {
                    this.$Message.error(resp.message);
                }
            })
            this.modal6=false;
        },
    },
   
    computed: {
         transferFees: function () {   
                return this.transferFee * this.transferAmount;
                },
        tableColumnsTransfer() {
            let columns = [];
            columns.push({
                title: '转账时间',
                width: 180,
                key: 'createTime',
                align: 'center',
            });
            columns.push({
                title: '币种',
                key: 'unit',
                align: 'center',
                render: function(h, params) {
                  return params.row.coin.unit
                }
            });
            columns.push({
                title: '转账地址',
                key: 'address',
                align: 'center',
            });
            columns.push({
                title: '转账数量',
                key: 'amount',
                align: 'center',
            });
            columns.push({
                title: '手续费',
                key: 'fee',
                align: 'center',
            });
            columns.push({
                title: '状态',
                key: 'status',
                align: 'center',
                render: (h, params) => {
                    // let text = ''
                    // if (params.row.coin.status == 1) {
                    //     text = '成功'
                    // } else {
                    //     text = '失败'
                    // }
                    // return h('div', [
                    //     h('p', text),
                    // ]);
                    return "成功"
                }
            });
            // columns.push({
            //     title: '备注',
            //     align: 'center',
            //     key: 'price1',
            // });
            return columns;
        }
    }
}
</script>
<style scoped>
.ivu-slider-button-wrap{
    top:-6px;
}
#transferAddressList {
    position: absolute;
    height: 0;
    transition: height .3s;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 1;
    max-height: 245px;
    overflow: auto;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
    height: auto;
    background: #fff;
}

#transferAddressList .address-item {
    padding: 0 20px;
    display: flex;
    line-height: 48px;
    border-bottom: 1px solid transparent;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    z-index: 99;
}

#transferAddressList .address-item:hover {
    background: #eee;
    cursor: pointer;
}

#transferAddressList .notes {
    position: absolute;
    bottom: 0;
    right: 20px;
    height: 48px;
    line-height: 48px;
    max-width: 300px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

p.remarkribe {
    font-size: 16px;
    font-weight: 600;
}

.acb-p1 {
    font-size: 18px;
    font-weight: 600;
    line-height: 50px;
}

.acb-p2 {
    font-size: 14px;
    line-height: 24px;
}

.action-box {
    position: relative;
    text-align: left;
    border-radius: 3px;
    padding: 10px 20px 20px;
}

.action-content.pt10 {
    padding-top: 10px;
}

.action-content {
    width: 100%;
    margin-top: 20px;
    overflow: hidden;
    display: table;
}

.action-content .action-body {
    display: table-cell;
    vertical-align: top;
    line-height: 20px;
    font-size: 12px;
}

.action-foot {
    text-align: center;
    padding: 40px 170px 0;
}

.hb-night .btn.btn-primary,
.hb-night .btn.btn_submit {
    background-color: #7A98F7;
    color: white;
}

.action-inner {
    width: 100%;
    display: table;
}

.action-inner .inner-box {
    display: table-cell;
    width: 80%;
}

.form-group {
    position: relative;
    margin-bottom: 20px;
    font-size: 16px;
}

.hb-night .form-group label {
    color: #4E5B85;
}

.controlAddress {
    line-height: 50px;
}

.form-group label {
    max-width: 100%;
    /* display: inline-block; */
    /* font-size: 14px; */
    font-weight: 600;
}

.control-input-group {
    position: relative;
}

.control-input-group.open .select-list {
    height: auto;
}

.form-group-container {
    display: table;
    width: 100%;
}

.form-group-container .form-amount {
    width: 100%;
}

.form-group-container .form-group {
    display: table-cell;
}

.form-group-container .form-group span.addon-tag:last-child {
    padding: 0 20px;
    border: none;
    background: none;
    cursor: default;
    position: absolute;
    right: 20px;
    top: 8px;
}

.form-group-container .form-group span.addon-tag:last-child.firstt {
    top: 8px;
}

.form-group-container .form-fee {
    width: 50%;
    padding: 0 20px 0 0;
}

.label-amount .label-fr {
    float: right;
    color: #aaa;
    font-size: 12px;
}

.label-amount .label-fr span {
    margin-left: 2px;
}

.form-group-container .form-group {
    display: table-cell;
}

.hb-night table.table .table-inner {
    margin: -4px -20px;
    position: relative;
    background-color: #181B2A;
    border-radius: 3px;
}

.hb-night table.table .table-inner {
    margin: -4px -20px;
    position: relative;
    background-color: #181B2A;
    border-radius: 3px;
}

.hb-night table.table .table-inner {
    margin: -4px -20px;
    position: relative;
    background-color: #181B2A;
    border-radius: 3px;
}

table.table .table-inner.action-box {
    margin: -1px -10px;
}

.merchant-top {
    height: 50px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background: #fff;
    padding: 0 15px;
    color: #0d214e;
}

.trade-group {
    margin-bottom: 20px;
    font-size: 14px;
}

.merchant-icon {
    display: inline-block;
    margin-left: 4px;
    background-size: 100% 100%;
}

.merchant-top .tips-word {
    -webkit-box-flex: 2;
    -ms-flex-positive: 2;
    flex-grow: 2;
    text-align: left;
}

.merchant-icon.tips {
    width: 4px;
    height: 22px;
    margin-right: 10px;
    background: #1755FD;
}

.bill_box {
    width: 100%;
    height: auto;
    overflow: hidden;
}

.rightarea {
    background: #fff;
    padding-left: 15px !important;
    padding-right: 15px !important;
    margin-bottom: 60px !important;
}

.rightarea .rightarea-top {
    line-height: 75px;
    border-bottom: #f1f1f1 solid 1px;
}

.rightarea .rightarea-con {
    padding-top: 30px;
    padding-bottom: 125px;
}

.rightarea .trade-process {
    line-height: 30px;
    padding: 0 15px;
    background: #f1f1f1;
    display: inline-block;
    position: relative;
    margin-right: 20px;
}

.rightarea .trade-process.active {
    color: #eb6f6c;
    background: #f9f5eb;
}

.rightarea .trade-process .icon {
    background: #fff;
    border-radius: 20px;
    height: 20px;
    width: 20px;
    display: inline-block;
    line-height: 20px;
    text-align: center;
    margin-right: 10px;
}

.rightarea .trade-process .arrow {
    position: absolute;
    top: 10px;
    right: -5px;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid #f1f1f1;
}

.rightarea .trade-process.active .arrow {
    border-left: 5px solid #f9f5eb;
}

.rightarea .rightarea-tabs {
    border: none;
}

.rightarea .rightarea-tabs li>a {
    width: 100%;
    height: 100%;
    padding: 0;
    margin-right: 0;
    font-size: 14px;
    color: #646464;
    border-radius: 0;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

.rightarea .rightarea-tabs li>a:hover {
    background-color: #fcfbfb;
}

.rightarea .rightarea-tabs li {
    width: 125px;
    height: 40px;
    position: relative;
    margin: -1px 0 0 -1px;
    border: 1px solid #f1f1f1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.rightarea .rightarea-tabs li.active {
    background-color: #fcfbfb;
}

.rightarea .rightarea-tabs li:last-child {
    border-right: 1px solid #f1f1f1;
}

.rightarea .rightarea-tabs li.active>a,
.rightarea .rightarea-tabs li:hover>a {
    color: #da2e22;
    border: none;
}

.rightarea .panel-tips {
    border: 3px solid #fdfaf3;
    color: #9e9e9e;
    font-size: 12px;
}

.rightarea .panel-tips .panel-header {
    background: #fdfaf3;
    line-height: 40px;
    margin-bottom: 15px;
}

.rightarea .panel-tips .panel-title {
    font-size: 16px;
}

.rightarea .recordtitle {
    cursor: pointer;
}

.nav-right {
    width: 1000px;
    height: auto;
    overflow: hidden;
    padding: 0 15px;
}

.order_box {
    width: 100%;
    background: #fff;
    height: 56px;
    line-height: 56px;
    margin-bottom: 20px;
    border-bottom: 2px solid #ccf2ff;
    position: relative;
    text-align: left;
}

.order_box a {
    color: #8994A3;
    font-size: 16px;
    padding: 0 30px;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    line-height: 54px;
    display: inline-block;
}

.order_box .active {
    border-bottom: 2px solid #00b5f6;
}

.order_box .search {
    position: absolute;
    width: 300px;
    height: 32px;
    top: 12px;
    right: 0;
    display: flex;
    /* border: #c5cdd7 solid 1px; */
}
</style>
