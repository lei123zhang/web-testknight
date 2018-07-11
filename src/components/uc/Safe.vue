<template>
    <div class="nav-right padding-right-clear">
        <div class="col-xs-12 padding-right-clear padding-left-clear rightarea user account-box">
            <div class="col-xs-12 rightarea-con">
                <div class="user-top-icon">
                    <div class="user-icons">
                        <div class="user-face user-avatar-public">
                            <span class="user-avatar-in">{{usernameS}}</span>
                        </div>
                        <div class="user-name" style="line-height:52px">
                            <!-- <span>AppDOUYA</span> -->
                            {{user.username}}
                            <!-- <span class="uid">UID: 17095329</span> -->
                        </div>
                    </div>
                    <Row class="user-right">
                        <Col span="20">
                         <Row  type="flex" justify="center" class="code-row-bg">
                             <Col span='7'> 
                                 <h3 style="font-size: 21px;">{{money.all}} CNY</h3>
                                 <p style="color:#ccc">账户总资产</p> 
                             </Col>
                             <Col span='5' offset='2'>
                                 <h3 style="font-size: 18px;">{{changedata.transfer}}</h3>
                                 <p style="color:#ccc">交易单数</p> 
                             </Col>
                             <Col span='5'>
                                  <h3 style="font-size: 18px;">{{changedata.withdraw}}</h3>
                                  <p style="color:#ccc">提现总单数</p>
                             </Col>
                             <Col span='5'>
                                 <h3 style="font-size: 18px;">{{changedata.order}}</h3>
                                  <p style="color:#ccc">订单总数</p>
                             </Col>
                         </Row>
                        </Col>
                    </Row>
                </div>
                <section class="accountContent">
                    <div class="account-in">
                        <!-- 1 -->
                        <!-- <div class="account-item">
                            <div class="account-item-in">
                                <Icon type="person" style="font-size: 18px;color: #00b5f6;"></Icon>
                                <span class="card-number">昵称</span>
                                <p class="bankInfo" style="color: grey;">
                                    bearbaby
                                </p>
                                <span>已设置</span>
                            </div>
                        </div> -->

                        <!-- 6 -->
                        <div class="account-item">
                            <div class="account-item-in">
                                <Icon type="card" style="font-size: 18px;color: #00b5f6;"></Icon>
                                <span class="card-number">实名认证</span>
                                <p v-if="user.realVerified==1" class="bankInfo" style="color: grey;">{{user.realName}}</p>
                                <p v-else class="bankInfo" style="color: grey;">
                                    为保障您的账户安全，请完成实名认证后方可交易操作！
                                </p>
                                <span v-if="user.realVerified==1">已绑定</span>
                                <span v-else-if="user.realAuditing==1">审核中</span>
                                <a v-else class="btn" @click="showItem(6)">绑定</a>
                            </div>
                            <div class="account-detail" v-show="choseItem==6">
                                <div class="detail-list">
                                    <Form ref="formValidate6" :model="formValidate6" :rules="ruleValidate" :label-width="85">
                                        <!-- 真实姓名 -->
                                        <FormItem label="真实姓名" prop="realName">
                                            <Input v-model="formValidate6.realName" size="large"></Input>
                                        </FormItem>
                                        <!-- 身份证号 -->
                                        <FormItem label="身份证号" prop="idCard">
                                            <Input v-model="formValidate6.idCard" size="large"></Input>
                                        </FormItem>
                                        <div style="height:350px;">
                                            <Col span="8">
                                                <input type="hidden" name="imgPreview" :value="imgPreview" />
                                                <div>上传身份证正面照</div>
                                                <img id="frontCardImg" :src="frontCardImg" style="width:250px;height:150px;">
                                                <div class="acc_sc">
                                                    <Upload ref="upload" :on-success="frontHandleSuccess" :headers="uploadHeaders" :action="uploadUrl">
                                                        <Button type="ghost" icon="ios-cloud-upload-outline">点击上传</Button>
                                                    </Upload>
                                                </div>
                                            </Col>
                                            <Col span="8">
                                                <input type="hidden" name="imgNext" :value="imgNext" />
                                                <div>上传身份证反面照</div>
                                                <img id="backCardImg" :src="backCardImg" style="width:250px;height:150px;">
                                                <div class="acc_sc">
                                                    <Upload ref="upload" :on-success="backHandleSuccess" :headers="uploadHeaders" :action="uploadUrl">
                                                        <Button type="ghost" icon="ios-cloud-upload-outline">点击上传</Button>
                                                    </Upload>
                                                </div>
                                            </Col>
                                            <Col span="8">
                                                <input type="hidden" name="imgLast" :value="imgLast" />
                                                <div>上传手持身份证照</div>
                                                <img id="handCardImg" :src="handCardImg" style="width:250px;height:150px;">
                                                <div class="acc_sc">
                                                    <Upload ref="upload" :on-success="handHandleSuccess" :headers="uploadHeaders" :action="uploadUrl">
                                                        <Button type="ghost" icon="ios-cloud-upload-outline">点击上传</Button>
                                                    </Upload>
                                                </div>
                                            </Col>
                                        </div>
                                        <!-- Button -->
                                        <FormItem>
                                            <Button type="primary" @click="handleSubmit('formValidate6')" style="margin-left: -85px">保 存</Button>
                                            <Button type="ghost" @click="handleReset('formValidate6')" style="margin-left: 8px">重置</Button>
                                        </FormItem>
                                    </Form>
                                </div>
                            </div>
                        </div>
                        <!-- 2 -->
                        <div class="account-item">
                            <div class="account-item-in">
                                <Icon type="email" style="font-size: 18px;color: #00b5f6;"></Icon>
                                <span class="card-number">邮箱</span>
                                <p v-if="user.emailVerified==1" class="bankInfo" style="color: grey;">
                                    {{user.email}}
                                </p>
                                <p v-else class="bankInfo" style="color: grey;">
                                    绑定邮箱
                                </p>
                                <span v-if="user.emailVerified==1">已绑定</span>
                                <a v-else class="btn" @click="showItem(2)">绑定</a>
                            </div>
                            <div class="account-detail" v-show="choseItem==2">
                                <div class="detail-list">
                                    <Form ref="formValidate2" :model="formValidate2" :rules="ruleValidate" :label-width="120">
                                        <!-- mail -->
                                        <FormItem label="邮箱" prop="mail">
                                            <Input v-model="formValidate2.mail" size="large"></Input>
                                        </FormItem>
                                        <!-- 登录密码 -->
                                        <FormItem label="网登录密码" prop="password">
                                            <Input v-model="formValidate2.password" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- 邮箱验证码 -->
                                        <FormItem label="邮箱验证码" prop="vailCode1">
                                            <Input v-model="formValidate2.vailCode1" size="large">
                                            <!-- <Button slot="append">点击获取</Button> -->
                                            <div class="timebox" slot="append">
                                                <Button @click="send(1)" :disabled="sendMsgDisabled1">
                                                    <span v-if="sendMsgDisabled1">{{time1+'秒'}}</span>
                                                    <span v-if="!sendMsgDisabled1">点击获取</span>
                                                </Button>
                                            </div>
                                            </Input>
                                        </FormItem>
                                        <!-- Button -->
                                        <FormItem>
                                            <Button type="primary" @click="handleSubmit('formValidate2')">保 存</Button>
                                            <Button type="ghost" @click="handleReset('formValidate2')" style="margin-left: 8px">重置</Button>
                                        </FormItem>
                                    </Form>
                                </div>
                            </div>
                        </div>
                        <!-- 3 -->
                        <div class="account-item">
                            <div class="account-item-in">
                                <Icon type="ios-telephone" style="font-size: 18px;color: #00b5f6;"></Icon>
                                <span class="card-number">手机</span>
                                <p v-if="user.phoneVerified==1" class="bankInfo" style="color: grey;">
                                    {{user.mobilePhone}}
                                </p>
                                <p v-else class="bankInfo" style="color: grey;">
                                    绑定手机
                                </p>
                                <span v-if="user.phoneVerified==1">已绑定</span>
                                <a class="btn" v-else @click="showItem(3)">绑定</a>
                            </div>
                            <div class="account-detail" v-show="choseItem==3">
                                <div class="detail-list">
                                    <Form ref="formValidate3" :model="formValidate3" :rules="ruleValidate" :label-width="120">
                                        <!-- 手机 -->
                                        <!-- <FormItem label="国家" prop="country">
                                            <Input v-model="formValidate3.country" size="large"></Input>
                                        </FormItem> -->
                                        <!-- 手机 -->
                                        <FormItem label="手机" prop="mobile">
                                            <Input v-model="formValidate3.mobile" size="large"></Input>
                                        </FormItem>
                                        <!-- 登录密码 -->
                                        <FormItem label="登录密码" prop="password">
                                            <Input v-model="formValidate3.password" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- 手机验证码 -->
                                        <FormItem label="手机验证码" prop="vailCode2">
                                            <Input v-model="formValidate3.vailCode2" size="large">
                                            <!-- <Button slot="append">点击获取</Button> -->
                                            <div class="timebox" slot="append">
                                                <Button @click="send(2)" :disabled="sendMsgDisabled2">
                                                    <span v-if="sendMsgDisabled2">{{time2+'秒'}}</span>
                                                    <span v-if="!sendMsgDisabled2">点击获取</span>
                                                </Button>
                                            </div>
                                            </Input>
                                        </FormItem>
                                        <!-- Button -->
                                        <FormItem>
                                            <Button type="primary" @click="handleSubmit('formValidate3')">保 存</Button>
                                            <Button type="ghost" @click="handleReset('formValidate3')" style="margin-left: 8px">重置</Button>
                                        </FormItem>
                                    </Form>
                                </div>
                            </div>
                        </div>
                        <!-- 4 -->
                        <div class="account-item">
                            <div class="account-item-in">
                                <Icon type="locked" style="font-size: 18px;color: #00b5f6;"></Icon>
                                <span class="card-number">登录密码</span>
                                <p class="bankInfo" style="color: grey;">
                                    登录平台时使用
                                </p>

                                <a class="btn" v-if="user.phoneVerified==0" @click="noPhone">修改</a>
                                <a class="btn" v-else @click="showItem(4)">修改</a>
                            </div>
                            <div class="account-detail" v-show="choseItem==4">
                                <div class="detail-list">
                                    <Form ref="formValidate4" :model="formValidate4" :rules="ruleValidate" :label-width="100">
                                        <!-- oldPw -->
                                        <FormItem label="原登录密码" prop="oldPw">
                                            <Input v-model="formValidate4.oldPw" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- newPw -->
                                        <FormItem label="新登录密码" prop="newPw">
                                            <Input v-model="formValidate4.newPw" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- newPwConfirm -->
                                        <FormItem label="确认新密码" prop="newPwConfirm">
                                            <Input v-model="formValidate4.newPwConfirm" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- 手机验证码 -->
                                        <FormItem label="手机验证码" prop="vailCode3">
                                            <Input v-model="formValidate4.vailCode3" size="large">
                                            <!-- <Button slot="append">点击获取</Button> -->
                                            <div class="timebox" slot="append">
                                                <Button @click="send(3)" :disabled="sendMsgDisabled3">
                                                    <span v-if="sendMsgDisabled3">{{time3+'秒'}}</span>
                                                    <span v-if="!sendMsgDisabled3">点击获取</span>
                                                </Button>
                                            </div>
                                            </Input>
                                        </FormItem>
                                        <!-- Button -->
                                        <FormItem>
                                            <Button type="primary" @click="handleSubmit('formValidate4')">保 存</Button>
                                            <Button type="ghost" @click="handleReset('formValidate4')" style="margin-left: 8px">重置</Button>
                                        </FormItem>
                                    </Form>
                                </div>
                            </div>
                        </div>
                        <!-- 5 -->
                        <div class="account-item">
                            <div class="account-item-in">
                                <Icon type="lock-combination" style="font-size: 18px;color: #00b5f6;"></Icon>
                                <span class="card-number">资金密码</span>
                                <p class="bankInfo" style="color: grey;">
                                    账户资金变动时，需先验证资金密码
                                </p>
                                <a class="btn" v-if="user.fundsVerified==0&&user.phoneVerified==1" @click="showItem(5)">设置</a>
                                <a class="btn" v-else-if="user.fundsVerified==0&&user.phoneVerified==0" @click="noPhone">设置手机</a>
                                <a class="btn" v-else-if="user.fundsVerified==1&&user.phoneVerified==1" @click="showItem(5)">修改</a>
                            </div>
                            <div class="account-detail" v-show="choseItem==5">
                                <!-- 设置 -->
                                <div class="detail-list" v-if="user.fundsVerified==0">
                                    <Form ref="formValidate7" :model="formValidate7" :rules="ruleValidate" :label-width="100">
                                        <!-- newMPw -->
                                        <FormItem label="资金密码" prop="pw7">
                                            <Input v-model="formValidate7.pw7" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- newMPwConfirm -->
                                        <FormItem label="确认密码" prop="pw7Confirm">
                                            <Input v-model="formValidate7.pw7Confirm" size="large" type="password"></Input>
                                        </FormItem>

                                        <!-- Button -->
                                        <FormItem>
                                            <Button type="primary" @click="handleSubmit('formValidate7')">保 存</Button>
                                            <Button type="ghost" @click="handleReset('formValidate7')" style="margin-left: 8px">重置</Button>
                                        </FormItem>
                                    </Form>
                                </div>
                                <!-- 修改 -->
                                <div class="detail-list" v-else-if="user.fundsVerified==1 && !fGetBackFundpwd">
                                    <Form ref="formValidate5" :model="formValidate5" :rules="ruleValidate" :label-width="100">
                                        <!-- oldPw-->
                                        <FormItem label="原资金密码" prop="oldPw">
                                            <Input v-model="formValidate5.oldPw" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- newMPw -->
                                        <FormItem label="新资金密码" prop="newMPw">
                                            <Input v-model="formValidate5.newMPw" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- newMPwConfirm -->
                                        <FormItem label="确认新密码" prop="newMPwConfirm">
                                            <Input v-model="formValidate5.newMPwConfirm" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- 邮箱验证码 -->
                                        <FormItem label="手机验证码" prop="vailCode5">
                                            <Input v-model="formValidate5.vailCode5" size="large">
                                            <!-- <Button slot="append">点击获取</Button> -->
                                            <div class="timebox" slot="append">
                                                <Button @click="send(5)" :disabled="sendMsgDisabled5">
                                                    <span v-if="sendMsgDisabled5">{{time5+'s'}}</span>
                                                    <span v-if="!sendMsgDisabled5">点击获取</span>
                                                </Button>
                                            </div>
                                            </Input>
                                        </FormItem>
                                        <p style="text-align:right;"><a @click="handleReset('formValidate8');fGetBackFundpwd=!fGetBackFundpwd">忘记资金密码?</a></p>
                                        <!-- Button -->
                                        <FormItem>
                                            <Button type="primary" @click="handleSubmit('formValidate5')">保 存</Button>
                                            <Button type="ghost" @click="handleReset('formValidate5')" style="margin-left: 8px">重置</Button>
                                        </FormItem>
                                        
                                    </Form>
                                </div>
                                 <!-- 找回 -->
                                <div class="detail-list" v-show="user.fundsVerified==1 && fGetBackFundpwd ">
                                    <Form ref="formValidate8" :model="formValidate8" :rules="ruleValidate" :label-width="85">
                                    <!-- newMPw -->
                                        <FormItem label="新资金密码" prop="newMPw8">
                                            <Input v-model="formValidate8.newMPw8" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- newMPwConfirm -->
                                        <FormItem label="确认新密码" prop="newMPwConfirm8">
                                            <Input v-model="formValidate8.newMPwConfirm8" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- 邮箱验证码 -->
                                        <FormItem label="手机验证码" prop="vailCode5">
                                            <Input v-model="formValidate8.vailCode5" size="large">
                                                <div class="timebox" slot="append">
                                                    <Button @click="send(5)" :disabled="sendMsgDisabled5">
                                                    <span v-if="sendMsgDisabled5">{{time5+'s'}}</span>
                                                    <span v-if="!sendMsgDisabled5">点击获取</span>
                                                    </Button>
                                                </div>
                                            </Input>
                                        </FormItem>
                                        <!-- Button -->
                                        <FormItem>
                                        <Button type="primary" @click="handleSubmit('formValidate8')">保存</Button>
                                        <Button type="ghost" @click="handleReset('formValidate8')" style="margin-left: 8px">重置</Button>
                                        </FormItem>
                                  </Form>
                                </div>
                            </div>
                        </div>
                        <!--  -->
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components: {
    },
    data() {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入不小于6位新登录密码'));
            } else if (value.length<6) {
                callback(new Error('请输入不小于6位新登录密码'));
            } else {
                callback();
            }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('新登录密码不一致'));
            } else if (value.length<6) {
                callback(new Error('新登录密码不一致'));
            } else if (value !== this.formValidate4.newPw) {
                callback(new Error('两次输入的新登录密码不一致!'));
            } else {
                callback();
            }
        };
        const validateMPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入不小于6位密码'));
            } else if (value.length<6) {
                callback(new Error('请输入不小于6位密码'));
            } else {
                callback();
            }
        };
        const validateMPassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('密码不一致'));
            } else if (value.length<6) {
                callback(new Error('密码不一致'));
            } else if (value !== this.formValidate5.newMPw) {
                callback(new Error('两次输入的密码不一致!'));
            } else {
                callback();
            }
        };
        const validatepw7 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入不小于6位密码'));
            } else if (value.length<6) {
                callback(new Error('请输入不小于6位密码'));
            } else {
                callback();
            }
        };
        const validatepw7check = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('密码不一致'));
            } else if (value.length<6) {
                callback(new Error('密码不一致'));
            } else if (value !== this.formValidate7.pw7) {
                callback(new Error('两次输入的密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            fGetBackFundpwd:false,
            changedata:{ },
             money:{
                       all:'0.00'
                  },
            imgPreview:'',
            imgNext:'',
            imgLast:'',

            frontCardImg:require('../../assets/img/frontCardImg.png'),
            backCardImg:require('../../assets/img/backCardImg.png'),
            handCardImg:require('../../assets/img/HandCardImg.png'),

            uploadHeaders:{'x-auth-token':localStorage.getItem('TOKEN')},
            uploadUrl:this.host+'/uc/upload/oss/image',
            usernameS: '',
            user: {
            },
            choseItem: 0,
            accountValue: '1',
            formValidate2: {
                mail: '',
                vailCode1: '',
                password: '',

            },
            formValidate3: {
                // country:'',
                mobile: '',
                vailCode2: '',
                password: '',
            },
            formValidate4: {
                oldPw: '',
                newPw: '',
                newPwConfirm: '',
                vailCode3: '',
            },
            formValidate5: {
                oldPw: '',
                newMPw: '',
                newMPwConfirm: '',
                vailCode5: '',
            },
            formValidate6: {
                realName: '',
                idCard: '',
            },
            formValidate7: {
                pw7: '',
                pw7Confirm: '',
            },
            formValidate8: {
              newMPw8: '',
              newMPwConfirm8: '',
              vailCode5: '',
            },
            ruleValidate: {
                mail: [
                    { required: true, type: 'email', message: '请输入邮箱号', trigger: 'blur' },
                ],
                vailCode1: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ],
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' }
                ],
                vailCode2: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ],
                vailCode3: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ],
                password: [
                    { required: true, type: 'string', min: 6, message: '请输入不小于6位密码', trigger: 'blur' },
                ],
                oldPw: [
                    { required: true, type: 'string', min: 6, message: '请输入原密码', trigger: 'blur' }
                ],
                newPw: [
                    { required: true, type: 'string', min: 6, message: '请输入不小于6位新密码', trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' },
                ],
                newPwConfirm: [
                    { required: true, type: 'string', min: 6, message: '新登录密码不一致', trigger: 'blur' },
                    { validator: validatePassCheck, trigger: 'blur' },

                ],
                newMPw: [
                    { required: true, type: 'string', min: 6, message: '请输入不小于6位密码', trigger: 'blur' },
                    { validator: validateMPass, trigger: 'blur' },
                ],
                newMPwConfirm: [
                    { required: true, type: 'string', min: 6, message: '密码不一致', trigger: 'blur' },
                    { validator: validateMPassCheck, trigger: 'blur' },

                ],
                pw7: [
                    { required: true, type: 'string', min: 6, message: '请输入不小于6位密码', trigger: 'blur' },
                    { validator: validatepw7, trigger: 'blur' },
                ],
                pw7Confirm: [
                    { required: true, type: 'string', min: 6, message: '密码不一致', trigger: 'blur' },
                    { validator: validatepw7check, trigger: 'blur' },

                ],
                vailCode5: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ],
                realName: [
                    { required: true, message: '请输入真实姓名', trigger: 'blur' }
                ],
                idCard: [
                    { required: true, message: '请输入身份证号码', trigger: 'blur' }
                ],
                newMPw8: [
                    { required: true, message: '请输入', trigger: 'blur' }
                ],
              newMPwConfirm8:  [
                    { required: true, message: '请输入', trigger: 'blur' }
                ],

            },
            time1: 60, // 发送验证码倒计时
            time2: 60, // 发送验证码倒计时
            time3: 60, // 发送验证码倒计时
            time5: 60, // 发送验证码倒计时
            sendMsgDisabled1: false,
            sendMsgDisabled2: false,
            sendMsgDisabled3: false,
            sendMsgDisabled5: false,

        }
    },
    methods: {
        frontHandleSuccess (res, file) {
            this.frontCardImg=this.imgPreview=res.data;
        },
        backHandleSuccess (res, file) {
            this.backCardImg=this.imgNext=res.data;
        },
        handHandleSuccess (res, file) {
            this.handCardImg=this.imgLast=res.data;
        },
        noPhone() {
            this.$Message.info('请先绑定手机!');
        },
        renderPw() {
            this.$Modal.confirm({
                title: '重置资金密码',
                onOk: () => {
                    this.$Message.info('Clicked ok');
                },
                render: (h) => {
                    return h('Input', {
                        props: {
                            value: this.value,
                            autofocus: true,
                        },
                        on: {
                            input: (val) => {
                                this.value = val;
                            }
                        }
                    })
                }
            })
        },
        submit(name) {
            //实名认证
            if (name == 'formValidate6') {
                let param = {}
                param['realName'] = this.formValidate6.realName
                param['idCard'] = this.formValidate6.idCard
                param['idCardFront']=this.imgPreview
                param['idCardBack']=this.imgNext
                param['handHeldIdCard']=this.imgLast
                
                this.$http.post(this.host + '/uc/approve/real/name', param).then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.member.realName = this.formValidate6.realName
                        this.$store.commit('setMember', this.member);
                        this.$Message.success('保存成功!');
                        this.formValidate6={};
                        this.getMember();
                        this.choseItem = 0
                    }else {
                        this.$Message.error(resp.message);
                    }
                })
            }
            //邮箱认证
            if (name == 'formValidate2') {
                let param = {}
                param['email'] = this.formValidate2.mail
                param['code'] = this.formValidate2.vailCode1
                param['password'] = this.formValidate2.password
                console.log(param);
                
                this.$http.post(this.host + '/uc/approve/bind/email', param).then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.$Message.success('保存成功!');
                        this.getMember();
                        this.formValidate2={};
                        this.choseItem = 0
                    } else {
                        this.$Message.error(resp.message);
                    }
                })
            }
            //手机认证
            if (name == 'formValidate3') {
                let param = {}
                param['phone'] = this.formValidate3.mobile
                param['code'] = this.formValidate3.vailCode2
                param['password'] = this.formValidate3.password
                this.$http.post(this.host + '/uc/approve/bind/phone', param).then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.$Message.success('保存成功!');
                        this.getMember();
                        this.formValidate3={};
                        this.choseItem = 0
                    }else {
                        this.$Message.error(resp.message);
                    }
                })
            }
            //登录密码
            if (name == 'formValidate4') {
                let param = {}
                param['oldPassword'] = this.formValidate4.oldPw
                param['newPassword'] = this.formValidate4.newPw
                param['code'] = this.formValidate4.vailCode3
                this.$http.post(this.host + '/uc/approve/update/password', param).then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.$Message.success('保存成功!');
                        this.getMember()
                        this.choseItem = 0
                        localStorage.removeItem('MEMBER');
                        localStorage.removeItem('TOKEN');
                        this.$store.state.showLogout = true;
                        this.$store.getters.isLogin = false;
                        this.formValidate4={};
                        let self = this
                        setTimeout(() => {
                            self.$router.push('/login');
                        }, 2000)
                    } else {
                        this.$Message.error(resp.message);
                    }
                })
            }
            //修改资金密码
            if (name == 'formValidate5') {
                let param = {}
                param["oldPassword"] = this.formValidate5.oldPw;
                param['newPassword'] = this.formValidate5.newMPw
                param['code'] = this.formValidate5.vailCode5
               
                this.$http.post(this.host + '/uc/approve/update/transaction/password', param).then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.$Message.success('保存成功!');
                        this.getMember()
                        this.choseItem = 0;
                        this.formValidate={};
                    } else {
                        this.$Message.error(resp.message);
                    }
                })
            }
            //设置资金密码
            if (name == 'formValidate7') {
                let param = {}
                param['jyPassword'] = this.formValidate7.pw7
                this.$http.post(this.host + '/uc/approve/transaction/password', param).then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        this.$Message.success('保存成功!');
                        this.getMember()
                        this.choseItem = 0;
                        this.formValidate7={};
                    } else {
                        this.$Message.error(resp.message);
                    }
                })
            }
             //找回资金密码
            if (name == 'formValidate8') {
              let param = {}
              
              param['newPassword'] = this.formValidate8.newMPw8
              param['code'] = this.formValidate8.vailCode5
              this.$http.post(this.host + '/uc/approve/reset/transaction/password', param).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                  this.$Message.success(resp.message);
                  this.fGetBackFundpwd=false;
                  this.handleReset('formValidate5');
                  this.getMember();
                  this.choseItem = 0
                }else {
                  this.$Message.error(resp.message);
                }
              });
            }

        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.submit(name)
                } else {
                    this.$Message.error('保存失败!');
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        showItem(index) {
    
            if(index== this.choseItem){
                 this.choseItem=0
            }
            else{
                 this.choseItem = index;
            }
        },
        send(index) {
            let me = this;
            if (index == 1) {
                if (this.formValidate2.mail) {
                    //获取邮箱code
                    this.$http.post(this.host + '/uc/bind/email/code', { 'email': this.formValidate2.mail }).then(response => {
                        var resp = response.body;
                        if (resp.code == 0) {
                            me.sendMsgDisabled1 = true;
                            
                            let interval = window.setInterval(function() {
                                if ((me.time1--) <= 0) {
                                    me.time1 = 60;
                                    me.sendMsgDisabled1 = false;
                                    window.clearInterval(interval);
                                }
                            }, 1000);
                        }else {
                            this.$Message.error(resp.message);
                        }
                    })
                } else {
                    this.$refs.formValidate2.validateField('mail');
                }
            } else if (index == 2) {
                if (this.formValidate3.mobile) {
                    //获取手机code
                    this.$http.post(this.host + '/uc/mobile/bind/code', { 'phone': this.formValidate3.mobile}).then(response => {
                        var resp = response.body;
                        if (resp.code == 0) {
                            me.sendMsgDisabled2 = true;
                             this.$Message.success(resp.message);
                            let interval = window.setInterval(function() {
                                if ((me.time2--) <= 0) {
                                    me.time2 = 60;
                                    me.sendMsgDisabled2 = false;
                                    window.clearInterval(interval);
                                }
                            }, 1000);
                        }else {
                            this.$Message.error(resp.message);
                        }
                    })

                } else {
                    this.$refs.formValidate3.validateField('mobile');
                }

            } else if (index == 3) {
                //登录密码获取手机code
                this.$http.post(this.host + '/uc/mobile/update/password/code', ).then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        me.sendMsgDisabled3 = true;
                        this.$Message.success(resp.message)
                        let interval = window.setInterval(function() {
                            if ((me.time3--) <= 0) {
                                me.time3 = 60;
                                me.sendMsgDisabled3 = false;
                                window.clearInterval(interval);
                            }
                        }, 1000);
                    } else {
                        this.$Message.error(resp.message);
                    }
                })
            } else if (index == 5) {
                //资金密码获取手机code
                this.$http.post(this.host + '/uc/mobile/transaction/code', ).then(response => {
                    var resp = response.body;
                    if (resp.code == 0) {
                        me.sendMsgDisabled5 = true;
                        this.$Message.success(resp.message);
                        let interval = window.setInterval(function() {
                            if ((me.time5--) <= 0) {
                                me.time5 = 60;
                                me.sendMsgDisabled5 = false;
                                window.clearInterval(interval);
                            }
                        }, 1000);
                    } else {
                        this.$Message.error(resp.message);
                    }
                })

            }
        },
        getMember() {
            //获取个人安全信息
            this.$http.post(this.host + '/uc/approve/security/setting').then(response => {
                var resp = response.body;
               console.log(resp)
                if (resp.code == 0) {
                    this.user = resp.data;
                    this.usernameS = (this.user.username + '').slice(0, 1)
                    // this.dataCount = resp.data.length
                } else {
                    // this.$Message.error(resp.message);
                }
            })
        },
        init() {
            this.$store.commit('navigate','6');
            // this.formValidate3.country=this.member.country.zhName;
        },
        sum(arr) {
            return arr.reduce(function(prev, curr, idx, arr){
                return prev + curr;
            });
        },
        headdata(){
            this.$http.post(this.host+'/exchange/order/general').then(res=>{
                  if(res.body.code=='0'){
                      this.changedata=res.body.data;
                  }
            })  
        },
        headall(){
            this.$http.post(this.host+'/uc/asset/wallet').then(res=>{
                if(res.body.code=='0'){  
                    var moneyarr=[];
                    for(var i  in res.body.data){ 
                        moneyarr.push((parseFloat(res.body.data[i].balance) + parseFloat(res.body.data[i].frozenBalance))*res.body.data[i].cnyRate);                     
                    }
                let lastmoney= this.sum(moneyarr).toFixed(2);
                    this.money.all=lastmoney;
                }
            })
        }
    },
    computed: {
        imgname:function(){
                  return this.user.username.charAt(0)
        },  
        'member': function() {
            return this.$store.getters.member;
        },
         'isLogin': function() {
            return this.$store.getters.isLogin;
        },  
    },
   
    created() {
        this.init();
        this.headdata();
        this.headall();
        this.getMember();
    }
}
</script>
<style scoped>
.account-box .account-in .account-item .account-detail {
    padding: 30px 0;
    background: white;
    margin: 6px 0;
}

