const Web3 = require('web3');
const fs = require('fs');
require('dotenv').config();

// Contract address and ABI
const CONTRACT_ADDRESS = '0xE3ad0d9FA786BB8f234aeA7e79EFcd27444D36Cf'; // UserOblivion
const CONTRACT_ABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "user",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "referrer",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "UserAdded",
        "type": "event"
    }
];

async function getUsers() {
    try {
        // Connect to Polygon network
        const web3 = new Web3('https://polygon-rpc.com');
        
        // Create contract instance
        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        
        console.log('Fetching UserAdded events...');
        
        // Get all UserAdded events
        const events = await contract.getPastEvents('UserAdded', {
            filter: {},
            fromBlock: 0,
            toBlock: 'latest'
        });
        
        console.log(`\nTotal users found: ${events.length}`);
        
        // Prepare CSV content
        let csvContent = 'User Address,Referrer Address,Timestamp\n';
        
        // Process events and add to CSV
        events.forEach(event => {
            const user = event.returnValues.user;
            const referrer = event.returnValues.referrer;
            const timestamp = new Date(event.returnValues.timestamp * 1000).toISOString();
            
            csvContent += `${user},${referrer},${timestamp}\n`;
        });
        
        // Write to CSV file
        const fileName = `users_${new Date().toISOString().replace(/[:.]/g, '-')}.csv`;
        fs.writeFileSync(fileName, csvContent);
        
        console.log(`\nData exported to ${fileName}`);
        console.log('File contains: User Address, Referrer Address, and Timestamp');
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

getUsers();
