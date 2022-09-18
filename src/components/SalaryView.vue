<template>
  <div class="chart chart100">
    <h2>年薪</h2>
    <canvas id="myChart-Salary" width="800px" height="40vh"></canvas>
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
      const agelist = [
        {
          name: '36 萬以下',
          value: 360,
        },
        {
          name: '36~50 萬',
          value: 430,
        },
        {
          name: '51~60 萬',
          value: 550,
        },
        {
          name: '61~70 萬',
          value: 650,
        },
        {
          name: '71~80 萬',
          value: 750,
        },
        {
          name: '81~90 萬',
          value: 850,
        },
        {
          name: '91~100 萬',
          value: 950,
        },
        {
          name: '101~110 萬',
          value: 1050,
        },
        {
          name: '111~120 萬',
          value: 1150,
        },
        {
          name: '121~130 萬',
          value: 1250,
        },
        {
          name: '131~140 萬',
          value: 1350,
        },
        {
          name: '141~150 萬',
          value: 1450,
        },
        {
          name: '151~160 萬',
          value: 1550,
        },
        {
          name: '161~170 萬',
          value: 1650,
        },
        {
          name: '171~180 萬',
          value: 1750,
        },
        {
          name: '181~190 萬',
          value: 1850,
        },
        {
          name: '191~200 萬',
          value: 1950,
        },
        {
          name: '201~300 萬',
          value: 2500,
        },
        {
          name: '301~400 萬',
          value: 3500,
        },
        {
          name: '400 萬以上',
          value: 4500,
        },
      ];
      [...data].forEach((item) => {
        [...agelist].forEach((item2) => {
        if (item2.name.indexOf(item.company.salary) === -1) {
          agelist.push(item.company.salary);
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
      this.ageData[4].age = '41~50 歲';
      this.ageData[4].person += this.ageData[5].person;
      this.ageData.splice(5, 1);
      const ctx = document.getElementById('myChart-Salary');
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
