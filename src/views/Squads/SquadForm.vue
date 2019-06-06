<template>
  <section class="section">
    <div class="container">
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <div class="tile is-child box">
            <p class="title">{{title}}</p>
            <form @submit.prevent="save(squad)">
              <div class="field">
                <label class="label">Nome:</label>
                <div class="control">
                  <input
                    autocomplete="off"
                    class="input"
                    type="text"
                    placeholder="nome do squad: Squad Somos, Noob Team, Team Inovação...."
                    v-model="squad.name"
                    v-validate="'required'"
                    name="nome"
                  >
                </div>
                <span v-if="errors.has('nome')" class="has-text-danger">{{ errors.first('nome') }}</span>
              </div>
              <div class="field">
                <label class="label">Funcionários:</label>
                <div class="control">
                  <Multiselect
                    v-model="squad.employees"
                    :options="employees"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    placeholder="Selecione os funcionários"
                    label="name"
                    track-by="name"
                  >
                    <template slot="selection" slot-scope="{ values, search, isOpen }">
                      <span v-if="values.length && !isOpen">{{ values.length }} funcionários</span>
                    </template>
                  </Multiselect>
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
import Multiselect from "vue-multiselect";
export default {
  components: {
    Multiselect
  },
  computed: {
    all() {
      return this.$store.state.all;
    }
  },
  props: {
    title: String,
    squadProp: Object
  },
  data() {
    return {
      squad: {},
      employees: []
    };
  },
  watch: {
    squadProp(value) {
      this.squad = value;
    },
    all(value) {
      this.employees = value.filter(item => item.status);
    }
  },
  methods: {
    async save(squad) {
      const isValid = await this.$validator.validate();
      if (isValid) this.$emit("save", squad);
    },
    cancel() {
      this.$emit("cancel", true);
    }
  },
  async mounted() {
    await this.$store.dispatch("getAll", "/employees");
  }
};
</script>

<style>
</style>
