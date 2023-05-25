import MainScene from "../MainScene";

import tilesetFloor from "../../../assets/images/tilesets/floor.png";

import spritesheetPlayer from "../../../assets/images/spritesheets/player-base.png";

// import spritesheetCrates from "../../../assets/images/spritesheets/crates-36.png";
import spritesheetCrates from "../../../assets/images/spritesheets/crates-40.png";
// import spritesheetCrates from "../../../assets/images/spritesheets/crates-48.png";

import spritesheetHalfWall from "../../../assets/images/spritesheets/walls-40.png";
import spritesheetWall from "../../../assets/images/spritesheets/walls-56.png";
import spritesheetBigWall from "../../../assets/images/spritesheets/walls-72.png";

import spritesheetWater from "../../../assets/images/spritesheets/water.png";

import imageRampHorizontal from "../../../assets/images/spritesheets/ramp-h.png";
import imageRampVertical from "../../../assets/images/spritesheets/ramp-v.png";
import imageDrain from "../../../assets/images/grate.png";

import spritesheetExplosion from "../../../assets/images/spritesheets/explosion.png";
import spritesheetCracks from "../../../assets/images/spritesheets/wallcrack.png";
import spritesheetOil from "../../../assets/images/spritesheets/oil.png";

import imageCornerpiece from "../../../assets/images/cornerpiece.png";
import imageEntrance from "../../../assets/images/entrance.png";
import imageSpikes from "../../../assets/images/spikes.png";
import imageBubble from "../../../assets/images/bubble.png";

import sfxFireBlue from "../../../assets/audio/fire-blue.wav";
import sfxFireOrange from "../../../assets/audio/fire-orange.wav";
import sfxRemover from "../../../assets/audio/remover.wav";
import sfxEditMode from "../../../assets/audio/editor-mode.wav";

import sfxCreateOn from "../../../assets/audio/create-on.wav";
import sfxCreateOff from "../../../assets/audio/create-off.wav";
import sfxSplat from "../../../assets/audio/splat.wav";

export default function preload(scene: MainScene) {
  const { cellWidth, cellHeight } = scene;

  scene.load.audio("portal-a", sfxFireBlue);
  scene.load.audio("portal-b", sfxFireOrange);
  scene.load.audio("remover", sfxRemover);
  scene.load.audio("edit-mode", sfxEditMode);
  scene.load.audio("create-on", sfxCreateOn);
  scene.load.audio("create-off", sfxCreateOff);
  scene.load.audio("splat", sfxSplat);

  scene.load.image("cornerpiece", imageCornerpiece);
  scene.load.image("entrance", imageEntrance);
  scene.load.image("spikes", imageSpikes);
  scene.load.image("bubble", imageBubble);
  scene.load.image("drain", imageDrain);

  //Tilesets
  scene.load.spritesheet("floor-tileset", tilesetFloor, {
    frameWidth: cellWidth,
    frameHeight: cellWidth,
  });

  //Spritsheets
  scene.load.spritesheet("crates", spritesheetCrates, {
    frameWidth: 32,
    frameHeight: 40,
  });
  scene.load.spritesheet("ramp-horizontal", imageRampHorizontal, {
    frameWidth: 64,
    frameHeight: 40,
  });
  scene.load.spritesheet("ramp-vertical", imageRampVertical, {
    frameWidth: 32,
    frameHeight: 64,
  });

  scene.load.spritesheet("half-wall", spritesheetHalfWall, {
    frameWidth: 32,
    frameHeight: 40,
  });
  scene.load.spritesheet("wall", spritesheetWall, {
    frameWidth: 32,
    frameHeight: 56,
  });
  scene.load.spritesheet("big-wall", spritesheetBigWall, {
    frameWidth: 32,
    frameHeight: 72,
  });

  scene.load.spritesheet("water", spritesheetWater, {
    frameWidth: 32,
    frameHeight: 24,
  });

  scene.load.spritesheet("player", spritesheetPlayer, {
    frameWidth: 32,
    frameHeight: 48,
  });

  scene.load.spritesheet("explosion", spritesheetExplosion, {
    frameWidth: cellWidth,
    frameHeight: cellHeight,
  });
  scene.load.spritesheet("cracks", spritesheetCracks, {
    frameWidth: cellWidth,
    frameHeight: cellHeight,
  });
  scene.load.spritesheet("oil", spritesheetOil, {
    frameWidth: cellHeight,
    frameHeight: cellHeight,
  });
}