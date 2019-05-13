<template>
  <article class="squad-register">
    <SquadForm @cancel="cancel" @save="create" :title="'Criar squad'"></SquadForm>
  </article>
</template>

<script>
import SquadForm from "./SquadForm";
export default {
  components: {
    SquadForm
  },
  computed: {
    success() {
      return this.$store.state.success;
    }
  },
  methods: {
    cancel(value) {
      this.$router.replace("/squads");
    },
    async create(squad) {
      await this.$store.dispatch("create", {
        payload: squad,
        url: "/squad/create"
      });
      if (this.success) this.cancel();
    }
  }
};
</script>

<style>
</style>
