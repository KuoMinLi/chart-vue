<template>
    <div class="chart chart_area">
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
      console.log(agelist);
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
      console.log(this.ageData);
      const ctx = document.getElementById('myChart2');
      const labels = this.ageData.map((item) => item.age);
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: '地區',
            data: this.ageData.map((item) => item.person),
            backgroundColor: 'rgb(142, 125, 250)',
          }],
        },
        responsive: true,
        options: {
          layout: {
            padding: 40,
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                drawBorder: false,
                color: '#6B6783',
                borderColor: '#6B6783',
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
