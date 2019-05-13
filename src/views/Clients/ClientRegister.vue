<template>
  <article class="client-register">
    <ClientForm @cancel="cancel" @save="create" :title="'Criar cliente'"></ClientForm>
  </article>
</template>

<script>
import ClientForm from "./ClientForm";
export default {
  components: {
    ClientForm
  },
  computed: {
    success() {
      return this.$store.state.success;
    }
  },
  methods: {
    cancel(value) {
      this.$router.replace("/clientes");
    },
    async create(client) {
      await this.$store.dispatch("create", {
        payload: client,
        url: "/client/create"
      });
      if (this.success) this.cancel();
    }
  }
};
</script>

<style>
</style>
