import { computed, toRefs } from 'vue'

export default function (instance: any, props: any): any {
  const { to, replace, target, append } = toRefs(props)

  const router = instance?.appContext.config.globalProperties.$router

  const linkUrl = computed(() => {
    const type = typeof to?.value
    if (type !== 'string') {
      return null
    }
    if ((to?.value as string).includes('//')) {
      /* Absolute URL, we do not need to route this */
      return to?.value
    }

    if (router) {
      const current = router.currentRoute
      const route = router.resolve(to?.value, current, append.value)
      return route ? route.href : to?.value
    }
    return to?.value
  })

  const handleClick = (newWindow = false) => {
    if (newWindow) {
      let toOpen = to?.value

      if (router) {
        const current = router.currentRoute
        const route = router.resolve(to?.value, current, append.value)
        toOpen = route ? route.href : to?.value
      }
      window.open(toOpen as string)
    } else {
      if (router) {
        if ((typeof to?.value === 'string') && to.value.includes('//')) {
          window.location.href = to.value
        } else {
          replace.value ? router.replace(to?.value) : router.push(to?.value)
        }
      } else {
        window.location.href = to?.value as string
      }
    }
  }

  const handleCheckClick = (event: any, newWindow = false) => {
    if (to?.value) {
      if (target.value === '_blank') {
        return false
      } else {
        event.preventDefault()
        handleClick(newWindow)
      }
    }
  }

  return {
    linkUrl,
    handleClick,
    handleCheckClick
  }
}
