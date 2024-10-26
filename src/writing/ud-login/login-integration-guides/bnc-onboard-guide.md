---
title: BNC Onboard Guide for Login with Unstoppable | UD Developer Portal
description: This integration guide is intended for a custom @uauth/js integration, with ethereum provider, using the BNC Onboard library.
showNextButton: false
---

# BNC Onboard Guide: Login with Unstoppable

<div class="admonition warning">
This guide and the `@uauth/bnc-onboard` package uses `bnc-onboard`, a deprecated version of the **Blocknative Onboard** library. For integrating with `web3-onboard` (onboard `v2.0.0` and later), see the [Web3 Onboard Guide](../web3-onboard-guide).
</div>

This is the basic installation guide for the `bnc-onboard` library and is best used for single page applications (SPAs). For more information about this library, please see the associated [GitHub repo](https://github.com/unstoppabledomains/uauth/tree/main/packages/bnc-onboard).

<figure>

![BNC Onboard with Unstoppable Domains](/images/login-selection-bnc-onboard.png '#width=70%')

<figcaption>BNC Onboard with Unstoppable Domains</figcaption>
</figure>

<figure>

![BNC Onboard with Unstoppable Domains](/images/login-selection-bnc-onboard.png '#width=70%')

<figcaption>BNC Onboard with Unstoppable Domains</figcaption>
</figure>

<div class="admonition info">
For a completed example of a BNC Onboard application, you can [download this example project](https://github.com/unstoppabledomains/uauth/blob/main/examples/bnc-onboard/).
</div>

## Step 1: Install the Libraries

Install with `yarn` or `npm`.

```shell
yarn add bnc-onboard @uauth/bnc-onboard @uauth/js @walletconnect/web3-provider
```

```shell
npm install --save bnc-onboard @uauth/bnc-onboard @uauth/js @walletconnect/web3-provider
```

## Step 2: Configure the @uauth/bnc-onboard Library

Next, configure the `@uauth/bnc-onboard` library:

```typescript
import UAuthBncOnboard from '@uauth/bnc-onboard'

const uauthOnboard = new UAuthBncOnboard({
  clientID: process.env.REACT_APP_CLIENT_ID!,
  redirectUri: process.env.REACT_APP_REDIRECT_URI!,
  postLogoutRedirectUri: process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI!,\
  // Scope must include openid and wallet
  scope: 'openid wallet',
})
```

You can also construct a `UAuth` instance before hand and use that to create the library.

```javascript
import UAuth from '@uauth/js'

const uauthOnboard = new UAuthBncOnboard({
  uauth: new UAuth({
    clientID: process.env.REACT_APP_CLIENT_ID!,
    redirectUri: process.env.REACT_APP_REDIRECT_URI!,
    postLogoutRedirectUri: process.env.REACT_APP_POST_LOGOUT_REDIRECT_URI!,
    scope: 'openid wallet',
  }),
})
```

<div class="admonition info">
Because pop-ups are a more integration friendly approach, the `@uauth/bnc-onboard` library now uses them by default. If you want the "old" redirect functionality, you need to set `shouldLoginWithRedirect: true` in the `ConstructorOptions` passed to your new instance of `UAuthBNCOnboard` and [create a callback page](../../libraries/uauth-bnc-onboard#shouldloginwithredirect).
</div>

## Step 3: Configure the bnc-onboard Library

Next, the `bnc-onboard` library needs to be configured.

```javascript
import initOnboard from 'bnc-onboard'

const onboard = initOnboard({
  dappId: process.env.REACT_APP_ONBOARD_KEY!,
  networkId: 1,
  walletSelect: {
    wallets: [
      {
        walletName: 'metamask',
        preferred: true,
      },
      {
        walletName: 'walletConnect',
        preferred: true,
        infuraKey: process.env.REACT_APP_INFURA_ID!,
      },
      // This creates a custom wallet module. See here: https://docs.blocknative.com/onboard#creating-custom-modules
      uauthOnboard.module({
        // Mark true if you want Unstoppable to be
        preferred: true,
        // Onboard uses a store system that makes it impossible to read the
        // state of other wallets. This means that we have to supply a seperate
        // configuration to the @walletconnect/web3-provider instance.
        // See here: https://docs.walletconnect.com/1.0/quick-start/dapps/web3-provider
        walletconnect: {
          infuraId: process.env.REACT_APP_INFURA_ID!,
        },
      }),
    ],
  },
})
```

## Step 4: Login with Unstoppable

Once configured, the `bnc-onboard` library can be used normally.

<div class="admonition warning">
Login with Unstoppable can be integrated with any EVM-compatible DApp (as well as [Solana](../../featured-updates#login-with-verified-solana-wallet) DApps). However, domains minted on testnets (e.g. Mumbai or Goerli) are not supported.
</div>

```javascript
import onboard from './onboard'

const handleLogin = async () => {
  await onboard.walletSelect()
  await onboard.walletCheck()
}

const handleLogout = () => {
  uauthOnboard.getUAuth().then(uauth => uauth.logout())
  onboard.walletReset()
}

```

[Next to **Display the User's Domain**](../../get-started-login#step-3-display-the-users-domain)
