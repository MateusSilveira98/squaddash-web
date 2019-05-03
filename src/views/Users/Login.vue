<template>
  <article class="login">
    <section class="section">
      <div class="container">
        <h2 class="title">Login</h2>
        <div class="card">
          <header>
            <div class="card-image">
              <figure class="image is-128x128">
                <img :src="'../../assets/logo.svg'" alt="logo">
              </figure>
            </div>
            <p class="subtitle has-text-centered">Squad Dash</p>
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
              <div class="field">
                <p class="control">
                  <router-link :to="`usuarios/cadastro`" class="is-primary">Cadastrar-se</router-link>
                </p>
                <p class="control">
                  <a class="is-primary">Esqueci minha senha</a>
                </p>
              </div>
              <div class="field">
                <p class="control">
                  <input type="submit" value="Entrar" class="button is-fullwidth">
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
export default {
  data() {
    return {
      user: {}
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
      console.log('login');
      if (isValid) {
        await this.$store.dispatch("login", user);
        console.log('valid');
        if (this.success) {
          this.$store.dispatch("getLoggedUser");
          console.log('success');
          this.$router.push("/");
        }
      }
    }
  }
};
</script>
