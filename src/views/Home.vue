<template>
  <div class="home" id="home">
    <!-- 英雄区域 -->
    <section class="hero">
      <div class="container">
        <div class="hero__content">
          <h1 class="hero__title" ref="heroTitle">
            探索<span class="text-gradient">前沿技术</span>的无限可能
          </h1>
          <p class="hero__description" ref="heroDesc">
            深入解析编程、设计与创新，带你领略技术世界的精彩
          </p>
          <div class="hero__actions">
            <a href="#articles" class="btn btn--primary">浏览文章</a>
            <a href="#demos" class="btn btn--secondary">查看技术演示</a>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 技术分类 -->
    <section class="categories">
      <div class="container">
        <div class="categories__grid">
          <div
            v-for="(cat, idx) in categories"
            :key="cat.id"
            class="category-card"
            :class="cat.color"
            ref="el => categoryCardRefs.value[idx] = el"
            @mouseenter="gsap.to(categoryCardRefs.value[idx], { scale: 1.08, boxShadow: '0 8px 32px rgba(79,140,255,0.18)', duration: 0.3 })"
            @mouseleave="gsap.to(categoryCardRefs.value[idx], { scale: 1, boxShadow: '0 0 0 rgba(0,0,0,0)', duration: 0.3 })"
          >
            <div class="category-card__icon">
              <i :class="cat.icon"></i>
            </div>
            <h3 class="category-card__title">{{ cat.title }}</h3>
            <p class="category-card__description">{{ cat.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 技术演示（Three.js） -->
    <section id="demos" class="demos">
      <div class="container">
        <div class="section-header">
          <h2 class="section-header__title">技术演示</h2>
          <p class="section-header__link">交互式 Three.js 示例</p>
        </div>
        <div class="demos__canvas" id="demo-canvas" style="height:360px; border-radius:8px; overflow:hidden; background:transparent;">
          <!-- Three.js 场景将渲染到这里 -->
        </div>
      </div>
    </section>
    
    <!-- 最新文章 -->
    <section id="articles" class="articles">
      <div class="container">
        <div class="section-header">
          <h2 class="section-header__title">最新技术文章</h2>
          <a href="#" class="section-header__link">
            查看全部 <i class="fa fa-arrow-right"></i>
          </a>
        </div>
        
        <div class="articles__grid">
          <ArticleCard 
            v-for="(article, idx) in articles" 
            :key="article.id"
            :article="article"
            ref="el => articleCardRefs.value[idx] = el"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { gsap } from 'gsap'
import ArticleCard from '../components/common/ArticleCard.vue'
import { useThreeScene } from '../composables/useThreeScene'

// 技术分类数据
const categories = ref([
  {
    id: 1,
    title: 'golang开发',
    description: '探索Golang语言与框架',
    icon: 'fa fa-code',
    color: 'blue'
  },
  {
    id: 2,
    title: '3D技术',
    description: 'Three.js与WebGL实践指南',
    icon: 'fa fa-cubes',
    color: 'purple'
  },
  {
    id: 3,
    title: '前端开发',
    description: '现代前端框架与工具',
    icon: 'fa fa-mobile',
    color: 'green'
  },
  {
    id: 4,
    title: '云计算',
    description: '服务架构与云原生技术',
    icon: 'fa fa-cloud',
    color: 'yellow'
  }
])

// 文章数据
const articles = ref([
  {
    id: 1,
    title: 'Three.js性能优化实战指南',
    description: '探索提升Three.js应用性能的关键技术，包括模型简化、材质优化和渲染策略，让你的3D应用在各种设备上流畅运行。',
    category: '3D技术',
    date: '2023-10-10',
    image: 'https://picsum.photos/seed/threejs1/600/400',
    readTime: '8分钟'
  },
  {
    id: 2,
    title: 'WebGL底层原理与着色器编程',
    description: '深入理解WebGL的工作原理，从图形管线到着色器编程，掌握自定义渲染效果的核心技术，打造独特的视觉体验。',
    category: 'WebGL',
    date: '2023-10-05',
    image: 'https://picsum.photos/seed/webgl2/600/400',
    readTime: '12分钟'
  },
  {
    id: 3,
    title: '现代前端工程化最佳实践',
    description: '从模块化设计到自动化测试，从CI/CD到性能监控，全面介绍现代前端工程化的关键环节和最佳实践。',
    category: '前端开发',
    date: '2023-09-28',
    image: 'https://picsum.photos/seed/frontend3/600/400',
    readTime: '10分钟'
  }
])

// 初始化页面内的 Three.js 演示
const { initBackgroundScene } = useThreeScene()

const heroTitle = ref(null)
const heroDesc = ref(null)
const categoryCardRefs = ref([])
const articleCardRefs = ref([])

onMounted(() => {
  // 英雄区文字淡入
  gsap.from(heroTitle.value, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' })
  gsap.from(heroDesc.value, { y: 30, opacity: 0, duration: 0.7, delay: 0.3 })

  // 在 demo-canvas 初始化一个独立的 three 场景
  initBackgroundScene('demo-canvas')

  // 技术分类卡片弹性进入动画
  categoryCardRefs.value.forEach((el, i) => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      delay: 0.2 + i * 0.1,
      ease: 'back.out(1.7)'
    })
  })

  // 文章卡片渐现动画
  articleCardRefs.value.forEach((el, i) => {
    gsap.from(el, {
      y: 30,
      opacity: 0,
      duration: 0.7,
      delay: 0.5 + i * 0.1,
      ease: 'power2.out'
    })
  })
})
</script>

