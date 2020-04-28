// https://www.youtube.com/watch?v=BAf0uhKVHBk
import { useEffect, useState } from 'react'

export const useLocalState = (key, defaultValue) => {
  if (typeof window.fathom === 'undefined') return
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key)
    return storedValue === null
      ? defaultValue
      : JSON.parse(storedValue)
  })

  useEffect(() => {
    const listener = e => {
      if (e.storedArea === localStorage && e.key === key) {
        setValue(JSON.parse(e.newValue))
      }
    }
    window.addEventListener('storage', listener)

    return () => {
      window.removeEventListener('storage', listener)
    }
  }, [key])

  const setValueInLocalStorage = newValue => {
    setValue(currentValue => {
      const result =
        typeof newValue === 'function'
          ? newValue(currentValue)
          : newValue
      localStorage.setItem(key, JSON.stringify(result))
      return result
    })
  }

  return [value, setValueInLocalStorage]
}
