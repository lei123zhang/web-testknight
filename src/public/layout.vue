<template>
    <div>
        <div class="app-header">
            <div class="layout">
                <!-- <div class="layout-ceiling header-wrapper">
                    <div class="ww top-show">    
                        <div class="layout-ceiling-main profile">
                          
                            <div class="profile" v-if="isLogin">
                                <div>
                                    <span>hi,{{member.username}}</span>
                                    <span class="icon-wrapper">
                                        <i class="ivu-icon ivu-icon-arrow-down-b"></i>
                                    </span>
                                    <span class="logout" @click="logout">[{{$t("header.logout")}}]</span>
                                </div>          
                            </div>             
                            <div class="nologin" v-else>
                                <router-link to="/login">{{$t("header.login")}}</router-link>
                                <span>&nbsp;|&nbsp;</span>
                                <router-link to="/register">{{$t("header.reg")}}</router-link>
                            </div>
                        </div>
                    </div> 
                </div>-->
                <div class="layout-header">
                    <div class="ww">
                        <Row type="flex" justify="center" align="middle" class="code-row-bg">
                            <Col span="1" class="logobox">
                                <a href="#"><img src="../assets/img/logo.png" style="width:77px" /></a>
                            </Col>
                            <Col span="17" class="navbox" >
                                <Row type="flex" justify="start" class="code-row-bg">
                                    <Menu mode="horizontal" theme="light" :active-name="activeNav">
                                        <MenuItem name="1">
                                            <router-link to="/index">{{$t("nav.homePage")}}</router-link>
                                        </MenuItem>
                                        <MenuItem name="2">
                                            <router-link to="/tradingcenter/coinTrade/BTC">{{$t("nav.tradingCenter")}}</router-link>
                                        </MenuItem>
                                        <MenuItem name="3">
                                            <router-link to="/ordermanagement/myorder">{{$t("nav.orderCenter")}}</router-link>
                                        </MenuItem>
                                        <MenuItem name="4">
                                            <router-link to="/moneymanagem">{{$t("nav.financialManagement")}}</router-link>
                                        </MenuItem>
                                        <!-- <MenuItem name="5">
                                            <router-link to="/CertifiedBusiness/Application">{{$t("nav.certifiedBusiness")}}</router-link>
                                        </MenuItem> -->
                                        <!-- <MenuItem name="6">
                                            <router-link to="/membercenter/safe">{{$t("nav.userCenter")}}</router-link>
                                        </MenuItem> -->
                                        <!-- <MenuItem name="5">
                                            <router-link to="/editad">{{$t("nav.advertise")}}</router-link>
                                        </MenuItem> -->
                                        
                                        <MenuItem name="6">
                                            <router-link to="/exchange">{{$t("nav.exchange")}}</router-link>
                                        </MenuItem>
                                        <MenuItem name="7">
                                            <router-link to="/bill">{{$t("nav.record")}}</router-link>
                                        </MenuItem>
                                        <MenuItem name="5">
                                            <router-link to="/help">{{$t("nav.help")}}</router-link>
                                        </MenuItem>
                                    </Menu>
                                </Row>
                            </Col>
                             <Col span="4" class="rightBtn">
                                    <div class="layout-ceiling-main profile">
                                
                                    <div class="profile" v-if="isLogin">
                                        <div>
                                            <span style="color:#007acc"><router-link to="/membercenter/safe">hi, {{member.username}} </router-link></span>
                                            <!-- <span class="icon-wrapper">
                                                <i class="ivu-icon ivu-icon-arrow-down-b"></i>
                                            </span> -->
                                            <span class="logout" style="cursor:pointer" @click="logout"> &nbsp;&nbsp;[{{$t("header.logout")}}]</span>
                                        </div>
                                        
                                    </div>
                                
                                    <div class="nologin" v-else>
                                        <router-link to="/login">{{$t("header.login")}}</router-link>
                                        <span>&nbsp;|&nbsp;</span>
                                        <router-link to="/register">{{$t("header.reg")}}</router-link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
        <div class="app-content" >
            <!-- <keep-alive> -->
            <router-view></router-view>
            <!-- </keep-alive> -->
        </div>
        <!-- <ul class="floats">
            <li>
                <img src="../assets/img/front/customer_service.png">
                <p>QQ客服</p>
            </li>
            <li>
                <img src="../assets/img/front/top.png">
                <p>返回顶部</p>
            </li>
        </ul> -->
        <div class="floats" >
            <!-- <Script src="https://qiyukf.com/script/a8ce131a51445a0baaf2cacfd9a500a4.js"></Script> -->
            <BackTop :height="100" :bottom="100">
                <div class="top">
                    <img src="../assets/img/front/top.png">
                    <p>返回顶部</p>
                </div>
            </BackTop>
        </div>
         <div class="foot">
             <div class="foot_titl">2018 @ Knight</div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
