require('./config$');

function success() {
require('../..//app');
require('../../pages/index/index');
require('../../pages/addCarNo/addCarNo');
require('../../pages/parkManage/parkManage');
require('../../pages/parkOwnerManage/parkOwnerManage');
<<<<<<< HEAD
require('../../pages/searchPark/searchPark');
require('../../pages/parkInfo/parkInfo');
require('../../pages/rentParkingplace/rentParkingplace');
require('../../pages/myInfo/myInfo');
require('../../pages/setNickname/setNickname');
require('../../pages/memberDeals/memberDeals');
require('../../pages/applyCar/applyCar');
=======
require('../../pages/updateFeeInfo/updateFeeInfo');
require('../../pages/auditInfo/auditInfo');
require('../../pages/parkingManage/parkingManage');
>>>>>>> fe2c69843409fb670c1156e0a6e9e55fdc2593fe
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
