import { ethers } from "ethers";

// export const provider = new ethers.providers.JsonRpcProvider();

export class Contracts {

  signer: any
  provider: any


  getContract(address: string, abi: Array<string>, signerOrProvider: any = this.signer): any {
    if (
      address != "" &&
      Object.values(abi) != Object.values([]) &&
      Object.values(signerOrProvider) != Object.values({})
    ) {
      let contract = new ethers.Contract(address, abi, signerOrProvider);
      return contract;
    } else {
      return "Either pass address, abi, and signer OR provide contract instance";
    }
  }

  getContractWithDifferentAddress(
    address: string = "",
    abi: Array<string> = [],
    signerOrProvider: any = this.signer,
    contract: any = {},
    newAddress: string = ""
  ): any {
    if (
      Object.values(contract) != Object.values({}) ||
      (address != "" &&
        Object.values(abi) != Object.values([]) &&
        Object.values(signerOrProvider) != Object.values({}))
    ) {
      let newContract;
      if (Object.values(contract) == Object.values({})) {
        newContract = new ethers.Contract(address, abi, signerOrProvider);
      } else {
        newContract = contract;
      }
      if(newAddress != ""){
        return newContract.attach(newAddress);
      } else {
        return "New Address shouldn't be null"
      }
    } else {
      return "Either pass address, abi, and signer OR provide contract instance";
    }
  }

  getContractWithDifferentProvider(
    address: string = "",
    abi: Array<string> = [],
    signerOrProvider: any =this.signer,
    contract: any = {},
    newProvider: any = {}
  ): any {
    if (
      Object.values(contract) != Object.values({}) ||
      (address != "" &&
        Object.values(abi) != Object.values([]) &&
        Object.values(signerOrProvider) != Object.values({}))
    ) {
      let newContract;
      if (Object.values(contract) == Object.values({})) {
        newContract = new ethers.Contract(address, abi, signerOrProvider);
      } else {
        newContract = contract;
      }
      if(Object.values(newProvider) != Object.values({})){
        return (newContract.connect(newProvider));
      } else {
        return "New Provider provided is null"
      }
    } else {
      return "Either pass address, abi, and signer OR provide contract instance";
    }
  }

  getContractAddress(contract: any): string {
    return (contract.address)
  }

  getContractResolvedAddress(contract: any): string {
    return (contract.resolveAddress)
  }

  getContractDeployTransaction(contract: any): string {
    return (contract.deployTransaction)
  }

  getContractInterface(contract: any): string {
    return (contract.interface)
  }

  getContractProvider(contract: any): string {
    return (contract.provider)
  }

  getContractSigner(contract: any): string {
    return (contract.signer)
  }

  async isContractDeployed(contract: any): Promise<any> {
      return await contract.deployed()
  }

  isContractIndexed(contract: any): boolean {
    return contract.isIndexed();
  }

  async getEncodedFunctionCallData(contract: any, method: string, values: Array<any>) : Promise<any> {
    if(Object.values(contract) == Object.values({}) || method == "" || values.length == 0) {
      return "Provider all the values - from, value, contract, method, values"
    }
    let data = new contract.interface.encodeFunctionData(method, values);
    return data;
  }

  async contractCall(from: string, contract: any, method: string, values: Array<any>) : Promise<any> {
    if(from == "" || Object.values(contract) == Object.values({}) || method == "" || values.length == 0) {
      return "Provider all the values - from, value, contract, method, values"
    }
   let data = this.getEncodedFunctionCallData(contract, method, values)
    let tx = {
      from: from,
      to : contract.address,
      data: data,
      gasLimit: 250000
    }

    let res = await this.signer.call(tx)

    return res
  }

  async contractWriteWithSigner(signer: any = this.signer, contract: any, method: string, values: Array<any>, options : any = {}): Promise<any> {
    if( Object.values(contract) == Object.values({}) || method == "") {
      return "Provider all the values - signer, contract, method, values"
    }

    let data = this.getEncodedFunctionCallData(contract, method, values)
    let tx = {
      from: signer.address,
      to : contract.address,
      data: data,
    }

    let res = await this.signer.sendTransaction(this.signer.populateTransaction(tx), options)
    return res
  }

  async simulateContractWriteWithGasEstimation(from: string, contract: any, method: string, values: Array<any>, options: any = {}) : Promise<any> {
    if(from == "" || Object.values(contract) == Object.values({}) || method == "" || values.length == 0) {
      return "Provider all the values - from, contract, method, values"
    }
   let data = this.getEncodedFunctionCallData(contract, method, values)
   let tx = {
      from: from,
      to : contract.address,
      data: data,
      gasLimit: 250000
    }

    let res = await this.signer.estimateGas(this.signer.populateTransaction(tx), options)

    return res
  }

  getContractFactory(contractInterface: any, bytecode: string, signer: any = this.signer ): any {
    if(Object.values(contractInterface) == Object.values({}) || bytecode == ""){
      return "Please fill all the values - contractInterface, bytecode"
    }
    return new ethers.ContractFactory(contractInterface, bytecode, signer)
  }

  getContractFactoryWithDifferentSigner(contractFactory: any, signer: any, contractInterface: any = {}, bytecode: string = ""): any {
    if((Object.values(contractFactory) == Object.values({}) || (Object.values(contractInterface) == Object.values({}) && bytecode == "")) && Object.values(signer) == Object.values({}) ){
      return "Please fill all the values - contractFactory, signer OR contractInterface, bytecode, signer"
    }
    if(Object.values(contractFactory) != Object.values({})){
      return contractFactory.connect(signer)
    } else {
      return (new ethers.ContractFactory(contractInterface, bytecode, signer)).connect(signer)
    }
  }

  getContractFactoryInterface(contractFactory: any): any{
    return contractFactory.interface
  }

  getContractFactoryByteCode(contractFactory: any): any {
    return contractFactory.bytecode
  }

  getContractFactorySigner(contractFactory: any) : any {
    return contractFactory.signer
  }

  getContractFactoryWithDifferentAddress(contractFactory: any, address: string): any {
    return contractFactory.attach(address)
  }

  getContractDeployTransactionObject(contractFactory: any, values: any, options: any = {}) : any {
    return contractFactory.getDeployTransaction(values, options)
  }

  deployContract(contractFactory: any, values: any, options: any = {}) : any {
    return contractFactory.deploy(values, options)
  }
  
}
