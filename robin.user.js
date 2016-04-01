// ==UserScript==
// @name         Robin Autovoter
// @namespace    http://mayhem.nz
// @version      4.1
// @description  Block spam and via text on /robin
// @author       /u/terbeaux
// @match        https://www.reddit.com/robin*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

var filters = [ 'Robin Autovoter' ]

function isReal(s) {
  var upperStr = s.replace(/[A-Z]/g, '')
  var upper = s.length - upperStr.length;
  
  var lowerStr = upperStr.replace(/[a-z]/g, '')
  var lower = upperStr.length - lowerStr.length;
  
  var nonWord = lowerStr.length;

  // if the ratio of uppercase to lowercase letters is greater that .25, fail the message
  if ((upper / lower) > 0.25) {
    console.log(upper + ' / ' + lower + ' / ' + nonWord + ' ratio is ' + upper / lower);
    return false;
  }

  // if the percentage of non-word characters is larger than 25% then fail the message
  if ((nonWord / s.length) > .25) {
    console.log(upper + ' / ' + lower + ' / ' + nonWord + ' percentage is ' + nonWord / s.length);
    return false;
  }
  
  for (var i = 0; i < filters.length; i++) {
    if (s.indexOf(filters[i]) >=0 ) {
      // the string contains one of the filter words
      console.log(' hit filter word ');
      
      return false
    }
  }
  
  return true
}


$("#robinChatMessageList").bind("DOMSubtreeModified", function() {
  var msgs = $('.robin-message--message');

  for(var i = 0; i < msgs.length; i++) {
    
    if (!isReal(msgs[i].innerText)) {
      console.log(msgs[i].innerText);
      $(msgs[i]).parent().hide();
    }
  }
});

setTimeout(function(){
  $("#robinSendMessage > input[type='text']").val("/vote grow");
  $("#robinSendMessage > input[type='submit']").click();

    setTimeout(function(){
        window.location.reload();
    }, 300000);
}, 5000);