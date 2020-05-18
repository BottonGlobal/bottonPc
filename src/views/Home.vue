<template>
  <div class="home cen allFlex">
    <span class="Wcolor font-Title home-left">B-Cold-Wallet</span>
    <div class="main box-bg" :style="{height: filterHigh()}">
      <!-- 首页 -->
      <ul class="main-ul allFlex column box-bg_border" v-if="+index === 0">
        <li class="Wcolor font-Tf ul-title">{{$t('Home.title')}}</li>
        <li
          class="ul-btn btn-one center btnColor font-Eight Ybg hand Bold"
          @click="change(3)"
        >{{$t('Home.btnOne')}}</li>
        <li
          class="ul-btn btn-two center Ycolor font-Eight hand Bold"
          @click="change(2)"
        >{{$t('Home.btnTwo')}}</li>
      </ul>

      <!-- 创建钱包 -->
      <ul class="box-bg_border main-set" v-if="+index === 1">
        <!-- 钱包名称 -->
        <li class="allFlex main-set-li">
          <img src="../assets/img/set-icon1.png" alt class="set-icon1 set-icon" />
          <input
            type="text"
            :placeholder="$t('Set.wallet')"
            class="set-ipt font-Eight Wcolor"
            v-model="wallet.name"
          />
        </li>

        <!-- 安全密码 -->
        <li class="allFlex main-set-li">
          <img src="../assets/img/set-icon2.png" alt class="set-icon2 set-icon" />
          <input
            :type="type"
            :placeholder="$t('Set.password')"
            class="set-ipt font-Eight Wcolor"
            oninput="value=value.replace(/[^a-zA-Z0-9.]/g,'')"
            v-model="wallet.password"
          />

          <img
            src="../assets/img/pass-open.png"
            alt
            class="password-icon hand centerAll"
            v-if="type === 'text'"
            @click="type = 'password'"
          />
          <img
            src="../assets/img/pass-close.png"
            alt
            class="password-icon hand centerAll"
            v-if="type === 'password'"
            @click="type = 'text'"
          />
        </li>

        <!-- 确认安全码 -->
        <li class="allFlex main-set-li">
          <img src="../assets/img/set-icon2.png" alt class="set-icon2 set-icon" />
          <input
            :type="passwordAgain"
            :placeholder="$t('Set.passwordAgain')"
            class="set-ipt font-Eight Wcolor"
            oninput="value=value.replace(/[^a-zA-Z0-9.]/g,'')"
            v-model="wallet.safe"
            @keyup.enter="toCreate"
          />
          <img
            src="../assets/img/pass-open.png"
            alt
            class="password-icon hand centerAll"
            v-if="passwordAgain === 'text'"
            @click="passwordAgain = 'password'"
          />
          <img
            src="../assets/img/pass-close.png"
            alt
            class="password-icon hand centerAll"
            v-if="passwordAgain === 'password'"
            @click="passwordAgain = 'text'"
          />
        </li>

        <!-- 提示 -->
        <li class="allFlex main-set-li">
          <img src="../assets/img/set-icon3.png" alt class="set-icon3 set-icon" />
          <input
            type="text"
            :placeholder="$t('Set.safe')"
            class="set-ipt font-Eight Wcolor"
            v-model="prompt"
            @keyup.enter="toCreate"
          />
        </li>

        <!-- 按钮 -->
        <li class="btnColor Ybg set-btn font-Eight hand" @click="toCreate">{{$t('Set.btn')}}</li>
      </ul>

      <!-- 助记词，私钥导入 -->
      <ul class="box-bg_border main-set allFlex column" v-if="+index === 2">
        <!-- 导航栏 -->
        <li class="main-import-nav">
          <span
            v-for="(item, key) in navArr"
            :key="key + 'nav'"
            class="center hand"
            :class="navIndex === key ? 'Wcolor font-Tf' : 'Bcolor font-Ty'"
            @click="navIndex = key"
          >{{$t(item)}}</span>
        </li>

        <!-- 私钥 -->
        <li class="import-key allFlex" v-if="navIndex === 0">
          <img src="../assets/img/key-icon.png" alt class="set-icon key-icon" />
          <input
            type="text"
            :placeholder="$t('Import.key')"
            class="set-ipt Wcolor font-Eight"
            v-model.trim="pri"
          />
        </li>

        <!--  助记词 -->
        <li class="allFlex import-word" v-if="navIndex === 1" ref="iptBox">
          <input
            type="text"
            v-for="(item, key) in arr"
            :key="key+'word'"
            v-model.trim="arr[key]"
            oninput="value=value.replace(/[^a-zA-Z0-9.]/g,'')"
            @keyup.enter="nextWordInput(key)"
            class="word-ipt Wcolor font-Ty center"
          />
        </li>

        <!-- 按钮 -->
        <li class="btnColor Ybg set-btn font-Eight hand" @click="toImport">{{$t('Import.btn')}}</li>
      </ul>

      <!-- 备份助记词 -->
      <ul class="box-bg_border main-backup allFlex column" v-if="+index === 3">
        <li class="Wcolor center font-Ty backup-title">{{$t('Backup.title')}}</li>

        <!-- 助记词 -->
        <li class="allFlex backup-word">
          <span
            v-for="(item, key) in wordArr"
            class="center Bcolor font-Ty"
            :key="key + 'word2'"
          >{{item}}</span>
        </li>

        <!-- 按钮 -->
        <li class="btnColor Ybg set-btn font-Eight hand" @click="toBackup">{{$t('Backup.btn')}}</li>
      </ul>

      <!-- 验证助记词 -->
      <ul class="box-bg_border main-backup allFlex column" v-if="+index === 4">
        <li class="Wcolor center font-Ty backup-title">{{$t('Backup.title')}}</li>

        <!-- 助记词 -->
        <li class="allFlex backup-word">
          <span
            v-for="(item, key) in arr"
            class="center Bcolor font-Ty hand"
            :key="key + 'word2'"
            @click="wordClear(item, key)"
          >{{item}}</span>
        </li>

        <!--  验证助记词 -->
        <li class="allFlex import-word">
          <input
            type="text"
            v-for="(item, key) in verifyArr"
            :key="key+'word'"
            :value="item"
            readonly
            class="word-ipt Wcolor font-Ty center hand"
            @click="toVerify(item, key)"
          />
        </li>

        <!-- 按钮 -->
        <li class="btnColor Ybg set-btn font-Eight hand" @click="toDetails">{{$t('Backup.btn')}}</li>
      </ul>
    </div>
    <!-- <app-password v-if="passwordShow" :index="1"></app-password> -->
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      navArr: ["Import.nav.one", "Import.nav.two"],
      navIndex: 0,
      arr: ["", "", "", "", "", "", "", "", "", "", "", ""],
      verifyArr: [],
      count: 0,
      wallet: {
        name: "",
        password: "",
        safe: ""
      },
      pri: "",
      userInfo: {},
      words: [],
      wordArr: [],
      passwordShow: false,
      prompt: "",
      type: "password",
      passwordAgain: "password"
    };
  },
  computed: {
    index() {
      return this.$store.state.index;
    }
  },
  methods: {
    change(num) {
      // localStorage.setItem("index", 1);
      this.$store.commit("changeIndex", 1);
      localStorage.setItem("nextIndex", num);
    },

    nextWordInput(index) {
      if (index === 11) {
        this.toImport();
        return;
      }
      let arr = this.$refs.iptBox.children;
      arr[index].blur();
      arr[index + 1].focus();
    },

    toVerify(value, key) {
      if (value === "") return;
      this.$set(this.arr, this.count, value);
      this.$set(this.verifyArr, key, "");
      this.count++;
    },

    //清除助记词
    wordClear(value, key) {
      if (value === "") return;
      this.arr.splice(key, 1);
      this.arr.push("");
      this.count--;
      let index = this.verifyArr.indexOf("");
      this.$set(this.verifyArr, index, value);
    },
    filterInit(arr) {
      let ary = arr;
      this.verifyArr = ary.sort(() => {
        return Math.random() > 0.5 ? -1 : 1;
      });
    },

    //创建成功，进入详情
    toDetails() {
      let decArr = localStorage.getItem("words");
      let ary = this.$DES3.decrypt(localStorage.getItem("words"));
      let arr = JSON.parse(ary);
      let bool = arr.every((item, key) => {
        return item === this.arr[key];
      });

      if (bool) {
        let word = this.arr.toString();
        let words = word.replace(/,/g, " ");
        let obj = window.newAddress(words);
        let pri = this.$DES3.encrypt(obj.pri);
        localStorage.setItem("pri", pri);
        this.$router.push("/about");
      } else {
        this.$message({
          message: this.$t("Import.alert4"),
          type: "warning"
        });
      }
    },

    //设置安全码
    toCreate() {
      let checkout = false;
      for (let key in this.wallet) {
        if (this.wallet[key] === "") {
          checkout = true;
        }
      }
      // 是否输入
      if (checkout) {
        this.$message({
          message: this.$t("Set.alert"),
          type: "warning"
        });
        return;
      }

      // 两次输入是否一致
      if (this.wallet.password !== this.wallet.safe) {
        this.$message({
          message: this.$t("Set.diff"),
          type: "warning"
        });
        return;
      }
      let str = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,16}$/;
      if (!str.test(this.wallet.password)) {
        this.$message({
          message: this.$t("Alert.password"),
          type: "warning"
        });
        return;
      }

      this.$store.commit("changePrompt", this.prompt);
      localStorage.setItem("wallet", JSON.stringify(this.wallet));
      let index = localStorage.getItem("nextIndex");
      this.$store.commit("changeIndex", index);
    },

    //随机抽取助记词
    RandomWord() {
      let arr = [];
      let ary = [];
      let len = this.words.length;

      for (let i = 0; i < 12; ) {
        let index = Math.floor(Math.random() * (len - i + 1) + i);
        arr.indexOf(index) < 0 && arr.push(index) && i++;
      }
      arr.forEach(item => {
        ary.push(this.words[item]);
      });
      let mdArr = this.$DES3.encrypt(JSON.stringify(ary));
      localStorage.setItem("words", mdArr);
      let dec = localStorage.getItem("words");
      let decArr = this.$DES3.decrypt(dec);
      this.wordArr = JSON.parse(decArr);
      this.filterInit(ary);
    },

    // 自定义高
    filterHigh() {
      let str = "";
      let index = +this.index;
      switch (index) {
        case 0:
          str = "430px";
          break;
        case 1:
          str = "560px";
          break;
        case 2:
          str = "560px";
          break;
        case 3:
          str = "560px";
          break;
        case 4:
          str = "760px";
          break;
      }
      return str;
    },

    init() {
      this.$http.get("./english.txt").then(res => {
        this.words = res.data.split(/[(\r\n)\r\n]+/);
        let ary = localStorage.getItem("words");
        let back = localStorage.getItem("back");
        if (ary && +back === 1) {
          let arr = this.$DES3.decrypt(ary) || [];
          let back = localStorage.getItem("back");
          this.wordArr = JSON.parse(arr);
          this.filterInit(JSON.parse(arr));
        } else {
          this.RandomWord();
        }
      });
    },

    // 导入钱包
    toImport() {
      this.navIndex === 0 ? this.toImportPri() : this.toImportWord();
    },

    //导入私钥
    toImportPri() {
      // 16进制
      // if (!this.pri.toLowerCase().match(/^0x/)) {
      //   this.$message({
      //     message: this.$t("Import.alert3"),
      //     type: "warning"
      //   });
      //   return;
      // }

      //64位
      if (this.pri.length !== 64) {
        this.$message({
          message: this.$t("Import.alert3"),
          type: "warning"
        });
        return;
      }

      //前30位不能为f
      if (this.pri.indexOf("ffffffffffffffffffffffffffffff") > 0) {
        this.$message({
          message: this.$t("Import.alert3"),
          type: "warning"
        });
        return;
      }

      //不能全部为0
      if (
        this.pri.indexOf(
          "0000000000000000000000000000000000000000000000000000000000000000"
        ) > 0
      ) {
        this.$message({
          message: this.$t("Import.alert3"),
          type: "warning"
        });
        return;
      }
      let obj = window.importPriKey(this.pri);

      //地址错误时
      if (obj.address === "BOCc6HgXKHye1ScqNReQfFttzyVg69yXb2EV ") {
        this.$message({
          message: this.$t("Alert.address"),
          type: "warning"
        });
        return;
      }
      let priValue = this.$DES3.encrypt(obj.pri);
      localStorage.setItem("pri", priValue);
      localStorage.setItem("wordShow", "false");
      this.$router.push("/about");
    },

    toBackup() {
      localStorage.setItem("index", 4);
      this.$store.commit("changeIndex", 4);
    },

    //导入助记词
    toImportWord() {
      let _this = this;
      let allFinish = true;
      let allcheck = true;
      this.arr.forEach(item => {
        if (item === "") allFinish = false;
        if (this.words.indexOf(item) < 0) {
          allcheck = false;
        }
      });

      // 助记词不全
      if (!allFinish) {
        this.$message({
          message: this.$t("Import.alert1"),
          type: "warning"
        });
        return;
      }

      // 助记词查找不到
      if (!allcheck) {
        this.$message({
          message: this.$t("Import.alert2"),
          type: "warning"
        });
        return;
      }
      let mdArr = this.$DES3.encrypt(JSON.stringify(_this.arr));
      localStorage.setItem("words", mdArr);
      let word = this.arr.toString();
      let words = word.replace(/,/g, " ");
      let obj = window.newAddress(words);
      if (obj.address === "BOCc6HgXKHye1ScqNReQfFttzyVg69yXb2EV ") {
        this.$message({
          message: this.$t("Alert.address"),
          type: "warning"
        });
        return;
      }
      let priValue = this.$DES3.encrypt(obj.pri);
      localStorage.setItem("pri", priValue);
      this.$router.push("/about");
    }
  },
  mounted() {},
  created() {
    // 接受指令
    this.$bus.$on("alertHide", () => {
      this.passwordShow = false;
    });
    this.init();
    localStorage.setItem("wordShow", "true");
  }
};
</script>

