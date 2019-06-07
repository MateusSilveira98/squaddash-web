<template>
  <section class="section">
    <div class="container">
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <div class="tile is-child box">
            <p class="title">{{title}}</p>
            <form @submit.prevent="save(project)">
              <div class="field">
                <label class="label">Nome:</label>
                <div class="control">
                  <input
                    autocomplete="off"
                    class="input"
                    type="text"
                    placeholder="nome do projeto: Projeto zeta, projeto vingadores..."
                    v-model="project.name"
                    v-validate="'required'"
                    name="nome"
                  >
                </div>
                <span v-if="errors.has('nome')" class="has-text-danger">{{ errors.first('nome') }}</span>
              </div>
              <div class="field">
                <label class="label">Valor:</label>
                <div class="control">
                  <Money
                    class="input"
                    v-model="project.revenue"
                    v-bind="moneyConfig"
                    name="receita"
                    placeholder="receita do projeto"
                    v-validate="'required'"
                  ></Money>
                </div>
                <span v-if="errors.has('receita')" class="has-text-danger">{{ errors.first('receita') }}</span>
              </div>
              <div class="field">
                <div class="columns">
                  <div class="column">
                    <label class="label">Data início:</label>
                    <div class="control">
                      <Datepicker
                        v-model="project.begin_date"
                        :format="'dd/MM/yyyy'"
                        name="Data início"
                        :language="ptBR"
                      ></Datepicker>
                    </div>
                    <span
                      v-if="errors.has('Data início')"
                      class="has-text-danger"
                    >{{ errors.first('Data início') }}</span>
                  </div>
                  <div class="column">
                    <label class="label">Data de término:</label>
                    <div class="control">
                      <Datepicker
                        v-model="project.finish_date"
                        :format="'dd/MM/yyyy'"
                        name="Data de término"
                        :language="ptBR"
                      ></Datepicker>
                    </div>
                    <span
                      v-if="errors.has('Data de término')"
                      class="has-text-danger"
                    >{{ errors.first('Data de término') }}</span>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="columns">
                  <div class="column">
                    <label class="label">Cliente:</label>
                    <div class="control">
                      <div class="select">
                        <select v-validate="'required'" v-model="project.client_id" name="cliente">
                          <option
                            v-for="client in clients"
                            :key="client.id"
                            :value="client.id"
                          >{{client.name}}</option>
                        </select>
                      </div>
                    </div>
                    <span
                      v-if="errors.has('cliente')"
                      class="has-text-danger"
                    >{{ errors.first('cliente') }}</span>
                  </div>
                  <div class="column">
                    <label class="label">Squad:</label>
                    <div class="control">
                      <div class="select">
                        <select v-validate="'required'" v-model="project.squad_id" name="squad">
                          <option
                            v-for="squad in squads"
                            :key="squad.id"
                            :value="squad.id"
                          >{{squad.name}}</option>
                        </select>
                      </div>
                    </div>
                    <span
                      v-if="errors.has('squad')"
                      class="has-text-danger"
                    >{{ errors.first('squad') }}</span>
                  </div>
                </div>
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
import Datepicker from "vuejs-datepicker";
import { ptBR } from "vuejs-datepicker/dist/locale";

export default {
  components: {
    Money,
    Datepicker
  },
  computed: {
    allClients() {
      return this.$store.state.Clients.all;
    },
    allSquads() {
      return this.$store.state.Squads.all;
    }
  },
  props: {
    title: String,
    projectProp: Object
  },
  data() {
    return {
      project: {},
      squads: [],
      clients: [],
      moneyConfig: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false
      },
      ptBR: ptBR
    };
  },
  watch: {
    projectProp(value) {
      this.project = value;
    },
    allSquads(value) {
      this.squads = value.filter(item => item.status);
    },
    allClients(value) {
      this.clients = value.filter(item => item.status);
    }
  },
  methods: {
    async save(project) {
      const isValid = await this.$validator.validate();
      if (isValid) this.$emit("save", project);
    },
    cancel() {
      this.$emit("cancel", true);
    }
  },
  async mounted() {
    await this.$store.dispatch("getAllClients");
    await this.$store.dispatch("getAllSquads");
  }
};
</script>

<style>
</style>
