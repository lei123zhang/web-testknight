<template>
  <div> 
    <Row>
         <img src="../assets/img/call.png" style='width:100%;'>
    </Row>
    <Row type="flex" justify="center" class="code-row-bg mt30">
       <Col span='18'>
             <Row type="flex" justify="center" class="code-row-bg">
               <Col span='10' style="background:#F9F8F9;border:1px solid #ccc" class="border_thr" >
                   <router-link to="/notice">
                    <Row type="flex" justify="center" class="code-row-bg bg_black">
                        <Col span='4' class="pd16"><img src="../assets/img/gonggao.png"></Col>
                    </Row>  
                    <Row type="flex" justify="center" class="code-row-bg pd12">
                        <Col span='15' class="pd6"><h3>公告中心</h3></Col>
                        <Col span='15' class="pd6"><p>点击查看最近公告,第一时间获取最近消息</p></Col>
                    </Row>  
                     </router-link>
                </Col>
              
               <Col span='10' offset='4' style="background:#F9F8F9;border:1px solid #ccc"  class="border_thr" >
                 
                    <Row type="flex" justify="center" class="code-row-bg bg_black">
                      <Col span='4' class="pd16"><img src="../assets/img/app.png"  @click='erweimashow'></Col>
                    </Row>  
                    <Row type="flex" justify="center" class="code-row-bg pd12" >
                       <Col span='15' class="pd6" style="cursor:pointer;color:#000000" ><h3 @click='erweimashow'>APP下载</h3></Col>
                       <Col span='15' class="pd6" style="color:#000000;padding-bottom:30px"><p>点击二维码下载掌上APP,快速操作</p></Col>
                    </Row>  
                    
               </Col>
             </Row>
       </Col>
    </Row>
    <Row  type="flex" justify="center" class="code-row-bg  mt30">
      <Col span='20'>
          <div class="question">
        <div class="content-wrap">
            <!-- <div class="ww"> -->
            <div>
                <!-- <div class="container" id="List"> -->
                <div>
                    <div class="question-content">
                        <h2 class="titles">常见问题</h2>
                        <h3>一、交易</h3>
                        <h4>1、如何购买？</h4>
                        <p>（1）、通过发广告的方式购买。</p>
                        <p>（2）、在交易页面找到其他用户的卖出广告，联系购买。</p>
                        <h4>2、我不知道该如何支付，而且我也看不懂有关付款的说明。</h4>
                        <p>一般卖家会设置详细的收款方式，有时卖家只会展示部分信息，例如接收方银行账户名称等详细信息，需要下单联系卖家后才 会提供，如果您不知道如何按照指定信息支付，请联系卖家沟通。
                        </p>
                        <h4>3、我已付款，应该怎么操作？</h4>
                        <p>将交易请求发送给数字资产的卖家后，在交易自动取消之前您需要在限定时间内来完成付款，并点击“付款已完成”按钮。卖 家将收到您已付款的通知，数字资产处于托管中，直到卖家在他/她的帐户中看到付款后将数字资产放行给您。
                        </p>
                        <h4>4、我不小心标记付款已完成，但没有支付。</h4>
                        <p>如果您沒有完成支付，请取消交易并在您准备好支付后发起一个新的交易请求，标记“付款已完成”的交易将导致数字资产被 锁定在托管中，会导致卖家无法出售它们。
                        </p>
                        <p>未付款却不慎标记付款已完成，且不主动取消购买，将导致您的账户得到负面评价，我们会对此类行为的账户进行限制或关闭。</p>
                        <h4>5、我已经向卖家付款，但现在还未收到数字资产，正常吗？</h4>
                        <p>（1）、卖家通常都会在收到付款后尽快地放行数字资产，您可在广告交易条款或者交易过程中约定好放行数字资产的时间。如 果您已经付款，但仍在等待，则无需担心，因为所有的在线交易均受到托管保护，卖家无法取走您的数字资产。
                        </p>
                        <p>（2）、如果交易出现任何问题，卖家不放行您的数字资产，您可以对交易发起申诉，申请平台官方协助解决问题。</p>
                        <p>（3）、如果数字资产已从托管中放行，将无法发起申诉。</p>
                        <h4>6、我可以购买少于一个的数字资产吗？一个数字资产多少钱？</h4>
                        <p>可以的，每个数字资产的价格由用户自己发布，在交易页面可以看到其他用户发布的价格信息。</p>
                        <h4>7、我没有手机号。也可以购买和出售比特币吗？</h4>
                        <p>可以的，您可以通过绑定邮箱接收验证码操作。</p>
                        <h4>8、我无法使用系统验证身份。也可以购买和出售比特币吗？</h4>
                        <p>不可以，只有身份信息验证通过才能交易。</p>
                        <h4>9、手续费怎么收取的？</h4>
                        <p>（1）、发布广告免费。</p>
                        <p>（2）、交易完成后收取广告方交易额的1%作为手续费。</p>
                        <p>（3）、数字资产充值不产生手续费。</p>
                        <p>（4）、数字资产提现用户在提现页面自行选择网络手续费。</p>
                        <h3>二、安全</h3>
                        <h4>1、KYC措施如何做</h4>
                        <p>KYC意为know your customer,现在泛指反洗钱措施。对于陌生交易来说，KYC非常重要，不进行KYC,很难保证交易法币的正当性 ，很有可能会触及法律纠纷。因此建议严格执行KYC认证。
                        </p>
                        <p>KYC认证一般是卖家要求买家在转账之前发送一系列认证材料，包括个人身份证（或护照、驾驶证等）、银行账户账单、网银截 图，甚至是水电费缴费清单，然后进行视频验证，在视频验证的过程中，买家还需要直接出示上述个人身份证等材料，卖家会录制视频进行保存。这就是一个完整的KYC认证流程。

                        </p>
                        <h4>2、手机丢失无法进行双重身份验证。</h4>
                        <p>（1）、请找出您在开启双重身份验证前记下的密钥，然后在您的新手机下载谷歌身份验证器并打开。点击APP右上角的添加按 钮，选择手动输入验证码。在输入框中填写您平台用户名以及记下的密钥。保存成功后即可正常使用谷歌双重身份验证。
                        </p>
                        <p>（2）、若您已丢失密钥，请将清除双重身份密钥请求提交给平台官方，以便从您的账户中移除双重身份验证。为了保证您的账 户安全，请在提交请求时附上您的身份材料。

                        </p>
                        <h4>3、我丢失了注册时使用的用户名、密码和电子邮箱怎么办？</h4>
                        <p>如果忘记了平台的用户名、电子邮件和密码，请立即提交问题给平台官方，需要提供以下信息：电话号码、身份验证材料描述 您在网站上的最近操作、提供一个您用来访问平台网站的IP地址。官方客服会尽快会您处理。
                        </p>
                        <h4>4、可以更改用户名吗？</h4>
                        <p>出于安全原因，目前我们不允许更改用户名。</p>
                        <h4>5、如何提高账号安全？</h4>
                        <p>以下有几个提示，能够保护您免受大多数钓鱼和黑客攻击的威胁。</p>
                        <p>（1）、为您的帐户启用双重身份验证。</p>
                        <p>（2）、当登录保护检测到从新 Web 浏览器/新的IP被登录，您的手机/电子邮件地址会受到登录提醒。</p>
                        <p>（3）、请务必使用一个至少包含 8 个字符的多字符类型的强密码。</p>
                        <p>（4）、请勿在其他网站上重复使用您的密码，也不要将密码发送给其他人，甚至您的朋友。</p>
                        <p>（5）、如果出现账户异常请立即更改您的密码。同时立即向平台反馈，寻求帮助。</p>
                        <h4>6、忘记登录和交易密码怎么办？</h4>
                        <p>安全设置中直接重置登录或者交易密码，为了您的账号资金安全。</p>
                        <h3>三、充值</h3>
                        <h4>1、充值或提现需要多长时间？</h4>
                        <p>将数字资产充值到您的平台账号或您从平台转出数字资产到平台外时，到账时间一般为10-60分钟，具体时间依据区块拥堵情况有所不同。</p>
                        <h4>2、充值数字资产如何操作？</h4>
                        <p>您成功注册平台账号后，系统会自动分配给您每个数字资产的充值地址，在您需要向平台本人账号充值时，将地址复制在您需要提现的地方操作即可。</p>
                        <h4>3、充值数字资产时，确认数是什么？</h4>
                        <p>数字资产的交易数据被打包到一个“数据块”中后，交易就初步确认了。当下一个数据块链接在前一个数据块之后，交易会得 到进一步的确认。在连续得到3个确认之后，这笔交易基本上就算是不可逆转地得到确认了。每个数字资产网络将所有的交易历 史都储存在“区块链”中。区块链在持续延长，而且数据块一旦加入到区块链中，就不会再被移走。
                        </p>
                        <h3>四、纠纷处理</h3>
                        <h4>1、遇到交易纠纷怎么处理？</h4>
                        <p>平台客服将根据双方提供的证据和交易记录处理申诉。</p>
                        <p>（1）、当数字资产卖家没有响应时，如果买家能够提供有效的付款证明，平台官方会将数字资产放行给买家。</p>
                        <p>（2）、在标记付款完成后，可以发起申诉。当托管被卖家放行以后，将认为交易已经完成，不能再进行申诉。</p>
                        <h4>2、怎样识别欺诈行为？</h4>
                        <p>（1）、骗子通常比较匆忙。客户越是催促您尽快完成交易，他的可疑性越大，真正的客户总是十分有耐心。</p>
                        <p>（2）、骗子会利用数字资产交易的不可逆性或者他们会尝试欺骗您放行数字资产但自己却不付款。因此，必须在收到付款之后 再从托管中放行数字资产。即使是您认识的固定买家，一旦数字资产从托管中放行出来，也将无法取回。
                        </p>
                        <p>（3）、骗子往往建议在托管外私下完成交易，然后并没有完成他们应该完成的手续。对经过图像处理软件处理的付款证明要小 心，确认收到资金后再放行数字资产。只有您确认已收到买家的付款后才需要释放交易。
                        </p>
                        <p>（4）、由于付款可逆，骗子会尝试使用偷来的凭据或购买证明进行付款。这就要求买家使用已进行身份验证的 “我们的名字” 帐户，并始终查看用户的真实姓名是否与付款信息上的姓名相符，防止落入骗子的陷阱。</p>
                        <p>（5）、对经过图像处理软件处理的付款证明要小心，确认收到资金后再放行数字资产。只有您确认已收到买家的付款后才需要 释放交易。
                        </p>
                        <p>（6）、不要打开交易伙伴发送给您的任何链接。如果您必须打开，请使用与您当前正在使用的浏览器不同的浏览器，不要使用 交易所用的浏览器打开除平台之外的其他网站。使用不同的浏览器打开其他网站。
                        </p>
                        <p>（7）、在您的浏览器中为平台加书签，并始终使用书签访问网站。这能够防止意外访问钓鱼网站，钓鱼网站确实存在并且很容 易让人相信。即使经验丰富的交易者也会成为钓鱼网站的受害对象。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
      </Col>
    </Row>
  
    
    <Modal
        v-model="modal1"
        :closable="false">
          二维码的图片 xxxx;
    </Modal>
  </div>
