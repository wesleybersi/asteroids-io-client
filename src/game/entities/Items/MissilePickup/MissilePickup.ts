import MainScene from "../../../scenes/Main/MainScene";
import { STROKE_WIDTH } from "../../../scenes/Main/constants";

export class MissilePickup extends Phaser.GameObjects.Sprite {
  scene: MainScene;
  id: string;
  constructor(
    scene: MainScene,
    id: string,
    // type: string,
    x: number,
    y: number
  ) {
    super(scene, x, y, "missile");
    this.scene = scene;
    this.setOrigin(0.5, 0.5);
    this.setScale(3);
    this.setDepth(4);

    this.id = id;
    this.scene.add.existing(this);
    // switch (type) {
    //   case "red":
    //     this.setFillStyle(0xc12804);
    //     break;
    //   case "green":
    //     this.setFillStyle(0x48b51b);
    //     break;
    //   case "blue":
    //     this.setFillStyle(0x00599d);
    //     break;
    // }

    this.setAlpha(1);
    this.setAngle(-90);
    this.scene.tweens.add({
      targets: this,
      alpha: 0.5,
      scale: 2.5,
      duration: 500,
      yoyo: true,
      repeat: -1,
    });

    this.scene.events.on(
      `${id}`,
      (type: "get" | "flash" | "update", x?: number, y?: number) => {
        switch (type) {
          case "get":
            this.get();
            break;
          case "flash":
            this.flash();
            break;
          case "update":
            this.update(x ?? 0, y ?? 0);
            break;
        }
      }
    );
    this.scene.events.once("clear", this.remove, this);
  }
  update(x: number, y: number) {
    this.setPosition(x, y);
  }

  flash() {
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      ease: "Cubic",
      duration: 128,
      repeat: -1,
      yoyo: true,
    });
  }
  get() {
    this.remove();
  }
  remove() {
    this.scene.events.removeListener("clear", this.remove, this);
    this.scene.events.removeListener(this.id);
    this.destroy();
  }
}
