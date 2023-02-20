import {
  get,
  post,
  Delete,
  put,
  UploadFile,
  jsonPost
} from './http';
export const getOperate = data => get('common/getOperate', data) //获取侧边栏
export const getThirdPermission = data => get('common/getThirdPermission', data) //获取模块的具体权限
export const exit = data => get('login/exit', data) //用户退出
export const dologin = data => get('login/login', data) //登陆
export const getProvinces = data => get('common/getProvinces', data) //获取省
export const getCitys = data => get('common/getCitys', data) //获取市
export const getAreas = data => get('common/getAreas', data) //获取区
export const getStreets = data => get('common/getStreets', data) //获取街道
export const getSysAddress = data => get('system/getSysAddress', data) //获取街道
export const getBusinessAreas = data => get('common/getBusinessAreas', data) //获取业务区域
export const listAllCitys = data => get('common/listAllCitys', data) //获取所有市
//地址管理
export const listAddressSys = data => get('address/listAddressSys', data) //获取业务区域
export const hideAddressSys = data => post('address/hideAddressSys', data) //隐藏系统地址
export const editOrAddAddressSys = data => post('address/editOrAddAddressSys', data) //新增或者编辑系统地址
export const getAddressSysDetail = data => get('address/getAddressSysDetail', data) //获取系统地址详情
export const changeMachineToAddressSys = data => post('address/changeMachineToAddressSys', data) //地址绑定销售机
export const updateBlackSetting = data => post('address/updateBlackSetting', data) //地址绑定销售机
export const editLocation = data => post('address/editLocation', data) //编辑经纬度
export const getLocationById = data => post('address/getLocationById', data) //获取解析出来的经纬度
//订单管理
export const orderList = data => get('order/orderList', data) //获取订单列表
export const getOrderDetail = data => get('order/getOrderDetail', data) //获取订单
export const getAddRefunFlag = data => post('order/addRefundFlag', data) //添加退款标记
export const MachOrderList = data => get('machOrder/MachOrderList', data) //获取销售机订单
export const refundMachOrder = data => post('machOrder/refundMachOrder', data) //销售机订单退款
export const orderTableList = data => get('order/orderTableList', data) //获取订单报表列表
export const expOrderTableList = data => get('order/expOrderTableList', data) //获取订单报表导出数据
export const editOrderExportState = data => post('order/editOrderExportState', data) //订单报表列表改为已导出
export const erpTableList = data => get('order/erpTableList', data) //业务系统上报列表
export const editJobExportState = data => post('order/editJobExportState', data) //业务系统上报列表
export const getErpDetail = data => get('order/getErpDetail', data) //业务系统上报详情
export const getOrderSendList = data => post('order/getOrderSendList', data) //获取系统业务配送单
export const getOrderCardTableList = data => post('order/orderCardTableList', data) //获取就餐卡列表
export const orderCardTableListExp = data => post('order/orderCardTableListExp', data) //获取就餐卡列表
export const saveComplains = data => post('machOrder/saveComplains', data) //取奶投诉信息录入
export const saveExamine = data => post('machOrder/saveExamine', data) //取奶信息审核
export const changeOrderAddress = data => post('order/changeOrderAddress', data) //编辑订单地址
export const getComplainsDetails = data => post('machOrder/getComplainsDetails', data) //编辑订单地址



