<template>
     <div class="login" @keydown.enter="handleSubmit">
        <div class="login-content">
            <Card :bordered="false" class="conBox">
                <div class="form-box">
                    <Form ref="formInline" :model="formInline" :rules="ruleInline" label-position="left" :label-width="90">
                        <FormItem style="text-align:center;">
                            <Button v-for="(list,index) in buttonLists" :key="list.text" class="btStyle" :class="{active:changeActive == index}" @click="actives(index)">{{list.text}}</Button>
                        </FormItem>
                        <FormItem prop="username" label="用户名">
                            <Input type="text" v-model="formInline.username" placeholder="用户名">
                            </Input>
                        </FormItem>
                        <!-- <FormItem prop="select" label="国籍">
                            <Select v-model="formInline.select" placeholder="国籍" size="large" @on-change="getPhoneCode">
                                <Option v-for="item in cityList" :value="item.zhName" :key="item.zhName">{{ item.zhName }}</Option>
                            </Select>
                        </FormItem> -->
                        <FormItem prop="user" :label="key">
                            <Input type="text" style="width:100%" v-model="formInline.user" :placeholder="key" size="large">
                                <!-- <Select v-model="formInline.userN" slot="prepend" style="width: 110px" v-show="key==='手机号'">
                                    <Option v-for="itemCode in cityList" :value="itemCode.areaCode" :key="itemCode.areaCode">{{ itemCode.areaCode }}</Option>
                                </Select> -->
                            </Input>
                        </FormItem>
                        <FormItem prop="code" v-show="showCode" label="短信验证码">
                            <Input style="width:100%" type="text" size="large" v-model="formInline.code" placeholder="短信验证码">
                                <!-- <span slot="append" id="sendCode" @click="sendCode()"><a>发送验证码</a></span> -->
                                <Button slot="append" @click="sendCode()" :disabled="canGetIdentifyCode">
                                    {{ gettingIdentifyCodeBtnContent }}
                                </Button>
                            </Input>
                            <!-- <input id="sendCode" @click="sendCode()" type="Button" value="发送验证码">
                            </input> -->
                        </FormItem>
                        <FormItem prop="password" label="登录密码">
                            <Input type="password" v-model="formInline.password" placeholder="登录密码" size="large">
                            </Input>
                        </FormItem>
                        <FormItem prop="repassword" label="确认密码">
                            <Input type="password" v-model="formInline.repassword" placeholder="确认密码" size="large">
                            </Input>
                        </FormItem>
                        <!-- <FormItem prop="agentcode" label="推荐码">
                        <Input type="text" v-model="formInline.agentcode" placeholder="推荐码" size="large">

                         </Input>
                         </FormItem> -->
                        <!-- <Modal v-model="modalV" :mask-closable="false">
                            <p slot="header" style="text-align:center">请验证</p>
                            <div style="text-align:center">
                                <div>
                                    <div id="captchaV">
                                        <p id="waitV" class="show">正在加载验证码......</p>
                                    </div>
                                </div>
                                <p id="noticeV" class="hide">请先完成验证</p>
                            </div>
                            <p slot="footer"></p>
                        </Modal>
                        <div v-show="changeActive == 1">
                            <label class="verifyW">验证</label>
                            <div id="captcha">
                                <p id="wait" class="show">正在加载验证码......</p>
                            </div>
                        </div>
                        <br>
                        <p id="notice" class="hide">请先完成验证</p> -->
                        <FormItem prop="checkbox" style="float:right;margin-top:-20px;margin-bottom:-4px">
                            <Checkbox v-model="formInline.checkbox" label="我已阅读并同意" @on-change="changeCheckbox" style="color:#979797;font-size:16px;">我已阅读并同意</Checkbox>
                            <router-link to="/useragreement" style="color:#0096ea;font-size:16px;"><用户协议></router-link>
                        </FormItem>
                        <Button style="width:100%;" type="primary" size="large" long @click="handleSubmit('formInline')">注册</Button>
                        <div class="forget-control">
                            <p>已有账号？请</p>
                            <router-link to="/login"><a href="#">点击登录&gt;&gt;</a></router-link>
                        </div>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>
