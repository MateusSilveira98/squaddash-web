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
            <input class="input" type="text" :placeholder="`Pesquise por ${config.title}`">
          </div>
          <div class="control">
            <a class="button is-secondary">
              <i class="fa fa-search" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
      <template v-for="item in items">
        <div class="panel" :key="item.id">
          <div class="item">
            <div class="reference">
              <figure class="image flex align-items center" v-if="item.image">
                <img :src="item.image" :alt="item.name">
              </figure>
              <span class="text">{{item.name}}</span>
            </div>
            <div class="icons">
              <a>
                <i class="fa fa-eye" aria-hidden="true"></i>
              </a>
              <router-link :to="`${config.editPath}/${item.id}`">
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
              </router-link>
              <a>
                <i
                  class="fa"
                  :class="item.status ? 'fa-toggle-on' : 'fa-toggle-off'"
                  aria-hidden="true"
                ></i>
              </a>
              <a>
                <i class="fa fa-trash-o" aria-hidden="true"></i>
              </a>
            </div>
          </div>
          <div class="wrap-tables">
            <div class="is-desktop">
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
                  </td>
                </tbody>
              </table>
            </div>
            <div class="is-mobile">
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
    </div>
  </section>
</template>

<script>
export default {
  props: {
    config: Object,
    items: { type: Array, default: () => [] }
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
  .header.flex.align-items.center.justify-content.between {
    display: inline-block;
    width: 100%;
    a.button.is-secondary.is-outilined,
    .field.has-addons .control:first-child{
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
