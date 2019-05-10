<template>
  <article class="employees">
    <Panel :config="clientConfig" :items="clients"></Panel>
  </article>
</template>

<script>
import Panel from "@/components/Panel";
export default {
  components: {
    Panel
  }
};
</script>

<style lang='sccs' scoped>
</style>
