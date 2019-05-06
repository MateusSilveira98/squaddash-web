<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" :to="`/`">
        <img :src="logo">
      </router-link>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasic"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasic" class="navbar-menu">
      <div class="navbar-start">
        <router-link
          :to="`/`"
          class="navbar-item"
          :class="$route.path == '/'  ? 'is-active' : ''"
        >Dashboard</router-link>
        <router-link
          :to="`/projetos`"
          class="navbar-item"
          :class="$route.path == '/projetos' ? 'is-active' : '' "
        >Projetos</router-link>
        <router-link
          :to="`/clientes`"
          class="navbar-item"
          :class="$route.path == '/clientes' ? 'is-active' : '' "
        >Clientes</router-link>
        <router-link
          :to="`/squads`"
          class="navbar-item"
          :class="$route.path == '/squads' ? 'is-active' : '' "
        >Squads</router-link>
        <router-link
          :to="`/funcionarios`"
          class="navbar-item"
          :class="$route.path == '/funcionarios' ? 'is-active' : '' "
        >Funcionários</router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">{{user.name}}</a>

            <div class="navbar-dropdown">
              <router-link :to="`usuarios/editar/${user.id}`" class="navbar-item">Editar perfil</router-link>
              <router-link
                v-if="user.type == 'admin'"
                :to="`usuarios/criar/${user.type}`"
                class="navbar-item"
              >Usuários</router-link>
              <hr class="navbar-divider">
              <a class="navbar-item">Sair</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import logo from "@/assets/logo.svg";
export default {
  props: {
    user: Object
  },
  data() {
    return {
      logo: logo
    };
  }
};
</script>

<style lang='scss' scoped>
.navbar-item {
  &.is-active,
  &:hover {
		border-bottom: 1px solid #01BCA2!important;
		color: #01BCA2!important;
		background: none!important;
  }
}
.navbar-brand {
  .navbar-item {
    border-bottom: none!important;
  }
}
</style>
