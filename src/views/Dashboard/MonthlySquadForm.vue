<template>
  <section class="section">
    <div class="container">
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <div class="tile is-child box">
            <p class="title">{{title}}</p>
            <form @submit.prevent="save(monthSquad)">
              <div class="field">
                <label class="label">Custo:</label>
                <div class="control">
                  <Money
                    class="input"
                    v-model="monthSquad.cost"
                    v-bind="moneyConfig"
                    name="custo"
                    placeholder="custo do projeto"
                    v-validate="'required'"
                  ></Money>
                </div>
                <span v-if="errors.has('custo')" class="has-text-danger">{{ errors.first('custo') }}</span>
              </div>
              <div class="field">
                <label class="label">Mês e ano:</label>
                <div class="control">
                  <MonthPicker
                    :monthLabels="monthLabels"
                    v-model="monthSquad.date"
                    :value="monthSquad.date"
                    :dateFormat="'MM/YYYY'"
                    :placeHolder="'Mês e ano em que o squad está atuando'"
                    name="Mês e ano"
                    :lang="'pt'"
                  ></MonthPicker>
                </div>
                <span
                  v-if="errors.has('Mês e ano')"
                  class="has-text-danger"
                >{{ errors.first('Mês e ano') }}</span>
              </div>
              <div class="field">
                <label class="label">Squad:</label>
                <div class="control">
                  <div class="select">
                    <select v-validate="'required'" v-model="monthSquad.squad_id" name="squad">
                      <option
                        v-for="squad in squads"
                        :key="squad.id"
                        :value="squad.id"
                      >{{squad.name}}</option>
                    </select>
                  </div>
                </div>
                <span v-if="errors.has('squad')" class="has-text-danger">{{ errors.first('squad') }}</span>
              </div>
              <div class="field is-grouped flex justify-content right align-items center">
                <div class="control">
                  <a class="button is-default" @click="cancel()">Cancelar</a>
                </div>
                <div class="control">
                  <input type="submit" class="button is-primary" value="Salvar">
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Money } from "v-money";
import MonthPicker from "vue-monthly-picker";
import datepickerlocale from "@/datepicker-locale.json";
export default {
  components: {
    Money,
    MonthPicker
  },
  computed: {
    allSquads() {
      return this.$store.state.Squads.all;
    }
  },
  props: {
    title: String,
    monthSquadProp: {type: Object, default: () => {}}
  },
  data() {
    return {
      monthLabels: datepickerlocale.months.longhand,
      monthSquad: {},
      squads: [],
      moneyConfig: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false
      },
    };
  },
  watch: {
    monthSquadProp(value) {
      this.monthSquad = value;
    },
    allSquads(value) {
      this.squads = value.filter(item => item.status);
    }
  },
  methods: {
    async save(monthSquad) {
      const isValid = await this.$validator.validate();
      if (isValid) this.$emit("save", monthSquad);
    },
    cancel() {
      this.$emit("cancel", true);
    }
  },
  async mounted() {
    this.monthLabels = this.monthLabels.map(item => item.name);
    await this.$store.dispatch("getAllSquads");
  }
};
</script>

<style>
</style>
