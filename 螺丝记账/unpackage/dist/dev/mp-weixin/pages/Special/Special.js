"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      ecPie: {
        onInit: this.initPieChart
      },
      ecBar: {
        onInit: this.initBarChart
      },
      expenses: [],
      // 从本地存储中获取的所有消费记录
      categories: ["饮食", "交通", "生活用品", "生活费", "工资", "自定义"]
      // 消费类型选项
    };
  },
  created() {
    const expenseRecords = common_vendor.index.getStorageSync("expenseRecords");
    if (expenseRecords) {
      this.expenses = expenseRecords;
    }
  },
  methods: {
    initPieChart(canvas, width, height, dpr) {
      const chart = common_vendor.echarts.init(canvas, null, {
        width,
        height,
        devicePixelRatio: dpr
      });
      canvas.setChart(chart);
      chart.setOption(option);
      return chart;
    },
    initBarChart(canvas, width, height, dpr) {
      const chart = common_vendor.echarts.init(canvas, null, {
        width,
        height,
        devicePixelRatio: dpr
      });
      canvas.setChart(chart);
      chart.setOption(option);
      return chart;
    }
  }
};
if (!Array) {
  const _component_ec_canvas = common_vendor.resolveComponent("ec-canvas");
  _component_ec_canvas();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      id: "mychart-dom-pie",
      ["canvas-id"]: "mychart-pie",
      ec: $data.ecPie
    }),
    b: common_vendor.p({
      id: "mychart-dom-bar",
      ["canvas-id"]: "mychart-bar",
      ec: $data.ecBar
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/uniapp_project/螺丝记账/pages/Special/Special.vue"]]);
wx.createPage(MiniProgramPage);
