const Storage = {
  has: (key) => {
    return !!localStorage.getItem(key)
  },
  get: (key) => {
    return JSON.parse(localStorage.getItem(key))
  },
  set: (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value))
  },
  remove: (values) => {
    values?.forEach((value) => localStorage.removeItem(value))
  },
  clear: () => {
    return localStorage.clear()
  },
}

export default Storage
