import { BigNumber, ethers } from "ethers";

// export const provider = new ethers.providers.JsonRpcProvider();

export class Signers {

  signer: any
  provider: any
  
  constructor(provider: any, signer: any){
    this.signer = signer ? signer : ""
    this.provider = provider ? provider : ""
  }

  async createSigner(pkey: string, provider: any) : Promise<any> {
    this.signer = new ethers.Wallet(pkey, provider)
    return (this.signer)
  }

  connect(provider: any) : any {
    this.provider = provider
    return this.signer.connect(provider)
  }

  async getAddress(): Promise<string> {
    return await this.signer.getAddress()
  }

  isSigner(signer: any): boolean {
    return this.signer.isSigner(signer)
  }

  async getBalance(blockTag : string): Promise<BigNumber> {
    blockTag = blockTag ? blockTag : "latest"
    return await this.signer.getBalance();
  }

  async getChainId() :Promise<number> {
    return await this.signer.getChainId();
  }
  
  async getGasPrice(): Promise<BigNumber> {
    return await this.signer.getGasPrice()
  }

  async getTransactionCount(blockTag : string): Promise<Number> {
    blockTag = blockTag ? blockTag : "latest"
    return await this.signer.getTransactionCount();
  }
  
  async call(transaction: any): Promise<any> {
    return await this.signer.call(transaction)
  }

  async estimateGas(transaction: any): Promise<BigNumber> {
    return await this.signer.estimateGas(transaction)
  }

  async resolveName(name: string): Promise<string> {
    return await this.signer.resolveName(name)
  }

  async signMessage(message: string) : Promise<string> {
    return await this.signer.signMessage(message)
  }

  async signTransaction(transaction: any): Promise<string> {
    return await this.signer.signTransaction(transaction)
  }
  
  async sendTransaction(transaction: any) : Promise<any> {
    return await this.signer.sendTransaction(transaction)
  }

  async checkTransaction(transaction: any) : Promise<any> {
    return await this.signer.checkTransaction(transaction)
  }

  async popluateTransaction(transaction: any) : Promise<any> {
    return await this.signer.popluateTransaction(transaction)
  }
}
