<template>
  <article class="monthly-squad-register">
    <MonthlySquadForm @cancel="cancel" :monthSquadProp="monthSquad" @save="create" :title="'Criar custo mensal do squad'"></MonthlySquadForm>
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
    }
  },
  data() {
    return {
      monthSquad: {
        cost: 0
      }
    }
  },
  methods: {
    cancel(value) {
      this.$router.replace("/");
    },
    async create(monthlySquad) {
      await this.$store.dispatch("create", {
        payload: monthlySquad,
        url: "/monthlysquad/create"
      });
      if (this.success) this.cancel();
    }
  },
  mounted() {
    this.monthSquad.date = moment([this.$route.params.year, this.$route.params.month, 1]);
  }
};
</script>

<style>
</style>
