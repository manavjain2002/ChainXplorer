import { BigNumber, ethers } from "ethers";
import { Signers } from "../signers/signers.services";

// export const provider = new ethers.providers.JsonRpcProvider();

export class Wallets extends Signers{

  wallet: any
  provider: any
  
  constructor(provider: any = {}, wallet: any = {}){-
    super(provider , wallet)
    this.provider = provider
    this.wallet = wallet ? wallet : {}
  }

  createWallet(pkey: string, provider: any) : Promise<any> {
    this.wallet = new ethers.Wallet(pkey, provider)
    return (this.wallet)
  }

  async createWalletFromEncryptedJson(json: any, password: string) :Promise<any> {
    this.wallet = await ethers.Wallet.fromEncryptedJson(json, password)
    return (this.wallet)
  }

  createWalletFromEncryptedJsonSync(json: any, password: string) : any {
    this.wallet = ethers.Wallet.fromEncryptedJsonSync(json, password)
    return (this.wallet)
  }

  createWalletFromMnemonic(mnemonic: string, path : any = "", wordlist: any = []) : any {
    this.wallet = ethers.Wallet.fromMnemonic(mnemonic, path, wordlist)
    return (this.wallet)
  }

  async getAddress() : Promise<string> {
    return await this.wallet.address
  }

  getProvider() : any {
    return this.wallet.provider
  }

  getPublicKey() : string {
    return this.wallet.publicKey
  }

  async encrypt(password: string, options: any = {}, progress: number = 1) : Promise<string> {
    return await this.wallet.encrypt(password, options, progress)
  }
}
