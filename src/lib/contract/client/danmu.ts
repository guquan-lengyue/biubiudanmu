import { Client } from '@/lib/contract/crossbell'
import type { Danmu, DanmuContent } from '@/lib/contract/types/danmu'
import type { Video } from '@/lib/contract/types/video'

const SOURCE = 'biubiudanmu_dev'

class danmuClient extends Client {
  /**
   * send danmu
   * crate a danmu message and link it to the specific video address
   * @param danmu danmu msg
   * @param video video msg
   */
  public async send(danmu: DanmuContent, video: Video) {
    const data = this.postNoteForNote(
      video.targetCharId,
      video.noteId,
      [SOURCE],
      JSON.stringify(danmu)
    )
    return data
  }

  /**
   * delDanmu use to delete a danmu. Danmu can be delete only by its owner;
   * @param danmuId the danmu want to delete
   * @returns delete result
   */
  public async delDanmu(danmuId: number) {
    return this.deleteNote(danmuId)
  }

  /**
   * find all danmu by video
   * @param video video msg
   */
  public async findDanmu(video: Video) {
    const { list } = await this.indexer.note.getMany({
      toCharacterId: video.targetCharId,
      toNoteId: video.noteId,
      sources: [SOURCE]
    })
    const danmu: Danmu[] = []
    list.forEach((l) => {
      if (!l.metadata?.content) {
        return
      }
      const danmuContent = <DanmuContent>JSON.parse(<string>l.metadata.content)
      danmu.push({ ...danmuContent, characterId: l.characterId, noteId: l.noteId })
    })
    return danmu
  }
}

export const DanmuClient = new danmuClient()
