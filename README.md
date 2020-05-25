# Speechly shopping demo

This is a simple Chrome extension that shows how Speechly enables easily filtering products by voice. 
Speechly configuration for the app can be found in [speechly_config.sal](speechly_config.sal).

Built with:

- [speechly-browser-client](https://github.com/speechly/browser-client)
- [chrome-extension-typescript-starter](https://github.com/chibat/chrome-extension-typescript-starter)
- [TypeScript](https://www.typescriptlang.org)

You can easily set it up locally to your Chrome browser.

## How to use it?

Start by creating an Speechly app, following the [quick-start](https://www.speechly.com/docs/quick-start/). You can take [speechly_config.sal](speechly_config.sal) as starting point for your configuration. Note the app id of your new Speechly app.

Install the extension either from [Chrome Web Store](https://chrome.google.com/webstore/detail/cdlhelepiigikijnjmkonhhpdcmojlaa) or cloning this repository and following [these steps](https://github.com/speechly/clothing-store-demo#add-the-extension-to-your-browser). When you install the extension, you are asked to provide Speechly app id.

After installation you can find the Speechly icon next to URL bar:
![Speechly extension icon](extension_icon.png)
Navigate to [ASOS](https://www.asos.com) and click the Speechly icon to open a small popup with the microphone.
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

### Install the local version to browser

1. Clone the repository locally
2. Run `npm run build` to build the Chrome extension. Now `dist/` should contain the extension.
3. Navigate to `chrome://extensions` in your chrome browser. Expand the Developer dropdown menu and click "Load Unpacked Extension"
4. Choose the `dist` directory and click Ok
