import { Contract, createContract, createIndexer, Indexer } from 'crossbell'
import { type Address } from 'abitype'

export class Client {
  protected address?: Address
  protected chartId?: number
  protected indexer: Indexer
  protected contract: Contract

  constructor() {
    this.indexer = createIndexer()
    // @ts-ignore
    this.contract = createContract(window.ethereum)
    this.initChar()
  }

  /**
   * connect to metamask and get  character from crossbell.io
   * this character will be used to curd danmu message
   * @private
   */
  private async initChar() {
    const addresses = await this.contract.walletClient.requestAddresses()
    this.address = addresses[0]
    if (!this.address) {
      throw 'connect to metamask error'
    }

    const character = await this.indexer.character.getPrimary(this.address)
    if (!character) {
      throw 'have no character error'
    }
    this.chartId = character.characterId
    const log = `
    connect success
    account info :
    address:  ${this.address}
    charId:   ${character.characterId}
    handle:   ${character.handle}
    `
    console.info(log)
  }

  /**
   * post a note and link it to another note
   * @param targetCharacterId another note author characterId
   * @param targetNoteId another note id
   * @param sources source type
   * @param content note content
   */
  public async postNoteForNote(
    targetCharacterId: number,
    targetNoteId: number,
    sources: string[],
    content: string,
    title?: string
  ) {
    const { data } = await this.contract.note.postForNote({
      characterId: this.chartId!,
      metadataOrUri: { content: JSON.stringify(content), sources, title },
      targetCharacterId,
      targetNoteId
    })
    return data
  }

  /**
   * post a note
   * @param sources source type
   * @param content note connect
   * @returns noteId
   */
  public async postNote(sources: string[], content: string, title?: string) {
    const { data } = await this.contract.note.post({
      characterId: this.chartId!,
      metadataOrUri: { sources, content, title }
    })
    return data
  }

  /**
   * edit note metadata
   * @param nodeId  node id
   * @param content the modify content 
   * @param title the modify title
   */
  public async editNoteMetaData(
    nodeId: number,
    content: string,
    title?: string
  ) {
    this.contract.note.changeMetadata({
      characterId: this.chartId!,
      noteId: nodeId,
      modifier: (s) => ({ sources: s?.sources, content, title })
    })
  }

  /**
   * change the note's property deleted to true
   * @param nodeId the noteId
   * @returns
   */
  public async deleteNote(nodeId: number) {
    return await this.contract.note.delete({ characterId: this.chartId!, noteId: nodeId })
  }
}
