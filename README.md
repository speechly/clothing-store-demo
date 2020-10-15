# <a href="https://www.speechly.com/"><img src="https://www.speechly.com/images/logo.png" height="100" alt="Speechly"></a>

# Speechly shopping demo

This is a simple Chrome extension that shows how [Speechly](https://www.speechly.com/) enables easily filtering products by voice. 
Speechly configuration for the app can be found in [speechly_config.sal](speechly_config.sal).

Built with:

- [speechly-browser-client](https://github.com/speechly/browser-client)
- [chrome-extension-typescript-starter](https://github.com/chibat/chrome-extension-typescript-starter)
- [TypeScript](https://www.typescriptlang.org)

You can easily set it up locally to your Chrome browser.

### NOTE for React users

You can refer to our [React client example](https://github.com/speechly/react-example-repo-filtering/) to build something like this on React.

## How to use it?

Install the extension either from [Chrome Web Store](https://chrome.google.com/webstore/detail/cdlhelepiigikijnjmkonhhpdcmojlaa) or by following [these steps](https://github.com/speechly/clothing-store-demo#install-the-local-version-to-your-browser).

After installation you can find the Speechly icon next to URL bar:

<img src="extension_icon.png" alt="Speechly extension icon" width="300"/>

Go to [ASOS](https://www.asos.com) and navigate 'Men' or 'Women' -> 'New in' -> 'View all'. Click the Speechly icon to open a small popup with the microphone.
Speak aload your command while pressing the mic. You can see the transcript of your speech below the mic.

If you use the code as it is and the default SAL configuration [speechly_config.sal](speechly_config.sal), you can test it by saying for example
- filter the products from puma
- filter the medium sizes
- filter the orange colour

## Development
### Prerequisites

* [node + npm](https://nodejs.org/) (Current Version)

Install dependencies.
```
npm install
```
Build the extension to `dist` directory

```
npm run build
```
Build in watch mode
```
npm run watch
```
Test `npm run test`

### Install the local version to your browser

1. Clone the repository locally
2. Run `mv .env.local .env` and add your Speechly app id to .env file
3. Run `npm run build` to build the Chrome extension. Now `dist/` should contain the extension.
4. Navigate to `chrome://extensions` in your chrome browser. Expand the Developer dropdown menu and click "Load Unpacked Extension"
5xw. Choose the `dist` directory and click Ok
