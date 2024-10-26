---
title: Web3 Onboard Guide for Login with Unstoppable | UD Developer Portal
description: This integration guide is intended for a custom @uauth/js integration, with ethereum provider, using the web3 onboard library.
showNextButton: false
---

# Unstoppable Login: Web3 Onboard

<div class="admonition warning">
`@uauth/web3-onboard` has been deprecated in favor of the `@web3-onboard/uauth` module and may no longer be supported. For new Web3-Onboard integrations, see the latest [Web3-Onboard Guide](../web3-onboard-guide.md) For integrations using `bnc-onboard`, see the [BNC Onboard Guide](../bnc-onboard-guide.md).
</div>

This is the basic installation guide for the `web3-onboard` library and is best used for single page applications (SPAs). For more information about this library, please see the [associated github repo](https://github.com/unstoppabledomains/uauth/tree/main/packages/web3-onboard).

<figure>

![Web3 Onboard with Unstoppable Domains](/images/login-selection-web3-onboard.png '#width=70%')

<figcaption>Web3 Onboard with Unstoppable Domains</figcaption>
</figure>

## Step 1: Install the Libraries

Install with `yarn` or `npm`.

<div class="tabs" style="min-height: 6em;">
<div class="tab">
<input type="radio" id="tab-1" name="tab-group-1" checked>
<label for="tab-1">yarn</label>
<div class="tab-content">

```shell
yarn add @uauth/web3-onboard @uauth/js @web3-onboard/core
```

</div>
</div>
<div class="tab">
<input type="radio" id="tab-2" name="tab-group-1">
<label for="tab-2">npm</label>
<div class="tab-content">

```shell
npm install --save @uauth/web3-onboard @uauth/js @web3-onboard/core
```

</div>
</div>
</div>

## Step 2: Configure the `web3-onboard` Library

```javascript
import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import UAuth from '@uauth/js'
import uauthBNCModule from '@uauth/web3-onboard'

const uauth = new UAuth({
  clientID: process.env.REACT_APP_CLIENT_ID!,
  redirectUri: process.env.REACT_APP_REDIRECT_URI!,
  fallbackIssuer: process.env.REACT_APP_FALLBACK_ISSUER!,
  scope: 'openid wallet',
})

const uauthBNCOptions = {
  uauth: uauth,
  walletconnect: {
    infuraId: process.env.REACT_APP_INFURA_ID!,
  },
}

const uauthModule = uauthBNCModule(uauthBNCOptions)

const onboard = Onboard({
    wallets: [injected, uauthModule],
    ...
  },
})
```

<div class="admonition info">
Because pop-ups are a more integration friendly approach, the `@uauth/web3-onboard` library now uses them by default. If you want the "old" redirect functionality, you need to set `shouldLoginWithRedirect: true` in your `uauthBNCOptions` and create a callback page.
</div>

## Step 3: Login with Unstoppable

Once configured, the `web3-onboard` library can be used normally.

```javascript
async function handleLogin() {
  const connectedWallets = await onboard.connectWallet()
}

async function handleLogout() {
  uauth.logout()
  onboard.disconnectWallet({label: 'Unstoppable'})
}
```

[Next to **Display the User's Domain**](../../get-started-login#step-3-display-the-users-domain)
