# Speechly shopping demo

This is a simple Chrome extension that shows how Speechly enables easily filtering products by voice. 
Speechly configuration for the app can be found in [speechly_config.sal](speechly_config.sal).

Built with:

- [speechly-browser-client](https://github.com/speechly/browser-client)
- [chrome-extension-typescript-starter](https://github.com/chibat/chrome-extension-typescript-starter)
- [TypeScript](https://www.typescriptlang.org)

You can easily set it up locally to your Chrome browser.

## Add the extension to your browser

1. Create an app following the [quick-start](https://www.speechly.com/docs/quick-start/). You can take [speechly_config.sal](speechly_config.sal) as starting point for your configuration.
2. Note the app id of your new Speechly app.
3. Clone the repository locally
4. Run `npm run build` to build the Chrome extension. Now `dist/` should contain the extension.
5. Navigate to `chrome://extensions` in your chrome browser. Expand the Developer dropdown menu and click "Load Unpacked Extension"
6. Choose the `dist` directory and click Ok
7. The extension asks you now you app id. Use the one created in step 1. The browser might ask you to give the extenstion access to your microphone.
8. Navigate to asos.com product search and start filtering with your voice!

## How to use it?

The extension icon will on the right side of URL search bar of your Chrome browser. Click the Speechly icon to open a small popup with the microphone.
Speak aload your command while pressing the mic. You can see the transcript of your speach below the mic.

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


