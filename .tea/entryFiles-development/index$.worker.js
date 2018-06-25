require('./config$');

function success() {
require('../..//app');
require('../../pages/index/index');
require('../../pages/addCarNo/addCarNo');
require('../../pages/parkManage/parkManage');
require('../../pages/parkOwnerManage/parkOwnerManage');
require('../../pages/searchPark/searchPark');
require('../../pages/parkInfo/parkInfo');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
