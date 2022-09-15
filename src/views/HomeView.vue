<template>
  <div class="body">
    <nav class="header">
      <ul>
        <li class="logo">THE F2E</li>
        <li>修煉精神時光屋</li>
        <li>薪資調查報告</li>
      </ul>
    </nav>
    <h1>前端薪資調查報告</h1>
    <div class="controlboard">
      <button class="btn_active">基本資料</button>
      <button>薪資與產業</button>
    </div>
    <div class="container">
      <AreaView />
      <AgeView />
    </div>
    <div class="footer">Copyright © 2021 Joyce</div>
  </div>
</template>

<script>

import AgeView from '@/components/AgeView.vue';
import AreaView from '@/components/AreaView.vue';

export default {
  data() {
    return {
      areaList: [],
    };
  },
  components: {
    AreaView,
    AgeView,
  },
  name: 'TestView',
};
</script>
