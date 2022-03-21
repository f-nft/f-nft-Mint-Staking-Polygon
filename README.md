## OpenSeaCreatures ERC721 contracts

### About OpenSea Creatures.

This is a very simple sample ERC721 for the purposes of demonstrating integration with the [OpenSea](https://opensea.io) marketplace. We include a script for minting the items.

Additionally, this contract whitelists the proxy accounts of OpenSea users so that they are automatically able to trade the ERC721 item on OpenSea (without having to pay gas for an additional approval). On OpenSea, each user has a "proxy" account that they control, and is ultimately called by the exchange contracts to trade their items. (Note that this addition does not mean that OpenSea itself has access to the items, simply that the users can list them more easily if they wish to do so)

## Requirements

### Node version

Either make sure you're running a version of node compliant with the `engines` requirement in `package.json`, or install Node Version Manager [`nvm`](https://github.com/creationix/nvm) and run `nvm use` to use the correct version of node.

## Installation

Run
```bash
npm install
```

If you run into an error while building the dependencies and you're on a Mac, run the code below, remove your `node_modules` folder, and do a fresh `npm install`:

```bash
xcode-select --install # Install Command Line Tools if you haven't already.
sudo xcode-select --switch /Library/Developer/CommandLineTools # Enable command line tools
sudo npm explore npm -g -- npm install node-gyp@latest # Update node-gyp
```

## Deploying

### Deploying to the Rinkeby network.

1. You'll need to sign up for [Infura](https://infura.io). and get an API key.
2. Using your API key and the mnemonic for your Metamask wallet (make sure you're using a Metamask seed phrase that you're comfortable using for testing purposes), run:

```
export INFURA_KEY="<your_infura_project_id>"
export MNEMONIC="<metmask_mnemonic>"
DEPLOY_CREATURES_SALE=1 yarn truffle deploy --network rinkeby
```

### Minting tokens.

After deploying to the Rinkeby network, there will be a contract on Rinkeby that will be viewable on [Rinkeby Etherscan](https://rinkeby.etherscan.io). For example, here is a [recently deployed contract](https://rinkeby.etherscan.io/address/0xeba05c5521a3b81e23d15ae9b2d07524bc453561). You should set this contract address and the address of your Metamask account as environment variables when running the minting script:

```
export OWNER_ADDRESS="<my_address>"
export NFT_CONTRACT_ADDRESS="<deployed_contract_address>"
export NETWORK="rinkeby"
node scripts/mint.js
```

### Diagnosing Common Issues

When running the minting script on mainnet, your environment variable needs to be set to `mainnet` not `live`.  The environment variable affects the Infura URL in the minting script, not truffle. When you deploy, you're using truffle and you need to give truffle an argument that corresponds to the naming in truffle.js (`--network live`).  But when you mint, you're relying on the environment variable you set to build the URL (https://github.com/ProjectOpenSea/opensea-creatures/blob/master/scripts/mint.js#L54), so you need to use the term that makes Infura happy (`mainnet`).  Truffle and Infura use the same terminology for Rinkeby, but different terminology for mainnet.  If you start your minting script, but nothing happens, double check your environment variables.

If you're running a modified version of `sell.js` and not getting expected behavior, check the following:

* Is the `expirationTime` in future?  If no, change it to a time in the future.

* Is the `expirationTime` a fractional second?  If yes, round the listing time to the nearest second.

* Are the input addresses all strings? If no, convert them to strings.

* Are the input addresses checksummed?  You might need to use the checksummed version of the address.

* Is your computer's internal clock accurate? If no, try enabling automatic clock adjustment locally or following [this tutorial](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/set-time.html) to update an Amazon EC2 instance.

* Do you have any conflicts that result from globally installed node packages?  If yes, try `npm uninstall -g truffle; npm install -g truffle@5.0.37`

* Are you running a version of node compliant with the `engines` requirement in `package.json`?  If no, try `nvm use 8.11.2; rm -rf node_modules; npm i`

# About OpenSea Creature Accessories

This is a sample ERC-1155 contract for the purposes of demonstrating integration with the [OpenSea](https://opensea.io) marketplace for crypto collectibles. We also include:
- A factory contract for making sell orders for unminted items (allowing for **gas-free and mint-free presales**).
- A configurable lootbox contract for selling randomized collections of ERC-1155 items.

On top of the features from the OpenSea ERC721 sample contracts above, ERC1155
- supports multiple creators per contract, where only the creator is able to mint more copies
- supports pre-minted items for the lootbox to choose from

## Configuring the Lootbox

Open CreatureAccessoryLootbox.sol

1. Change `Class` to reflect your rarity levels.
2. Change `NUM_CLASSES` to reflect how many classes you have (this gets used for sizing fixed-length arrays in Solidity)
3. In `constructor`, set the `OptionSettings` for each of your classes. To do this, as in the example, call `setOptionSettings` with
   1. Your option id,
   2. The number of items to issue when the box is opened,
   3. An array of probabilities (basis points, so integers out of 10,000) of receiving each class. Should add up to 10k and be descending in value.
4. Then follow the instructions below to deploy it! Purchases will auto-open the box. If you'd like to make lootboxes tradable by users (without a purchase auto-opening it), contact us at contact@opensea.io (or better yet, in [Discord](https://discord.gg/ga8EJbv)).

## Why are some standard methods overridden?

This contract overrides the `isApprovedForAll` method in order to whitelist the proxy accounts of OpenSea users. This means that they are automatically able to trade your ERC-1155 items on OpenSea (without having to pay gas for an additional approval). On OpenSea, each user has a "proxy" account that they control, and is ultimately called by the exchange contracts to trade their items.

Note that this addition does not mean that OpenSea itself has access to the items, simply that the users can list them more easily if they wish to do so!

# Requirements

### Node version

Either make sure you're running a version of node compliant with the `engines` requirement in `package.json`, or install Node Version Manager [`nvm`](https://github.com/creationix/nvm) and run `nvm use` to use the correct version of node.

## Installation

Run
```bash
yarn
```

## Deploying

### Deploying to the Rinkeby network.

1. You'll need to sign up for [Infura](https://infura.io). and get an API key.
2. You'll need Rinkeby ether to pay for the gas to deploy your contract. Visit https://faucet.rinkeby.io/ to get some.
3. Using your API key and the mnemonic for your MetaMask wallet (make sure you're using a MetaMask seed phrase that you're comfortable using for testing purposes), run:

```
export INFURA_KEY="<infura_key>"
export MNEMONIC="<metmask_mnemonic>"
DEPLOY_ACCESSORIES_SALE=1 yarn truffle migrate --network rinkeby
```

### Deploying to the mainnet Ethereum network.

Make sure your wallet has at least a few dollars worth of ETH in it. Then run:

```
yarn truffle migrate --network live
```

Look for your newly deployed contract address in the logs! 🥳

### Viewing your items on OpenSea

OpenSea will automatically pick up transfers on your contract. You can visit an asset by going to `https://opensea.io/assets/CONTRACT_ADDRESS/TOKEN_ID`.

To load all your metadata on your items at once, visit [https://opensea.io/get-listed](https://opensea.io/get-listed) and enter your address to load the metadata into OpenSea! You can even do this for the Rinkeby test network if you deployed there, by going to [https://rinkeby.opensea.io/get-listed](https://rinkeby.opensea.io/get-listed).

### Troubleshooting

#### It doesn't compile!
Install truffle locally: `yarn add truffle`. Then run `yarn truffle migrate ...`.

You can also debug just the compile step by running `yarn truffle compile`.

#### It doesn't deploy anything!
This is often due to the truffle-hdwallet provider not being able to connect. Go to infura.io and create a new Infura project. Use your "project ID" as your new `INFURA_KEY` and make sure you export that command-line variable above.

### ERC1155 Implementation

To implement the ERC1155 standard, these contracts use the Multi Token Standard by [Horizon Games](https://horizongames.net/), available on [npm](https://www.npmjs.com/package/multi-token-standard) and [github](https://github.com/arcadeum/multi-token-standard) and also under the MIT License.

# Running Local Tests

In one terminal window, run:

    yarn run ganache-cli

Once Ganache has started, run the following in another terminal window:

    yarn run test
