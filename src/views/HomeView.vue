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
      <button :class="isBaseImf ? 'btn_active' : ''" @click="changeView(isBaseImf)">
        基本資料
      </button>
      <button :class="!isBaseImf ? 'btn_active' : ''" @click="changeView(isBaseImf)">薪資與產業</button>
    </div>
    <div class="container" v-if="isBaseImf">
      <AreaView />
      <AgeView />
      <SexView />
      <EducationView />
      <SkillView />
    </div>
    <div class="container" v-if="!isBaseImf">
      <SalaryView />
    </div>
    <div class="footer">Copyright © 2021 Joyce</div>
  </div>
</template>

<script>
import AgeView from '@/components/AgeView.vue';
import AreaView from '@/components/AreaView.vue';
import SexView from '@/components/SexView.vue';
import EducationView from '@/components/EducationView.vue';
import SkillView from '@/components/SkillView.vue';
import SalaryView from '@/components/SalaryView.vue';

export default {
  data() {
    return {
      areaList: [],
      isBaseImf: true,
    };
  },
  components: {
    AreaView,
    AgeView,
    SexView,
    EducationView,
    SkillView,
    SalaryView,
  },
  name: 'TestView',
  methods: {
    changeView(state) {
      this.isBaseImf = !state;
    },
  },
};
</script>
