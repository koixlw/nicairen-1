import { api } from '../utils/http'

/**
 * 新闻相关API
 */

// 获取所有新闻列表
export const getAllNews = () => {
  return api.get('/news/all')
}

// 分页查询新闻
export const getNewsByPage = (params: any) => {
  return api.get('/news', { params })
}

// 根据ID获取新闻基本信息
export const getNewsById = (id: string) => {
  return api.get(`/news/${id}`)
}

// 根据ID获取新闻完整详细信息
export const getNewsDetailById = (id: string) => {
  return api.get(`/news/${id}/detail`)
}

// 根据分类获取新闻列表
export const getNewsByCategory = (category: string, params: any) => {
  return api.get(`/news/category/${category}`, { params })
}

// 获取热门新闻
export const getHotNews = (limit = 5) => {
  return api.get('/news/hot', { params: { limit } })
}

// 获取最新新闻
export const getLatestNews = (limit = 5) => {
  return api.get('/news/latest', { params: { limit } })
}

// 点赞新闻
export const likeNews = (id: string) => {
  return api.put(`/news/${id}/like`, {})
}

export default {
  getAllNews,
  getNewsByPage,
  getNewsById,
  getNewsDetailById,
  getNewsByCategory,
  getHotNews,
  getLatestNews,
  likeNews
}
