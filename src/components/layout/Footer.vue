<template>
  <footer class="footer" id="about">
    <div class="container">
      <div class="footer__content">
        <div class="footer__section">
          <div class="footer__logo">
            <div class="logo-icon">
              <i class="fa fa-cube"></i>
            </div>
            <h3 class="footer__title text-gradient">Tech</h3>
          </div>
          <p class="footer__description">探索前沿技术，分享创新思维</p>
          <p class="footer__copyright">© 2025 Tech. 保留所有权利。</p>
        </div>
        
        <div class="footer__section">
          <h4 class="footer__section-title">分类</h4>
          <ul class="footer__links">
            <li><a href="#" class="footer__link">golang开发</a></li>
            <li><a href="#" class="footer__link">3D技术</a></li>
            <li><a href="#" class="footer__link">前端开发</a></li>
            <li><a href="#" class="footer__link">云计算</a></li>
          </ul>
        </div>
        
        <div class="footer__section">
          <h4 class="footer__section-title">资源</h4>
          <ul class="footer__links">
            <li><a href="#" class="footer__link">教程</a></li>
            <li><a href="#" class="footer__link">代码示例</a></li>
            <li><a href="#" class="footer__link">工具推荐</a></li>
            <li><a href="#" class="footer__link">社区讨论</a></li>
          </ul>
        </div>
        
        <div class="footer__section">
          <h4 class="footer__section-title">联系我们</h4>
          <ul class="footer__links">
            <li class="footer__contact">
              <i class="fa fa-envelope-o"></i>
              contact@tech.com
            </li>
            <li class="footer__contact">
              <i class="fa fa-map-marker"></i>
              重庆市
            </li>
            <li class="footer__contact">
              <i class="fa fa-wechat"></i>
              Tech公众号
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
</script>

<style lang="less" scoped>
@import '../../styles/variables.less';

.footer {
  background: rgba(17, 24, 39, 0.8);
  backdrop-filter: blur(10px);
  border-top: 1px solid @border-color;
  padding: @spacing-xl 0;
  margin-top: @spacing-xl;
  
  &__content {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: @spacing-xl;
    
    @media (max-width: @breakpoint-tablet) {
      grid-template-columns: 1fr 1fr;
    }
    
    @media (max-width: @breakpoint-mobile) {
      grid-template-columns: 1fr;
    }
  }
  
  &__section {
    &:first-child {
      max-width: 300px;
    }
  }
  
  &__logo {
    display: flex;
    align-items: center;
    gap: @spacing-sm;
    margin-bottom: @spacing-md;
    
    .logo-icon {
      background: @primary-color;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 0.875rem;
    }
  }
  
  &__title {
    font-size: 1.25rem;
    font-weight: bold;
  }
  
  &__description {
    color: @text-gray;
    margin-bottom: @spacing-sm;
    font-size: 0.875rem;
  }
  
  &__copyright {
    color: @text-dark;
    font-size: 0.75rem;
  }
  
  &__section-title {
    font-size: 1rem;
    font-weight: 600;
    color: @text-light;
    margin-bottom: @spacing-md;
  }
  
  &__links {
    list-style: none;
  }
  
  &__link {
    color: @text-gray;
    text-decoration: none;
    font-size: 0.875rem;
    padding: 0.25rem 0;
    display: block;
    transition: color 0.3s ease;
    
    &:hover {
      color: @primary-color;
    }
  }
  
  &__contact {
    color: @text-gray;
    font-size: 0.875rem;
    padding: 0.25rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    i {
      width: 1rem;
    }
  }

  &__backtop {
    margin: 2rem auto 0 auto;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 2rem;
    border-radius: 2rem;
    background: linear-gradient(90deg, #4f8cff 0%, #b388ff 100%);
    color: #fff;
    border: none;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 24px rgba(79,140,255,0.12);
    transition: background 0.3s, transform 0.2s;
  }
  &__backtop:hover {
    background: linear-gradient(90deg, #b388ff 0%, #4f8cff 100%);
    transform: scale(1.08);
  }
}
</style>