<script>
import gtInit from '../../assets/js/gt.js';
import $ from 'jquery';
export default {
        data () {
            const validateUser = (rule, value, callback) => {
                if(this.changeActive==0){
                    var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
                    if(value==''){
                        callback(new Error('请输入手机号'))
                    }else if(!reg.test(this.formInline.user)){
                        callback(new Error('手机号码格式不正确,请重新输入'));
                    }else{
                        callback();
                    }
                }else{
                    var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
                    if(value==''){
                        callback(new Error('请输入邮箱'))
                    }else if(!reg.test(this.formInline.user)){
                        callback(new Error('邮箱格式不正确,请重新输入'));
                    }else{
                        callback();
                    }
                }
            };
            const validateRepassword = (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请输入确认密码'));
                    } else if (value !== this.formInline.password) {
                        callback(new Error('两次密码输入不一致!'));
                    } else {
                        callback();
                    }
            };
            return {
                buttonLists:[
                    {
                        "text":"手机号注册"
                    },
                    {
                        "text":"邮箱注册"
                    }
                ],
                modalV:false,
                _captchaResult:null,
                _captchaReset:null,
                // cityList:[],
                changeActive:0,
                showCode:true,
                hasGetIdentifyCode: false,  // 是否点了获取验证码
                canGetIdentifyCode: false,  // 是否可点获取验证码
                gettingIdentifyCodeBtnContent: '发送验证码',  // “获取验证码”按钮的文字
                checkbox:false,
                formInline: {
                    username:'',
                    userN: '86',
                    select:'中国',
                    user: '',
                    code:'',
                    password: '',
                    repassword:'',
                    agentcode:''
                },
                ruleInline: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { type: 'string', min: 3, max: 15, message: '用户名长度不能少于3位,多于15位', trigger: 'blur' }
                    ],
                    select: [
                        { required: true, message: '请选择国家', trigger: 'blur' }
                    ],
                    user: [
                        { required: true, validator: validateUser, trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请输入短信验证码', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入登录密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
                    ],
                    repassword: [
                        { required: true, validator: validateRepassword, trigger: 'blur' }
                    ],
                },
                key:'',
                // code:''
            }
        },
        watch:{
            changeActive:function(val){
                this.$refs['formInline'].resetFields();
              
　　　　　　 }
        },
        created:function(){
            this.actives(this.changeActive);
        },
        methods: {
            getPhoneCode(value){
                for (var i = 0; i < this.cityList.length; i++) {
                    if ((this.cityList[i].zhName == value)) {
                        this.formInline.userN = this.cityList[i].areaCode;
                    }
                }
            },
            actives:function(index){
                this.changeActive=index;
                if(this.changeActive==0){
                    this.showCode=true;
                    this.key='手机号';
                    this.ruleInline.code=[{ required: true, message: '请输入短信验证码', trigger: 'blur' }];
                }else{
                    this.showCode=false;
                    this.key='邮箱';
                    this.ruleInline.code=[];
                }
            },
            changeCheckbox(checkbox){
                this.checkbox=!this.checkbox;
            },
            handleSubmit(name) {             
                if(this.changeActive==1){ 
                        this.$refs[name].validate((valid) => {  
                            if (valid) { 
                                if(this.checkbox==true){
                                    var paramsE={
                                        email:this.formInline.user,
                                        password:this.formInline.repassword,
                                        username:this.formInline.username,
                                        country:this.formInline.select
                                    };   
                                    this.handleSubmitHost('/uc/register/email',paramsE);
                                     
                                }else{
                                   this.$Message.error('请点击同意')       
                                    this.$Notice.error({
                                        title: '温馨提示',
                                        desc: resp.message
                                    });
                                }
                            }
                        })
                    
                }else{
                    this.$refs[name].validate((valid) => {     
                        if (valid) {
                            if(this.checkbox==true){     
                                var paramsP={};
                                paramsP['phone']=this.formInline.user;
                                paramsP['username']=this.formInline.username;
                                paramsP['password']=this.formInline.repassword;
                                paramsP['code']=this.formInline.code;
                                paramsP['country']=this.formInline.select;
                                this.handleSubmitHost('/uc/register/phone',paramsP);                     
                            }else{             
                                this.$Message.error('请点击同意')            
                                this.$Notice.error({
                                    title: '温馨提示',
                                    desc: resp.message
                                });
                            }
                        }
                    })
                }
            },
            handleSubmitHost(api,params){
                this.$http.post(this.host+api,params).then(response => {
                    var resp=response.body;
                    console.log(resp)
                    if(resp.code==0){
                        this.$Notice.success({
                            title: '温馨提示',
                            desc: resp.message
                        });
                        var that=this;
                        setTimeout(() => {
                            that.$router.push('login');
                        },3000)
                    }else{
                        this.$Notice.error({
                            title: '温馨提示',
                            desc: resp.message
                        });
                        this._captchaReset.reset();
                       
                    }
                })
            },
            // afterValidate(){
            //     this.modalV = false;
            //     var result = this._captchaResult;
            //     if (!result) {
            //         $("#noticeV").show();
            //         setTimeout(function () {
            //             $("#noticeV").hide();
            //         }, 2000);
            //     }else{
            //         this.canGetIdentifyCode = true;
            //         let countdown = 60;
                    
            //         let timer = setInterval(() => {
            //             if (countdown >= 0) {
            //                 this.gettingIdentifyCodeBtnContent = countdown + '秒后重试';
            //                 countdown -= 1;
            //             } else {
            //                 clearInterval(timer);
            //                 this.gettingIdentifyCodeBtnContent = '发送验证码';
            //                 this.canGetIdentifyCode = false;
            //                    this.init();
            //             }
            //         }, 1000);
            //         var params = {};
            //         params["phone"] = this.formInline.user;
            //         params["country"] = this.formInline.select;//国家中文名
            //         params["geetest_challenge"] = result.geetest_challenge;
            //         params["geetest_validate"] = result.geetest_validate;
            //         params["geetest_seccode"] = result.geetest_seccode;
            //         this.$http.post(this.host+'/uc/mobile/code',params).then(response => {
            //             var resp=response.body;
            //             if(resp.code==0){
            //                 this.$Notice.success({
            //                     title: '温馨提示',
            //                     desc: resp.message
            //                 });
            //             }else{
            //                 clearInterval(timer);
            //                 this.gettingIdentifyCodeBtnContent = '发送验证码';
            //                 this.canGetIdentifyCode = false;
            //                 this.$Notice.error({
            //                     title: '温馨提示',
            //                     desc: resp.message
            //                 });
            //                 this._captchaReset.reset();
                          
            //             }
            //         })
            //     }
            // },
             getcode(){
             let  nums=60;    
              this.canGetIdentifyCode = true;     
              if(this.formInline.user==''){
                     this.formInline.user='';
                     this.$Notice.error({
                            title: '请填写手机号'
                                       });
                      this.canGetIdentifyCode=false;
              }
              else if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.formInline.user))){
                      this.formInline.user='';
                      this.$Notice.error({
                            title: '请填写正确的手机号'
                                        });
                       this.canGetIdentifyCode=false;
              }
              else{
                   this. sendCode();
                    let timer = setInterval(() => {
                        if (nums >= 0) {
                            this.gettingIdentifyCodeBtnContent = nums + '秒后重试';
                            nums -= 1;
                        } else {
                            clearInterval(timer);
                            this.gettingIdentifyCodeBtnContent = '发送验证码';                        
                        }
                    }, 1000);  
              }   
               },
            sendCode(){ 
              let _data={
                        phone:this.formInline.user,
                        country:'中国'
                       }                  
                     this.$http.post(this.host+'/uc/mobile/code',_data).then(res=>{        
                         let msg=res.body.message;
                            if(res.body.code=='0'){   
                                   this.$Notice.success({
                                        title: msg
                                                });
                                                  }
                            else{                 
                               this.$Notice.error({
                                 title: msg
                                  });
                                this.codedis=false;    
                            }
                     },
                     err=>{
                         alert('........///...../..../') 
                     })
                // this.hasGetIdentifyCode = true;
              

                // this.canGetIdentifyCode = true;
                //     let countdown = 60;
                    
                //     let timer = setInterval(() => {
                //         if (countdown >= 0) {
                //             this.gettingIdentifyCodeBtnContent = countdown + '秒后重试';
                //             countdown -= 1;
                //         } else {
                //             clearInterval(timer);
                //             this.gettingIdentifyCodeBtnContent = '发送验证码';
                //             this.canGetIdentifyCode = false;
                //                this.init();
                //         }
                //     }, 1000);
                // if(mobilePhone==""){
                //     this.$Notice.error({
                //         title: '温馨提示',
                //         desc: '请输入手机号'
                //     });
                //     return;
                // }
               // var country = this.formInline.select;
                // if(country==""){
                //     this.$Notice.error({
                //         title:'温馨提示',
                //         desc: '请填写国家'
                //     });
                //     return;
                // }
                // this.modalV = true;
            }

        }
    }
    
