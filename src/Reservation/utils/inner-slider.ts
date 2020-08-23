export const getSwipeDirection = (touchObject: any) => {
  const xDist = touchObject.startX - touchObject.curX
  const yDist = touchObject.startY - touchObject.curY
  const r = Math.atan2(yDist, xDist)
  let swipeAngle = Math.round((r * 180) / Math.PI)
  if (swipeAngle < 0) {
    swipeAngle = 360 - Math.abs(swipeAngle)
  }
  if ((swipeAngle <= 45 && swipeAngle >= 0) || (swipeAngle <= 360 && swipeAngle >= 315)) {
    return 'left'
  }
  if (swipeAngle >= 135 && swipeAngle <= 225) {
    return 'right'
  }

  return 'vertical'
}

export const swipeStart = (e: any): { dragging: boolean; touchObject: any } => {
  return {
    dragging: true,
    touchObject: {
      startX: e.touches ? e.touches[0].pageX : e.clientX,
      startY: e.touches ? e.touches[0].pageY : e.clientY,
      curX: e.touches ? e.touches[0].pageX : e.clientX,
      curY: e.touches ? e.touches[0].pageY : e.clientY,
    },
  }
}

export const swipeMove = <T extends {}>(e: any, spec: any): Partial<T> | undefined => {
  // spec also contains, trackRef and slideIndex
  const { animating, touchObject, scrolling } = spec
  if (scrolling) return
  if (animating) return e.preventDefault()
  let state: any = {}
  touchObject.curX = e.touches ? e.touches[0].pageX : e.clientX
  touchObject.curY = e.touches ? e.touches[0].pageY : e.clientY
  touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(touchObject.curX - touchObject.startX, 2)))

  const positionOffset = touchObject.curX > touchObject.startX ? 1 : -1
  const touchSwipeLength = touchObject.swipeLength

  const swipeLeft = touchSwipeLength * positionOffset

  state = {
    ...state,
    touchObject,
    swipeLeft,
  }
  if (Math.abs(touchObject.curX - touchObject.startX) < Math.abs(touchObject.curY - touchObject.startY) * 0.8) {
    return state
  }

  if (touchObject.swipeLength > 10) {
    state['swiping'] = true
  }

  return state
}

export const swipeEnd = <T extends {}>(e: any, spec: any): Partial<T> => {
  const { dragging, touchObject, touchThreshold, onSwipe } = spec
  if (!dragging) {
    e.preventDefault()
    return {}
  }

  const minSwipe = touchThreshold
  const swipeDirection = getSwipeDirection(touchObject)

  // reset the state of touch related state variables.
  const state: any = {
    dragging: false,
    swiping: false,
    swiped: false,
    swipeLeft: null,
    touchObject: {},
  }

  if (!touchObject.swipeLength) {
    return state
  }

  if (touchObject.swipeLength > minSwipe && onSwipe) {
    onSwipe(swipeDirection)
  }
  return state
}
