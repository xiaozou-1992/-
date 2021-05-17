import fetch from '@/utils/fetch'

// 获取用户分页列表
export function GetUserPageList(data = {}) {
	return fetch({
		url: '/api/User/GetPageList',
		method: 'POST',
		data
	})
}

// 获取所有用户
export function GetUserAllList(data = {}) {
	return fetch({
		url: '/api/User/GetAllList',
		method: 'POST',
		data
	})
}

// 同步用户/教师/学生
export function SynchronizationUser(data = {}) {
	return fetch({
		url: '/api/User/Synchronization',
		method: 'POST',
		data
	})
}

// 添加管理员
export function DoAddAdminUser(data = {}) {
	return fetch({
		url: '/api/User/DoAddAdmin',
		method: 'POST',
		data
	})
}

// 删除管理员
export function DoDeleteAdminUser(data = {}) {
	return fetch({
		url: '/api/User/DoDeleteAdmin',
		method: 'POST',
		data
	})
}


// 获取管理员分页列表
export function GetAdminUserPageList(data = {}) {
	return fetch({
		url: '/api/User/GetAdminPageList',
		method: 'POST',
		data
	})
}

// 新增用户角色
export function DoUpdateAdminUserRole(data = {}) {
	return fetch({
		url: '/api/User/DoUpdateAdminUserRole',
		method: 'POST',
		data
	})
}

// 获取管理员角色列表
export function GetAdminRoleList(data = {}) {
	return fetch({
		url: '/api/User/GetAdminRoleList',
		method: 'POST',
		data
	})
}

// 获取角色分页列表
export function GetRolePageList(data = {}) {
	return fetch({
		url: '/api/Role/GetPageList',
		method: 'POST',
		data
	})
}

// 获取所有角色列表
export function GetRoleAllList(data = {}) {
	return fetch({
		url: '/api/Role/GetAllList',
		method: 'POST',
		data
	})
}

// 新增角色
export function DoAddRole(data = {}) {
	return fetch({
		url: '/api/Role/DoAdd',
		method: 'POST',
		data
	})
}

// 修改角色
export function DoUpdateRole(data = {}) {
	return fetch({
		url: '/api/Role/DoUpdate',
		method: 'POST',
		data
	})
}

// 删除角色
export function DoDeleteRole(data = {}) {
	return fetch({
		url: '/api/Role/DoDelete',
		method: 'POST',
		data
	})
}

// 添加权限到角色
export function DoUpdateAutorityRole(data = {}) {
	return fetch({
		url: '/api/Role/DoUpdateAutority',
		method: 'POST',
		data
	})
}

// 获取部门分页列表
export function GetDepartPageList(data = {}) {
	return fetch({
		url: '/api/Depart/GetPageList',
		method: 'POST',
		data
	})
}

// 获取部门所有列表
export function GetDepartAllList(data = {}) {
	return fetch({
		url: '/api/Depart/GetAllList',
		method: 'POST',
		data
	})
}

// 同步部门
export function SynchronizationDepart(data = {}) {
	return fetch({
		url: '/api/Depart/Synchronization',
		method: 'POST',
		data
	})
}

// 获取学院审批人列表
export function GetDepartChargerPageList(data = {}) {
	return fetch({
		url: '/api/Depart/GetChargerPageList',
		method: 'POST',
		data
	})
}

// 添加学院审批人
export function DoAddDepartCharger(data = {}) {
	return fetch({
		url: '/api/Depart/DoAddCharger',
		method: 'POST',
		data
	})
}

// 删除部门审批人
export function DeleteDepartCharger(data = {}) {
	return fetch({
		url: '/api/Depart/DeleteDepartCharger',
		method: 'POST',
		data
	})
}

// 获取教学楼分页列表
export function GetBuildingPageList(data = {}) {
	return fetch({
		url: '/api/Building/GetPageList',
		method: 'POST',
		data
	})
}

// 获取教学楼所有列表
export function GetAllBuildingList(data = {}) {
	return fetch({
		url: '/api/Building/GetAllList',
		method: 'POST',
		data
	})
}

// 同步教学楼
export function SynchronizationBuilding(data = {}) {
	return fetch({
		url: '/api/Building/Synchronization',
		method: 'POST',
		data
	})
}

// 获取校区分页列表
export function GetSchoolPageList(data = {}) {
	return fetch({
		url: '/api/School/GetPageList',
		method: 'POST',
		data
	})
}

// 获取校区所有列表
export function GetAllSchoolList(data = {}) {
	return fetch({
		url: '/api/School/GetAllList',
		method: 'POST',
		data
	})
}

// 同步校区
export function SynchronizationSchool(data = {}) {
	return fetch({
		url: '/api/School/Synchronization',
		method: 'POST',
		data
	})
}

// 获取教学楼分页列表
export function GetClassRoomPageList(data = {}) {
	return fetch({
		url: '/api/ClassRoom/GetPageList',
		method: 'POST',
		data
	})
}

// 获取教学楼所有列表
export function GetAllClassRoomList(data = {}) {
	return fetch({
		url: '/api/ClassRoom/GetAllList',
		method: 'POST',
		data
	})
}

// 同步校区
export function SynchronizationClassRoom(data = {}) {
	return fetch({
		url: '/api/ClassRoom/Synchronization',
		method: 'POST',
		data
	})
}

// 获取教学楼教室禁用分页列表
export function GetForbbidenBorCPageList(data = {}) {
	return fetch({
		url: '/api/ForbbidenBorC/GetPageList',
		method: 'POST',
		data
	})
}

// 新增教学楼教室禁用
export function DoAddForbbidenBorC(data = {}) {
	return fetch({
		url: '/api/ForbbidenBorC/DoAdd',
		method: 'POST',
		data
	})
}

// 修改教学楼教室禁用
export function DoUpdateForbbidenBorC(data = {}) {
	return fetch({
		url: '/api/ForbbidenBorC/DoUpdate',
		method: 'POST',
		data
	})
}

// 删除教学楼教室禁用
export function DoDeleteForbbidenBorC(data = {}) {
	return fetch({
		url: '/api/ForbbidenBorC/DoDelete',
		method: 'POST',
		data
	})
}

// 教学楼教室禁用详情
export function GetForbbidenBorCDetail(data = {}) {
	return fetch({
		url: '/api/ForbbidenBorC/GetDetail',
		method: 'POST',
		data
	})
}

// 获取审批记录
export function GetAdminApplyPageList(data = {}) {
	return fetch({
		url: '/api/Admin/GetApplyPageList',
		method: 'POST',
		data
	})
}

// 学院审核
export function ReviewAdminApply(data = {}) {
	return fetch({
		url: '/api/Admin/ReviewApply',
		method: 'POST',
		data
	})
}

// 获取后勤审批记录
export function GetAdminApplyPageList2(data = {}) {
	return fetch({
		url: '/api/Admin/GetApplyPageList2',
		method: 'POST',
		data
	})
}

// 获取后勤审批记录
export function GetAdminApplyPageList4(data = {}) {
	return fetch({
		url: '/api/Admin/GetApplyPageList4',
		method: 'POST',
		data
	})
}


// 获取所有审批记录
export function GetAllAdminApplyPageList(data = {}) {
	return fetch({
		url: '/api/Admin/GetAllApplyPageList',
		method: 'POST',
		data
	})
}

// 后勤审核
export function ReviewAdminApply2(data = {}) {
	return fetch({
		url: '/api/Admin/ReviewApply2',
		method: 'POST',
		data
	})
}

// 后勤审核详情
export function GetAdminDetail(data = {}) {
	return fetch({
		url: '/api/Admin/GetDetail',
		method: 'POST',
		data
	})
}

// 修改申请记录
export function DoUpdateAdmin(data = {}) {
	return fetch({
		url: '/api/Admin/DoUpdate',
		method: 'POST',
		data
	})
}

