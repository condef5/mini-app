import { Howl } from "howler";
import sfxBgMusicWav from "./assets/bgm/mus_BG_Town.wav";
import sfxBgMusicMP3 from "./assets/bgm/mus_BG_Town.mp3";

export const sounds = {
  bgMusic: new Howl({
    src: [sfxBgMusicWav, sfxBgMusicMP3],
    html5: true,
    loop: true,
    volume: 0.7,
    preload: "metadata",
  }),
};
