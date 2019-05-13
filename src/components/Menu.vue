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
				@click="showNav = !showNav" :class="{ 'is-active': showNav }"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasic" class="navbar-menu" :class="{ 'is-active': showNav }">
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
            <img class="profile" :src="user.image">
            <a class="navbar-link">{{user.name}}</a>

            <div class="navbar-dropdown">
              <router-link :to="`usuarios/editar/${user.id}/${user.type}`" class="navbar-item">Editar perfil</router-link>
              <router-link
                v-if="user.type == 'admin'"
                :to="`usuarios/criar/${user.type}`"
                class="navbar-item"
              >Usuários</router-link>
              <hr class="navbar-divider">
              <a class="navbar-item" @click='logout()'>Sair</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import logo from "@/assets/logo.svg";
import Utils from '@/utils/index';
export default {
  props: {
    user: Object
  },
  data() {
    return {
			logo: logo,
			showNav: false
    };
	},
	methods: {
		logout() {
			Utils.localstorage.remove('token');
			Utils.localstorage.remove('user');
			window.location.reload();
		}
	}
};
</script>

<style lang='scss' scoped>
.navbar-item {
	img {
		max-height: 3rem;
	}
  &.is-active,
  &:hover {
    border-bottom: 1px solid #01bca2 !important;
    color: #01bca2 !important;
    background: none !important;
  }
}
.navbar-brand {
  .navbar-item {
    border-bottom: none !important;
  }
}
.profile {
  border-radius: 105px;
  width: 50px;
  max-height: 50px;
}
</style>
