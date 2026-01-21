import { api } from "@/utils/http";

/**
 * 活动相关API
 */
export const activityApi = {
  // 获取活动类型
  getActivityTypes(type: string) {
    return api.get("/activities/types", {
      params: {
        type,
      },
    });
  },

  // 获取热门活动
  getPopularActivities() {
    return api.get("/activities/popular");
  },

  // 根据代码获取活动类型
  getActivityTypeByCode(code: string) {
    return api.get(`/activities/types/${code}`);
  },
};
