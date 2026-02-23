<template>
  <header class="yz-header">
    <div class="header-container">
      
      <a href="https://yz.chsi.com.cn/" class="top-nav-home"></a>

      <nav class="main-nav" v-show="!isSearchActive">
        <a v-for="item in navLinks" :key="item.name" :href="item.url" class="nav-item">
          {{ item.name }}
        </a>

        <div class="nav-item dropdown" @mouseenter="isDropdownVisible = true" @mouseleave="isDropdownVisible = false">
          <span class="dropdown-trigger">
            更多 <span class="arrow" :class="{ up: isDropdownVisible }"></span>
          </span>
          
          <Transition name="fade">
            <div v-show="isDropdownVisible" class="dropdown-menu">
              <span class="top-nav-pop-arrow"></span>
              <div class="dropdown-grid">
                <a v-for="item in moreLinks" :key="item.name" :href="item.url" class="dropdown-item">
                  {{ item.name }}
                </a>
              </div>
            </div>
          </Transition>
        </div>
      </nav>

      <div class="search-active-area" v-show="isSearchActive">
        <div class="search-input-box">
          <input type="text" ref="searchInput" />
          <img src="https://t2.chei.com.cn/common/images/icon-search-wap.svg" alt="搜索" class="inner-icon"/>
        </div>
        <span class="action-link cancel-btn" @click="closeSearch">取消</span>
      </div>

      <div class="header-actions">
        <a v-show="!isSearchActive" href="#" class="search-trigger" @click.prevent="openSearch">
          <img src="https://t2.chei.com.cn/common/images/icon-search.svg" alt="搜索" />
        </a>
        
        <template v-if="isSearchActive">
          <span class="info-line"></span>
        </template>

        <a href="https://yz.chsi.com.cn/user/center.jsp" class="action-link">用户中心</a>
        <span class="info-line"></span>
        <a href="https://account.chsi.com.cn/account/preregister.action?from=yz-home" class="action-link">注册</a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const isDropdownVisible = ref(false)
const isSearchActive = ref(false)
const searchInput = ref(null)

const openSearch = async () => {
  isSearchActive.value = true
  await nextTick()
  if (searchInput.value) {
    searchInput.value.focus()
  }
}

const closeSearch = () => {
  isSearchActive.value = false
}

const navLinks = [
  { name: '首页', url: 'https://yz.chsi.com.cn/' },
  { name: '国家政策', url: 'https://yz.chsi.com.cn/kyzx/zcdh/' },
  { name: '资讯', url: 'https://yz.chsi.com.cn/kyzx/kydt/' },
  { name: '院校库', url: 'https://yz.chsi.com.cn/sch/' },
  { name: '硕士目录', url: 'https://yz.chsi.com.cn/zsml/' },
  { name: '网报公告', url: 'https://yz.chsi.com.cn/sswbgg/' },
  { name: '统考网报', url: 'https://yz.chsi.com.cn/yzwb/' },
  { name: '网上确认', url: 'https://yz.chsi.com.cn/wsqr/stu/' },
  { name: '成绩查询', url: 'https://yz.chsi.com.cn/apply/cjcx/' },
  { name: '复试调剂', url: 'https://yz.chsi.com.cn/yztj/' },
  { name: '推免服务', url: 'https://yz.chsi.com.cn/tm/' },
  { name: '信息公开', url: 'https://yz.chsi.com.cn/zsgs/' }
]

const moreLinks = [
  { name: '教育部政策', url: 'https://yz.chsi.com.cn/kyzx/jybzc/' },
  { name: '院校政策', url: 'https://yz.chsi.com.cn/kyzx/yxzc/' },
  { name: '招生简章', url: 'https://yz.chsi.com.cn/kyzx/zsjz/' },
  { name: '在线咨询', url: 'https://yz.chsi.com.cn/zxdy/' },
  { name: '复试分数线', url: 'https://yz.chsi.com.cn/kyzx/zt/kyfs2025.shtml' },
  { name: '研招访谈', url: 'https://yz.chsi.com.cn/yzzt/zbft' },
  { name: '博士目录', url: 'https://yz.chsi.com.cn/bsmlcx/' },
  { name: '博士网报', url: 'https://yz.chsi.com.cn/bsbm/image/error' },
  { name: '管理类专硕', url: 'https://yz.chsi.com.cn/yzzt/glllk' },
  { name: '专业学位', url: 'https://yz.chsi.com.cn/kyzx/zt/zsxz.shtml' },
  { name: '专业库', url: 'https://yz.chsi.com.cn/zyk/' }
]
</script>

