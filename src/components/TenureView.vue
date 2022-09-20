<template>
  <div class="chart chart100">
    <h2>年資</h2>
    <canvas id="myChart-Tenure" width="800px" height="40vh"></canvas>
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
      const tenurelist = ['1 年以下', '1~2 年', '2~3 年', '3~5 年', '5~7 年', '7~9 年', '10 年以上'];
      // console.log(tenurelist);
      [...tenurelist].forEach((item) => {
        const tenure = [];
        [...data].forEach((item2) => {
          if (item === item2.company.job_tenure) {
            tenure.push(item2.company.job_tenure);
          }
        });
        this.salaryData.push({
          tenure: item,
          person: tenure.length,
        });
      });
      const ctx = document.getElementById('myChart-Tenure');
      const labels = this.salaryData.map((item) => item.tenure);
      const myChart = new Chart(ctx, {
        data: {
          labels,
          datasets: [
            {
              type: 'bar',
              data: this.salaryData.map((item) => item.person),
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
                    label += ` ${context.parsed.y} 人`;
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
