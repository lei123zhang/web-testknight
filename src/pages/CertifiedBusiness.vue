<style scoped>
    .wrap{
        width: 100%;
        min-height: 760px;
        margin:0 auto;
        background: #eee;
    }

    .wrapContent{
        height: 200px;
        margin-top:30px;
    }

    .stepWrap{
        width: 800px;
        margin:20px 200px 0;
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

    .tips-word{
        font-size: 16px;
        color: #0b0d1a;
    }

    .contentLive{
        /* width: 100%;
        min-width: 1200px; */
    }

</style>

<template>
    <div class="wrap">
        <Row type="flex" justify="center" align="middle">
            <Card class="wrapContent">
                <section class="trade-group merchant-top">
                    <i class="merchant-icon tips"></i>
                    <span class="tips-word">申请成为认证商家</span>
                </section>
                <Steps :current="currentStep" :status="status" class="stepWrap">
                    <Step v-for="item in stepList" :title="item.title" :key="item.title"></Step>
                </Steps>
            </Card>
        </Row>
        <Row class="contentLive">
            <!-- <keep-alive> -->
            <router-view></router-view>
            <!-- </keep-alive> -->
        </Row>
    </div>
</template>

<script>
export default {
    components: {
    },
    data () {
        return {
            stepList: [],
            currentStep: 0,
            status: 'wait'
        };
    },
    methods: {
        init() {
            this.$store.commit('navigate','5');
            // this.$store.state.HeaderActiveName = '5';
            this.certifiedBusinessStatus();
        },
        certifiedBusinessStatus(){
            if (localStorage.TOKEN == 'null' || localStorage.MEMBER == 'null') { 
                 this.$Message.success({
                content: '请先登录',
                duration: 2
                });
                this.$router.push('/login');
            }
            this.$http.get(this.host + '/uc/approve/certified/business/status')
            .then(response => {
                console.log(response);
                var resp = response.body;
                var certifiedBusinessStatus=resp.data.certifiedBusinessStatus;
                if (resp.code == 0) {
                    if(certifiedBusinessStatus==0){
                        this.$router.push('/certifiedBusiness/application')
                    }else if(certifiedBusinessStatus==1){
                        this.currentStep =2;
                        this.$store.commit('getCurrentStep',2);
                        this.$router.push('/certifiedBusiness/applicationStatus')
                    }else{
                        this.currentStep =3;
                        this.$store.commit('getCurrentStep',3);
                        this.$router.push('/certifiedBusiness/applicationStatus')
                    }
                    // this.currentStep = resp.data.memberLevel;
                } else {
                    this.$Message.error(resp.message);
                }
            });
            
        }
    },
    created() {
        this.init();
    },
    mounted () {
        this.stepList = [
            {
                title: '准备资料',
                describe: ''
            },
            {
                title: '发送邮件',
                describe: ''
            },
            {
                title: '提交审核',
                describe: ''
            },
            {
                title: '审核通过',
                describe: ''
            }
        ];
    }
};
</script>
