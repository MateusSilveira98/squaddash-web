<template>
  <article class="employee-register">
    <EmployeeForm @cancel="cancel" @save="create" :title="'Criar pessoa'"></EmployeeForm>
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
    }
  },
  methods: {
    cancel(value) {
      this.$router.replace("/pessoas");
    },
    async create(employee) {
      await this.$store.dispatch("create", {
        payload: employee,
        url: "/employee/create"
      });
      if (this.success) this.cancel();
    }
  }
};
</script>

<style>
</style>
