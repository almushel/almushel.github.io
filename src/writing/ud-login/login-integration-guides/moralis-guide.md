---
title: Moralis Guide for Login With Unstoppable | UD Developer Portal
description: This integration guide is intended for a custom @uauth/js integration, with ethereum provider, using the Moralis library.
showNextButton: false
---

# Unstoppable Login: Moralis

This is the basic installation guide for the `moralis` library and is best used for single page applications (SPAs). For more information about this library, please see the [associated github repo](https://github.com/unstoppabledomains/uauth/tree/main/packages/moralis).

## Step 1: Install the Libraries

Install with `yarn` or `npm`.

<div class="tabs" style="min-height: 6em;">
<div class="tab">
<input type="radio" id="tab-1" name="tab-group-1" checked>
<label for="tab-1">yarn</label>
<div class="tab-content">

```shell
yarn add @uauth/moralis react-moralis moralis
```

</div>
</div>
<div class="tab">
<input type="radio" id="tab-2" name="tab-group-1">
<label for="tab-2">npm</label>
<div class="tab-content">

```shell
npm install --save @uauth/moralis react-moralis moralis
```

</div>
</div>
</div>

## Step 2: Configure the `moralis` Library

Next, configure the `moralis` library:

```typescript
// connectors.ts

import {UAuthMoralisConnector} from '@uauth/moralis'

// Instantiate your other connectors.
export const injected = {}

export const walletconnect = {provider: 'walletconnect'}

UAuthMoralisConnector.setUAuthOptions({
  clientID: process.env.REACT_APP_CLIENT_ID!,
  redirectUri: process.env.REACT_APP_REDIRECT_URI!,
  fallbackIssuer: process.env.REACT_APP_FALLBACK_ISSUER!,

  // Scope must include openid and wallet
  scope: 'openid wallet',
  // Injected and walletconnect connectors are required
  connectors: {injected, walletconnect},
});

export const uauth = {connector: UAuthMoralisConnector};

const connectors: Record<string, any> = {
  injected,
  walletconnect,
  uauth,
}

export default connectors
```

<div class="admonition info">
Because pop-ups are a more integration friendly approach, the `@uauth/moralis` library now uses them by default. If you want the "old" redirect functionality, you need to set `shouldLoginWithRedirect: true` in the options passed to `setUAthOptions()` and create a callback page.
</div>

## Step 3: Login with Unstoppable

Once configured, the `react-moralis` library can be used normally.

<div class="admonition warning">
Login with Unstoppable can be integrated with any EVM-compatible DApp (as well as [Solana](../../featured-updates#login-with-verified-solana-wallet) DApps). However, domains minted on testnets (e.g. Mumbai or Goerli) are not supported.
</div>

```typescript

import React from 'react'
import {useMoralis} from 'react-moralis'
import {uauth} from './connectors'

// On login button click...
async function handleLogin() {
  const {authenticate} = useMoralis()

  await authenticate(uauth)
}

// On logout button click...
async function handleLogout() {
  const {logout} = useMoralis();

  logout();
}
```

<div class="admonition success">
Congratulations!
You have implemented Login with Unstoppable with Moralis.
</div>

[Next to **Display the User's Domain**](../../get-started-login#step-3-display-the-users-domain)
