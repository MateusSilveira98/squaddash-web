<template>
  <article class="clients">
    <Panel :config="clientConfig" :items="all"></Panel>
  </article>
</template>

<script>
import Panel from "@/components/Panel";
import _ from 'lodash';
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
      clientConfig: {
        title: "Clientes",
        registerPath: "/cliente/criar",
        buttonText: "Criar cliente",
        editPath: "/cliente/editar",
        columns: ["Email de contato", "CNPJ", "Status", "Data de criação"],
        props: [
          {
            name: "email",
            type: "string"
          },
          {
            name: "cnpj",
            type: "cnpj"
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
    await this.$store.dispatch('getAll', '/clients');
  }
};
</script>

<style lang='scss' scoped>
</style>
