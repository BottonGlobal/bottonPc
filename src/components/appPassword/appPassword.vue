<template>
  <div class="box">
    <ul class="alert positionAll allFlex column">
      <li class="alert-title Wcolor font-Eight center textHidden">{{$t('Alert.safe')}}</li>
      <li>
        <input
          type="password"
          class="alert-ipt Wcolor center font-Six"
          v-model="password"
          @keyup.enter="comfirmFn"
        />
      </li>

      <li>
        <span
          class="Ybg Dcolor center alert-btn-right font-Eight hand"
          @click="comfirmFn"
        >{{$t('Alert.confirm')}}</span>
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
    return {
      password: ""
    };
  },
  props: {
    index: {
      type: Number,
      default: 1
    }
  },

  methods: {
    toHide() {
      this.$bus.$emit("alertHide");
    },

    comfirmFn() {
      this.$bus.$emit("passwordAbout", this.password);
    }
  },
  created() {
    console.log(this.index);
  },
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
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
  border-bottom: 2px solid rgba(113, 124, 154, 1);
}

.alert-btn {
  align-content: center;
}
.alert-btn-right {
  display: inline-block;
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