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
        buttonText: "Criar squad",
        editPath: "/squad/editar",
        editItemPath: "/funcionario/editar",
        columns: ["Custo", "Funcionários", "Status", "Data de criação"],
        props: [
          {
            id: 1,
            name: "cost",
            type: "number"
          },
          {
            id: 2,
            name: "employees",
            type: "array"
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
  async mounted() {
    await this.$store.dispatch('getAll', '/squads');
  }
};
</script>

<style lang='scss' scoped>
</style>
