import { Client } from '@/lib/contract/crossbell'

const SOURCE = 'biubiuVideo_dev'
class videoClient extends Client {
  /**
   * search video
   * @returns video msg list
   */
  public async findVideo() {
    const { list } = await this.indexer.note.getMany({ characterId: this.chartId })
    return list
  }
  /**
   * create video introduction message
   * @param connect introduction
   * @param title video title
   */
  public async createVideo(connect: string, title: string) {
    return await this.postNote([SOURCE], connect, title)
  }

  /**
   * delete use to delete the video. video can be delete only by its owner;
   * @param videoId the video want to delete
   */
  public delete(videoId: number) {
    return this.deleteNote(videoId)
  }

  /**
   * modifi video introduction message
   */
  public editVideo(videoId: number, connect: string, title: string) {
    return this.editNoteMetaData(videoId, connect, title)
  }
}

export const VideoClient = new videoClient()
