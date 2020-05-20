import * as $ from 'jquery';
import {Client} from "@speechly/browser-client";

function initialize() {
    let client = new Client({
        appId: '0628a893-5f79-418b-bee9-e2b62064bd6c',
        language: 'en-US'
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