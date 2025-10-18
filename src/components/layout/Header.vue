<template>
  <header class="header" :class="{ scrolled: scrolled }">
    <div class="container">
      <div class="header__content">
        <!-- Logo -->
        <div class="header__logo">
          <div class="logo-icon">
            <i class="fa fa-cube"></i>
          </div>
          <h1 class="header__title text-gradient">Tech</h1>
        </div>
        
        <!-- 桌面导航 -->
        <nav class="header__nav">
          <a href="#app" class="header__link">首页</a>
          <a href="#articles" class="header__link">文章</a>
          <a href="#demos" class="header__link">技术演示</a>
          <a href="#about" class="header__link">关于</a>
        </nav>
        
        <!-- 搜索框 -->
        <div class="header__search">
          <input 
            type="text" 
            placeholder="搜索技术文章..." 
            class="header__search-input"
          >
          <i class="fa fa-search header__search-icon"></i>
        </div>
        
        <!-- 移动端菜单按钮 -->
        <button class="header__mobile-toggle" @click="toggleMobileMenu">
          <i class="fa" :class="mobileMenuOpen ? 'fa-times' : 'fa-bars'"></i>
        </button>
      </div>
      
      <!-- 移动端菜单 -->
      <div v-show="mobileMenuOpen" class="header__mobile-menu">
        <nav class="header__nav">
          <a href="#home" class="header__link" @click="closeMobileMenu">首页</a>
          <a href="#articles" class="header__link" @click="closeMobileMenu">文章</a>
          <a href="#demos" class="header__link" @click="closeMobileMenu">技术演示</a>
          <a href="#about" class="header__link" @click="closeMobileMenu">关于</a>
        </nav>
        
        <div class="header__search">
          <input 
            type="text" 
            placeholder="搜索技术文章..." 
            class="header__search-input"
          >
          <i class="fa fa-search header__search-icon"></i>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  scrolled: Boolean
})

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<style lang="less" scoped>
@import '../../styles/components/header.less';
</style>