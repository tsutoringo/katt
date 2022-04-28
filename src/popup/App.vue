<script lang="ts" setup>
import ProgressTable from './components/ProgressTable.vue';

</script>
<template>
  <div class="report-info">
    <ProgressTable />
  </div>
  <div class="detail">
    <router-view />
  </div>
</template>
<style lang="scss" scoped>
.report-info, .detail {
  width: 50%;
}

.detail {
  box-shadow: 0 0 5px 0 #00000034;

  display: flex;
  flex-direction: column;
}
</style>
<style>

html {
	width: 800px;
}

body {
	margin: 0;
}

#app {
	display: flex;
}

a {
	text-decoration: none;
	color: #6486ff;
}
</style>
