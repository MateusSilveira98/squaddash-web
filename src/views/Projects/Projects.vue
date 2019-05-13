<template>
  <article class="projects">
    <Panel :config="projectConfig" :items="all"></Panel>
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
      return this.$store.state.all
    }
  },
  data() {
    return {
      projectConfig: {
        title: "Projetos",
        registerPath: "/projeto/criar",
        buttonText: "Criar projeto",
        editPath: "/projeto/editar",
        columns: ["Custo", "Saldo", "Squad", "Cliente", "Status", "Data de criação"],
        props: [
          {
            id: 1,
            name: "squad",
            type: "object",
            attribute: "cost"
          },
          {
            id: 2,
            name: "balance",
            type: "number"
          },
          {
            id: 3,
            name: "squad",
            type: "object",
            attribute: "name"
          },
          {
            id: 4,
            name: "client",
            type: "object",
            attribute: "name"
          },
          {
            id: 5,
            name: "status",
            type: "boolean"
          },
          {
            id: 6,
            name: "created_at",
            type: "date"
          }
        ]
      }
    };
  },
  async mounted() {
    await this.$store.dispatch('getAll', '/projects');
  }
};
</script>

<style lang='scss' scoped>
</style>
