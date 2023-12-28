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

}
