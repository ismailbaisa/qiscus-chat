<template>
  <nav role="navigation">
    <div class="header flex flex-ai-c flex-jc-c">
      <div class="flex-1">
        <div v-if="isMainFrame">
          <div @click="logout" class="header__avatar flex flex-ai-c flex-jc-sb">
            <img loading="lazy" :src="userData.avatar_url" />
          </div>
        </div>

        <button class="back-button" v-else @click="$router.push('/dashboard')">
          Back
        </button>
      </div>
      <div class="flex-1" style="text-align: center;">
        <h3>{{ pageName }}</h3>
      </div>
      <div class="flex-1 chat-button" style="text-align: right">
        <router-link v-if="isMainFrame" to="/new" tag="a">
          💬
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TopNavbar",
  data() {
    return {
      tooltip: false,
    };
  },
  methods: {
    logout() {
      const vm = this;
      vm.qiscus.logout();
      localStorage.clear();
      vm.$store.dispatch("setLogin", false);
      vm.$store.dispatch("setUserData", null);
      vm.$router.push("/");
    },
  },
  computed: {
    ...mapState(["userData", "pageName"]),
  },
  props: {
    isMainFrame: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style></style>
