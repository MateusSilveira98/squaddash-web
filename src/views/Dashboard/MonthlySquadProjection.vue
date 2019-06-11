<template>
  <div class="monthly-projection">
    <div class="field has-addons">
      <div class="control">
        <input
          @input="search"
          class="input width"
          type="text"
          :placeholder="`Pesquise por pessoas ou squads`"
        >
      </div>
      <div class="control">
        <a class="button is-secondary">
          <i class="fa fa-search" aria-hidden="true"></i>
        </a>
      </div>
    </div>
    <header class="monthly-projection-header">
      <a class="button is-pointer" @click="handleYear(--year)">
        <i class="fa fa-angle-left"></i>
      </a>
      <a class="button is-pointer">{{year}}</a>
      <a class="button is-pointer" @click="handleYear(++year)">
        <i class="fa fa-angle-right"></i>
      </a>
    </header>
    <div class="months">
      <div class="month" v-for="month in months" :key="month.id">
        <div class="title">{{month.name}}</div>
        <div v-for="monthSquad in monthSquads" :key="monthSquad.id">
          <div class="box" v-if="monthSquad.month == month.id && monthSquad.year == year">
            <div class="flex justify-content between align-items center">
              <span class="is-bold">{{monthSquad.squad.name}}</span>
              <div class="flex justify-content between align-items center">
                <router-link class="is-pointer" :to="`/squadmensal/editar/${monthSquad.id}`">
                  <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                </router-link>
                <a>
                  <i @click="handleModal(monthSquad)" class="fa fa-trash-o" aria-hidden="true"></i>
                </a>
              </div>
            </div>
            <p class="has-text-left has-text-danger is-bold">{{monthSquad.cost | brCurrency}}</p>

            <section
              class="accordions has-text-left"
              v-if="monthSquad.squad && monthSquad.squad.employees.length > 0"
            >
              <article
                class="accordion"
                :class="activeMonthSquads.includes(monthSquad.id) ? 'is-active': ''"
              >
                <div class="accordion-header toggle" @click="toggleAccordion(monthSquad.id)">
                  <p>Pessoas</p>
                  <i
                    class="fa"
                    :class="activeMonthSquads.includes(monthSquad.id) ? 'fa-angle-up' : 'fa-angle-down'"
                  ></i>
                </div>
                <div class="accordion-body">
                  <div class="accordion-content">
                    <div
                      class="badge"
                      v-for="employee in monthSquad.squad.employees"
                      :key="employee.id"
                    >
                      <span>{{employee.name}}</span>
                    </div>
                  </div>
                </div>
              </article>
            </section>
          </div>
        </div>
        <div class="add">
          <router-link class="button is-pointer" :to="`/squadmensal/criar/${month.id}/${year}`">
            <i class="fa fa-plus"></i>
          </router-link>
        </div>
      </div>
    </div>
    <ConfirmModal
      @send="deleteEntity"
      @close="handleModal"
      :text="modalConfig.text"
      :showModal="modalConfig.show"
      :item="modalConfig.item"
      :title="`Excluir squad mensal`"
    ></ConfirmModal>
  </div>
</template>

<script>
import datepickerlocale from "@/datepicker-locale.json";
import ConfirmModal from "@/components/ConfirmModal";
import moment from "moment";
export default {
  components: {
    ConfirmModal
  },
  props: {
    monthlySquads: { type: Array, default: () => [] }
  },
  watch: {
    monthlySquads(value) {
      this.monthSquads = value;
    }
  },
  data() {
    return {
      months: datepickerlocale.months.longhand,
      year: moment().year(),
      modalConfig: {
        show: false,
        item: {},
        text: ""
      },
      monthSquads: [],
      activeMonthSquads: []
    };
  },
  methods: {
    handleYear(year) {
      this.$emit("changeYear", year);
    },
    handleModal(item) {
      this.modalConfig.show = !this.modalConfig.show;
      if (this.modalConfig.show) {
        this.modalConfig.item = item;
        this.modalConfig.text = `deseja excluir ${item.squad.name} ?`;
      } else {
        this.modalConfig.text = "";
        this.modalConfig.item = {};
      }
    },
    deleteEntity(item) {
      item.deleted = true;
      this.$emit("delete", item);
    },
    toggleAccordion(id) {
      if (!this.activeMonthSquads.includes(id)) this.activeMonthSquads.push(id);
      else this.activeMonthSquads.splice(this.activeMonthSquads.indexOf(id), 1);
    },
    search(event) {
      let search = event.target.value.toLowerCase();
      let array = [];
      if (search && search.length >= 3) {
        this.monthSquads.forEach(item => {
          if (
            (!array.includes(item) &&
              item.squad.name.toLowerCase().match(search)) ||
            item.squad.employees.find(emp =>
              emp.name.toLowerCase().match(search)
            )
          )
            array.push(item);
        });
        this.monthSquads = _.clone(array);
      } else this.monthSquads = this.monthlySquads;
    }
  }
};
</script>

<style lang='scss' scoped>
$green: #01bca2;
$hover: #cffff9;
.monthly-projection {
  border: 1px solid $green;
  padding: 1em;
  border-radius: 4px;
  .monthly-projection-header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 1em;
    padding-bottom: 1em;
    border-bottom: 1px solid $green;
    a {
      font-size: 1.5rem;
      border-color: $green;
      &:hover {
        background-color: $hover;
      }
    }
  }
  .months {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-column-gap: 1em;
    grid-row-gap: 1em;
    text-align: center;
    .add {
      margin: 1em 0;
    }
    .box,
    .add .button {
      border-color: $green;
    }
  }
  .width {
    width: 20em;
  }
}
@media (max-width: 480px) {
  .monthly-projection {
    .months {
      grid-template-columns: auto;
    }
    .width {
      width: 12em;
    }
  }
}

@media (max-width: 767px) {
  .monthly-projection {
    .months {
      grid-template-columns: auto;
    }
  }
}
</style>
