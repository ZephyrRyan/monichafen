<template>
  <main class="main-content">
    <div class="yz-header-banner-wrapper">
      <div class="banner">
        <h1>2026年部分考生初试成绩查询</h1>
        <div class="ch-sub-title">本系统所有数据均为招生单位提供，招生单位对查询结果负责解释。</div>
      </div>
    </div>

    <div class="container main-container">
      
      <div class="wbgg-row clearfix">
        <div class="wbgg-tab-wrapper clearfix">
          <div class="item-content active">
            <ul class="wbgg-ss-list clearfix">
              <li 
                v-for="prov in allProvinces" 
                :key="prov" 
                :class="{ selected: selectedProvince === prov }"
                @click="handleProvinceSelect(prov)"
              >
                {{ prov }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div v-if="selectedProvince" class="ch-alert ch-alert-with-decription">
        列表中显示为灰色的，代表此招生单位未设置查询方式。
      </div>

      <div class="cjcx-box">
        <div v-if="!selectedProvince" class="wbgg-list">
          <div class="wbgg-default-content empty-state">
            <svg class="empty-icon" width="80" height="80" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 8H36L48 20V56C48 58.2091 46.2091 60 44 60H16C13.7909 60 12 58.2091 12 56V12C12 9.79086 13.7909 8 16 8Z" stroke="#D3DCE6" stroke-width="3" stroke-linejoin="round"/>
              <path d="M36 8V20H48" stroke="#D3DCE6" stroke-width="3" stroke-linejoin="round"/>
              <line x1="20" y1="26" x2="32" y2="26" stroke="#D3DCE6" stroke-width="3" stroke-linecap="round"/>
              <line x1="20" y1="36" x2="40" y2="36" stroke="#D3DCE6" stroke-width="3" stroke-linecap="round"/>
              <circle cx="34" cy="46" r="8" stroke="#D3DCE6" stroke-width="3"/>
              <line x1="40" y1="52" x2="48" y2="60" stroke="#D3DCE6" stroke-width="3" stroke-linecap="round"/>
            </svg>
            <span class="c-grey">请选择招生单位所在省市进行查询</span>
          </div>
        </div>
        
        <div v-else class="data-state">
          <div class="sch-title">
            <span class="highlight-province">{{ selectedProvince }}</span> 成绩查询
          </div>
          
          <table class="ch-table schools-table">
            <tbody>
              <tr v-for="(row, rowIndex) in chunkedSchools" :key="rowIndex">
                <td v-for="(school, colIndex) in row" :key="colIndex">
                  <a 
                    :href="`/apply/cjcx/t/${school.code}.dhtml`" 
                    target="_blank" 
                    class="school-link"
                  >
                    ({{ school.code }}){{ school.name }}
                  </a>
                </td>
                <td v-for="empty in (4 - row.length)" :key="'empty-' + empty"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div v-if="selectedProvince" class="wbgg-page-tip">
        注：该页面仅提供最新年度成绩查询，如有疑问，请咨询发布单位。
      </div>
      <div style="clear: both;"></div>

    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import allSchoolsData from '../assets/all_schools_ordered.json'

interface School {
  code: string
  name: string
}

const schoolsRecord = allSchoolsData as Record<string, School[]>
const selectedProvince = ref<string>('')

const handleProvinceSelect = (prov: string) => {
  selectedProvince.value = prov
}

// 切分成二维数组，4列一行
const chunkedSchools = computed(() => {
  if (!selectedProvince.value) return []
  const schools = schoolsRecord[selectedProvince.value] || []
  const result: School[][] = []
  for (let i = 0; i < schools.length; i += 4) {
    result.push(schools.slice(i, i + 4))
  }
  return result
})

const allProvinces: string[] = [
  '北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', 
  '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', 
  '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川',
  '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆'
]
</script>

<style scoped>
/* 清除浮动工具类 */
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

.main-content {
  flex: 1; 
  padding-bottom: 60px;
}

/* 官方原版 Banner 样式 */
.yz-header-banner-wrapper {
  margin-bottom: 10px;
  /* 绝佳的线性渐变 */
  background: linear-gradient(179deg, #2094f0, #1887e0 53%);
}

.banner {
  height: 200px;
  box-sizing: border-box;
  background: url("https://t2.chei.com.cn/yz/assets/images/header-banner-2x.jpg") no-repeat top;
  /* 核心适配：高度拉满，宽度自动 */
  background-size: auto 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  /* 官方的文字阴影 */
  text-shadow: 0px 2px 2px rgba(0,0,0,0.06);
  text-align: center;
}

.banner h1 { 
  margin: 0; 
  font-size: 38px; 
  font-weight: 700; 
  line-height: 46px;
}

.ch-sub-title { 
  margin: 8px 0 0; 
  font-size: 16px; 
  color: rgba(255, 255, 255, 0.8); 
  line-height: 24px;
}

/* 主体容器 1180 */
.main-container { 
  width: 1180px; 
  margin: 30px auto 0; 
}

/* ======= 原生级省份选择区 ======= */
.wbgg-tab-wrapper .item-content.active {
  background-color: #F7F9FA;
  padding: 15px 20px;
  margin-bottom: 20px;
}

.wbgg-ss-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
}

/* 完美复刻截图参数：48x32, margin: 0 0 5px, padding: 0 10px */
.wbgg-ss-list li {
  height: 32px;
  line-height: 32px;
  color: #333333;
  font-size: 14px;
  padding: 0 10px;
  margin: 0 0 5px;
  cursor: pointer;
  white-space: nowrap;
}

.wbgg-ss-list li.selected {
  background-color: #1787E0;
  color: #FFFFFF;
}

/* ======= 蓝色提示条 ======= */
.ch-alert {
  margin: 0 0 10px 0;
  background-color: #F0FBFF;
  border: 1px solid #A6E0FF;
  color: #333;
  padding: 8px 48px 8px 16px;
  font-size: 14px;
  box-sizing: border-box;
}

/* ======= 内容框 ======= */
.cjcx-box {
  width: 100%;
  border: 1px solid #e5e5e5;
  background-color: #fff;
  min-height: 235px;
  box-sizing: border-box;
}

.empty-state {
  height: 235px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}
.empty-icon { margin-bottom: 15px; }
.c-grey { color: #999; }

/* ======= 表格区域 ======= */
.sch-title {
  padding: 14px 20px;
  font-size: 18px; /* 稍微调大符合原站标题风格 */
  font-weight: bold;
  color: #666;
  border-bottom: 1px solid #e5e5e5;
}

.highlight-province { color: #1587E0; }

.ch-table { width: 100%; border-collapse: collapse; }
.ch-table tr:hover { background-color: #F7F9FA; }
.ch-table td {
  width: 25%;
  padding: 12px 10px;
  border-bottom: 1px solid #f0f0f0;
  vertical-align: top;
}
.school-link {
  color: #333333;
  text-decoration: none;
  font-size: 16px; 
  display: inline-block;
  word-break: break-all;
  line-height: 1.5;
}
.school-link:hover { color: #1787E0; }

/* ======= 底部提示语 ======= */
.wbgg-page-tip {
  float: left;
  padding: 15px 0;
  margin-left: 10px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: #999;
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .main-container, .province-selector, .cjcx-box, .notice-box {
    width: 100% !important;
    box-sizing: border-box;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  
  /* Banner 压缩 */
  .banner {
    height: 120px;
    background-size: cover;
  }
  .banner h1 { font-size: 20px; line-height: 30px; }
  .ch-sub-title { font-size: 12px; line-height: 18px; margin-top: 5px; }

  /* 省份选择区变紧凑 */
  .wbgg-tab-wrapper .item-content.active {
    padding: 10px;
  }
  .wbgg-ss-list li {
    width: 20%; /* 手机上一排显示5个省份 */
    padding: 0;
    text-align: center;
    font-size: 13px;
  }

  /* 核心：把表格变成手机的单列列表 */
  .ch-table, .ch-table tbody, .ch-table tr {
    display: block;
    width: 100%;
  }
  .ch-table td {
    display: block;
    width: 100%;
    box-sizing: border-box;
  }
  /* 隐藏我们之前为了占位生成的空 td */
  .ch-table td:empty {
    display: none;
  }
  
  .wbgg-page-tip {
    float: none;
    margin-left: 0;
    padding: 10px 15px;
    text-align: center;
    height: auto;
    line-height: 1.5;
  }
}
</style>