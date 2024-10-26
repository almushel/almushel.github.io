---
title: Web3-Onboard Guide for Login with Unstoppable | UD Developer Portal
description: This integration guide is intended for a custom @uauth/js integration, with ethereum provider, using the Blocknative UAuth module.
showNextButton: false
---

#  Unstoppable Login: Web3-Onboard

This is the basic integration guide for the Blocknative Web3-Onboard UAuth module and is best used for single page applications (SPAs). For more information about this module, please see the source code on [github](https://github.com/blocknative/web3-onboard/tree/v2-web3-onboard-develop/packages/uauth).

<figure>
<div style="width:70%;">
![Web3 Onboard with Unstoppable Domains](../../images/login-selection-web3-onboard.png)
</div>
<figcaption>Web3 Onboard with Unstoppable Domains</figcaption>
</figure>

## Step 1: Install the Blocknative Packages

<div class="tabs" style="min-height: 6em;">
<div class="tab">
<input type="radio" id="tab-1" name="tab-group-1" checked>
<label for="tab-1">yarn</label>
<div class="tab-content">

```shell
yarn add @web3-onboard/core @web3-onboard/uauth
```

</div>
</div>
<div class="tab">
<input type="radio" id="tab-2" name="tab-group-1">
<label for="tab-2">npm</label>
<div class="tab-content">

```shell
npm i @web3-onboard/core @web3-onboard/uauth
```

</div>
</div>
</div>

## Step 2: Configure UAuth

Configure the Blocknative UAuth module using the `clientID` and `redirectUri` from your [Login Client Configuration](../../login-integration-guides/login-client-configuration). The remaining fields of [uauthInitOptions](../../libraries/web3-onboard-uauth#uauthinitoptions) will be set to default values if left undefined. 

See [Scopes for Login](../../scopes-for-login) for more on the information you can request from users using the `scope` field.

``` javascript
import Onboard from '@web3-onboard/core'
import uauthModule from '@web3-onboard/uauth'

// initialize the module with options
const uauth = uauthModule({
  clientID: 'YOUR_CLIENT_ID',
  redirectUri: 'YOUR_REDIRECT_URI',
  scope?: 'YOUR_SCOPES',
  shouldLoginWithRedirect?: false
  bridge?: 'YOUR_CUSTOM_BRIDGE_SERVER',
  qrcodeModalOptions?: {
    mobileLinks: ['rainbow', 'metamask', 'argent', 'trust', 'imtoken', 'pillar']
  },
  connectFirstChainId?: true
})
```

## Step 3: Login With Unstoppable

Once configured, the UAuth module will function like any other wallet module in Web3-Onboard.

``` javascript
const onboard = Onboard({
  // ... other Onboard options
  wallets: [
    uauth
    //... other wallets
  ]
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

<div class="admonition success">
Congratulations!
You have implemented Login with Unstoppable with Blocknative Web3-Onboard.
</div>

[Next to **Display the User's Domain**](../../get-started-login#step-3-display-the-users-domain)
