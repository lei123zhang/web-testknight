<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-content">
            <Card :bordered="false">
                <div class="form-box">
                    <Form ref="formInline" :model="formInline" :rules="ruleInline" label-position="left" :label-width="108">
                        <FormItem style="text-align:center;">
                            <ButtonGroup>
                                <Button v-for="(list,index) in buttonLists" :key="list.text" class="btStyle" :class="{ active:changeActive == index}" @click="actives(index)">{{list.text}}</Button>
                            </ButtonGroup>
                        </FormItem>
                        <FormItem prop="user" :label="key">
                            <Input type="text" v-model="formInline.user" :placeholder="key" size="large">

                            </Input>
                        </FormItem>
                        <FormItem prop="code" :label="code">
                            <Input style="width:68%" type="text" v-model="formInline.code" :placeholder="code" size="large">

                            </Input>
                            <input id="sendCode" @click="sendCode()" type="Button" value="发送验证码">

                            </input>
                        </FormItem>
                        <Modal v-model="modalV" :mask-closable="false">
                            <p slot="header" style="text-align:center">请验证</p>
                            <div style="text-align:center">
                                <div id="captcha">
                                    <p id="wait" class="show">正在加载验证码......</p>
                                </div>
                                <p id="notice" class="hide">请先完成验证</p>
                            </div>
                            <p slot="footer"></p>
                        </Modal>
                        <FormItem prop="password" label="请输入新密码">
                            <Input type="password" v-model="formInline.password" placeholder="请输入新密码" size="large">

                            </Input>
                        </FormItem>
                        <FormItem prop="repassword" label="请再次确认密码">
                            <Input type="password" v-model="formInline.repassword" placeholder="请再次确认密码" size="large">

                            </Input>
                        </FormItem>
                        <Button style="width:100%;" type="primary" size="large" long @click="handleSubmit('formInline')">保存</Button>
                        <div class="forget-control">
                            <p>已有账号？请</p>
                            <router-link to="login"><a href="#" class="register">点击登录&gt;&gt;</a></router-link>
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
                        "text":"重置手机密码"
                    },
                    {
                        "text":"重置邮箱密码"
                    }
                ],
                changeActive:0,
                countdown:60,
                modalV:false,
                _captchaResult:null,
                _captchaReset:null,
                formInline: {
                    user: '',
                    code:'',
                    password: '',
                    repassword:''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入新密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
                    ],
                    repassword: [
                        { validator: validateRepassword, trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
                    ]
                },
                key:'',
                keyCode:'',
                code:''
            }
        },
        watch:{
            changeActive:function(val){
                this.$refs['formInline'].resetFields();
　　　　　　 }
        },
        created:function(){
            this.init();
            this.actives(this.changeActive);
        },
        methods: {
            init(){
                this.$store.state.HeaderActiveName='1-4';
                this.initGtCaptcha();
            },
            initGtCaptcha(){
                var that = this;
                this.$http.get(this.host + this.api.uc.captcha)
                .then(function(res){
                    window. initGeetest({
                        // 以下配置参数来自服务端 SDK
                        gt: res.body.gt,
                        challenge: res.body.challenge,
                        offline: !res.body.success,//表示用户后台检测极验服务器是否宕机
                        new_captcha: res.body.new_captcha,//用于宕机时表示是新验证码的宕机

                        product:"popup",
                        width:"100%"
                    }, function (captchaObj){
                        // 将验证码加到id为captcha的元素里，同时会有三个input的值用于表单提交
                        captchaObj.appendTo($("#captcha"));
                        captchaObj.onReady(function () {
                            $("#wait").hide();
                        });
                        captchaObj.onSuccess(function (){
                            that._captchaResult = captchaObj.getValidate();
                            that.afterValidate();
                        });
                        that._captchaReset=captchaObj;
                    });
                })
            },
            actives:function(index){
                this.changeActive=index;
                if(this.changeActive==0){
                    this.key='手机号';
                    this.keyCode=0;
                    this.code='短信验证码';
                    this.ruleInline.user[0].message='请输入手机号';
                    this.ruleInline.code[0].message='请输入短信验证码';
                }else{
                    this.key='邮箱';
                    this.keyCode=1;
                    this.code='邮箱验证码';
                    this.ruleInline.user[0].message='请输入邮箱';
                    this.ruleInline.code[0].message='请输入邮箱验证码';
                }
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let param={
                            'account':this.formInline.user,
                            'code':this.formInline.code,
                            'mode':this.keyCode,
                            'password':this.formInline.password,
                        };
                        this.$http.post(this.host+this.api.uc.reset,param).then(response => {
                            var resp=response.body;
                            if(resp.code==0){
                                this.$Message.success('重置密码成功');
                                var _this=this;
                                setTimeout(() => {
                                    _this.$router.push('login');
                                },3000)
                            }else{
                                this.$Message.errer('重置密码失败'); 
                            }
                        })
                    } 
                })
            },
            settime(){
                var obj=document.getElementById('sendCode');
                if(this.countdown == 0) {
                    obj.removeAttribute("disabled");
                    obj.value = "发送验证码";
                    this.countdown = 60;
                    return;
                } else {
                    obj.setAttribute("disabled", true);
                    obj.value = this.countdown;
                    this.countdown--;
                }
                var that=this;
                setTimeout(function() {
                    that.settime()
                }, 1000)

            },
            sendCode(){
                var account=this.formInline.user;
                if(account==""){
                    this.countdown=0;
                    this.$Notice.error({
                        title: '温馨提示',
                        desc: this.ruleInline.user[0].message
                    });
                    return;
                };
                this.modalV = true;
            },
            afterValidate(){
                this.modalV = false;
                this.settime();
                var result = this._captchaResult;
                var params = {};
                params["account"] = this.formInline.user;
                 params["country"] ='中国';
                // params["geetest_challenge"] = this._captchaResult.geetest_challenge;//极验验证二次验证表单数据 chllenge
                // params["geetest_validate"] = this._captchaResult.geetest_validate;//极验验证二次验证表单数据 validate
                // params["geetest_seccode"] = this._captchaResult.geetest_seccode;//极验验证二次验证表单数据 seccode
                if (!result) {
                    $("#notice").show();
                    setTimeout(function () {
                        $("#notice").hide();
                    }, 2000);
                }else{
                    if(this.changeActive==0){
                        this.sendCodeHost(this.api.uc.mobile,params)
                    }else{
                        this.sendCodeHost(this.api.uc.email,params)
                    }
                }
            },
            sendCodeHost(api,params){
                this.$http.post(this.host+api,params).then(response => {
                    var resp=response.body;
                    if(resp.code==0){
                        this.$Notice.success({
                            title: '温馨提示',
                            desc: '请注意查收验证码'
                        });
                    }else{
                        this.countdown=0;
                        this.$Notice.error({
                            title: '温馨提示',
                            desc: resp.message
                        });
                        this._captchaReset.reset();
                    }
                })
            }
        }
    }
