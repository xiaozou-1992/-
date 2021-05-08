<template>
	<div class="aid">
		<div class="base">
			<p class="fixed-top">
				{{ JSON.stringify(text) == '{}' ? '新增活动签到' : '修改活动签到' }}
				<a-icon class="icon-close" @click="closeFunction" type="close-circle" />
			</p>
			<div class="main" id="new_message">
				<a-form-model ref="ruleForm" :model="form" :rules="rules">
					<a-form-model-item label="开始时间" prop="StartTime">
						<a-date-picker format="YYYY-MM-DD HH:mm:ss" v-model="form.StartTime" :show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }" />
					</a-form-model-item>
					<a-form-model-item label="结束时间" prop="EndTime">
						<a-date-picker format="YYYY-MM-DD HH:mm:ss" v-model="form.EndTime" :show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }" />
					</a-form-model-item>
					<a-form-model-item label="类型" prop="Type">
						<a-select :disabled="JSON.stringify(text) != '{}'" v-model="form.Type" optionFilterProp="children" showSearch
						 style="width:100%">
							<a-select-option v-for="(item, index) in TypeList" :key="index" :value="item.Key">{{ item.Value }}</a-select-option>
						</a-select>
					</a-form-model-item>
					<a-form-model-item label="签到地址" prop="Adress">
						<a-input placeholder="请在下方地图中选择签到地点" v-model="form.Adress" />
					</a-form-model-item>
					<div class="coordinateMap">
						<div class="coordinateMap_input">
						</div>
						<div id="map" class="map" style="width: 100%;height: 300px;">

						</div>
						<!-- <div id="myPageTop">
						    <table>
						        <tr>
						            <td>
						                <label>请输入关键字：</label>
						            </td>
						        </tr>
						        <tr>
						            <td>
						                <input id="tipinput"/>
						            </td>
						        </tr>
						    </table>
						</div> -->
					</div>
					<a-form-model-item label="" class="fixed-bottom">
						<a-button type="primary" @click="handleSubmit">{{ JSON.stringify(text) == '{}' ? '确认添加' : '确认修改' }}</a-button>
						<a-button style="margin-left: 10px;" @click="closeFunction">取消</a-button>
					</a-form-model-item>
				</a-form-model>
			</div>
		</div>
	</div>
</template>

<script>
	import moment from 'moment'
	import {
		AddUserActivitySign,
		UpdateUserActivitySign,
		DoGetActivitySignTypeList
	} from '@/api/follow';

	function setmarkerclick(e) {}

	function select(e) {
		placeSearch.setCity(e.poi.adcode);
		placeSearch.search(e.poi.name); //关键字查询查询
	}
	export default {
		props: {
			text: Object,
			ID: String
		},
		watch: {
			text: function(text) {
				if (JSON.stringify(text) == '{}') {
					this.GetTypeList()
					this.initMap()
					this.testevent()
				} else {
					this.form = text
				}
			}
		},
		data() {
			return {
				gradeYear: null,
				yearPickShow: false,
				loading: false,
				formLayout: 'horizontal',
				form: this.$form.createForm(this, {
					name: 'coordinated'
				}),
				TypeList: [],
				form: {
					StartTime: '',
					EndTime: '',
					Type: '',
					Adress: ''
				},
				rules: {
					StartTime: [{
						required: true,
						message: '请输入开始时间',
						trigger: 'change'
					}],
					EndTime: [{
						required: true,
						message: '请输入结束时间',
						trigger: 'change'
					}],
					Type: [{
						required: true,
						message: '请选择类型',
						trigger: 'change'
					}],
					Adress: [{
						required: false,
						message: '请输入签到地址',
						trigger: 'change'
					}]
				},
				lastDot: '',
				marker: null,
				lng: '',
				lat: '',
				placeSearch: {},
				Adress: ''
			};
		},
		created() {
			this.GetTypeList()
			this.initMap()
		},
		mounted() {
			this.initMap()
		},
		methods: {
			testevent() {

			},
			initMap() {
				let arr = [117.424138, 32.905756]
				let map = new AMap.Map('map', {
					resizeEnable: true, //是否监控地图容器尺寸变化
					zoom: 14.5, //初始化地图层级
					center: [117.424138, 32.905756] //初始化地图中心点
				});
				// let autoOptions = {
				//         input: "tipinput"
				//     };
				//     let auto = new AMap.Autocomplete(autoOptions);
				//      this.placeSearch =map.PlaceSearch({
				//         map: map
				//     });  //构造地点查询类
				//     AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
				AMap.plugin([
					'AMap.ToolBar',
					'AMap.Scale',
					'AMap.OverView',
					'AMap.MapType',
					'AMap.Geolocation',
					'AMap.Marker'
				], function() {
					// 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
					map.addControl(new AMap.ToolBar());

					// 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
					map.addControl(new AMap.Scale());

					// 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
					map.addControl(new AMap.OverView({
						isOpen: false
					}));

					// 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
					map.addControl(new AMap.MapType());

					// 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
					5
				});
				map.on('click', (e) => {
					this.lng = e.lnglat.getLng()
					this.lat = e.lnglat.getLat()
					this.$set(this.form, 'Adress', e.lnglat.getLng() + "," + e.lnglat.getLat())
					let that = this
					AMap.plugin('AMap.Geocoder', function() {
						var geocoder = new AMap.Geocoder({
							city: '010'
						})
						var lnglat = [e.lnglat.getLng(), e.lnglat.getLat()]
						geocoder.getAddress(lnglat, function(status, result) {
							if (status === 'complete' && result.info === 'OK') {
								that.addDot(map, result.regeocode.formattedAddress)
							}
						})
					})
				})
				if (this.marker) {
					this.marker.setMap(null);
					this.marker = null;
				}
			},
			lnglatChange() {
				this.addDot()
				map.setFitView();
			},
			addDot(map, address) {
				if (this.marker) {
					this.marker.setMap(null);
					this.marker = null;
				}
				this.marker = new AMap.Marker({
					position: new AMap.LngLat(this.lng, this.lat),
					label: {
						content: address,
						offset: new AMap.Pixel(0, -34),
						direction: 'center'
					}
				});
				let lnglat = {}
				lnglat.lng = Number(this.lng)
				lnglat.lat = Number(this.lat)
				this.$emit("giveLnglat", lnglat);
				map.add(this.marker);
				AMap.event.addListener(this.marker, 'click', setmarkerclick);
			},
			filterOption(input, option) {
				return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
			},
			moment,
			async GetTypeList() {
				let data = {}
				let res = await DoGetActivitySignTypeList(data)
				if (res.data.code == 0) {
					this.TypeList = res.data.data
				}
			},
			closeFunction() {
				this.$emit('closeFun');
				this.form = {};
			},
			handleSubmit(e) {
				if (this.form.StartTime) {
					this.form.StartTime = moment(this.form.StartTime).format('YYYY-MM-DD HH:mm:ss')
				}
				if (this.form.EndTime) {
					this.form.EndTime = moment(this.form.EndTime).format('YYYY-MM-DD HH:mm:ss')
				}
				this.$refs.ruleForm.validate(async valid => {
					if (valid) {
						let data = this.form;
						data.ActivityID = this.ID
						let res = {};
						if (JSON.stringify(this.text) == '{}') {
							res = await AddUserActivitySign(data);
						} else {
							res = await UpdateUserActivitySign(data);
						}
						if (res.data.code === 0) {
							this.$message.success(res.data.msg);
							this.closeFunction('1');
						} else {
							this.$message.error(res.data.msg);
						}
					} else {
						return false;
					}
				});
			},
		}
	};
