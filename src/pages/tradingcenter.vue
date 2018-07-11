<template>
    <div class="content-wrap">
        <div class="ww">
            <div class="container" id="List">
                <Row>
                    <Col span="4">
                        <Menu ref="navMenu" mode="vertical" width="auto" theme="light" :active-name="activeMenuName" @on-select="menuSelected">
                            <MenuGroup title="我要买入">
                                <template v-for="(coin,index) in coins">
                                    <MenuItem :name="'coin-'+index" :key="index">
                                        {{coin.unit}}
                                    </MenuItem>
                                </template>
                            </MenuGroup>
                            <MenuGroup title="我要卖出">
                                <template v-for="(coin,index) in coins">
                                    <MenuItem :name="'coin+'+index" :key="index">
                                        {{coin.unit}}
                                    </MenuItem>
                                </template>
                            </MenuGroup>
                        </Menu>
                    </Col>
                    <Col span="20">
                    <!-- <keep-alive> -->
                        <router-view></router-view>
                    <!-- </keep-alive> -->
                    </Col>
                </Row>
            </div>
        </div>
    </div>
</template>
<script>
// import trademenu from '../components/trademenu'
export default {
    components: {
        // trademenu
    },
    data() {
        return {
            coinType: '',
            coins:[],
            activeMenuName:'coin-0'
        }
    },
    methods: {
        init() {
            this.$store.commit('navigate','2');
            this.getCoinType();
        },
        getCoinType(){
            this.$http.post(this.host+this.api.otc.coin).then(response=>{
                var resp = response.body;
                if (resp.code == 0) {
                    this.coins=resp.data;
                }
            })
        },
        menuSelected(menuName){
            var coin;
            if(menuName.indexOf("-")>=0){
                coin = this.coins[menuName.split('-')[1]];
                this.$router.push('/tradingcenter/coinTrade/'+coin.unit);
            }else if(menuName.indexOf("+")>=0){
                coin = this.coins[menuName.split('+')[1]];
                this.$router.push('/tradingcenter/coinTradeSell/'+coin.unit);
            };
        }
    },
    created: function() {
        this.init();
    },

}
</script>
<style>
.ivu-menu-vertical .ivu-menu-item-group-title{
    padding-left: 0px;
}
</style>
<style scoped>
/* .icon1 {
    background: url('../assets/img/btc.png') no-repeat 0 0;
    background-size: 100% 100%;
}

.icon2 {
    background: url('../assets/img/usdt.png') no-repeat 0 0;
    background-size: 100% 100%;
} */
.content-wrap {
    background: #eee;
    min-height: 750px;
}

.container {
    min-width: 1200px;
    padding-top: 30px;
    margin: 0 auto;
}


/* left */

.leftmenu {
    margin-bottom: 160px;
    background: #fff;
    position: relative;
    min-height: 1px;
    padding: 20px 15px;
}
.leftmenu a.router-link-active {
    background: #ebeff5;
    color: #00b5f6 !important;
}
.nav {
    margin-bottom: 300px;
    padding-left: 0;
    list-style: none;
}

.nav>li {
    line-height: 50px;
}

.leftmenu .nav-stacked {
    background: #fff;
}

.leftmenu .leftmenu-title {
    line-height: 55px;
    font-size: 16px;
    background: 0 0;
    color: #0B0D1B;
    padding-left: 20px;
    /*border-top: #f1f1f1 solid 1px;
	border-bottom: #f1f1f1 solid 1px;*/
    display: block;
    /* cursor: pointer; */
}

.leftmenu .nav>li>a {
    display: block;
    color: #000;
    font-size: 14px;
}

.leftmenu .nav-pills>li.active>a,
.leftmenu .nav>li>a:hover,
.nav-pills>li.active>a:focus,
.nav-pills>li.active>a:hover {
    background: #ebeff5;
    color: #00b5f6;
}

.leftmenu .leftmenu-title.top {
    border-top: 0;
}
</style>

