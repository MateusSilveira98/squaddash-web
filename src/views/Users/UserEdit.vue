<template>
  <article class="user-edit">
    <UserForm @cancel='cancel' :userProp='selected' @save='edit' :isAdmin='isAdmin' :title='"Editar usuário"'></UserForm>
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
    },
    selected() {
      return this.$store.state.selected;
    }
  },
  data() {
    return {
      isAdmin: false
    }
  },
  methods: {
    cancel(value) {
      this.$router.replace('/');
    },
    async edit(user) {
      await this.$store.dispatch('edit', {payload: user, url: '/user/edit'});
      if(this.success) this.cancel();
    }
  },
  async mounted() {
    this.isAdmin = this.$route.params.type == 'admin';
    await this.$store.dispatch('getById', {url: '/user', id: this.$route.params.id})
  }
};
</script>

<style>
</style>
