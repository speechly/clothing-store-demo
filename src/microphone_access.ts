import * as $ from 'jquery';
import {Client} from "@speechly/browser-client";

function initialize(appId: string, statusBar: JQuery<HTMLElement>) {
    let client = new Client({
        appId: appId,
        language: "en-US" // the clothing store demo supports only english at the moment
    })

    client.initialize((err?: Error) => {
        if (err !== undefined) {
            let msg = 'Failed to initialize Speechly client.' + err
            console.error(msg)
            msg += '\n\n Do you have the most recent version of the extension installed?'
            statusBar.text(msg)
        } else {
            let msg = 'Speechly initialized. \n You can now close this tab and \n start using the extension.\n\n'
            msg += "Go to ASOS website and \n navigate to 'Men' or 'Women' -> 'New in' -> 'View all'."
            console.log(msg)
            statusBar.text(msg)
        }
    })
}

$(document).ready(() => {
  const status = $('#status');
  const appId = process.env.SPEECHLY_APP_ID;
  initialize(appId, status);
});