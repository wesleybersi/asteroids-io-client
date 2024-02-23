import Phaser from "phaser";
import { Player } from "../../entities/Player/player";
import preload from "./methods/preload";
import create from "./methods/create";
import BasicTilemap from "../../entities/Tilemap/tilemap";
import LoadingScene from "../Loading/LoadingScene";
import { Socket } from "socket.io-client";
import { Direction } from "../../types";

import { CELL_HEIGHT, CELL_WIDTH, INITIAL_RESPAWN_COUNTER } from "./constants";
import Emitter from "../../entities/Emitter/Emitter";
import { ProjectileArrow } from "../../entities/Projectile/Arrow";

import { Pickup } from "../../entities/Pickup/Pickup";

import { Asteroid } from "../../entities/Asteroid/Asteroid";

import ProjectilePot from "../../entities/Projectile/Pot";

export type Projectile = ProjectileArrow | ProjectilePot;

export default class MainScene extends Phaser.Scene {
  socket!: Socket;
  socketID!: string;
  hasLoaded = false;
  deadzoneRect!: Phaser.GameObjects.Rectangle;
  tilemap!: BasicTilemap;
  loadingScene!: LoadingScene;
  loadingMessage = "";
  rowCount!: number;
  colCount!: number;
  isBot = false;
  respawnCounter = INITIAL_RESPAWN_COUNTER;
  emitter: Emitter = new Emitter(this);
  enableZoom = false;

  deadzoneOffset = { velocityX: 0, velocityY: 0, x: 0, y: 0 };

  receiveTracker = false;

  starLayerA!: Phaser.GameObjects.Container;
  starLayerB!: Phaser.GameObjects.Container;
  starLayerC!: Phaser.GameObjects.Container;
  starLayerD!: Phaser.GameObjects.Container;

  //Controls
  buttons = { shift: false, r: false };
  cursors: Direction[] = [];

  //Players
  player!: Player;
  boundingBox!: Phaser.GameObjects.Rectangle;
  playersByID = new Map<string, Player>();

  //Pots
  potsByPos = new Map<string, Asteroid>();

  //Matrix
  objectMatrix: string[][] = [];
  spriteGridMatrix: string[][] = []; // <row,col, sprite>

  asteroidsById = new Map<string, Asteroid>();

  //Pickups
  pickupsByPos = new Map<string, Pickup>();

  stateText!: Phaser.GameObjects.Text;
  frameCounter = 0;
  hover: {
    row: number;
    col: number;
    x: number;
    y: number;
  } = { row: -1, col: -1, x: -1, y: -1 };
  //External Methods
  preload = preload;
  create = create;
  constructor() {
    super({ key: "Main" });
  }
  clear() {
    this.events.emit("clear");
    this.cameras.main.stopFollow();

    for (const [, player] of this.playersByID) {
      player.remove();
    }
    for (const [, pickup] of this.pickupsByPos) {
      pickup.remove();
    }

    this.playersByID.clear();
    this.pickupsByPos.clear();
    this.cameras.main.fadeOut();
  }
  isInViewport(x: number, y: number) {
    const { left, right, top, bottom } = this.cameras.main.worldView;
    if (
      x < left - CELL_WIDTH ||
      x > right + CELL_WIDTH ||
      y < top - CELL_HEIGHT ||
      y > bottom + CELL_HEIGHT
    ) {
      return false;
    } else return true;
  }

  update(time: number, delta: number) {
    if (!this.hasLoaded) return;
    const camera = this.cameras.main;
    this.frameCounter++;
    if (this.frameCounter % 60 === 0) {
      this.frameCounter = 0;
    }
    camera.deadzone?.setSize(
      camera.worldView.width * 0.1,
      camera.worldView.height * 0.75
    );

    // camera.startFollow(this.player, true);
    camera.setLerp(0.05);

    if (this.deadzoneRect && camera.deadzone) {
      this.deadzoneRect.x = camera.deadzone.x + camera.deadzone.width / 2;
      this.deadzoneRect.y = camera.deadzone.y + camera.deadzone.height / 2;
      this.deadzoneRect.width = camera.deadzone.width;
      this.deadzoneRect.height = camera.deadzone.height;
      this.deadzoneRect.setDepth(2000);
      this.deadzoneRect.setOrigin(0.5);
      this.deadzoneRect.setAlpha(0);
    }

    // this.starLayerA.x = this.cameras.main.scrollX * 0;
    // this.starLayerA.y = this.cameras.main.scrollY * 0;

    // this.starLayerB.x = this.cameras.main.scrollX * 0.075;
    // this.starLayerB.y = this.cameras.main.scrollY * 0.075;

    // this.starLayerC.x = this.cameras.main.scrollX * 0.15;
    // this.starLayerC.y = this.cameras.main.scrollY * 0.15;

    this.starLayerA.x = this.cameras.main.scrollX * 0.4;
    this.starLayerA.y = this.cameras.main.scrollY * 0.4;
    // this.starLayerA.setAlpha(0.75);

    this.starLayerB.x = this.cameras.main.scrollX * 0.475;
    this.starLayerB.y = this.cameras.main.scrollY * 0.475;
    // this.starLayerB.setAlpha(0.5);

    this.starLayerC.x = this.cameras.main.scrollX * 0.55;
    this.starLayerC.y = this.cameras.main.scrollY * 0.55;
    // this.starLayerC.setAlpha(0.25);

    this.starLayerD.x = this.cameras.main.scrollX * 0.625;
    this.starLayerD.y = this.cameras.main.scrollY * 0.625;
    // this.starLayerD.setAlpha(0.1);

    // if (this.buttons.r) {
    //   this.respawnCounter--;
    //   if (this.respawnCounter === 0) {
    //     this.respawnCounter = INITIAL_RESPAWN_COUNTER;
    //     this.buttons.r = false;
    //     this.socket.emit(
    //       "Position Request",
    //       randomNum(this.rowCount),
    //       randomNum(this.colCount)
    //     );
    //   }
    // }

    this.boundingBox.setPosition(this.player.x, this.player.y);

    // this.stateText?.destroy();
    // this.stateText = this.add.text(
    //   camera.worldView.right - CELL_WIDTH * 15,
    //   camera.worldView.bottom - CELL_HEIGHT,
    //   `${this.goto?.row},${this.goto?.col}`
    // );
    // this.stateText.setDepth(200);
  }
}