<style lang="less" scoped>
@import '../styles/variables.less';

.home {
  padding-bottom: @spacing-xl;
}

.demos {
  padding: @spacing-xl 0;
  .demos__canvas {
    margin-top: @spacing-md;
  }
}

.hero {
  padding: @spacing-xl 0;
  text-align: center;
  
  &__content {
    max-width: 800px;
    margin: 0 auto;
  }
  
  &__title {
    font-size: 3rem;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: @spacing-lg;
    
    @media (max-width: @breakpoint-mobile) {
      font-size: 2.5rem;
    }
  }
  
  &__description {
    font-size: 1.25rem;
    color: @text-gray;
    margin-bottom: @spacing-xl;
    line-height: 1.6;
  }
  
  &__actions {
    display: flex;
    gap: @spacing-md;
    justify-content: center;
    flex-wrap: wrap;
  }
}

.hero__action {
  margin-top: 2rem;
  padding: 0.75rem 2.5rem;
  font-size: 1.25rem;
  border-radius: 2rem;
  background: linear-gradient(90deg, #4f8cff 0%, #b388ff 100%);
  color: #fff;
  border: none;
  box-shadow: 0 4px 24px rgba(79,140,255,0.12);
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s, transform 0.2s;
}
.hero__action:hover {
  background: linear-gradient(90deg, #b388ff 0%, #4f8cff 100%);
  transform: scale(1.08);
}
.hero-intro-modal {
  position: fixed;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(31,41,55,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.hero-intro-modal__content {
  background: #fff;
  color: #213547;
  border-radius: 1.5rem;
  padding: 2.5rem 2rem;
  min-width: 320px;
  box-shadow: 0 8px 32px rgba(79,140,255,0.18);
  text-align: center;
  position: relative;
}
.hero-intro-modal__close {
  margin-top: 2rem;
  padding: 0.5rem 2rem;
  border-radius: 2rem;
  background: linear-gradient(90deg, #4f8cff 0%, #b388ff 100%);
  color: #fff;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  transition: background 0.3s, transform 0.2s;
}
.hero-intro-modal__close:hover {
  background: linear-gradient(90deg, #b388ff 0%, #4f8cff 100%);
  transform: scale(1.08);
}

.categories {
  padding: @spacing-xl 0;
  
  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: @spacing-lg;
  }
}

.category-card {
  background: rgba(31, 41, 55, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid @border-color;
  border-radius: @border-radius-lg;
  padding: @spacing-lg;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    border-color: @primary-color;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }
  
  &__icon {
    width: 3rem;
    height: 3rem;
    border-radius: @border-radius;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto @spacing-md;
    font-size: 1.25rem;
    
    &--blue {
      background: rgba(59, 130, 246, 0.2);
      color: @primary-color;
    }
    
    &--purple {
      background: rgba(139, 92, 246, 0.2);
      color: @secondary-color;
    }
    
    &--green {
      background: rgba(34, 197, 94, 0.2);
      color: #10b981;
    }
    
    &--yellow {
      background: rgba(245, 158, 11, 0.2);
      color: #f59e0b;
    }
  }
  
  &__title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: @spacing-sm;
    color: @text-light;
  }
  
  &__description {
    color: @text-gray;
    font-size: 0.875rem;
  }
}

.articles {
  padding: @spacing-xl 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: @spacing-xl;
  
  &__title {
    font-size: 2rem;
    font-weight: 700;
    color: @text-light;
  }
  
  &__link {
    color: @primary-color;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
    
    &:hover {
      color: lighten(@primary-color, 10%);
    }
  }
}

.articles__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: @spacing-lg;
}

// 按钮样式
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 2rem;
  border-radius: 2rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  
  &--primary {
    background: @primary-color;
    color: white;
    
    &:hover {
      background: lighten(@primary-color, 10%);
      transform: translateY(-2px);
    }
  }
  
  &--secondary {
    background: rgba(31, 41, 55, 0.8);
    color: @text-light;
    border: 1px solid @border-color;
    
    &:hover {
      background: rgba(55, 65, 81, 0.8);
      transform: translateY(-2px);
    }
  }
}
</style>
``` 