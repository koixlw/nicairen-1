import { api } from "@/utils/http";

/**
 * 预约相关API
 */
export const reserveApi = {
  // 创建预约
  createReservation(data: any) {
    return api.post("/reservations", {
      data,
    });
  },

  // 根据手机号查询预约
  getReservationsByPhone(phone: string) {
    return api.get(`/reservations/phone/${phone}`);
  },

  // 根据预约编号查询预约
  getReservationByNumber(reservationNumber: string) {
    return api.get(`/reservations/number/${reservationNumber}`);
  },

  // 获取可用时间段
  getAvailableTimeSlots(date: string) {
    return api.get(`/reservations/time-slots?date=${date}`);
  },

  // 验证预约时间
  validateReservationTime(date: string, timeSlotId: string) {
    return api.get(
      `/reservations/validate-time?date=${date}&timeSlotId=${timeSlotId}`
    );
  },

  // 取消预约
  cancelReservation(id: string, reason: string) {
    return api.put(`/reservations/${id}/cancel`, null, {
      params: { reason },
    });
  },
};
