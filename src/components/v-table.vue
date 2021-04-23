<template>
  <div class="table-container">
    <table class="table table-hover">
      <slot />
    </table>
  </div>
</template>

<script>
export default {
  name: 'Table'
}
</script>

<style lang="scss">
  .table-container {
    overflow-x: auto;
    overflow-y: auto;
    height: 100%;
    width: 100%;
    th, td { min-width: 160px; }
  }
</style>