//会员管理
export const listUser = data => post('user/listUser', data) //获取用户列表
export const getUserDetail = data => get('user/getUserDetail', data) //获取用户详情
export const unbindPhone = data => post('user/unbindPhone', data) //解除电话绑定
export const unbindThird = data => post('user/unbindThird', data) //解除第三方绑定
export const listAppeal = data => get('user/listAppeal', data) //获取申诉列表
export const delAddressByAdmin = data => post('user/delAddressByAdmin', data) //删除用户地址
export const appealDetail = data => get('user/appealDetail', data) //获取申诉详情
export const resolveAppeal = data => post('user/resolveAppeal', data) //处理申诉
//积分管理
export const pointList = data => get('point/pointList', data) //获取积分列表
export const userPointList = data => get('point/userPointList', data) //获取用户积分列表
export const editUserPoint = data => post('point/editUserPoint', data) //编辑用户积分列表
export const exportUserPoint = data => post('point/exportUserPoint', data) //编辑用户积分列表
//商品管理
export const listProduct = data => get('product/listProduct', data) //获取商品列表
export const getProductDetail = data => get('product/getProductDetail', data) //获取商品详情
export const cancleOrOpenLinshi = data => post('product/cancleOrOpenLinshi', data) //取消或者开启商品临时送
export const upOrDownProduct = data => post('product/upOrDownProduct', data) //上下架商品
export const delProduct = data => post('product/delProduct', data) //删除商品
export const listAllClass = data => get('product/listAllClass', data) //所有商品分类列表
export const listProductClass = data => get('product/listProductClass', data) //获取商品分类列表
export const upProductClass = data => post('product/upProductClass', data) //上升商品分类
export const downProductClass = data => post('product/downProductClass', data) //下降商品分类
export const addProductClass = data => post('product/addProductClass', data) //下降商品分类
export const delProductClass = data => post('product/delProductClass', data) //删除商品分类
export const addProduct = data => post('product/addProduct', data) //新增商品
export const editProduct = data => post('product/editProduct', data) //编辑商品
export const listChooseProduct = data => get('product/listChooseProduct', data) //获取商品分类列表
export const delChooseProduct = data => post('product/delChooseProduct', data) //删除
export const addOrEditCityConfig = data => post('product/addOrEditCityConfig', data) //新增或编辑城市规则设置
export const delectCityConfig = data => post('/product/delectCityConfig', data) //删除城市规则设置
export const selectCityConfig = data => post('/product/selectCityConfig', data) //查询城市规则设置
export const selectAllList = data => post('/product/selectAllList', data) //查询所有商品列表
export const selectCityByProductId = data => post('/product/selectCityByProductId', data) //商品id所对应的城市id与
export const selectEditCityConfig = data => post('/product/selectEditCityConfig', data)//编辑查询
//审核管理
export const reviewOrder = data => post('review/reviewOrder', data) //审核订单
export const refundOrder = data => post('order/refundOrder', data) //订单退款
export const userAddressList = data => get('review/userAddressList', data) //用户地址列表
export const reviewUserAddress = data => post('review/reviewUserAddress', data) //审核用户地址
export const setBsUserId = data => post('review/setBsUserId', data) //设置业务系统账户ID
export const getAddressDetail = data => get('review/getAddressDetail', data) //获取用户地址详情
export const getUsers = data => get('review/getUsers', data) //获取地址下的用户
export const listOrderSend = data => get('review/orderSendList', data) //获取审核订单列表
export const reviewOrderSend = data => post('review/reviewOrderSend', data) //审核配送单
export const getOrderSendDetail = data => get('review/getOrderSendDetail', data) //配送单详情
export const getFourthAddressID = data => get('common/getFourthAddressID', data) //获取四级地址

