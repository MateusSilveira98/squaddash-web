<template>
  <article class="employee-edit">
    <EmployeeForm @cancel="cancel" :employeeProp="selected" @save="edit" :title="'Editar pessoa'"></EmployeeForm>
  </article>
</template>

<script>
import EmployeeForm from "./EmployeeForm";
export default {
  components: {
    EmployeeForm
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
      this.$router.replace("/pessoas");
    },
    async edit(employee) {
      await this.$store.dispatch("edit", {
        payload: employee,
        url: "/employee/edit"
      });
      if (this.success) this.cancel();
    }
  },
  async mounted() {
    await this.$store.dispatch("getById", {
      url: "/employee",
      id: this.$route.params.id
    });
  }
};
</script>

<style>
</style>
