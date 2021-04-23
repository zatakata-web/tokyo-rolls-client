<template>
  <div class="create-order">
    <div class="row">
      <div class="col-md-6 col-12">
        <div class="create-order__list">
          <h4 class="create-order__list-title">Заказ:</h4>
          <ul class="list-group">
            <li 
              class="list-group-item d-flex justify-content-between align-items-center mt-3"
              v-for="(r, idx) in rollsList"
              :key="idx"
            >
              <div>
                {{ r.name }}
                <span class="badge badge-primary badge-pill">{{ r.amount }}</span>
              </div>
              <button type="button" class="btn btn-danger btn-sm" @click="deleteRollItem(r._id)">Удалить</button>
            </li>
          </ul>
          <div class="create-order__cost mt-3" v-if="rollsList.length">
            <b>Цена:</b> {{price}} руб. <span v-if="discount">(скидка {{ discount }}%)</span>
          </div>
          <div class="create-order__options" v-if="rollsList.length">
            <button type="button" class="create-order__discount btn btn-warning" @click="makeDiscount">Оформить скидку %</button>
            <label for="freeShipping" class="create-order__shipping">
              Бесплатная доставка:
              <input type="checkbox" id="freeShipping" v-model="isFreeShipping">
            </label>
          </div>
          <button 
            type="submit" 
            class="btn btn-primary mt-3" 
            @click="createOrder"
            v-if="rollsList.length"
            >Добавить</button>
        </div>

      </div>
      <div class="col-md-6 col-12">
        <div class="create-order__rolls">
          <v-table>
            <thead>
              <tr>
                <th scope="col">Название</th>
                <th scope="col">Цена</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in rolls" :key=r.id>
                <td>{{ r.name }}</td>
                <td>{{ r.price }} руб.</td>
                <td>
                  <button type="button" class="btn btn-success" @click="addRollToOrder(r)">Добавить</button>
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {dateNow} from '@/helpers'
import vTable from '@/components/v-table'

export default {
  name: 'CreateOrder',
  components: { vTable },
  data: () => ({
    rollsList: [],
    isFreeShipping: false,
    discount: null
  }),
  computed: {
    ...mapGetters(['rolls']),
    cost() {
      return this.rollsList.reduce((total, r) => total += r.cost * r.amount, 0)
    },
    price() {
      let price = this.rollsList.reduce((total, r) => total += r.price * r.amount, 0)
      
      if (this.discount) {
        price = price - (price / 100 * this.discount)
      }
      if (this.isFreeShipping) {
        price -= 100
      }

      return price
    }
  },
  methods: {
    ...mapActions(['createOrderItem']),
    addRollToOrder(roll) {
      const amount = +prompt('Кол-во')
      this.rollsList.push({...roll, amount})
    },
    createOrder() {
      const order = {
        date: dateNow(),
        cost: this.cost,
        price: this.price,
        rolls: this.rollsList
      }
      this.createOrderItem(order)

      this.rollsList = []
    },
    deleteRollItem(id) {
      this.rollsList = this.rollsList.filter(r => r._id !== id)
    },
    makeDiscount() {
      this.discount = +prompt('Скидка %')
    }
  },
}
</script>

<style lang="scss">
  .create-order {
    padding: 2rem 0;
    &__options {
      margin-top: 1rem;
    }
    &__discount {
      margin-right: 1rem;
    }
    &__shipping {
      display: inline-flex;
      align-items: center;
      input {
        margin-left: .3rem;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .create-order {
      &__list {
        margin-bottom: 2rem;
      }
    }
  }
  @media screen and (max-width: 394px) {
    .create-order {
      &__shipping {
        margin-top: 1rem;
      }
    }
  }
</style>