//首页
export const upload = data => post('common/upload', data) //上传图片
export const uploadFile = data => post('common/importFile', data) //上传文件
export const listHomeBanner = data => get('home/listHomeBanner', data) //首页轮播图列表
export const editOrAddBanner = data => post('home/editOrAddBanner', data) //编辑或者新增首页轮播图
export const getBannerDetail = data => get('home/getBannerDetail', data) //获取轮播图详情
export const upBanner = data => post('home/upBanner', data) //上升轮播图
export const downBanner = data => post('home/downBanner', data) //下降轮播图
export const delBanner = data => post('home/delBanner', data) //删除轮播图
export const listHotGoods = data => get('home/listHotGoods', data) //首页热门商品列表
export const downHotGoods = data => post('home/downHotGoods', data) //热门商品下移
export const upHotGoods = data => post('home/upHotGoods', data) //热门商品上移
export const delHotGoods = data => post('home/delHotGoods', data) //删除热门商品
export const addHotGoods = data => post('home/addHotGoods', data) //新增热门商品
export const editHotGoods = data => post('home/editHotGoods', data) //编辑热门商品
export const getHotGoodsDetail = data => get('home/getHotGoodsDetail', data) //热门商品详情
export const listShortcut = data => get('home/listShortcut', data) //首页快捷菜单列表
export const addOrEditShortcut = data => post('home/addOrEditShortcut', data) //编辑或新增快捷菜单
export const delShortcut = data => post('home/delShortcut', data) //删除快捷菜单
export const getShortcutDetail = data => get('home/getShortcutDetail', data) //获取快捷菜单详情
export const upShortcut = data => post('home/upShortcut', data) //上移快捷菜单
export const downShortcut = data => post('home/downShortcut', data) //下降快捷菜单
export const listShortcutNew = data => post('home/listShortcutNew', data) //新快捷菜单列表
export const delShortcutNew = data => post('home/delShortcutNew', data) //删除新快捷菜单/cms/
export const upOrDownShortcut = data => post('home/upOrDownShortcut', data) //上移下降新快捷菜单
export const saveOrUpdateShortcutNew = data => post('home/saveOrUpdateShortcutNew', data)//新快捷菜单新增编辑
//数据字典
export const listBusinessArea = data => get('data/listBusinessArea', data) //业务区域列表
export const addOrEditBusinessArea = data => post('data/addOrEditBusinessArea', data) //新增或编辑业务区域
export const getBusinessAreaDetail = data => get('data/getBusinessAreaDetail', data) //获取业务区域详情
export const showOrHideBusinessArea = data => post('data/showOrHideBusinessArea', data) //显示或隐藏业务区域
export const listProvince = data => get('data/listProvince', data) //省份列表
export const addOrEditProvince = data => post('data/addOrEditProvince', data) //新增或编辑省份
export const listCity = data => get('data/listCity', data) //城市列表
export const addOrEditCity = data => post('data/addOrEditCity', data) //新增或编辑城市
export const listArea = data => get('data/listArea', data) //地区列表
export const listStreet = data => get('data/listStreet', data) //街道列表
export const addOrEditArea = data => post('data/addOrEditArea', data) //新增或编辑地区
export const addOrEditStreet = data => post('data/addOrEditStreet', data) //新增或编辑街道
export const addAgreement = data => post('data/addAgreement', data) //新增用户协议
export const getUserAgreement = data => get('data/getUserAgreement', data) //获取用户协议
export const getPrivacyAgreement = data => get('data/getPrivacyAgreement', data) //获取隐私政策
export const getServiceAgreement = data => get('data/getServiceAgreement', data) //获取服务条款
export const getCompanyAgreement = data => get('data/getCompanyAgreement', data) //获取用户协议
export const getAgreement = data => get('data/getAgreement', data) //获取隐私政策简要版、个人信息收集清单、个人信息共享清单、应用权限说明


export const getPcCompanyAgreement = data => get('pc/getAgreement', data) //获取PC端企业介绍
export const addPcCompanyAgreement = data => post('pc/addAgreement', data) //新增/保存PC端企业介绍

// PC管理
// 图片配置
export const getPcImage = data => post('pc/getPcImage', data) //获取图片配置信息
export const savePcImage = data => post('pc/saveImage', data) //新增/保存图片配置信息

// 企业荣誉管理
export const getHonour = data => post('pc/getHonour', data) //获取企业荣誉管理信息
export const saveHonour = data => post('pc/saveHonour', data) //保存企业荣誉管理信息
export const deleteHonour = data => post('pc/deleteHonour', data) //删除企业荣誉管理信息
export const upHonour = data => post('pc/upHonour', data) //升序企业荣誉管理信息
export const downHonour = data => post('pc/downHonour', data) //降序企业荣誉管理信息
export const updateHonour = data => post('pc/updateHonour', data) //降序企业荣誉管理信息

