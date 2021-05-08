<template>
	<div>
		<div class="h2">参数设置</div>
		<div>
			<a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" @submit="handleSubmit">
				<a-form-item v-for="(item, index) in list" :key="index" :label="item.Name">
					<a-input v-if="item.Key!='TeacherIsCountersign'"
						v-decorator="[
							item.Key,
							{ rules: [{ required: true, message:item.Name + '不能为空' }] }
						]"
						:suffix="item.Key=='QRexpireTime'?'秒':item.Key=='SportsUpdateDayNum'?'天':'个'"
					/>
					<a-radio-group v-if="item.Key=='TeacherIsCountersign'"
					v-decorator="[
							item.Key,
							{ rules: [{ required: true, message:item.Name + '不能为空' }] }
						]">
					        <a-radio value="true">
					          是
					        </a-radio>
					        <a-radio value="false">
					          否
					        </a-radio>
					      </a-radio-group>
					<a-button type="primary" html-type="submit" @click="handleSubmit1(item.Key)">保存</a-button></a-form-item>
				</a-form-item>
				<!-- <a-form-item class="fixed-bottom" :wrapper-col="{ span: 12, offset: 5 }"><a-button type="primary" html-type="submit">提交</a-button></a-form-item> -->
			</a-form>
		</div>
	</div>
</template>

<script>
// import add from './add';
import Func from '@/utils/func';
import { GetSystemConfigure, UpdateSystemConfigure } from '@/api/follow';
export default {
	components: {
		// add
	},
	data() {
		return {
			formLayout: 'horizontal',
			form: this.$form.createForm(this, {
				name: 'coordinated'
			}),
			loading: false,
			list: [],
			key:{}
		};
	},
	computed: {},
	created() {
		this.getList();
	},
	mounted() {},
	methods: {
		async getList() {
			let that = this
			this.loading = true;
			let res = await GetSystemConfigure();
			this.loading = false;
			console.log(res.data.data);
			this.list = res.data.data;
			
			
			setTimeout(function() {
				let list=[]
				list = that.list
				for (var i = 0; i < list.length; i++) {
					that.form.setFieldsValue({
						[list[i].Key]: list[i].Value
					});
				}
			},300)
			
		},
		handleSubmit1(e) {
			console.log(e)
			this.key = e
		},
		handleSubmit(e) {
			e.preventDefault();
			this.form.validateFields(async (err, values) => {
				if (!err) {
					let data = {key:'',Value:''};
					data.key = this.key
					data.Value = values[this.key]
					console.log(data)
					let res = await UpdateSystemConfigure(data);
					if (res.data.code == 0) {
						this.$message.success(res.data.msg);
					}
				}
			});
		}
	}
};
</script>

<style lang="less" scoped>
/deep/.ant-form-item {
	margin: 4px 50px;
	/deep/.ant-form-item-label {
		width: 200px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		text-align: right;
	}
	/deep/.ant-form-item-control-wrapper {
		flex: 1;
		/deep/.ant-calendar-picker,
		/deep/.ant-time-picker {
			width: 100%;
		}
		/deep/.ant-form-item-children,/deep/.ant-radio-group {
			width: 100%;
		}
		
	}
}
</style>