<style scoped>
.yz-header {
  width: 100%;
  background-color: #fff;
  /* 官方的阴影参数 */
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 100;
}

.header-container {
  width: 1200px;
  margin: 0 auto;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* 【官方 Logo 实现】支持高清屏适配 */
.top-nav-home {
  display: inline-block;
  width: 98px;
  height: 36px;
  margin-right: 20px;
  background-image: url("https://t2.chei.com.cn/yz/assets/images/logo-min.png");
  background-image: -webkit-image-set(
      url("https://t2.chei.com.cn/yz/assets/images/logo-min.png") 1x,
      url("https://t4.chei.com.cn/yz/assets/images/logo-min2x.png") 2x
  );
  background-repeat: no-repeat;
  background-position: center left;
}

.main-nav {
  display: flex;
  align-items: center;
  flex: 1;
}

.nav-item {
  color: #2b2e33;
  text-decoration: none;
  font-size: 14px;
  margin-right: 20px;
  line-height: 48px;
  cursor: pointer;
}

.nav-item:hover, .dropdown:hover .dropdown-trigger {
  color: #1887e0;
  font-weight: 700;
}

.dropdown { position: relative; }
.dropdown-trigger { display: flex; align-items: center; }

.arrow {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-right: 1px solid currentColor;
  border-bottom: 1px solid currentColor;
  transform: rotate(45deg);
  margin-left: 4px;
  margin-bottom: 3px;
  transition: transform 0.2s;
}

.arrow.up { transform: rotate(-135deg); margin-bottom: -2px; }

/* 官方的 Dropdown 样式 */
.dropdown-menu {
  position: absolute;
  top: 44px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  padding: 18px 30px 18px 16px;
  white-space: nowrap;
}

/* 官方的顶部小三角 */
.top-nav-pop-arrow {
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  border-color: transparent;
  border-style: solid;
  left: 50%;
  margin-left: -14px;
  top: -7px;
  border-width: 0 7px 7px;
  border-bottom-color: rgba(0, 0, 0, 0.03);
}
.top-nav-pop-arrow::after {
  display: block;
  content: '';
  width: 0;
  height: 0;
  position: absolute;
  border-color: transparent;
  border-style: solid;
  left: 50%;
  margin-left: -7px;
  top: 1px;
  border-width: 0 7px 7px;
  border-bottom-color: #fff;
}

.dropdown-grid {
  display: grid;
  grid-template-columns: repeat(4, auto);
  column-gap: 30px;
  row-gap: 15px;
  position: relative;
  z-index: 2;
}

.dropdown-item { color: #2B2E33; text-decoration: none; font-size: 14px; }
.dropdown-item:hover { color: #1887E0; font-weight: bold; }

.search-active-area {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.search-input-box {
  position: relative;
  width: 200px; /* 官方搜索框宽度 */
}

.search-input-box input {
  width: 100%;
  height: 30px;
  border: 1px solid #D5D7DB;
  border-radius: 4px;
  padding: 0 28px 0 8px;
  outline: none;
  font-size: 14px;
  box-sizing: border-box;
}
.search-input-box input:focus { border: 1px solid #1887E0; }

.search-input-box .inner-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  opacity: 0.6;
}

.cancel-btn { margin-left: 15px; cursor: pointer; }

.header-actions { display: flex; align-items: center; font-size: 14px; }

.search-trigger { display: flex; align-items: center; margin-right: 15px; }
.search-trigger img { width: 20px; height: 20px; }

.action-link { color: #2B2E33; text-decoration: none; }
.action-link:hover { color: #1887E0; }

/* 【官方的分割线】 */
.info-line {
  display: block;
  width: 1px;
  height: 12px;
  background: #e8eaed;
  margin: 0 12px;
}

@media screen and (max-width: 768px) {
  .header-container {
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
  }
  /* 手机端隐藏复杂的导航和右侧操作区，保持清爽 */
  .main-nav, .header-actions {
    display: none;
  }
}
</style>