.account-box .account-in .account-item .account-detail .detail-list {
    width: 85%;
    margin: 0 auto;
}

.account-box .account-in .account-item .account-detail .detail-list .input-control {
    margin-bottom: 10px;
    height: 45px;
}

.detail-list .input-control .ivu-input-group-prepend {
    width: 63px;
}

.detail-list .input-control .ivu-input {
    height: 45px;
}

.account-box .account-in .account-item {
    margin-bottom: 10px;
}

.account-box .account-in .account-item .account-item-in {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 15px 30px 15px 50px;
    background-color: white;
    -webkit-box-shadow: 0 4px 0 0 rgba(69, 112, 128, 0.06);
    box-shadow: 0 4px 0 0 rgba(69, 112, 128, 0.06);
    font-size: 14px;
    color: #242a4a;
}

.account-box .account-in .account-item .account-item-in .icons {
    height: 17px;
    width: 17px;
    display: inline-block;
    margin-top: -1px;
    background-size: 100% 100%;
}

.account-box .account-in .account-item .account-item-in .yesImg {
    background-image: url(../../assets/img/overicon.png);
}

.icons.noImg {
    background-image: url(../../assets/img/noicon.png);
}


.account-box .account-in .account-item .account-item-in .card-number {
    width: 142px;
    height: 40px;
    margin-right: 15px;
    border-right: 1px dashed #d0d5de;
    padding: 0 15px;
    line-height: 40px;
    text-align: left;
    display: inline-block;
}

