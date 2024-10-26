---
title: Best Practices for Login with Unstoppable | UD Developer Portal
description: This guide covers the recommended best practices for integrating Login With Unstoppable with your dApp. 
---

# Best Practices for Login with Unstoppable

The following are some best practices for integrating your application with Login with Unstoppable.

## Confirm the Authorization Account

In addition to logging in with the controlling Ethereum or Polygon wallet,
the UAuth service allows users to login using certain verified accounts associated with the domain's **ud.me** profile,
such as a [Solana wallet address](../featured-updates#login-with-verified-solana-wallet).
You can check which account was used to authorize the login session 
using the [getAuthorizationAccount()](../libraries/uauth-js#getauthorizationaccount) method.




<div class="tabs" style="min-height: 10em;">
<div class="tab">
<input type="radio" id="tab-1" name="tab-group-1" checked>
<label for="tab-1">loginWithPopup()</label>
<div class="tab-content">

```javascript
// In the login handler
const authorization = await uauth.loginWithPopup();
const account = uauth.getAuthorizationAccount(authorization);
```

</div>
</div>
<div class="tab">
<input type="radio" id="tab-2" name="tab-group-1">
<label for="tab-2">loginCallback()</label>
<div class="tab-content">

```javascript
// On the callback page
const response = await uauth.loginCallback();
const account = uauth.getAuthorizationAccount(response.authorization);
```

</div>
</div>

<div class="tab">
<input type="radio" id="tab-3" name="tab-group-1">
<label for="tab-3">middleware</label>
<div class="tab-content">

```javascript
const authorization = await uauth.authorization();
const account = uauth.getAuthorizationAccount(authorization);
```

</div>
</div>
</div>

This will return a [VerifiedAddress](../libraries/uauth-js#verifiedaddress) describing the account used. For a standard Unstoppable Login, this will be the wallet address that owns the domain.

## Verify the Login Flow and Scopes

Before launching your application, you should verify the login flow that users will experience and ensure that correct scopes are being requested from users.
In the last modal screen shown below, only the minimum scopes are being requested by the application: [openID](../scopes-for-login#openid), 
[wallet](../scopes-for-login#wallet), and [email](../scopes-for-login#email).

<div style="display:flex;align-items:center;">
<figure style="margin: 0 0.25em">
![1) User Clicks Login with Unstoppable button to get started](../images/login-domains-modal1.png)
<figcaption>Modal 1</figcaption>
</figure>
<figure style="margin: 0 0.25em">
![2)User Enters Unstoppable Domain Address to Login to dApp](../images/login-domains-modal2-v3.png)
<figcaption>Modal 2</figcaption>
</figure>
<figure style="margin: 0 0.25em">
![3) User Consent screen details the scopes being requested by dApp](../images/consent-screen-marked-v2.png)
<figcaption>Modal 3</figcaption>
</figure>
</div>

The modals are further described below:

* **Modal 1.** User clicks on Login with Unstoppable Button.
* **Modal 2.** A modal is displayed which allows the user to begin the authorization process by entering their Unstoppable domain.
* **Modal 3.** During login, the user will see the resolved address and the information being requested by the application (i.e. the scopes).
The user must sign the transaction using their wallet address in order to share their information with the dApp.

## Style the Login Buttons

Your integration will need Unstoppable Domains branded login buttons. See the table below for style guidelines.



| State   | Color                           | Button                                                                          |
| ------- | :-----------------------------: | :-----------------------------------------------------------------------------: |
| Default | <span style="background-color:#0D67FE;">#0D67FE</span> | ![Large login button: default](../images/login-buttons/login-default-large.png) |
| Hover   | <span style="background-color:#0546B7;">#0546B7</span> | ![Large login button: hover](../images/login-buttons/login-hover-large.png)     |
| Pressed | <span style="background-color:#478BFE;">#478BFE</span> | ![Large login button: pressed](../images/login-buttons/login-pressed-large.png) |
| Loading | <span style="background-color:#0D67FE;">#0D67FE</span> | ![Large login button: loading](../images/login-buttons/login-loading-large.png) |

Or you can download the full set of default [Login With Unstoppable buttons](/images/login-buttons/ud-login-assets.zip).

[Next to **Promote Your Application**](../get-started-login#step-4-promote-your-application)

