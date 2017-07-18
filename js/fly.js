(function (window) {
  'use strict';
  
  // FlyObj 就是 FlappyBird 游戏的全局对象
  var FlyObj = {};

  // 工具型的方法放到FlyObj对象中（ utils.js 存储所有的工具方法 ）
  // 因为 loadImage 方法，与游戏中的任何角色都没有关系
  FlyObj.loadImage = function (srcList, callback) {
    var count = 0,
      length = srcList.length,
      imgList = {};

    srcList.forEach(function (srcVal) {
      var img = new Image();
      img.src = './images/' + srcVal + '.png';
      imgList[srcVal] = img;
      img.onload = function () {
        count++;
        if (count >= length) {
          // 此时，就说明所有图片都加载完成
          callback(imgList);
        }
      };
    });
  };

  // 暴露到全局环境中
  window.Fly = FlyObj;
})(window);