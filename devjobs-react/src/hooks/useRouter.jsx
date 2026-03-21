import { useEffect, useState } from 'react'

export function useRouter(){
const [currentPath, setCurrentPath] = useState(window.location.pathname)

useEffect(() => {
    const handleLocationState = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', handleLocationState)

    return () => {
      window.removeEventListener('popstate', handleLocationState)
    }

  }, [])

  function navigateTo(path) {
    window.history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return{
    currentPath,
    navigateTo
  }
}