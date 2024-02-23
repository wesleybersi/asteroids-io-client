import { CELL_SIZE } from "../../../../../../socket-shooter 2/server/src/constants";
import MainScene from "../../scenes/Main/MainScene";
import {
  CELL_HEIGHT,
  CELL_WIDTH,
  SHADOW_ALPHA,
  SHADOW_COLOR,
  SHADOW_SIZE,
  STROKE_COLOR,
  STROKE_WIDTH,
} from "../../scenes/Main/constants";
import { getRandomInt } from "../../utils/helper-functions";
import { Bow } from "../Weapon/Bow";
import { Crossbow } from "../Weapon/Crossbow";
import { Spear } from "../Weapon/Spear";
import { Sword } from "../Weapon/Sword";

type Weapon = Bow | Crossbow | Sword | Spear;

const skinColors = [
  0xf9c984, 0xe1b474, 0xc99e65, 0xb18955, 0x987346, 0x805e36, 0x684827,
  0x503317,
];
export class Player extends Phaser.GameObjects.Container {
  state: "Idle" | "Moving" | "Falling" | "Dead" = "Idle";
  scene: MainScene;
  id: string;
  name: string;
  weapon: Weapon | null = null;
  force = 0;
  rotationTween: Phaser.Tweens.Tween | null = null;
  movementTween: Phaser.Tweens.Tween | null = null;
  predictionTween: Phaser.Tweens.Tween | null = null;
  particles?: Phaser.GameObjects.Particles.ParticleEmitter;

  boost: Phaser.GameObjects.Triangle;

  shield: Phaser.GameObjects.Arc;
  head: Phaser.GameObjects.Triangle;

  ship: Phaser.GameObjects.Sprite;
  // rightHand: Phaser.GameObjects.Arc;
  // leftHand: Phaser.GameObjects.Arc;
  // quiver: Phaser.GameObjects.Arc;

  facing: "up" | "down" = "down";
  color: number;

  constructor(
    scene: MainScene,
    id: string,
    name: string,
    color: number,
    weaponKey: string,
    x: number,
    y: number
  ) {
    super(scene as MainScene, x, y);
    this.scene = scene;

    this.name = name;
    this.id = id;
    this.color = color;
    if (weaponKey) this.changeWeapon(weaponKey);

    this.setDepth(1);

    scene.playersByID.set(this.id, this);
    const skinColor = skinColors[getRandomInt(skinColors.length)];

    const headRadius = 60; //Diameter is radius * 2, so diameter is player size
    const handRadius = 22;
    // ANCHOR Pointy Tip
    const tipWidth = 96;
    const tipHeight = 128;

    // Create the tip triangle
    this.head = this.scene.add
      .triangle(
        -tipHeight / 2,
        tipWidth / 2,
        0,
        -tipHeight / 2,
        tipWidth / 2,
        tipHeight / 2,
        -tipWidth / 2,
        tipHeight / 2
        // 0xffffff
      )
      .setAngle(90)
      .setOrigin(0.5, 0.5);

    // this.head.setStrokeStyle(STROKE_WIDTH, STROKE_COLOR);
    // this.head.setFillStyle(color);

    this.ship = this.scene.add.sprite(0, 0, "ship").setScale(3);
    this.add(this.ship);

    this.head.setStrokeStyle(STROKE_WIDTH, color);

    this.shield = scene.add
      .arc(0, 0, headRadius + 150)
      .setAlpha(0.5)

      .setStrokeStyle(STROKE_WIDTH, 0x00599d);

    const boostWidth = 48;
    const boostHeight = 90;

    this.boost = this.scene.add
      .triangle(
        -tipHeight / 2,
        -boostWidth / 2,
        0,
        -boostHeight / 2,
        boostWidth / 2,
        boostHeight / 2,
        -boostWidth / 2,
        boostHeight / 2
      )
      .setAngle(-90)
      .setOrigin(0.5, 0.5);

    this.boost.setStrokeStyle(STROKE_WIDTH, 0xffffff);

    this.boost.setDepth(0);
    this.boost.setFillStyle();

    // this.add([this.shield, this.head, this.boost]);
    this.add([this.shield, this.boost]);

    scene.add.existing(this);

    this.scene.events.on("clear", this.remove, this);
  }

