import { request } from "@/utils";
import { dataitem } from "@/pages/Article";
//登录请求
export function getChannelAPI(){
   return request({
        url:'/channels',
        method:'GET',
    })
}
export function getArticleAPI(params: dataitem) {
  return request({
      url: '/mp/articles',
      method: 'GET',
      params
  })
}
export function delArticleAPI(id: string) {
  return request({
      url: `/mp/articles/${id}`,
      method: 'DELETE',
  })
}
export function getArticleIdAPI(id: string) {
  return request({
      url: `/mp/articles/${id}`,
      method: 'GET'
  })
}