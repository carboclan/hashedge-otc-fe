import { web3 } from 'web3-api-wrap';
const hashedgeContracts = require('./contracts')(web3, require('./abi.json'));
export { web3, hashedgeContracts };
