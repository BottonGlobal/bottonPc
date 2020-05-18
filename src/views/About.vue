<template>
  <div class="about cen">
    <div class="Wcolor font-Title home-left">B-Cold-Wallet</div>

    <div class="about-main allFlex">
      <!-- 左边个人 -->
      <div class="main-left allFlex">
        <!-- <div class="user-pic"></div> -->
        <div class="user-name allFlex padding" @click.stop="mainIndex = 0">
          <span class="Wcolor font-Ty">{{userObj.name}}</span>
          <img
            src="../assets/img/user-down.png"
            alt
            class="down-pic hand"
            :class="!check && 'rotate'"
            @click.stop="check = !check"
          />
        </div>

        <!-- 下拉 -->
        <ul class="user-box" :class="check ? 'userShow' : 'userHide'">
          <!-- 转账 -->
          <li class="center" @click="mainIndex = 2">
            <img src="../assets/img/change-icon.png" alt v-if="mainIndex !== 2" class="change-icon" />
            <img
              src="../assets/img/change-icon-white.png"
              alt
              v-if="mainIndex === 2"
              class="change-icon"
            />
            <span
              class="font-Eight hand"
              :class="mainIndex === 2 ? 'Wcolor': 'Bcolor'"
            >{{$t('About.transfer')}}</span>
          </li>

          <!-- 收款 -->
          <li class="center" @click="mainIndex = 1">
            <img
              src="../assets/img/proceeds-icon.png"
              alt
              class="proceeds-icon"
              v-if="mainIndex !== 1"
            />
            <img
              src="../assets/img/proceeds-icon-white.png"
              alt
              class="proceeds-icon"
              v-if="mainIndex === 1"
            />
            <span
              class="font-Eight hand"
              :class="mainIndex === 1 ? 'Wcolor': 'Bcolor'"
            >{{$t('About.proceeds')}}</span>
          </li>

          <!-- 管理 -->
          <li class="center" @click="mainIndex = 3">
            <img
              src="../assets/img/managemen-icon.png"
              alt
              class="proceeds-icon"
              v-if="mainIndex !== 3"
            />
            <img
              src="../assets/img/management-icon-white.png"
              alt
              class="proceeds-icon"
              v-if="mainIndex === 3"
            />
            <span
              class="font-Eight hand"
              :class="mainIndex === 3 ? 'Wcolor': 'Bcolor'"
            >{{$t('About.management')}}</span>
          </li>
        </ul>
      </div>

      <!-- 右边数据 -->
      <div class="main-right">
        <!-- 数据比例 -->
        <div class="right-top" ref="echarts"></div>

        <!-- 个人数据 -->
        <div v-if="mainIndex === 0">
          <div class="allFlex right-top-nav">
            <!-- 导航栏 -->
            <div class="allFlex">
              <span
                v-for="(item, key) in currencyArr"
                :key="key"
                class="font-Eight hand"
                :class="key === navIndex ? 'Wcolor active' : 'Bcolor'"
                @click="getRecordFn(key)"
              >{{$t(item)}}</span>
            </div>

            <!-- 搜索 -->
            <!-- <div class="search-box">
              <input
                type="text"
                :placeholder="$t('About.placeholder')"
                class="search-ipt font-Two Bcolor"
              />
              <img src="../assets/img/search-icon.png" alt class="search-icon centerAll" />
            </div>-->
          </div>

          <!-- 记录 -->
          <div v-if="recordShow || page > 1" class="record">
            <!-- boc -->
            <div v-if="navIndex === 0">
              <ul v-for="(item, key) in recordBocArr" :key="'boc' +key" class="record-ul allFlex">
                <li class="li-time">
                  <span class="font-Four Bcolor">{{filterTime(item.createTime)}}</span>
                </li>
                <li>
                  <span
                    class="font-Six Wcolor"
                  >{{filterType(1,item)}}{{(item.value / 100000000).toFixed(6)}}</span>
                </li>
                <li
                  class="Bcolor li-hash textHidden hand"
                  v-clipboard:copy="item.hash"
                  v-clipboard:success="onCopy"
                >{{item.hash}}</li>
                <li class="allFlex column Bcolor">
                  <span
                    class="font-Two"
                  >{{item.coinFroms.length > 0 ? item.coinFroms[0].address : userInfoAddress.address}}</span>
                  <span class="font-Two">TO</span>
                  <span
                    class="font-Two"
                  >{{item.coinTos.length > 0 ? item.coinTos[0].address : userInfoAddress.address}}</span>
                </li>
                <!-- <li
                class="font-Six li-btn"
                :class="item.type === 1 ? 'Wcolor Bbg' : 'Dcolor Ybg '"
                >{{item.type === 1 ? $t('About.transfer') : $t('About.proceeds')}}</li>-->
              </ul>
            </div>

            <!-- bot -->
            <div v-if="navIndex === 1">
              <ul v-for="(item, key) in recordBotArr" :key="'bot' +key" class="record-ul allFlex">
                <li class="li-time">
                  <span class="font-Four Bcolor">{{filterTime(item.createTime)}}</span>
                </li>
                <li>
                  <span
                    class="font-Six Wcolor"
                  >{{filterType(2,item)}}{{(item.value / 100000000).toFixed(6)}}</span>
                </li>
                <li
                  class="Bcolor li-hash textHidden hand"
                  v-clipboard:copy="item.hash"
                  v-clipboard:success="onCopy"
                >{{item.hash}}</li>
                <li class="allFlex column Bcolor">
                  <span class="font-Two">{{item.fromAddress}}</span>
                  <span class="font-Two">TO</span>
                  <span class="font-Two">{{item.toAddress}}</span>
                </li>
                <!-- <li
                class="font-Six li-btn"
                :class="item.type === 1 ? 'Wcolor Bbg' : 'Dcolor Ybg '"
                >{{item.type === 1 ? $t('About.transfer') : $t('About.proceeds')}}</li>-->
              </ul>
            </div>

            <!-- 页码 -->
            <ul class="page-btn allFlex">
              <li
                class="font-Six center"
                @click="lastPage"
                :class="page > 1 ? 'Ybg Wcolor hand page-active' : 'Gbg Dcolor page-grey'"
              >{{$t('About.lastPage')}}</li>
              <li
                class="font-Six center"
                @click="nextPage"
                :class="recordArr.length === 5 ? 'Ybg Wcolor hand page-active' : 'Gbg Dcolor page-grey'"
              >{{$t('About.nextPage')}}</li>
            </ul>
          </div>

          <img
            src="../assets/img/no-record.png"
            alt
            class="no-record"
            v-if="!recordShow && page === 1"
          />
        </div>

        <!-- 收款 -->
        <div class="right-proceeds" v-show="mainIndex === 1">
          <ul class="positionAll">
            <li class="canvas proceeds-code">
              <div>
                <canvas id="canvas" class="positionAll"></canvas>
              </div>
            </li>
            <li>
              <span class="font-Eight Wcolor">{{userInfoAddress.address}}</span>
              <img
                src="../assets/img/copy-icon.png"
                v-clipboard:copy="userInfoAddress.address"
                v-clipboard:success="onCopy"
                alt
                class="copy-icon hand"
              />
            </li>
          </ul>
        </div>

        <!-- 转账 -->
        <div v-if="mainIndex === 2">
          <!-- 导航栏 -->
          <div class="transfer-nav allFlex">
            <span
              v-for="(item, key) in currencyArr"
              :key="key"
              class="font-Eight hand"
              :class="key === index ? 'Wcolor active' : 'Bcolor'"
              @click="transferChange(key)"
            >{{$t(item)}}</span>
          </div>

          <!-- 交易 -->
          <ul class="transfer-box allFlex column">
            <li class="allFlex">
              <!-- 转账数量 -->
              <div>
                <span class="Wcolor font-Six transfer-label">{{$t('About.label.number')}}</span>
                <input type="number" class="transfer-ipt ipt-number Wcolor center" v-model="amount" />
                <span class="Wcolor font-Six">{{currency}}</span>
              </div>

              <!-- 手续费 -->
              <div>
                <span class="Wcolor font-Six">{{$t('About.label.fee')}}</span>
                <input
                  type="text"
                  class="transfer-ipt ipt-fee Wcolor center"
                  readonly
                  :value="index === 0 ? fee : `≈ ${fee}`"
                />
                <span class="Wcolor font-Six">{{currency}}</span>
              </div>
            </li>

            <!-- 接受地址 -->
            <li>
              <span class="Wcolor font-Six transfer-label">{{$t('About.label.toAddress')}}</span>
              <input type="text" class="transfer-ipt ipt-address Wcolor center" v-model="toaddr" />
            </li>

            <!-- 发送地址 -->
            <li>
              <span class="Wcolor font-Six transfer-label">{{$t('About.label.fromAddress')}}</span>
              <span class="Wcolor font-Six transfer-send">{{userInfoAddress.address}}</span>
            </li>

            <!-- 安全码 -->
            <li>
              <span class="Wcolor font-Six transfer-label">{{$t('About.label.safeCode')}}</span>
              <input
                :type="safeType"
                class="transfer-ipt ipt-safe Wcolor center"
                v-model="safeCode"
              />
              <img
                src="../assets/img/pass-open.png"
                alt
                class="password-icon hand"
                v-if="safeType === 'text'"
                @click="safeType = 'password'"
              />
              <img
                src="../assets/img/pass-close.png"
                alt
                class="password-icon hand"
                v-if="safeType === 'password'"
                @click="safeType = 'text'"
              />
            </li>

            <!-- 安全码提示 -->
            <li>
              <span class="Wcolor font-Six transfer-label">{{$t('About.label.prompt')}}</span>
              <input :type="type" class="ipt-safe Wcolor" :value="$store.state.prompt" />
              <img
                src="../assets/img/pass-open.png"
                alt
                class="password-icon hand"
                v-if="type === 'text'"
                @click="type = 'password'"
              />
              <img
                src="../assets/img/pass-close.png"
                alt
                class="password-icon hand"
                v-if="type === 'password'"
                @click="type = 'text'"
              />
            </li>

            <!-- 按钮 -->
            <li>
              <span
                class="Ybg btnColor hand font-Eight transfer-btn center"
                @click="submit"
              >{{$t('About.label.btn')}}</span>
            </li>
          </ul>
        </div>

        <!-- 钱包信息 -->
        <div class="wallet-info" v-if="mainIndex === 3">
          <!-- 地址 -->
          <div class="info-address Gcolor font-Eight">
            <span>{{userInfoAddress.address}}</span>
            <img
              src="../assets/img/copy-icon.png"
              v-clipboard:copy="userInfoAddress.address"
              v-clipboard:success="onCopy"
              alt
              class="copy-icon hand"
            />
          </div>

          <!-- 提示 -->
          <ul class="info-prompt">
            <li class="allFlex hand" @click="passwordFn(0)" v-if="!priShow">
              <img src="../assets/img/wallet-icon1.png" alt class="wallet-icon" />
              <span class="Gcolor font-Eight">{{$t('About.wallet.word')}}</span>
            </li>

            <li class="allFlex hand" @click="passwordFn(1)">
              <img src="../assets/img/wallet-icon2.png" alt class="wallet-icon" />
              <span class="Gcolor font-Eight">{{$t('About.wallet.address')}}</span>
            </li>

            <!-- <li class="allFlex hand" @click="alertFn(3)">
              <img src="../assets/img/wallet-icon3.png" alt class="wallet-icon" />
              <span class="Gcolor font-Eight">{{$t('About.wallet.prompt')}}</span>
            </li>-->

            <li class="delete-btn">
              <div
                class="Dcolor Ybg font-Eight center hand"
                @click="passwordFn(2)"
              >{{$t('About.delete')}}</div>
            </li>
          </ul>
        </div>
      </div>

      <!-- 导入钱包 -->
      <div
        class="import-wallet hand center Wcolor font-Six"
        @click="alertFn(0)"
      >{{$t('Home.import')}}</div>
    </div>

    <app-alert :index="alertIndex" v-if="alertShow"></app-alert>
    <app-password v-if="passwordShow" :index="passwordIndex"></app-password>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  name: "",
  data() {
    return {
      type: "password",
      safeType: "password",
      userObj: JSON.parse(localStorage.getItem("wallet")),
      check: true,
      option: {
        legend: {
          orient: "vertical",
          top: "40%",
          right: "20%",
          textStyle: {
            color: "#fff"
          }
        },
        series: [
          {
            name: "余额",
            type: "pie",
            radius: ["50%", "65%"],
            center: ["30%", "50%"],
            data: [
              { value: 335, name: "BOC" },
              { value: 310, name: "BOT" }
            ],
            color: ["#8E9FF8", "#8EEAF8"]
          }
        ]
      },
      navArr: ["About.nav.one"],
      navIndex: 0,
      recordBocArr: [
        {
          coinFroms: [],
          coinTos: []
        }
      ],
      recordBotArr: [
        {
          coinFroms: [],
          coinTos: []
        }
      ],
      currencyArr: ["BOC", "BOT"],
      index: 0,
      alertIndex: 0,
      alertShow: false,
      mainIndex: 0,
      balanceArr: [
        {
          name: "BOC",
          value: ""
        },
        {
          name: "BOT",
          value: ""
        }
      ],
      myChart: null,
      toaddr: "",
      amount: "",
      safeCode: "",
      nonce: "",
      hash: "",
      page: 1,
      passwordShow: false,
      passwordIndex: 0,
      recordPushArr: [],
      recordArr: [],
      recordShow: false,
      timer: null
    };
  },
  computed: {
    currency() {
      return this.currencyArr[this.index];
    },
    userInfoAddress() {
      let pri = localStorage.getItem("pri");
      let priValue = this.$DES3.decrypt(pri);
      return window.importPriKey(priValue);
    },
    contractAddress() {
      return this.index === 0 ? "" : "BOCc6HgmnpsfgU536ksTWC17gGv622hd4xrn";
      // return this.index === 0 ? "" : "BOCc6HgnhxyMVmUh2fNQZgkGpQrjLPccqipJ";
    },

    // 矿工费
    fee() {
      return this.index === 0 ? 0.001 : 0.006;
    },

    //是否是私钥导入
    priShow() {
      return localStorage.getItem("wordShow") === "false";
    }
  },
  watch: {
    mainIndex(val) {
      val === 1 && this.qrcode();
    }
  },
  methods: {
    filterType(num, item) {
      //boc
      if (num === 1) {
        let address =
          item.coinTos.length > 0
            ? item.coinTos[0].address
            : this.userInfoAddress.address;
        return address === this.userInfoAddress.address ? "+" : "-";
      } else {
        return item.toAddress === this.userInfoAddress.address ? "+" : "-";
      }
    },
    //上一页
    lastPage() {
      if (this.page <= 1) return;
      this.page--;
      this.getRecord(this.userInfoAddress.address);
    },

    //下一页
    nextPage() {
      if (this.recordArr.length !== 5) return;
      this.page++;
      this.getRecord(this.userInfoAddress.address);
    },

    //时间转时间戳
    filterTime(time) {
      let str = new Date(time * 1000);
      let year = this.ff(str.getFullYear());
      let month = this.ff(str.getMonth() + 1);
      let day = this.ff(str.getDate());
      let hour = this.ff(str.getHours());
      let minutes = this.ff(str.getMinutes());

      return `${year}/${month}/${day}  ${hour}:${minutes}`;
    },

    ff(num) {
      return num < 10 ? `0${num}` : num;
    },
    init() {
      let _this = this;
      this.myChart = this.$Echarts.init(this.$refs.echarts);
      this.myChart.setOption(_this.option);
    },

    //获取记录
    getRecord(address) {
      this.recordArr = [];
      this.recordBocArr = [];
      this.recordBotArr = [];
      let _this = this;
      let index = this.navIndex === 0 ? 2 : 16;
      let data = {
        jsonrpc: "2.0",
        method: "getAccountTxs",
        params: [1, _this.page, 5, address, index, -1, -1],
        id: 1
      };
      this.$http.post(this.$host1, data).then(res => {
        if (res.data.result) {
          this.recordShow = res.data.result.list.length > 0;
          res.data.result.list.forEach(item => {
            this.getRecordDetails(item.txHash, index);
          });
        }
      });
    },

    //获取具体数据
    getRecordDetails(hash, type) {
      let data = {
        jsonrpc: "2.0",
        method: "getTx",
        params: [1, hash],
        id: 1
      };
      this.$http.post(this.$host1, data).then(res => {
        if (res.data.result) {
          if (type === 16) {
            let obj = res.data.result.txData.resultInfo.tokenTransfers[0];
            obj.createTime = res.data.result.createTime;
            obj.hash = res.data.result.hash;
            this.recordBotArr.push(obj);
            this.recordBotArr.sort(function(a, b) {
              return b.createTime - a.createTime;
            });
          } else {
            this.recordBocArr.push(res.data.result);
            this.recordBocArr.sort(function(a, b) {
              return b.createTime - a.createTime;
            });
          }
          this.recordArr.push(res.data.result);
        }
      });
    },

    getRecordFn(key) {
      this.navIndex = key;
      this.page = 1;
      this.getRecord(this.userInfoAddress.address);
    },

    changeRecord(index) {
      this.navIndex = index;
    },

    qrcode() {
      let canvas = document.getElementById("canvas");
      QRCode.toCanvas(canvas, this.userInfoAddress.address, function(error) {
        if (error) return;
      });
    },

    onCopy() {
      this.$message({
        message: this.$t("About.copy"),
        type: "success"
      });
    },

    transferChange(index) {
      this.index = index;
    },

    saveBoc(address) {
      let data = {
        jsonrpc: "2.0",
        method: "getAccountBalance",
        params: [1, 1, 1, address],
        id: 1
      };

      this.$http.post(this.$host1, data).then((res, req) => {
        this.balanceArr[0].value = (
          res.data.result.balance / 100000000
        ).toFixed(6);
        this.balanceArr[0].name = `BOC: ${this.balanceArr[0].value}`;
        this.nonce = res.data.result.nonce;
        this.myChart.setOption({
          series: [
            {
              data: this.balanceArr
            }
          ]
        });
      });
    },
    saveBot(address) {
      let data = {
        jsonrpc: "2.0",
        method: "getAccountTokens",
        params: [1, 1, 5, address],
        id: 1
      };
      this.$http.post(this.$host1, data).then(res => {
        this.balanceArr[1].value =
          res.data.result.list.length > 0
            ? (res.data.result.list[0].balance / 100000000).toFixed(6)
            : "0.0000";
        this.balanceArr[1].name = `BOT: ${this.balanceArr[1].value}`;
        this.myChart.setOption({
          series: [
            {
              data: this.balanceArr
            }
          ]
        });
      });
    },

    //请求余额
    getBalance() {
      this.saveBoc(this.userInfoAddress.address);
      this.saveBot(this.userInfoAddress.address);
      this.getRecord(this.userInfoAddress.address);
    },

    //转账
    submit() {
      // 数量
      if (this.amount === "") {
        this.$message({
          message: this.$t("About.alert1"),
          type: "warning"
        });
        return;
      }

      //地址
      if (this.toaddr === "") {
        this.$message({
          message: this.$t("About.alert2"),
          type: "warning"
        });
        return;
      }

      //安全码
      let wallet = JSON.parse(localStorage.getItem("wallet"));
      if (this.safeCode !== wallet.password) {
        this.$message({
          message: this.$t("Alert.error"),
          type: "warning"
        });
        return;
      }

      let _this = this;
      let amount = Number(window.delnumber10(_this.amount, 8));
      let fee = Number(window.delnumber10(_this.fee, 8));
      let pub = window.getPubByPriKey(_this.userInfoAddress.pri);
      let hash = window.transactionSignature(
        _this.userInfoAddress.address,
        _this.toaddr,
        amount,
        fee,
        _this.nonce,
        "",
        _this.userInfoAddress.pri,
        pub,
        _this.contractAddress
      );

      let data = {
        jsonrpc: "2.0",
        method: "broadcastTx",
        params: [1, hash],
        id: 1234
      };
      this.$http.post(`${this.$host2}/jsonrpc`, data).then(res => {
        if (res.data.result) {
          this.$message({
            message: this.$t("Alert.transfer"),
            type: "warning"
          });

          this.page = 1;
          this.navIndex = 0;
          this.getBalance();
          setTimeout(() => {
            this.amount = "";
            this.safeCode = "";
            this.toaddr = "";
            _this.hash = res.data.result.hash;
            this.mainIndex = 0;
          }, 2000);
        }
        if (res.data.error) {
          this.$message({
            message: res.data.error.message,
            type: "warning"
          });
        }
      });
    },

    //导入钱包
    alertFn(index) {
      this.alertIndex = index;
      this.alertShow = true;
    },

    //去备份
    toBackUp() {
      localStorage.setItem("back", 1);
      this.$store.commit("changeIndex", 3);
      this.$router.push("/");
    },

    //交易hash去详情
    toDetails(str) {
      window.location.href = `http://explorer.botton.io/web/#/details?txHash=${str}`;
    },

    //显示输入密码
    passwordFn(num) {
      this.passwordIndex = num;
      this.passwordShow = true;
    },

    //导入创建钱包
    importWallet() {
      localStorage.clear();
      this.$store.commit("changeIndex", 0);
      localStorage.setItem("nextIndex", 2);
      this.$router.push("/");
    }
  },
  created() {
    this.getBalance();
    this.timer = setInterval(() => {
      this.saveBoc(this.userInfoAddress.address);
      this.saveBot(this.userInfoAddress.address);
    }, 10000);

    // 接受指令
    this.$bus.$on("alertHide", () => {
      this.alertShow = false;
      this.passwordShow = false;
    });

    this.$bus.$on("toImport", () => {
      this.alertShow = false;
      this.passwordFn(4);
    });

    this.$bus.$on("toDelete", () => {
      this.alertShow = false;
      this.$store.commit("changeIndex", 0);
      localStorage.clear();
      this.$router.push("/");
    });

    this.$bus.$on("passwordAbout", str => {
      let wallet = JSON.parse(localStorage.getItem("wallet"));
      console.log(this.passwordIndex);
      if (str === wallet.password) {
        this.passwordShow = false;
        if (this.passwordIndex === 4) {
          this.importWallet();
          return;
        }
        this.passwordIndex === 0
          ? this.toBackUp()
          : this.alertFn(this.passwordIndex);
      } else {
        this.$message({
          message: this.$t("Alert.error"),
          type: "warning"
        });
      }
    });

    // 请求余额
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
      // this.qrcode();
    });
  },
  destroyed() {
    clearInterval(this.timer);
    this.$bus.$off("passwordAbout");
  }
};
</script>
<style scoped >
.home-left {
  height: 120px;
  line-height: 120px;
  text-align: left;
  font-weight: bold;
}
.about-main {
  /* flex: 1; */
  width: 100%;
  position: relative;
  min-height: 350px;
}

