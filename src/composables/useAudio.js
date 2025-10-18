import { ref, computed, watch } from 'vue'
import { playlistData } from '../data/playlist'

export function useAudio() {
  // 音频状态
  const isPlaying = ref(false)
  const currentSongIndex = ref(0)
  const currentTime = ref(0)
  const duration = ref(0)
  const playlist = ref(playlistData)
  const lyrics = ref([])
  const currentLyricIndex = ref(0)
  const audioElement = ref(null)
  
  // 辅助：根据扩展名判断浏览器是否支持
  const mimeMap = {
    mp3: 'audio/mpeg',
    m4a: 'audio/mp4',
    mp4: 'audio/mp4',
    ogg: 'audio/ogg',
    wav: 'audio/wav',
    flac: 'audio/flac'
  }

  const getFirstPlayableIndex = () => {
    if (typeof document === 'undefined') return 0
    const testAudio = document.createElement('audio')
    for (let i = 0; i < playlist.value.length; i++) {
      const src = playlist.value[i].src || ''
      const ext = src.split('.').pop().toLowerCase()
      const mime = mimeMap[ext]
      if (mime && testAudio.canPlayType(mime)) {
        return i
      }
    }
    return 0
  }

  // 如果默认第一首不可播放，则切换到第一个可播放的索引
  currentSongIndex.value = getFirstPlayableIndex()

  // 当前播放的歌曲
  const currentSong = computed(() => {
    return playlist.value[currentSongIndex.value] || playlist.value[0]
  })
  
  // 播放进度百分比
  const progressPercent = computed(() => {
    if (duration.value === 0) return 0
    return (currentTime.value / duration.value) * 100
  })
  
  // 歌词偏移量
  const lyricsOffset = computed(() => {
    const liHeight = 30
    return currentLyricIndex.value * liHeight - 150
  })
  
  // 播放/暂停
  const togglePlay = async () => {
    if (!audioElement.value) return
    
    if (isPlaying.value) {
      audioElement.value.pause()
      isPlaying.value = false
    } else {
      try {
        const playPromise = audioElement.value.play()
        // 有些浏览器返回 promise
        if (playPromise !== undefined) {
          await playPromise
        }
        isPlaying.value = true
      } catch (err) {
        console.warn('播放失败：', err)
        isPlaying.value = false
      }
    }
  }
  
  // 播放指定歌曲（只允许可播放的音频）
  const playSong = (index) => {
    if (index < 0 || index >= playlist.value.length) return
    // 跳过不支持的格式
    let tryIndex = index
    let tryCount = 0
    while (!isSrcPlayable(playlist.value[tryIndex].src) && tryCount < playlist.value.length) {
      tryIndex = (tryIndex + 1) % playlist.value.length
      tryCount++
    }
    currentSongIndex.value = tryIndex
    parseLyrics(playlist.value[tryIndex].lyrics)
    if (audioElement.value) {
      audioElement.value.src = playlist.value[tryIndex].src
    }
    isPlaying.value = true
    setTimeout(() => {
      if (audioElement.value) {
        audioElement.value.play().catch(err => {
          console.warn('播放失败:', err)
        })
      }
    }, 100)
  }
  
  // 下一首（只允许可播放的音频）
  const nextSong = () => {
    let nextIdx = (currentSongIndex.value + 1) % playlist.value.length
    playSong(nextIdx)
  }
  
  // 上一首（只允许可播放的音频）
  const previousSong = () => {
    let prevIdx = (currentSongIndex.value - 1 + playlist.value.length) % playlist.value.length
    playSong(prevIdx)
  }
  
  // 格式化时间
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }
  
  // 解析歌词
  const parseLyrics = (lrcText) => {
    if (!lrcText) {
      lyrics.value = []
      return
    }
    
    const lines = lrcText.split('\n')
    const result = []
    
    for (let i = 0; i < lines.length; i++) {
      const str = lines[i]
      const parts = str.split(']')
      
      if (parts.length < 2) continue
      
      const timeStr = parts[0].substring(1)
      const content = parts[1]
      
      // 跳过空行
      if (!content.trim()) continue
      
      const obj = {
        time: parseTime(timeStr),
        content: content
      }
      
      result.push(obj)
    }
    
    lyrics.value = result
  }
  
  // 解析时间字符串
  const parseTime = (timeStr) => {
    const parts = timeStr.split(":")
    return +parts[0] * 60 + +parts[1]
  }
  
  // 查找当前歌词索引
  const findLyricIndex = () => {
    for (let i = 0; i < lyrics.value.length; i++) {
      if (currentTime.value < lyrics.value[i].time) {
        return i - 1
      }
    }
    return lyrics.value.length - 1
  }
  
  // 音频进度跳转
  const seekAudio = (event, durationValue) => {
    if (!audioElement.value) return
    
    const progressBar = event.currentTarget
    const clickPosition = event.offsetX
    const progressBarWidth = progressBar.clientWidth
    const percent = clickPosition / progressBarWidth
    
    audioElement.value.currentTime = percent * (durationValue || duration.value)
  }
  
  // 检查某个 src 是否可播放
  const isSrcPlayable = (src) => {
    if (!src || typeof document === 'undefined') return false
    const testAudio = document.createElement('audio')
    const ext = src.split('.').pop().toLowerCase()
    const mime = mimeMap[ext]
    return mime ? !!testAudio.canPlayType(mime) : false
  }
  
  // 初始化音频元素
  const initAudio = () => {
    audioElement.value = new Audio()
    
    // 音频加载完成
    audioElement.value.addEventListener('loadedmetadata', () => {
      duration.value = audioElement.value.duration
    })
    
    // 时间更新
    audioElement.value.addEventListener('timeupdate', () => {
      currentTime.value = audioElement.value.currentTime
      currentLyricIndex.value = findLyricIndex()
    })
    
    // 音频结束
    audioElement.value.addEventListener('ended', () => {
      nextSong()
    })
    
    // 初始加载第一个可播放的音频
    if (playlist.value.length > 0) {
      const idx = getFirstPlayableIndex()
      currentSongIndex.value = idx
      audioElement.value.src = playlist.value[idx].src
      parseLyrics(playlist.value[idx].lyrics)
    }
  }
  
  // 初始化音频
  initAudio()
  
  // 监听当前歌曲变化
  watch(currentSongIndex, async () => {
    if (audioElement.value && playlist.value[currentSongIndex.value]) {
      const src = playlist.value[currentSongIndex.value].src
      if (isSrcPlayable(src)) {
        audioElement.value.src = src
        if (isPlaying.value) {
          try {
            await audioElement.value.play()
          } catch (err) {
            console.warn('自动播放失败：', err)
            isPlaying.value = false
          }
        }
      } else {
        // 自动跳到下一个可播放的
        nextSong()
      }
    }
  })
  
  return {
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
    seekAudio,
    formatTime
  }
}