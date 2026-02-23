<template>
  <main class="main-content">
    <div class="yz-header-banner-wrapper">
      <div class="banner">
        <h1>2026年部分考生初试成绩查询</h1>
        <div class="ch-sub-title">本系统所有数据均为招生单位提供，招生单位对查询结果负责解释。</div>
      </div>
    </div>

    <div class="container clearfix main-container">
      <h2 class="yzwb-header">2026年部分考生初试成绩查询</h2>
      
      <div class="yzwb-ksxx" v-if="!isQueried">
        
        <div class="zj-tips ivu-alert ivu-alert-warning" style="margin-top: 20px;">
          <span class="ivu-alert-message"><p>姓名、证件号码、准考证号必填。</p></span>
        </div> 
        
        <form autocomplete="off" class="ivu-form ivu-form-label-right" style="margin-top: 20px;" @submit.prevent>
          
          <div class="ivu-form-item ivu-form-item-required" :class="{'ivu-form-item-error': errors.name}">
            <label class="ivu-form-item-label" style="width: 220px;">姓名：</label> 
            <div class="ivu-form-item-content" style="margin-left: 220px;">
              <div class="large-input ivu-input-wrapper ivu-input-wrapper-default ivu-input-type-text">
                <input v-model="formData.name" autocomplete="off" spellcheck="false" type="text" placeholder="请输入" maxlength="40" class="ivu-input ivu-input-default">
              </div> 
              <div class="ivu-form-item-error-tip" v-show="errors.name">{{ errors.name }}</div>
            </div>
          </div> 
          
          <div class="ivu-form-item ivu-form-item-required" :class="{'ivu-form-item-error': errors.idCard}">
            <label class="ivu-form-item-label" style="width: 220px;">证件号码：</label> 
            <div class="ivu-form-item-content" style="margin-left: 220px;">
              <div class="large-input ivu-input-wrapper ivu-input-wrapper-default ivu-input-type-text">
                <input v-model="formData.idCard" autocomplete="off" spellcheck="false" type="text" placeholder="请输入" maxlength="20" class="ivu-input ivu-input-default">
              </div> 
              <div class="ivu-form-item-error-tip" v-show="errors.idCard">{{ errors.idCard }}</div>
            </div>
          </div> 
          
          <div class="ivu-form-item ivu-form-item-required" :class="{'ivu-form-item-error': errors.examNo}">
            <label class="ivu-form-item-label" style="width: 220px;">准考证号：</label> 
            <div class="ivu-form-item-content" style="margin-left: 220px;">
              <div class="input-inline-flex">
                <div class="large-input ivu-input-wrapper ivu-input-wrapper-default ivu-input-type-text">
                  <input v-model="formData.examNo" autocomplete="off" spellcheck="false" type="text" placeholder="请输入" maxlength="15" class="ivu-input ivu-input-default"> 
                </div> 
                <a href="https://yz.chsi.com.cn/apply/cjcxa/" target="_blank" class="forget-link" style="margin-left: 10px;">忘记准考证号<span class="fake-icon">></span></a> 
              </div>
              <div class="ivu-form-item-error-tip" v-show="errors.examNo">{{ errors.examNo }}</div>
            </div>
          </div> 
          
          <div class="ivu-form-item ivu-form-item-required">
            <label class="ivu-form-item-label" style="width: 220px;">报考单位：</label> 
            <div class="ivu-form-item-content" style="margin-left: 220px;">
              <p class="school-text">({{ schoolCode }}){{ schoolName }}</p> 
            </div>
          </div> 
          
          <div class="ivu-form-item">
            <div class="ivu-form-item-content" style="margin-left: 220px;">
              <button type="button" class="ivu-btn ivu-btn-primary" @click="handleQuery">
                <span>查询</span>
              </button>
            </div>
          </div>
          
        </form>
      </div>

      <div v-else class="result-container">
        <div class="result-list">
          <div class="result-item">
            <span class="result-label">姓名：</span>
            <span class="result-value">{{ formData.name }}</span>
          </div>
          <div class="result-item">
            <span class="result-label">报名号：</span>
            <span class="result-value">611399399</span>
          </div>
          <div class="result-item">
            <span class="result-label">准考证号：</span>
            <span class="result-value">{{ formData.examNo }}</span>
          </div>
          <div class="result-item">
            <span class="result-label">总分：</span>
            <span class="result-value">343</span>
          </div>
          <div class="result-item">
            <span class="result-label">第一门：</span>
            <span class="result-value">(101)思想政治理论：53</span>
          </div>
          <div class="result-item">
            <span class="result-label">第二门：</span>
            <span class="result-value">(201)英语（一）：65</span>
          </div>
          <div class="result-item">
            <span class="result-label">第三门：</span>
            <span class="result-value">(301)数学（一）：123</span>
          </div>
          <div class="result-item">
            <span class="result-label">第四门：</span>
            <span class="result-value">(826)计算机专业基础综合：102</span>
          </div>
          <div class="result-item">
            <span class="result-label">备注：</span>
            <span class="result-value">无</span>
          </div>
        </div>
        <div class="ivu-form-item">
          <div class="ivu-form-item-content" style="margin-left: 170px;">
            <button type="button" class="ivu-btn ivu-btn-primary" @click="goBack">
              <span>返回</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import allSchoolsData from '../assets/all_schools_ordered.json'

