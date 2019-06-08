<template>
  <div class="info-box">
    <p>{{label}}</p>
    <div class="items">
      <div class="item" v-for="item in items" :key="item.id">
        <div class="badge">
          <p>{{item.name}}</p>
          <span v-if="item.cost && type == 'cost'">{{item.cost | brCurrency}}</span>
          <span v-if="item.balance && type == 'balance'">{{item.balance | brCurrency}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    type: String,
    items: { type: Array, default: () => [] }
  }
};
</script>

<style lang="scss" scoped>
$green: #01bca2;
.info-box {
  padding: 1em;
  border: 1px solid $green;
  border-radius: 4px;
  width: 400px;
  p {
    font-weight: bold;
  }
  .item {
    .badge {
      background: #e5e5e5;
      color: $green;
      display: flex;
      justify-content: space-between;
      padding: 0.35em;
      margin-bottom: 0.35em;
      width: 100%;
      align-items: center;
      p,
      span {
        color: $green;
      }
      p {
        font-weight: normal;
        width: 200px;
      }
    }
  }
}

@media (max-width: 480px) {
  .info-box {
    width: 100%;
    margin-bottom: 1em;
  }
}

@media (max-width: 767px) {
  .info-box {
    width: 100%;
    margin-bottom: 1em;
  }
}
</style>
