import * as $ from 'jquery';
import {Client} from "@speechly/browser-client";

function initialize() {
    let client = new Client({
        appId: process.env.SPEECHLY_APP_ID,
        language: process.env.SPEECHLY_LANGUAGE
    })

    client.initialize((err?: Error) => {
        if (err !== undefined) {
            console.error('Failed to initialize Speechly client:', err)
        } else {
            console.log('Speechly client initialization worked')
        }
    })
}

$(document).ready(function(){
    initialize();
});