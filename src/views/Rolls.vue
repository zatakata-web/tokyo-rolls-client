<template>
  <div class="rolls">
    <div class="row">
      <div class="col-md-6">
        <div class="rolls__form">
          <form @submit.prevent="createRoll">
            <div class="form-group">
              <label for="orderName">Название:</label>
              <input type="text" class="form-control" id="orderName" v-model="form.name" required>
            </div>
            <div class="form-group">
              <label for="orderPrice">Цена продажи:</label>
              <input type="number" class="form-control" id="orderPrice" v-model="form.price" required>
            </div>
            <div class="rolls__composition">
              <span
                class="badge rounded-pill bg-secondary"
                v-for="p in selectProducts"
                :key="p.id"
                @click="deleteCompositionItem(p._id)"
              >{{p.name}}({{p.value | unit(p.unit)}})
              </span>
            </div>
            <div class="rolls__cost">
              <b>Себестоимость:</b> {{orderCost}} руб.
            </div>
            <button type="submit" class="btn btn-primary">Добавить</button>
          </form>
        </div>
      </div>
      <div class="col-md-6" style="max-height: 100%">
        <div class="rolls__products">
          <v-table>
            <thead>
              <tr>
                <th scope="col">Название</th>
                <th scope="col">В наличии</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in storage" :key=p.id>
                <td>{{ p.name }}</td>
                <td>{{ p.unit == 'kg' ? p.value.toFixed(1) : p.value | unit(p.unit) }}</td>
                <td>
                  <button type="button" class="btn btn-success" @click="addProductToComposition(p)">Добавить</button>
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12" style="max-height: 100%">
        <div class="rolls__list">
          <v-table>
            <thead>
              <tr>
                <th scope="col">Название</th>
                <th scope="col">Состав</th>
                <th scope="col">Себестоимость</th>
                <th scope="col">Цена продажи</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="{_id, name, products, cost, price} in rolls" :key=_id>
                <td>{{ name }}</td>
                <td>{{ products | composition }}</td>
                <td>{{ cost }} руб.</td>
                <td>{{ price }} руб.</td>
                <td>
                  <button
                    type="button" 
                    class="btn btn-sm btn-danger"
                    @click="deleteRollItem(_id)"
                  >
                    Удалить
                  </button>
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
import {mapGetters, mapActions} from 'vuex'
import vTable from '@/components/v-table'

export default {
  name: 'Rolls',
  components: { vTable },
  data: () => ({
    selectProducts: [],
    form: {
      name: null,
      price: null    }
  }),
  computed: {
    ...mapGetters(['storage', 'rolls']),
    orderCost() {
      return this.selectProducts.reduce((sum, p) => sum += p.cost, 0).toFixed(2)
    }
  },
  methods: {
    ...mapActions(['createRollItem', 'deleteRoll']),
    addProductToComposition(product) {
      const selectValue = +prompt('Кол-во')
      const p = {...product}
      p.value = selectValue
      p.cost = (product.cost / (product.value * 1000) * selectValue) * 1000
      this.selectProducts.push(p)
    },
    createRoll() {
      const roll = {
        name: this.form.name,
        price: +this.form.price,
        cost: this.orderCost,
        products: this.selectProducts
      }
      this.createRollItem(roll)

      this.form = {
        name: null,
        price: null,
      }
      this.selectProducts = []
    },
    deleteCompositionItem(id) {
      this.selectProducts = this.selectProducts.filter(p => p._id !== id)
    },
    deleteRollItem(id) {
      this.deleteRoll(id)
    }
  },
}
</script>

<style lang="scss" scoped>
  .rolls {
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
    height: 100%;
    > .row {
      height: 50%;
    }
    &__form {
      .btn {
        margin-top: 1rem;
      }
      .badge {
        padding: .5rem .7rem;
        color: #fff;
        margin-right: .5rem;
        margin-bottom: .5rem;
        cursor: pointer;
      }
    }
    &__composition {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 1rem;
    }
    &__products {
      overflow-y: auto;
      max-height: 100%;
    }
    &__list {
      overflow-y: auto;
      max-height: 100%;
    }
  }
  
  @media screen and (max-width: 768px) {
    .rolls {
      > .row {
        height: auto;
      }
      &__form, &__products {
        margin-bottom: 2rem;
      }
    }
  }
</style>