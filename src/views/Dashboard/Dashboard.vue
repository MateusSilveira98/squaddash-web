<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Dashboard</h1>
      <MonthlySquadProjection @changeYear="handleYear" @delete='edit' :monthlySquads="monthSquads"></MonthlySquadProjection>
      <div class="header">
        <div class="currency">
          <h1 class="title">Custos total de todos os squads no ano {{year}}</h1>
          <p class="has-text-danger">{{costsByYear | brCurrency}}</p>
        </div>
      </div>
      <div
        class="card-box"
        v-if="report.employees.online.length > 0 || report.employees.offline.length > 0"
      >
        <h1 class="title">Pessoas</h1>
        <div class="boxes">
          <InfoBox
            v-if="report.employees.online.length > 0"
            :label="'Pessoas ativadas'"
            :items="report.employees.online"
            :type="'quantity'"
          ></InfoBox>
          <InfoBox
            :label="'Pessoas desativadas'"
            :items="report.employees.offline"
            v-if="report.employees.offline.length > 0"
            :type="'quantity'"
          ></InfoBox>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import InfoBox from "@/components/InfoBox";
import MonthlySquadProjection from "@/views/Dashboard/MonthlySquadProjection";
import moment from 'moment';
export default {
  components: {
    InfoBox,
    MonthlySquadProjection
  },
  computed: {
    reports() {
      return this.$store.state.Dashboard.reports;
    },
    all() {
      return this.$store.state.all
    },
    costsByYear() {
      return this.$store.state.Dashboard.costsByYear
    }
  },
  watch: {
    reports(value) {
      this.report = value;
    },
    all(value) {
      this.monthSquads = value;
    }
  },
  data() {
    return {
      year: moment().year(),
      monthSquads: [],
      report: {
        employees: {
          online: [],
          offline: []
        }
      }
    };
  },
  methods: {
    async edit(monthlysquad) {
      await this.$store.dispatch("edit", {
        payload: monthlysquad,
        url: "/monthlysquads/edit"
      });
      if (this.success) await this.$store.dispatch('getAll', '/monthlysquads');
    },
    handleYear(year) {
      this.year = year;
    }
  },
  async mounted() {
    await this.$store.dispatch("getAllReports");
    await this.$store.dispatch("getCostsByYear", this.year);
    await this.$store.dispatch('getAll', '/monthlysquads');
  }
};
</script>

<style lang='scss' scoped>
.card-box {
  margin-bottom: 2em;
  .boxes {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-column-gap: 1em;
    grid-row-gap: 1em;
  }
}
.header {
  margin: 2em 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .currency {
    h1 {
      margin-bottom: 0;
      font-size: 1rem;
    }
    p {
      font-weight: bold;
      font-size: 2rem;
    }
  }
}
@media (max-width: 480px) {
  .card-box {
    .boxes {
      display: block !important;
    }
  }
}

@media (max-width: 767px) {
  .card-box {
    .boxes {
      display: block !important;
    }
  }
  .header {
    display: block !important;
  }
}
</style>