/* 个人 */
.main-left {
  width: 230px;
  height: 80px;
  margin-right: 60px;
  position: relative;
  background: linear-gradient(
    90deg,
    rgba(122, 145, 233, 0.2) 0%,
    rgba(109, 219, 235, 0) 100%
  );
}

.user-pic {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #fff;
  margin: auto 13px auto 20px;
}

.user-name {
  flex: 1;
  height: 80px;
  line-height: 80px;
  align-items: center;
}
.down-pic {
  width: 17px;
  height: 10px;
  transition: ease 0.2s;
}

.user-box {
  position: absolute;
  top: 80px;
  width: 100%;
  padding: 20px 0;
  transition: ease-in 0.2s;
  background: rgba(255, 255, 255, 0.1);
}

.userShow {
  height: 240px;
  opacity: 1;
  background: transparent;
}

.userHide {
  height: 0;
  opacity: 0;
  background: rgba(255, 255, 255, 0.1);
}

.rotate {
  transform: rotate(180deg);
}

.user-box li {
  height: 80px;
  line-height: 80px;
}
.change-icon,
.proceeds-icon {
  width: 20px;
  margin-right: 14px;
}

/* 数据 */
.main-right {
  flex: 1;
}
.right-top {
  height: 175px;
  background: linear-gradient(
    90deg,
    rgba(122, 145, 233, 0.2) 0%,
    rgba(109, 219, 235, 0.008) 100%
  );
}
.right-nav {
  width: 40%;
}
.right-nav span {
  transition: ease 0.2s;
}
.active {
  border-bottom: 2px solid #fff;
}

