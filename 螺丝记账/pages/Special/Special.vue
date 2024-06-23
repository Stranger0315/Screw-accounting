<template>
  <div id="special-page">
    <view class="color-background">
      <view class="container frosted-glass">
        <!-- 饼状图：本月消费组成 -->
        <div class="chart-container">
          <ec-canvas id="mychart-dom-pie" canvas-id="mychart-pie" :ec="ecPie"></ec-canvas>
          <h3>饼状图：各消费类型占比</h3>
        </div>
        <!-- 柱状图：日消费情况 -->
        <div class="chart-container">
          <ec-canvas id="mychart-dom-bar" canvas-id="mychart-bar" :ec="ecBar"></ec-canvas>
          <h3>柱状图：消费类型分布</h3>
        </div>
      </view>
    </view>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  data() {
    return {
      // 示例数据，您需要用实际的消费记录数据替换它
      expensesData: {
        "饮食": 100,
        "交通": 150,
        "生活用品": 200,
        // ...其他消费类型及其金额
      },
      ecPie: {
        onInit: function (canvas, width, height, dpr) {
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr
          });
          canvas.setChart(chart);
          return chart;
        }
      },
      ecBar: {
        onInit: function (canvas, width, height, dpr) {
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr
          });
          canvas.setChart(chart);
          return chart;
        }
      }
    };
  },
  mounted() {
    this.createBarChart();
    this.createPieChart();
  },
  methods: {
    createBarChart() {
      const chart = echarts.init(document.getElementById('mychart-dom-bar'));
      const option = {
        responsive: true,
        maintainAspectRatio: false,
        xAxis: {
          type: 'category',
          data: Object.keys(this.expensesData)
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: Object.values(this.expensesData),
          type: 'bar',
          itemStyle: {
            color: 'rgba(0, 123, 255, 0.5)'
          }
        }]
      };
      chart.setOption(option);
      window.addEventListener('resize', () => {
        chart.resize();
      });
    },
    createPieChart() {
      const chart = echarts.init(document.getElementById('mychart-dom-pie'));
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '消费类型',
            type: 'pie',
            radius: '50%',
            data: Object.keys(this.expensesData).map((key) => ({
              value: this.expensesData[key],
              name: key
            })),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      chart.setOption(option);
      window.addEventListener('resize', () => {
        chart.resize();
      });
    }
  }
};
</script>

<style>
.container {
  background-color: white; 
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;
  min-height: 100vh; 
}
.chart-container {
  width: 100%;
  max-width: 600px;
  margin: 20px 0; 
  display: flex;
  flex-direction: column;
  align-items: center;
}
#mychart-dom-pie, #mychart-dom-bar {
  width: 100%;
  height: 300px;
}
.color-background {
  height: 100vh; 
  background-color: #ffcc66;
  z-index: -5;
}
#special-page {
  margin: 0;
  padding: 0;
  height: 100vh; /* 使页面高度充满整个视口 */
  background-image: url('/mnt/data/special_page_image_0.jpg'), url('/mnt/data/special_page_image_1.jpg');
  background-position: center center; /* 图片居中 */
  background-repeat: no-repeat; /* 不重复 */
  background-attachment: fixed; /* 固定背景图像 */
  background-size: cover; /* 覆盖整个页面 */
  background-blend-mode: multiply; /* 混合模式，以产生特殊效果 */
}
.responsive-img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}
.frosted-glass {
  background-color: rgba(255, 255, 255, 0.5); /* 半透明背景 */
  backdrop-filter: blur(10px); /* 毛玻璃效果 */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 轻微阴影 */
}
</style>

