<template>
  <section class="section">
    <div class="container">
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <div class="tile is-child box">
            <p class="title">{{title}}</p>
            <form @submit.prevent="save(employee)">
              <div class="field">
                <label class="label">Foto do funcionário:</label>
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
                  <input
                    class="input is-capitalize"
                    type="text"
                    placeholder="nome do funcionário: Fulano Costa"
                    v-model="employee.name"
                    v-validate="'required'"
                    name="nome"
                  >
                </div>
                <span v-if="errors.has('nome')" class="has-text-danger">{{ errors.first('nome') }}</span>
              </div>
              <div class="field">
                <label class="label">Profissão:</label>
                <div class="control">
                  <input
                    class="input is-capitalize"
                    type="text"
                    placeholder="profissão: Scrum Master, Full-stack, etc..."
                    v-model="employee.profession"
                    v-validate="'required'"
                    name="profissão"
                  >
                </div>
                <span
                  v-if="errors.has('profissão')"
                  class="has-text-danger"
                >{{ errors.first('profissão') }}</span>
              </div>
              <div class="field">
                <label class="label">Email de contato:</label>
                <div class="control">
                  <input
                    class="input"
                    type="email"
                    placeholder="exemplo@ex.com"
                    v-model="employee.email"
                    name="email"
                  >
                </div>
              </div>
              <div class="field">
                <label class="label">Regime de contratação:</label>
                <div class="control">
                  <label class="radio">
                    <input
                      v-model="employee.modality_of_contracting"
                      v-validate="'required'"
                      value="CLT"
                      type="radio"
                      name="regime de contratação"
                    >
                    CLT
                  </label>
                  <label class="radio">
                    <input
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
                <label class="label">Salário:</label>
                <div class="control">
                  <Money
                    class="input"
                    v-model="employee.salary"
                    v-bind="moneyConfig"
                    name='salário'
                    placeholder="Quanto ganha? 12000,00"
                  ></Money>
                </div>
                <span
                  v-if="errors.has('salário')"
                  class="has-text-danger"
                >{{ errors.first('salário') }}</span>
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
import { Money } from "v-money";
export default {
  components: {
    PhotoUpload,
    Money
  },
  props: {
    title: String,
    employeeProp: Object
  },
  computed: {
    image() {
      return this.$store.state.image;
    }
  },
  data() {
    return {
      employee: {},
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
  }
};
</script>

<style>
</style>
