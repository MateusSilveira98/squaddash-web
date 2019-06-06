<template>
  <article>
    <Menu v-if='user && user.name' :user='user'></Menu>
    <Loading :showLoading="loading"></Loading>
    <Notification
      @close="showNotification = $event"
      :open="showNotification"
      :type="messageClass"
      :duration="2500"
      :message="message"
    ></Notification>
    <router-view/>
  </article>
</template>
<script>
import Loading from "@/components/Loading";
import Notification from "@/components/Notification";
import Menu from "@/components/Menu";
export default {
  components: {
    Loading,
    Notification,
    Menu
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    messageClass() {
      return this.$store.state.messageClass;
    },
    message() {
      return this.$store.state.message;
    },
    loggedUser() {
      return this.$store.state.Users.loggedUser;
    },
    toNotify() {
      return this.$store.state.toNotify;
    },
  },
  watch: {
    toNotify(newValue) {
      this.showNotification = !newValue;
    },
    loggedUser(newValue) {
      this.user = newValue;
    }
  },
  data() {
    return {
      showNotification: false,
      user: {}
    };
  },
  mounted() {
    this.$store.dispatch('getLoggedUser');
  }
};
</script>

<style lang="scss">
@import "./App.scss";
</style>
