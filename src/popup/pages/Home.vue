<script lang="ts" setup>
import { inject } from 'vue';
import { localStorage as lsUtil } from '@tsutoringo/vue-utils';

const ls = inject(lsUtil.localStorageKey) as lsUtil.LocalStorageStore;

const ignoreSupplement = ls.getAsBoolean('ignore_supplement', true);

const branch = __GIT_BRANCH__;
const hash = __GIT_HASH__;
const shortHash = __GIT_SHORT_HASH__;

</script>

<template>
  <div class="content">
    <label>
      <input type="checkbox" v-model="ignoreSupplement"> サプリメント教材を無視
    </label>
  </div>
  <footer>
    <span>
      <a href="https://github.com/tsutoringo/katt" target="_blank">tsutoringo/katt</a>
      @ <a :href="`https://github.com/tsutoringo/katt/commit/${hash}`" target="_blank">{{ shortHash }}</a>
      # <a target="_blank" :href="`https://github.com/tsutoringo/katt/tree/${branch}`">{{ branch }}</a>
    </span>
    <!-- <a href="https://github.com/tsutoringo/katt" target="_blank">開発者に寄付をする</a> -->
  </footer>
</template>

<style lang="scss" scoped>

.content {
    flex: 1;
    padding: 8px;
  }

  footer {
    color: rgb(196, 196, 237);
  	padding: 8px;
  	background: #222222;
    > * {
  	  padding: 0 5px;
    }
  }
</style>