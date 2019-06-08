<template>
  <article class="clients">
    <Panel :config="clientConfig" @delete="edit" @toggle="edit" :items="all"></Panel>
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
      return this.$store.state.all;
    },
    success() {
      return this.$store.state.success;
    }
  },
  data() {
    return {
      clientConfig: {
        title: "Clientes",
        registerPath: "/cliente/criar",
        buttonText: "Criar cliente",
        editPath: "/cliente/editar",
        columns: ["Email de contato", "Status", "Data de criação"],
        boolValueTrue: 'ativado',
        boolValueFalse: 'desativado',
        props: [
          {
            id: 1,
            name: "email",
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
    async edit(client) {
      await this.$store.dispatch("edit", {
        payload: client,
        url: "/client/edit"
      });
      if (this.success) await this.$store.dispatch("getAll", "/clients");
    }
  },
  async mounted() {
    await this.$store.dispatch("getAll", "/clients");
  }
};
</script>

<style lang='scss' scoped>
</style>
