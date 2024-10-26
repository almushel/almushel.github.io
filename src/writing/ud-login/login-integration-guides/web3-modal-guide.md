---
title: Web3 Modal Guide for Login with Unstoppable | UD Developer Portal
description: This integration guide is intended for a custom @uauth/js integration, with ethereum provider, using web3 modal library.
showNextButton: false
---

# Unstoppable Login: Web3 Modal

This is the basic installation guide for the `web3modal` library and is best used for single page applications (SPAs). For more information about this library, please see the [associated github repo](https://github.com/unstoppabledomains/uauth/tree/main/packages/web3modal).

<figure>
![Web3 Modal with Unstoppable Domains](../../images/login-selection-web3modal.png)
<figcaption>Web3 Modal with Unstoppable Domains</figcaption>
</figure>

## Step 1: Install the Libraries

Install with `yarn` or `npm`.

<div class="tabs">
<div class="tab">
<input type="radio" id="tab-1" name="tab-group-1" checked>
<label for="tab-1">yarn</label>
<div class="tab-content">

```shell
yarn add web3modal @uauth/web3modal @uauth/js @walletconnect/web3-provider
```

</div>
</div>
<div class="tab">
<input type="radio" id="tab-2" name="tab-group-1">
<label for="tab-2">npm</label>
<div class="tab-content">

```shell
npm install --save web3modal @uauth/web3modal @uauth/js @walletconnect/web3-provider
```

</div>
</div>
</div>

## Step 2: Configure the `web3modal` Library

Next, configure the `web3modal` library:

```typescript
import * as UAuthWeb3Modal from '@uauth/web3modal'
import UAuthSPA from '@uauth/js'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3Modal from 'web3modal'

// These options are used to construct the UAuthSPA instance.
export const uauthOptions: IUAuthOptions = {
  clientID: 'uauth_client_id',
  redirectUri: 'http://localhost:3000',

  // Must include both the openid and wallet scopes.
  scope: 'openid wallet',
}

const providerOptions = {
  // Currently the package isn't inside the web3modal library. For now,
  // users must use this libary to create a custom web3modal provider.

  // All custom `web3modal` providers must be registered using the "custom-"
  // prefix.
  'custom-uauth': {
    // The UI Assets
    display: UAuthWeb3Modal.display,

    // The Connector
    connector: UAuthWeb3Modal.connector,

    // The SPA libary
    package: UAuthSPA,

    // The SPA libary options
    options: uauthOptions,
  },

  // For full functionality we include the walletconnect provider as well.
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: 'INFURA_ID',
    },
  },

  // Include any other web3modal providers here
}

const web3modal = new Web3Modal({providerOptions})

// Register the web3modal so the connector has access to it.
UAuthWeb3Modal.registerWeb3Modal(web3modal)

export default web3modal
```

<div class="admonition info">
Because pop-ups are a more integration friendly approach, the `@uauth/web3modal` library now uses them by default. If you want the "old" redirect functionality, you need to set `shouldLoginWithRedirect: true` in your `IUAuthOptions` and [create a callback page](../../libraries/uauth-web3modal#shouldloginwithredirect) 
</div>

## Step 3: Login with Unstoppable

Once configured, the `web3modal` library can be used normally.

<div class="admonition warning">
Login with Unstoppable can be integrated with any EVM-compatible DApp (as well as [Solana](../../featured-updates#login-with-verified-solana-wallet) DApps). However, domains minted on testnets (e.g. Mumbai or Goerli) are not supported.
</div>

```javascript
import web3modal from './web3modal'
import Web3 from 'web3'

async function handleLogin() {
  const provider = await web3modal.connect()
}

function handleLogout() {
  if (web3modal.cachedProvider === 'custom-uauth') {
    await uauth.logout()
  }
  web3modal.clearCachedProvider()
}

// Save provider in state
```

<div class="admonition success">
Congratulations!
You have implemented Login with Unstoppable with web3modal.
</div>

[Next to **Display the User's Domain**](../../get-started-login#step-3-display-the-users-domain)
