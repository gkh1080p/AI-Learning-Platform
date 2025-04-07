// utils/http.js
import service from './request'

const http = {
  get(url:any, params = {}, config = {}) {
    return service.get(url, {
      params,
      ...config
    })
  },

  post(url:any, data = {}, config = {}) {
    return service.post(url, data, {
      ...config
    })
  },

  delete(url:any, params = {}, config = {}) {
    return service.delete(url, {
      params,
      ...config
    })
  },

  put(url:any, data = {}, config = {}) {
    return service.put(url, data, {
      ...config
    })
  }
}

export default http
