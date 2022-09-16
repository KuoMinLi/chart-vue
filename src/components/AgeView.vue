<template>
    <div class="chart">
      <h2>年齡</h2>
      <canvas id="myChart2" width="800px" height="40vh"></canvas>
    </div>
</template>

<script>

import Chart from 'chart.js/auto';
import axios from 'axios';

export default {
  data() {
    return {
      ageData: [],
    };
  },
  created() {
    axios({
      method: 'get',
      baseURL: 'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json',
      timeout: 5000,
    }).then((res) => {
      const { data } = res;
      const agelist = [];
      [...data].forEach((item) => {
        if (agelist.indexOf(item.age) === -1) {
          agelist.push(item.age);
        }
      });
      [...agelist].forEach((item) => {
        const age = [];
        [...data].forEach((item2) => {
          if (item === item2.age) {
            age.push(item2);
          }
        });
        this.ageData.push({
          age: item,
          person: age.length,
        });
      });
      this.ageData[4].age = '41~50 歲';
      this.ageData[4].person += this.ageData[5].person;
      this.ageData.splice(5, 1);
      const ctx = document.getElementById('myChart2');
      const labels = this.ageData.map((item) => item.age);
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            data: this.ageData.map((item) => item.person),
            backgroundColor: 'rgb(142, 125, 250)',
          }],
        },
        responsive: false,
        options: {
          layout: {
            padding: 40,
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: '#6B6783',
                borderColor: '#6B6783',
                tickColor: 'transparent',
              },
              ticks: {
                color: '#F2F2F4',
              },
            },
            x: {
              grid: {
                borderColor: '#6B6783',
              },
              ticks: {
                color: '#F2F2F4',
              },
            },
          },
          plugins: {
            title: {
              display: true,
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
            },
            tooltip: {
              position: 'nearest',
              callbacks: {
                label(context) {
                  let label = context.dataset.label || '';
                  if (context.parsed.y !== null) {
                    label += ` ${context.parsed.y}人`;
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