// 获取活动类型分页列表
export function GetActTypePageList(data = {}) {
	return fetch({
		url: '/api/ActType/GetPageList',
		method: 'POST',
		data
	})
}

// 获取所有活动类型列表
export function GetAllActTypeList(data = {}) {
	return fetch({
		url: '/api/ActType/GetAllList',
		method: 'POST',
		data
	})
}

// 新增活动类型
export function DoAddActType(data = {}) {
	return fetch({
		url: '/api/ActType/DoAdd',
		method: 'POST',
		data
	})
}

// 修改活动类型
export function DoUpdateActType(data = {}) {
	return fetch({
		url: '/api/ActType/DoUpdate',
		method: 'POST',
		data
	})
}

// 删除活动类型
export function DoDeleteActType(data = {}) {
	return fetch({
		url: '/api/ActType/DoDelete',
		method: 'POST',
		data
	})
}

// 获取角色权限列表
export function GetRoleAuthorityList2(data = {}) {
	return fetch({
		url: '/api/Authority/GetRoleAuthorityList2',
		method: 'POST',
		data
	})
}

// 获取角色权限列表
export function GetRoleAuthorityList(data = {}) {
	return fetch({
		url: '/api/Authority/GetRoleAuthorityList',
		method: 'POST',
		data
	})
}

// 获取用户权限菜单树
export function GetUserAuthorityList(data = {}) {
	return fetch({
		url: '/api/Authority/GetUserAuthorityList',
		method: 'POST',
		data
	})
}

// 获取菜单树
export function GetAuthorityList(data = {}) {
	return fetch({
		url: '/api/Authority/GetAuthorityList',
		method: 'POST',
		data
	})
}




/**
 * 库存主页预警列表Pt
 */
export function GetTipsList(data = {}) {
	return fetch({
		url: '/api/WarehouseStockWarning/GetTipsList',
		method: 'POST',
		data
	})
}

export function getCheckStore(params = {}) {
	return fetch({
		url: '/api/CheckStore/CheckStoreByDealerID',
		method: 'get',
		params,
		apiType: 98
	})
}
/**
 * 入库单据明细
 */
export function getInStorageByID(id) {
	return fetch({
		url: `/api/InStorage/GetDetail/${id}`,
		method: 'post',
		params: {}
	})
}
/**
 * 用户登录
 */
export function getLogin(data = {}) {
	return fetch({
		url: `/api/Login/DoLogin`,
		method: 'POST',
		data
	})
}
/**
 * 获取用户详情
 */
export function getTokenToUser(data = {}) {
	return fetch({
		url: `/api/Worker/TokenToUser`,
		method: 'POST',
		data
	})
}
/**
 * 出库单据明细
 */
export function getOutStorageByID(id) {
	return fetch({
		url: `/api/OutStorage/GetDetail/${id}`,
		method: 'post',
		params: {}
	})
}
/**
 * 收款方式列表
 */
export function doGetMenu(data = {}) {
	return fetch({
		url: `/api/Login/DoGetMenu`,
		method: 'POST',
		data
	})
}
/**
 * 发送验证码
 */
export function sendCode(params = {}) {
	return fetch({
		url: `/api/Login/SendCode`,
		method: 'post',
		params
	})
}
/**
 * 退出登陆了
 */
export function LoginOut(data = {}) {
	return fetch({
		url: `/User/Center/DoLoginOut`,
		method: 'post',
		data
	})
}
/**
 * 获取参数设置列表
 */
export function GetSystemConfigure(data = {}) {
	return fetch({
		url: `/Manage/SystemConfigure/DoGetList`,
		method: 'post',
		data
	})
}
/**
 * 参数修改
 */
export function UpdateSystemConfigure(data = {}) {
	return fetch({
		url: `/Manage/SystemConfigure/DoUpdate`,
		method: 'post',
		data
	})
}

/**
 * 新增角色
 */
export function AddRole(data = {}) {
	return fetch({
		url: `/Manage/Role/DoAdd`,
		method: 'post',
		data
	})
}
/**
 * 修改角色
 */
export function UpdateRole(data = {}) {
	return fetch({
		url: `/Manage/Role/DoUpdate`,
		method: 'post',
		data
	})
}
/**
 * 删除角色
 */
export function DeleteRole(data = {}) {
	return fetch({
		url: `/Manage/Role/DoDelete`,
		method: 'post',
		data
	})
}
/**
 * 获取管理员分页列表
 */
export function GetAdminPageList(data = {}) {
	return fetch({
		url: `/Manage/Admin/DoGetPageList`,
		method: 'post',
		data
	})
}
/**
 * 新增管理员
 */
export function AddAdmin(data = {}) {
	return fetch({
		url: `/Manage/Admin/DoAdd`,
		method: 'post',
		data
	})
}
/**
 * 修改管理员
 */
export function UpdateAdmin(data = {}) {
	return fetch({
		url: `/Manage/Admin/DoUpdate`,
		method: 'post',
		data
	})
}
/**
 * 删除管理员
 */
export function DeleteAdmin(data = {}) {
	return fetch({
		url: `/Manage/Admin/DoDelete`,
		method: 'post',
		data
	})
}
/**
 * 停用/启用管理员
 */
export function EnableAdmin(data = {}) {
	return fetch({
		url: `/Manage/Admin/DoEnable`,
		method: 'post',
		data
	})
}
/**
 * 获取权限菜单
 */
export function GetPowerData(data = {}) {
	return fetch({
		url: `/Manage/Role/DoGetPowerData`,
		method: 'post',
		data
	})
}
/**
 * 获取俱乐部分页列表
 */
export function getClubPageList(data = {}) {
	return fetch({
		url: `/Manage/Club/DoGetPageList`,
		method: 'post',
		data
	})
}
/**
 * 获取俱乐部详情
 */
export function getClubDetail(data = {}) {
	return fetch({
		url: `/Manage/Club/DoGetDetail`,
		method: 'post',
		data
	})
}
/**
 * 添加俱乐部
 */
export function AddClub(params = {}) {
	return fetch({
		url: `/Manage/Club/DoAdd`,
		method: 'post',
		params
	})
}
/**
 * 删除俱乐部
 */
export function DeleteClub(params = {}) {
	return fetch({
		url: `/Manage/Club/DoDelete`,
		method: 'post',
		params
	})
}
/**
 * 启用/停用俱乐部
 */
export function EnableClub(data = {}) {
	return fetch({
		url: `/Manage/Club/DoEnable`,
		method: 'post',
		data
	})
}
/**
 * 更新俱乐部
 */
export function UpdateClub(params = {}) {
	return fetch({
		url: `/Manage/Club/DoUpdate`,
		method: 'post',
		params
	})
}
/**
 * 获取活动分页列表类型
 */
export function getActivityTypeList(data = {}) {
	return fetch({
		url: `/Manage/ActivityType/DoGetList`,
		method: 'post',
		data
	})
}
/**
 * 获取活动详情类型
 */
export function getActivityTypeDetail(data = {}) {
	return fetch({
		url: `/Manage/ActivityType/DoGetDetail`,
		method: 'post',
		data
	})
}
/**
 * 添加活动类型
 */
export function AddActivityType(data = {}) {
	return fetch({
		url: `/Manage/ActivityType/DoAdd`,
		method: 'post',
		data
	})
}
/**
 * 修改活动类型
 */
export function UpdateActivityType(data = {}) {
	return fetch({
		url: `/Manage/ActivityType/DoUpdate`,
		method: 'post',
		data
	})
}
/**
 * 删除活动类型
 */
export function DeleteActivityType(data = {}) {
	return fetch({
		url: `/Manage/ActivityType/DoDelete`,
		method: 'post',
		data
	})
}
/**
 * 获取活动分页列表
 */