interface School {
  code: string
  name: string
}

const route = useRoute()
const router = useRouter()
const schoolsRecord = allSchoolsData as Record<string, School[]>

const schoolCode = ref<string>('')
const schoolName = ref<string>('加载中...')

const formData = reactive({
  name: '',
  idCard: '',
  examNo: ''
})

const errors = reactive({
  name: '',
  idCard: '',
  examNo: ''
})

const isQueried = ref<boolean>(false)

const handleQuery = () => {
  let isValid = true
  errors.name = ''
  errors.idCard = ''
  errors.examNo = ''

  if (!formData.name.trim()) {
    errors.name = '姓名不能为空'
    isValid = false
  }

  const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXs]$/i
  if (!formData.idCard.trim()) {
    errors.idCard = '证件号码不能为空'
    isValid = false
  } else if (!idCardRegex.test(formData.idCard.trim())) {
    errors.idCard = '请输入正确的18位证件号码'
    isValid = false
  }

  const examNoRegex = /^\d{15}$/
  if (!formData.examNo.trim()) {
    errors.examNo = '准考证号不能为空'
    isValid = false
  } else if (!examNoRegex.test(formData.examNo.trim())) {
    errors.examNo = '准考证号必须为15位数字'
    isValid = false
  }

  if (isValid) {
    isQueried.value = true
  }
}

const goBack = () => {
  router.push('/apply/cjcx/')
}

onMounted(() => {
  const rawFile = (route.params.file as string) || ''
  const code = rawFile.replace('.dhtml', '')
  schoolCode.value = code

  let foundName = '未知招生单位'
  for (const province in schoolsRecord) {
    const foundSchool = schoolsRecord[province]?.find(s => s.code === code)
    if (foundSchool) {
      foundName = foundSchool.name
      break 
    }
  }
  schoolName.value = foundName
})
</script>

<style scoped>
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

.main-content {
  flex: 1; 
}

