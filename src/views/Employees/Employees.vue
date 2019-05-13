<template>
  <article class="employees">
    <Panel :config="employeeConfig" @delete='edit' @toggle="edit" :items="all"></Panel>
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
    },
    success() {
      return this.$store.state.success;
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
  methods: {
    async edit(employee) {
      await this.$store.dispatch("edit", {
        payload: employee,
        url: "/employee/edit"
      });
      if (this.success) await this.$store.dispatch('getAll', '/employees');
    }
  },
  async mounted() {
    await this.$store.dispatch('getAll', '/employees');
  }
};
</script>

<style lang='scss' scoped>
</style>
