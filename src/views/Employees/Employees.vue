<template>
  <article class="employees">
    <Panel :config="employeeConfig" :items="all"></Panel>
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
      employeeConfig: {
        title: "Funcionários",
        registerPath: "/funcionario/criar",
        buttonText: "Criar funcionário",
        editPath: "/funcionario/editar",
        columns: ["Salário", "Regime de contratação", "Cargo", "Status", "Data de criação"],
        props: [
          {
            id: 1,
            name: "salary",
            type: "number"
          },
          {
            id: 2,
            name: "modality_of_contracting",
            type: "string"
          },
          {
            id: 3,
            name: "profession",
            type: "string"
          },
          {
            id: 4,
            name: "status",
            type: "boolean"
          },
          {
            id: 5,
            name: "created_at",
            type: "date"
          }
        ]
      }
    };
  },
  async mounted() {
    await this.$store.dispatch('getAll', '/employees');
  }
};
</script>

<style lang='scss' scoped>
</style>
