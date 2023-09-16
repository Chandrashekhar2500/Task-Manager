import { default as cookie } from "js-cookie"

export const setCookie = (key, name) => {
  cookie.set(key, name)
}

export const getCookie = (key) => {
  return cookie.get(key)
}

export const clearCookie = () => {
  cookie.remove('token')
  cookie.remove('uuid')
  cookie.remove('path')
}

