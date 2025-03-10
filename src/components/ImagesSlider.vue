<template>
  <div class="slider-container" ref="sliderContainer">
    <div class="swiper-wrapper" ref="sliderTrack">
      <div v-for="(image, imgIndex) in props.images" :key="`${itemId}-${imgIndex}`" class="swiper-slide">
        <img :src="image" alt="Product Image" />
      </div>
    </div>
    <div class="slider-control prev" @click="goToPreviousSlide">&#10094;</div>
    <div class="slider-control next" @click="goToNextSlide">&#10095;</div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue'

/*------------------- PROPS -------------------*/
const props = defineProps({
  images: Array,
  itemId: Number,
  containerHeight: {
    type: String,
    default: '150px',
  },
})

/*------------------- DATA -------------------*/
const slides = ref([])
const sliderTrack = ref(null)
const sliderContainer = ref(null)
const totalImages = ref(0)
const currentIndex = ref(0)
const parameterIndex = ref(0)
const highestIndexReached = ref(0)
const isTransitioning = ref(false)
const currentTranslate = ref(0)
const startX = ref(0)
const isDragging = ref(false)
const touchStartTime = ref(0)
const swipeDuration = ref(0)

/*------------------- FUNCTION -------------------*/
const updateSliderPosition = () => {
  if (sliderTrack.value) {
    sliderTrack.value.style.transition = 'transform 0.5s ease-in-out'
    sliderTrack.value.style.transform = `translateX(${-currentIndex.value * 100}%)`
    currentTranslate.value = -currentIndex.value * 100
  }
}

const prepareBeforeElement = () => {
  if (currentIndex.value === 0 && sliderTrack.value) {
    const fragment = document.createDocumentFragment()
    slides.value.forEach((slide) => {
      fragment.appendChild(slide.cloneNode(true))
    })
    sliderTrack.value.insertBefore(fragment, sliderTrack.value.firstChild)
    sliderTrack.value.style.transition = 'none'
    sliderTrack.value.style.transform = `translateX(${-totalImages.value * 100}%)`
    currentIndex.value = totalImages.value
    currentTranslate.value = -totalImages.value * 100
  }
}

const prepareAfterElement = () => {
  if (highestIndexReached.value === currentIndex.value && sliderTrack.value) {
    const fragment = document.createDocumentFragment()
    slides.value.forEach((slide) => {
      fragment.appendChild(slide.cloneNode(true))
    })
    sliderTrack.value.appendChild(fragment)
    highestIndexReached.value += totalImages.value
  }
}

const goToNextSlide = async (e) => {
  e?.stopPropagation()
  if (isTransitioning.value) return
  isTransitioning.value = true
  parameterIndex.value++
  currentIndex.value++
  updateSliderPosition()
  isTransitioning.value = false
  setTimeout(() => {
    prepareAfterElement()
  }, 500)
}

const goToPreviousSlide = async (e) => {
  e?.stopPropagation()
  if (isTransitioning.value) return
  isTransitioning.value = true
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
  parameterIndex.value--
  updateSliderPosition()
  isTransitioning.value = false
  setTimeout(() => {
    prepareBeforeElement()
  }, 500)
}

const startSwipe = (event) => {
  isDragging.value = true
  startX.value = getPositionX(event)
  touchStartTime.value = Date.now()
  if (sliderTrack.value) sliderTrack.value.style.transition = 'none'
  event.stopPropagation()
  event.preventDefault()
}

const moveSwipe = (event) => {
  if (!isDragging.value || !sliderTrack.value) return
  const currentX = getPositionX(event)
  const diffX = currentX - startX.value
  sliderTrack.value.style.transform = `translateX(calc(${currentTranslate.value}% + ${diffX}px))`
}

const endSwipe = (event) => {
  if (!isDragging.value) return
  isDragging.value = false
  const endX = getPositionX(event)
  if (!endX) return
  const movedBy = endX - startX.value
  const swiperOffset = sliderTrack.value.offsetWidth
  const movingPercentage = (movedBy * 100) / swiperOffset

  swipeDuration.value = Date.now() - touchStartTime.value

  if (movingPercentage < -40) {
    goToNextSlide()
  } else if (movingPercentage > 40) {
    goToPreviousSlide()
  } else {
    updateSliderPosition()
  }
}

const getPositionX = (event) => {
  if (event.type.startsWith('mouse')) {
    return event.pageX || 0
  } else if (
    event.type.startsWith('touch') &&
    event.changedTouches &&
    event.changedTouches.length > 0
  ) {
    return event.changedTouches[0].clientX || 0
  }
  return 0
}

/*------------------- LIFE CYCLE HOOKS -------------------*/
onMounted(() => {
  slides.value = Array.from(sliderContainer.value.querySelectorAll('.swiper-slide'))
  totalImages.value = slides.value.length
  highestIndexReached.value = totalImages.value
  prepareBeforeElement()
  prepareAfterElement()
  nextTick(() => {
    if (sliderTrack.value) {
      sliderTrack.value.addEventListener('touchstart', startSwipe)
      sliderTrack.value.addEventListener('mousedown', startSwipe)
      sliderTrack.value.addEventListener('touchmove', moveSwipe)
      sliderTrack.value.addEventListener('mousemove', moveSwipe)
      sliderTrack.value.addEventListener('touchend', endSwipe)
      sliderTrack.value.addEventListener('mouseup', endSwipe)
      sliderTrack.value.addEventListener('mouseleave', endSwipe)
    }
  })
})

/*------------------- EXPOSES -------------------*/
defineExpose({ swipeDuration })
</script>

<style scoped>
.slider-container {
  position: relative;
  width: 100%;
  height: v-bind(containerHeight);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.swiper-wrapper {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.swiper-slide {
  min-width: 100%;
  cursor: pointer;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slider-control {
  height: 40px;
  display: flex;
  aspect-ratio: 1/1;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.3);
  color: white;
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;
  user-select: none;
  transition: all 0.1s ease-in-out;
}

.slider-control:hover {
  background: rgba(0, 0, 0, 0.4);
}

.slider-control.prev {
  left: 10px;
}

.slider-control.next {
  right: 10px;
}
</style>
