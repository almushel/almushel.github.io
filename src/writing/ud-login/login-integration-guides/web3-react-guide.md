---
title: Web3 React Guide for Login with Unstoppable | UD Developer Portal
description: This integration guide is intended for a custom @uauth/js integration, with ethereum provider, using web3 react library.
---

# Unstoppable Login: Web3 React

This is the basic installation guide for the [web3-react](https://github.com/Uniswap/web3-react/) framework and is best used for React-based single page applications (SPAs). For more information about the UAuth middleware package for web3-react, see the [reference](../../libraries/uauth-web3-react) and source code on [github](https://github.com/unstoppabledomains/uauth/tree/main/packages/web3-react).

<div class="admonition warning">
This guide is for `@uauth/web3-react` version `2.4.1-rc.0` and later, which uses the latest v8 beta branch of `web3-react`. For integrating Login with the previous [v6 branch](https://github.com/Uniswap/web3-react/tree/v6), see the [v6 Web3 React guide](../web3-react-v6-guide).
</div>

## Step 1: Install the Libraries

Install `web3-react` and the connectors for MetaMask, WalletConnect, and UAuth with `yarn` or `npm`.

<div class="tabs">
<div class="tab">
<input type="radio" id="tab-1" name="tab-group-1" checked>
<label for="tab-1">yarn</label>
<div class="tab-content">

```shell
yarn add @web3-react/core@beta @web3-react/metamask@beta @web3-react/walletconnect@beta @walletconnect/ethereum-provider @uauth/web3-react@2.4.1-rc.0
```

</div>
</div>
<div class="tab">
<input type="radio" id="tab-2" name="tab-group-1">
<label for="tab-2">npm</label>
<div class="tab-content">

```shell
npm install --save @web3-react/core@beta @web3-react/metamask@beta @web3-react/walletconnect@beta @walletconnect/ethereum-provider @uauth/web3-react@2.4.1-rc.0
```

</div>
</div>
</div>

## Step 2: Configure the `web3-react` Library

Next, configure the MetaMask, WalletConnect, and UAuth connectors for `web3-react`.

<figure>

```javascript
import {initializeConnector} from '@web3-react/core'
import {MetaMask} from '@web3-react/metamask'
import {WalletConnect} from '@web3-react/walletconnect'
import UAuth from '@uauth/js'
import {UAuthConnector} from '@uauth/web3-react'

UAuthConnector.registerUAuth(UAuth);

const metaMask = initializeConnector((actions) => new MetaMask({ actions }));

const walletConnect = initializeConnector(
  (actions) =>
    new WalletConnect({
      actions,
      options: {
        rpc: {1: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`},
        qrcode: true,
      },
    })
)

const uauth = initializeConnector(
  (actions) => new UAuthConnector({
    actions,
    options: {
      // These values can be copied from your dashboard client configuration
      clientID: process.env.REACT_APP_CLIENT_ID,
      redirectUri: process.env.REACT_APP_REDIRECT_URI,
      // Scope must include openid and wallet
      scope: 'openid wallet',

      // Injected/metamask and walletconnect connectors are required
      connectors: {injected: metaMask[0], walletconnect: walletConnect[0]}
    },
  })
)

const connectors = {
  "UAuth": uauth,
  "MetaMask": metaMask,
  "WalletConnect": walletConnect,
}

export default connectors
```

<figcaption> <code>connectors.js</code> </figcaption>
</figure>

<div class="admonition info">
Because popups are a more integration friendly approach, the `@uauth/web3-react` library now uses them by default. If you want the "old" redirect functionality, you need to set `shouldLoginWithRedirect: true` in your `UAuthConnectorConstructorArgs` and [create a callback page](../../libraries/uauth-web3-react#optionsshouldloginwithredirect).
</div>

## Step 3: Login with Unstoppable

Once the connector is configured, you can call the `activate()` method to trigger UAuth login. The example `App` component below creates a button to acivate and deactive the connector and displays a simple connection and error state.

<figure>

```jsx
import { useState } from 'react'
import connectors from './connectors.js'

function App() {
  const connector = connectors["UAuth"][0]

  // Get web3-react hooks from UAuthConnector
  const { useIsActivating, useIsActive } = connectors["UAuth"][1]
  const isActivating = useIsActivating()
  const isActive = useIsActive()

  const [connectionStatus, setConnectionStatus] = useState('Disconnected')
  const [error, setError] = useState()

  // Handle connector activation and update connection/error state
  const handleToggleConnect = () => {
    setError(undefined) // Clear error state
    
    if (isActive) {
      if (connector?.deactivate) {
        void connector.deactivate()
      } else {
        void connector.resetState()
      }
      setConnectionStatus('Disconnected')
    }
    else if (!isActivating) {
      setConnectionStatus('Connecting...')

      // Activate the connector and update states
      connector.activate(1)
        .then(() => {
          setConnectionStatus('Connected')
        })
        .catch((e) => {
          connector.resetState()
          setError(e)
        })
    }
  }

  return (
    <>
      <h1>Login with Unstoppable</h1>
      <h3>Status - {(error?.message) ? ("Error: " + error.message) : connectionStatus}</h3>
      
      <button onClick={handleToggleConnect} disabled={false}>
        {isActive ? "Disconnect" : "Connect"}
      </button>
    </>
  )
}

export default App
```

<figcaption> <code>App.jsx</code> </figcaption>
</figure>

<div class="admonition success">
Congratulations!
You have implemented Login with Unstoppable with web3-react.
</div>

[Next to **Display the User's Domain**](../../get-started-login#step-3-display-the-users-domain)
