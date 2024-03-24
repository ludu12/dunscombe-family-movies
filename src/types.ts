import videojs from "video.js";

export type Player = ReturnType<typeof videojs>


export type Movie = {
  guid: string,
  name: string,
  description: string,
  shortDescription: string

  HLS_URL: string | undefined
  DASH_URL: string | undefined
  MP4_URL: string | undefined
}
