<template>
  <article class="login">
    <section class="section">
      <div class="container">
        <img class="image" :src="logo" alt="logo">
        <div class="card">
          <header>
            <p class="subtitle has-text-centered">Login</p>
          </header>
          <div class="card-content">
            <form @submit.prevent="login(user)">
              <div class="content">
                <div class="field">
                  <label class="label">Email:</label>
                  <p class="control has-icons-left has-icons-right">
                    <input
                      class="input"
                      type="email"
                      v-validate="'required|email'"
                      name="email"
                      placeholder="exemplo@ex.com"
                      v-model="user.email"
                    >
                    <span class="icon is-small is-left">
                      <i class="fa fa-envelope" aria-hidden="true"></i>
                    </span>
                  </p>
                  <span
                    v-if="errors.has('email')"
                    class="has-text-danger"
                  >{{ errors.first('email') }}</span>
                </div>
                <div class="field">
                  <label class="label">Senha:</label>
                  <p class="control has-icons-left">
                    <input
                      class="input"
                      type="password"
                      placeholder="sua senha aqui"
                      v-model="user.password"
                      maxlength="6"
                      v-validate="'required'"
                      name="senha"
                      @keyup.enter="login(user)"
                    >
                    <span class="icon is-small is-left">
                      <i class="fa fa-lock" aria-hidden="true"></i>
                    </span>
                  </p>
                  <span
                    v-if="errors.has('senha')"
                    class="has-text-danger"
                  >{{ errors.first('senha') }}</span>
                </div>
              </div>
              <div class="field links">
                <p class="control">
                  <router-link :to="`usuarios/cadastro`" class="is-primary">Criar conta</router-link>
                </p>
                <p class="control">
                  <a class="is-primary">Esqueceu a senha?</a>
                </p>
              </div>
              <div class="field">
                <p class="control">
                  <input type="submit" value="Entrar" class="button is-primary is-fullwidth">
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
import logo from "@/assets/logo.svg";
export default {
  data() {
    return {
      user: {},
      logo: logo
    };
  },
  computed: {
    success() {
      return this.$store.state.success;
    }
  },
  methods: {
    async login(user) {
      const isValid = await this.$validator.validate();
      if (isValid) {
        await this.$store.dispatch("login", user);
        if (this.success) {
          this.$store.dispatch("getLoggedUser");
          this.$router.push("/");
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  border-radius: 4px;
  border: 1px solid #01bca2;
  max-width: 94%;
  margin: 0 auto;
  header {
    padding: 1em;
  }
  .links {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
@media all and (max-width: 320px) {
  .card {
    .links {
      display: block;
      width: 100%;
    }
  }
}
</style>
