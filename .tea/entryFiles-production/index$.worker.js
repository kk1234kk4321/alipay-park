require('./config$');
require('./importScripts$');
function success() {
require('../..//app');
require('../../pages/index/index');
require('../../pages/addCarNo/addCarNo');
require('../../pages/parkManage/parkManage');
require('../../pages/parkOwnerManage/parkOwnerManage');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
