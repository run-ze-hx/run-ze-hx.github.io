<template>
  <article class="article-card" ref="cardRef"
    @mouseenter="onHover"
    @mouseleave="onLeave">
    <div class="article-card__image">
      <img :src="article.image" :alt="article.title" class="article-card__img">
      <div class="article-card__overlay" :class="{ active: isHovered }"></div>
    </div>
    <div class="article-card__content">
      <div class="article-card__meta">
        <span class="article-card__category" :class="`article-card__category--${getCategoryClass(article.category)}`">
          {{ article.category }}
        </span>
        <span class="article-card__date">{{ article.date }}</span>
      </div>
      <h3 class="article-card__title">{{ article.title }}</h3>
      <p class="article-card__description">{{ article.description }}</p>
      <div class="article-card__footer">
        <span class="article-card__read-time">
          <i class="fa fa-clock-o"></i>
          {{ article.readTime }}
        </span>
        <a href="#" class="article-card__link">
          阅读更多
          <i class="fa fa-long-arrow-right" :class="{ active: isHovered }"></i>
        </a>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})

const isHovered = ref(false)
const cardRef = ref(null)

onMounted(() => {
  if (cardRef.value) {
    gsap.from(cardRef.value, {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out'
    })
  }
})

const onHover = () => {
  isHovered.value = true
  if (cardRef.value) {
    gsap.to(cardRef.value, {
      scale: 1.035,
      filter: 'none',
      boxShadow: '0 8px 32px rgba(79,140,255,0.18)',
      duration: 0.18,
      ease: 'power1.out'
    })
  }
}
const onLeave = () => {
  isHovered.value = false
  if (cardRef.value) {
    gsap.to(cardRef.value, {
      scale: 1,
      filter: 'none',
      boxShadow: '0 0 0 rgba(0,0,0,0)',
      duration: 0.18,
      ease: 'power1.in'
    })
  }
}

// 根据分类返回对应的样式类
const getCategoryClass = (category) => {
  const categoryMap = {
    '3D技术': 'blue',
    'WebGL': 'purple',
    '前端开发': 'green',
    'golang开发': 'yellow'
  }
  return categoryMap[category] || 'blue'
}
</script>

<style lang="less" scoped>
@import '../../styles/variables.less';

.article-card {
  background: rgba(31, 41, 55, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid @border-color;
  border-radius: @border-radius-lg;
  overflow: hidden;
  transition: box-shadow 0.2s, border-color 0.2s;
  cursor: pointer;
  will-change: transform, box-shadow;
  // 禁止缩放时的模糊
  image-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: @primary-color;
  }
  
  &__image {
    position: relative;
    height: 200px;
    overflow: hidden;
  }
  
  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
    will-change: transform;
    image-rendering: auto;
  }
  
  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3));
    opacity: 0;
    transition: opacity 0.3s ease;
    
    &.active {
      opacity: 1;
    }
  }
  
  &:hover &__img {
    transform: scale(1.05);
  }
  
  &__content {
    padding: @spacing-lg;
  }
  
  &__meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: @spacing-md;
  }
  
  &__category {
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-weight: 500;
    
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
  
  &__date {
    font-size: 0.875rem;
    color: @text-gray;
  }
  
  &__title {
    font-size: 1.25rem;
    font-weight: 600;
    color: @text-light;
    margin-bottom: @spacing-sm;
    line-height: 1.4;
    transition: color 0.3s ease;
  }
  
  .article-card:hover &__title {
    color: @primary-color;
  }
  
  &__description {
    color: @text-gray;
    line-height: 1.6;
    margin-bottom: @spacing-lg;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  &__read-time {
    font-size: 0.875rem;
    color: @text-gray;
    
    i {
      margin-right: 0.25rem;
    }
  }
  
  &__link {
    color: @primary-color;
    text-decoration: none;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    
    i {
      transition: transform 0.3s ease;
      
      &.active {
        transform: translateX(4px);
      }
    }
    
    &:hover {
      color: lighten(@primary-color, 10%);
    }
  }
}
</style>