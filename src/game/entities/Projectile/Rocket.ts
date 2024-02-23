import { CELL_SIZE } from "../../../../../../socket-shooter 2/server/src/constants";
import MainScene from "../../scenes/Main/MainScene";
import { SHADOW_X, SHADOW_Y, STROKE_COLOR } from "../../scenes/Main/constants";

export class ProjectileRocket extends Phaser.GameObjects.Sprite {
  scene: MainScene;
  id: string;

  constructor(
    scene: MainScene,
    id: string,
    x: number,
    y: number,
    angle: number,
    color: number
  ) {
    super(scene, x, y, "missile");
    this.scene = scene;
    this.id = id;
    this.setAngle(angle);

    this.setAlpha(0);
    this.setScale(3);
    this.scene.emitter.emitSmoke(this.x, this.y);
    scene.add.existing(this);

    this.scene.events.on(
      this.id,
      (
        type: "update" | "remove",
        state: string,
        x: number,
        y: number,
        z: number,
        angle: number,
        velocity: number
      ) => {
        if (type === "remove") {
          this.remove();
          return;
        }
        this.setPosition(x, y);
        this.setAngle(angle);
        this.setDepth(2000);
        this.setAlpha(1);

        // if (velocity > 2500) {
        //   if (this.scene.frameCounter % 4 === 0) {
        //     this.scene.emitter.emitSmoke(x, y);
        //   }
        // }
        // if (velocity > 3500) {
        //   this.scene.emitter.emitSmoke(x, y);
        // }

        switch (state) {
          case "removed":
          case "destroyed":
            this.remove();
            break;
        }
      }
    );

    this.scene.events.once("clear", this.remove, this);
  }

  remove() {
    this.scene.emitter.emitExplosion(this.x, this.y);

    this.scene.events.removeListener("clear", this.remove, this);
    this.scene.events.removeListener(this.id);

    this.destroy();
  }
}
