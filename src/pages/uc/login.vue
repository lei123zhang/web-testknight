<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-content">
            <Card :bordered="false" class="conBox">
                <h5 class="login-title">欢迎登录</h5>
                <div class="form-box">
                    <Form ref="formInline" :model="formInline" :rules="ruleInline" label-position="left" :label-width="50">
                        <FormItem prop="user" label="账号">
                            <Input type="text" v-model="formInline.user" placeholder="请输入邮箱或手机" size="large">
                            </Input>
                        </FormItem>
                        <FormItem prop="password" label="密码">
                            <Input type="password" v-model="formInline.password" placeholder="请输入密码" size="large">
                            </Input>
                        </FormItem>
                        <!-- <div>
                            <label>验证</label>
                            <div id="captcha">
                                <p id="wait" class="show">正在加载验证码......</p>
                            </div>
                        </div>
                        <br>
                        <p id="notice" class="hide">请先完成验证</p> -->
                        <router-link to="/findPwd" class="forgetCode">
                            忘记密码？
                        </router-link>
                        <Button type="primary" @click.prevent="handleSubmit('formInline')" long size="large">立即登录</Button>
                        <div class="forget-control">
                            <p>没有账号？请</p>
                            <router-link to="register"><a href="#" class="register">点击注册&gt;&gt;</a></router-link>
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
    components:{

    },
    data() {
        return {
            // _captchaResult:null,
            // _captchaReset:null,
            formInline: {
                user: '',
                password: ''
            },
            ruleInline: {
                user: [
                    { required: true, message: '请输入帐号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度不小于6字节', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        // initGtCaptcha(){
        //     var that = this;
        //     this.$http.get(this.host + this.api.uc.captcha)
        //     .then(function(res){
        //         window. initGeetest({
        //             // 以下配置参数来自服务端 SDK
        //             gt: res.body.gt,
        //             challenge: res.body.challenge,
        //             offline: !res.body.success,//表示用户后台检测极验服务器是否宕机
        //             new_captcha: res.body.new_captcha,//用于宕机时表示是新验证码的宕机

        //             product:"popup",
        //             width:"100%"
        //         }, function (captchaObj){
        //             // 将验证码加到id为captcha的元素里，同时会有三个input的值用于表单提交
        //             captchaObj.appendTo($("#captcha"));
        //             captchaObj.onReady(function () {
        //                 $("#wait").hide();
        //             });
        //             captchaObj.onSuccess(function (){
        //                 that._captchaResult = captchaObj.getValidate();
        //             });
        //             that._captchaReset=captchaObj;
        //         });
        //     })
        // },
        logout() {
            this.$http.post(this.host + '/uc/logout', {}).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    localStorage.setItem('MEMBER', JSON.stringify(null));
                    localStorage.setItem('TOKEN', null);
                } else {
                    // this.$Message.error(resp.message);
                    console.log(resp.message);
                }
            })
        },
        handleSubmit(formInline) {
            // var result = this._captchaResult;
            // if (!result) {
            //     $("#notice").show();
            //     setTimeout(function () {
            //         $("#notice").hide();
            //     }, 2000);
            // }else{
                this.$refs[formInline].validate((valid) => {
                    if (valid) {
                        var params = {
                            'username':this.formInline.user,
                            'password':this.formInline.password
                            // 'geetest_challenge': result.geetest_challenge,
                            // 'geetest_validate': result.geetest_validate,
                            // 'geetest_seccode': result.geetest_seccode
                        };
                        this.$http.post(this.host + this.api.uc.login, params).then(response => {
                            var resp = response.body;
                              
                            if (resp.code == 0) {
                                console.log(response)
                                this.$Message.success('登录成功');
                                this.$store.commit('setMember',resp.data);
                                this.$store.state.username = JSON.parse(localStorage.getItem("MEMBER")).username;
                               
                                var that = this;
                                var href;
                                if (this.$route.params.returnUrl != undefined) {
                                    href = 'http://' + this.$route.params.returnUrl;
                                } else {
                                    href = "/";
                                }
                                setTimeout(() => {
                                    location.href = href;
                                }, 500)
                            } else {
                                this.$Message.error(resp.message);
                                this._captchaReset.reset();
                            }
                        })
                    } else {
                        // this.$Message.error('登录失败!');
                    }
                })
           // }
        }
    },
    created () {
        this.logout();
     //   this.initGtCaptcha();
    }
}
</script>
<style scoped>
/* 验证码 */
#captcha {
    width: 530px;
    display: inline-block;
}
.show {
    display: block;
}
.hide {
    display: none;
    margin-left: 56px;
}
#notice {
    color: red;
}
label {
    vertical-align: top;
    line-height: 50px !important;
    display: inline-block;
    width: 50px;
    text-align: center;
    font-size:12px;
}
#wait {
    text-align: left;
    color: #666;
    margin: 0;
}
/*  */
.login {
    width: 100%;
    height:100%;
    background:url(../../assets/img/login/login_background.png) no-repeat center;
    background-size:cover;
    background-position:center;
}

.login-content {
    width: 756px;
    padding: 70px 0;
    margin: 0 auto;
}
.login-content .conBox{
    height:610px;
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