.account-box .account-in .account-item .account-item-in .bankInfo {
    width: 73%;
    text-align: left;
}

.account-box .account-in .account-item .account-item-in .btn {
    padding: 8px 10px;
    cursor: pointer;
}

.tips-g {
    color: #8994a3;
    font-size: 12px;
}

.gr {
    color: #B4B4B4;
}

.m1 {
    display: inline-block;
    width: 25px;
    height: 25px;
    background: url(../../assets/img/m1.png);
    background-size: 100% 100%;
    vertical-align: middle;
    margin-right: 5px;
}

.m2 {
    display: inline-block;
    width: 25px;
    height: 25px;
    background: url(../../assets/img/m2.png);
    background-size: 100% 100%;
    vertical-align: middle;
    margin-right: 5px;
}

.m3 {
    display: inline-block;
    width: 25px;
    height: 25px;
    background: url(../../assets/img/m3.png);
    background-size: 100% 100%;
    vertical-align: middle;
    margin-right: 5px;
}

.itp {
    display: inline-block;
}

.user-right {
    width: 80%;
}

.nav-right {
    padding-left: 15px;
}

.nav-right .padding-right-clear {
    padding-left: 15px;
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

.user .user-top-icon {
    height: 120px;
    border-bottom: 1px dashed #ebeff5;
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 50px;
}

.user .top-icon {
    /* background: url("../../images/user/userplist.png") no-repeat 0 0; */
    width: 75px;
    height: 75px;
    display: inline-block;
}

.user .top-icon.intro {
    background-position: 0 -670px;
}

.user .user-info {
    padding: 0px 10px;
    background-color: #fff;
    color: #0d214e;
}

.user .user-info .user-info-top {
    border-bottom: 1px dashed #ebeff5;
    padding-bottom: 20px;
}

.user .user-info h5 {
    font-size: 18px;
}

.user .user-info h5 .iconfont {
    font-size: 20px;
    color: #e24a64;
    margin-left: 10px;
}

.user-avatar {
    display: flex;
    justify-content: space-between;
}

.user-icons {
    display: flex;
    align-self: center;
    width: 190px;
}

.user-icons .icons-in {
    height: 45px;
    width: 45px;
    border-radius: 50%;
    background-color: #00b5f6;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
}

.user-icons .icons-in em {
    color: white;
    font-size: 20px;
    font-style: normal;
}

.user-icons .user-name {
    margin-left: 10px;
    display: flex;
    justify-content: flex-start;
    /* align-items: center; */
    flex-direction: column;
}

.user-icons .user-name span {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 125px;
    height: 24px;
    overflow: hidden;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
}

.user-top-icon .trade-info {
    width: 420px;
    padding-left: 30px;
    display: flex;
}

.user-top-icon .trade-info .item {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.user-top-icon .trade-info .item.capital {
    width: 60%;
}

.user-icons .user-name span.uid {
    color: #8994a3;
    font-size: 12px;
}

.circle-info {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 80px;
    width: 80px;
    border-radius: 50%;
    border: 2px solid #ebeff5;
    margin-left: 14px
}

.circle-info span {
    font-weight: bolder;
}

.circle-info p {
    color: #8994a3;
    margin: 0;
    padding: 0;
}

.circle-info p.count {
    color: #0d214e;
    font-size: 14px;
    font-weight: 600;
}

.user-avatar-public {
    background: #fff;
    border-radius: 50%;
    height: 52px;
    width: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 1px 5px 0 rgba(71, 78, 114, 0.24);
    position: relative;
}

.user-avatar-public>.user-avatar-in {
    background: #00b5f6;
    border-radius: 50%;
    height: 42px;
    width: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}
</style>
