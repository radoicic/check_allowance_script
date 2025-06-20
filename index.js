const Web3 = require('web3');
const { LUCKYDRAW_WALLET_ADDRESSES, DEPOSITOBLIVION_WALLET_ADDRESSES } = require('./wallets');
require('dotenv').config();

// USDT contract address on Polygon
const USDT_CONTRACT_ADDRESS = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';
// The contract address you want to check allowance for
const LUCKYDRAW = '0x1aDB94BB4FEF5933e342fA31a2cAcadCEBbFdED4';
const DEPOSIT_OBLIVION = '0x4f191f16cf5b05966b66deefeade6db4cdf6ecfd';


// USDT contract ABI (allowance and balanceOf functions)
const USDT_ABI = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

async function checkAllowances(wallets_checking, spender_address) {
    try {
        // Connect to Polygon network
        const web3 = new Web3('https://polygon-rpc.com');

        // Create USDT contract instance
        const usdtContract = new web3.eth.Contract(USDT_ABI, USDT_CONTRACT_ADDRESS);

        console.log(`Checking USDT allowances for ${spender_address}...`);

        // Check allowance for each wallet
        for (const walletAddress of wallets_checking) {
            try {
                const allowance = await usdtContract.methods.allowance(walletAddress, spender_address).call();
                const allowanceInUSDT = web3.utils.fromWei(allowance, 'mwei'); // USDT uses 6 decimals
                console.log(`Wallet ${walletAddress} has allowance: ${allowanceInUSDT} USDT`);
            } catch (error) {
                console.error(`Error checking allowance for ${walletAddress}:`, error.message);
            }
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function checkBalances(wallets_checking) {
    try {
        // Connect to Polygon network
        // const web3 = new Web3('https://polygon-rpc.com');
        const web3 = new Web3('https://polygon-mainnet.public.blastapi.io');

        // Create USDT contract instance
        const usdtContract = new web3.eth.Contract(USDT_ABI, USDT_CONTRACT_ADDRESS);

        console.log('Checking USDT balances...');

        // Check balance for each wallet and calculate total
        let totalBalanceUSDT = 0;
        let totalwhales = 0;
        let whalelimit = 50;
        for (const walletAddress of wallets_checking) {
            try {
                const balance = await usdtContract.methods.balanceOf(walletAddress).call();
                const balanceInUSDT = web3.utils.fromWei(balance, 'mwei'); // USDT uses 6 decimals
                if (balanceInUSDT > whalelimit) {
                    totalwhales++;
                }
                if (balanceInUSDT > 0)
                    console.log(`Wallet ${walletAddress} has balance: ${balanceInUSDT} USDT`, balanceInUSDT > whalelimit ? ' *******' : '');
                totalBalanceUSDT += parseFloat(balanceInUSDT);
            } catch (error) {
                console.error(`Error checking balance for ${walletAddress}:`, error.message);
            }
        }
        console.log(`\nTotal balance across all wallets: ${totalBalanceUSDT.toFixed(6)} USDT`);
        console.log(`\nTotal whales with more than ${whalelimit} USDT: ${totalwhales}`);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function main() {
    /***
     * Check balances
     */
    if (true) {
        const wallets_checking = DEPOSITOBLIVION_WALLET_ADDRESSES;
        // const wallets_checking = LUCKYDRAW_WALLET_ADDRESSES;  
        console.log(`Starting USDT checks for ${wallets_checking.length} wallets for DEPOSITOBLIVION`);

        await checkBalances(wallets_checking);
    }


    console.log('\n');

    /***
     * Check allowances
     */
    if (false) {
        const spender_address = DEPOSIT_OBLIVION;
        // const spender_address = LUCKYDRAW;
        const allowance_owners = DEPOSITOBLIVION_WALLET_ADDRESSES;
        // const allowance_owners = LUCKYDRAW_WALLET_ADDRESSES;

        console.log(`Checking allowances for lucky draw for ${allowance_owners.length} wallets`);
        await checkAllowances(allowance_owners, spender_address);
    }
}

main();
