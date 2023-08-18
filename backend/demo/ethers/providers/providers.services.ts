import { BigNumber, ethers } from "ethers";

// export const provider = new ethers.providers.JsonRpcProvider();

export class Providers {

  provider: any
  
  constructor(chainId: number, url: string){
    this.provider = new ethers.providers.JsonRpcProvider(url, chainId);
  }

  async getBalance(address: string): Promise<BigNumber> {
    return await this.provider.getBalance(address);
  }

  async getCode(address: string): Promise<string> {
    return await this.provider.getCode(address);
  }

  async getStorageAt(address: string, pos: number): Promise<string> {
    return await this.provider.getStorageAt(address, pos);
  }

  async getTransactionCount(address: string): Promise<Number> {
    return await this.provider.getTransactionCount(address);
  }

  async getBlock(blockNumber: number): Promise<any> {
    return await this.provider.getBlock(blockNumber);
  }

  async getBlockWithTransactions(blockNumber: number): Promise<any> {
    return await this.provider.getBlockWithTransactions(blockNumber);
  }

  async getResolver(name: string): Promise<any> {
    return await this.provider.getResolver(name)
  }

  async lookupAddress(address: string): Promise<any> {
    return await this.provider.lookupAddress(address)
  }

  async resolveName(name: string): Promise<any> {
    return await this.provider.resolveName(name)
  }

  async getNetwork(): Promise<any> {
    return await this.provider.getNetwork()
  }

  async getBlockNumber(): Promise<number> {
    return await this.provider.getBlockNumber()
  }

  async getGasPrice(): Promise<BigNumber> {
    return await this.provider.getGasPrice()
  }

  async getFeeData(): Promise<any> {
    return await this.provider.getFeeData()
  }

  async call(transaction: any): Promise<any> {
    return await this.provider.call(transaction)
  }

  async estimateGas(transaction: any): Promise<any> {
    return await this.provider.estimateGas(transaction)
  }

  async getTransaction(hash: string): Promise<any> {
    return await this.provider.getTransaction(hash)
  }

  async getTransactionReceipt(hash: string): Promise<any> {
    return await this.provider.getTransactionReceipt(hash)
  }

  async sendSignedTransaction(transaction: string): Promise<any> {
    return await this.provider.sendTransaction(transaction)
  }

  async waitForTransaction(hash: string): Promise<any> {
    return await this.provider.waitForTransaction(hash)
  }

  async sendTransaction(transaction: any, signer: any) : Promise<any> {
    const signedTx = await signer.signTransaction(transaction);
    return await this.sendSignedTransaction(signedTx)
  }

  async createSigner(pkey: string, provider: any) : Promise<any> {
    return new ethers.Wallet(pkey, provider)
  }
}
