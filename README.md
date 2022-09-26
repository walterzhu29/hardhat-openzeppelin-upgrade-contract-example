## create your project folder
```
mkdir hardhat-openzeppelin-upgrade-contract-example
cd hardhat-openzeppelin-upgrade-contract-example
```
## init npm and install hardhat
```
npm init
npm install --save-dev hardhat
npx hardhat

npm install @openzeppelin/contracts-upgradeable
npm install --save-dev @nomicfoundation/hardhat-toolbox
npm install --save-dev @openzeppelin/hardhat-upgrades @nomiclabs/hardhat-ethers ethers
```
## create your token template from openzeppelin wizard
https://docs.openzeppelin.com/contracts/4.x/wizard

Copy generated code, open a folder `contracts` and create a `.sol` file named `MyToken.sol`
Paste code to `MyToken.sol`

Add `MyTokenV2` and override version function

## compile the contract
```
npx hardhat compile
```

## test token contract (doesn't need compile before you run)
```
npm install chai
npx hardhat test
```

# troubleshooting
### if hit issue like below when run your test:
```
% npx hardhat test
Error HH801: Plugin @nomicfoundation/hardhat-toolbox requires the following dependencies to be installed: @nomicfoundation/hardhat-network-helpers, @nomicfoundation/hardhat-chai-matchers, @nomiclabs/hardhat-ethers, @nomiclabs/hardhat-etherscan, @types/chai, @types/mocha, @typechain/ethers-v5, @typechain/hardhat, hardhat-gas-reporter, solidity-coverage, ts-node, typechain, typescript.
Please run: npm install --save-dev "@nomicfoundation/hardhat-network-helpers@^1.0.0" "@nomicfoundation/hardhat-chai-matchers@^1.0.0" "@nomiclabs/hardhat-ethers@^2.0.0" "@nomiclabs/hardhat-etherscan@^3.0.0" "@types/chai@^4.2.0" "@types/mocha@^9.1.0" "@typechain/ethers-v5@^10.1.0" "@typechain/hardhat@^6.1.2" "hardhat-gas-reporter@^1.0.8" "solidity-coverage@^0.8.1" "ts-node@>=8.0.0" "typechain@^8.1.0" "typescript@>=4.5.0"
```
run below command as suggested by npm (command might different)
```
npm install --save-dev "@nomicfoundation/hardhat-network-helpers@^1.0.0" "@nomicfoundation/hardhat-chai-matchers@^1.0.0" "@nomiclabs/hardhat-ethers@^2.0.0" "@nomiclabs/hardhat-etherscan@^3.0.0" "@types/chai@^4.2.0" "@types/mocha@^9.1.0" "@typechain/ethers-v5@^10.1.0" "@typechain/hardhat@^6.1.2" "hardhat-gas-reporter@^1.0.8" "solidity-coverage@^0.8.1" "ts-node@>=8.0.0" "typechain@^8.1.0" "typescript@>=4.5.0"
```

### if hit issue like below when run your test:
```
npx hardhat test


  Token contract
    1) Deployment should assign the total supply of tokens to the owner


  0 passing (10ms)
  1 failing

  1) Token contract
       Deployment should assign the total supply of tokens to the owner:
     TypeError: Cannot read property 'getSigners' of undefined
```
Add below require section to your `hardhat.config.js` file
```
require("@nomicfoundation/hardhat-toolbox");
```