<template>
 <view class="full-screen-bg">
    <view class="container">
      <!-- 消费类型选择 -->
      <view class="item">
        <text class="label">消费类型：</text>
        <picker mode="selector" :range="categories" @change="handleCategoryChange">
          <view class="picker">
            {{ categories[record.type] }}
          </view>
        </picker>
      </view>
    
    <!-- 自定义消费类型 -->
        <view class="item" v-if="record.type === categories.length - 1">
           <text class="label">自定义类型：</text>
           <input class="input" v-model="record.customType" placeholder="请输入自定义类型"/>
        </view>
    
    <!-- 自带键盘功能 -->
    <view class="item">
      <text class="label">金额：</text>
      <input class="input" type="digit" v-model="record.amount" placeholder="请输入金额" />
    </view>
    
    <!-- 日期选择 -->
    <view class="item">
      <text class="label">日期：</text>
      <picker class="picker" mode="date" @change="handleDateChange">
        <view>
          {{ record.date }}
        </view>
      </picker>
    </view>
    
    <!-- 功能按钮 -->
    <button class="btn save-btn" @click="saveRecord">保存</button>
    <button class="btn" @click="goBack">返回</button>
  </view>
</view>
</template>

<script>
export default {
  data() {
    return {
      record: {
        type: 0, // 默认为第一个选项
        amount: '', // 金额
        date: new Date().toISOString().substr(0, 10) // 默认为当前日期
      },
      categories: ['饮食', '交通', '生活用品', '生活费', '工资', '自定义'], // 消费类型选项
      customCategory: '' // 用户自定义的消费类型
    };
  },
  mounted() {
    // 从本地存储中获取消费记录和消费类型选项
    const expenseRecords = uni.getStorageSync('expenseRecords');
    if (expenseRecords) {
      this.records = expenseRecords;
    }
    
    const expenseCategories = uni.getStorageSync('expenseCategories');
    if (expenseCategories) {
      this.categories = expenseCategories;
    }
  },
  methods: {
    // 返回功能
    goBack() {
      uni.navigateBack();
    },
    // 保存记录
    saveRecord() {
      if (this.record.amount === '' || isNaN(this.record.amount) || parseFloat(this.record.amount) <= 0) {
        uni.showToast({
          title: '请输入有效的金额',
          icon: 'none'
        });
        return;
      }
      
      // 如果用户选择了自定义类型，将自定义类型存入消费类型选项
      if (this.record.type === this.categories.length - 1 && this.customCategory.trim() !== '') {
        this.categories.splice(-1, 0, this.customCategory.trim());
        uni.setStorageSync('expenseCategories', this.categories);
      }
      
      // 将记录保存到本地
      let records = uni.getStorageSync('expenseRecords') || [];
      records.push(this.record);
      uni.setStorageSync('expenseRecords', records);
      
      // 提示保存成功
      uni.showToast({
        title: '保存成功',
        icon: 'success'
      });
      
      // 清空输入框
      this.record = {
        type: 0,
        amount: '',
        date: new Date().toISOString().substr(0, 10)
      };
      this.customCategory = '';
    },
    // 消费类型改变时的处理
    handleCategoryChange(event) {
      const index = event.detail.value;
      this.record.type = index;
      if (index === this.categories.length - 1) {
        // 如果选择了自定义类型，则清空自定义类型输入框
        this.customCategory = '';
      }
    },
    // 日期改变时的处理
    handleDateChange(event) {
      this.record.date = event.detail.value;
    }
  }
}
</script>

<style>
.container {
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.item {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.label {
  width: 80px;
  font-weight: bold;
}

.input {
  flex: 1;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.picker {
  flex: 1;
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.btn {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #007aff;
  color: #fff;
  border-radius: 5px;
}

.save-btn {
  margin-bottom: 10px;
}
.full-screen-bg {
 height: 100vh; 
  display: flex;
  justify-content: center;
  align-items: center; 
  background-color:#ffcc66;
  z-index: -5;
}
</style>