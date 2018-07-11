<template>
    <div class="content-wrap">
        <div class="ww">
            <div class="container" id="List">
                <div class="contbox">
                    <div class="nav-right col-xs-12 col-md-10 padding-right-clear">
                        <div class="send-box">
                            <div class="title-box">
                                <i class="merchant-icon tips"></i>
                                <h6 class="titles">创建一个广告</h6>
                                <p>如果您经常进行交易，您可以创建自己的交易广告。如果您只是偶尔交易，我们建议您直接搜索
                                    <router-link to="/tradingcenter/coinBTCbuy">交易广告</router-link>
                                    。
                                </p>
                                <!-- <p>创建一则交易广告是
                                    <a>免费的</a>。</p>
                                <p>若您想直接编辑已创建的广告，请查看
                                    <router-link to="/ordermanagement/myad">我的广告</router-link>
                                    。
                                </p> -->
                            </div>
                            <!--  -->
                            <div class="formbox send-form">
                                <Form ref="form" :model="form" :rules="ruleValidate" :label-width="110">
                                    <FormItem label="我想要" prop="advertiseType">
                                        <RadioGroup v-model="form.advertiseType">
                                            <Radio label="1" :disabled='isId'>在线出售</Radio>
                                            <Radio label="0" :disabled='isId'>在线购买</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                    <FormItem label="交易币种" prop="coin">
                                        <Select v-model="form.coin" :disabled='isId' @on-change="changeCoin">
                                            <Option v-for="item in coinList" :value="item.id" :key="item.id">{{item.unit}}</Option>
                                        </Select>
                                    </FormItem>
                                    <FormItem label="国家" prop="country">
                                        <Select v-model="form.country" @on-change="onAreaChange">
                                            <Option v-for="area in areas" :value="area.zhName" :key="area.zhName">{{area.zhName}}</Option>
                                        </Select>
                                    </FormItem>
                                    <!-- 1 -->
                                    <FormItem label="货币" prop="rmb">
                                        <Input v-model="form.rmb" disabled placeholder=""></Input>
                                    </FormItem>
                                    <FormItem label="固定价格">
                                        <i-switch v-model="form.fixed" size="large">
                                            <span slot="open">开启</span>
                                            <span slot="close">关闭</span>
                                        </i-switch>
                                    </FormItem>
                                    <p class="msg" v-show="form.fixed">启用后，您的币价不会随市场波动，价格不变。</p>
                                    <FormItem label="溢价" prop="premisePrice" v-show="!form.fixed" class="ivu-form-item-required">
                                        <Input v-model="form.premisePrice" placeholder="请设置您的溢价">
                                        <span slot="append">%</span>
                                        </Input>
                                    </FormItem>
                                    <FormItem label="固定价格" prop="fixedPrice" v-show="form.fixed" class="ivu-form-item-required">
                                        <Input v-model="form.fixedPrice" placeholder="请输入您的交易价格">
                                        <span slot="append">CNY</span>
                                        </Input>
                                    </FormItem>
                                    <!-- 1 -->
                                    <p class="msg">市场参考价格：
                                        <span class="cankao">{{cankao}}</span>
                                    </p>
                                    <p class="msg" v-show="!form.fixed">溢价是指高于当前市场价格多少百分比进行{{wantstyle}}。</p>
                                    <div class="ivu-form-item">
                                        <label class="ivu-form-item-label" style="width: 90px;">交易价格</label>
                                        <div class="ivu-form-item-content" style="margin-left: 90px;">
                                            <div class="ivu-input-wrapper ivu-input-type" id="price">
                                                {{price}}
                                            </div>
                                        </div>
                                    </div>
                                    <p class="msg">计价公式：（Bitstamp+Bitfinex+Coinbase）/ 3 *{{gongshi.toFixed(4) }}</p>
                                    <FormItem :label="wantstyle+'数量'" prop="number">
                                        <Input v-model="form.number" :placeholder="'请输入您要'+wantstyle+'的数量'"></Input>
                                    </FormItem>
                                    <FormItem label="付款期限" prop="timeLimit">
                                        <Input v-model="form.timeLimit" :placeholder="'请输入您的交易期限('+wantTime+'分钟)'">
                                        <span slot="append">分钟</span>
                                        </Input>
                                    </FormItem>
                                    <p class="msg">要求对方在多少时间内完成支付，超时未支付的订单将被系统自动取消</p>

                                    <router-link to="/membercenter/account" style="padding-left: 90px;">【提示】可前往个人中心绑定/增加支付方式</router-link>
                                    <FormItem label="付款方式" prop="payMode">
                                        <Select v-model="form.payMode" multiple style="width:100%">
                                            <Option v-for="item in payModeList" :value="item.value" :key="item.value" :disabled="item.isOpen">{{ item.label }}</Option>
                                        </Select>
                                    </FormItem>

                                    <FormItem label="最小交易额" prop="minLimit">
                                        <Input v-model="form.minLimit" placeholder="最小交易额必须大于等于100！">
                                        <span slot="append">CNY</span>
                                        </Input>
                                    </FormItem>
                                    <FormItem label="最大交易额" prop="maxLimit">
                                        <Input v-model="form.maxLimit" placeholder="请输入您的最大交易额">
                                        <span slot="append">CNY</span>
                                        </Input>
                                    </FormItem>
                                    <FormItem label="备注信息" prop="remark">
                                        <Input v-model="form.remark" type="textarea" :autosize="{minRows: 4,maxRows: 6}" placeholder="可以内备注信息里填写您的特殊要求，例如：对买方的要求，在线时间等。"></Input>
                                    </FormItem>
                                    <FormItem label="开启自动回复">
                                        <i-switch v-model="form.autoReply" size="large">
                                            <span slot="open">开启</span>
                                            <span slot="close">关闭</span>
                                        </i-switch>
                                    </FormItem>
                                    <p class="msg">启用后，用户通过此广告向您发起交易时，系统自动将您选择的自动回复用语发送给对方。</p>
                                    <FormItem label="自动回复" prop="autoword" v-show="form.autoReply">
                                        <Input v-model="form.autoword" type="textarea" :autosize="{minRows: 4,maxRows: 6}" placeholder="在接收订单后，自动回复给买家的信息，例如：收款方式、收款账号等。"></Input>
                                    </FormItem>
                                    <FormItem label="资金密码" prop="priceW">
                                        <Input v-model="form.priceW" placeholder="请输入您的资金密码" type="password"></Input>
                                    </FormItem>
                                    <FormItem>
                                        <Button type="primary" long @click="handleSubmit('form')" :disabled="disAllowBtn">发布广告</Button>
                                        <!-- <Button type="ghost" @click="handleReset('form')" style="margin-left: 8px">Reset</Button> -->
                                    </FormItem>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   <!-- <Modal v-model="modallogin" width="800" :mask-closable=false :closable=false>
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>为提升法币交易区广告方风险防控意识，您需完成本次安全风险评测，预计用时5-10分钟</span>
        </p>
         <Form :model="loginform" :width="400" class="ableclss">
                   <p style="text-align:left;color:#000;line-height:35px">1 在交易过程中，买方常见的诈骗行为有哪些?</p>
                    <FormItem>
                        <CheckboxGroup v-model="loginform.question1.labels">
                            <Checkbox v-for="val in loginform.question1" :label="val.labels">{{val.txt}}</Checkbox>
                        </CheckboxGroup>
                      <p v-show="error1" style="color:red">正确答案 :ABCD</p>
                    已勾选答案:  {{loginform.question1.labels}}
                    </FormItem>   
                    <p style="text-align:left;color:#000;line-height:35px">2 交易过程中，买方出现什么样的行为，卖方需要提高警惕？</p>
                    <FormItem>
                        <CheckboxGroup v-model="loginform.question2.labels">
                            <Checkbox v-for="val in loginform.question2" :label="val.labels">{{val.txt}}</Checkbox>
                        </CheckboxGroup>
                   已勾选答案:     {{loginform.question2.labels}}
                         <p v-show="error2" style="color:red">正确答案 :ABCD</p>
                    </FormItem>
                    <p style="text-align:left;color:#000;line-height:35px">3 作为商家的买方，应该遵守哪些规则？</p>
                    <FormItem>
                        <CheckboxGroup v-model="loginform.question3.labels">
                            <Checkbox v-for="val in loginform.question3" :label="val.labels">{{val.txt}}</Checkbox>
                        </CheckboxGroup>
                  已勾选答案:      {{loginform.question3.labels}}
                         <p v-show="error3" style="color:red">正确答案 :ABD</p>
                    </FormItem>
                     <p style="text-align:left;color:#000;line-height:35px">4 对于单笔5万以上的订单，以下哪些方案是正确的？</p>
                    <FormItem>
                        <CheckboxGroup v-model="loginform.question4.labels">
                            <Checkbox v-for="val in loginform.question4" :label="val.labels">{{val.txt}}</Checkbox>
                        </CheckboxGroup>
                 已勾选答案:       {{loginform.question4.labels}}
                         <p v-show="error4" style="color:red">正确答案 :AC</p>
                    </FormItem>
                     <p style="text-align:left;color:#000;line-height:35px">5 以下哪些情况会降低用户的信用评级，甚至将被平台暂时或永久冻结账户？</p>
                    <FormItem>
                        <CheckboxGroup v-model="loginform.question5.labels">
                            <Checkbox v-for="val in loginform.question5" :label="val.labels">{{val.txt}}</Checkbox>
                        </CheckboxGroup>
                 已勾选答案:       {{loginform.question5.labels}}
                         <p v-show="error5" style="color:red">正确答案 :ABC</p>
                    </FormItem>
                     <p style="text-align:left;color:#000;line-height:35px">6 以下哪些是防范黑钱及账户被冻结有效方法？</p>
                    <FormItem>
                        <CheckboxGroup v-model="loginform.question6.labels">
                            <Checkbox v-for="val in loginform.question6" :label="val.labels">{{val.txt}}</Checkbox>
                        </CheckboxGroup>
                已勾选答案:        {{loginform.question6.labels}}
                         <p v-show="error6" style="color:red">正确答案 :ABCD</p>
                    </FormItem>
                 
                   <h3> 二、投资人承诺</h3>
                    <br> 我承诺做到以下事宜，自行承担点对点交易风险：
                    <br>不轻易透露个人联系方式；
                    <br> 不轻信银行到账短信，转账截图；
                    <br>收款到账信息以登陆网银查看为准；
                    <br>  对大额交易进行实名安全认证；
                    <br>  仅拿出自己可控的资金，理性投资；
                    <br>  交易不涉及洗钱、倒汇、非法集资等违法行为；
                    <br>  自愿遵守平台的充值、提现、视频认证等运营规则；
                    <br>  根据平台风控策略及运营情况会核实您的身份信息，配合提供相关证明；
                    <br>  自觉遵守平台运营规则，如果违背运营规则，愿意接受平台相应处理；
                    <br>  曾经有参与过数字资产的场外交易，对场外交易的交易风险有详尽了解;
                    <br>   具备风控经验，掌握场外交易常识并具备良好的风险控制能力;
                     <FormItem>
                     
                    </FormItem>
            <h3> <span style="color:red">我已阅读</span>并充分理解上述内容，为保护自身数字资产安全，将<span style="color:red">登录网银确认</span >收到实际汇款，并<span style="color:red">自愿承担</span>所有的交易风险。</h3>
            <p style="background:#dddee1;padding:8px 8px;line-height:25px"><input type="text" style="border:none;outline:none;width:80px;height:20px" v-model="inputinfo1">并充分理解上述内容,为保护自身数字资产安全，将<input type="text" style="border:none;outline:none;width:80px;height:20px" v-model="inputinfo2" >实际汇款，并<input type="text" style="border:none;outline:none;width:80px;height:20px"  v-model="inputinfo3">所有的交易风险 </p>        
                <p v-show="error7" style="color:red;">请正确填写上面的内容</p>        
          </Form>
        <div slot="footer" style="padding-bottom:50px">
            <Button type="primary" size="large" long @click="sendquestion">提交并查看答案</Button>
        </div> 
    </Modal> -->
    </div>
