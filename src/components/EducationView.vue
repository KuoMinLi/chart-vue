<template>
  <div class="chart chart_edu">
    <h2>科系與學歷</h2>
    <canvas id="myChart4" width="800px" height="40vh"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import axios from 'axios';

export default {
  data() {
    return {
      eduData: [],
    };
  },
  created() {
    axios({
      method: 'get',
      baseURL:
        'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json',
      timeout: 5000,
    })
      .then((res) => {
        const { data } = res;
        const majorlist = ['資訊科系相關(資工、資管、光電、電機)'];
        [...data].forEach((item) => {
          if (majorlist.indexOf(item.major) === -1) {
            majorlist.push(item.major);
          }
        });
        [...majorlist].forEach((item) => {
          const eduBachelor = [];
          const eduMaster = [];
          [...data].forEach((item2) => {
            if (item === item2.major) {
              if (item2.education === '碩士畢業' || item2.education === '博士畢業') {
                eduMaster.push(item2.education);
              } else {
                eduBachelor.push(item2.education);
              }
            }
          });
          this.eduData.push({
            major: item,
            bachelor: eduBachelor.length,
            master: eduMaster.length,
          });
        });
        this.eduData[0].major = '資訊科系';
        this.eduData[1].major = '非本科';
        for (let i = 2; i < this.eduData.length; i += 1) {
          this.eduData[1].bachelor += this.eduData[i].bachelor;
          this.eduData[1].master += this.eduData[i].master;
        }
        this.eduData.splice(2, this.eduData.length - 2);

        const ctx = document.getElementById('myChart4');
        const labels = this.eduData.map((item) => item.major);
        const myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels,
            datasets: [
              {
                label: '大學（含）以下',
                data: this.eduData.map((item) => item.bachelor),
                backgroundColor: 'rgb(142, 125, 250)',
              },
              {
                label: '碩博士',
                data: this.eduData.map((item) => item.master),
                backgroundColor: '#D2CBFD',
              },
            ],
          },
          responsive: false,
          options: {
            indexAxis: 'y',
            layout: {
              padding: 40,
            },
            scales: {
              y: {
                stacked: true,
                beginAtZero: true,
                grid: {
                  borderColor: '#6B6783',
                },
                ticks: {
                  color: '#F2F2F4',
                },
              },
              x: {
                stacked: true,
                grid: {
                  color: '#6B6783',
                  borderColor: '#6B6783',
                  tickColor: 'transparent',
                },
                ticks: {
                  color: '#F2F2F4',
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
                display: true,
                position: 'bottom',
              },
              tooltip: {
                position: 'nearest',
                callbacks: {
                  label(context) {
                    let label = context.dataset.label || '';
                    if (context.parsed.y !== null) {
                      label += ` ${context.parsed.x}人`;
                    }
                    return label;
                  },
                },
              },
            },
          },
        });
        myChart.update();
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
