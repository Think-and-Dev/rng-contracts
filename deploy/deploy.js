// using plugin: buidler-deploy
// reference: https://buidler.dev/plugins/buidler-deploy.html

const {
  contractManager,
  chainName,
} = require('../js-utils/deployHelpers')

const VDFConfig = require('../vdf.config')

const debug = require('debug')('deploy.js')

module.exports = async (buidler) => {
  const { ethers, getNamedAccounts, deployments } = buidler
  // Fix transaction format  error from etherjs getTransactionReceipt as transactionReceipt format
  // checks root to be a 32 bytes hash when on RSK its 0x01
  const format = ethers.provider.formatter.formats
  if (format) format.receipt['root'] = format.receipt['logsBloom']
  Object.assign(ethers.provider.formatter, { format: format })

  const { deploy } = deployments
  const _getContract = contractManager(buidler)
  const network = await ethers.provider.getNetwork()
  const { chainId } = network

  //Currently not available in RSK
  // Named accounts, defined in buidler.config.js:
  // const {
  //   vrfCoordinator,
  //   linkToken
  // } = await getNamedAccounts()

  // const {
  //   fee,
  //   keyHash
  // } = VDFConfig

  const [ deployerWallet ] = await ethers.getSigners()
  Object.assign(deployerWallet.provider.formatter, { format: format })

  //Currently not available in RSK
  // const feeValue = fee[chainId] || fee.default
  // const keyHashValue = keyHash[chainId] || keyHash.default

  debug("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
  debug("Think and Dev RNG Service - Contract Deploy Script")
  debug("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n")

  debug("  Deploying to Network: ", chainName(chainId))

  //Currently not available in RSK
  // debug("\n  Using Contracts:")
  // debug("  - VRF:  ", vrfCoordinator)
  // debug("  - LINK: ", linkToken)
  // debug(" ")

  // Blockhash RNG
  const RNGBlockhash = await _getContract('RNGBlockhash', [])

  let RNGChainlink
  // Currently not available in RSK
  // if (vrfCoordinator) {
  //   let linkAddress = linkToken
  //   if (!linkAddress) {
  //     debug("\n  Deploying LINK token...")
  //     const linkResult = await deploy('Link', {
  //       contract: 'ERC20Mintable',
  //       from: deployerWallet._address,
  //       args: ['Chainlink Link', 'LINK']
  //     })
  //     linkAddress = linkResult.address
  //   }

  //   // Chainlink VRF
  //   RNGChainlink = await _getContract('RNGChainlink', [vrfCoordinator, linkAddress])

  //   debug("\n  Initializing RNGChainlink:")
  //   debug("  - fee:  ", feeValue)
  //   debug("  - keyHash:  ", keyHashValue)
  //   debug(" ")
  //   await RNGChainlink.setFee(feeValue)
  //   await RNGChainlink.setKeyhash(keyHashValue)
  // }

  // Display Contract Addresses
  debug("\n  Contract Deployments Complete!\n")
  debug("  - RNGBlockhash:   ", RNGBlockhash.address)
  //debug("  - RNGChainlink:   ", RNGChainlink ? RNGChainlink.address : 'NOT AVAILABLE')

  debug("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n")
}
