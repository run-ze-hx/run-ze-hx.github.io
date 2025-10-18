<template>
  <div class="music-player" :class="{ expanded: expanded }">
    
    <!-- 折叠状态 -->
    <div v-if="!expanded" class="music-player__collapsed">
      <button class="music-player__toggle" @click="$emit('toggle-player')">
        <i class="fa fa-music"></i>
      </button>
    </div>
    
    <!-- 展开状态 -->
    <div v-else class="music-player__expanded">
      <!-- 头部 -->
      <div class="music-player__header">
        <h3 class="music-player__title">音乐播放器</h3>
        <button class="music-player__close" @click="$emit('toggle-player')">
          <i class="fa fa-chevron-right"></i>
        </button>
      </div>
      
      <!-- 当前播放信息 -->
      <div class="music-player__current">
        <div class="current-song">
          <img :src="currentSong.cover" :alt="currentSong.title" class="current-song__cover">
          <div class="current-song__info">
            <h4 class="current-song__title">{{ currentSong.title }}</h4>
            <p class="current-song__artist">{{ currentSong.artist }}</p>
          </div>
        </div>
        
        <!-- 进度条 -->
        <div class="music-progress">
          <div class="music-progress__time">
            <span>{{ formatTime(currentTime) }}</span>
            <span>{{ formatTime(duration) }}</span>
          </div>
          <div class="music-progress__bar" @click="handleSeek">
            <div class="music-progress__fill" :style="{ width: progressPercent + '%' }"></div>
          </div>
        </div>
      </div>
      
      <!-- 播放控制 -->
      <div class="music-controls">
        <button class="music-controls__btn" @click="$emit('previous-song')">
          <i class="fa fa-step-backward"></i>
        </button>
        <button class="music-controls__btn music-controls__play" @click="onTogglePlay">
          <i class="fa" :class="isPlaying ? 'fa-pause' : 'fa-play'"></i>
        </button>
        <button class="music-controls__btn" @click="$emit('next-song')">
          <i class="fa fa-step-forward"></i>
        </button>
      </div>
      
      <!-- 播放列表 -->
      <div class="playlist">
        <h4 class="playlist__title">播放列表</h4>
        <div class="playlist__items">
          <div 
            v-for="(song, index) in playlist" 
            :key="index"
            class="playlist__item"
            :class="{ active: currentSongIndex === index }"
            @click="onPlaySong(index)"
          >
            <img :src="song.cover" :alt="song.title" class="playlist__item-cover">
            <div class="playlist__item-info">
              <p class="playlist__item-title">{{ song.title }}</p>
              <p class="playlist__item-artist">{{ song.artist }}</p>
            </div>
            <span class="playlist__item-duration">{{ song.duration }}</span>
          </div>
        </div>
      </div>
      
      <!-- 歌词 -->
      <div class="lyrics" v-if="showLyrics">
        <div class="lyrics__header">
          <h4 class="lyrics__title">歌词</h4>
          <button class="lyrics__close" @click="closeLyrics" title="关闭歌词">
            <i class="fa fa-times"></i>
          </button>
        </div>
        <div class="lyrics__container">
          <ul class="lyrics__list" :style="{ transform: `translateY(-${lyricsOffset}px)` }">
            <li v-for="(line, idx) in lyrics" :key="idx" :class="{ active: currentLyricIndex === idx }">
              {{ line.text }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  expanded: Boolean,
  currentSong: Object,
  isPlaying: Boolean,
  currentTime: Number,
  duration: Number,
  progressPercent: Number,
  playlist: Array,
  currentSongIndex: Number,
  lyrics: Array,
  currentLyricIndex: Number,
  lyricsOffset: Number
})

// 事件定义，赋值给 emit 变量
const emit = defineEmits([
  'toggle-player',
  'toggle-play',
  'play-song',
  'next-song',
  'previous-song',
  'seek-audio'
])

// 控制歌词显示
const showLyrics = ref(false)

// 当歌曲改变或播放开始时显示歌词
watch(() => props.currentSong, (val) => {
  // 切歌后默认不展示歌词，点击或播放才展示
  showLyrics.value = false
})

// 如果用户点击了播放并成功开始播放，父组件会传 isPlaying
watch(() => props.isPlaying, (v) => {
  if (v) {c
    showLyris.value = true
  }
})

// 监听播放器展开状态变化，添加动画
watch(() => props.expanded, (v) => {
  if (v) {
    gsap.from('.music-player__expanded', {
      y: 60,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out'
    })
  } else {
    gsap.to('.music-player__expanded', {
      y: 60,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        gsap.set('.music-player__expanded', { y: 0, opacity: 1 })
      }
    })
  }
})

// 格式化时间
const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return '0:00'
  
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

// 处理进度条点击
const handleSeek = (event) => {
  emit('seek-audio', event, undefined)
}

const onTogglePlay = () => {
  emit('toggle-play')
}

const onPlaySong = (index) => {
  emit('play-song', index)
  // 点击歌曲时也展示歌词
  showLyrics.value = true
}

onMounted(() => {
  // 歌词区关闭按钮弹入动画
  gsap.from('.lyrics__close', {
    scale: 0.5,
    opacity: 0,
    duration: 0.5,
    ease: 'back.out(1.7)'
  })
})

// 歌词区关闭时淡出动画
const closeLyrics = () => {
  gsap.to('.lyrics', {
    opacity: 0,
    y: -30,
    duration: 0.4,
    onComplete: () => {
      showLyrics.value = false
      gsap.set('.lyrics', { opacity: 1, y: 0 })
    }
  })
}
</script>

<style lang="less" scoped>
@import '../../styles/components/music-player.less';

// 覆盖歌词容器高度，避免过大
.lyrics__container {
  height: 140px;
  overflow: hidden;
}

.lyrics__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
  position: relative;
}
.lyrics__close {
  background: rgba(59,130,246,0.12);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4f8cff;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  z-index: 2;
}
.lyrics__close:hover {
  background: #4f8cff;
  color: #fff;
  box-shadow: 0 2px 8px rgba(79,140,255,0.15);
  transform: scale(1.15);
}
</style>