</template>

<style>

a{ color:#000000}
a:hover{ color:#000000;}
.pd16{ padding: 16px}
.txt-center{ text-align: center}
.txt-left{ text-align: left}
.mt8{ margin-top: 8px}
.mt30{ margin-top: 30px}
.fs15{ font-size:16px}
.fs13{ font-size:13px}
.border_thr{ border-radius: 3px}
.pd12{ padding: 12px;text-align: center;}
.pd6{ padding: 6px; }
.bg_black{ background: #121c3c;border-radius: 4px 4px 0px 0px}
.bg_f8{ background: #f9f8f6;}
.question{
    background-color: #f7f7fa;
}
.question .question-content {
    padding: 30px 0;
    padding-bottom: 30px;
}

.question .question-content .titles {
    text-align: center;
    font-size: 24px;
    font-weight: 100;
}

.question .question-content h3 {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 100;
    margin-top: 20px;
     text-align: left;
}

.question .question-content h4 {
    font-size: 14px;
    margin: 8px 0;
     text-align: left;
}

.question .question-content p {
    line-height: 2.2;
     text-align: left;
}
</style>
<script>
  export default {
       data(){
          return{
            modal1:false
          }
       },
       methods:{
        erweimashow(){
          this.modal1=true;
        }
       }
    }
  </script>

