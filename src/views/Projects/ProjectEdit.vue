<template>
  <article class="project-edit">
    <ProjectForm @cancel="cancel" :projectProp="selected" @save="edit" :title="'Editar projeto'"></ProjectForm>
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
    },
    selected() {
      return this.$store.state.selected;
    }
  },
  methods: {
    cancel(value) {
      this.$router.replace("/projetos");
    },
    async edit(project) {
      await this.$store.dispatch("edit", {
        payload: project,
        url: "/project/edit"
      });
      if (this.success) this.cancel();
    }
  },
  async mounted() {
    await this.$store.dispatch("getById", {
      url: "/project",
      id: this.$route.params.id
    });
  }
};
</script>

<style>
</style>
