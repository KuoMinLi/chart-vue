<template>
  <div class="chart chart_sex">
    <h2>性別比例</h2>
    <canvas id="myChart3" ></canvas>
  </div>
</template>

<script>

import Chart from 'chart.js/auto';
import axios from 'axios';

export default {
  data() {
    return {
      sexData: [],
    };
  },
  created() {
    axios({
      method: 'get',
      baseURL: 'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json',
      timeout: 5000,
    }).then((res) => {
      const { data } = res;
      const sexlist = [];
      [...data].forEach((item) => {
        if (sexlist.indexOf(item.gender) === -1) {
          sexlist.push(item.gender);
        }
      });
      [...sexlist].forEach((item) => {
        const sex = [];
        [...data].forEach((item2) => {
          if (item === item2.gender) {
            sex.push(item2);
          }
        });
        this.sexData.push({
          sex: item,
          ratio: Math.round((sex.length / data.length).toFixed([2]) * 100),
        });
      });
      const ctx = document.getElementById('myChart3');
      const labels = this.sexData.map((item) => item.sex);
      const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels,
          datasets: [{
            data: this.sexData.map((item) => item.ratio),
            backgroundColor: ['rgb(142, 125, 250)', '#D2CBFD'],
          }],
        },
        responsive: false,
        maintainAspectRatio: false,
        options: {
          layout: {
            padding: 40,
          },
          plugins: {
            legend: {
              display: true,
              position: 'right',
              labels: {
                color: '#F2F2F4',
                font: {
                  size: 16,
                },
                padding: 20,
              },
            },
            tooltip: {
              position: 'nearest',
              callbacks: {
                label(context) {
                  let label = context.dataset.label || '';
                  if (context.parsed !== null) {
                    label += `${context.label} ${context.parsed}%`;
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