</script>
<style scoped>
/* 验证码 */
#captcha,#captchaV {
    width: 494px;
    display: inline-block;
}
.show {
    display: block;
}
.hide {
    display: none;
    margin-left: 90px;
}
#notice {
    color: red;
}

#wait,#waitV {
    text-align: left;
    color: #666;
    margin: 0;
}
.verifyW {
    vertical-align: top;
    line-height: 50px !important;
    display: inline-block;
    width: 86px;
    text-align: center;
    font-size:12px;
}
/*  */
.login {
    width: 100%;
    height: 100%;
    background:url(../../assets/img/login/login_background.png) no-repeat center;
    background-size: cover;
}

.login-content {
    width: 756px;
    padding: 70px 0;
    margin: 0 auto;
}

.login-title {
    text-align: center;
    margin-top: 24px;
    font-size: 2.25em;
    color: #48a5f5;
    font-weight: normal;
}
.login-content .conBox{
    height:640px;
}
.form-box {
    /* width: 756px;
    height: 560px; */
    /* margin: 0 auto;
    background: #fff; */
    padding: 6px 70px;
}

.form-box .btStyle{
    width: 174px;
    height: 42px;
    font-size: 1.125em;
    color: #88befa;
    background:#fff;
    margin-bottom: 24px;
}

.form-box .active{
    background: #0199ef;
    color: #fff;
}

.form-box .ivu-form-item {
    /* margin-bottom: 20px;
    vertical-align: top;
    zoom: 1; */
}

/* .form-box span {
    margin-left:20px;
    font-size: 16px;
    color: #909090;
} */

/* .form-box .loginBt{
    height:56px;
    font-size:20px;
    color:#ffffff;
} */

.form-box .forget-control {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: center;
    font-size: 16px;
}
</style>