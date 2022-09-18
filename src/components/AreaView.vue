<template>
    <div class="chart chart50 chart_area">
      <h2>地區</h2>
      <canvas id="myChart" width="800px" height="40vh"></canvas>
    </div>
</template>

<script>

import Chart from 'chart.js/auto';
import axios from 'axios';

export default {
  data() {
    return {
      areaList: [],
    };
  },
  created() {
    axios({
      method: 'get',
      baseURL: 'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json',
      timeout: 5000,
    }).then((res) => {
      const { data } = res;
      const arealist = ['北北基', '桃竹苗', '中彰投', '雲嘉南', '高屏'];
      const area = ['台灣 - 北北基', '台灣 - 桃竹苗', '台灣 - 中彰投', '台灣 - 雲嘉南', '台灣 - 高屏'];
      [...area].forEach((item) => {
        const areaData = [];
        [...data].forEach((item2) => {
          if (item === item2.company.area) {
            areaData.push(item2);
          }
        });
        this.areaList.push({
          area: item,
          person: areaData.length,
        });
      });
      const ctx = document.getElementById('myChart');
      const labels = arealist;
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            data: this.areaList.map((item) => item.person),
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
