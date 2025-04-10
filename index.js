const Web3 = require('web3');
require('dotenv').config();

// USDT contract address on Polygon
const USDT_CONTRACT_ADDRESS = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F';
// The contract address you want to check allowance for
const SPENDER_ADDRESS = process.env.SPENDER_ADDRESS;

// List of wallet addresses to check
const WALLET_ADDRESSES = [
    '0x48e7b58ca47bc7a49ded77fcd748eb6d10bd9ce6',
    '0xa801b93c48b10725accf0604b792dd8c7461962b',
    '0x6fecc83f4fbb0c13a0933fa7864e925602de7861',
    '0x9859b6eec67c75dcff190151313f936c761546e6',
    '0x324ed4b5055712fb07d187ddd2508592119cbcda',
    '0x3189e0620bf36dffbd8e330cee3df4320bb5cb49',
    '0xb3b824d14d08e85b93436dd06cc2a828d954bcf0',
    '0x58b290e3c3e99e8cd7b3d9c23e81b77f1e5dfc02',
    '0x319a259d48541febf976db78084c63d8c97ccd1e',
    '0xf90fd0b7fea6fc5ed8344a2a8906687872e28d71',
    '0x19368acb2fecfeadd77c33c4e0e1b93fa04291c5',
    '0xe10995b514db017608b6e7d7a2c086d269d21489',
    '0x0b17e191967f1270a4a9f59bd0ea9f28305e0547',
    '0x34ca0d2be1c661477fa6f59fc0036ddb94ee5564',
    '0x39b44f8943da8b56007b3165c124b83c36ec30b8',
    '0x15bca95455fe903a2e77f37b09713fe4446c71f3',
    '0x84334c76b3f7328b0c6e862473439f8970864563',
    '0x5ef57eab241f0d3fb071a35880c95979a2987608',
    '0xcd8ea1774664251c5b3ab8c111eb5022a930141a',
    '0x6adcea4b9ac76f7fda2a46ea90039d7654dedc02',
    '0x908190b4a1497f4207f22f8da839b2b0cbcbb4a4',
    '0xf26c14aac57894b704120dced2fe8bc96a78769a',
    '0x38fd2ec815512662cde885f73857064dc86d2f60',
    '0x6f733f8b9b8241294d7f66af077b2b1828295e40',
    '0x7a0d7f90e49ccd75bd85059a8116bad4a4b0333d',
    '0x339d882e4a9aeb529595009f7f119764d1c73dd4',
    '0xed4fe36830ec52806dd12c00af1bbcda0062e634',
    '0x794527b6680ea0b79d048ea2521dcb44c1c83295',
    '0x8cbe9b9605f26d7bdd65198dccb7d69bee211832',
    '0x29ee41482ba337c5f600da757b75acbbef2e8f06',
    '0x81f5c783d0a11e61e3407ba18c0b63770fae6808',
    '0xe0fccaafbc6ffcec9681bc1b6b5be751676ed0ac',
    '0xf121ef056e524c14492aba178c87af051741b7bd',
    '0x5bb5b35036c1860b3bb529e638c9b1008ddfa943',
    '0xfd69e617794afc276f8e03f63dea361e2c2a0a80',
    '0x9eae3450be2a8bc28db116b3266fde1221315988',
    '0x826d95c9662aa54611303e51a2c0faab250c78b6',
    '0xbab9fe7a9bc57c19fbb40332a080b9a0787f72f9',
    '0x5936e9e819ba50e22d1dcfdf1752063dd37beb31',
    '0xf87cec1de0e241279037935899b7ad7dab6df03e',
    '0xbfc3a00385bc363090fbf9991b46d28d4ad15ce4',
    '0x971be4f9ffad8cb86cc07fdd76f85519ffa7cb8e',
    '0x52041e940554974a8ed582d44ad65bb8db646ff7',
    '0x5734d1b1e85cce577d9ff21c662fc766ff4b24bc',
    '0x4e4d85c80dfb0bcc974c4ed9e6f9d2f7b0d826d6',
    '0x5182e116ee7f39be488c43a676486067082b85d4',
    '0x6b019335504d21056f6f003a15e0e848a5d4caa0',
    '0x5720aa732629423fc1fe57812eaf4e1b1b47b766',
    '0x63939f46f0ab491462b0f48298f7afd58c92b07d',
    '0x46e92d778bc5908c7fdfd24a6a0f656371cf91ee',
    '0x60e46caead436a493028d7b260191f8a9857365b',
    '0x98d257b2364b1acfa51c63eb3aa24345bd868235',
    '0x105c8636a4cd70aa846be7ff279440786631a1fa',
    '0xe5a891e574bfaa4a767810dc25c97048fffe3b97',
    '0x97e21c4068c7e12532525dc8d34a7da38f15efcb',
    '0x17192254e995ed9f7971327931a955464a9f1125',
    '0xac558f17108feba6ccbbfc1ca97ddfd30ebee062',
    '0xee9f7d71ceba78215315e2098d821684fb1188fb',
    '0x20ef30c0e40803d8550523c105ed5a538e7f1653',
    '0x619c67eae9d0dba38e4bc840e1e4d785f86d12c0',
    '0xef0121f67ac6fee94a6dd4bd1e2d78bd35e023e4',
    '0x56c7d30e0dae09852a48a492fd3d1d81b7e7dae9',
    '0x39b0cfe5f38cd533717c054fc82352d404b9c358',
    '0xdd513c41a86d63a9c1680465e25d30de7c7ea04d',
    '0xe1c0e8b0af929961b5e8b7e3904628008c43204c',
    '0x709da807ffa604710c931d4bccb5ad8ad0872178',
    '0xdd6b83e649611be119cb8fbdd92a44018edbddd8',
    '0x2344b38a5256a2e51e4efed8299379a7551d86b8',
    '0x4762975a4824d2e0e31bf5b4daccd2dcc59ef0f1',
    '0xb69fe3c4a41a68c8dfcd02ea2a60fd3fa5b7eefa',
    '0xd42878a89e5130e268f0fd6cc80daad70947afe1',
    '0xcd83d7ed0b11f4cdf18b8643a08cf0fd4e4d872e',
    '0x46db674b9aebf6e9b2861831f64994a57e5c8c7c',
    '0xa99be5402eb38b98bd7e6ef7d7a8d9168c8f288e',
    '0xbb29a3209dd5d197b662f5ffe089acd0034cf965',
    '0x6bc762ba6405baeeab25ef209c2b8d48b3bd4936',
    '0x8d89177b78e8bef36cc98b528b983320224c35a1',
    '0x2cf717b37beb9c306cb377b3d5e170227579444e',
    '0xfd22f1b56f1f6c639f46a88c0d94296e09e0602e',
    '0xe3c7f3c6693a693fc9c7e277332ac66c1dd8cfa6',
    '0x1795800b3a44c18abf1ae8133415735cf03024ed',
    '0x53df5769e4a7f0ad1e046086e5053742326ea90e',
    '0x651433265dc9e2c415a1be6d3d535b9add7149ee',
    '0x7e6ea52c1effefed159255abc7568691c67ef664',
    '0xaac85a72a3179815bcf36f37142419b7acc4b339',
    '0x0dc64c37e6378c16d7d10043d2b6f2d255ee0699'
];

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

