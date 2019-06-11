<template>
  <div class="monthly-projection">
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
              <span>{{monthSquad.squad.name}}</span>
              <div class="flex justify-content between align-items center">
                <router-link class="is-pointer" :to="`/squadmensal/editar/${monthSquad.id}`">
                  <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                </router-link>
                <a>
                  <i @click="handleModal(monthSquad)" class="fa fa-trash-o" aria-hidden="true"></i>
                </a>
              </div>
            </div>
            <p>{{monthSquad.cost | brCurrency}}</p>
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
    monthlySquads:  { type: Array, default: () => [] }
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
      monthSquads: []
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
    }
  },
  mounted() {
    this.monthSquads = this.monthlySquads;
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
    .add {
      margin: 1em 0;
    }
    .box,
    .add .button {
      border-color: $green;
    }
  }
}
</style>