  update(
    x: number,
    y: number,
    state: "moving" | "falling" | "swimming" | "dead",
    size: number,
    angle: number,
    force: number,
    isSpaceDown: boolean,
    isShieldActive: boolean,
    isStartProtected: boolean,
    boost: number,
    weapon: {
      key: string;
      isLoaded?: boolean;
      isAttack?: boolean;
      force?: number;
      position?: string;
    } | null,
    wasHit?: boolean,
    isDead?: boolean
  ) {
    if (this.state === "Dead") return;
    this.force = force;
    if (x !== this.x || y !== this.y) {
      this.state = "Moving";
    } else {
      this.state = "Idle";
    }

    if (isStartProtected) {
      this.setAlpha(0.5);
    } else {
      this.setAlpha(1);
    }
    if (wasHit) {
      this.scene.emitter.emitSmoke(this.x, this.y);
    }

    if (isDead || state === "dead") {
      this.state = "Dead";
      this.scene.emitter.emitExplosionLong(this.x, this.y);

      this.setAlpha(0);
      return;
    }

    this.setPosition(x, y);

    this.shield.setAlpha(isShieldActive ? 0.85 : 0);

    this.setAngle(angle);

    // if (weapon) {
    //   this.weapon?.update(x, y, angle, force);
    //   if (this.weapon?.key !== weapon?.key) this.changeWeapon(weapon.key);

    //   if (this.weapon && weapon.isAttack) {
    //     this.weapon.attack(weapon.position);
    //   }
    //   if (weapon?.force && weapon.force > 0) {
    //     if (this.weapon instanceof Spear) {
    //       this.weapon.hold(weapon.force);
    //     }
    //   }

    //   if (this.weapon && this.weapon instanceof Crossbow) {
    //     if (weapon.isLoaded) {
    //       this.weapon.load();
    //     } else if (!weapon.isLoaded) {
    //       this.weapon.unload();
    //     }
    //   }
    // } else {
    //   this.changeWeapon("");
    // }

    if (isSpaceDown) {
      // this.scene.emitter.emitSmoke(this.x, this.y);
      this.boost.setAlpha(1);
      // if (boost > 0) {
      //   this.boost.setFillStyle(0x4400ff);
      // } else {
      //   this.boost.setFillStyle(0xffffff);
      // }
    } else {
      this.boost.setAlpha(0);
    }
  }

  changeWeapon(key: string) {
    return;
    this.weapon?.remove();
    if (key.startsWith("bow")) {
      this.weapon = new Bow(this, key);
    } else if (key.startsWith("crossbow")) {
      this.weapon = new Crossbow(this, key);
    } else if (key.startsWith("spear")) {
      this.weapon = new Spear(this, key, 512);
    } else if (key.startsWith("sword")) {
      this.weapon = new Sword(this, key);
    } else {
      this.weapon = null;
    }
  }

  isInViewport() {
    const { left, right, top, bottom } = this.scene.cameras.main.worldView;
    if (
      this.x < left - CELL_WIDTH ||
      this.x > right + CELL_WIDTH ||
      this.y < top - CELL_HEIGHT ||
      this.y > bottom + CELL_HEIGHT
    ) {
      return false;
    } else return true;
  }

  // setAnimations(angle: number) {
  //   switch (this.state) {
  //     case "Moving":
  //     case "Idle":
  //       {
  //         const prefix = this.state.toLowerCase();
  //         const lookUpRange = 35;

  //         if (angle > -90 && angle < 90) {
  //           this.sprite.setScale(1, 1);
  //         } else {
  //           this.sprite.setScale(-1, 1);
  //         }

  //         if (angle > -lookUpRange) {
  //           this.facing = "down";
  //           if (this.sprite.anims.currentAnim?.key !== `${prefix}-front`) {
  //             this.sprite.anims.play(`${prefix}-front`);
  //           }
  //         } else if (angle <= -lookUpRange && angle > -180 + lookUpRange) {
  //           this.facing = "up";
  //           if (this.sprite.anims.currentAnim?.key !== `${prefix}-back`) {
  //             this.sprite.anims.play(`${prefix}-back`);
  //           }
  //         }
  //       }

  //       break;

  //     case "Falling":
  //       if (this.sprite.anims.currentAnim?.key !== "falling") {
  //         this.sprite.anims.play("falling");
  //       }
  //       console.log("FALLING ANIMATIOn");

  //       break;

  //     case "Dead":
  //       if (this.sprite.anims.currentAnim?.key !== "dead") {
  //         this.sprite.anims.play("dead");
  //       }
  //       break;
  //   }
  // }

  remove() {
    this.scene.events.removeListener("clear", this.remove, this);
    this.scene.playersByID.delete(this.id);
    this.movementTween?.destroy();
    this.rotationTween?.destroy();
    // this.hands.destroy();
    this.head.destroy();

    this.destroy();
  }
}