// 企业文化管理
export const saveOrEditEnterpriseCulture = data => post('pc/saveOrEditEnterpriseCulture', data) //新增/保存企业文化
export const getAllEnterpriseCulture = data => post('pc/getAllEnterpriseCulture ', data) //获取所有企业文化信息列表
export const deleteEnterpriseCulture = data => post('pc/deleteEnterpriseCulture  ', data) //删除企业文化信息




// pc资讯管理
export const pcListInfoCatPage = data => get('pc/listInfoCatPage', data) //所有PC资讯分类列表
export const pcUpInfoCat = data => post('pc/upInfoCat', data) //上升PC资讯分类
export const pcDownInfoCat = data => post('pc/downInfoCat', data) //下降PC资讯分类
export const pcAddOrEditInfoCat = data => post('pc/addOrEditInfoCat', data) //新增PC资讯分类
export const pcDelInfoCat = data => post('pc/delInfoCat', data) //删除PC资讯分类

export const pcListInfo = data => get('pc/listInfo', data) //PC资讯列表
export const pcDelInfo = data => post('pc/delInfo', data) //删除PC资讯
export const pcListInfoCat = data => get('pc/listInfoCat', data) //所有PC资讯分类列表
export const pcGetInfoDetail = data => get('pc/getInfoDetail', data) //获取PC资讯详情
export const listCompanyInfo = data => post('info/listCompanyInfo', data) //企业列表
export const upOrDownCompanyInfo = data => post('info/upOrDownCompanyInfo', data) //企业排序升降
export const saveOrUpdateCompanyInfo = data => post('info/saveOrUpdateCompanyInfo', data) //企业新增编辑
export const delCompanyInfo = data => post('info/delCompanyInfo', data) //企业删除
// pc操作说明管理
export const pcListCommon = data => get('pc/listCommon', data) //常见问题及操作说明列表
export const pcEditOrAddCommon = data => post('pc/editOrAddCommon', data) //编辑或新增常见问题及操作说明
export const pcDelCommon = data => post('pc/delCommon', data) //删除常见问题及操作说明


// PC店铺管理
export const getAllStore = data => post('pc/getAllStore', data) //获取所有店铺列表
export const saveOrEditStore = data => post('pc/saveOrEditStore', data) //新增/保存店铺
export const deletePcStore = data => post('pc/deletePcStore', data) //删除店铺


// PC发展历程管理
export const getDevelopment = data => post('pc/getDevelopment', data) //PC获取所有历史进程
export const deleteDevelopment = data => post('pc/deleteDevelopment', data) //PC删除历史进程
export const saveOrEditDevelopment = data => post('pc/saveOrEditDevelopment', data) //PC新增/编辑历史进程