export function getActivityPageList(data = {}) {
	return fetch({
		url: `/Manage/Activity/DoGetPageList`,
		method: 'post',
		data
	})
}
/**
 * 获取活动详情
 */
export function getActivityDetail(data = {}) {
	return fetch({
		url: `/Manage/Activity/DoGetDetail`,
		method: 'post',
		data
	})
}
/**
 * 添加活动
 */
export function AddActivity(params = {}) {
	return fetch({
		url: `/Manage/Activity/DoAdd`,
		method: 'post',
		params
	})
}
/**
 * 修改活动
 */
export function UpdateActivity(data = {}) {
	return fetch({
		url: `/Manage/Activity/DoUpdate`,
		method: 'post',
		data
	})
}
/**
 * 删除活动
 */
export function DeleteActivity(data = {}) {
	return fetch({
		url: `/Manage/Activity/DoDelete`,
		method: 'post',
		data
	})
}
/**
 * 文件上传
 */
export function UploadFile(params = {}) {
	return fetch({
		url: `/Common/DoUploadFile`,
		method: 'POST',
		params: params.formData
	})
}
/**
 * 获取申请表单类型列表
 */
export function GetApplyFormTypeList(data = {}) {
	return fetch({
		url: `/Common/DoGetApplyTypeList`,
		method: 'post',
		data
	})
}
/**
 * 获取申请表单字段类型列表
 */
export function GetApplyFormFieldTypeList(data = {}) {
	return fetch({
		url: `/Common/DoGetApplyFormFieldTypeList`,
		method: 'post',
		data
	})
}
/**
 * 获取俱乐部类型列表
 */
export function GetClubTypeList(data = {}) {
	return fetch({
		url: `/Common/DoGetClubTypeList`,
		method: 'post',
		data
	})
}
/**
 * 获取俱乐部类型管理列表
 */
export function GetClubTypeListManage(data = {}) {
	return fetch({
		url: `/Manage/ClubType/DoGetList`,
		method: 'post',
		data
	})
}
/**
 * 新增俱乐部类型
 */
export function AddClubType(data = {}) {
	return fetch({
		url: `/Manage/ClubType/DoAdd`,
		method: 'post',
		data
	})
}
/**
 * 更新俱乐部类型
 */
export function UpdateClubType(params = {}) {
	return fetch({
		url: `/Manage/ClubType/DoUpdate`,
		method: 'post',
		params
	})
}
/**
 * 删除俱乐部类型管理列表
 */
export function DeleteClubType(data = {}) {
	return fetch({
		url: `/Manage/ClubType/DoDelete`,
		method: 'post',
		data
	})
}
/**
 * 获取部门列表
 */
export function GetDepartList(data = {}) {
	return fetch({
		url: `/Common/DoGetDepartList`,
		method: 'post',
		data
	})
}
/**
 * 获取部门管理列表
 */
export function GetDepartListManage(data = {}) {
	return fetch({
		url: `/Manage/Depart/DoGetList`,
		method: 'post',
		data
	})
}
/**
 * 新增部门
 */
export function AddDepart(params = {}) {
	return fetch({
		url: `/Manage/Depart/DoAdd`,
		method: 'post',
		params
	})
}
/**
 * 更新部门
 */
export function UpdateDepart(params = {}) {
	return fetch({
		url: `/Manage/Depart/DoUpdate`,
		method: 'post',
		params
	})
}
/**
 * 删除部门
 */
export function DeleteDepart(params = {}) {
	return fetch({
		url: `/Manage/Depart/DoDelete`,
		method: 'post',
		params
	})
}
/**
 * 获取俱乐部项目列表
 */
export function GetClubProjectList(data = {}) {
	return fetch({
		url: `/Common/DoGetClubProjectList`,
		method: 'post',
		data
	})
}
/**
 * 获取俱乐部项目管理列表
 */
export function GetClubProjectListManage(data = {}) {
	return fetch({
		url: `/Manage/ClubProject/DoGetList`,
		method: 'post',
		data
	})
}
/**
 * 新增俱乐部项目
 */
export function AddClubProject(data = {}) {
	return fetch({
		url: `/Manage/ClubProject/DoAdd`,
		method: 'post',
		data
	})
}
/**
 * 更新俱乐部项目
 */
export function UpdateClubProject(params = {}) {
	return fetch({
		url: `/Manage/ClubProject/DoUpdate`,
		method: 'post',
		params
	})
}
/**
 * 删除俱乐部项目管理列表
 */
export function DeleteClubProject(params = {}) {
	return fetch({
		url: `/Manage/ClubProject/DoDelete`,
		method: 'post',
		params
	})
}
/**
 * 获取用户列表
 */
export function GetUserList(data = {}) {
	return fetch({
		url: `/Common/DoGetUserList`,
		method: 'post',
		data
	})
}
/**
 * 获取老师类型列表
 */
export function GetTeacherTypeList(data = {}) {
	return fetch({
		url: `/Common/DoGetTeacherTypeList`,
		method: 'post',
		data
	})
}
/**
 * 获取老师管理列表
 */
export function GetClubTeacherListManage(data = {}) {
	return fetch({
		url: `/Manage/ClubTeacher/DoGetList`,
		method: 'post',
		data
	})
}
/**
 * 新增老师
 */
export function AddClubTeacher(params = {}) {
	return fetch({
		url: `/Manage/ClubTeacher/DoAdd`,
		method: 'post',
		params
	})
}
/**
 * 更新老师
 */
export function UpdateClubTeacher(params = {}) {
	return fetch({
		url: `/Manage/ClubTeacher/DoUpdate`,
		method: 'post',
		params
	})
}
/**
 * 删除老师
 */
export function DeleteClubTeacher(params = {}) {
	return fetch({
		url: `/Manage/ClubTeacher/DoDelete`,
		method: 'post',
		params
	})
}
/**
 * 获取项目老师管理列表
 */
export function GetClubProjectTeacherListManage(data = {}) {
	return fetch({
		url: `/Manage/ClubProjectTeacher/DoGetList`,
		method: 'post',
		data
	})
}
/**
 * 新增项目老师
 */
export function AddClubProjectTeacher(data = {}) {
	return fetch({
		url: `/Manage/ClubProjectTeacher/DoAdd`,
		method: 'post',
		data
	})
}
/**
 * 更新项目老师
 */
export function UpdateClubProjectTeacher(data = {}) {
	return fetch({
		url: `/Manage/ClubProjectTeacher/DoUpdate`,
		method: 'post',
		data
	})
}
/**
 * 删除项目老师
 */
export function DeleteClubProjectTeacher(data = {}) {
	return fetch({
		url: `/Manage/ClubProjectTeacher/DoDelete`,
		method: 'post',
		data
	})
}
/**
 * 获取管理员管理列表
 */
export function GetClubManagerListManage(data = {}) {
	return fetch({
		url: `/Manage/ClubManager/DoGetList`,
		method: 'post',
		data
	})
}
/**
 * 新增管理员
 */
export function AddClubManager(data = {}) {
	return fetch({
		url: `/Manage/ClubManager/DoAdd`,
		method: 'post',
		data
	})
}
/**
 * 更新管理员
 */
export function UpdateClubManager(data = {}) {
	return fetch({
		url: `/Manage/ClubManager/DoUpdate`,
		method: 'post',
		data
	})
}
/**
 * 删除管理员
 */
export function DeleteClubManager(data = {}) {
	return fetch({
		url: `/Manage/ClubManager/DoDelete`,
		method: 'post',
		data
	})
}
/**
 * 获取管理员详情
 */
export function GetDetailClubManager(data = {}) {
	return fetch({
		url: `/Manage/ClubManager/DoGetDetail`,
		method: 'post',
		data
	})
}
/**
 * 获取成员管理列表
 */
