import MainScene from "../../scenes/Main/MainScene";
import { STROKE_WIDTH } from "../../scenes/Main/constants";
import { getRandomInt } from "../../utils/helper-functions";

export class Asteroid extends Phaser.GameObjects.Polygon {
  scene: MainScene;
  id: string;
  center: Phaser.GameObjects.Rectangle | null = null;
  rect: Phaser.GameObjects.Rectangle | null = null;
  stroke: Phaser.GameObjects.Polygon | null = null;
  type: string;
  vertices: number[];
  constructor(
    scene: MainScene,
    id: string,
    x: number,
    y: number,
    vertices: number[],
    type: string
  ) {
    super(scene, x, y, vertices);
    this.scene = scene;
    this.id = id;
    this.type = type;
    this.vertices = vertices;
    const bounds = this.getBounds();
    this.width = bounds.width;
    this.height = bounds.height;
    this.setFillStyle(0x11153c);
    this.setStrokeStyle(STROKE_WIDTH, darkenColor(0xaae7ff, getRandomInt(100)));

    if (type === "metal") {
      this.setFillStyle(0xaae7ff);
      this.setStrokeStyle(
        STROKE_WIDTH,
        darkenColor(0x11153c, getRandomInt(100))
      );
    }

    // this.stroke = this.scene.add.polygon(this.x, this.y, vertices);
    // this.stroke.setScale(1.15);
    // this.stroke.setOrigin(0);
    // this.stroke.setFillStyle(0x222222);
    switch (type) {
      case "dirt":
        this.setFillStyle(0x8e654b);
        this.setStrokeStyle(STROKE_WIDTH * 2.5, 0x5e432f);
        break;
      case "iron":
        break;
      case "metal":
        this.setFillStyle(0x8fa0a8);
        this.setStrokeStyle(STROKE_WIDTH * 2.5, 0x808c91);
        // this.setFillStyle(0x2f2d34);
        // this.setStrokeStyle(STROKE_WIDTH * 2.5, 0x1e1c23);
        break;
    }

    // this.craterContainer = this.scene.add.container(this.x, this.y);

    // for (let i = 0; i < getRandomInt(3, 16); i++) {
    //   const crater = this.scene.add.arc(0, 0, getRandomInt(4, 96));
    //   crater.setFillStyle(this.strokeColor);
    //   const xOffset = getRandomInt(-this.width / 2, this.width / 2);
    //   const yOffset = getRandomInt(-this.height / 2, this.height / 2);
    //   crater.x = xOffset;
    //   crater.y = yOffset;
    //   this.craterContainer.add(crater);
    // }
    // this.craterContainer.setDepth(1_000_000);
    // if (oneIn(64)) {
    //   this.setStrokeStyle(STROKE_WIDTH, generateRandomColor());
    // }

    // this.setStrokeStyle(STROKE_WIDTH, generateRandomColor());

    // const darkenAmount = getRandomInt(124);
    // const darkenAmount = 0;
    // this.setFillStyle(darkenColor(0xaaaaaa, darkenAmount));
    // this.setStrokeStyle(STROKE_WIDTH, darkenColor(0x888888, darkenAmount));

    // const center = this.getCenter();

    // if (center && center.x && center.y) {
    //   this.x -= center.x;
    //   this.y -= center.y;
    //   this.center = this.scene.add.rectangle(x, y, 16, 16, 0xff0000);
    //   this.center.setAlpha(0);
    //   this.center.setDepth(20000);
    // }

    this.setScale(1.5);
    this.scene.tweens.add({
      targets: this,
      scale: 1,
      duration: 200,
      ease: "Cubic.Out",
      onComplete: () => {
        this.setScale(1);
      },
    });
    this.setOrigin(0, 0);

    this.scene.asteroidsById.set(this.id, this);

    this.scene.add.existing(this);
    this.setDepth(5);

    this.scene.events.on(
      this.id,
      (
        type: "remove" | "update" | "hit" | "ping",
        x?: number,
        y?: number,
        angle?: number,
        hp?: number
      ) => {
        switch (type) {
          // case "remove":
          //   this.hit();
          //   break;
          case "ping":
            return "pong";
          case "hit":
          case "remove":
            this.hit();
            break;
          case "update":
            this.update(x ?? 0, y ?? 0, angle ?? 0, hp ?? 0);
            break;
        }
      }
    );
    this.scene.events.once("clear", this.remove, this);
  }
  remove() {
    this.center?.destroy();
    this.scene.events.removeListener(this.id);
    this.scene.events.removeListener("clear", this.remove, this);

    this.scene.asteroidsById.delete(this.id);
    this.destroy();
  }
  hit() {
    this.scene.emitter.emitSmoke(this.x, this.y);
    this.remove();
  }

  update(x: number, y: number, angle: number, hp: number) {
    this.setPosition(x, y);
    this.setDepth(2000);
    this.setAngle(angle);
    if (this.center) {
      this.center.setPosition(x, y);
      this.center.setOrigin(0.5, 0.5);
    }
    this.stroke?.setPosition(x, y).setAngle(angle);
    return;
    if (this.type === "iron") {
      switch (hp) {
        case 2:
          this.setFillStyle(darkenColor(0x8fa0a8, 0));
          this.setStrokeStyle(STROKE_WIDTH * 2.5, darkenColor(0x808c91, 0));
          break;
        // case 2:
        // this.setFillStyle(darkenColor(0x8fa0a8, 25));
        // this.setStrokeStyle(STROKE_WIDTH * 2.5, darkenColor(0x808c91, 25));
        // break;
        case 1:
          this.setFillStyle(darkenColor(0x8fa0a8, 50));
          this.setStrokeStyle(STROKE_WIDTH * 2.5, darkenColor(0x808c91, 50));
          break;
      }
    }
  }
}

function darkenColor(color: number, amount: number) {
  // Extract red, green, and blue components
  let r = (color >> 16) & 0xff;
  let g = (color >> 8) & 0xff;
  let b = color & 0xff;

  // Decrease each component by the specified amount
  r = Math.max(0, r - amount);
  g = Math.max(0, g - amount);
  b = Math.max(0, b - amount);

  // Combine components and return the darkened color
  return (r << 16) | (g << 8) | b;
}
