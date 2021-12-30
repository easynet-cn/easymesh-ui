/* eslint-disable @typescript-eslint/no-empty-function */
// scrollTop animation
export const scrollTop = function (el: Element|Window, from = 0, to: number, duration = 500, endCallback?: Function): void {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
            function (callback) {
              return window.setTimeout(callback, 1000 / 60)
            }
    )
  }

  const difference = Math.abs(from - to)
  const step = Math.ceil(difference / duration * 50)

  function scroll (start: number, end: number, step: number) {
    if (start === end) {
      endCallback && endCallback()
      return
    }

    let d = (start + step > end) ? end : start + step
    if (start > end) {
      d = (start - step < end) ? end : start - step
    }

    if (el === window) {
      window.scrollTo(d, d)
    } else if (el instanceof Element) {
      el.scrollTop = d
    }
    window.requestAnimationFrame(() => scroll(d, end, step))
  }

  scroll(from, to, step)
}

// Find components downward
export const findComponentsDownward = (context: any, componentName: string) => {
  return context.ctx.$children.reduce((components: any, child: any) => {
    if (child.$options.name === componentName) components.push(child)
    const foundChilds = findComponentsDownward(child, componentName)
    return components.concat(foundChilds)
  }, [])
}

// Find components upward
export const findComponentUpward = (context: any, componentName: string, componentNames?: any) => {
  if (typeof componentName === 'string') {
    componentNames = [componentName]
  } else {
    componentNames = componentName
  }

  let parent = context.ctx.$parent
  let name = parent.$options.name
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent
    if (parent) name = parent.$options.name
  }
  return parent
}

// Find component downward
export const findComponentDownward = (context: any, componentName: string): any => {
  const childrens = context.ctx.$slots.default()
  let children = null

  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name
      if (name === componentName) {
        children = child
        break
      } else {
        children = findComponentDownward(child, componentName)
        if (children) break
      }
    }
  }
  return children
}

// Find brothers components
export const findBrothersComponents = (context: any, componentName: string, exceptMe = true) => {
  const res = context.ctx.$parent.$slots.default().filter((item: any) => {
    return item.$options.name === componentName
  })
  const index = res.findIndex((item: any) => item._uid === context.ctx._uid)
  if (exceptMe) res.splice(index, 1)
  return res
}

export const dimensionMap = {
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px'
}

export function setMatchMedia () {
  if (typeof window !== 'undefined') {
    const matchMediaPolyfill = (mediaQuery: any) => {
      return {
        media: mediaQuery,
        matches: false,
        on () {},
        off () {}
      }
    }
    window.matchMedia = window.matchMedia || matchMediaPolyfill
  }
}
