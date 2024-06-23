"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      expenses: [],
      // 从本地存储中获取的所有消费记录
      categories: ["饮食", "交通", "生活用品", "生活费", "工资", "自定义"],
      // 消费类型选项
      selectedPeriod: "本月"
      // 默认选择显示本月的消费情况
    };
  },
  created() {
    const expenseRecords = common_vendor.index.getStorageSync("expenseRecords");
    if (expenseRecords) {
      this.expenses = expenseRecords;
    }
  },
  computed: {
    todayExpense() {
      const today = (/* @__PURE__ */ new Date()).toISOString().substr(0, 10);
      return this.calculateExpense(today);
    },
    yesterdayExpense() {
      const yesterday = new Date(Date.now() - 864e5).toISOString().substr(0, 10);
      return this.calculateExpense(yesterday);
    },
    totalExpense() {
      if (this.selectedPeriod === "本月") {
        const thisMonth = (/* @__PURE__ */ new Date()).toISOString().substr(0, 7);
        return this.calculateExpense(thisMonth);
      }
    },
    detailedExpenses() {
      const groupedExpenses = {};
      this.expenses.forEach((expense) => {
        const date = expense.date.substr(0, 10);
        if (!groupedExpenses[date]) {
          groupedExpenses[date] = [];
        }
        groupedExpenses[date].push({
          type: this.categories[expense.type],
          // 获取类型名称
          amount: parseFloat(expense.amount)
        });
      });
      return Object.keys(groupedExpenses).map((date) => ({
        date,
        expenses: groupedExpenses[date]
      }));
    }
  },
  methods: {
    calculateExpense(period) {
      let total = 0;
      this.expenses.forEach((expense) => {
        if (expense.date.substr(0, 7) === period) {
          total += parseFloat(expense.amount);
        }
      });
      return total;
    },
    deleteExpense(date, expenseIndex) {
      this.expenses = this.expenses.filter((expense) => {
        return !(expense.date.substr(0, 10) === date && expenseIndex === expenseIndex);
      });
      common_vendor.index.setStorageSync("expenseRecords", this.expenses);
    },
    togglePeriod() {
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($options.todayExpense),
    b: common_vendor.t($options.yesterdayExpense),
    c: common_vendor.t($data.selectedPeriod),
    d: common_vendor.t($options.totalExpense),
    e: common_vendor.o((...args) => $options.togglePeriod && $options.togglePeriod(...args)),
    f: common_vendor.f($options.detailedExpenses, (day, index, i0) => {
      return {
        a: common_vendor.t(day.date),
        b: common_vendor.f(day.expenses, (expense, expenseIndex, i1) => {
          return {
            a: common_vendor.t(expense.type),
            b: common_vendor.t(expense.amount),
            c: common_vendor.o(($event) => $options.deleteExpense(day.date, expenseIndex), expenseIndex),
            d: expenseIndex
          };
        }),
        c: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/uniapp_project/螺丝记账/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