.right-top-nav {
  margin: 20px 0;
}
.right-top-nav div {
  width: 150px;
}
.search-box {
  width: 166px;
  height: 34px;
  line-height: 34px;
  border: 1px solid rgba(96, 105, 134, 1);
  position: relative;
}
.search-ipt {
  padding-left: 10px;
}
.search-icon {
  width: 20px;
  height: 20px;
  right: 11px;
}

/* 记录 */
.record-ul {
  height: 70px;
  background: linear-gradient(
    90deg,
    rgba(122, 145, 233, 0.2) 0%,
    rgba(109, 219, 235, 0.008) 100%
  );
  align-items: center;
  padding: 0 15px;
  margin-bottom: 20px;
}
.li-time {
  line-height: 25px;
}
.li-hash {
  width: 180px;
  text-align: left;
  line-height: 20px;
}
.li-btn {
  width: 83px;
  height: 35px;
  line-height: 35px;
}
.no-record {
  width: 309px;
  height: 245px;
  margin-top: 140px;
}

/* 收款 */
.right-proceeds {
  height: 391px;
  background: linear-gradient(
    90deg,
    rgba(122, 145, 233, 0.2) 0%,
    rgba(109, 219, 235, 0.008) 100%
  );
  margin-top: 30px;
  position: relative;
}
.right-proceeds ul {
  width: 450px;
}
.proceeds-code {
  width: 200px;
  height: 200px;
  background: linear-gradient(0deg, rgba(26, 35, 55, 1), rgba(38, 45, 71, 1));
  border: 2px solid rgba(96, 105, 134, 1);
  box-shadow: 0px 21px 51px 0px rgba(15, 19, 36, 0.64);
  border-radius: 10px;
  margin: 0 auto 40px;
}
.proceeds-code div {
  display: inline-block;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  position: relative;
}
#canvas {
  width: 180px !important;
  height: 180px !important;
  margin: auto;
}
.copy-icon {
  width: 16px;
  height: 16px;
  margin-left: 20px;
  vertical-align: middle;
}