export function GetClubMemberListManage(data = {}) {
	return fetch({
		url: `/Manage/ClubMember/DoGetList`,
		method: 'post',
		data
	})
}
/**
 * 新增成员
 */
export function AddClubMember(params = {}) {
	return fetch({
		url: `/Manage/ClubMember/DoAdd`,
		method: 'post',
		params
	})
}
/**
 * 更新成员
 */
export function UpdateClubMember(params = {}) {
	return fetch({
		url: `/Manage/ClubMember/DoUpdate`,
		method: 'post',
		params
	})
}
/**
 * 删除成员
 */
export function DeleteClubMember(params = {}) {
	return fetch({
		url: `/Manage/ClubMember/DoDelete`,
		method: 'post',
		params
	})
}
/**
 * 获取活动申请表单管理列表
 */
export function GetApplyActivityFormListManage(data = {}) {
	return fetch({
		url: `/Manage/ApplyActivityForm/DoGetList`,
		method: 'post',
		data
	})
}
/**
 * 新增活动申请表单
 */
export function AddApplyActivityForm(params = {}) {
	return fetch({
		url: `/Manage/ApplyActivityForm/DoAdd`,
		method: 'post',
		params
	})
}
/**
 * 更新活动申请表单
 */
export function UpdateApplyActivityForm(params = {}) {
	return fetch({
		url: `/Manage/ApplyActivityForm/DoUpdate`,
		method: 'post',
		params
	})
}
/**
 * 删除活动申请表单
 */
export function DeleteApplyActivityForm(params = {}) {
	return fetch({
		url: `/Manage/ApplyActivityForm/DoDelete`,
		method: 'post',
		params
	})
}
/**
 * 活动申请表单排序
 */
export function DoSortApplyActivityForm(params = {}) {
	return fetch({
		url: `/Manage/ApplyActivityForm/DoSort`,
		method: 'post',
		params
	})
}
/**
 * 获取申请项表单管理列表
 */
export function GetApplyItemFormListManage(data = {}) {
	return fetch({
		url: `/Manage/ApplyItemForm/DoGetList`,
		method: 'post',
		data
	})
}
/**
 * 新增申请项表单
 */
export function AddApplyItemForm(params = {}) {
	return fetch({
		url: `/Manage/ApplyItemForm/DoAdd`,
		method: 'post',
		params
	})
}
/**
 * 更新申请项表单
 */
export function UpdateApplyItemForm(params = {}) {
	return fetch({
		url: `/Manage/ApplyItemForm/DoUpdate`,
		method: 'post',
		params
	})
}
/**
 * 删除申请项表单
 */
export function DeleteApplyItemForm(params = {}) {
	return fetch({
		url: `/Manage/ApplyItemForm/DoDelete`,
		method: 'post',
		params
	})
}
/**
 * 申请项表单排序
 */
export function DoSortApplyItemForm(params = {}) {
	return fetch({
		url: `/Manage/ApplyItemForm/DoSort`,
		method: 'post',
		params
	})
}
/**
 * 获取学生管理列表
 */
export function GetStudentListManage(data = {}) {
	return fetch({
		url: `/Manage/Student/DoGetPageList`,
		method: 'post',
		data
	})
}
/**
 * 同步学生信息
 */
export function CoreUpdateStudent(data = {}) {
	return fetch({
		url: `/Manage/Student/DoCoreUpdate`,
		method: 'post',
		data
	})
}
/**
 * 新增学生
 */
export function AddStudent(data = {}) {
	return fetch({
		url: `/Manage/Student/DoAdd`,
		method: 'post',
		data
	})
}
/**
 * 更新学生
 */
export function UpdateStudent(data = {}) {
	return fetch({
		url: `/Manage/Student/DoUpdate`,
		method: 'post',
		data
	})
}
/**
 * 详情学生
 */
export function DoGetDetailStudent(params = {}) {
	return fetch({
		url: `/Manage/Student/DoGetDetail`,
		method: 'post',
		params
	})
}
/**
 * 删除学生
 */
export function DeleteStudent(params = {}) {
	return fetch({
		url: `/Manage/Student/DoDelete`,
		method: 'post',
		params
	})
}
/**
 * 获取班级列表
 */
export function GetClassList(data = {}) {
	return fetch({
		url: `/Common/DoGetClassList`,
		method: 'post',
		data
	})
}
/**
 * 获取教师管理列表
 */
export function GetTeacherListManage(data = {}) {
	return fetch({
		url: `/Manage/Teacher/DoGetPageList`,
		method: 'post',
		data
	})
}
/**
 * 新增教师
 */
export function AddTeacher(data = {}) {
	return fetch({
		url: `/Manage/Teacher/DoAdd`,
		method: 'post',
		data
	})
}
/**
 * 更新教师
 */
export function UpdateTeacher(data = {}) {
	return fetch({
		url: `/Manage/Teacher/DoUpdate`,
		method: 'post',
		data
	})
}
/**
 * 详情教师
 */
export function DoGetDetailTeacher(params = {}) {
	return fetch({
		url: `/Manage/Teacher/DoGetDetail`,
		method: 'post',
		params
	})
}
/**
 * 删除教师
 */
export function DeleteTeacher(params = {}) {
	return fetch({
		url: `/Manage/Teacher/DoDelete`,
		method: 'post',
		params
	})
}
/**
 * 获取新闻管理列表
 */
export function GetNewsListManage(data = {}) {
	return fetch({
		url: `/Manage/News/DoGetPageList`,
		method: 'post',
		data
	})
}
/**
 * 新增新闻
 */
export function AddNews(data = {}) {
	return fetch({
		url: `/Manage/News/DoAdd`,
		method: 'post',
		data
	})
}
/**
 * 更新新闻
 */
export function UpdateNews(data = {}) {
	return fetch({
		url: `/Manage/News/DoUpdate`,
		method: 'post',
		data
	})
}
/**
 * 详情新闻
 */
export function DoGetDetailNews(params = {}) {
	return fetch({
		url: `/Manage/News/DoGetDetail`,
		method: 'post',
		params
	})
}
/**
 * 删除新闻
 */
export function DeleteNews(data = {}) {
	return fetch({
		url: `/Manage/News/DoDelete`,
		method: 'post',
		data
	})
}
/**
 * 获取新闻类型列表
 */
export function GetNewsTypeList(data = {}) {
	return fetch({
		url: `/Common/DoGetNewsTypeList`,
		method: 'post',
		data
	})
}

/**
 * 获取新闻类型管理列表
 */
export function GetNewsTypeListManage(data = {}) {
	return fetch({
		url: `/Manage/NewsType/DoGetList`,
		method: 'post',
		data
	})
}
/**
 * 新增新闻类型
 */
export function AddNewsType(params = {}) {
	return fetch({
		url: `/Manage/NewsType/DoAdd`,
		method: 'post',
		params
	})
}
/**
 * 更新新闻类型
 */
export function UpdateNewsType(params = {}) {
	return fetch({
		url: `/Manage/NewsType/DoUpdate`,
		method: 'post',
		params
	})
}
/**
 * 详情新闻类型
 */
export function DoGetDetailNewsType(params = {}) {
	return fetch({
		url: `/Manage/NewsType/DoGetDetail`,
		method: 'post',
		params
	})
}
/**
 * 删除新闻类型
 */
export function DeleteNewsType(params = {}) {
	return fetch({
		url: `/Manage/NewsType/DoDelete`,
		method: 'post',
		params
	})
}
/**
 * 获取审批类型类型列表
 */
export function GetFlowTypeList(data = {}) {
	return fetch({
		url: `/Common/DoGetFlowTypeList`,
		method: 'post',
		data
	})
}
/**
 * 获取申请活动审批管理列表
 */
export function GetApplyActivityFlowListManage(data = {}) {
	return fetch({
		url: `/Manage/ApplyActivityFlow/DoGetList`,
		method: 'post',
		data
	})
}
/**
 * 新增申请活动审批
 */