async function checkAllowances() {
    try {
        // Connect to Polygon network
        const web3 = new Web3('https://polygon-rpc.com');
        
        // Create USDT contract instance
        const usdtContract = new web3.eth.Contract(USDT_ABI, USDT_CONTRACT_ADDRESS);
        
        console.log(`Checking USDT allowances for ${SPENDER_ADDRESS}...`);
        
        // Check allowance for each wallet
        for (const walletAddress of WALLET_ADDRESSES) {
            try {
                const allowance = await usdtContract.methods.allowance(walletAddress, SPENDER_ADDRESS).call();
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

async function checkBalances() {
    try {
        // Connect to Polygon network
        // const web3 = new Web3('https://polygon-rpc.com');
        const web3 = new Web3('https://polygon-mainnet.public.blastapi.io');
        
        // Create USDT contract instance
        const usdtContract = new web3.eth.Contract(USDT_ABI, USDT_CONTRACT_ADDRESS);
        
        console.log('Checking USDT balances...');
        
        // Check balance for each wallet and calculate total
        let totalBalanceUSDT = 0;
        for (const walletAddress of WALLET_ADDRESSES) {
            try {
                const balance = await usdtContract.methods.balanceOf(walletAddress).call();
                const balanceInUSDT = web3.utils.fromWei(balance, 'mwei'); // USDT uses 6 decimals
                console.log(`Wallet ${walletAddress} has balance: ${balanceInUSDT} USDT`, balanceInUSDT > 50 ?'🟢':'');
                totalBalanceUSDT += parseFloat(balanceInUSDT);
            } catch (error) {
                console.error(`Error checking balance for ${walletAddress}:`, error.message);
            }
        }
        console.log(`\nTotal balance across all wallets: ${totalBalanceUSDT.toFixed(6)} USDT`);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function main() {
    console.log('Starting USDT checks...');
    await checkBalances();
    console.log('\n');
    // await checkAllowances();
}

main();
