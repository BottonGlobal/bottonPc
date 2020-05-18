<template>
  <div id="app" :class="$route.path === '/about' ? 'aboutBg' : 'bg'">
    <app-header></app-header>
    <vue-scroll :ops="ops" id="scroll">
      <router-view class="router-view" />
    </vue-scroll>
  </div>
</template>

<script>
import vueScroll from "vuescroll/dist/vuescroll-native";
import "vuescroll/dist/vuescroll.css";
export default {
  name: "App",
  data() {
    return {
      ops: {
        vuescroll: {
          mode: "native",
          sizeStrategy: "percent",
          detectResize: true
        },
        scrollPanel: {
          initialScrollY: false,
          initialScrollX: false,
          scrollingX: false,
          scrollingY: true,
          speed: 300,
          easing: undefined,
          verticalNativeBarPos: "right"
        },
        rail: {
          background: "transparent",
          opacity: 0,
          size: "6px",
          specifyBorderRadius: false,
          gutterOfEnds: null,
          gutterOfSide: "2px",
          keepShow: false
        },
        bar: {
          showDelay: 500,
          onlyShowBarOnScroll: true,
          keepShow: false,
          background: "transparent",
          opacity: 1,
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: false,
          size: "6px",
          disable: false
        }
      }
    };
  },
  components: {
    vueScroll
  },
  methods: {},
  created() {
    localStorage.setItem("back", 2);
    let pri = localStorage.getItem("pri") || "";
    if (pri && pri.length === 64) {
      this.$router.push("/about");
    }
    window.addEventListener("beforeunload", () => {
      this.$route.path !== "/about" && this.$store.commit("changeIndex", 0);
    });
  },
  mounted() {}
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  min-width: 1000px;
  height: 100vh;
  overflow: hidden;
}
.bg {
  background: url(./assets/img/bg.png) no-repeat;
  background-size: 1920px 1080px;
}
.aboutBg {
  background: url(./assets/img/aboutBg.png) no-repeat;
  background-size: 1920px 1080px;
}
#scroll {
  height: calc(100vh - 80px) !important;
}
.router-view {
  min-height: calc(100vh - 80px);
  min-width: 1000px;
  overflow: hidden;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
