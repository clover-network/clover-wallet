# TokenKeeper

TokenKeeper is a wallet browser extension for [FUSOTAO](https://github.com/uinb/fusotao) and other blockchains(in the future).

## Prerequisites

- NodeJS >= v11
- Yarn latest

## Get It

Once published, TokenKeeper would be available in the Chrome and Firefox Web Store. Until then, it can be run via yarn by cloning this repo. Unpacked builds will be made available at [https://github.com/uinb/token-keeper](https://github.com/uinb/token-keeper) shortly.

### Installation

Execute the following to clone, install dependencies, and run a development server:

```
git clone https://github.com/uinb/token-keeper.git
cd token-keeper
yarn install
yarn run dev
```

Launch Chrome and do the following steps:

- Go to chrome://extensions
- Enable 'Developer Mode' (top right corner of window)
- Click "Load Unpacked" and select the token-keeper/dev/chrome directory
- Navigate to: https://localhost:3001 and accept the https connection

The TokenKeeper icon should show up in your Chrome toolbar.

If you prefer Firefox, refer to the following steps:

- Go to about:debugging#/runtime/this-firefox
- Click 'Load Temporary Addon' 
- select the token-keeper/dev/firefox directory
- Navigate to : https://localhost:3001 and accept the https connection