</script>

<style lang="less" scoped>
	.aid {
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		top: 0px;
		left: 0px;
		z-index: 999;
	}

	.base {
		position: absolute;
		width: 700px;
		height: 680px;
		border-radius: 14px;
		background: #fff;
		left: 50%;
		margin-left: -350px;
		top: 50%;
		margin-top: -320px;
		overflow-y: auto;

		.main {
			height: 90%;
			overflow-y: scroll;
		}

		/deep/.ant-form {
			margin-top: 50px;
			padding-bottom: 50px;

			/deep/.ant-calendar-picker {
				width: 100%
			}

			.ant-upload-list-picture-card-container {
				width: 80px;
				height: 80px;
			}
		}

		/deep/.ant-form-item {
			margin: 20px 50px;

			/deep/.ant-form-item-label {
				width: 100px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				text-align: right;
			}

			/deep/.ant-form-item-control-wrapper {
				flex: 1;
			}
		}
	}

	.fixed-top {
		width: inherit;
		position: absolute;
		line-height: 30px;
		top: 0px;
		background-color: white;
		z-index: 999;
		padding: 10px 0 5px 10px;

		.icon-close {
			font-size: 20px;
			float: right;
			margin: 5px 10px;
		}
	}

	.fixed-bottom {
		width: 164px;
		left: 50%;
		bottom: 0px;
		margin: 0px 0px 0px -82px !important;
		position: absolute;
		background-color: white;
		z-index: 999;
	}

	.button-group {
		position: absolute;
		bottom: 20px;
		right: 20px;
		font-size: 12px;
		padding: 10px;
	}

	.button-group .button {
		height: 28px;
		line-height: 28px;
		background-color: #0D9BF2;
		color: #FFF;
		border: 0;
		outline: none;
		padding-left: 5px;
		padding-right: 5px;
		border-radius: 3px;
		margin-bottom: 4px;
		cursor: pointer;
	}

	.button-group .inputtext {
		height: 26px;
		line-height: 26px;
		border: 1px;
		outline: none;
		padding-left: 5px;
		padding-right: 5px;
		border-radius: 3px;
		margin-bottom: 4px;
		cursor: pointer;
	}

	#tip {
		background-color: #fff;
		padding-left: 10px;
		padding-right: 10px;
		position: absolute;
		font-size: 12px;
		right: 10px;
		top: 20px;
		border-radius: 3px;
		border: 1px solid #ccc;
		line-height: 30px;
	}

	.amap-info-content {
		font-size: 12px;
	}

	#myPageTop {
		position: absolute;
		top: 300px;
		right: 100px;
		background: #fff none repeat scroll 0 0;
		border: 1px solid #ccc;
		margin: 10px auto;
		padding: 6px;
		font-family: "Microsoft Yahei", "微软雅黑", "Pinghei";
		font-size: 14px;
	}

	#myPageTop label {
		margin: 0 20px 0 0;
		color: #666666;
		font-weight: normal;
	}

	#myPageTop input {
		width: 170px;
	}

	#myPageTop .column2 {
		padding-left: 25px;
	}
</style>
