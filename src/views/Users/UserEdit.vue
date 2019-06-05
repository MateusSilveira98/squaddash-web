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
    },
    loggedUser() {
      return this.$store.state.Users.loggedUser;
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
      let url = '/user/edit';
      if(user.id == this.loggedUser.id) await this.$store.dispatch('editUser', {payload: user, url})
      await this.$store.dispatch('edit', {payload: user, url});
      if(this.success) this.cancel();
    }
  },
  async mounted() {
    this.isAdmin = this.$route.params.role == 'admin';
    await this.$store.dispatch('getById', {url: '/user', id: this.$route.params.id})
  }
};
</script>

<style>
</style>
