<template>
  <article class="projects">
    <Panel @delete="edit" @toggle="edit" :config="projectConfig" :items="all"></Panel>
  </article>
</template>

<script>
import Panel from "@/components/Panel";
let id = 0;
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
          "Receita",
          "Squad",
          "Cliente",
          "Status",
          "Data de início",
          "Data de término"
        ],
        props: [
          {
            id: id++,
            name: "revenue",
            type: "number"
          },
          {
            id: id++,
            name: "squad",
            type: "object",
            attribute: "name"
          },
          {
            id: id++,
            name: "client",
            type: "object",
            attribute: "name"
          },
          {
            id: id++,
            name: "status",
            type: "boolean"
          },
          {
            id: id++,
            name: "begin_date",
            type: "date"
          },
          {
            id: id++,
            name: "finish_date",
            type: "date"
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