</template>
<script>
export default {
    data() {
        var that = this;
        const numberCheck = (rule, value, callback) => {
            if (value === '' || value <= 0) {
                callback(new Error('请输入大于零数字,并且最大交易数量不超过100币'));
            } else if (Number.isNaN(Number(value))) {
                callback(new Error('请输入数字,并且最大交易数量不超过100币'));
            } else if (value > 100) {
                callback(new Error('请输入正确数字，并且最大交易数量不超过100币'));
            } else {
                callback();
            }
        };
        const premisePriceCheck = (rule, value, callback) => {
            if (that.form.fixed == false) {
                if (!value || value == 0) {
                    return callback(new Error('溢价值为0-20'));
                } else if (Number.isNaN(Number(value))) {
                    callback(new Error(''));
                } else if (value < 0 || value > 20) {
                    callback(new Error('请输入正确数字'));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        const fixedPCheck = (rule, value, callback) => {
            if (that.form.fixed == true) {
                if (value === '') {
                    callback(new Error('请输入正确数字'));
                } else if (!/^[0-9]+(.[0-9]{2})?/.test(value)) {
                    callback(new Error('请输入正确数字'));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        const maxCheck = (rule, value, callback) => {
            let priceNow = (that.price + '').replace(/,/g, '').replace(/[^\d|.]/g, '') - 0;
            priceNow = priceNow * that.form.number;
            if (!value || value == 0) {
                return callback(new Error('请输入您的最大交易额！'));
            } else if (!/^\d+$/.test(value)) {
                callback(new Error('请输入整数'));
            } else if (value < parseInt(that.form.minLimit)) {
                callback(new Error('最大交易额必须大于最小交易额！'));
            } else if (value > priceNow) {
                callback(new Error('最大交易额不能超过您的'+that.wantstyle+'总金额' + priceNow + 'CNY！'));
            } else {
                callback();
            }
        };
        const minCheck = (rule, value, callback) => {
            if (!value || value == 0) {
                return callback(new Error('请输入您的最小交易额！'));
            } else if (!/^\d+$/.test(value)) {
                callback(new Error('请输入整数'));
            } else if (value < 100) {
                callback(new Error('最小交易额必须大于等于100！'));
            }
            if (that.form.maxLimit && that.form.maxLimit != 0 && value > (that.form.maxLimit - 0)) {
                // console.log(this.form.maxLimit)
                callback(new Error('最小交易额必须小于最大交易额'));
            } else {
                callback();
            }
        };
        //    期限
        const timeLimitCheck = (rule, value, callback) => {
            //数字
            if (value === '' || !/^\d+$/.test(value)) {
                callback(new Error('请输入正确数字'));
            }
            //出售
            if (that.form.advertiseType == 1) {
                if (value < 15 || value > 120) {
                    callback(new Error('请输入正确数字'));
                } else {
                    callback();
                }
            }
            //买入
            if (that.form.advertiseType == 0) {
                if (value < 10 || value > 30) {
                    callback(new Error('请输入正确数字'));
                }
                else {
                    callback();
                }
            } else {
                callback();
            }
        };
        return {
            modallogin:false,
            inputinfo1:'',
            inputinfo2:'',
            inputinfo3:'',
            isId: false,
            disAllowBtn: false,
            //币种列表
            coinList: [],
            //账户余额
            balance: 100,
            //参考价
            cankao: '',
            price: '',
            gongshi: 1,
            wantstyle: '卖出',
            wantTime: '15-120',
            areas:[],
            form: {
                advertiseType: '1',
                coin: '2',
                country: '',
                rmb: '',
                fixed: false,
                premisePrice: '',
                fixedPrice: '',
                number: '',
                timeLimit: '',
                payMode: [],
                minLimit: '',
                maxLimit: '',
                autoReply: false,
                remark: '',
                priceW: '',
                autoword: '',
            },
            ruleValidate: {
                advertiseType: [
                    { required: true, trigger: 'change' }
                ],
                coin: [
                    { required: true, message: '请输入币种', trigger: 'change' }
                ],
                country: [
                    { required: true, message: '请输入正确选项', trigger: 'change' }
                ],
                rmb: [
                    { required: true, message: '请输入正确选项', trigger: 'change' }
                ],
                premisePrice: [
                    { validator: premisePriceCheck, message: '溢价值为0-20，且不能为0', trigger: 'blur' }
                ],
                fixedPrice: [
                    { validator: fixedPCheck, message: '请输入正确固定价格', trigger: 'blur' }
                ],
                number: [
                    // { required: true, validator: numberCheck, message: '请输入正确数字，并且最大交易数量不超过100币', trigger: 'blur' }
                    { required: true, validator: numberCheck,trigger: 'blur' }
                ],
                timeLimit: [
                    { required: true, validator: timeLimitCheck, message: '请输入正确交易限期', trigger: 'blur' },
                ],
                payMode: [
                    { required: true, type: 'array', min: 1, message: '请选择交易方式', trigger: 'change' },
                ],
                minLimit: [
                    { required: true, validator: minCheck, trigger: 'blur' }
                ],
                maxLimit: [
                    { required: true, validator: maxCheck, trigger: 'blur' }
                ],
                priceW: [
                    { required: true, message: '请输入资金密码', trigger: 'blur' }
                ],
            }, 
            loginform:{
                 question1:[
                    {labels:'a',txt:'a.订单显示金额30000元，实际对方汇款3000元，2）拍下3000个USDT，支付3000元，故意误导'},
                    {labels:'b',txt:'b.收到伪基站等手段发送的虚假到账短信，来伪造银行的到账短信提醒'},
                    {labels:'c',txt:'c.通过PS手段，买方直接向卖方发送PS的银行转账完成的截图，不断的催促卖方放币' },
                    {labels:'d',txt:'d.选择支付宝交易时，买方发来一个有备注参考号的“请你代付”申请，要求卖方放币（“代付”只是让其他人付款，而实际并没有付款）'}
                ],
                question2:[
                     {labels:'a',txt:'a.买方通过各种方式、理由，索要卖方手机号'},
                    {labels:'b',txt:'b.卖方收到收款短信提醒，登录银行账号却无实际汇款或发现银行账户被锁无法登录'},
                    {labels:'c',txt:'c.卖方收到收款短信提醒，登录银行账号却无实际汇款或发现银行账户被锁无法登录' },
                    {labels:'d',txt:'d.订单已完成，但买方还在主动与卖方闲聊，获取更多个人信息、拖延时间或重复拍下订单'}
                ],
                question3:[
                     {labels:'a',txt:'a.订单生成后，第一时间付款'},
                     {labels:'b',txt:'b.用绑定的实名卡进行付款'},
                     {labels:'c',txt:'c.不在时，广告未及时下架，仍在继续开启' },
                     { labels:'d',txt:'d.购买广告，输入实际的购买数量，不夸大'}
                ],
                question4:[
                     {labels:'a',txt:'a.成交额大于5万以上时，需要向对手方进行实名安全认证'},
                     {labels:'b',txt:'b.随意接受对方大额汇款，没有向对方进行实名安全认证'},
                     {labels:'c',txt:'c.节假日和工作日的晚17:00-早9:00，超过5万以上的汇款分批支付，以确保收款的及时性' },
                     { labels:'d',txt:'d.节假日和晚17:00点后，5万以上的汇款依然可以及时到账'}
                ],
                question5:[
                     {labels:'a',txt:'a.买方未付款，却标记为"已确认付款"'},
                     {labels:'b',txt:'b.卖方已收到汇款，却谎称没有收到，不放行'},
                     {labels:'c',txt:'c.买方多次生成和取消订单，干扰市场秩序' },
                     { labels:'d',txt:'d.买方用非实名账户汇款，卖方拒绝交易'}
                ],
                question6:[
                     {labels:'a',txt:'a.对于不熟悉的对手方，在大额交易时需要进行实名安全认证'},
                     {labels:'b',txt:'b.周转的资金卡上不要存有大额资金，及时转出'},
                     {labels:'c',txt:'c.银行卡被冻结后，第一时间联系银行，寻求原因' },
                     { labels:'d',txt:'d.查明原因后，积极向相关部门说明情况，提交材料，要求解冻'}
                ]
            },
            error1:false,
            error2:false,
            error3:false,
            error4:false,
            error5:false,
            error6:false,
            error7:false,
            payModeList: [
                {
                    value: '支付宝',
                    label: '支付宝',
                    isOpen: true,
                },
                {
                    value: '微信',
                    label: '微信',
                    isOpen: true,
                },
                {
                    value: '银联',
                    label: '银联',
                    isOpen: true,
                },
            ]
        }
    },
    methods: {
        changeCoin(){
            let coinItem = this.getCoin(this.form.coin);
          //  console.log(coinItem.marketPrice);
            if(coinItem != null) {
            this.cankao = coinItem.marketPrice + '';
            let lv = (1 + this.form.premisePrice / 100).toFixed(4);
            let cankoNew = this.cankao.replace(/,/g, '').replace(/[^\d|.]/g, '') - 0
            this.price = (cankoNew * lv).toLocaleString();// + ' CNY/' + coinItem.unit;
            this.symbol = coinItem.unit;
            }
        },
        sendquestion(){
             let arr1=['a','b','c','d'];
             let que1=this.loginform.question1.labels;
             if(que1==null){
                  this.error1=true;
             }
             else if(arr1.sort().toString() == que1.sort().toString()==false){
                 this.error1=true;
             }else{
                 this.error1=false;
             }

             let arr2=['a','b','c','d'];
             let que2=this.loginform.question2.labels;
            if(que2==null){
                  this.error2=true;
             }
             else if(arr2.sort().toString() == que2.sort().toString()==false){
                 this.error2=true;
             }else{
                 this.error2=false;
             }
         
           let arr3=['a','b','d'];
           let que3=this.loginform.question3.labels;
            if(que3==null){
                  this.error3=true;
             }
             else if(arr3.sort().toString() == que3.sort().toString()==false){
                 this.error3=true;
             }else{
                 this.error3=false;  
             }

           let arr4=['a','c'];
           let que4=this.loginform.question4.labels;
            if(que4==null){
                  this.error4=true;
             }
             else if(arr4.sort().toString() == que4.sort().toString()==false){
                 this.error4=true;
             }else{
                 this.error4=false;      
             }

           let arr5=['a','b','c'];
           let que5=this.loginform.question5.labels;
           if(que5==null){
                  this.error5=true;
             }
             else if(arr5.sort().toString() == que5.sort().toString()==false){
                 this.error5=true;
             }else{
                 this.error5=false;        
             }
          
           let arr6=['a','b','c','d'];
           let que6=this.loginform.question6.labels;
           if(que6==null){
                  this.error6=true;
             }
             else if(arr6.sort().toString() == que6.sort().toString()==false){
                 this.error6=true;
             }
             else{
                 this.error6=false;
             }

            
             if(this.inputinfo1!='我已阅读'){
                  this.error7=true;
             }
             else if(this.inputinfo2!='登录网银确认'){
                  this.error7=true;
             }
            else if(this.inputinfo3!='自愿承担'){
                  this.error7=true;
             }
             else{
                 this.error7=false;
             }
             //end
        if(!this.error1&&!this.error2&&!this.error3&&!this.error4&&!this.error5&&!this.error6&&!this.error7){
           this.$http.post(this.host+'/uc/member/readQuestionnaire',{}).then(res=>{  
                 this.$Message.success('设置成功')    ;
                 this.modallogin=false;
              })
            }
        },
        getCoin(coinId) {
            for (let i = 0; i < this.coinList.length; i++) {
              if (this.coinList[i].id == coinId) {
                return this.coinList[i];
              }
            }
        },
        mul(a, b) {
            var c = 0,
                d = a.toString(),
                e = b.toString();
            try {
                c += d.split(".")[1].length;
            } catch (f) { }
            try {
                c += e.split(".")[1].length;
            } catch (f) { }
            return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
        },
        div(a, b) {
            var c, d, e = 0,
                f = 0;
            try {
                e = a.toString().split(".")[1].length;
            } catch (g) { }
            try {
                f = b.toString().split(".")[1].length;
            } catch (g) { }
            return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), this.mul(c / d, Math.pow(10, f - e));
        },
        round(v, e) {
            var t = 1;
            for (; e > 0; t *= 10, e--);
            for (; e < 0; t /= 10, e++);
            return Math.round(v * t) / t;
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.disAllowBtn = true
                    //创建
                    var params = {};
                    params['price'] = (this.price + '').replace(/[^\d|.]/g, '') - 0;
                    params['advertiseType'] = this.form.advertiseType;
                    params['coin.id'] = this.form.coin;
                    params['minLimit'] = this.form.minLimit;
                    params['maxLimit'] = this.form.maxLimit;
                    params['timeLimit'] = this.form.timeLimit;
                    params['country'] = this.form.country;
                    if (this.form.fixed == true) {
                        params['priceType'] = 0;
                    } else if (this.form.fixed == false) {
                        params['priceType'] = 1;
                    }
                    params['premiseRate'] = this.form.premisePrice;
                    params['remark'] = this.form.remark;
                    params['number'] = this.form.number;
                    params['pay'] = this.form.payMode;
                    params['jyPassword'] = this.form.priceW;
                    if (this.form.autoReply == true) {
                        params['auto'] = 1;
                    } else if (this.form.autoReply == false) {
                        params['auto'] = 0;
                    }
                    params['autoword'] = this.form.autoword;

                    //修改
                    var isIdparams = {}
                    isIdparams['id'] = this.$route.query.id;
                    isIdparams['advertiseType'] = this.form.advertiseType;
                    isIdparams['price'] = (this.price + '').replace(/[^\d|.]/g, '') - 0;
                    isIdparams['coin.id'] = this.form.coin;
                    isIdparams['minLimit'] = this.form.minLimit;
                    isIdparams['maxLimit'] = this.form.maxLimit;
                    isIdparams['timeLimit'] = this.form.timeLimit;
                    isIdparams['country'] = this.form.country;
                    if (this.form.fixed == true) {
                        isIdparams['priceType'] = 0;
                    } else if (this.form.fixed == false) {
                        isIdparams['priceType'] = 1;
                    }
                    isIdparams['premiseRate'] = this.form.premisePrice;
                    isIdparams['remark'] = this.form.remark;
                    isIdparams['number'] = this.form.number;
                    isIdparams['pay'] = this.form.payMode;
                    isIdparams['jyPassword'] = this.form.priceW;
                    if (this.form.autoReply == true) {
                        isIdparams['auto'] = 1;
                    } else if (this.form.autoReply == false) {
                        isIdparams['auto'] = 0;
                    }
                    isIdparams['autoword'] = this.form.autoword;
                    if (this.isId) {
                        this.$http.post(this.host + '/otc/advertise/update', isIdparams).then(response => {
                            var resp = response.body;
                            if (resp.code == 0) {
                                this.$Message.success(resp.message);
                                var that = this;
                                setTimeout(() => {
                                    that.$router.push('/ordermanagement/myad');
                                },300)
                            } else {
                                this.$Message.error(resp.message);
                                this.disAllowBtn=false
                            }
                            //  this.disAllowBtn=false
                        })
                    } else {
                        //创建
                        this.$http.post(this.host + this.api.otc.createAd, params).then(response => {
                            var resp = response.body;
                            if (resp.code == 0) {
                                this.$Message.success(resp.message);
                                var that = this;
                                setTimeout(() => {
                                    that.$router.push('/ordermanagement/myad');
                                }, 300)
                            } else {
                                this.$Message.error(resp.message);
                            }
                             this.disAllowBtn=false
                        })
                    }

                } else {
                    this.$Message.error('提交失败!');
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        onAreaChange(value){
            for(var i=0;i<this.areas.length;i++){
                if(this.areas[i].zhName == value){
                    this.form.rmb = this.areas[i].localCurrency;
                }
            }
        },
        findCoin(coinId) {
            for (let i = 0; i < this.coinList.length; i++) {
                if (this.coinList[i].id == coinId) {
                    return this.coinList[i].unit
                }
            }
        },
        getAreas(){
            this.$http.post(this.host + this.api.common.area).then(response => {
                var resp = response.body;
                this.areas = resp.data;
                this.form.country = this.areas[0].zhName;
                this.form.rmb = this.areas[0].localCurrency;
            });
        },
        getMember() {
            //获取个人安全信息
            let self = this
            this.$http.post(this.host + '/uc/approve/security/setting').then(response => {
                var resp = response.body;
                console.log(resp)
                if(resp.data.readQuestionnaire==false){
                    this.modallogin=true;
                }
                if (resp.code == 0) {
                    if (resp.data.realName == null || resp.data.realName == "") {
                        this.$Message.success('请先进行实名等一系列认证');
                        self.$router.push('/membercenter/safe');
                    } else if (resp.data.phoneVerified == 0) {
                        this.$Message.success('请先进行手机等一系列认证');
                        self.$router.push('/membercenter/safe');
                    } else if (resp.data.fundsVerified == 0) {
                        this.$Message.success('请先进行资金密码等一系列认证');
                        self.$router.push('/membercenter/safe');
                    }
                      
                     else {
                        this.getAccount()
                    }

                } else if (resp.code == 4000 || resp.code == 3000) {
                    this.$Message.success('请先登录');
                    this.$router.push('/login');
                } 
               
                    else {
                    this.$Message.error(resp.message);
                }
            })
        },
        getAccount() {
            //获取个人账户信息
            let self = this
            this.$http.post(this.host + '/uc/approve/account/setting').then(response => {
                var resp = response.body;
              
           //     console.log('mmp')
                if (resp.code == 0) {
                    if (resp.data.bankVerified == 0 && resp.data.aliVerified == 0 && resp.data.wechatVerified == 0) {
                        this.$Message.success('请至少绑定一种支付方式');
                        self.$router.push('/membercenter/account');
                    }
                    if (resp.data.aliVerified == 1) {
                        this.payModeList[0].isOpen = false
                    }
                    if (resp.data.wechatVerified == 1) {
                        this.payModeList[1].isOpen = false
                    }
                    if (resp.data.bankVerified == 1) {
                        this.payModeList[2].isOpen = false
                    }
                  
                } else {
                    this.msg = resp.message
                    this.$Message.error(resp.message);
                }
            });
       
        },
    },
    mounted() {
    },
    computed: {
        wantHistory() {
            return this.form.advertiseType
        },
        premisePriceHistory() {
            return this.form.premisePrice
        },
        fixedPriceHistory() {
            return this.form.fixedPrice
        },
    },
    watch: {
        wantHistory(newValue, oldValue) {
            if (newValue == '1') {
                this.wantstyle = '卖出';
                this.wantTime = '15-120';
            } else {
                this.wantstyle = '买入';
                this.wantTime = '10-30';
            }
        },
        premisePriceHistory(newValue, oldValue) {
            let lv = (1 + newValue / 100).toFixed(4);
            let cankoNew = this.cankao.replace(/,/g, '').replace(/[^\d|.]/g, '') - 0

            // this.price = (cankoNew * lv).toLocaleString() + ' CNY/' + this.findCoin(this.form.coin);
            this.price = this.round(this.mul(cankoNew, lv), 2).toLocaleString() + ' CNY/' + this.findCoin(this.form.coin);
            this.gongshi = (1 + newValue / 100);

        },
        fixedPriceHistory(newValue, oldValue) {
            // this.price = (newValue - 0).toLocaleString();
            let self=this;
            if(!this.isId){
        
                // this.price = (newValue - 0).toLocaleString(4) + ' CNY/' + this.findCoin(this.form.coin);
                self.price = (newValue - 0).toLocaleString(4);
                
             }else{
                setTimeout(function(){
                    //  self.price = (newValue - 0).toLocaleString(4) + ' CNY/' + self.findCoin(self.form.coin);
                    self.price = (newValue - 0).toLocaleString(4);
               
                },500);
             }
        },

    },
    created() {
        this.getAccount();
        this.getMember();
        this.getAreas();
        let lv = (1 + this.form.premisePrice / 100).toFixed(4);
        //获取币种
        this.$http.post(this.host + '/otc/coin/all').then(response => {
            var resp = response.body;
            if (resp.code == 0) {
                console.log(resp.data[0].marketPrice)
                this.coinList = resp.data;
                this.cankao = resp.data[0].marketPrice + ''
                let cankoNew = this.cankao.replace(/,/g, '').replace(/[^\d|.]/g, '') - 0
                this.price = (cankoNew * lv).toLocaleString() + ' CNY/' + this.findCoin(this.form.coin);
            } else {
                this.$Message.error(resp.message);
            }
        })
        //查看id修改广告
        if (this.$route.query.id) {
            this.isId = true
            this.$http.post(this.host + this.api.otc.adDetail, { id: this.$route.query.id }).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.form.coin = resp.data.coinId + ''
                    this.form.country = resp.data.country.zhName
                    this.cankao = resp.data.marketPrice + ''
                    if (resp.data.priceType == 0) {
                        this.form.fixed = true
                        this.form.fixedPrice = resp.data.price
                    } else if (resp.data.priceType == 1) {
                        this.form.fixed = false
                    }
                    this.price = resp.data.price
                    this.form.advertiseType = resp.data.advertiseType + ''
                    this.form.minLimit = resp.data.minLimit
                    this.form.maxLimit = resp.data.maxLimit
                    this.form.remark = resp.data.remark
                    this.form.timeLimit = resp.data.timeLimit
                    this.form.premisePrice = resp.data.premiseRate
                    this.form.payMode = (resp.data.payMode + '').split(",")
                    // console.log(this.form.payMode)
                    this.form.number = resp.data.number
                    if (resp.data.auto == 1) {
                        this.form.autoReply = true
                    } else if (resp.data.auto == 1) {
                        this.form.autoReply = false
                    }
                    this.form.autoword = resp.data.autoword
                } else {
                    this.$Message.error(resp.message);
                }
            })
        }


    },
}
</script>

<style scoped>
.merchant-icon {
    display: inline-block;
    margin-left: 4px;
    background-size: 100% 100%;
}

.merchant-icon.tips {
    width: 4px;
    height: 22px;
    margin-right: 10px;
    background: #1755FD;
}

.cankao {
    color: #e24a64;
}

#price {
    font-size: 16px;
    color: #e24a64;
}

.send-box .send-form .msg {
    padding-left: 90px;
    margin-bottom: 10px;
    position: relative;
    top: -4px;
}

.formbox {
    width: 50%;
    padding-top: 30px;
}

.send-box {
    background-color: #fff;
    color: #9194a5;
    padding:16px;
}

.send-box .title-box {
    border-bottom: 6px solid #f9f9fb;
    width: 100%;
    padding-bottom: 30px;
}

.send-box .title-box .titles {
    font-size: 16px;
    font-weight: normal;
    color: #242a4a;
    margin-bottom: 15px;
    flex-grow: 2;
    display:inline-block;
}

.send-box .title-box p {
    line-height: 2;
}

.send-box .title-box p a {
    color: #15b3f0;
}

/* common */

.contbox {
    padding-bottom: 30px;
}

.leftmenu a.router-link-active {
    background: #ebeff5;
    color: #00b5f6 !important;
}

.order-table {
    margin-top: 20px;
}

.content-wrap {
    background: #eee;
    min-height: 750px;
}

.container {
    padding-top: 30px;
    margin: 0 auto;
}

.contbox {
    background: #fff;
}







































































































/* cont */
</style>


