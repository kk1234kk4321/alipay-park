require('./config$');

function success() {
require('../..//app');
require('../../pages/index/index');
require('../../pages/addCarNo/addCarNo');
require('../../pages/parkManage/parkManage');
require('../../pages/parkOwnerManage/parkOwnerManage');
require('../../pages/updateFeeInfo/updateFeeInfo');
require('../../pages/auditInfo/auditInfo');
require('../../pages/parkingManage/parkingManage');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
