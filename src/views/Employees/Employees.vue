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
            name: "salary",
            type: "number"
          },
          {
            name: "modality_of_contracting",
            type: "string"
          },
          {
            name: "profession",
            type: "string"
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
    await this.$store.dispatch('getAll', '/employees');
  }
};
</script>

<style lang='scss' scoped>
</style>
