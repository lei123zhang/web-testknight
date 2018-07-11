<template>
    <div class="nav-right">
        <div class="nav-right col-xs-12 col-md-10 padding-right-clear">
            <div class="bill_box rightarea padding-right-clear">

                <div class="order-table">
                    <Table stripe :columns="tableColumnsAdv" :data="tableAdv" :loading="loading"></Table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components: {
    },
    data() {
        let self = this;
        return {
            dataCount: 0,
            tableAdv: [],
            loading:true,
            tableColumnsAdv: [
                {
                    title: '广告编号',
                    key: 'id',
                    align: 'center',
                },
                {
                    title: '广告类型',
                    key: 'advertiseType',
                    align: 'center',
                    render: (h, params) => {
                        let text = ''
                        if (params.row.advertiseType == 0) {
                            text = '在线购买'
                        } else if (params.row.advertiseType == 1) {
                            text = '在线出售'
                        }
                        return h('div', [
                            h('p', text),
                        ]);
                    }
                },
                {
                    title: '国家',
                    key: 'country',
                    align: 'center',
                     render: (h, params) => {
                            const row=params.row;
                            const country=row.country.zhName;
                            return h('span', {
                            },country)
                        }
                },
                {
                    title: '订单限额',
                    key: 'limit',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('p', params.row.minLimit + '~' + params.row.maxLimit),
                        ]);
                    }
                },
                {
                    title: '剩余数量',
                    key: 'remainAmount',
                    align: 'center',
                },
                {
                    title: '币种',
                    key: 'coinUnit',
                    align: 'center',
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                    width: '180',
                    align: 'center',
                },
                {
                    title: '操作',
                    key: 'buyBtn',
                    width: '180',
                    align: 'center',
                    render: function(h, params) {
                        return h('p', [
                            h('a', {
                                on: {
                                    click: function() {
                                        if (params.row.status == 0) {
                                            self.$Message.error('广告下架后才可编辑修改');
                                        } else {
                                            self.$router.push('/editad?id=' + params.row.id);
                                        }

                                    }
                                }

                            }, [
                                    h('Button', {
                                        props: {
                                            type: 'ghost',
                                            size: 'small'
                                        },
                                        style: {
                                            marginRight: '8px',
                                        },
                                    }, '修改'),
                                ]),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '8px',
                                },
                                on: {
                                    click: () => {
                                        //要上架
                                        if (params.row.status == 1) {
                                            let canshu = {};
                                            canshu['id'] = params.row.id
                                            // canshu['status'] = params.row.status == 0 ? 1 : 0
                                            self.$http.post(self.host + '/otc/advertise/on/shelves', canshu).then(response => {
                                                var resp = response.body;
                                                if (resp.code == 0) {
                                                    self.$Message.success(resp.message);
                                                    // self.$router.go(0)
                                                    self.getAd()
                                                } else if (resp.code == 4000||resp.code == 3000) {
                                                    self.$Message.success('请先登录');
                                                    self.$router.push('/login');
                                                } else {
                                                    self.$Message.error(resp.message);
                                                }
                                            })
                                        } else if (params.row.status == 0) {
                                            let canshu = {};
                                            canshu['id'] = params.row.id
                                            // canshu['status'] = params.row.status == 0 ? 1 : 0
                                            self.$http.post(self.host + '/otc/advertise/off/shelves', canshu).then(response => {
                                                var resp = response.body;
                                                if (resp.code == 0) {
                                                    self.$Message.success(resp.message);
                                                    // self.$router.go(0)
                                                    self.getAd()
                                                } else if (resp.code == 4000||resp.code == 3000) {
                                                    self.$Message.success('请先登录');
                                                    self.$router.push('/login');
                                                } else {
                                                    self.$Message.error(resp.message);
                                                }
                                            })
                                        }

                                    }
                                }
                            }, params.row.status == 0 ? '下架' : '上架'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        let canshu = {};
                                        canshu['id'] = params.row.id
                                        self.$http.post(self.host + '/otc/advertise/delete', canshu).then(response => {
                                            var resp = response.body;
                                            if (resp.code == 0) {
                                                self.$Message.success(resp.message);
                                                self.remove(params.index)
                                            } else if (resp.code == 4000||resp.code == 3000) {
                                                self.$Message.success('请先登录');
                                                self.$router.push('/login');
                                            } else {
                                                self.$Message.error(resp.message);
                                            }
                                        })
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                },
            ],
        }
    },
    methods: {
        remove(index) {
            this.tableAdv.splice(index, 1);
        },
        changePage() {
            console.log(this.tradeWay)
        },
        getAd() {
            //获取个人广告
            this.$http.post(this.host + '/otc/advertise/all').then(response => {
                var resp = response.body;
                if (resp.code == 0) {
                    this.tableAdv = resp.data;
                    this.loading = false
                    this.dataCount = resp.data.length
                    console.log(this.tableAdv)
                } else {
                    this.$Message.error(resp.message);
                }
            })
        }

    },
    computed: {

    },
    created() {
        this.getAd()
    }
}
</script>
<style scoped>
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
    padding: 20px 0;
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
    color: #0B0D1B;
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
