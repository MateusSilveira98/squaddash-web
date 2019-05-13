<template>
  <article class="client-edit">
    <ClientForm
      @cancel="cancel"
      :clientProp="selected"
      @save="edit"
      :title="'Editar cliente'"
    ></ClientForm>
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
    },
    selected() {
      return this.$store.state.selected;
    }
  },
  methods: {
    cancel(value) {
      this.$router.replace("/clientes");
    },
    async edit(client) {
      await this.$store.dispatch("edit", { payload: client, url: "/client/edit" });
      if (this.success) this.cancel();
    }
  },
  async mounted() {
    await this.$store.dispatch("getById", {
      url: "/client",
      id: this.$route.params.id
    });
  }
};
</script>

<style>
</style>