//系统配置
export const getTipByType = data => get('system/getTipByType', data) //获取提示配置
export const editTipByType = data => post('system/editTipByType', data) //编辑提示配置
export const getNineRule = data => get('system/getNineRule', data) //获取九点原则
export const editOrAddNineRule = data => post('system/editOrAddNineRule', data) //新增或编辑九点原则
export const editOrAddOrderDays = data => post('system/editOrAddOrderDays', data) //新增或编辑可选天数
export const editOrAddOrderSendModels = data => post('system/editOrAddOrderSendModels', data) //新增或编辑配送模式
export const getOrderSendModels = data => get('system/getOrderSendModels', data) //获取配送模式列表
export const getOrderSendModelDetail = data => get('system/getOrderSendModelDetail', data)
export const getOrderDays = data => get('system/getOrderDays', data) //获取正常模式下下单可以选择的天数列表
export const delOrderChoose = data => post('system/delOrderChoose', data) //删除下单选择
export const getSystemConfig = data => get('system/getSystemConfig', data) //获取系统配置
export const addOrEditConfig = data => post('system/addOrEditConfig', data) //新增或者编辑系统配置
export const getPayConfig = data => get('system/getPayConfig', data) //获取系统配置
export const editPayConfig = data => post('system/editPayConfig', data) //修改支付配置
export const upPayConfig = data => post('system/upPayConfig', data) //上升支付配置
export const downPayConfig = data => post('system/downPayConfig', data) //下降支付配置
export const editOrAddSendCount = data => post('system/editOrAddSendCount', data) //编辑数量规则配置
export const delSendCount = data => post('system/delSendCount', data) //删除数量规则配置
export const listSendCount = data => get('system/listSendCount', data) //获取数量规则配置
export const getSystemConfigMaxSms = data => get('system/getSystemConfigMaxSms', data) //获取验证码次数配置
export const editSystemConfigMaxSms = data => post('system/editSystemConfigMaxSms', data) //编辑验证码次数配置
export const getSysAddressByKey = data => post('system/getSysAddressByKey', data)//根据关键字模糊查询系统地址
export const listSysParam = data => post('system/listSysParam', data)//系统参数配置表单
export const saveAndUpdateSysParam = data => post('system/saveAndUpdateSysParam', data)//新增/修改系统参数配置
export const delSysParam = data => post('system/delSysParam', data)//删除系统参数配置
//消息管理
export const sysMessageList = data => get('message/sysMessageList', data) //获取系统消息
export const delMessage = data => post('message/delMessage', data) //删除消息
export const getSysMessageDetail = data => get('message/getSysMessageDetail', data) //获取系统消息详情
export const addMessage = data => post('message/addMessage', data) //新增消息
export const addMessageModel = data => post('message/addMessageModel', data) //新增消息模板
export const getMessageModel = data => get('message/getMessageModel', data) //获取消息模版

// 资讯
export const listInfo = data => get('info/listInfo', data) //资讯列表
export const getInfoDetail = data => get('info/getInfoDetail', data) //获取资讯详情
export const delInfo = data => post('info/delInfo', data) //删除资讯
export const listInfoCat = data => get('info/listInfoCat', data) //所有资讯分类列表
export const listInfoCatPage = data => get('info/listInfoCatPage', data) //所有资讯分类列表
export const upInfoCat = data => post('info/upInfoCat', data) //上升资讯分类
export const downInfoCat = data => post('info/downInfoCat', data) //下降资讯分类
export const addOrEditInfoCat = data => post('info/addOrEditInfoCat', data) //新增资讯分类
export const delInfoCat = data => post('info/delInfoCat', data) //删除资讯分类
export const getLinkList = data => post('info/getLinkList', data) // 获取链接列表
export const getLinkDetailById = data => post('info/getLinkDetailById', data) // 获取详情
export const getLinkDetailByTitle = data => post('info/getLinkDetailByTitle', data) // 按关键字搜索
export const getLinkDel = data => post('info/deleteLink', data) // 删除链接
export const getLinkAdd = data => post('info/addLink', data) // 新增链接
export const LinkUpdate = data => post('info/updateLink', data) // 编辑外链












