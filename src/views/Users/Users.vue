<template>
  <article class="users">
    <Panel @delete="edit" @toggle="edit" :config="userConfig" :items="all"></Panel>
  </article>
</template>

<script>
import Panel from "@/components/Panel";
export default {
  components: {
    Panel
  },
  computed: {
    all() {
      return this.$store.state.Users.all;
    },
    success() {
      return this.$store.state.success;
    },
    loggedUser() {
      return this.$store.state.Users.loggedUser;
    }
  },
  data() {
    return {
      user: {},
      userConfig: {
        title: "Usuários",
        registerPath: "/usuarios/criar/admin",
        buttonText: "Criar usuario",
        editPath: "/usuarios/editar",
        columns: [
          "Nome",
          "Tipo de permissão",
          "Status",
          "Data de criação"
        ],
        boolValueTrue: 'ativado',
        boolValueFalse: 'desativado',
        props: [
          {
            id: 1,
            name: "name",
            type: "string"
          },
          {
            id: 2,
            name: "role",
            type: "string"
          },
          {
            id: 3,
            name: "status",
            type: "boolean"
          },
          {
            id: 4,
            name: "created_at",
            type: "date"
          }
        ]
      }
    };
  },
  methods: {
    async edit(user) {
      await this.$store.dispatch("edit", {
        payload: user,
        url: "/user/edit"
      });
      if (this.success) await this.$store.dispatch("getAllUsers", this.loggedUser.id);
    }
  },
  async mounted() {
    this.$store.dispatch('getLoggedUser');
    await this.$store.dispatch("getAllUsers", this.loggedUser.id);
  }
};
</script>

<style lang='scss' scoped>
</style>
