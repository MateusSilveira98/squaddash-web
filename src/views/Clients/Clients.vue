<template>
  <article class="clients">
    <Panel :config="clientConfig" :items="clients"></Panel>
  </article>
</template>

<script>
import Panel from "@/components/Panel";
export default {
  components: {
    Panel
  },
  data() {
    return {
      clients: [
        {
          id: 1,
          name: "Spread",
          email: "vinicius.mesquita@spread.com.br",
          image:
            "https://static.wixstatic.com/media/540efb_3c5ead0633cf10e5023bad942aaf9869.png",
          cnpj: "43044682000147",
          status: true,
          deleted: false,
          created_at: "2018-05-09 00:00:00"
        },
        {
          id: 2,
          name: "Spread",
          email: "vinicius.mesquita@spread.com.br",
          image:
            "https://static.wixstatic.com/media/540efb_3c5ead0633cf10e5023bad942aaf9869.png",
          cnpj: "43044682000147",
          status: true,
          deleted: false,
          created_at: "2018-05-09 00:00:00"
        },
        {
          id: 3,
          name: "Spread",
          email: "vinicius.mesquita@spread.com.br",
          image:
            "https://static.wixstatic.com/media/540efb_3c5ead0633cf10e5023bad942aaf9869.png",
          cnpj: "43044682000147",
          status: true,
          deleted: false,
          created_at: "2018-05-09 00:00:00"
        }
      ],
      clientConfig: {
        title: "Clientes",
        registerPath: "/cliente/criar",
        buttonText: "Criar cliente",
        editPath: "/cliente/editar",
        columns: ["Email de contato", "CNPJ", "Status", "Data de criação"],
        props: [
          {
            name: "email",
            type: "string"
          },
          {
            name: "cnpj",
            type: "cnpj"
          },
          {
            name: "status",
            type: "boolean"
          },
          {
            name: "created_at",
            type: "date"
          }
        ]
      }
    };
  }
};
</script>

<style lang='scss' scoped>
</style>