</script>
<style>
/* 验证码 */
  #captcha {
    width: 100%;
    display: inline-block;
  }
  .show {
    display: block;
  }
  .hide {
    display: none;
  }
  #notice {
    color: red;
  }
  #wait {
    text-align: left;
    color: #666;
    margin: 0;
  }
/*  */
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
#sendCode {
    position: absolute;
    border: 0;
    top: 0;
    right: 0;
    width: 30%;
    height:100%;
    color: #D5851D;
    cursor: pointer;
}

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

.form-box {
    /* width: 756px;
    height: 560px; */
    /* margin: 0 auto;
    background: #fff; */
    padding: 50px 70px;
}

/* .form-box .formInput{
    width: 486px;
}
.form-box .ivu-form-item-error-tip{
    float: right;
} */
.form-box .ivu-form-item {
    /* margin-bottom: 12px;实际 */
    /* margin-bottom: 20px;
    vertical-align: top; */
    /* zoom: 1; */
}

.form-box .dv_handler_ok_bg{
    background:#66cc66;
    border-radius:4px !important;
}

.form-box .forgetCode{
    font-size:16px;
    color:#78b8f6;
    float: right;
    margin-bottom: 20px;
}

.form-box .forget-control {
    margin-top: 16px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: center;
    font-size: 16px;
}

</style>
