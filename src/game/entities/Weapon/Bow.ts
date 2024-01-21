import { Player } from "../Player/player";

export class Bow extends Phaser.GameObjects.Sprite {
  type = "Bow";
  player: Player;

  constructor(player: Player, tier: string) {
    super(player.scene, 0, 0, "bow");
    this.player = player;
    this.setScale(0.09);
    this.scene.add.existing(this);

    this.scene.events.on("clear", () => {
      this.remove();
    });

    switch (tier) {
      case "Longbow":
        this.setScale(1.25);
        break;
      case "Shortbow":
        this.setScale(0.5);
        break;
    }
  }
  update(x: number, y: number, angle: number, depth: number) {
    this.setAngle(angle);
    this.setDepth(depth);
    this.setOrigin(0.45, 0.45);
    this.setPosition(x, y);
  }
  remove() {
    this.destroy();
  }
}