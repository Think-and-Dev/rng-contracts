# Think and Dev Prize Savings Protocol - RNG Service

[![built-with openzeppelin](https://img.shields.io/badge/built%20with-OpenZeppelin-3677FF)](https://docs.openzeppelin.com/)

The [Think and Dev](https://www.thinkanddev.com/) Prize Savings Protocol Rsk smart contracts.

See the [documentation](https://docs.pooltogether.com/protocol/random-number-generator)

# Deployments

The Chainlink RNG is currently not supported.

The Blockhash RNG is supported on Rsk Mainnet and Rsk Testnet.

# Setup

Install Dependencies

```sh
$ yarn
```

Copy over .envrc.example to .envrc

```sh
$ cp .envrc.example .envrc
```

Make sure to update the enviroment variables with suitable values.

Now enable the env vars using [direnv](https://direnv.net/docs/installation.html)

```sh
$ direnv allow
```

# Interacting using Buidler Console

You can interact with the contract using the buidler console:

```sh
$ buidler console --network [network]
```

Then you can interact with deployed contracts:

```javascript
> const signer = (await ethers.getSigners())[0]
> const d = await deployments.all()
> const chainlink = await ethers.getContractAt('RNGChainlink', d.RNGChainlink.address, signer)
> const link = await ethers.getContractAt('IERC20', (await chainlink.getLink()), signer)
```

# Deploying

You can deploy using the deploy script:

```sh
$ yarn deploy [network]
```

Where [network] can be `rskmainnet`, `rsktestnet`, `rskregtest`.


# Development

Verify Codebase (hint + test)

```sh
$ yarn verify
```

Run Static Code Analysis

```sh
$ yarn hint
```

Run Tests

```sh
$ yarn test
```

Run Coverage

```sh
$ yarn coverage
```

Run Gas Report

```sh
$ yarn gas
```

Start Local TestRPC & Deploy

```sh
$ yarn start
```
# Already deployed contracts
Rsk Testnet:[ 0x2ad445b0efcb337db6682f6b904f0263bae85509](https://explorer.testnet.rsk.co/address/0x2ad445b0efcb337db6682f6b904f0263bae85509?__ctab=general)

