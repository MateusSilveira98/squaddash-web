<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Dashboard</h1>
      <div class="header">
        <div class="currency">
          <h1 class="title">Saldo entre receita dos projetos e custo total dos squads no ano</h1>
          <p
            :class="report.currency.gains > report.currency.costs ? 'has-text-success' : 'has-text-danger'"
          >{{report.currency.balance | brCurrency}}</p>
        </div>
        <div class="currency">
          <h1 class="title">Receita de todos os projetos</h1>
          <p class="has-text-success">{{report.currency.gains | brCurrency}}</p>
        </div>
        <div class="currency">
          <h1 class="title">Custos total de todos os squads no ano</h1>
          <p class="has-text-danger">{{report.currency.costs | brCurrency}}</p>
        </div>
      </div>
      <div
        class="card-box"
        v-if="report.projects.higherBalance.length > 0 || report.projects.lowerBalance.length > 0"
      >
        <h1 class="title">Projetos</h1>
        <div class="boxes">
          <InfoBox
            :label="'Projetos com maior saldo'"
            :items="report.projects.higherBalance"
            :type="'balance'"
            v-if="report.projects.higherBalance.length > 0"
          ></InfoBox>
          <InfoBox
            :label="'Projetos com menor saldo'"
            :items="report.projects.lowerBalance"
            :type="'balance'"
            v-if="report.projects.lowerBalance.length > 0"
          ></InfoBox>
        </div>
      </div>
      <div
        class="card-box"
        v-if="report.squads.moreExpensive.length > 0 || report.squads.moreCheap.length > 0"
      >
        <h1 class="title">Squads</h1>
        <div class="boxes">
          <InfoBox
            :label="'Squads mais caros'"
            v-if="report.squads.moreExpensive.length > 0"
            :items="report.squads.moreExpensive"
            :type="'cost'"
          ></InfoBox>
          <InfoBox
            :label="'Squads mais baratos'"
            v-if="report.squads.moreCheap.length > 0"
            :items="report.squads.moreCheap"
            :type="'cost'"
          ></InfoBox>
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
            :label="'Pessoas disponíveis'"
            :items="report.employees.online"
          ></InfoBox>
          <InfoBox
            :label="'Pessoas indisponíveis'"
            :items="report.employees.offline"
            v-if="report.employees.offline.length > 0"
          ></InfoBox>
        </div>
      </div>
      <div class="card-box" v-if="report.clients.createdRecently.length > 0">
        <h1 class="title">Clientes</h1>
        <div class="boxes">
          <InfoBox :label="'Clientes recém criados'" :items="report.clients.createdRecently"></InfoBox>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import InfoBox from "@/components/InfoBox";
export default {
  components: {
    InfoBox
  },
  computed: {
    reports() {
      return this.$store.state.Dashboard.reports;
    }
  },
  data() {
    return {
      report: {
        squads: {
          moreExpensive: [],
          moreCheap: []
        },
        employees: {
          online: [],
          offline: []
        },
        clients: {
          createdRecently: []
        },
        projects: {
          higherBalance: [],
          lowerBalance: []
        },
        currency: {
          gains: 0,
          balance: 0,
          costs: 0
        }
      }
    };
  },
  watch: {
    reports(value) {
      this.report = value;
    }
  },
  async mounted() {
    await this.$store.dispatch("getAllReports");
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
  margin-bottom: 2em;
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
