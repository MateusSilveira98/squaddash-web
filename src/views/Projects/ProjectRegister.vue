<template>
  <article class="project-register">
    <ProjectForm @cancel="cancel" @save="create" :title="'Criar projeto'"></ProjectForm>
  </article>
</template>

<script>
import ProjectForm from "./ProjectForm";
export default {
  components: {
    ProjectForm
  },
  computed: {
    success() {
      return this.$store.state.success;
    }
  },
  methods: {
    cancel(value) {
      this.$router.replace("/projetos");
    },
    async create(project) {
      await this.$store.dispatch("create", {
        payload: project,
        url: "/project/create"
      });
      if (this.success) this.cancel();
    }
  }
};
</script>

<style>
</style>
