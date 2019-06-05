<template>
  <article class="projects">
    <Panel @delete="edit" @toggle="edit" :config="projectConfig" :items="all"></Panel>
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
      projectConfig: {
        title: "Projetos",
        registerPath: "/projeto/criar",
        buttonText: "Criar projeto",
        editPath: "/projeto/editar",
        columns: [
          "Custo",
          "Saldo",
          "Squad",
          "Cliente",
          "Status",
          "Data de início",
          "Data da entrega",
          "Andamento"
        ],
        props: [
          {
            id: 1,
            name: "cost",
            type: "number"
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
            name: "begin_date",
            type: "date"
          },
          {
            id: 7,
            name: "finish_date",
            type: "date"
          },
          {
            id: 8,
            name: "dev",
            type: "string"
          }
        ]
      }
    };
  },
  methods: {
    async edit(project) {
      await this.$store.dispatch("edit", {
        payload: project,
        url: "/project/edit"
      });
      if (this.success) await this.$store.dispatch("getAll", "/projects");
    }
  },
  async mounted() {
    await this.$store.dispatch("getAll", "/projects");
  }
};
</script>

<style lang='scss' scoped>
</style>
