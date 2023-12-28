import { Client } from '@/lib/contract/crossbell'

class videoClient extends Client {
  public async findVideo() {
    const { list } = await this.indexer.note.getMany({ characterId: this.chartId })
    return list
  }
}

export const VideoClient = new videoClient()