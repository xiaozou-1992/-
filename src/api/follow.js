import fetch from '@/utils/fetch'

// 获取用户分页列表
export function GetUserPageList(data = {}) {
	return fetch({
		url: '/api/User/GetPageList',
		method: 'POST',
		data
	})
}


// 获取用户分页列表
export function GetUserInfo(data = {}) {
	return fetch({
		url: '/api/User/GetUserInfo',
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

// 编辑学院审批人
export function UpdateDepartCharger(data = {}) {
	return fetch({
		url: '/api/Depart/UpdateCharger',
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