// 用户管理
export const listManager = data => get('manager/listManager', data) //管理员列表
export const getRoleList = data => get('manager/getRoleList', data) //管理员列表
export const getManagerDetail = data => get('manager/getManagerDetail', data) //管理员列表
export const delManager = data => post('manager/delManager', data) //删除管理员
export const listRole = data => get('manager/listRole', data) //角色列表
export const getRoleDetail = data => get('manager/getRoleDetail', data) //角色信息
export const addOrEditManager = data => post('manager/addOrEditManager', data) //修改管理员信息
export const changeManagerPwd = data => post('manager/changeManagerPwd', data) //修改管理员密码
export const delRole = data => post('manager/delRole', data) //删除角色
export const listPermissionAllByLevel = data => get('manager/listPermissionAllByLevel', data) //权限列表
export const editOrAddRole = data => post('manager/editOrAddRole', data) //修改角色
//其它
export const listVersion = data => get('other/listVersion', data) //版本管理列表
export const delVersion = data => post('other/delVersion', data) //删除版本
export const editOrAddVersion = data => post('other/editOrAddVersion', data) //新增或编辑版本
export const publishVersion = data => post('other/publishVersion', data) //发布版本
export const listFeedBack = data => get('other/listFeedBack', data) //意见反馈列表
export const feedBackDetail = data => get('other/feedBackDetail', data) //意见反馈详情
export const editFeedBack = data => post('other/editFeedBack', data) //编辑意见反馈
export const listCommon = data => get('other/listCommon', data) //常见问题及操作说明列表
export const delCommon = data => post('other/delCommon', data) //删除常见问题及操作说明
export const editOrAddCommon = data => post('other/editOrAddCommon', data) //编辑或新增常见问题及操作说明
export const commonDetail = data => get('other/commonDetail', data) //常见问题详情


// pc操作说明
export const pcCommonDetail = data => get('pc/commonDetail', data) //常见问题详情





// 获取PC的轮播图
export const listPcBanner = data => get('pc/listPcBanner', data);
export const PceditOrAddBanner = data => post('pc/editOrAddBanner', data);
export const PcgetBannerDetail = data => get('pc/getBannerDetail', data);
export const PcdelBanner = data => post('pc/delBanner', data);
export const PcupBanner = data => post('pc/upBanner', data);
export const PcdownBanner = data => post('pc/downBanner', data);

// 更换业务区域接口
export const changeUserBusinessArea = data => post('user/changeUserBusinessArea', data);

// 配送模式管理
export const getShippingModel = data => post('shipping/getShippingModel', data); //获取配送模式
export const changeShippingModelStatus = data => post('shipping/changeShippingModelStatus', data); //改变配送模式状态
export const changeShippingModelType = data => post('shipping/changeShippingModelType', data); //改变配送模式状态
export const getShippingPrice = data => post('shipping/getShippingPrice', data); //获取配送费用
export const changeShippingPrice = data => post('shipping/changeShippingPrice', data); //新增、修改配送费用



export const getExcelTableByCus = data => get('system/getExcelTableByCus', data); //导出数据

//运费模版模块接口
//获取所有省市区
export const getAllProvinceCityArea = (data) => get('api/market/delivery/getAllProvinceCityArea', data)
//获取运费模板列表
export const getDeliveryTemplateList = (data) =>
	get('api/market/delivery/getDeliveryTemplateList', data)

//编辑或新增运费模板
export const updateDeliveryTemplate = (data) =>
	post('api/market/delivery/updateDeliveryTemplate', data)

//删除运费模板
export const deleteDeliveryTemplate = (data) =>
	post('api/market/delivery/deleteDeliveryTemplate', data)
//获取运费模板详情
export const getDeliveryTemplateDetail = (data) =>
	get('api/market/delivery/getDeliveryTemplateDetail', data)
//获取快递公司列表
export const getDeliveryCompanyList = (data) =>
	get('api/market/delivery/getDeliveryCompanyList', data)

//根据城市名称模糊查询城市
export const getCityListByName = (data) =>
	get('api/market/delivery/getCityListByName', data)



//单次配送商品模块接口
//删除一条商品数据
export const singleProductDelete = (data) => get('api/single/product/delete', data)
//查询商品详情数据
export const singleProductDetail = (data) => get('api/single/product/detail', data)
//新增一条商品数据
export const singleProductInsert = (data) => jsonPost('api/single/product/insert', data)
//查询单次商品列表数据，有分页
export const singleProductList = (data) => get('api/single/product/paging/list', data)
//上架或下架
export const singleProductPut = (data) => get('api/single/product/put/away', data)
//查询所有商品数据，无分页
export const singleProductAllList = (data) => get('api/single/product/manage/list', data)
//编辑一条商品数据
export const singleProductUpdate = (data) => jsonPost('api/single/product/update', data)
//获取快递公司
export const getCompany = (data) =>
	get('api/single/delivery/company/list', data)

