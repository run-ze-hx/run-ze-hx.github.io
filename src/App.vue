<template>
  <div id="app" >
    <!-- Three.js 3D场景容器 -->
    <div id="canvas-container" class="canvas-container"></div>
    
    <!-- 布局组件 -->
    <Header :scrolled="isNavbarScrolled" />
    
    <!-- 主要内容 -->
    <main class="main-content">
      <Home />
    </main>
    
    <!-- 页脚 -->
    <Footer />
    
    <!-- 音乐播放器 -->
    <MusicPlayer
      :expanded="musicPlayerExpanded"
      :current-song="currentSong"
      :is-playing="isPlaying"
      :current-time="currentTime"
      :duration="duration"
      :progress-percent="progressPercent"
      :playlist="playlist"
      :current-song-index="currentSongIndex"
      :lyrics="lyrics"
      :current-lyric-index="currentLyricIndex"
      :lyrics-offset="lyricsOffset"
      @toggle-player="toggleMusicPlayer"
      @toggle-play="togglePlay"
      @play-song="playSong"
      @next-song="nextSong"
      @previous-song="previousSong"
      @seek-audio="seekAudio"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import Home from './views/Home.vue'
import MusicPlayer from './components/music/MusicPlayer.vue'
import { useAudio } from './composables/useAudio'
import { useThreeScene } from './composables/useThreeScene'

// 导航栏状态
const isNavbarScrolled = ref(false)

// 音乐播放器状态
const musicPlayerExpanded = ref(false)

// 使用音频组合式函数
const {
  isPlaying,
  currentSongIndex,
  currentTime,
  duration,
  playlist,
  currentSong,
  progressPercent,
  lyrics,
  currentLyricIndex,
  lyricsOffset,
  togglePlay,
  playSong,
  nextSong,
  previousSong,
  seekAudio
} = useAudio()

// 导航栏滚动效果
const handleScroll = () => {
  isNavbarScrolled.value = window.scrollY > 50
}

// 切换音乐播放器展开状态
const toggleMusicPlayer = () => {
  musicPlayerExpanded.value = !musicPlayerExpanded.value
}

// 初始化Three.js场景
const { initBackgroundScene } = useThreeScene()

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  initBackgroundScene()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="less">
.canvas-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.3;
}

.main-content {
  position: relative;
  z-index: 10;
  padding-top: 80px; /* 为固定导航栏留出空间 */
}
</style>