export function AddApplyActivityFlow(params = {}) {
	return fetch({
		url: `/Manage/ApplyActivityFlow/DoAdd`,
		method: 'post',
		params
	})
}
/**
 * 更新申请活动审批
 */
export function UpdateApplyActivityFlow(params = {}) {
	return fetch({
		url: `/Manage/ApplyActivityFlow/DoUpdate`,
		method: 'post',
		params
	})
}
/**
 * 详情申请活动审批
 */
export function DoGetDetailApplyActivityFlow(params = {}) {
	return fetch({
		url: `/Manage/ApplyActivityFlow/DoGetDetail`,
		method: 'post',
		params
	})
}
/**
 * 删除申请活动审批
 */
export function DeleteApplyActivityFlow(params = {}) {
	return fetch({
		url: `/Manage/ApplyActivityFlow/DoDelete`,
		method: 'post',
		params
	})
}
/**
 * 活动申请审批排序
 */
export function DoSortApplyActivityFlow(params = {}) {
	return fetch({
		url: `/Manage/ApplyActivityFlow/DoSort`,
		method: 'post',
		params
	})
}
/**
 * 获取申请项审批管理列表
 */
export function GetApplyItemFlowListManage(data = {}) {
	return fetch({
		url: `/Manage/ApplyItemFlow/DoGetList`,
		method: 'post',
		data
	})
}
/**
 * 新增申请项审批
 */
export function AddApplyItemFlow(params = {}) {
	return fetch({
		url: `/Manage/ApplyItemFlow/DoAdd`,
		method: 'post',
		params
	})
}
/**
 * 更新申请项审批
 */
export function UpdateApplyItemFlow(params = {}) {
	return fetch({
		url: `/Manage/ApplyItemFlow/DoUpdate`,
		method: 'post',
		params
	})
}
/**
 * 详情申请项审批
 */
export function DoGetDetailApplyItemFlow(params = {}) {
	return fetch({
		url: `/Manage/ApplyItemFlow/DoGetDetail`,
		method: 'post',
		params
	})
}
/**
 * 删除申请项审批
 */
export function DeleteApplyItemFlow(params = {}) {
	return fetch({
		url: `/Manage/ApplyItemFlow/DoDelete`,
		method: 'post',
		params
	})
}
/**
 * 活动申请审批排序
 */
export function DoSortApplyItemFlow(params = {}) {
	return fetch({
		url: `/Manage/ApplyItemFlow/DoSort`,
		method: 'post',
		params
	})
}
/**
 * 获取申请项类型管理列表
 */
export function GetApplyItemTypeListManage(data = {}) {
	return fetch({
		url: `/Manage/ApplyItemType/DoGetList`,
		method: 'post',
		data
	})
}
/**
 * 新增申请项类型
 */
export function AddApplyItemType(data = {}) {
	return fetch({
		url: `/Manage/ApplyItemType/DoAdd`,
		method: 'post',
		data
	})
}
/**
 * 更新申请项类型
 */
export function UpdateApplyItemType(params = {}) {
	return fetch({
		url: `/Manage/ApplyItemType/DoUpdate`,
		method: 'post',
		params
	})
}
/**
 * 详情申请项类型
 */
export function DoGetDetailApplyItemType(params = {}) {
	return fetch({
		url: `/Manage/ApplyItemType/DoGetDetail`,
		method: 'post',
		params
	})
}
/**
 * 删除申请项类型
 */
export function DeleteApplyItemType(data = {}) {
	return fetch({
		url: `/Manage/ApplyItemType/DoDelete`,
		method: 'post',
		data
	})
}
/**
 * 获取申请项列表
 */
export function GetApplyItemNodeList(data = {}) {
	return fetch({
		url: `/Common/DoGetApplyItemNodeList`,
		method: 'post',
		data
	})
}
/**
 * 获取学分申请状态列表
 */
export function GetUserApplyItemStateList(data = {}) {
	return fetch({
		url: `/Common/DoGetUserApplyItemStateList`,
		method: 'post',
		data
	})
}

/**
 * 获取申请项管理列表
 */
export function GetApplyItemNodeListManage(data = {}) {
	return fetch({
		url: `/Manage/ApplyItemNode/DoGetList`,
		method: 'post',
		data
	})
}
/**
 * 新增申请项
 */
export function AddApplyItemNode(data = {}) {
	return fetch({
		url: `/Manage/ApplyItemNode/DoAdd`,
		method: 'post',
		data
	})
}
/**
 * 更新申请项
 */
export function UpdateApplyItemNode(params = {}) {
	return fetch({
		url: `/Manage/ApplyItemNode/DoUpdate`,
		method: 'post',
		params
	})
}
/**
 * 详情申请项
 */
export function DoGetDetailApplyItemNode(params = {}) {
	return fetch({
		url: `/Manage/ApplyItemNode/DoGetDetail`,
		method: 'post',
		params
	})
}
/**
 * 删除申请项
 */
export function DeleteApplyItemNode(data = {}) {
	return fetch({
		url: `/Manage/ApplyItemNode/DoDelete`,
		method: 'post',
		data
	})
}
/**
 * 获取申请项类型列表
 */
export function GetApplyItemTypeList(data = {}) {
	return fetch({
		url: `/Common/DoGetApplyItemTypeList`,
		method: 'post',
		data
	})
}
/**
 * 用户登录
 */
export function DoLogin(data = {}) {
	return fetch({
		url: `/User/Index/Login`,
		method: 'post',
		data
	})
}
/**
 * 用户获取俱乐部全部分页列表
 */
export function GetClubPageList(data = {}) {
	return fetch({
		url: `/User/Club/DoGetPageList`,
		method: 'post',
		data
	})
}
/**
 * 用户获取俱乐部详情
 */
export function UserGetClubDetail(data = {}) {
	return fetch({
		url: `/User/Club/DoGetDetail`,
		method: 'post',
		data
	})
}
/**
 * 用户获取我的俱乐部列表
 */
export function GetJoinClubList(data = {}) {
	return fetch({
		url: `/User/Club/DoGetJoinList`,
		method: 'post',
		data
	})
}
/**
 * 用户获取我管理的俱乐部列表
 */
export function GetUserManagClubList(data = {}) {
	return fetch({
		url: `/User/Club/DoGetManageList`,
		method: 'post',
		data
	})
}
/**
 * 用户申请加入俱乐部
 */
export function GetApplyClubList(data = {}) {
	return fetch({
		url: `/User/Club/DoApplyJoin`,
		method: 'post',
		data
	})
}

/**
 * 获取用户信息
 */
export function GetUserInfo(data = {}) {
	return fetch({
		url: `/User/Center/DoGetUserInfo`,
		method: 'post',
		data
	})
}
/**
 * 获取管理员菜单
 */
export function GetAdminMenu(data = {}) {
	return fetch({
		url: `User/Center/DoGetAdminMenu`,
		method: 'post',
		data
	})
}

/**
 * 用户获取申请列表
 */
export function GetUserClubApplyPageList(data = {}) {
	return fetch({
		url: `/User/ClubApply/DoGetPageList`,
		method: 'post',
		data
	})
}
/**
 * 用户申请审核
 */
export function GetUserJoinDoExam(data = {}) {
	return fetch({
		url: `/User/ClubApply/DoExam`,
		method: 'post',
		data
	})
}
/**
 * 获取俱乐部成员列表
 */
export function GetUserClubMember(data = {}) {
	return fetch({
		url: `/User/ClubMember/DoGetList`,
		method: 'post',
		data
	})
}
/**
 * 获取俱乐部成员修改
 */
export function DoUpdateUserClubMember(data = {}) {
	return fetch({
		url: `/User/ClubManager/DoUpdate`,
		method: 'post',
		data
	})
}
/**
 * 获取俱乐部管理员
 */
