<template>
  <div class="products">
    <form class="products-form" @submit.prevent="addProduct">
      <div class="row align-items-end">
        <div class="col-md-3 col-sm-12">
          <div class="form-group">
            <label for="nameProduct">Название продукта:</label>
            <input type="text" class="form-control" id="nameProduct" v-model="form.name" required>
          </div>
        </div>

        <div class="col-md-3 col-sm-12">
          <div class="form-group">
            <label for="unitProduct">Ед. измерения:</label>
            <select class="form-control" id="unitProduct" v-model="form.unit">
              <option value="kg">кг.</option>
              <option value="gr">г.</option>
              <option value="thing">шт.</option>
            </select>
          </div>
        </div>

        <div class="col-md-3 col-sm-12">
          <div class="form-group">
            <label for="costProduct">Цена закупки:</label>
            <input type="number" class="form-control" id="costProduct" v-model="form.cost" required>
          </div>
        </div>

        <div class="col-md-3 col-sm-12">
          <div class="form-group">
            <label for="priceProduct">Цена продажи:</label>
            <input type="number" class="form-control" id="priceProduct" v-model="form.price" required>
          </div>
        </div>
        
        <div class="col">
          <div class="form-group">
            <button 
              type="submit" 
              class="btn btn-success" 
            >Добавить
            </button>
          </div> 
        </div>
      </div>
    </form>

    <div class="row">
      <div class="col-12">
        <v-table>
          <thead>
            <tr>
              <th scope="col">Название</th>
              <th scope="col">Ед. изм.</th>
              <th scope="col">Цена закупки</th>
              <th scope="col">Цена продажи</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="{_id, name, unit, cost, price} in products" :key=_id>
              <td>{{ name }}</td>
              <td>{{ '' | unit(unit) }}</td>
              <td>{{ cost }} руб.</td>
              <td>{{ price }} руб.</td>
              <td>
                <button
                  type="button" 
                  class="btn btn-sm btn-danger"
                  @click="deleteProduct(_id)"
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
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import vTable from '@/components/v-table'

export default {
  name: 'Products',
  components: {
    vTable,
  },
  data: () => ({
    form: {
      name: null,
      unit: null,
      cost: null,
      price: null
    }
  }),
  computed: {
    ...mapGetters(['products'])
  },
  methods: {
    ...mapActions(['createProduct', 'deleteProduct']),

    addProduct() {
      const product = {
        id: Date.now(),
        name: this.form.name,
        unit: this.form.unit,
        cost: this.form.cost,
        price: this.form.price
      }
      this.createProduct(product)
      this.clearForm()
    },
    clearForm() {
      this.form.name = null
      this.form.unit = null
      this.form.cost = null
      this.form.price = null
    }
  },
}
</script>

<style lang="scss" scoped>
  .products {
    &-form {
      padding: 1.5rem 0;   
    }
  }
</style>