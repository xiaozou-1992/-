import Vue from 'vue';
import Router from 'vue-router';
/* login */
import register from '@/views/register.vue';
/* layout */
import Layout from '@/views/layout/Layout';
import index from '@/views/UserIndex/index';
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router);
export const constantRouterMap = [
	// {
	// 	path: '/register',
	// 	name: 'register',
	// 	component: _import('register')
	// },
	// {
	// 	path: '/login',
	// 	name: 'login',
	// 	component: _import('login')
	// },
	{
		path: '/',
		component: Layout,
		children: [{
				path: '/',
				name: 'Home',
				component: _import('Home'),
			},
			{
				path: 'building',
				name: 'building',
				component: _import('building/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'role',
				name: 'role',
				component: _import('role/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'user',
				name: 'user',
				component: _import('user/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'depart',
				name: 'depart',
				component: _import('depart/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'classroom',
				name: 'classroom',
				component: _import('classroom/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'college',
				name: 'college',
				component: _import('college/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'disable',
				name: 'disable',
				component: _import('disable/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'logistics',
				name: 'logistics',
				component: _import('logistics/index'),
				meta: {
					keepAlive: true,
				}
			},
			{
				path: 'institute',
				name: 'institute',
				component: _import('institute/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'procedure',
				name: 'procedure',
				component: _import('procedure/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'actType',
				name: 'actType',
				component: _import('actType/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'supertube',
				name: 'supertube',
				component: _import('supertube/index'),
				meta: {
					keepAlive: true,
				},
			},
		
			{
				path: 'Admin',
				name: 'Admin',
				component: _import('Admin/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'SystemConfigure',
				name: 'SystemConfigure',
				component: _import('SystemConfigure/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'ClubManage',
				name: 'ClubManage',
				component: _import('ClubManage/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'ANoticeJoin',
				name: 'ANoticeJoin',
				component: _import('ClubManage/ANoticeJoin'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'ANoticeReply',
				name: 'ANoticeReply',
				component: _import('ClubManage/ANoticeReply'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'ClubType',
				name: 'ClubType',
				component: _import('BaseInfo/ClubType/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'ApplyForm',
				name: 'ApplyForm',
				component: _import('BaseInfo/ApplyForm/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'ApplyFormFieldType',
				name: 'ApplyFormFieldType',
				component: _import('BaseInfo/ApplyFormFieldType/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'ClubProject',
				name: 'ClubProject',
				component: _import('BaseInfo/ClubProject/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'ClubProjectTeacher',
				name: 'ClubProjectTeacher',
				component: _import('BaseInfo/ClubProjectTeacher/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'Depart',
				name: 'Depart',
				component: _import('BaseInfo/Depart/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'ClubTeacher',
				name: 'ClubTeacher',
				component: _import('BaseInfo/ClubTeacher/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'ClubManagerList',
				name: 'ClubManagerList',
				component: _import('BaseInfo/ClubManager/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'ClubMember',
				name: 'ClubMember',
				component: _import('BaseInfo/ClubMember/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'ApplyActivityForm',
				name: 'ApplyActivityForm',
				component: _import('BaseInfo/ApplyActivityForm/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'ApplyItemForm',
				name: 'ApplyItemForm',
				component: _import('BaseInfo/ApplyItemForm/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'StudentManage',
				name: 'StudentManage',
				component: _import('StudentManage/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'TeacherManage',
				name: 'TeacherManage',
				component: _import('TeacherManage/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'NewsManage',
				name: 'NewsManage',
				component: _import('NewsManage/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'NewsTypeList',
				name: 'NewsTypeList',
				component: _import('NewsManage/NewsTypeList'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'ApplyActivityFlow',
				name: 'ApplyActivityFlow',
				component: _import('BaseInfo/ApplyActivityFlow/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'ApplyItemFlow',
				name: 'ApplyItemFlow',
				component: _import('BaseInfo/ApplyItemFlow/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'ApplyItemType',
				name: 'ApplyItemType',
				component: _import('BaseInfo/ApplyItemType/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'ApplyItemNode',
				name: 'ApplyItemNode',
				component: _import('BaseInfo/ApplyItemNode/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'ActivityManage',
				name: 'ActivityManage',
				component: _import('ActivityManage/index'),
				meta: {
					keepAlive: true,
				},
			},

			{
				path: 'AdminEnclosure',
				name: 'AdminEnclosure',
				component: _import('ActivityManage/AdminEnclosure'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'ActivityType',
				name: 'ActivityType',
				component: _import('ActivityManage/ActivityType/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'CollegeActivityFlow',
				name: 'CollegeActivityFlow',
				component: _import('ActivityManage/CollegeActivityFlow'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'SchoolActivityFlow',
				name: 'SchoolActivityFlow',
				component: _import('ActivityManage/SchoolActivityFlow'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'EndActivityFlow',
				name: 'EndActivityFlow',
				component: _import('ActivityManage/EndActivityFlow'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'ActivityFlowDetail',
				name: 'ActivityFlowDetail',
				component: _import('ActivityManage/ActivityFlowDetail'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'ActivityDetail',
				name: 'ActivityDetail',
				component: _import('ActivityManage/ActivityDetail'),
				meta: {
					// keepAlive: true,
				},
			},
			{
				path: 'ActivityUpdate',
				name: 'ActivityUpdate',
				component: _import('ActivityManage/ActivityUpdate'),
				meta: {
					// keepAlive: true,
				},
			},
			{
				path: 'UserApplyItem',
				name: 'UserApplyItem',
				component: _import('UserApplyItem/index'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'UserApplyItemDetail',
				name: 'UserApplyItemDetail',
				component: _import('UserApplyItem/detail'),
				meta: {
					// keepAlive: true,
				},
			},
			{
				path: 'UserApplyItemUpdate',
				name: 'UserApplyItemUpdate',
				component: _import('UserApplyItem/update'),
				meta: {
					// keepAlive: true,
				},
			},
			{
				path: 'UserApplyItemFlowDetail',
				name: 'UserApplyItemFlowDetail',
				component: _import('UserApplyItemFlow/detail'),
				meta: {
					// keepAlive: true,
				},
			},
			{
				path: 'CollegeUserApplyItemFlow',
				name: 'CollegeUserApplyItemFlow',
				component: _import('UserApplyItemFlow/CollegeIndex'),
				meta: {
					keepAlive: true,
				},
			},
			{
				path: 'SchoolUserApplyItemFlow',
				name: 'SchoolUserApplyItemFlow',
				component: _import('UserApplyItemFlow/SchoolIndex'),
				meta: {
					keepAlive: true,
				},
			},
		]
	},
	{
		path: '/index',
		name: 'index',
		component: index,
		children: [{
				path: '/',
				name: 'userindex',
				component: _import('UserIndex/userindex'),
				meta: {
					breadcrumbName: '测试1',
				},
			},
			{
				path: '/ChooseClub',
				name: 'ChooseClub',
				component: _import('UserIndex/ChooseClub'),
				meta: {
					name: '测试',
					// keepAlive: true,
					breadcrumbName: '测试2',
				},
			},
			{
				path: '/Membermanage',
				name: 'Membermanage',
				component: _import('UserIndex/Membermanage'),
				meta: {
					name: '测试',
					// keepAlive: true,
					breadcrumbName: '测试2',
				},
			},
			{
				path: '/ApplyList',
				name: 'ApplyList',
				component: _import('UserIndex/ApplyList'),
				meta: {
					name: '测试',
					// keepAlive: true,
					breadcrumbName: '测试2',
				},
			},
			{
				path: '/UserActivitymanage',
				name: 'UserActivitymanage',
				component: _import('UserIndex/UserActivitymanage'),
				meta: {
					name: '测试',
					// keepAlive: true,
					breadcrumbName: '测试2',
				},
			},
			{
				path: '/ActivityMembermanage',
				name: 'ActivityMembermanage',
				component: _import('UserIndex/ActivityMembermanage'),
				meta: {
					name: '测试',
					// keepAlive: true,
					breadcrumbName: '测试2',
				},
			},
			{
				path: '/UserJoinActivity',
				name: 'UserJoinActivity',
				component: _import('UserIndex/UserJoinActivity'),
				meta: {
					name: '加入俱乐部活动',
					// keepAlive: true,
				},
			},
			{
				path: '/UserActivityApplyList',
				name: 'UserActivityApplyList',
				component: _import('UserIndex/UserActivityApplyList'),
				meta: {
					name: '加入活动申请列表',
					// keepAlive: true,
				},
			},
			{
				path: '/UserUpdateActivity',
				name: 'UserUpdateActivity',
				component: _import('UserIndex/UserUpdateActivity'),
				meta: {
					name: '',
					// keepAlive: true,
				},
			},
			{
				path: '/UserActivitySign',
				name: 'UserActivitySign',
				component: _import('UserIndex/UserActivitySign'),
				meta: {
					name: '',
					// keepAlive: true,
				},
			},
			{
				path: '/MoreJoinClub',
				name: 'MoreJoinClub',
				component: _import('UserIndex/MoreJoinClub'),
				meta: {
					name: '',
					// keepAlive: true,
				},
			},
			{
				path: '/MoreManageActivity',
				name: 'MoreManageActivity',
				component: _import('UserIndex/MoreManageActivity'),
				meta: {
					name: '',
					// keepAlive: true,
				},
			},
			{
				path: '/MoreManageClub',
				name: 'MoreManageClub',
				component: _import('UserIndex/MoreManageClub'),
				meta: {
					name: '',
					// keepAlive: true,
				},
			},
			{
				path: '/MoreJoinActivity',
				name: 'MoreJoinActivity',
				component: _import('UserIndex/MoreJoinActivity'),
				meta: {
					name: '',
					// keepAlive: true,
				},
			},
			{
				path: '/UserCreditApply',
				name: 'UserCreditApply',
				component: _import('UserIndex/UserCreditApply'),
				meta: {
					name: '积分项申请',
					// keepAlive: true,
				},
			},
			{
				path: '/UserCollegeNoApply',
				name: 'UserCollegeNoApply',
				component: _import('UserIndex/UserCollegeNoApply'),
				meta: {
					name: '学院待审批',
					// keepAlive: true,
				},
			},
			{
				path: '/UserCollegeOkApply',
				name: 'UserCollegeOkApply',
				component: _import('UserIndex/UserCollegeOkApply'),
				meta: {
					name: '学院已审批',
					// keepAlive: true,
				},
			},
			{
				path: '/UserSchoolNoApply',
				name: 'UserSchoolNoApply',
				component: _import('UserIndex/UserSchoolNoApply'),
				meta: {
					name: '学校待审批',
					// keepAlive: true,
				},
			},
			{
				path: '/UserSchoolOkApply',
				name: 'UserSchoolOkApply',
				component: _import('UserIndex/UserSchoolOkApply'),
				meta: {
					name: '学校已审批',
					// keepAlive: true,
				},
			},
			{
				path: '/UserTeacherNoApply',
				name: 'UserTeacherNoApply',
				component: _import('UserIndex/UserTeacherNoApply'),
				meta: {
					name: '指导老师待审批',
					// keepAlive: true,
				},
			},
			{
				path: '/UserTeacherOkApply',
				name: 'UserTeacherOkApply',
				component: _import('UserIndex/UserTeacherOkApply'),
				meta: {
					name: '指导老师已审批',
					// keepAlive: true,
				},
			},
			{
				path: '/UserNewsDetail',
				name: 'UserNewsDetail',
				component: _import('UserIndex/UserNewsDetail'),
				meta: {
					name: '新闻详情',
					// keepAlive: true,
				},
			},
			{
				path: '/UserApplyActivityRecord',
				name: 'UserApplyActivityRecord',
				component: _import('UserIndex/UserApplyActivityRecord'),
				meta: {
					name: '活动申请记录',
					// keepAlive: true,
				},
			},
			{
				path: '/UserApplyClubRecord',
				name: 'UserApplyClubRecord',
				component: _import('UserIndex/UserApplyClubRecord'),
				meta: {
					name: '俱乐部申请记录',
					// keepAlive: true,
				},
			},
			{
				path: '/ActivitySignRecord',
				name: 'ActivitySignRecord',
				component: _import('UserIndex/ActivitySignRecord'),
				meta: {
					name: '俱乐部申请记录',
					// keepAlive: true,
				},
			},
			{
				path: '/Enclosure',
				name: 'Enclosure',
				component: _import('UserIndex/Enclosure'),
				meta: {
					name: '附件',
					// keepAlive: true,
				},
			},
			{
				path: '/addEnclosure',
				name: 'addEnclosure',
				component: _import('UserIndex/addEnclosure'),
				meta: {
					name: '上传附件',
					// keepAlive: true,
				},
			},
			{
				path: '/NoticeJoin',
				name: 'NoticeJoin',
				component: _import('UserIndex/NoticeJoin'),
				meta: {
					name: '俱乐部公告',
					// keepAlive: true,
				},
			},
			{
				path: '/NoticeReply',
				name: 'NoticeReply',
				component: _import('UserIndex/NoticeReply'),
				meta: {
					name: '公告回复',
					// keepAlive: true,
				},
			},
			{
				path: '/UserNewList',
				name: 'UserNewList',
				component: _import('UserIndex/UserNewList'),
				meta: {
					name: '新闻列表',
					// keepAlive: true,
				},
			},
			{
				path: '/UserScoreRecord',
				name: 'UserScoreRecord',
				component: _import('UserIndex/UserScoreRecord'),
				meta: {
					name: '积分',
					// keepAlive: true,
				},
			},
			{
				path: '/MoreAllActivity',
				name: 'MoreAllActivity',
				component: _import('UserIndex/MoreAllActivity'),
				meta: {
					name: '所有活动',
					// keepAlive: true,
				},
			},
			{
				path: '/NoSignNumList',
				name: 'NoSignNumList',
				component: _import('UserIndex/NoSignNumList'),
				meta: {
					name: '未签到人员',
					// keepAlive: true,
				},
			},
			{
				path: '/SignNumList',
				name: 'SignNumList',
				component: _import('UserIndex/SignNumList'),
				meta: {
					name: '已签到人员',
					// keepAlive: true,
				},
			}
		]
	},


]
const router = new Router({
	mode: 'hash', // history 需要开启伪静态
	scrollBehavior: () => ({
		y: 0
	}),
	routes: constantRouterMap
})
export default router