export function DoGetDetailUserClubMember(data = {}) {
	return fetch({
		url: `/User/ClubManager/DoGetDetail`,
		method: 'post',
		data
	})
}
/**
 * 删除俱乐部管理员
 */
export function DoDeleteUserClubAdmin(data = {}) {
	return fetch({
		url: `/User/ClubManager/DoDelete`,
		method: 'post',
		data
	})
}
/**
 * 删除俱乐部成员
 */
export function DoDeleteUserClubMember(data = {}) {
	return fetch({
		url: `/User/ClubMember/DoDelete`,
		method: 'post',
		data
	})
}
/**
 * 设为俱乐部管理员
 */
export function DoAddUserClubMember(data = {}) {
	return fetch({
		url: `/User/ClubManager/DoAdd`,
		method: 'post',
		data
	})
}
/**
 * 获取活动申请表单列表
 */
export function GetFormList(data = {}) {
	return fetch({
		url: `/User/Activity/DoGetFormList`,
		method: 'post',
		data
	})
}
/**
 * 申请活动
 */
export function userAddActivity(data = {}) {
	return fetch({
		url: `/User/Activity/DoAdd`,
		method: 'post',
		data
	})
}
/**
 * 获取活动状态列表
 */
export function GetActivityStateList(data = {}) {
	return fetch({
		url: `/Common/DoGetActivityStateList`,
		method: 'post',
		data
	})
}
/**
 * 获取俱乐部分页列表
 */
export function GetClubPageListCommon(data = {}) {
	return fetch({
		url: `/Common/DoGetClubPageList`,
		method: 'post',
		data
	})
}
/**
 * 获取全部活动列表
 */
export function GetActivityPageList(params = {}) {
	return fetch({
		url: `/User/Activity/DoGetPageList`,
		method: 'post',
		params
	})
}
/**
 * 获取我申请活动列表
 */
export function GetApplyActivityPageList(params = {}) {
	return fetch({
		url: `/User/Activity/DoGetApplyPageList`,
		method: 'post',
		params
	})
}
/**
 * 获取我管理的活动列表
 */
export function GetManageActivityPageList(params = {}) {
	return fetch({
		url: `/User/Activity/DoGetManagePageList`,
		method: 'post',
		params
	})
}
/**
 * 获取我参与的活动列表
 */
export function GetJoinActivityPageList(params = {}) {
	return fetch({
		url: `/User/Activity/DoGetJoinPageList`,
		method: 'post',
		params
	})
}
/**
 * 提交活动
 */
export function UserSubmitActivity(data = {}) {
	return fetch({
		url: `/User/Activity/DoSubmit`,
		method: 'post',
		data
	})
}
/**
 * 活动详情
 */
export function UserActivityDetail(data = {}) {
	return fetch({
		url: `/User/Activity/DoGetDetail`,
		method: 'post',
		data
	})
}
/**
 * 修改活动
 */
export function UserUpdateActivity(data = {}) {
	return fetch({
		url: `/User/Activity/DoUpdate`,
		method: 'post',
		data
	})
}
/**
 * 删除活动
 */
export function UserdeleteActivity(data = {}) {
	return fetch({
		url: `/User/Activity/DoDelete`,
		method: 'post',
		data
	})
}
/**
 * 获取学院待审批分页列表
 */
export function GetCollegeExamPageList(data = {}) {
	return fetch({
		url: `/Manage/ActivityFlow/DoGetCollegeExamPageList`,
		method: 'post',
		data
	})
}
/**
 * 获取获取学院已审批分页列表
 */
export function GetCollegeAlreadyExamPageList(data = {}) {
	return fetch({
		url: `/Manage/ActivityFlow/DoGetCollegeAlreadyExamPageList`,
		method: 'post',
		data
	})
}
/**
 * 获取学校待审批分页列表
 */
export function GetSchoolExamPageList(data = {}) {
	return fetch({
		url: `/Manage/ActivityFlow/DoGetSchoolExamPageList`,
		method: 'post',
		data
	})
}
/**
 * 获取学校已审批分页列表
 */
export function GetSchoolAlreadyExamPageList(data = {}) {
	return fetch({
		url: `/Manage/ActivityFlow/DoGetSchoolAlreadyExamPageList`,
		method: 'post',
		data
	})
}
/**
 * 获取完结待审批分页列表
 */
export function GetEndExamPageList(data = {}) {
	return fetch({
		url: `/Manage/ActivityFlow/DoGetEndExamPageList`,
		method: 'post',
		data
	})
}
/**
 * 获取完结已审批分页列表
 */
export function GetEndAlreadyExamPageList(data = {}) {
	return fetch({
		url: `/Manage/ActivityFlow/DoGetEndAlreadyExamPageList`,
		method: 'post',
		data
	})
}
/**
 * 活动审批
 */
export function ExamActivityFlow(data = {}) {
	return fetch({
		url: `/Manage/ActivityFlow/DoExam`,
		method: 'post',
		data
	})
}
/**
 * 学分申请审批
 */
export function ExamUserApplyItemFlow(data = {}) {
	return fetch({
		url: `/Manage/UserApplyItemFlow/DoExam`,
		method: 'post',
		data
	})
}
/**
 * 活动申请详情
 */
export function ActivityFlowGetDetail(data = {}) {
	return fetch({
		url: `/Manage/ActivityFlow/DoGetDetail`,
		method: 'post',
		data
	})
}
/**
 * 学分申请审批详情
 */
export function UserApplyItemFlowGetDetail(data = {}) {
	return fetch({
		url: `/Manage/UserApplyItemFlow/DoGetDetail`,
		method: 'post',
		data
	})
}
/**
 * 获取学分申请管理分页列表
 */
export function GetUserApplyItemPageList(data = {}) {
	return fetch({
		url: `/Manage/UserApplyItem/DoGetPageList`,
		method: 'post',
		data
	})
}
/**
 * 删除学分申请管理分页列表
 */
export function DeleteUserApplyItemPageList(data = {}) {
	return fetch({
		url: `/Manage/UserApplyItem/DoDelete`,
		method: 'post',
		data
	})
}
/**
 * 修改学分申请管理分页列表
 */
export function UpdateUserApplyItemPageList(data = {}) {
	return fetch({
		url: `/Manage/UserApplyItem/DoUpdate`,
		method: 'post',
		data
	})
}
/**
 * 获取学分申请管理详情
 */
export function GetDetailUserApplyItemPageList(data = {}) {
	return fetch({
		url: `/Manage/UserApplyItem/DoGetDetail`,
		method: 'post',
		data
	})
}

/**
 * 获取学分申请学院待审批分页列表
 */
export function GetUserApplyItemFlowCollegeExamPageList(data = {}) {
	return fetch({
		url: `/Manage/UserApplyItemFlow/DoGetCollegeExamPageList`,
		method: 'post',
		data
	})
}
/**
 * 获取学分申请获取学院已审批分页列表
 */
export function GetUserApplyItemFlowCollegeAlreadyExamPageList(data = {}) {
	return fetch({
		url: `/Manage/UserApplyItemFlow/DoGetCollegeAlreadyExamPageList`,
		method: 'post',
		data
	})
}
/**
 * 获取学分申请学校待审批分页列表
 */
export function GetUserApplyItemFlowSchoolExamPageList(data = {}) {
	return fetch({
		url: `/Manage/UserApplyItemFlow/DoGetSchoolExamPageList`,
		method: 'post',
		data
	})
}
/**
 * 获取学分申请学校已审批分页列表
 */
export function GetUserApplyItemFlowSchoolAlreadyExamPageList(data = {}) {
	return fetch({
		url: `/Manage/UserApplyItemFlow/DoGetSchoolAlreadyExamPageList`,
		method: 'post',
		data
	})
}
/**
 * 附件列表
 */
