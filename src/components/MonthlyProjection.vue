<template>
  <div class="monthly-projection">
    <header class="monthly-projection-header">
      <a class="button is-pointer" @click="year--">
        <i class="fa fa-angle-left"></i>
      </a>
      <a class="button is-pointer">{{year}}</a>
      <a class="button is-pointer" @click="year++">
        <i class="fa fa-angle-right"></i>
      </a>
    </header>
    <div class="months">
      <div class="month" v-for="month in months" :key="month">
        <div class="title">{{month}}</div>
        <div class="box">
          <span>Squad</span>
          <p>R$ 30.000,00</p>
        </div>
        <div class="add">
          <a class="button is-pointer">
            <i class="fa fa-plus"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import datepickerlocale from "@/datepicker-locale.json";
import moment from "moment";
export default {
  data() {
    return {
      months: datepickerlocale.months.longhand,
      year: moment().year()
    };
  }
};
</script>

<style lang='scss' scoped>
$green: #01bca2;
$hover: #cffff9;
.monthly-projection {
  border: 1px solid $green;
  padding: 1em;
  border-radius: 4px;
  .monthly-projection-header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 1em;
    padding-bottom: 1em;
    border-bottom: 1px solid $green;
    a {
      font-size: 1.5rem;
      border-color: $green;
      &:hover {
        background-color: $hover;
      }
    }
  }
  .months {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-column-gap: 1em;
    grid-row-gap: 1em;
    .box, .add .button {
      border-color: $green;
    }
  }
}
</style>