/* 转账 */
.transfer-nav {
  width: 150px;
  margin: 30px 0;
}
.transfer-nav span {
  transition: ease 0.2s;
}
.transfer-box {
  height: 474px;
  background: linear-gradient(
    90deg,
    rgba(122, 145, 233, 0.2) 0%,
    rgba(109, 219, 235, 0.008) 100%
  );
  padding: 35px 50px;
}
.transfer-box li {
  width: 100%;
  text-align: left;
}
.transfer-ipt {
  height: 35px;
  border: 1px solid rgba(96, 105, 134, 1);
  padding: 0 10px;
}
.ipt-safe {
  height: 35px;
  padding: 0 10px;
}
.ipt-fee {
  width: 88px;
  margin: 0 20px;
}
.ipt-number {
  margin-right: 20px;
  width: 250px;
}
.ipt-address {
  width: 420px;
}
.transfer-label {
  display: inline-block;
  width: 100px;
}
.transfer-send {
  padding: 0 10px;
}
.transfer-btn {
  display: block;
  width: 235px;
  height: 50px;
  line-height: 50px;
  border-radius: 25px;
  margin: 0 auto;
}

.password-icon {
  width: 20px;
  margin-left: 30px;
}

/* 钱包信息 */
.info-address {
  height: 70px;
  line-height: 70px;
  background: linear-gradient(
    90deg,
    rgba(122, 145, 233, 0.2) 0%,
    rgba(109, 219, 235, 0.008) 100%
  );
  margin: 25px 0;
  padding: 0 20px;
  text-align: left;
}