export default {
    data() {
        return {
        }
    },
    computed: {
        'activeNav': function() {
            return this.$store.state.activeNav;
        },
        'isLogin': function() {
            return this.$store.getters.isLogin;
        },
        'member':function(){
            return this.$store.getters.member;
        }
    },
    created: function() {
        this.init();
    },
    methods: {
        init() {
            this.$store.commit('navigate','1');
            this.$store.commit('recoveryMember');
            this.checkLogin();
            this.$i18n.locale = 'zh';
        },
        logout() {
            this.$http.post(this.host + '/uc/logout', {}).then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.$Message.success(resp.message);
                    this.$store.commit('setMember',null);
                    location.href = "/";
                } else {
                    // this.$Message.error(resp.message);
                }
            })
        },
        checkLogin() {
            this.$http.post(this.host + '/uc/check/login', {}).then(response => {
                var result = response.body;
                if(result.code == 0 && result.data == false){
                   this.$store.commit('setMember',null);
                }
            });
        },
    }
}
</script>
<style>
/* .BTC{background:url('../assets/img/BTC.png') no-repeat;background-size: 65% 100%;}
.BCH{background:url('../assets/img/BCH.png') no-repeat;background-size: 65% 100%; }
.ETH{background:url('../assets/img/ETH.png') no-repeat;background-size: 65% 100%; }
.DASH{background:url('../assets/img/DASH.png') no-repeat;background-size: 65% 100%;}
.LTC{background:url('../assets/img/LTC.png') no-repeat;background-size: 65% 100%; }
.NEO{background:url('../assets/img/NEO.png') no-repeat;background-size: 65% 100%; }
.EOS{background:url('../assets/img/EOS.png') no-repeat;background-size: 65% 100%; }
.ADA{background:url('../assets/img/ADA.png') no-repeat;background-size: 65% 100%; } */
.GIP{background:url('../assets/img/GIP.png') no-repeat;}
.BTC{background:url('../assets/img/BTC.png') no-repeat;}
.BCH{background:url('../assets/img/BCH.png') no-repeat; }
.ETH{background:url('../assets/img/ETH.png') no-repeat; }
.DASH{background:url('../assets/img/DASH.png') no-repeat;}
.LTC{background:url('../assets/img/LTC.png') no-repeat; }
.NEO{background:url('../assets/img/NEO.png') no-repeat;}
.EOS{background:url('../assets/img/EOS.png') no-repeat;}
.ADA{background:url('../assets/img/ADA.png') no-repeat;}
.GIP,.BTC,.BCH,.ETH,.DASH,.LTC,.NEO,.EOS,.ADA{
    width:40px;
    height:40px;
    background-size:contain;
    margin-right:5px;
}

.tables table{ width:100% !important}
html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
/* floats */
.floats .top{
    background-color:#ffffff;
    cursor:pointer;
    height:70px;
    border:1px solid #e3e3e3;
    font-size:11px;
    color:#b6b6b6;
    text-align:center;
}
.floats .top img{
    padding:14px 12px 8px;
}
#YSF-CUSTOM-ENTRY-1 {
    width:60px !important;
    border-radius: 2px !important;
}

