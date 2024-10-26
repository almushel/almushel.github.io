---
title: UAuth Libraries Overview | Unstoppable Domains Developer Portal
description: This page provides a high level overview of the UAuth core and middleware libraries.
---

# UAuth Libraries Overview

## Core libraries

|           Reference       |     Package         |               Description             |
| ------------------------- | ------------------- | ------------------------------------- |
| [UAuth JS](uauth-js)      |     `@uauth/js`     | SDK used for single-page applications |
| [UAuth Node](uauth-node)  |    `@uauth/node`    | SDK used  server-side applications    |

## Middleware libraries

The UAuth middleware libraries provide an additional custom interface for `@uauth/js` to simplify the process of integrating with several existing web3 libraries.

|     Reference                       |         Package         |               Description            |
| ----------------------------------- | ----------------------- | ------------------------------------ |
| [Web3-React](uauth-web3-react)      |  `@uauth/web3-react`    | Middleware library for Web3-React    |
| [Web3Modal](uauth-web3modal)        |  `@uauth/web3modal`     | Middleware library for Web3Modal     |
| [Web3-Onboard](web3-onboard-uauth)  |  `@web3-onboard/uauth`  | UAuth Module for Web3-Onboard        |
| [Moralis](uauth-moralis)            |  `@uauth/moralis`       | Middleware library for Moralis       |

## Examples

|                                      Example Project                                          |                          Description                                 |
| --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| [spa](https://github.com/unstoppabledomains/uauth/tree/main/examples/spa)                     | Basic login integration using the `@uauth/js` library.               |
| [web3-react](https://github.com/unstoppabledomains/uauth/tree/main/examples/web3-react)       | Login integration using the `@uauth/web3-react` library.             |
| [web3modal](https://github.com/unstoppabledomains/uauth/tree/main/examples/web3modal)         | Login integration using the `@uauth/web3modal` library.              |
| [web3-onboard](https://github.com/unstoppabledomains/uauth/tree/main/examples/web3-onboard/)  | Login integration using the `@uauth/web3-onboard` library.           |
| [moralis](https://github.com/unstoppabledomains/uauth/tree/main/examples/moralis/)            | Login integration using the `@uauth/moralis` library.                |
| [server](https://github.com/unstoppabledomains/uauth/tree/main/examples/server)               | Login integration using the `@uauth/node` library.                   |
| [sveltekit](https://github.com/unstoppabledomains/uauth/tree/main/examples/sveltekit)         | Login integration using the `sveltekit` framework and `@uauth/js`.   |

<br>