//产品运费模板配置
export const listprdNumber = (data) =>
	get('api/single/product/template/list', data)

export const listprdNumberAdd = (data) =>
jsonPost('api/single/product/template/add', data)

//单次配送分类api
//删除一条分类数据
export const singleCatDelete = (data) => get('api/single/product/cat/delete', data)
//新增一条分类数据
export const singleCatInsert = (data) => jsonPost('api/single/product/cat/insert', data)

//查询分类列表数据，有分页
export const singleCatList = (data) => get('api/single/product/cat/list', data)
//分类列表上升或下降
export const singleCatUp = (data) => get('api/single/product/cat/up/or/down', data)
//修改一条分类数据
export const singleCatUpdate = (data) => jsonPost('api/single/product/cat/update', data)

// 单次配送城市api
//删除一条城市数据
export const singleCityDelete = (data) => get('api/single/product/city/delete', data)
//新增一条城市数据
export const singleCityInsert = (data) => jsonPost('api/single/product/city/insert', data)
//查询城市列表数据，有分页
export const singleCityList = (data) => get('api/single/product/city/paging/list', data)
//修改一条城市数据
export const singleCityUpdate = (data) => jsonPost('api/single/product/city/update', data)
//查询所有单次商品数据
export const singleProductManageList = (data) => get('api/single/product/single/manage/list', data)

// 单次配送商品规格api
//删除一条规格数据
export const singleSpecDelete = (data) => get('api/single/product/spec/delete', data)
//新增一条规格数据
export const singleSpecInsert = (data) => jsonPost('api/single/product/spec/insert', data)
//上架或下架
export const singleSpecPutAway = (data) => get('api/single/product/spec/put/away', data)
//修改一条城市数据
export const singleSpecUpdate = (data) => jsonPost('api/single/product/spec/update', data)
//批量修改规格参数
export const singleSpecUpdateBatch = (data) => jsonPost('api/single/product/spec/update/batch', data)


//单次配送商品轮播图
//删除一条轮播数据
export const singleBannerDelete = (data) => get('api/single/product/banner/city/delete', data)
//新增一条轮播数据
export const singleBannerInsert = (data) => jsonPost('api/single/product/banner/city/insert', data)
//查询轮播列表数据有分页
export const singleBannerList = (data) => get('api/single/product/banner/city/paging/list', data)
//修改一条轮播数据
export const singleBannerUpdate = (data) => jsonPost('api/single/product/banner/city/update', data)

//单次配送订单api
//查询订单列表数据，有分页
export const singleOrderList = (data) => jsonPost('api/single/order/paging/list', data)
export const expSingleOrderTableList = (data) => jsonPost('api/single/order/expSingleOrderTableList', data)
export const viewSingleOrderLogistics = (data) => jsonPost('api/single/order/viewSingleOrderLogistics', data)
//查询订单详情数据
export const singleOrderDetail = (data) => get('api/single/order/detail', data)
//填写订单物流信息
export const singleOrderSubmit = (data) => jsonPost('api/single/order/submit', data)

//单次商品发票接口
//查询发票列表数据，有分页
export const singleOrderReceiptList = (data) => jsonPost('api/single/order/receipt/paging/list', data)
//查询发票详情数据
export const singleOrderReceiptDetail = (data) => get('api/single/order/receipt/detail', data)
// 获取售后列表
export const afterSalesPagingList = (data) => jsonPost('api/single/order/afterSales/paging/list',data)
// 审核售后
export const afterSalesExamine = (data) => jsonPost('api/single/order/afterSales/examine',data)
// 退款
export const afterSalesRefund = (data) => jsonPost('api/single/order/afterSales/refund',data)


