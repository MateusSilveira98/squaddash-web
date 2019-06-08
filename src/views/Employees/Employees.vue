<template>
  <article class="employees">
    <Panel :config="employeeConfig" @delete='edit' @toggle="edit" :items="all"></Panel>
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
      return this.$store.state.all
    },
    success() {
      return this.$store.state.success;
    }
  },
  data() {
    return {
      employeeConfig: {
        title: "Pessoas",
        registerPath: "/pessoa/criar",
        buttonText: "Criar pessoa",
        editPath: "/pessoa/editar",
        columns: ["Regime de contratação", "Habilidades", "Status", "Data de criação"],
        boolValueTrue: 'disponível',
        boolValueFalse: 'indisponível',
        props: [
          {
            id: id++,
            name: "modality_of_contracting",
            type: "string"
          },
          {
            id: id++,
            name: "skills",
            type: "array"
          },
          {
            id: id++,
            name: "status",
            type: "boolean"
          },
          {
            id: id++,
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
