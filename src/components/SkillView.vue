<template>
  <div class="skill">
    <div class="chart chart_skill">
      <h2>第一份工作所採用之技術/軟體</h2>
      <canvas id="myChart5" width="800px" height="40vh"></canvas>
    </div>
    <SkillText />
  </div>
</template>

<script>

import Chart from 'chart.js/auto';
import axios from 'axios';
import SkillText from './SkillText.vue';

export default {
  components: {
    SkillText,
  },
  data() {
    return {
      skillData: [],
    };
  },
  created() {
    axios({
      method: 'get',
      baseURL: 'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json',
      timeout: 5000,
    }).then((res) => {
      const { data } = res;
      const skilllist = [];
      [...data].forEach((item) => {
        (item.first_job.skill).split(',').forEach((skill) => {
          if (skilllist.indexOf((skill).trim()) === -1) {
            skilllist.push((skill).trim());
          }
        });
      });
      [...skilllist].forEach((item) => {
        const skills = [];
        [...data].forEach((item2) => {
          (item2.first_job.skill).split(',').forEach((skill) => {
            if (item === (skill).trim()) {
              skills.push((skill).trim());
            }
          });
        });

        this.skillData.push({
          skill: item,
          ratio: skills.length / data.length,
        });
      });
      this.skillData = this.skillData.sort((a, b) => b.ratio - a.ratio);
      const skilllabels = ['Git 版本控制系統', '後端語言', '任務指派工具', 'UI 標示工具'];
      const skillratio = [];
      this.skillData.forEach((item) => {
        if (item.skill === 'Git') {
          skillratio.push(item.ratio);
        } else if (item.skill === '後端語言 (Node.js、Python、PHP、JAVA、Ruby)') {
          skillratio.push(item.ratio);
        } else if (item.skill === '任務指派工具（Trello') {
          skillratio.push(item.ratio);
        } else if (item.skill === 'UI Prototype 或設計稿標示工具（Adobe XD') {
          skillratio.push(item.ratio);
        }
      });
      // console.log(skillratio);
      // console.log(skilllabels);

      const ctx = document.getElementById('myChart5');
      const labels = skilllabels;
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            data: skillratio.map((item) => item * 100),
            backgroundColor: 'rgb(142, 125, 250)',
          }],
        },
        responsive: false,
        options: {
          indexAxis: 'y',
          layout: {
            padding: 40,
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                borderColor: '#6B6783',
              },
              ticks: {
                color: '#F2F2F4',
              },
            },
            x: {
              min: 0,
              max: 100,
              grid: {
                color: '#6B6783',
                borderColor: '#6B6783',
                tickColor: 'transparent',
              },
              ticks: {
                color: '#F2F2F4',
                callback(value) {
                  return `${value}%`;
                },
              },
              scaleLabel: {
                display: true,
                labelString: 'Percentage',
              },
            },
          },
          plugins: {
            title: {
              display: false,
              text: '單位:人',
              align: 'start',
              padding: {
                bottom: 22,
              },
              font: {
                size: 12,
                color: '#F2F2F4',
              },
            },
            legend: {
              display: false,
              position: 'bottom',
            },
            tooltip: {
              position: 'nearest',
              callbacks: {
                label(context) {
                  let label = context.dataset.label || '';
                  if (context.parsed.y !== null) {
                    label += ` ${(context.parsed.x).toFixed(0)}%`;
                  }
                  return label;
                },
              },
            },
          },
        },
      });
      myChart.update();
    }).catch((err) => {
      console.log(err);
    });
  },
};
</script>
