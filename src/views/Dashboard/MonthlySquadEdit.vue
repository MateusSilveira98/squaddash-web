<template>
  <article class="monthly-squad-edit">
    <MonthlySquadForm @cancel="cancel" :monthSquadProp="monthSquad" @save="edit" :title="'Editar squad mensal'"></MonthlySquadForm>
  </article>
</template>

<script>
import MonthlySquadForm from "./MonthlySquadForm";
import moment from 'moment';
export default {
  components: {
    MonthlySquadForm
  },
  computed: {
    success() {
      return this.$store.state.success;
    },
    selected() {
      return this.$store.state.selected;
    }
  },
  watch: {
    selected(value) {
      this.monthSquad = value;
      this.monthSquad.date = moment([this.monthSquad.year, this.monthSquad.month, 1]);
      delete this.monthSquad.year; 
      delete this.monthSquad.month;
      this.monthSquad.cost = +this.monthSquad.cost;
    }
  },
  data() {
    return {
      monthSquad: {}
    }
  },
  methods: {
    cancel(value) {
      this.$router.replace("/");
    },
    async edit(monthlysquad) {
      await this.$store.dispatch("edit", {
        payload: monthlysquad,
        url: "/monthlysquad/edit"
      });
      if (this.success) this.cancel();
    }
  },
  async mounted() {
    await this.$store.dispatch("getById", {
      url: "/monthlysquad",
      id: this.$route.params.id
    });
  }
};
</script>

<style>
</style>
