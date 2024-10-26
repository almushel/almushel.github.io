---
title: 5 Minute Guide for Login with Unstoppable with Popup
description: This integration guide is intended for a generic @uauth/js, no Ethereum provider, with callback, and with the popup feature.
showNextButton: false
---

# Unstoppable Login with Popup

In this integration guide, we will show how to add Login with Unstoppable with the pop-up feature to an empty HTML page. There will be no complicated install requirements – to complete this integration, you just need to be a JavaScript developer with a few minutes of time.

<div class="admonition info">
If you’d like to skip ahead or follow along you can download the [full example (1 KB zipped)](https://gist.github.com/perfect-cents/b2a0df5b73b441feb86168a272670565/archive/2463d1538d9e8257e70dc1908e65d95464665fe9.zip) beforehand.
</div>

## Step 1: Project Setup

Before we get started, you’ll need to install Node and Yarn or npm and create a directory for your project. Then, install the following packages into your app using one of the following scripts:

<div class="tabs" style="min-height: 9.5em">
<div class="tab">
<input type="radio" id="tab-1" name="tab-group-1" checked>
<label for="tab-1">yarn</label>
<div class="tab-content">

```shell
mkdir project && cd project
yarn init --yes
yarn add --dev parcel
yarn add @uauth/js
```

</div>
</div>
<div class="tab">
<input type="radio" id="tab-2" name="tab-group-1">
<label for="tab-2">npm</label>
<div class="tab-content">

```shell
mkdir project && cd project
npm init --yes
npm install --save-dev parcel
npm install --save @uauth/js
```

</div>
</div>
</div>

<div class="admonition info">
**@uauth/js** is the library used for implementing Login with Unstoppable on the frontend.
</div>

## Step 2: Create an HTML File

Build out the `index.html` file as follows:

```html
<html>
  <head>
    <title>Login with Unstoppable</title>
  </head>
  <body>
    <button onclick="login()">Login with Unstoppable</button>
    <button onclick="logout()">Logout</button>
    <script type="module" src="app.js"></script>
  </body>
</html>
```

## Step 3: Instantiate the Library

Now, configure the `app.js` as follows:

```javascript
import UAuth from '@uauth/js'

const uauth = new UAuth({
  clientID: 'uauth_example_spa_id',
  redirectUri: 'http://localhost:5000/callback',
})
```

## Step 4: Implement the Login Handler

Add a login function to `app.js` as follows:

```javascript
window.login = async () => {
  try {
    const authorization = await uauth.loginWithPopup()
 
    console.log(authorization)
  } catch (error) {
    console.error(error)
  }
}
```

## Step 5: Implement the Logout Handler
Add a logout function to `app.js` as follows:

```javascript
window.logout = async () => {
  await uauth.logout()
  console.log('Logged out with Unstoppable')
}
```

## Step 6: Login with Unstoppable

<div class="admonition warning">
Login with Unstoppable can be integrated with any EVM-compatible DApp (as well as [Solana](../../featured-updates#login-with-verified-solana-wallet) DApps). However, domains minted on testnets (e.g. Mumbai or Goerli) are not supported.
</div>

The following command will run the app. Keep in mind that the credentials will only work if you are on the correct port.

```shell
yarn parcel --open --port 5000 index.html
```

[Next to **Display the User's Domain**](../../get-started-login#step-3-display-the-users-domain)
