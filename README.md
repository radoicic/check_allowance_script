# USDT Allowance & Balance Checker

A Node.js project for checking USDT allowances and balances on the Polygon network, as well as retrieving user data from smart contracts.

## Features

### 1. USDT Allowance & Balance Checking (`index.js`)
- **Check USDT Allowances**: Verify how much USDT a spender contract can access from user wallets
- **Check USDT Balances**: Get current USDT balances for multiple wallet addresses
- **Whale Detection**: Identify wallets with balances above a specified threshold (default: 50 USDT)
- **Total Balance Calculation**: Sum up total USDT across all checked wallets

### 2. User Data Retrieval (`getUsers.js`)
- **Fetch User Events**: Retrieve all `UserAdded` events from the UserOblivion smart contract
- **CSV Export**: Automatically export user data to timestamped CSV files
- **Data Format**: Includes user address, referrer address, and timestamp

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Access to Polygon network RPC endpoints

## Installation

1. Clone or download this project
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional, for environment variables):
```bash
# .env file (if needed for future enhancements)
# Add any environment variables here
```

## Usage

### Running the Main Script (Allowance & Balance Checking)

#### Using npm script:
```bash
npm start
```

#### Using batch file (Windows):
```bash
run.bat
```

#### Direct execution:
```bash
node index.js
```

### Running User Data Retrieval

#### Using batch file (Windows):
```bash
run_get_users.bat
```

#### Direct execution:
```bash
node getUsers.js
```

## Configuration

### Wallet Addresses (`wallets.js`)
The project includes predefined wallet lists for different purposes:

- **LUCKYDRAW_WALLET_ADDRESSES**: Wallets for lucky draw functionality
- **DEPOSITOBLIVION_WALLET_ADDRESSES**: Wallets for deposit oblivion functionality

You can modify these arrays in `wallets.js` to include your own wallet addresses.

### Contract Addresses
The following contract addresses are configured:

- **USDT Contract**: `0xc2132D05D31c914a87C6611C10748AEb04B58e8F` (Polygon USDT)
- **Lucky Draw Contract**: `0x1aDB94BB4FEF5933e342fA31a2cAcadCEBbFdED4`
- **Deposit Oblivion Contract**: `0x4f191f16cf5b05966b66deefeade6db4cdf6ecfd`
- **User Oblivion Contract**: `0xE3ad0d9FA786BB8f234aeA7e79EFcd27444D36Cf`

### RPC Endpoints
The project uses the following RPC endpoints:
- **Polygon RPC**: `https://polygon-rpc.com`
- **Alternative RPC**: `https://polygon-mainnet.public.blastapi.io`

## Output Files

### CSV Files (from getUsers.js)
User data is exported to CSV files with timestamps:
- Format: `users_YYYY-MM-DDTHH-MM-SS-sssZ.csv`
- Columns: User Address, Referrer Address, Timestamp

Example output files:
- `users_2025-04-10T12-39-56-070Z.csv`
- `users_2025-06-20T08-17-30-236Z.csv`

## Script Configuration

### index.js Configuration
In `index.js`, you can control which functions run by modifying the boolean flags:

```javascript
// Check balances (set to true to run)
if (true) {
    const wallets_checking = DEPOSITOBLIVION_WALLET_ADDRESSES;
    await checkBalances(wallets_checking);
}

// Check allowances (set to true to run)
if (false) {
    const spender_address = DEPOSIT_OBLIVION;
    const allowance_owners = DEPOSITOBLIVION_WALLET_ADDRESSES;
    await checkAllowances(allowance_owners, spender_address);
}
```

### Whale Detection
The balance checking function includes whale detection with a configurable threshold:

```javascript
let whalelimit = 50; // Wallets with more than 50 USDT are marked as whales
```

## Dependencies

- **web3**: Ethereum JavaScript API for interacting with the blockchain
- **dotenv**: Environment variable management
- **fs**: File system operations (built-in Node.js module)

## Network Information

This project operates on the **Polygon (MATIC) network**:
- Network: Polygon Mainnet
- Chain ID: 137
- USDT Decimals: 6 (not 18 like most ERC-20 tokens)

## Error Handling

The scripts include comprehensive error handling:
- Individual wallet errors don't stop the entire process
- Network connection issues are logged
- Invalid addresses are handled gracefully

## Example Output

### Balance Check Output:
```
Starting USDT checks...
Checking USDT balances...
Wallet 0x48e7b58ca47bc7a49ded77fcd748eb6d10bd9ce6 has balance: 125.500000 USDT *******
Wallet 0xa801b93c48b10725accf0604b792dd8c7461962b has balance: 25.750000 USDT

Total balance across all wallets: 151.250000 USDT
Total whales with more than 50 USDT: 1
```

### User Retrieval Output:
```
Fetching UserAdded events...
Total users found: 150
Data exported to users_2025-01-15T10-30-45-123Z.csv
File contains: User Address, Referrer Address, and Timestamp
```

## Troubleshooting

1. **Network Connection Issues**: Ensure you have internet access and the RPC endpoints are accessible
2. **Invalid Addresses**: Check that wallet addresses in `wallets.js` are valid Ethereum addresses
3. **Permission Errors**: Ensure you have write permissions in the project directory for CSV file creation

## License

This project is provided as-is for educational and utility purposes. 