<template>
<div class="color-background">
  <view class="container">
    <!-- 第一部分：简要统计信息 -->
    <view class="summary frosted-glass">
      <text>今日消费：{{ todayExpense }}<br></text>
      <text>昨日消费：{{ yesterdayExpense }}<br></text>
      <text>周期总消费（{{ selectedPeriod }}）：{{ totalExpense }}<br></text>
      <br>
      <button @click="togglePeriod">切换显示周期</button>
    </view>

    <!-- 第二部分：详细消费情况 -->
    <view class="detail frosted-glass">
      <scroll-view scroll-y="true" style="height: 300px;">
        <view v-for="(day, index) in detailedExpenses" :key="index">
          <text>{{ day.date }}：</text>
          <view v-for="(expense, expenseIndex) in day.expenses" :key="expenseIndex">
            <text>{{ expense.type }}：{{ expense.amount }}</text>
            <button @click="deleteExpense(day.date, expenseIndex)">删除</button>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</div>
</template>

<script>
export default {
  data() {
    return {
      expenses: [], // 从本地存储中获取的所有消费记录
      categories: ['饮食', '交通', '生活用品', '生活费', '工资', '自定义'], // 消费类型选项
      selectedPeriod: '本月', // 默认选择显示本月的消费情况
    };
  },
  created() {
    // 在组件创建时从本地存储中获取消费记录
    const expenseRecords = uni.getStorageSync('expenseRecords');
    if (expenseRecords) {
      this.expenses = expenseRecords;
    }
  },
  computed: {
    todayExpense() {
      // 计算今日消费金额
      const today = new Date().toISOString().substr(0, 10);
      return this.calculateExpense(today, 'day');
    },
    yesterdayExpense() {
      // 计算昨日消费金额
      const yesterday = new Date(Date.now() - 864e5).toISOString().substr(0, 10);
      return this.calculateExpense(yesterday, 'day');
    },
    totalExpense() {
      // 计算周期总消费金额
      if (this.selectedPeriod === '本月') {
        const thisMonth = new Date().toISOString().substr(0, 7);
        return this.calculateExpense(thisMonth, 'month');
      } else {
        // 其他周期的总消费金额的计算方法
        return 0;
      }
    },
    detailedExpenses() {
      // 计算详细消费情况
      // 按日期对消费记录进行分组，并计算每日消费总额
      const groupedExpenses = {};
      this.expenses.forEach(expense => {
        const date = expense.date.substr(0, 10);
        if (!groupedExpenses[date]) {
          groupedExpenses[date] = [];
        }
        groupedExpenses[date].push({
          type: this.categories[expense.type], // 获取类型名称
          amount: parseFloat(expense.amount)
        });
      });
      return Object.keys(groupedExpenses).map(date => ({
        date,
        expenses: groupedExpenses[date]
      }));
    }
  },
  methods: {
    calculateExpense(period, type) {
      // 计算指定周期的消费总额
      let total = 0;
      this.expenses.forEach(expense => {
        if (type === 'day' && expense.date.substr(0, 10) === period) {
          total += parseFloat(expense.amount);
        } else if (type === 'month' && expense.date.substr(0, 7) === period) {
          total += parseFloat(expense.amount);
        }
      });
      return total;
    },
    deleteExpense(date, expenseIndex) {
      // 删除指定日期和索引的消费记录
      this.expenses = this.expenses.filter(expense => {
        return !(expense.date.substr(0, 10) === date && expenseIndex === expenseIndex);
      });
      // 更新本地存储中的消费记录
      uni.setStorageSync('expenseRecords', this.expenses);
    },
    togglePeriod() {
      // 切换显示周期
      this.selectedPeriod = this.selectedPeriod === '本月' ? '本周' : '本月';
      // 实现切换显示周期的逻辑
    }
  }
}
</script>

<style>
.container {
  padding: 20px;
}

.summary {
  margin-bottom: 20px;
}

.detail {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
}
.frosted-glass {
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.color-background {
  background-color: #ffcc66;
  z-index: -5;
}
</style>