export function GetActivityFileList(data = {}) {
	return fetch({
		url: `/Manage/ActivityFile/DoGetList`,
		method: 'post',
		data
	})
}
/**
 * 删除附件
 */
export function DeleteActivityFile(data = {}) {
	return fetch({
		url: `/Manage/ActivityFile/DoDelete`,
		method: 'post',
		data
	})
}
/**
 * 下载附件
 */
export function DownManageActivityFile(data = {}) {
 	return fetch({
 		url: `/Manage/ActivityFile/DownFile?id=${data.id}`,
 		method: 'GET',
 		data
 	})
 }
 /**
  * 公告列表
  */
 
 export function GetMClubNewsList(data = {}) {
 	return fetch({
 		url: `/Manage/ClubNews/DoGetPageList`,
 		method: 'post',
 		data
 	})
 }
 /**
  * 修改公告
  */
 
 export function DoUpdateMClubNews(data = {}) {
 	return fetch({
 		url: `/Manage/ClubNews/DoUpdate`,
 		method: 'post',
 		data
 	})
 }
 /**
  * 删除公告
  */
 export function DoDeleteMClubNews(data = {}) {
 	return fetch({
 		url: `/Manage/ClubNews/DoDelete`,
 		method: 'post',
 		data
 	})
 }
 /**
  * 公告回复列表
  */
 export function MClubNewsReplyList(data = {}) {
 	return fetch({
 		url: `/Manage/ClubNewsReply/DoGetPageList`,
 		method: 'post',
 		data
 	})
 }
 /**
  * 删除回复
  */
 export function DoDeleteMClubNewsReply(data = {}) {
 	return fetch({
 		url: `/Manage/ClubNewsReply/DoDelete`,
 		method: 'post',
 		data
 	})
 }
/**
 * 获取活动类型列表
 */
export function GetActivityTypeList(data = {}) {
	return fetch({
		url: `/Common/DoGetActivityTypeList`,
		method: 'post',
		data
	})
}

/**
 * 活动成员管理
 */
export function GetUserActivityMember(data = {}) {
	return fetch({
		url: `/User/ActivityMember/DoGetList`,
		method: 'post',
		data
	})
}
/**
 * 删除活动成员
 */
export function DeleteUserActivityMember(data = {}) {
	return fetch({
		url: `/User/ActivityMember/DoDelete`,
		method: 'post',
		data
	})
}
/**
 * 设为活动管理员
 */
export function SetUserActivityMember(data = {}) {
	return fetch({
		url: `/User/ActivityManager/DoAdd`,
		method: 'post',
		data
	})
}
/**
 * 取消活动管理员
 */
export function CancelUserActivityMember(data = {}) {
	return fetch({
		url: `/User/ActivityManager/DoDelete`,
		method: 'post',
		data
	})
}
/**
 * 成员申请加入活动
 */
export function ApplyJoinUserActivity(data = {}) {
	return fetch({
		url: `/User/Activity/DoApplyJoin`,
		method: 'post',
		data
	})
}
/**
 * 活动申请管理
 */
export function ApplyUserActivityManager(data = {}) {
	return fetch({
		url: `/User/ActivityApply/DoGetPageList`,
		method: 'post',
		data
	})
}
/**
 * 活动申请审批
 */
export function DoExamApplyUserJoinActivity(data = {}) {
	return fetch({
		url: `/User/ActivityApply/DoExam`,
		method: 'post',
		data
	})
}
/**
 * 活动签到列表
 */
export function UserActivitySignList(data = {}) {
	return fetch({
		url: `/User/ActivitySign/DoGetList`,
		method: 'post',
		data
	})
}
/**
 * 添加活动签到
 */
export function AddUserActivitySign(data = {}) {
	return fetch({
		url: `/User/ActivitySign/DoAdd`,
		method: 'post',
		data
	})
}
/**
 * 修改活动签到
 */
export function UpdateUserActivitySign(data = {}) {
	return fetch({
		url: `/User/ActivitySign/DoUpdate`,
		method: 'post',
		data
	})
}
/**
 * 删除活动签到
 */
export function DeleteUserActivitySign(data = {}) {
	return fetch({
		url: `/User/ActivitySign/DoDelete`,
		method: 'post',
		data
	})
}
/**
 * 获取活动签到二维码
 */
export function GetUserActivitySignQRImage(data = {}) {
	return fetch({
		url: `/User/ActivitySign/SignQRImage`,
		method: 'post',
		responseType: 'arraybuffer',
		data
	})
}
/**
 * 获取活动详情
 */
export function GetUserActivitySignDoGetDetail(data = {}) {
	return fetch({
		url: `/User/ActivitySign/DoGetDetail`,
		method: 'post',
		data
	})
}
/**
 * 获取活动签到类型
 */
export function DoGetActivitySignTypeList(data = {}) {
	return fetch({
		url: `/Common/DoGetActivitySignTypeList`,
		method: 'post',
		data
	})
}
/**
 * 邀请成员加入活动
 */
export function DoInviteUserJoinActivity(data = {}) {
	return fetch({
		url: `/User/Activity/DoInviteUser`,
		method: 'post',
		data
	})
}
/**
 * 获取待审批分页列表
 */
export function DoGetTeacherExamPageList(data = {}) {
	return fetch({
		url: `/User/ActivityFlow/DoGetTeacherExamPageList`,
		method: 'post',
		data
	})
}
/**
 * 获取已审批分页列表
 */
export function DoGetTeacherAlreadyExamPageList(data = {}) {
	return fetch({
		url: `/User/ActivityFlow/DoGetTeacherAlreadyExamPageList`,
		method: 'post',
		data
	})
}
/**
 * 获取审批详情列表
 */
export function DoGetUserActivityFlowPageList(data = {}) {
	return fetch({
		url: `/User/ActivityFlow/DoGetList`,
		method: 'post',
		data
	})
}
/**
 * 活动审批（老师相关）
 */
export function DoGetUserActivityFlowDoExamPageList(data = {}) {
	return fetch({
		url: `/User/ActivityFlow/DoExam`,
		method: 'post',
		data
	})
}
/**
 * 新增学分项申请
 */
export function DoAddUserApplyItem(data = {}) {
	return fetch({
		url: `/User/UserApplyItem/DoAdd`,
		method: 'post',
		data
	})
}
/**
 * 修改学分项申请
 */
export function DoUpdateUserApplyItem(data = {}) {
	return fetch({
		url: `/User/UserApplyItem/DoUpdate`,
		method: 'post',
		data
	})
}
/**
 * 获取学分项详情
 */
export function DetailUserApplyItem(data = {}) {
	return fetch({
		url: `/User/UserApplyItem/DoGetDetail`,
		method: 'post',
		data
	})
}
/**
 * 学分项提交申请
 */
export function DoSubmitUserApplyItem(data = {}) {
	return fetch({
		url: `/User/UserApplyItem/DoSubmit`,
		method: 'post',
		data
	})
}
/**
 * 删除学分项申请
 */
export function DoDeleteUserApplyItem(data = {}) {
	return fetch({
		url: `/User/UserApplyItem/DoDelete`,
		method: 'post',
		data
	})
}
/**
 * 获取学分项申请分页列表
 */
export function UserApplyItemPageList(data = {}) {
	return fetch({
		url: `/User/UserApplyItem/DoGetApplyPageList`,
		method: 'post',
		data
	})
}
/**
 * 获取学分项申请表单列表
 */
export function DoGetFormListUserApplyItem(data = {}) {
	return fetch({
		url: `/User/UserApplyItem/DoGetFormList`,
		method: 'post',
		data
	})
}
/**
 * 活动结束提交完结审核
 */
