require('./config$');
require('./importScripts$');
function success() {
require('../..//app');
require('../../pages/index/index');
require('../../pages/addCarNo/addCarNo');
require('../../pages/parkManage/parkManage');
require('../../pages/parkOwnerManage/parkOwnerManage');
require('../../pages/updateFeeInfo/updateFeeInfo');
require('../../pages/auditInfo/auditInfo');
require('../../pages/parkingManage/parkingManage');
require('../../pages/searchPark/searchPark');
require('../../pages/parkInfo/parkInfo');
require('../../pages/payFeets/payFeets');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