#YSF-BTN-HOLDER {
    position: fixed;
    max-width: 60px !important;
    max-height: 120px;
    bottom: 150px !important;
}
#YSF-BTN-HOLDER img {
    margin-left:15px !important;
}
.foot{ width:100%;height: 45px;background: #3b434c;}

.foot_titl{ width:1000px;color: #fff;line-height: 45px;height: 45px;margin: 0 auto;font-size: 16px}

.navbox{ margin-left:50px}
.navbox .ivu-menu-horizontal .ivu-menu-item,
.ivu-menu-horizontal .ivu-menu-submenu {
    padding: 0 !important;
}

.profile:hover .profile-detail {
    display: block !important;
}

.recharge span,
.recharge a {
    display: block;
}

.navbox .ivu-menu-horizontal.ivu-menu-light:after {
    background: #fff;
}

.header-wrapper .top-show .profile .profile-detail {
    position: absolute;
    background: #fff;
    box-shadow: 0 3px 9px 0 rgba(69, 112, 128, .14);
    width: 450px;
    right: 300px;
    top: 1px;
    z-index: 999;
    display: none;
}

.header-wrapper .top-show .profile .icon-wrapper {
    padding-right: 15px;
    padding-left: 3px;
}

.header-wrapper .top-show .profile .profile-detail .user-info {
    height: 38px;
    padding: 0;
    background: #f8f8f9;
    line-height: 38px
}

.header-wrapper .top-show span {
    font-size: 14px;
    color: #fff;
    cursor: pointer;
}

.header-wrapper .top-show .profile .profile-detail .user-info span {
    display: inline-block;
    color: #444;
    float: right;
    margin-right: 10px;
    padding-bottom: 10px;
    cursor: pointer
}

.header-wrapper .top-show .profile .profile-detail .user-info img {
    width: 67px;
    height: 17px;
    margin-top: 12px;
    margin-left: 30px
}

.header-wrapper .top-show .profile .profile-detail .assets-detail {
    padding: 15px 10px;
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center
}

.header-wrapper .top-show .profile .profile-detail .assets-detail .btc-info,
.header-wrapper .top-show .profile .profile-detail .assets-detail .security-deposit {
    width: 50%;
    box-sizing: border-box
}

.header-wrapper .top-show .profile .profile-detail .assets-detail .btc-info .left,
.header-wrapper .top-show .profile .profile-detail .assets-detail .btc-info .right,
.header-wrapper .top-show .profile .profile-detail .assets-detail .security-deposit .left,
.header-wrapper .top-show .profile .profile-detail .assets-detail .security-deposit .right {
    position: relative;
    top: 5px;
    font-size: 14px;
    width: 80%;
    padding: 10px 0;
    margin: 0 auto;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center
}

.header-wrapper .top-show .profile .profile-detail .assets-detail .btc-info .left span,
.header-wrapper .top-show .profile .profile-detail .assets-detail .btc-info .right span,
.header-wrapper .top-show .profile .profile-detail .assets-detail .security-deposit .left span,
.header-wrapper .top-show .profile .profile-detail .assets-detail .security-deposit .right span {
    display: inline-block;
    color: #444;
    text-align: left
}

.header-wrapper .top-show .profile .profile-detail .assets-detail .btc-info .left.number,
.header-wrapper .top-show .profile .profile-detail .assets-detail .btc-info .right.number,
.header-wrapper .top-show .profile .profile-detail .assets-detail .security-deposit .left.number,
.header-wrapper .top-show .profile .profile-detail .assets-detail .security-deposit .right.number {
    top: -7px;
    font-weight: 600;
    font-size: 16px
}

.header-wrapper .top-show .profile .profile-detail .assets-detail .btc-info .left.number span,
.header-wrapper .top-show .profile .profile-detail .assets-detail .btc-info .right.number span,
.header-wrapper .top-show .profile .profile-detail .assets-detail .security-deposit .left.number span,
.header-wrapper .top-show .profile .profile-detail .assets-detail .security-deposit .right.number span {
    color: #00b5f6;
    text-align: left
}

.header-wrapper .top-show .profile .profile-detail .assets-detail .btc-info {
    border-right: 1px solid #d5d9df
}

.header-wrapper .top-show .profile .profile-detail .currency-list {
    text-align: center
}

.header-wrapper .top-show .profile .profile-detail .currency-list .content>.wrapper,
.header-wrapper .top-show .profile .profile-detail .currency-list .header {
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background: #f8f8f8;
    text-align: center
}

.header-wrapper .top-show .profile .profile-detail .currency-list .content>.wrapper span,
.header-wrapper .top-show .profile .profile-detail .currency-list .header span {
    display: inline-block;
    width: 100%;
    /* padding-left: 30px;
    text-align: left; */
    color: #444f71
}

.header-wrapper .top-show .profile .profile-detail .currency-list .content>.wrapper .currency,
.header-wrapper .top-show .profile .profile-detail .currency-list .header .currency {
    width: 33.3%;
    color: #444;
    border-right: 1px dashed #d5d9df;
    margin: 5px
}

.header-wrapper .top-show .profile .profile-detail .currency-list .content>.wrapper .normal,
.header-wrapper .top-show .profile .profile-detail .currency-list .header .normal {
    width: 33.3%;
    border-right: 1px dashed #d5d9df
}

.header-wrapper .top-show .profile .profile-detail .currency-list .content>.wrapper .normal span,
.header-wrapper .top-show .profile .profile-detail .currency-list .header .normal span {
    padding-left: 20px
}

.header-wrapper .top-show .profile .profile-detail .currency-list .content>.wrapper .freeze,
.header-wrapper .top-show .profile .profile-detail .currency-list .header .freeze {
    width: 33.3%
}

.header-wrapper .top-show .profile .profile-detail .currency-list .content>.wrapper .freeze span,
.header-wrapper .top-show .profile .profile-detail .currency-list .header .freeze span {
    padding-left: 20px
}

.header-wrapper .top-show .profile .profile-detail .currency-list .content .wrapper {
    background: #fff
}

.header-wrapper .top-show .profile .profile-detail .currency-list .content .btn-wrapper {
    width: 80%;
    margin: 0 auto;
    padding: 15px 0
}

.header-wrapper .top-show .profile .profile-detail .currency-list .content .btn-wrapper .recharge {
    width: 120px;
    margin: 0 16px
}

.header-wrapper .top-show .profile .profile-detail .currency-list .content .btn-wrapper .recharge a {
    font-size: 14px;
    color: #fff;
}

.header-wrapper .top-show .profile .profile-detail.hide {
    display: none
}

/* header */

.adv a {
    color: #fff;
}

.logobox {
    text-align: left !important;
}

.rightBtn {
    text-align: right !important;
}

.ratio {
    float: left;
    color: #f3f7fa;
}

.ratio span {
    margin-right: 20px;
    font-size: 14px;
}

.navbox a {
    display:inline-block;
    color: #0c214e;
    font-size: 18px;
    padding:0 26px;
    height:60px;
}

/* .navbox .router-link-active {
    border-bottom: 3px solid #1755FD;
} */

.logobox {
    height: 100px;
    padding-top: 18px;
}

.adv {}

.layout-ceiling-main {
    color: #000;
}

.ww {
    width: 80%;
    margin: 0 auto;
    min-width: 1200px;
}

.ivu-col {
    text-align: center;
}

.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}

.layout-logo {
    width: 150px;
    height: 50px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
    color: #fff;
    text-align: center;
}

.layout-header {
    height: 100px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
}

.layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}

