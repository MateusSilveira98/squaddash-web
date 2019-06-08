<template>
  <section class="section">
    <div class="container">
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <div class="tile is-child box">
            <p class="title">{{title}}</p>
            <form @submit.prevent="save(employee)">
              <div class="field">
                <label class="label">Foto da pessoa:</label>
                <div class="control">
                  <PhotoUpload
                    :src="employee.image"
                    @remove="handleImage"
                    @upload="uploadImage"
                    :uploadButtonText="'Selecionar'"
                    :removeButtonText="'Remover'"
                  ></PhotoUpload>
                </div>
              </div>
              <div class="field">
                <label class="label">Nome:</label>
                <div class="control">
                  <input autocomplete="off"
                    class="input"
                    type="text"
                    placeholder="nome da peassoa: Fulano Costa"
                    v-model="employee.name"
                    v-validate="'required'"
                    name="nome"
                  >
                </div>
                <span v-if="errors.has('nome')" class="has-text-danger">{{ errors.first('nome') }}</span>
              </div>
              <div class="field">
                <label class="label">Email de contato:</label>
                <div class="control">
                  <input autocomplete="off"
                    class="input"
                    type="email"
                    placeholder="exemplo@ex.com"
                    v-model="employee.email"
                    v-validate="'required|email'"
                    name="email"
                  >
                </div>
                <span
                  v-if="errors.has('email')"
                  class="has-text-danger"
                >{{ errors.first('email') }}</span>
              </div>
              <div class="field">
                <label class="label">Regime de contratação:</label>
                <div class="control">
                  <label class="radio">
                    <input autocomplete="off"
                      v-model="employee.modality_of_contracting"
                      v-validate="'required'"
                      value="CLT"
                      type="radio"
                      name="regime de contratação"
                    >
                    CLT
                  </label>
                  <label class="radio">
                    <input autocomplete="off"
                      v-model="employee.modality_of_contracting"
                      v-validate="'required'"
                      value="PJ"
                      type="radio"
                      name="regime de contratação"
                    >
                    PJ
                  </label>
                </div>
                <span
                  v-if="errors.has('regime de contratação')"
                  class="has-text-danger"
                >{{ errors.first('regime de contratação') }}</span>
              </div>
              <div class="field">
                <label class="label">Habilidades:</label>
                <div class="control">
                  <Multiselect
                    v-model="employee.skills"
                    :options="skills"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    placeholder="Selecione as habilidades"
                    label="name"
                    track-by="name"
                  >
                    <template slot="selection" slot-scope="{ values, search, isOpen }">
                      <span v-if="values.length && !isOpen">{{ values.length }} habilidades</span>
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
import PhotoUpload from "@/components/PhotoUpload";
import Multiselect from "vue-multiselect";

export default {
  components: {
    PhotoUpload,
    Multiselect
  },
  props: {
    title: String,
    employeeProp: Object
  },
  computed: {
    image() {
      return this.$store.state.image;
    },
    all() {
      return this.$store.state.all;
    }
  },
  data() {
    return {
      employee: {},
      skills: [],
      moneyConfig: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false
      }
    };
  },
  watch: {
    employeeProp(value) {
      this.employee = value;
    },
    image(newValue) {
      this.employee.image = newValue.url;
    },
    all(newValue) {
      this.skills = newValue;
    }
  },
  methods: {
    async save(employee) {
      employee.email = employee.email.toLowerCase();
      const isValid = await this.$validator.validate();
      if (isValid) this.$emit("save", employee);
    },
    async uploadImage(file, imageLink) {
      await this.$store.dispatch("uploadImageToStorage", file);
    },
    handleImage(value) {
      this.employee.image = value;
    },
    cancel() {
      this.$emit("cancel", true);
    }
  },
  async mounted() {
    await this.$store.dispatch("getAll", "/skills");
  }
};
</script>

<style>
</style>
