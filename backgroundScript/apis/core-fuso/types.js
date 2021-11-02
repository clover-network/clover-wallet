export const walletTypes = {
  "Address": "MultiAddress",
  "LookupSource": "MultiAddress",
  "BlockNumber": "u32",
  "Signature": "MultiSignature",
  "TokenInfo": {
    "total": "Balance",
    "symbol": "String"
  },
  "Balance": "u128",
  "TokenId": "u32",
  "Receipt": {
    "_enum": {
      "Coin": "(u128, u32)",
      "Token": "(TokenId, u128, u32)"
    }
  },
  "Pair": "(AccountId, AccountId)",
  "AccountData": {
    "free": "Balance",
    "reserved": "Balance",
    "misc_frozen": "Balance",
    "fee_frozen": "Balance"
  },
  "TokenAccountData": {
    "free": "Balance",
    "reserved": "Balance"
  },
  "Dominator": {
    "merkle_root": "Hash",
    "pledged": "Balance",
    "sequence": "(u64, u32)"
  },
  "AmountOfCoin": "Balance",
  "AmountOfToken": "Balance",
  "DominatorStatus": {
    "_enum": [
      "Active",
      "Closing",
      "Banned"
    ]
  },
  "AssetId": "u32",
  "Voter": {
    "round": "u32",
    "account": "AccountId",
    "amount": "Balance",
    "pledger": "Vec<Pledger<AccountId, BlockNumber, Balance>>"
  },
  "Pledger": {
    "account": "AccountId",
    "block_number": "BlockNumber",
    "amount": "Balance"
  },
  "MemberOf": "Vec<Voter>",
  "HostingPair": "(AccountId, AccountId)",
  "Proof": {
    "event_id": "u64",
    "user_id": "AccountId",
    "nonce": "u32",
    "signature": "Vec<u8>",
    "cmd": "Command",
    "leaves": "Vec<MerkleLeaf>",
    "proof_of_exists": "Vec<u8>",
    "proof_of_cmd": "Vec<u8>",
    "root": "[u8; 32]"
  },
  "MerkleLeaf": {
    "key": "Vec<u8>",
    "old_v": "[u8; 32]",
    "new_v": "[u8; 32]"
  },
  "Command": {
    "_enum": {
      "AskLimit": "((Compact<u64>, Compact<u64>), Compact<u128>, Compact<u32>, Compact<u32>, Compact<u32>, Compact<u32>)",
      "BidLimit": "((Compact<u64>, Compact<u64>), Compact<u128>, Compact<u32>, Compact<u32>, Compact<u32>, Compact<u32>)",
      "Cancel": "(Compact<u32>, Compact<u32>)",
      "TransferOut": "(Compact<u32>, Compact<u128>)",
      "TransferIn": "(Compact<u32>, Compact<u128>)"
    }
  }
};
