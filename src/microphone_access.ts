import * as $ from 'jquery';
import {Client} from "@speechly/browser-client";

function initialize(appId: string, statusBar: JQuery<HTMLElement>) {
    let client = new Client({
        appId: appId,
        language: "en-US" // the clothing store demo supports only english at the moment
    })

    client.initialize((err?: Error) => {
        if (err !== undefined) {
            const msg = 'Failed to initialize Speechly client:' + err
            console.error(msg)
            statusBar.text(msg)
        } else {
            const msg = 'Speechly initialization worked. \n You can now close this tab and \n start using the extension.'
            console.log(msg)
            statusBar.text(msg)
        }
    })
}

// Saves options to chrome.storage.sync.
function save_options() {
    const appId: string = $('#app-id-input').val() as string;
    chrome.storage.sync.set({
      speechly_app_id: appId.trim(),
    }, function() {
      // Update status to let user know options were saved.
      var status = $('#status');
      status.text('App ID saved.');
      setTimeout(function() {
        status.text('You might be asked to give access to microphone.');
        setTimeout(function() {
            initialize(appId, status);
          }, 1000);
      }, 750);
    });
  }

$(document).ready(function(){
    $('#save').click(save_options);
});