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
      salaryData: [],
    };
  },
  created() {
    axios({
      method: 'get',
      baseURL: 'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json',
      timeout: 5000,
    }).then((res) => {
      const { data } = res;
      const salarylist = [
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
      const tenurelist = ['1 年以下', '1~2 年', '2~3 年', '3~5 年', '5~7 年', '7~9 年', '10 年以上'];
      // console.log(tenurelist);
      [...tenurelist].forEach((item) => {
        const salary = [];
        [...data].forEach((item2) => {
          if (item === item2.company.job_tenure) {
            [...salarylist].forEach((item3) => {
              if (item2.company.salary === item3.name) {
                salary.push(item3.value);
              }
            });
          }
        });

        this.salaryData.push({
          tenure: item,
          salary: (salary.reduce((a, b) => a + b) / salary.length).toFixed(0),
        });
      });
      // console.log(this.salaryData);
      const ctx = document.getElementById('myChart-Salary');
      const labels = this.salaryData.map((item) => item.tenure);
      const myChart = new Chart(ctx, {
        // type: 'scatter',
        data: {
          labels,
          datasets: [
            {
              type: 'line',
              data: this.salaryData.map((item) => item.salary),
              backgroundColor: 'rgb(142, 125, 250)',
              borderColor: '#F9F8FE',
              pointStyle: 'circle',
              pointBorderWidth: 5,
              pointRadius: 15,
              pointHoverRadius: 20,
            },
            {
              type: 'bar',
              data: this.salaryData.map((item) => item.salary),
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
              text: '單位:千元',
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
                    label += ` ${context.parsed.y} 千元`;
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
