"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      record: {
        type: 0,
        // 默认为第一个选项
        amount: "",
        // 金额
        date: (/* @__PURE__ */ new Date()).toISOString().substr(0, 10)
        // 默认为当前日期
      },
      categories: ["饮食", "交通", "生活用品", "生活费", "工资", "自定义"],
      // 消费类型选项
      customCategory: ""
      // 用户自定义的消费类型
    };
  },
  mounted() {
    const expenseRecords = common_vendor.index.getStorageSync("expenseRecords");
    if (expenseRecords) {
      this.records = expenseRecords;
    }
    const expenseCategories = common_vendor.index.getStorageSync("expenseCategories");
    if (expenseCategories) {
      this.categories = expenseCategories;
    }
  },
  methods: {
    // 返回功能
    goBack() {
      common_vendor.index.navigateBack();
    },
    // 保存记录
    saveRecord() {
      if (this.record.amount === "" || isNaN(this.record.amount) || parseFloat(this.record.amount) <= 0) {
        common_vendor.index.showToast({
          title: "请输入有效的金额",
          icon: "none"
        });
        return;
      }
      if (this.record.type === this.categories.length - 1 && this.customCategory.trim() !== "") {
        this.categories.splice(-1, 0, this.customCategory.trim());
        common_vendor.index.setStorageSync("expenseCategories", this.categories);
      }
      let records = common_vendor.index.getStorageSync("expenseRecords") || [];
      records.push(this.record);
      common_vendor.index.setStorageSync("expenseRecords", records);
      common_vendor.index.showToast({
        title: "保存成功",
        icon: "success"
      });
      this.record = {
        type: 0,
        amount: "",
        date: (/* @__PURE__ */ new Date()).toISOString().substr(0, 10)
      };
      this.customCategory = "";
    },
    // 消费类型改变时的处理
    handleCategoryChange(event) {
      const index = event.detail.value;
      this.record.type = index;
      if (index === this.categories.length - 1) {
        this.customCategory = "";
      }
    },
    // 日期改变时的处理
    handleDateChange(event) {
      this.record.date = event.detail.value;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.categories[$data.record.type]),
    b: $data.categories,
    c: common_vendor.o((...args) => $options.handleCategoryChange && $options.handleCategoryChange(...args)),
    d: $data.record.type === $data.categories.length - 1
  }, $data.record.type === $data.categories.length - 1 ? {
    e: $data.customCategory,
    f: common_vendor.o(($event) => $data.customCategory = $event.detail.value)
  } : {}, {
    g: $data.record.amount,
    h: common_vendor.o(($event) => $data.record.amount = $event.detail.value),
    i: common_vendor.t($data.record.date),
    j: common_vendor.o((...args) => $options.handleDateChange && $options.handleDateChange(...args)),
    k: common_vendor.o((...args) => $options.saveRecord && $options.saveRecord(...args)),
    l: common_vendor.o((...args) => $options.goBack && $options.goBack(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/uniapp_project/螺丝记账/pages/Caculator/Caculator.vue"]]);
wx.createPage(MiniProgramPage);
