<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
    <div class="container-fluid">
      <div id="navbarNav">
        <ul class="navbar-nav">
          <li 
            class="nav-item"
            v-for="(item, idx) in navList"
            :key="idx"
          >
            <router-link 
              class="nav-link"
              active-class="active" 
              exact=""
              :to="item.to"
            >
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    navList: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>
  @media screen and (max-width: 768px) {
    .nav-link {
      padding: 0.15rem 1rem;
    }
  }
</style>