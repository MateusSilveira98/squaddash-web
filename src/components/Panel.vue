<template>
  <section class="section">
    <div class="container">
      <h1 class="title">{{config.title}}</h1>
      <div class="header flex align-items center justify-content between">
        <router-link
          :to="`${config.registerPath}`"
          class="button is-secondary is-outilined"
        >{{config.buttonText}}</router-link>
        <div class="field has-addons">
          <div class="control">
            <input
              @input="searchTable"
              class="input"
              type="text"
              :placeholder="`Pesquise por ${config.title}`"
            >
          </div>
          <div class="control">
            <a class="button is-secondary">
              <i class="fa fa-search" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
      <template v-for="(item, i) in filteredItems">
        <div class="panel" :key="item.id">
          <div class="item">
            <div class="reference">
              <figure class="image flex align-items center" v-if="item.image">
                <img :src="item.image" :alt="item.name">
              </figure>
              <p class="text">{{item.name}}</p>
            </div>
            <div class="icons">
              <a
                :class="findTableItemByIndex(i) ? 'is-active' : ''"
                :title="`vizualização ${item.name}`"
              >
                <i
                  class="fa fa-eye"
                  aria-hidden="true"
                  @click="handleTable(i, 'close')"
                  v-if="findTableItemByIndex(i)"
                ></i>
                <i
                  class="fa fa-eye-slash"
                  aria-hidden="true"
                  @click="handleTable(i, 'open')"
                  v-else
                ></i>
              </a>
              <router-link :to="`${config.editPath}/${item.id}`">
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
              </router-link>
              <a @click="handleStatus(item)" :class="item.status ? 'is-active' : ''">
                <i
                  class="fa"
                  :class="item.status ? 'fa-toggle-on' : 'fa-toggle-off'"
                  aria-hidden="true"
                ></i>
              </a>
              <a>
                <i @click="handleModal(item)" class="fa fa-trash-o" aria-hidden="true"></i>
              </a>
            </div>
          </div>
          <div class="wrap-tables" v-if="findTableItemByIndex(i)">
            <div
              class="is-desktop"
              :class="showTable.length > 0 && showTable[showTable.indexOf(findTableItemByIndex(i))].type == 'open' ? 'fadeInDown animated' : 'fadeOutUp animated'"
            >
              <table class="table">
                <thead>
                  <th v-for="col in config.columns" :key="col">{{col}}</th>
                </thead>
                <tbody>
                  <td v-for="prop in config.props" :key="prop.name">
                    <span v-if="prop.type == 'string'">{{item[prop.name]}}</span>
                    <span
                      v-if="prop.type == 'boolean'"
                    >{{item[prop.name] | boolFormat('Ativado', 'Desativado')}}</span>
                    <span v-if="prop.type == 'number'">{{item[prop.name] | brCurrency}}</span>
                    <span v-if="prop.type == 'date'">{{item[prop.name] | brDate}}</span>
                    <span v-if="prop.type == 'cnpj'">{{item[prop.name] | cnpj}}</span>
                    <span v-if="prop.type == 'object'">{{item[prop.name].name}}</span>
                  </td>
                </tbody>
              </table>
            </div>
            <div
              class="is-mobile"
              :class="showTable.length > 0 && showTable[showTable.indexOf(findTableItemByIndex(i))].type == 'open' ? 'fadeInDown animated' : 'fadeOutUp animated'"
            >
              <template v-for="(col, index) in config.columns">
                <div class="row" :key="col">
                  <div class="header">
                    <span>{{col}}</span>
                  </div>
                  <div class="body has-text-centered">
                    <span
                      v-if="config.props[index].type == 'string'"
                    >{{item[config.props[index].name]}}</span>
                    <span
                      v-if="config.props[index].type == 'boolean'"
                    >{{config.props[index].name | boolFormat('Ativado', 'Desativado')}}</span>
                    <span
                      v-if="config.props[index].type == 'number'"
                    >{{item[config.props[index].name] | brCurrency}}</span>
                    <span
                      v-if="config.props[index].type == 'date'"
                    >{{item[config.props[index].name] | brDate}}</span>
                    <span
                      v-if="config.props[index].type == 'cnpj'"
                    >{{item[config.props[index].name] | cnpj}}</span>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </template>
      <h1 class="title" v-if='filteredItems.length == 0'>Nenhum resultado encontrado</h1>
      <ConfirmModal
        @send="deleteEntity"
        @close="handleModal"
        :text="modalConfig.text"
        :showModal="modalConfig.show"
        :item="modalConfig.item"
        :title="`Excluir ${config.title}`"
      ></ConfirmModal>
    </div>
  </section>
