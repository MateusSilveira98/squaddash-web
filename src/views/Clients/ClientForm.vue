<template>
  <section class="section">
    <div class="container">
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <div class="tile is-child box">
            <p class="title">{{title}}</p>
            <form @submit.prevent="save(client)">
              <div class="field">
                <label class="label">Foto do cliente ou logo:</label>
                <div class="control">
                  <PhotoUpload
                    :src="client.image"
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
                    placeholder="Nome do cliente: Empresa Exemplo"
                    v-model="client.name"
                    v-validate="'required'"
                    name="nome"
                  >
                </div>
                <span v-if="errors.has('nome')" class="has-text-danger">{{ errors.first('nome') }}</span>
              </div>
              <div class="field">
                <label class="label">Email de contato:</label>
                <div class="control">
                  <input
                    class="input"
                    type="email"
                    placeholder="exemplo@ex.com"
                    v-model="client.email"
                    name="email"
                  >
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
import {TheMask} from 'vue-the-mask'
export default {
  components: {
    PhotoUpload,
    TheMask
  },
  props: {
    title: String,
    clientProp: Object
  },
  computed: {
    image() {
      return this.$store.state.image;
    }
  },
  data() {
    return {
      client: {}
    };
  },
  watch: {
    clientProp(value) {
      this.client = value;
    },
    image(newValue) {
      this.client.image = newValue.url;
    }
  },
  methods: {
    async save(client) {
      client.email = client.email.toLowerCase();
      const isValid = await this.$validator.validate();
      if (isValid) this.$emit("save", client);
    },
    async uploadImage(file, imageLink) {
      await this.$store.dispatch("uploadImageToStorage", file);
    },
    handleImage(value) {
      this.client.image = value;
    },
    cancel() {
      this.$emit("cancel", true);
    }
  }
};
</script>

<style>
</style>
