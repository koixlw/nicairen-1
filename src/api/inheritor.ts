import { api } from "../utils/http";

/**
 * 传承人相关API
 */

// 获取所有传承人列表
export const getAllInheritors = () => {
  return api.get("/inheritors");
};

// 分页查询传承人
export const getInheritorsByPage = (params: any) => {
  return api.get("/inheritors/page", { params });
};

// 根据ID获取传承人基本信息
export const getInheritorById = (id: string) => {
  return api.get(`/inheritors/${id}`);
};

// 根据ID获取传承人完整详细信息（新接口）
export const getInheritorDetailById = (id: string) => {
  return api.get(`/inheritors/${id}/detail`);
};

// 根据级别获取传承人列表
export const getInheritorsByLevel = (level: string) => {
  return api.get(`/inheritors/level/${level}`);
};

// 根据地区获取传承人列表
export const getInheritorsByRegion = (region: string) => {
  return api.get(`/inheritors/region/${region}`);
};

// 根据关键词搜索传承人
export const searchInheritors = (keyword: string) => {
  return api.get("/inheritors/search", { params: { keyword } });
};

// 综合查询传承人
export const queryInheritors = (queryDTO: any) => {
  return api.post("/inheritors/query", queryDTO);
};
