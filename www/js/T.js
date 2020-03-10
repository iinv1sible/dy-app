angular
  .module("eomApp")
  .filter("T", [
    "$translate",
    function($translate) {
      return function(key) {
        if (key) {
          return $translate.instant(key);
        }
      };
    }
  ])
  .filter("regionFilter", function() {
    return (regions, searchKey) => {
      regions.forEach(region => {
        if (region.backup) {
          region.backup = false;
          region.rooms = region.oldRooms;
        }
      });
      //首先得到所有命中的区域 这些区域连同房间都将被保存下来
      let hittedRegions = regions.filter(
        region => region.name.indexOf(searchKey) !== -1
      );
      let otherRegions = regions.filter(
        region => region.name.indexOf(searchKey) === -1
      );
      otherRegions = otherRegions.filter(region => {
        let rooms = region.rooms;
        rooms = rooms.filter(room => room.name.indexOf(searchKey) !== -1);
        return rooms.length > 0;
      });
      otherRegions = otherRegions.map(region => {
        if (!region.backup) {
          region.backup = true;
          region.oldRooms = region.rooms;
        }
        region.rooms = region.rooms.filter(
          room => room.name.indexOf(searchKey) !== -1
        );
        return region;
      });
      let res = [...hittedRegions, ...otherRegions];
      return res;
    };
  });
