<template>
  <section class="section">
    <div class="container">
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <div class="tile is-child box">
            <p class="title">{{title}}</p>
            <form @submit.prevent="save(user)">
              <div class="field">
                <label class="label">Foto de perfil:</label>
                <div class="control">
                  <PhotoUpload
                    :src="user.image"
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
                    placeholder="seu nome aqui: Fulano Costa"
                    v-model="user.name"
                    v-validate="'required'"
                    name="nome"
                  >
                </div>
                <span v-if="errors.has('nome')" class="has-text-danger">{{ errors.first('nome') }}</span>
              </div>
              <div class="field">
                <label class="label">Email:</label>
                <div class="control">
                  <input
                    class="input"
                    type="email"
                    placeholder="exemplo@ex.com"
                    v-model="user.email"
                    v-validate="'required|email'"
                    name="email"
                  >
                </div>
                <span v-if="errors.has('email')" class="has-text-danger">{{ errors.first('email') }}</span>
              </div>
              <div class="field">
                <label class="label">Senha:</label>
                <div class="control">
                  <input
                    class="input"
                    type="password"
                    placeholder="no máximo 6 caractéres"
                    maxlength="6"
                    v-model="user.password"
                    v-validate=" userProp && userProp.name ? '' : 'required|min:6'"
                    name="senha"
                  >
                </div>
                <span v-if="errors.has('senha')" class="has-text-danger">{{ errors.first('senha') }}</span>
              </div>
              <div class="field" v-if='isAdmin'>
                <label class="label">Tipo de permissão:</label>
                <div class="control">
                  <label class="radio">
                    <input type="radio" name="permissão" value="admin" v-model="user.role">
                    Admin
                  </label>
                  <label class="radio">
                    <input type="radio" name="permissão" value="guest" v-model="user.role">
                    Guest
                  </label>
                </div>
                <span v-if="errors.has('permissão')" class="has-text-danger">{{ errors.first('permissão') }}</span>
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
export default {
  components: {
    PhotoUpload
  },
  props: {
    title: String,
    userProp: Object,
    isAdmin: { type: Boolean, default: false }
  },
  computed: {
    image() {
      return this.$store.state.image;
    }
  },
  data() {
    return {
      user: {}
    };
  },
  watch: {
    userProp(value) {
      this.user = value;
    },
    image(newValue) {
      this.user.image = newValue.url;
    }
  },
  methods: {
    async save(user) {
      user.email = user.email.toLowerCase();
      const isValid = await this.$validator.validate();
      if (isValid) this.$emit("save", user);
    },
    async uploadImage(file, imageLink) {
      await this.$store.dispatch("uploadImageToStorage", file);
    },
    handleImage(value) {
      this.user.image = value;
    },
    cancel() {
      this.$emit("cancel", true);
    }
  }
};
</script>

<style>
</style>