<style lang="scss" scoped>
.home-left {
  margin-top: 220px;
}
.main {
  width: 649px;
  // height: 760px;
  // margin-bottom: 100px;
}
.main-ul {
  padding: 80px 0;
}

.ul-title {
  margin-bottom: 64px;
}
.ul-btn {
  width: 359px;
  height: 50px;
  line-height: 50px;
  border-radius: 26px;
  margin: 0 auto;
}
.btn-two {
  border: 2px solid #d1ad75;
}

// 设置安全码
.main-set {
  padding: 50px;
  box-sizing: border-box;
}
.main-set .main-set-li {
  height: 80px;
  line-height: 80px;
  border-bottom: 2px solid #717c9a;
  padding: 0 5px;
  position: relative;
}
.password-icon {
  width: 20px;
  right: 20px;
}
.set-icon {
  margin: auto 0;
}
.set-icon1 {
  width: 24px;
  height: 23px;
}
.set-icon2 {
  width: 23px;
  height: 25px;
}
.set-icon3 {
  width: 27px;
  height: 27px;
}
.set-ipt {
  width: 92%;
  height: 100%;
}
.set-ipt::placeholder {
  color: #717c9a;
}
.set-btn {
  width: 331px;
  height: 50px;
  line-height: 50px;
  font-weight: bold;
  border-radius: 25px;
  margin: 52px auto;
}

// 导入助记词
.main-import-nav {
  height: 80px;
  line-height: 80px;
  text-align: left;
}
.main-import-nav span {
  display: inline-block;
  // width: 120px;
  transition: ease 0.2s;
}
.main-import-nav span:first-child {
  margin-right: 20px;
}
.key-icon {
  width: 16px;
  height: 28px;
}
.import-key {
  transition: ease 0.2s;
  height: 80px;
  line-height: 80px;
  padding: 0 4px;
  border-bottom: 2px solid rgba(113, 124, 154, 1);
}

.import-word {
  flex-wrap: wrap;
  transition: ease 0.2s;
}
.word-ipt {
  width: 30%;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #303750;
}

// 备份助记词
.main-backup {
  padding: 50px 100px 0 100px;
}
.backup-title {
  margin-bottom: 30px;
}
.backup-word {
  flex-wrap: wrap;
}
.backup-word span {
  display: inline-block;
  height: 50px;
  line-height: 50px;
  width: 30%;
  border: 2px solid rgba(113, 124, 154, 1);
  border-radius: 5px;
  margin-bottom: 14px;
}
.home {
  position: relative;
}
</style>
