import Vue from 'vue'
import Layout from '../public/layout'

export default [{
        path: '/',
        // redirect: '/index',
        component: resolve => { require(['../pages/index.vue'], resolve); }
    },
    {
        path: '*',
        component: resolve => { require(['../pages/index.vue'], resolve); }
    },
    {
        path: '/index',
        component: resolve => { require(['../pages/index.vue'], resolve); }
    },
    {
        path: '/help',
        component: resolve => { require(['../pages/Help.vue'], resolve); }
    },
    {
        path: '/bill',
        component: resolve => { require(['../pages/Bill.vue'], resolve); }
    },
     {
         path: '/exchange',
         component: resolve => { require(['../pages/Exchange.vue'], resolve); }
     },
    {
        path: '/notice_detail',
        component: resolve => { require(['../pages/Noticedetail.vue'], resolve); }
    },
    {
        path: '/notice',
        component: resolve => { require(['../pages/uc/Notice.vue'], resolve); }
    },
    {
        path: '/tradingcenter',
        component: resolve => { require(['../pages/tradingcenter.vue'], resolve); },
        children: [
            {
                path: 'coinTrade/*',
                component: resolve => { require(['../components/coinTrade.vue'], resolve); }
            },
            {
                path: 'coinTradeSell/*',
                component: resolve => { require(['../components/coinTradeSell.vue'], resolve); }
            },
        ]
    },
    {
        path: '/ordermanagement',
        component: resolve => { require(['../pages/uc/OrderManagement.vue'], resolve); },
        children: [{
                path: '',
                component:  resolve => { require(['../components/uc/Myorder'], resolve); }
            },
            {
                path: 'myorder',
                component:  resolve => { require(['../components/uc/Myorder'], resolve); }
            },
            {
                path: 'myad',
                component:  resolve => { require(['../components/myad'], resolve); }
            }
        ]
    },
    {
        path: '/moneymanagem',
        component: resolve => { require(['../pages/uc/MoneyManagem.vue'], resolve); },
        children: [{
                path: '',
                component: resolve => { require(['../components/uc/MoneyIndex.vue'], resolve); },
            },
            {
                path: 'finance',
                component: resolve => { require(['../components/uc/MoneyIndex.vue'], resolve); },
            },
            {
                path: 'record',
                component: resolve => { require(['../components/uc/Record.vue'], resolve); },
            },
            {
                path: 'recharge',
                component: resolve => { require(['../components/uc/Recharge.vue'], resolve); },
            },
            {
                path: 'withdraw',
                component: resolve => { require(['../components/uc/Withdraw.vue'], resolve); },
            },
            {
                path: 'withdrawAddr',
                component: resolve => { require(['../components/uc/WithdrawAddr.vue'], resolve); },
            },
            {
                path: 'transfer',
                component: resolve => { require(['../components/uc/Transfer.vue'], resolve); },
            },
        ]
    },
    {
        path: '/certifiedBusiness',
        component: resolve => { require(['../pages/CertifiedBusiness.vue'], resolve); },
        children: [
            {
                path: 'application',
                component: resolve => { require(['../components/Application.vue'], resolve); }
            },
            {
                path: 'applicationStatus',
                component: resolve => { require(['../components/ApplicationStatus.vue'], resolve); }
            },
        ]
    },
    {
        path: '/certifiedAgreement',
        component: resolve => { require(['../components/CertifiedBusinessAgreement.vue'], resolve); }
    },
    {
        path: '/membercenter',
        component: resolve => { require(['../pages/uc/MemberCenter.vue'], resolve); },
        children: [{
                path: '',
                component: resolve => { require(['../components/uc/Safe.vue'], resolve); }
            },
            {
                path: 'safe',
                component: resolve => { require(['../components/uc/Safe.vue'], resolve); }
            },
            {
                path: 'account',
                component: resolve => { require(['../components/uc/Account.vue'], resolve); }
            },
            {
                path: 'myPromotion',
                component: resolve => { require(['../components/uc/MyPromotion.vue'], resolve); }
            },
        ]
    },
    {
        path: '/withdrawAddr',
        component: resolve => { require(['../components/uc/WithdrawAddr.vue'], resolve); }
    },
    {
        path: '/useragreement',
        component: resolve => { require(['../pages/uc/UserAgreement.vue'], resolve); }
    },
    {
        path: '/tradeInfoBuy',
        name:'sb',
        component: resolve => { require(['../pages/tradeInfoBuy.vue'], resolve); }
    },
    {
        path: '/tradeInfoSell',
        component: resolve => { require(['../pages/tradeInfoSell.vue'], resolve); }
    },
    {
        path: '/editad',
        component: resolve => { require(['../pages/editad.vue'], resolve); }
    },
    {
        path: '/checkuser',
        component: resolve => { require(['../pages/checkuser.vue'], resolve); }
    },
    {
        path: '/chat',
        component: resolve => { require(['../pages/chat.vue'], resolve); }
    },
    {
        path: '/question',
        component: resolve => { require(['../pages/question.vue'], resolve); }
    },
    {
        path: '/agreement',
        component: resolve => { require(['../pages/agreement.vue'], resolve); }
    },
    {
        path: '/rate',
        component: resolve => { require(['../pages/rate.vue'], resolve); }
    },
    {
        path: '/login',
        component: resolve => { require(['../pages/uc/Login.vue'], resolve); }
    },
    {
        path: '/login/returnUrl/:returnUrl',
        component: resolve => { require(['../pages/uc/Login.vue'], resolve); }
    },
    {
        path: '/register',
        component: resolve => { require(['../pages/uc/Register.vue'], resolve); }
    },
    {   path: '/findPwd',
        component:resolve => { require(['../pages/uc/FindPwd.vue'], resolve); }
    }


];