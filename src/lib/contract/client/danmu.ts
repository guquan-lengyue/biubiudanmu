import { Client } from '@/lib/contract/crossbell'
import type { Danmu } from '@/lib/contract/types/danmu'

const SOURCE = 'biubiudanmu_dev'

class danmuClient extends Client {

  /**
   * send danmu
   * crate a danmu message and link it to the specific video address
   * @param danmu danmu msg
   * @param video video msg
   */
  public async send(danmu: Danmu, video: Video) {
    const { data } = await this.contract.note.postForNote({
      characterId: this.chartId!,
      metadataOrUri: { content: JSON.stringify(danmu), sources: [SOURCE] },
      targetNoteId: video.noteId,
      targetCharacterId: video.targetCharId
    })
    return data
  }

  /**
   * find danmu
   */
  public async findDanmu(video: Video) {
    const { list } = await this.indexer.note.getMany({
      toCharacterId: video.targetCharId,
      toNoteId: video.noteId,
      sources: [SOURCE]
    })
    return <Danmu[]>list
      .map(i => i.metadata?.content)
      .filter(i => !!i)
      .map(i => {
        return JSON.parse(<string>i?.content)
      })
  }
}

export const DanmuClient = new danmuClient()