</template>

<script>
import ConfirmModal from "@/components/ConfirmModal";
import _ from "lodash";
export default {
  components: {
    ConfirmModal
  },
  props: {
    config: Object,
    items: { type: Array, default: () => [] }
  },
  data() {
    return {
      showTable: [],
      filteredItems: [],
      modalConfig: {
        show: false,
        item: {},
        text: ""
      }
    };
  },
  watch: {
    items(newValue) {
      this.filteredItems = newValue;
    }
  },
  methods: {
    searchTable(event) {
      let search = event.target.value;
      let array = [];
      const isBoolean = value => value && value.length ? value : value ? 'Ativado' : 'Desativado';
      if (search && search.length >= 3) {
        this.filteredItems.forEach(item => {
          Object.keys(item).forEach(prop => {
            if (isBoolean(item[prop]).toLowerCase().match(search.toLowerCase()) && !array.includes(item))
              array.push(item);
          });
        });
        this.filteredItems = _.clone(array);
      } else this.filteredItems = this.items;
    },
    handleStatus(item) {
      item.status = !item.status;
      this.$emit("edit", item);
    },
    deleteEntity(item) {
      this.$emit("delete", item);
    },
    handleModal(item) {
      this.modalConfig.show = !this.modalConfig.show;
      if (this.modalConfig.show) {
        this.modalConfig.item = item;
        this.modalConfig.text = `deseja excluir ${item.name} ?`;
      } else {
        this.modalConfig.text = "";
        this.modalConfig.item = {};
      }
    },
    findTableItemByIndex(index) {
      return this.showTable.find(item => item.index == index);
    },
    handleTable(index, type) {
      let tableItemName = this.findTableItemByIndex(index);
      if (!tableItemName) this.showTable.push({ index, type });
      else {
        tableItemName.type = "close";
        setTimeout(() => {
          tableItemName.type = "open";
          this.showTable.splice(this.showTable.indexOf(tableItemName), 1);
        }, 480);
      }
    }
  },
  mounted() {
    this.filteredItems = this.items;
  }
};
</script>

<style lang="scss" scoped>
.panel {
  margin: 1em 0;
  .reference,
  .item,
  .icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .reference {
    .image {
      background: white;
      padding: 1em;
      width: 100px;
      margin-right: 1em;
    }
  }
  .item {
    padding: 1em;
    border-radius: 4px;
    background: #2e3a3a;
    color: white;
    .icons {
      a {
        color: white;
        margin: 0 0.15em;
        &:hover,
        &.is-active {
          color: #01bca2;
        }
      }
    }
  }
  .table {
    width: 100%;
    th {
      color: #01bca2;
      border-color: #01bca2;
    }
    td {
      border: none;
    }
  }
}
.is-desktop {
  display: block;
}
.is-mobile {
  display: none;
  .row {
    margin: 0.1em 0 0.5em;
    .header {
      background: #01bca2;
      color: white;
      border-radius: 4px 4px 0 0;
      padding: 0.5em 1em;
    }
    .body {
      border: 1px solid #01bca2;
      padding: 1em;
      .description {
        width: 100%;
        overflow: auto;
      }
    }
  }
}

@media (max-width: 480px) {
  .reference {
    display: block !important;
    .text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 12em;
    }
  }
  .header.flex.align-items.center.justify-content.between {
    display: inline-block;
    width: 100%;
    a.button.is-secondary.is-outilined,
    .field.has-addons .control:first-child {
      width: 100%;
    }
    a.button.is-secondary.is-outilined {
      margin-bottom: 1em;
    }
  }
  .is-desktop {
    display: none !important;
  }
  .is-mobile {
    display: block !important;
  }
}

@media (max-width: 767px) {
  .is-desktop {
    display: none !important;
  }
  .is-mobile {
    display: block !important;
  }
}
</style>
