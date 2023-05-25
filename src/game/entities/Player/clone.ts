import MainScene from "../../scenes/Main/MainScene";

export class Clone extends Phaser.GameObjects.Sprite {
  scene: MainScene;
  from: { row: number; col: number };
  to: { row: number; col: number };
  constructor(
    scene: MainScene,
    from: { row: number; col: number },
    to: { row: number; col: number }
  ) {
    super(
      scene as MainScene,
      from.col * scene.cellWidth + scene.cellWidth / 2,
      from.row * scene.cellHeight + scene.cellHeight / 2,
      "player",
      "0"
    );
    this.scene = scene;
    this.name = "Player Clone";
    this.from = from;
    this.to = to;
    this.setDepth(1);
    this.setOrigin(0.5);
    scene.add.existing(this);
  }
}
