<template>
  <div class="orders">
    <div class="orders-top">
      <div class="row align-items-center">
        <div class="col-md-4">
          <div class="orders-sum"><b>Cумма:</b> {{sumTotal}} руб.</div>
        </div>
        <div class="col-md-8 d-flex justify-content-end">
          <div class="orders-filter">
            <label for="start">
              От:
              <input type="date" id="start" v-model="dateStart">
            </label>
            <label for="end">
              До:
              <input type="date" id="end" v-model="dateEnd">
            </label>
          </div>
        </div>
      </div>  
    </div>
    
    <div class="row">
      <div class="col-12">
        <v-table>
          <thead>
            <tr>
              <th scope="col">Дата</th>
              <th scope="col">Роллы</th>
              <th scope="col">Себестоимость</th>
              <th scope="col">Цена продажи</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="{_id, date, rolls, cost, price} in filterOrders" :key=_id>
              <td>{{ date }}</td>
              <td>{{ listRolls(rolls) }}</td>
              <td>{{ cost.toFixed(2) }} руб.</td>
              <td>{{ price.toFixed(2) }} руб.</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import vTable from '@/components/v-table'

export default {
  name: 'Orders',
  components: {
    vTable
  },
  data: () => ({
    dateStart: null,
    dateEnd: null
  }),
  computed: {
    ...mapGetters(['orders']),
    filterOrders() {
      if (this.dateStart && this.dateEnd) {
        const startDate = new Date(this.dateStart)
        const endDate = new Date(this.dateEnd)

        return this.orders.filter(o => new Date(o.date) >= startDate && new Date(o.date) <= endDate)
      }
      return this.orders
    },
    sumTotal() {
      return this.filterOrders.reduce((total, o) => total += o.price, 0)
    }
  },
  methods: {
    calculateAmount(products) {
      console.log(products)
    },
    listRolls(rolls) {
      return rolls.map(r => `${r.name} (${r.amount})`).join(', ')
    }
  },
  filters: {
    composition(value) {
      return value.map(p => p.name.toLowerCase()).join(', ')
    }
  },
}
</script>

<style lang="scss" scope>
  .orders {
    &-filter {
      padding: 1rem 0;
      label:not(:last-child) {
        margin-right: 1rem;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .orders-top {
      padding: 1rem 0;
    }
  }
</style>