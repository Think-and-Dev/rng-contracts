const { ethers } = require('./buidler');

const toWei = ethers.utils.parseEther
const toEth = ethers.utils.formatEther
const toBytes = ethers.utils.toUtf8Bytes
const toBytes32 = ethers.utils.formatBytes32String

const txOverrides = (options = {}) => ({gas: 20000000, ...options})

const chainName = (chainId) => {
  switch(chainId) {
    case 30: return 'Rsk Mainnet';
    case 31: return 'Rsk Testnet';
    case 33: return 'Rsk Regtest';
    case 31337: return 'BuidlerEVM';
    default: return 'Unknown';
  }
}

const contractManager = (buidler) => async (contractName, contractArgs = [], deployer) => {
  const { ethers, deployments } = buidler
  // Fix transaction format  error from etherjs getTransactionReceipt as transactionReceipt format
  // checks root to be a 32 bytes hash when on RSK its 0x01
  const format = ethers.provider.formatter.formats
  if (format) format.receipt['root'] = format.receipt['logsBloom']
  Object.assign(ethers.provider.formatter, { format: format })

  const { deploy } = deployments
  const [ defaultDeployer ] = await ethers.getSigners()
  Object.assign(defaultDeployer.provider.formatter, { format: format })
  deployer = deployer || defaultDeployer

  await deploy(contractName, {args: contractArgs, from: deployer._address, log: true})
  contract = await deployments.get(contractName)
  return new ethers.Contract(contract.address, contract.abi, deployer)
}

module.exports = {
  txOverrides,
  contractManager,
  chainName,
  toWei,
  toEth,
  toBytes,
  toBytes32,
}
