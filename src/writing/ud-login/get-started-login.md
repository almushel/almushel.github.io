---
title: Getting Started with Login | Unstoppable Domains Developer Portal
description: This page provides a step-by-step overview of the Login integration process. This feature works for Polygon and Ethereum domains.
redirectFrom:
  - developer-integration
  - ../login-integration-guides/
  - ../login-integration-guides/integration-pathways/
  - get-started-login/integration-pathways/
---

# Getting Started with Login

Login with Unstoppable is a versatile feature with several integration pathways available for developers. This guide will step you through your first login integration with one of several supported libraries.

<div class="admonition warning">
Login with Unstoppable can be integrated with any EVM-compatible DApp (as well as [Solana](../featured-updates#login-with-verified-solana-wallet) DApps). However, domains minted on testnets (e.g. Mumbai or Goerli) are not supported.
</div>

## Step 1: Get Your Client Credentials

* Go to the [Client Management Dashboard](https://dashboard.auth.unstoppabledomains.com).
* Click the **Connect Wallet** and sign the transaction.
* Click the **Create Client** button to add a new client.

The dashboard will generate a unique **client ID** and open the configuration page for your new client. The **Client Metadata** is automatically populated with the `clientID` and default values for the `redirectURI` and `scope`. See [Login Client Configuration](../login-integration-guides/login-client-configuration) for more details about the settings on this page.

<figure>
<video loop autoplay muted width="100%" src="../videos/connect-wallet-and-create-client.mp4"></video>
<figcaption>Connect a wallet and create a new client</figcaption>
</figure>

Once you've created your client, you will need the **Client Metadata** to configure your UAuth application. This can be copied directly from the **Login** page of your **Client Configuration**.

<figure>

```javascript
{
    clientID: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    redirectUri: "http://localhost",
    scope: "openid wallet",
}
```

<figcaption>Example client metadata</figcaption>
</figure>

<div class="admonition info">
The `scope` property of your client metadata will default to `"openid wallet"`, which is the minimum scope required for login. You can request additional information from users by adding additional scopes to this string. For information on the other scopes Login supports, see [Scopes for Login](../scopes-for-login).
</div>

## Step 2: Choose Your Integration Path

There are several ways to integrate with Login with Unstoppable, which are listed in the table below.

Because pop-ups are a more integration friendly approach, every integration path except for **Login without Pop-up** and **Node.js Server** uses them by default. You can use redirects instead with the `login()` method of `@uauth/js` or the `shouldLoginWithRedirect` configuration option for other `@uauth/*` libraries.

For DApps built with web3 libraries like `web3-react`, `web3-modal`, `web3-onboard`, and `moralis`, UAuth provides packages that help you wrap a new UAuth instance in an interface that each library supports. After configuring these packages, you can continue using the web3 library normally.

| Integration Guide                                                       |                                         Example Project                                     |   Web3 Provider   | Package             |     Front-end UI   |
|-------------------------------------------------------------------------| :-----------------------------------------------------------------------------------------: | :---------------: |:-------------------:|:------------------:|
| [Login with Pop-up](../login-integration-guides/login-with-popup)          | [spa](https://github.com/unstoppabledomains/uauth/tree/main/examples/spa/)                  |       &#10060;    |`@uauth/js`          |      JavaScript    |
| [Login without Pop-up](../login-integration-guides/login-without-popup)    |                                                 -                                           |       &#10060;    |`@uauth/js`          |        React       |
| [Web3 React](../login-integration-guides/web3-react-guide)              | [web3-react](https://github.com/unstoppabledomains/uauth/blob/main/examples/web3-react/)    |       &#9989;     |`@uauth/web3-react`  |     `web3-react`   |
| [Web3 Modal](../login-integration-guides/web3-modal-guide)              | [web3modal](https://github.com/unstoppabledomains/uauth/blob/main/examples/web3modal/)      |       &#9989;     |`@uauth/web3modal`   |     `web3-modal`   |
| [Web3 Onboard](../login-integration-guides/web3-onboard-guide)          |                                               -                                             |       &#9989;     |`@web3-onboard/uauth`|   `web3-onboard`   |
| [Moralis](../login-integration-guides/moralis-guide)                    | [moralis](https://github.com/unstoppabledomains/uauth/blob/main/examples/moralis)           |       &#9989;     |`@uauth/moralis`     |     `moralis`      |
| [Node.js Server](../login-integration-guides/node-js-server-guide)      | [server](https://github.com/unstoppabledomains/uauth/tree/main/examples/server)             |       &#10060;    |`@uauth/node`        |        None        |
| [Auth0](../login-integration-guides/auth0-guide)                        | [UAuth + Auth0 ](https://github.com/unstoppabledomains/uauth-auth0-sample-dapp)             |       &#10060;    |      `auth0`        |       `auth0`      |

<div class="admonition info">
See the [UAuth Example App](https://example.auth.unstoppabledomains.com/) for a live demo of the login flow.
</div>

## Step 3: Display the User's Domain

Once a user has successfully authenticated, the application should display the user’s **domain** (and not their **wallet address**) in the application’s UI to confirm the authorization was successful.

<figure>
<div style="width:50%">
![Showing an authenticated user's domain](../images/third-UI-example-login-domains.png)
</div>
<figcaption>Showing an authenticated user's domain</figcaption>
</figure>

Authorizations are stored inside `localStorage`, so any identically configured `UAuth` instance has access to the same users.
Any integration using [@uauth/js](../libraries/uauth-js) or a dependent middleware package can access the authorized user information by instantiating a new [UAuth](../libraries/uauth-js#client) object with the same client options and calling the [user()](../libraries/uauth-js#user) method.

<div class="tabs" style="min-height:24em;">

<div class="tab">
<input type="radio" id="tab-1" name="tab-group-1" checked>
<label for="tab-1">@uauth/js</label>
<div class="tab-content">

```javascript
import UAuth from '@uauth/js'

const uauth = new UAuth({
  // ... options
})

uauth.user()
  .then((user) => {
    // user exists
    console.log("User information:", user)
  })
  .catch(() => {
    // user does not exist
  })
```

</div>
</div>

<div class="tab">
<input type="radio" id="tab-2" name="tab-group-1">
<label for="tab-2">web3-onboard</label>
<div class="tab-content">

```javascript
const wallets$ = onboard.state.select('wallets').pipe(share())

wallets$.subscribe(wallet => {
  const unstoppableUser = wallet.find(
    provider => provider.label === 'Unstoppable'
  )
  
  if (unstoppableUser) console.log(unstoppableUser.instance.user)
})
```

</div>
</div>

<div class="tab">
<input type="radio" id="tab-3" name="tab-group-1">
<label for="tab-3">web3-react</label>
<div class="tab-content">

```javascript
const uauthConnector = new UAuthConnector()

uauthConnector.uauth.user().then().catch()
```

</div>
</div>

<div class="tab">
<input type="radio" id="tab-4" name="tab-group-1">
<label for="tab-4">web3modal</label>
<div class="tab-content">

```javascript
import UAuth from '@uauth/js'

const uauthOptions = {
  clientID: "",
  redirectUri: ""
}

const web3ModalOptions = {
  'custom-uauth': {
    ...uauthOptions}
}

const web3Modal = new Web3Modal(web3ModalOptions)

new UAuth(uauthOptions).user().then().catch()
```

</div>
</div>

<div class="tab">
<input type="radio" id="tab-5" name="tab-group-1">
<label for="tab-5">moralis</label>
<div class="tab-content">

```javascript moralis
const uauthMoralisConnector = new UAuthMoralisConnector()

uauthMoralisConnector.uauth.user().then().catch()
```

</div>
</div>

</div>

The `user()` method will return a [UserInfo](../libraries/uauth-js#userinfo) object containing the information requested by your client scopes. The following key-value pairs would be returned by a login session with the minimum `"openid wallet"` scopes defined:

```json
{
  "sub" : "domain.tld", // The domain used to login
  "wallet_address" : "0x . . . ", // The Ethereum wallet that owns the domain
  "wallet_type_hint" : "web3",
  "eip4361_message" : "identity.unstoppable domains wants you sign in with your Ethereum account: . . . ",
  "eip4361_signature" : "0x . . . ",
}
```

## Step 4: Promote Your Application

Once your login integration is live, you can [promote your application](https://docs.unstoppabledomains.com/use-cases/promote-ud-integration) by submitting it to the official UD [app integrations database](https://unstoppabledomains.com/apps).