// 字典
export const dictAdd = (data) => jsonPost('api/sys/dict/add',data)
export const dictEdit = (data) => jsonPost('api/sys/dict/edit',data)
export const dictDelete = (data) => get('api/sys/dict/delete',data)
export const dictPagingList = (data) => jsonPost('api/sys/dict/paging/list',data)

export const dictItemAdd = (data) => jsonPost('api/sys/dict/item/add',data)
export const dictItemEdit = (data) => jsonPost('api/sys/dict/item/edit',data)
export const dictItemDelete = (data) => get('api/sys/dict/item/delete',data)
export const dictItemPagingList = (data) => jsonPost('api/sys/dict/item/paging/list',data)


//快递已出单标记
export const editSingleOrderExportState =  (data) => jsonPost('api/single/order/editSingleOrderExportState', data)


// 获取售后列表
// export const afterSalesPagingList = (data) => jsonPost('api/single/order/afterSales/paging/list', data)
// 审核售后
// export const afterSalesExamine = (data) => jsonPost('api/single/order/afterSales/examine', data)
// 退款
// export const afterSalesRefund = (data) => jsonPost('api/single/order/afterSales/refund', data)


// 列表
export const addressPagingList = (data) => jsonPost('api/single/system/address/pagingList', data)
export const addressList = (data) => get('api/single/system/address/list', data)
export const addressAreaPage = (data) => jsonPost('api/single/system/address/areaPage', data)
// 详情
export const addressDetail = (data) => get('api/single/system/address/detail', data)
// 新增
export const addressAdd = (data) => jsonPost('api/single/system/address/add', data)
//修改
export const addressUpdate = (data) => jsonPost('api/single/system/address/update', data)
//删除
export const addressDelete = (data) => get('api/single/system/address/delete', data)

// 单次送商品
// 获取商品配置的省份列表
export const provinceList = (data) => get('api/single/product/province/list', data)
// 获取商品限制城市配置列表
export const cityList = (data) => get('api/single/product/city/list', data)

//新增商品配置的省份列表
export const productProvinceAdd = (data) => jsonPost('api/single/product/province/add', data)
//新增商品配置的省份列表
export const productCityAdd = (data) => jsonPost('api/single/product/city/add ', data)
//删除城市配置的城市列表
export const productCityDelete = (data) => get('api/single/product/city/delete', data)
//删除城市配置的城市列表
export const productProvinceDelete = (data) => get('api/single/product/province/delete', data)

//分类列表上升或下降
export const singleCityCatUp = (data) => get('api/single/product/spec/up/or/down', data)


/**
 * 热门城市开始
 */
// 列表
export const singleHotCity = (data) => jsonPost('api/single/hot/city/paging/list', data)
// 新增
export const singleHotInsert = (data) => jsonPost('api/single/hot/city/insert', data)
// 更新
export const singleHotUpdate = (data) => jsonPost('api/single/hot/city/update', data)
// 删除
export const singleHotDelete = (data) => get('api/single/hot/city/delete', data)
/**
 * 热门城市结束
 */

/**
 * 单词送轮播图新增销售城市按钮操作 开始
 */
export const bannerProvinceList = (data) => get('api/single/product/banner/province/list', data)

export const bannerCityList = (data) => get('api/single/product/banner/city/list', data)

export const bannerProductProvinceAdd = (data) => jsonPost('api/single/product/banner/province/add', data)

export const bannerProductCityAdd = (data) => jsonPost('api/single/product/banner/city/add ', data)

export const bannerProductCityDelete = (data) => get('api/single/product/banner/city/delete', data)

export const bannerProductProvinceDelete = (data) => get('api/single/product/banner/province/delete', data)
/**
 * 单词送轮播图新增销售城市按钮操作 结束
 */
