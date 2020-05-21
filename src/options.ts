import * as $ from 'jquery';

// Saves options to chrome.storage.sync.
function save_options() {
  const app_id = $('#app-id-input').val();
  chrome.storage.sync.set({
    speechly_app_id: app_id,
  }, function() {
    // Update status to let user know options were saved.
    var status = $('#status');
    status.text('App ID saved.');
    setTimeout(function() {
      status.text('');
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value, but most likely the appid is already set in welcome page.
  chrome.storage.sync.get({
    speechly_app_id: '00000000-0000-0000-0000-000000000000',
  }, function(items: {speechly_app_id}) {
    $('#app-id-input').val(items.speechly_app_id);
  });
}

$('#save').click(save_options);
$(restore_options);