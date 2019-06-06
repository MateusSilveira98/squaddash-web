<template>
  <article class="user-register">
    <UserForm @cancel='cancel' @save='create' :isAdmin='isAdmin' :title='"Criar usuário"'></UserForm>
  </article>
</template>

<script>
import UserForm from './UserForm'
export default {
  components: {
    UserForm
  },
  computed: {
    success() {
      return this.$store.state.success;
    }
  },
  data() {
    return {
      isAdmin: false
    }
  },
  methods: {
    cancel(value) {
      this.$router.replace('/login');
    },
    async create(user) {
      await this.$store.dispatch('create', {payload: user, url: '/user/create'});
      if(this.success && !this.isAdmin) this.cancel();
      else if(this.success && this.isAdmin) this.$router.replace('/');
    }
  },
  mounted() {
    this.isAdmin = this.$route.params.type == 'admin';
  }
};
</script>

<style>
</style>