.info-prompt li {
  height: 70px;
  line-height: 70px;
  align-items: center;
}
.wallet-icon {
  width: 20px;
  height: 20px;
  margin-right: 20px;
}
.info-prompt li > span {
  flex: 1;
  text-align: left;
  border-bottom: 2px solid rgba(142, 159, 248, 0.08);
}
.delete-btn {
  margin: 60px 0 0;
}
.delete-btn div {
  width: 235px;
  display: inline-block;
  height: 50px;
  line-height: 50px;
  border-radius: 25px;

  text-align: center;
}

/* 导入钱包 */
.import-wallet {
  width: 193px;
  height: 45px;
  line-height: 45px;
  border: 2px solid rgba(44, 53, 87, 1);
  position: absolute;
  bottom: 0;
}
.import-wallet:hover {
  background: rgba(113, 124, 154, 0.2);
}

/* 记录 */
.record {
  padding-bottom: 50px;
  min-height: 450px;
  position: relative;
}
.page-btn {
  width: 350px;
  position: absolute;
  bottom: 0;
}
.page-btn li {
  width: 150px;
  height: 50px;
  line-height: 50px;
  transition: ease 0.2s;
}

.page-active:hover {
  background: linear-gradient(
    -88deg,
    rgba(234, 206, 162, 0.9),
    rgba(205, 168, 110, 0.9)
  );
}
</style>