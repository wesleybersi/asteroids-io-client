import { CELL_WIDTH } from "../../scenes/Main/constants";
import MainScene from "../../scenes/Main/MainScene";
import { CELL_HEIGHT } from "../../scenes/Main/constants";

export class Horse extends Phaser.GameObjects.Container {
  scene: MainScene;

  head: Phaser.GameObjects.Arc | null = null;
  mane: Phaser.GameObjects.Arc | null = null;
  torso: Phaser.GameObjects.Graphics | null = null;
  butt: Phaser.GameObjects.Arc | null = null;
  tail: Phaser.GameObjects.Graphics | null = null;

  constructor(scene: MainScene, x: number, y: number) {
    super(scene, x, y);
    this.scene = scene;
    this.setDepth(0);
    this.scene.add.existing(this);

    this.torse = this.scene.add.graphics({ x: 0, y: 0 });

    this.scene.events.once("clear", this.remove, this);
  }
  remove() {
    this.scene.events.removeListener("clear", this.remove, this);
    this.destroy();
    this.wallBelow?.destroy();
  }
}
