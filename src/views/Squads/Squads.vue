<template>
  <article class="squads">
    <Panel :config="squadConfig" :items="all"></Panel>
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
      squadConfig: {
        title: "Squads",
        registerPath: "/squad/criar",
        buttonText: "Criar funcionário",
        editPath: "/squad/editar",
        editItemPath: "/funcionario/editar",
        columns: ["Custo", "Funcionários", "Status", "Data de criação"],
        props: [
          {
            name: "cost",
            type: "number"
          },
          {
            name: "employees",
            type: "array"
          },
          {
            name: "status",
            type: "boolean"
          },
          {
            name: "created_at",
            type: "date"
          }
        ]
      }
    };
  },
  async mounted() {
    await this.$store.dispatch('getAll', '/squads');
  }
};
</script>

<style lang='scss' scoped>
</style>
