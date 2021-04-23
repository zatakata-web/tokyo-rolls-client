<template>
  <div class="storage">
    <div class="row">
      <div class="col-12">
        <div class="storage-top">
          <button 
            type="button" 
            class="btn btn-success" 
            @click="modalVisible = true"
          >Добавить
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <v-table>
          <thead>
            <tr>
              <th scope="col">Дата</th>
              <th scope="col">Название</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Цена закупки</th>
              <th scope="col">Цена продажи</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="{_id, date, name, unit, value, cost, price} in storage" :key=_id>
              <td>{{ date }}</td>
              <td>{{ name }}</td>
              <td>{{ unit == 'kg' ? value.toFixed(1) : value | unit(unit) }}</td>
              <td>{{ cost.toFixed(2) }} руб.</td>
              <td>{{ price.toFixed(2) }} руб.</td>
              <td>
                <button
                  type="button" 
                  class="btn btn-sm btn-danger"
                  @click="deleteStorageItem(_id)"
                >
                  Удалить
                </button>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>
    
    
    <v-modal v-if="modalVisible" label="Добавить на склад" @close="closeModal">
      <form>
        <div class="form-group">
          <label for="unitProduct">Продукт:</label>
          <select class="form-control" id="unitProduct" v-model="selectProduct">
            <option 
              :value="p" 
              v-for="p in products"
              :key="p.id"
            >
              {{ p.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="valueProduct">Количество:</label>
          <input 
            type="number" 
            class="form-control" 
            :placeholder="'' | unit(selectProduct.unit)"
            id="valueProduct" 
            v-model="form.value" 
            required
            min=1
          >
        </div>

        <div v-if="selectProduct.cost"><b>Цена закупки: </b> {{ cost }}</div>
        <div v-if="selectProduct.price"><b>Цена продажи: </b> {{ price }}</div>

      </form>
    
      <template v-slot:footer>
        <button type="button" class="btn btn-primary" @click="addProduct">Добавить</button>
        <button 
          type="button" 
          class="btn btn-secondary" 
          data-dismiss="modal" 
          @click="modalVisible = false"
        >Выйти
        </button>
      </template>
    </v-modal>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {dateNow} from '@/helpers.js'
import vTable from '@/components/v-table'
import vModal from '@/components/v-modal'

export default {
  name: 'Storage',
  components: {
    vTable,
    vModal
  },
  data: () => ({
    modalVisible: false,
    selectProduct: 1,
    form: {
      value: 1,
    }
  }),
  computed: {
    ...mapGetters(['storage', 'products']),
    cost() {
      return this.selectProduct.cost * this.form.value
    },
    price() {
      return this.selectProduct.price * this.form.value
    }
  },
  methods: {
    ...mapActions(['deleteStorageItem', 'addProductToStorage']),
    closeModal() {
      this.modalVisible = false
    },
    addProduct() {
      const product = {
        date: dateNow(),
        name: this.selectProduct.name,
        unit: this.selectProduct.unit,
        value: +this.form.value,
        cost: this.cost,
        price: this.price
      }
      this.addProductToStorage(product)

      this.clearForm()
      this.modalVisible = false
    },
    clearForm() {
      this.form.name = null
      this.form.unit = null
      this.form.cost = null
      this.form.value = 1
      this.form.price = null
    }
  }
}
</script>

<style lang="scss" scoped>
  .storage {
    &-top {
      display: flex;
      justify-content: flex-end;
      padding: 1rem 0;   
    }
  }
</style>