export function UserDoSubmitEndActivity(data = {}) {
	return fetch({
		url: `/User/Activity/DoSubmitEnd`,
		method: 'post',
		data
	})
}
/**
 * 获取运动数据
 */
export function DoGetSportsList(data = {}) {
	return fetch({
		url: `API/Sports/DoGetList`,
		method: 'post',
		data
	})
}
/**
 * 获取活动类型
 */
export function UserDoGetActivityTypeList(data = {}) {
	return fetch({
		url: `/Common/DoGetActivityTypeList`,
		method: 'post',
		data
	})
}
/**
 * 获取指导老师待审批分页列表
 */
export function UserAllTeacherExamPageList(data = {}) {
	return fetch({
		url: `/User/ActivityFlow/DoGetTeacherExamPageList`,
		method: 'post',
		data
	})
}
/**
 * 获取指导老师已审批分页列表
 */
export function UserAllTeacherAlreadyExamPageList(data = {}) {
	return fetch({
		url: `/User/ActivityFlow/DoGetTeacherAlreadyExamPageList`,
		method: 'post',
		data
	})
}
/**
 * 获取学院待审批分页列表
 */
export function UserAllCollegeExamPageList(data = {}) {
	return fetch({
		url: `/User/ActivityFlow/DoGetCollegeExamPageList`,
		method: 'post',
		data
	})
}
/**
 * 获取学院已审批分页列表
 */
export function UserAllCollegeAlreadyExamPageList(data = {}) {
	return fetch({
		url: `/User/ActivityFlow/DoGetCollegeAlreadyExamPageList`,
		method: 'post',
		data
	})
}
/**
 * 获取学校待审批分页列表
 */
export function UserAllSchoolExamPageList(data = {}) {
	return fetch({
		url: `/User/ActivityFlow/DoGetSchoolExamPageList`,
		method: 'post',
		data
	})
}
/**
 * 获取学校已审批分页列表
 */
export function UserAllSchoolAlreadyExamPageList(data = {}) {
	return fetch({
		url: `/User/ActivityFlow/DoGetSchoolAlreadyExamPageList`,
		method: 'post',
		data
	})
}
/**
 * 所有审批
 */
export function UserAllActivityFlowDoExam(data = {}) {
	return fetch({
		url: `/User/ActivityFlow/DoExam`,
		method: 'post',
		data
	})
}
/**
 * 所有审批详情
 */
export function UserAllActivityFlowDoGetDetail(data = {}) {
	return fetch({
		url: `/User/ActivityFlow/DoGetDetail`,
		method: 'post',
		data
	})
}
/**
 * 用户新闻列表
 */
export function UserDoGetNewsPageList(data = {}) {
	return fetch({
		url: `/Common/DoGetNewsPageList`,
		method: 'post',
		data
	})
}
/**
 * 用户新闻详情
 */
export function UserDoGetNewsDetail(data = {}) {
	return fetch({
		url: `/Common/DoGetNewsDetail`,
		method: 'post',
		data
	})
}
/**
 * 用户获取学分
 */
export function UserDoGetScoreList(data = {}) {
	return fetch({
		url: `/User/Center/DoGetScoreList`,
		method: 'post',
		data
	})
}
/**
 * 用户中心获取俱乐部申请记录
 */
export function UserCenterDoGetApplyClubList(data = {}) {
	return fetch({
		url: `/User/Center/DoGetApplyClubList`,
		method: 'post',
		data
	})
}
/**
 * 用户中心获取活动申请记录
 */
export function UserCenterDoGetApplyActivityList(data = {}) {
	return fetch({
		url: `/User/Center/DoGetApplyActivityList`,
		method: 'post',
		data
	})
}

/**
 * 退出俱乐部
 */
export function DoOutClub(data = {}) {
	return fetch({
		url: `/User/Club/DoOut`,
		method: 'post',
		data
	})
}
/**
 * 活动签到记录
 */
export function UserDoGetSignList(data = {}) {
	return fetch({
		url: `/User/Activity/DoGetSignList`,
		method: 'post',
		data
	})
}
/**
 * 邀请成员加入俱乐部
 */
export function UserDoInviteUser(data = {}) {
	return fetch({
		url: `/User/Club/DoInviteUser`,
		method: 'post',
		data
	})
}
/**
 * 退出登录
 */
export function DoLoginOut(data = {}) {
	return fetch({
		url: `/User/Center/DoLoginOut`,
		method: 'post',
		data
	})
}
/**
 * 上传头像
 */
export function UserDoUpdateBase64Image(data = {}) {
	return fetch({
		url: `/User/Center/DoUpdateBase64Image`,
		method: 'post',
		data
	})
}
/**
 * 修改头像
 */
export function UserDoSetHeadImage(data = {}) {
	return fetch({
		url: `/User/Center/DoSetHeadImage`,
		method: 'post',
		data
	})
}
/**
 * 已签到用户分页列表
 */
export function UserSignUserPageList(data = {}) {
	return fetch({
		url: `/User/ActivitySign/DoGetSignUserPageList`,
		method: 'post',
		data
	})
}
/**
 * 未签到用户分页列表
 */
export function UserNoSignUserPageList(data = {}) {
	return fetch({
		url: `/User/ActivitySign/DoGetNoSignUserPageList`,
		method: 'post',
		data
	})
}
/**
 * 设置二维码过期时间
 */
export function UserDoGetQRexpireTime(data = {}) {
	return fetch({
		url: `/Common/DoGetQRexpireTime`,
		method: 'post',
		data
	})
}
/**
 * 活动附件列表
 */
export function UserActivityFile(data = {}) {
	return fetch({
		url: `/User/ActivityFile/DoGetList`,
		method: 'post',
		data
	})
}
/**
 * 添加活动附件
 */
export function AddUserActivityFile(data = {}) {
	return fetch({
		url: `/User/ActivityFile/DoAdd`,
		method: 'post',
		data
	})
}

/**
 * 删除活动附件
 */
export function DeleteUserActivityFile(data = {}) {
	return fetch({
		url: `/User/ActivityFile/DoDelete`,
		method: 'post',
		data
	})
}
/**
 * 下载活动附件
 */
 export function DownUserActivityFile(data = {}) {
 	return fetch({
 		url: `/ActivityFile/DownFile?id=${data.id}`,
 		method: 'GET',
 		data
 	})
 }
 /**
  * 公告列表
  */
 
 export function GetClubNewsList(data = {}) {
 	return fetch({
 		url: `/User/ClubNews/DoGetPageList`,
 		method: 'post',
 		data
 	})
 }
 /**
  * 新增公告
  */
 
 export function DoAddClubNews(data = {}) {
 	return fetch({
 		url: `/User/ClubNews/DoAdd`,
 		method: 'post',
 		data
 	})
 }
 /**
  * 修改公告
  */
 
 export function DoUpdateClubNews(data = {}) {
 	return fetch({
 		url: `/User/ClubNews/DoUpdate`,
 		method: 'post',
 		data
 	})
 }
 /**
  * 删除公告
  */
 export function DoDeleteClubNews(data = {}) {
 	return fetch({
 		url: `/User/ClubNews/DoDelete`,
 		method: 'post',
 		data
 	})
 }
 /**
  * 公告回复列表
  */
 export function ClubNewsReplyList(data = {}) {
 	return fetch({
 		url: `/User/ClubNewsReply/DoGetPageList`,
 		method: 'post',
 		data
 	})
 }
 /**
  * 新增回复
  */
 export function AddClubNewsReplyList(data = {}) {
 	return fetch({
 		url: `/User/ClubNewsReply/DoAdd`,
 		method: 'post',
 		data
 	})
 }
 /**
  * 删除回复
  */
 export function DoDeleteClubNewsReply(data = {}) {
 	return fetch({
 		url: `/User/ClubNewsReply/DoDelete`,
 		method: 'post',
 		data
 	})
 }