.layout-ceiling {
    background: #0e5c98;
    padding: 10px 0;
    overflow: hidden;
}

.layout-ceiling-main {
    float: right;
    /* margin-right: 15px; */
}

.layout-ceiling-main a {
    color: #007acc;
    font-size: 16px;
}



























/* footer */

.footer-top {
    padding-top: 10px;
}

.bqp {
    color: #eef7fe;
    font-size: 16px;
}

.footer {
    background: #2970a7;
}

.footer .footer-bottom {
    border-top: #4f4f4f solid 1px;
    line-height: 65px;
}

.footer .plist {
    padding-right: 10px;
    padding-left: 10px;
}

.footer .plist.max {
    padding-right: 20px;
    padding-left: 20px;
}

.footer .footer-top-box {
    display: flex;
    padding: 0;
    border-bottom: 1px solid #4d86b3;
}

.footer .footer-left-top {
    width: 100%;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.footer .footer-left-top a {
    margin-right: 20px;
    font-size: 14px;
    color: #8994a3;
    text-decoration: none;
}

.footer .footer-right-top {
    width: 100%;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.footer .footer-right-top a {
    margin-left: 72px;
    font-size: 16px;
    color: #eef7fc;
}

.footer .footer-left-con {
    padding-top: 10px;
    padding-bottom: 20px;
}


.footer .footer-left-bot {
    padding-top: 10px;
    padding-bottom: 40px;
    border-top: #4f4f4f solid 1px;
}

.footer .footer-left-bot a {
    color: #909092;
}

.footer .footer-bottom-box {
    display: flex;
    padding: 0;
    padding-bottom: 8px;
    padding-top: 8px;
}

.footer-copyright img{
    line-height: 84px;
}

.footer-copyright span:nth-of-type(1) {
    margin-right: 72px;
}

.footer-copyright span {
    font-size: 16px;
    color: #d1e1f0;
    font-weight: bold;
    padding-left: 14px;
    line-height: 50px;
}

.footer .footer-bottom-box .footer-logo-box {
    width: 100%;
    height: 36px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.footer .footer-bottom-box .footer-copyright {
    width: 100%;
    height: 36px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.footer .footer-bottom-box .footer-copyright {
    font-size: 14px;
    color: #8994a3;
}

.footer-left-con span {
    display: inline-block;
}

.footer-left-con a {
    float: left;
    color: #909092;
}

.footer .code {
    padding: 10px;
    background: #4f4f4f;
    display: inline;
    margin-right: 30px;
    margin-top: 25px;
    margin-bottom: 30px;
}

.footer .code p {
    margin: 0
}

.footer .code img {
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
    border: 2px solid #fff;
}
</style>

