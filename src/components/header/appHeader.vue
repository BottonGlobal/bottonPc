<template>
  <div class="header cen allFlex">
    <img src="../../assets/img/header-logo.png" alt class="header-logo hand" />
    <div class="header-right hand">
      <img src="../../assets/img/lang-icon.png" alt class="lang-icon" />
      <span class="Wcolor header-right-lang">{{lang}}</span>
      <img src="../../assets/img/down-icon.png" alt class="down-icon" />
      <ul class="lang-box Dbg">
        <li
          v-for="(item, key) in langArr"
          :key="key"
          class="hand"
          :class="index === key ? 'Wcolor' : 'headerColor'"
          @click="changLang(item, key)"
        >{{item.title}}</li>
      </ul>
    </div>
    <span
      v-if="$route.path !== '/about'"
      class="back-btn hand Bbg center Wcolor"
      @click="back"
    >{{$t('Home.back')}}</span>
  </div>
</template>
<script>
export default {
  name: "appHeader",
  data() {
    return {
      langArr: [
        {
          title: "简体中文",
          lang: "zh"
        },
        {
          title: "English",
          lang: "en"
        },
        {
          title: "한국어",
          lang: "ko"
        },
        {
          title: "日本語",
          lang: "ja"
        },
        {
          title: "ViệtName",
          lang: "va"
        }
      ],
      index: 0
    };
  },
  computed: {
    lang() {
      return this.langArr[this.index].title;
    }
  },
  methods: {
    changLang(item, key) {
      this.index = key;
      this.$i18n.locale = item.lang;
    },
    back() {
      let index = localStorage.getItem("back");
      if (+index === 1 && +this.$store.state.index === 3) {
        this.$router.push("/about");
      }
      if (+this.$store.state.index > 0) {
        let index = +this.$store.state.index;
        this.$store.commit("changeIndex", index - 1);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  // position: fixed;
  top: 0;
  height: 80px;
  min-width: 1000px;
  position: relative;
}
.header-logo {
  width: 143px;
  height: 28px;
  margin: auto 0;
}

// 右边国际化
.header-right {
  height: 80px;
  line-height: 80px;
  position: relative;
}
.lang-icon {
  width: 25px;
  height: 25px;
  vertical-align: middle;
}
.down-icon {
  width: 12px;
  height: 8px;
  transition: ease 0.1s;
}
.header-right-lang {
  display: inline-block;
  width: 80px;
  margin: 0 10px;
}
.header-right:hover .lang-box {
  opacity: 1;
  height: 200px;
}
.header-right:hover .down-icon {
  transform: rotate(180deg);
}

.lang-box:hover {
  opacity: 1;
  height: 200px;
}

// 国际化
.lang-box {
  width: 100px;
  border: 1px solid rgba(96, 105, 134, 1);
  border-radius: 5px;
  position: absolute;
  top: 70px;
  right: 0;
  height: 0;
  opacity: 0;
  transition: ease-in 0.1s;
  z-index: 999;
}
.lang-box li {
  line-height: 40px;
}
.lang-box li:hover {
  color: #fff;
}
.back-btn {
  position: absolute;
  display: inline-block;
  width: 60px;
  height: 40px;
  line-height: 40px;
  top: 20px;
  right: -100px;
  border-radius: 5px;
  z-index: 9999;
}
</style>