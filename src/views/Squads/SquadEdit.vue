<template>
  <article class="squad-edit">
    <SquadForm
      @cancel="cancel"
      :squadProp="selected"
      @save="edit"
      :title="'Editar squad'"
    ></SquadForm>
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
    },
    selected() {
      return this.$store.state.selected;
    }
  },
  methods: {
    cancel(value) {
      this.$router.replace("/squads");
    },
    async edit(squad) {
      await this.$store.dispatch("edit", {
        payload: squad,
        url: "/squad/edit"
      });
      if (this.success) this.cancel();
    }
  },
  async mounted() {
    await this.$store.dispatch("getById", {
      url: "/squad",
      id: this.$route.params.id
    });
  }
};
</script>

<style>
</style>
