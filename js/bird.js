// 最佳实践：在整个应用程序中只应该有一个全局变量
// 如果每一个对象，都直接暴露到全局环境中，那么会导致全局环境中有多个全局对象
// 对全局环境造成了污染

// 1 在全局环境中只保留一个全局对象：Fly
// 2 所有其他的对象（小鸟、天空等）全部作为 Fly 的属性

(function (Fly) {
  'use strict';

  function Bird(option) {
    this.birdImg = option.img;

    this.imgW = this.birdImg.width / 3;      // 绘制图片的宽度
    this.imgH = this.birdImg.height;           // 绘制图片的高度
    this.frameIndex = 0;               // 记录小鸟绘制到哪一帧
    this.a = 0.0005;                   // 加速度
    this.x = 100;                      // 小鸟的x坐标
    this.y = 100;                      // 小鸟的y坐标
    this.maxAngle = 45;                // 最大旋转角度
    this.maxSpeed = 0.3;               // 达到最大角度时的速度
    this.curAngle = 0;                 // 当前角度
    this.speed = 0;                    // 瞬时速度(当前小鸟的速度)
  }

  Bird.prototype = {
    constructor: Bird,

    draw: function ( delta ) {
      // 计算小鸟旋转角度
      this.curAngle = this.maxAngle / this.maxSpeed * this.speed;
      if (this.curAngle > this.maxAngle) {
        this.curAngle = this.maxAngle;
      } else if (this.curAngle < -this.maxAngle) {
        this.curAngle = -this.maxAngle;
      }

      // 平移画布:
      context.translate(this.x, this.y);
      // 旋转画布:
      context.rotate(toRadian(this.curAngle));

      context.drawImage(this.birdImg, this.frameIndex++ * this.imgW, 0, this.imgW, this.imgH, -1 / 2 * this.imgW, -1 / 2 * this.imgH, this.imgW, this.imgH);

      this.frameIndex %= 3;

      // 瞬时速度
      // v = v0 + a * t
      this.speed = this.speed + this.a * delta;
      // 位移
      // S = v * t + 1/2 * a * t^2
      this.y += this.speed * delta + 1 / 2 * this.a * Math.pow(delta, 2);
    }
  };

  Fly.Bird = Bird;
})(Fly);