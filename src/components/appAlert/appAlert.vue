<template>
  <div class="box">
    <ul class="alert positionAll allFlex column">
      <li
        class="Wcolor font-Eight center"
        v-if="index !== 1"
      >{{index === 0 ? $t('Alert.import') : $t('Alert.delete')}}</li>
      <li class="Wcolor font-Eight center textHidden" v-if="index === 1">{{userInfo.pri}}</li>
      <li v-if="false">
        <input type="text" class="alert-ipt Wcolor font-Six" />
      </li>

      <li class="border"></li>

      <li class="alert-btn allFlex" v-if="index !== 1">
        <span
          class="Dbg btnColor center alert-btn-left font-Eight hand"
          @click="toHide"
        >{{$t('Alert.cancel')}}</span>
        <span class="Ybg Dcolor center font-Eight hand" @click="comfirmFn">{{$t('Alert.confirm')}}</span>
      </li>

      <li v-if="index === 1">
        <span
          class="Ybg Dcolor center alert-btn-right font-Eight hand"
          v-clipboard:copy="userInfo.pri"
          v-clipboard:success="onCopy"
        >{{$t('About.priCopy')}}</span>
      </li>

      <li class="close-box hand" @click="toHide">
        <img src="../../assets/img/close.png" alt class="close-icon" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  props: {
    index: {
      type: Number,
      default: 0
    }
  },
  computed: {
    userInfo() {
      let pri = localStorage.getItem("pri");
      let priValue = this.$DES3.decrypt(pri);
      return window.importPriKey(priValue);
    }
  },
  methods: {
    toHide() {
      this.$bus.$emit("alertHide");
    },

    comfirmFn() {
      switch (this.index) {
        case 0:
          this.$bus.$emit("toImport");
          break;
        case 1:
          this.$bus.$emit("alertHide");
          break;
        case 2:
          this.$bus.$emit("toDelete");
          break;
      }
    },
    onCopy() {
      this.$message({
        message: this.$t("About.copy"),
        type: "success"
      });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  transition: ease 0.2s;
}
.alert {
  width: 500px;
  height: 300px;
  background: rgba(44, 53, 87, 1);
  border: 2px solid rgba(96, 105, 134, 1);
  border-radius: 10px;
  padding: 50px 35px;
  box-shadow: 0 0 8px 0 rgba(255, 255, 255, 0.5);
  z-index: 999;
}
.alert-title {
  text-align: left;
}
.alert-ipt {
  width: 100%;
  padding-left: 10px;
  border-bottom: 2px solid rgba(113, 124, 154, 1);
}

.alert-btn {
  align-content: center;
}
.alert-btn span,
.confirm-btn {
  width: 200px;
  height: 50px;
  line-height: 50px;
  border-radius: 25px;
}
.confirm-btn {
  margin: 0 auto;
}

.border {
  height: 1px;
  border-bottom: 2px solid rgba(113, 124, 154, 1);
}

.alert-btn-right {
  display: inline-block;
  width: 200px;
  height: 50px;
  line-height: 50px;
  border-radius: 25px;
}
.close-box {
  width: 30px;
  height: 30px;
  line-height: 35px;
  background: rgba(113, 124, 154, 1);
  border-radius: 50%;
  position: absolute;
  top: -15px;
  right: -15px;
  box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.2);
}
.close-icon {
  width: 15px;
  height: 15px;
  transition: ease 0.1s;
  margin: auto;
  // vertical-align: middle;
}
.close-box:hover .close-icon {
  transform: rotate(180deg);
}
</style>