/* Banner 区域复刻 */
.yz-header-banner-wrapper {
  margin-bottom: 10px;
  background: linear-gradient(179deg, #2094f0, #1887e0 53%);
}

.banner {
  height: 200px;
  box-sizing: border-box;
  background-image: url('https://t2.chei.com.cn/yz/assets/images/header-banner-2x.jpg');
  background-size: 1180px 200px; 
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-shadow: 0px 2px 2px rgba(0,0,0,0.06);
  text-align: center;
}

.banner h1 { margin: 0; font-size: 38px; color: #FFFFFF; font-weight: 700; line-height: 46px; }
.ch-sub-title { margin: 8px 0 0; font-size: 16px; color: rgba(255, 255, 255, 0.8); line-height: 24px; }

/* 主体容器 */
.main-container {
  width: 1180px;
  margin: 30px auto 0;
  background-color: #fff;
  min-height: 500px;
}

/* 顶部标题 */
.yzwb-header {
  height: 60px;
  line-height: 60px;
  margin: 0;
  color: #333333;
  font-size: 18px;
  font-weight: 400; /* 原站标题不加粗 */
  text-align: center;
  border-bottom: 1px solid #e5e5e5;
}


/* 提示条 */
.zj-tips {
  width: 860px;
  background-color: #FFF9E6;
  margin: 0 auto;
  padding: 8px 48px 8px 16px;
  box-sizing: border-box;
  border: 1px solid #ffe58f;
  border-radius: 4px;
}
.zj-tips p {
  margin: 0;
  font-size: 14px;
  color: #515A6E;
  line-height: 1.5;
}

/* ===== iView 表单样式复刻 ===== */
.ivu-form {
  width: 920px;
  margin: 0 auto;
}

.ivu-form-item {
  margin-bottom: 24px;
  vertical-align: top;
  zoom: 1;
}
.ivu-form-item::after {
  content: "";
  display: table;
  clear: both;
}
.ivu-form-item-label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #515a6e;
  line-height: 1;
  padding: 10px 12px 10px 0;
  box-sizing: border-box;
}

/* iView 核心逻辑：必填项伪元素自动加红星 */
.ivu-form-item-required .ivu-form-item-label::before {
  content: '*';
  display: inline-block;
  margin-right: 4px;
  line-height: 1;
  font-family: SimSun;
  font-size: 14px;
  color: #ed4014;
}

.ivu-form-item-content {
  position: relative;
  line-height: 32px;
  font-size: 14px;
}

.large-input {
  width: 480px;
}

/* 输入框组合 */
.input-inline-flex {
  display: flex;
  align-items: center;
}

.ivu-input {
  display: inline-block;
  width: 95%;
  height: 25px;
  line-height: 1.5;
  padding: 4px 7px;
  font-size: 14px;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  color: #515a6e;
  background-color: #fff;
  background-image: none;
  position: relative;
  cursor: text;
  transition: border .2s ease-in-out, background .2s ease-in-out, box-shadow .2s ease-in-out;
}

.ivu-input:focus {
  border-color: #2893E9;
  outline: 0;
  box-shadow: 0 0 0 2px rgba(40,147,233,.2);
}

.ivu-input::placeholder { color: #c5c8ce; }

/* iView 报错联动样式：边框变红 */
.ivu-form-item-error .ivu-input {
  border: 1px solid #ed4014;
}
.ivu-form-item-error .ivu-input:focus {
  box-shadow: 0 0 0 2px rgba(237,64,20,.2);
  outline: 0;
}

/* iView 错误提示文字 */
.ivu-form-item-error-tip {
  position: absolute;
  top: 100%;
  left: 0;
  line-height: 1;
  padding-top: 6px;
  color: #ed4014;
  font-size: 12px;
}

/* 报考单位文字 */
.school-text {
  margin: 0;
  line-height: 32px;
  color: #333333;
}

/* 忘记准考证号链接 */
.forget-link {
  color: #1787E0;
  font-size: 14px;
  text-decoration: none;
}
.forget-link:hover {
  text-decoration: underline;
}
.fake-icon {
  margin-left: 2px;
  font-family: monospace;
}

/* 按钮 */
.ivu-btn {
  display: inline-block;
  margin-bottom: 0;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  line-height: 1.5;
  user-select: none;
  padding: 5px 15px 6px;
  font-size: 14px;
  border-radius: 4px;
  transition: color .2s linear,background-color .2s linear,border .2s linear,box-shadow .2s linear;
}

.ivu-btn-primary {
  color: #fff;
  background-color: #2893E9;
  border-color: #2893E9;
}
.ivu-btn-primary:hover {
  background-color: #49a5ff;
  border-color: #49a5ff;
}

/* ===== 成绩结果区 ===== */
.result-container {
  width: 860px;
  margin: 40px auto 0 auto;
}

.result-list {
  display: flex;
  flex-direction: column;
  gap: 16px; 
  margin-bottom: 40px;
}

.result-item {
  display: flex;
  font-size: 14px;
  line-height: 1.5;
}

.result-label {
  width: 150px; 
  text-align: right;
  color: #999999;
  margin-right: 20px;
}

.result-value {
  color: #333333; 
  flex: 1;
}

.score-highlight {
  font-weight: bold;
  color: #1587E0;
}

@media screen and (max-width: 768px) {
  /* 容器释放限制，占满全屏 */
  .main-container.content-box {
    width: 100%;
    margin: 0;
    border: none;
    padding-bottom: 20px;
    min-height: auto;
  }

  /* 调整头部横幅和标题 */
  .banner { height: 120px; background-size: cover; }
  .banner h1 { font-size: 20px; line-height: 30px; }
  .ch-sub-title { font-size: 12px; line-height: 18px; margin-top: 5px; }
  
  .yzwb-header { font-size: 16px; height: 50px; line-height: 50px; }
  .zj-tips { width: auto; margin: 15px; }

  /* -------------------------------------
     表单区：化身为 Vant 风格的“单元格列表” 
     ------------------------------------- */
  .form-container { 
    width: 100%; 
    border-top: 1px solid #ebedf0; 
    border-bottom: 1px solid #ebedf0; 
  }
  
  .ivu-form-item {
    margin-bottom: 0;
    padding: 12px 15px;
    border-bottom: 1px solid #ebedf0;
    flex-direction: row; /* 保持左右排布 */
    align-items: center;
  }
  /* 隐藏最后一个元素的底边框 */
  .ivu-form-item:not(.action-row):last-child { border-bottom: none; }

  /* Label 靠左定宽 */
  .ivu-form-item-label {
    width: 90px !important;
    padding: 0;
    text-align: left; /* 改为左对齐 */
  }

  /* Content 占满剩余空间 */
  .ivu-form-item-content {
    margin-left: 0 !important;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .large-input { width: 100%; }
  
  /* 去掉输入框的原生边框，使其融入“单元格” */
  .ivu-input {
    border: none !important;
    padding: 0;
    height: 24px;
    box-shadow: none !important;
  }

  /* 准考证一行：输入框与忘记密码同行 */
  .input-inline-flex {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  /* 错误提示文字的位置调整 */
  .ivu-form-item-error-tip {
    position: relative;
    top: 0;
    padding-top: 4px;
  }

  /* 提交按钮区域 */
  .ivu-form-item.action-row {
    padding: 20px 15px;
    border-bottom: none;
    border-top: 1px solid #ebedf0;
    margin-top: 20px;
  }
  .ivu-form-item.action-row .ivu-form-item-content { margin-left: 0 !important; width: 100%; }
  .ivu-btn-primary {
    width: 100%;
    margin-left: 0 !important;
    height: 44px;
    font-size: 16px;
    border-radius: 4px;
  }

  /* -------------------------------------
     结果区：化身为类似设置页面的“表格列表”
     ------------------------------------- */
  .result-container {
    width: 100%;
    margin: 20px 0 0 0;
  }

  .result-list {
    margin-bottom: 0;
    gap: 0;
    border-top: 1px solid #ebedf0;
    border-bottom: 1px solid #ebedf0;
  }

  .result-item {
    padding: 12px 15px;
    border-bottom: 1px solid #ebedf0;
    margin: 0;
    align-items: flex-start;
  }
  .result-item:last-child { border-bottom: none; }

  .result-label {
    width: 90px;
    text-align: left;
    margin-right: 0;
  }

  /* 底部返回按钮 */
  .result-container .ivu-form-item {
    border: none;
    padding: 20px 15px;
  }
  .result-container .ivu-form-item-content {
    margin-left: 0 !important;
    width: 100%;
  }
}
</style>