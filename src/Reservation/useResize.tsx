import { useState, useEffect, useCallback } from 'react'
import ResizeObserver from 'resize-observer-polyfill'
import { get } from 'lodash'

const useResize = (): [(instance: HTMLDivElement | null) => void, number] => {
  const [width, setWidth] = useState(0)
  const config = { attributes: false, childList: true, subtree: true }
  let current: HTMLElement | undefined

  const resizeHandler = useCallback(() => {
    const nWidth = get(current, 'clientWidth', 0)

    if (nWidth !== width) {
      setWidth(nWidth)
    }
  }, [current, width])

  const [mutObserver] = useState(
    typeof MutationObserver !== 'undefined' ? new MutationObserver(resizeHandler) : undefined
  )
  const [resizeObserver] = useState(() => new ResizeObserver(resizeHandler))

  const ref = useCallback(
    (node) => {
      current = node
      mutObserver?.disconnect()
      resizeObserver.disconnect()
      if (current) {
        mutObserver?.observe(current, config)
        resizeObserver.observe(current)
      }
    },
    [resizeObserver]
  )

  useEffect(() => {
    resizeHandler()
  }, [])

  return [ref, width]
}

export default useResize
