import request from "../utils/https";
export const getFundRank = (data) => {
  return request.post("/api/Login", data);
};
export const requestDynamicRouting = () => request.get("/api/getRouters");
export const requestGetUsers = () => request.get("/api/system/user/list");
// params;
export const requestIncrease = (data) =>
  request.post("/api/system/user/edit", data);
// 菜单管理
export const requestMenudata = () => request.get("/api/system/menu/list");
// 根据id看详情
export const requestSeedetails = () => {
  return request.get(`/api/system/menu/roleMenuTreeselect/1001`);
};
// export const requestSeedetails = () => {
//   return request.get(`/api/system/menu/2067`);
// };
//个人信息
export const requestPersonalCenter = () => {
  return request.get(`/api/system/user/profile`);
};
//修改个人信息
export const requestModifyinformation = (data) => {
  return request.put(`/api/system/user/profile`, data);
};

//vip
export const requestVIPmanagement = () => {
  return request.get(`/api/business/Concomitants/list`);
};
//身体部位
export const requestBodyparts = () => {
  return request.get(`/api/business/Bodyparts/list`);
};
//添加身体部位
export const requestAddbodyparts = (data) => {
  return request.post(`/api/business/Bodyparts`, data);
};
//删除身体部位
export const requestDeletebodyparts = (add) => {
  return request.delete(`/api/business/Bodyparts/${add}`);
};
//专家管理
export const requestExpertmanagement = () => {
  return request.get(`/api/business/Doctor/list`);
};
//添加专家

export const requestAddexperts = (data) => {
  return request.post("/api/business/Doctor", data);
};
