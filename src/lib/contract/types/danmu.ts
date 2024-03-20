export type DanmuContent = {
  // danmu text (required)
  txt: string
  // how many ms after the video start to show the danmu. unit ms (required)
  t: string
  // the font size of  danmu.  unit px (required)
  fs: string
  // the font color of danmu.  (required)
  fc: string
  // how to display danmu. options=[scroll,top,bottom] (required)
  pt: string
  // the language of danmu
  lang?: string
}

export type Danmu = {
  // the poster's characterId
  characterId: number

} & DanmuContent
