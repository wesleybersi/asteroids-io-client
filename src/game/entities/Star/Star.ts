import MainScene from "../../scenes/Main/MainScene";
import { getRandomInt, oneIn } from "../../utils/helper-functions";

export class Star extends Phaser.GameObjects.Arc {
  scene: MainScene;
  id: string;
  constructor(
    scene: MainScene,
    id: string,
    x: number,
    y: number,
    radius: number,
    color: number
  ) {
    super(scene, x, y, radius);
    this.setFillStyle(color);
    this.scene = scene;
    this.id = id;
    this.setOrigin(0.5, 0.5);
    this.setDepth(0);
    // this.scene.add.existing(this);

    const layer = getRandomInt(4);
    switch (layer) {
      case 0:
        this.scene.starLayerA.add(this);
        break;
      case 1:
        this.scene.starLayerB.add(this);
        break;
      case 2:
        this.scene.starLayerC.add(this);
        break;
      case 3:
        this.scene.starLayerD.add(this);
        break;
    }

    // if (
    //   this.scene.objectMatrix[row - 1] &&
    //   this.scene.objectMatrix[row - 1][col] !== "hole"
    // ) {
    //   this.wallBelow = this.scene.add.image(this.x, this.y - 4, "wall-below");
    //   this.wallBelow.setTint(0x454a4d);
    // }

    this.setAlpha(getRandomInt(1, 7) / 10);
    if (oneIn(6)) {
      this.scene.tweens.add({
        targets: this,
        scale: getRandomInt(0, 7) / 10,
        alpha: getRandomInt(0, 1) / 10,
        duration: getRandomInt(500, 2000),
        repeat: -1,
        yoyo: true,
        ease: "Sine.InOut",
      });
    }

    this.scene.events.on(this.id, (type: "remove") => {
      switch (type) {
        // case "remove":
        //   this.hit();
        //   break;
        case "remove":
          this.remove();
          break;
      }
    });
    this.scene.events.once("clear", this.remove, this);
  }
  remove() {
    this.scene.events.removeListener(this.id);
    this.scene.events.removeListener("clear", this.remove, this);
    this.destroy();
  }
}
