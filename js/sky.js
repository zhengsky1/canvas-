(function (Fly) {
  'use strict';

  function Sky(option) {
    this.img = option.img;
    this.imgW = this.img.width;
    this.imgH = this.img.height;
    this.speed = -0.2;

    this.x = option.x || 0;
    this.y = 0;
  }
  Sky.prototype = {
    constructor: Sky,
    draw: function (delta) {
      // 计算天空背景的坐标
      this.x += this.speed * delta;
      if (this.x <= -this.imgW) {
        this.x += this.imgW * 2;
      }

      context.drawImage(this.img, this.x, this.y);
    }
  };

  Fly.Sky = Sky;
})(Fly);