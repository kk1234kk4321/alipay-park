require('./config$');

function success() {
require('../..//app');
require('../../pages/index/index');
require('../../pages/addCarNo/addCarNo');
require('../../pages/parkManage/parkManage');
require('../../pages/parkOwnerManage/parkOwnerManage');
require('../../pages/searchPark/searchPark');
require('../../pages/parkInfo/parkInfo');
require('../../pages/rentParkingplace/rentParkingplace');
require('../../pages/myInfo/myInfo');
require('../../pages/setNickname/setNickname');
require('../../pages/memberDeals/memberDeals');
require('../../pages/applyCar/applyCar');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
