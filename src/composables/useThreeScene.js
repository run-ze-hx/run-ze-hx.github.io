import * as THREE from 'three'
import { gsap } from 'gsap'

export function useThreeScene() {
  // 嵌套多面体+大量粒子
  const initBackgroundScene = (containerIdOrEl = 'canvas-container') => {
    const container = typeof containerIdOrEl === 'string' ? document.getElementById(containerIdOrEl) : containerIdOrEl
    if (!container) return
    container.innerHTML = ''
    // 场景
    const scene = new THREE.Scene()
    // 相机
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 12
    // 渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)
    // 光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)
    // 小蓝色空心多面体（十二面体线框）
    const blueGeometry = new THREE.IcosahedronGeometry(2.5, 0)
    const blueMaterial = new THREE.LineBasicMaterial({ color: 0x4f8cff, linewidth: 2 })
    const blueWireframe = new THREE.LineSegments(
      new THREE.WireframeGeometry(blueGeometry),
      blueMaterial
    )
    scene.add(blueWireframe)
    // 大白色空心多面体（十二面体线框）
    const whiteGeometry = new THREE.IcosahedronGeometry(5.5, 0)
    const whiteMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 })
    const whiteWireframe = new THREE.LineSegments(
      new THREE.WireframeGeometry(whiteGeometry),
      whiteMaterial
    )
    scene.add(whiteWireframe)
    // 紫色小粒子
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 600
    const posArray = new Float32Array(particlesCount * 3)
    for (let i = 0; i < particlesCount; i++) {
      // 分布在更大的球壳上
      const phi = Math.acos(2 * Math.random() - 1)
      const theta = 2 * Math.PI * Math.random()
      const r = 7.5 + Math.random() * 2.5
      posArray[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      posArray[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      posArray[i * 3 + 2] = r * Math.cos(phi)
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.08,
      color: 0xb388ff,
      transparent: true,
      opacity: 0.7
    })
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)
    // 响应窗口变化
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', handleResize)
    // 鼠标拖拽事件
    let isDragging = false
    let lastX = 0, lastY = 0
    let targetRotation = { x: 0, y: 0 }
    const onPointerDown = (e) => {
      isDragging = true
      lastX = e.clientX
      lastY = e.clientY
    }
    const onPointerUp = () => {
      isDragging = false
    }
    const onPointerMove = (e) => {
      if (!isDragging) return
      const dx = (e.clientX - lastX) * 0.01
      const dy = (e.clientY - lastY) * 0.01
      lastX = e.clientX
      lastY = e.clientY
      targetRotation.x += dy
      targetRotation.y += dx
      // 用 gsap 缓动旋转
      gsap.to(blueWireframe.rotation, { x: targetRotation.x, y: targetRotation.y, duration: 0.5, overwrite: true })
      gsap.to(whiteWireframe.rotation, { x: targetRotation.x * 0.5, y: targetRotation.y * 0.5, duration: 0.7, overwrite: true })
      gsap.to(particlesMesh.rotation, { y: targetRotation.y * 0.3, duration: 0.8, overwrite: true })
    }
    renderer.domElement.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointermove', onPointerMove)
    // 动画
    let t = 0
    let stop = false
    const animate = () => {
      if (stop) return
      requestAnimationFrame(animate)
      // 小蓝色多面体旋转快
      blueWireframe.rotation.x += 0.012
      blueWireframe.rotation.y += 0.018
      // 大白色多面体旋转慢
      whiteWireframe.rotation.x += 0.003
      whiteWireframe.rotation.y += 0.004
      // 粒子整体缓慢旋转+个别粒子轻微漂浮
      t += 0.005
      const positions = particlesGeometry.attributes.position
      for (let i = 0; i < particlesCount; i++) {
        const base = i * 3
        positions.array[base + 0] += Math.sin(t + i) * 0.002
        positions.array[base + 1] += Math.cos(t + i * 1.2) * 0.002
      }
      positions.needsUpdate = true
      particlesMesh.rotation.y += 0.0015
      renderer.render(scene, camera)
    }
    animate()
    // 清理
    return () => {
      stop = true
      window.removeEventListener('resize', handleResize)
      renderer.domElement.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointermove', onPointerMove)
      if (container && renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      blueGeometry.dispose()
      blueMaterial.dispose()
      whiteGeometry.dispose()
      whiteMaterial.dispose()
      renderer.dispose()
    }
  }
  return {
    initBackgroundScene
  }
}