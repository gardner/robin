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

var vote = 'grow'   // you can change 'grow' to 'abandon' or 'stay' 

var percentNonWordCharactersAllowed = .25;
var ratioUppercaseToLowercase = .25;

var filters = [ 'Robin Autovoter', 'nigger', 'Faggot', 'faggot', 'com.crackedglass.polydodge.droid', 'Autovote' ]

var msgsDeleted = 0;

function isReal(s) {
  var upperStr = s.replace(/[A-Z]/g, '')
  var upper = s.length - upperStr.length;
  
  var lowerStr = upperStr.replace(/[a-z]/g, '')
  var lower = upperStr.length - lowerStr.length;
  
  var nonWord = lowerStr.length;

  // if the ratio of uppercase to lowercase letters is greater that .25, fail the message
  if ((upper / lower) > ratioUppercaseToLowercase) {
//    console.log(upper + ' / ' + lower + ' / ' + nonWord + ' ratio is ' + upper / lower);
    return false;
  }

  // if the percentage of non-word characters is larger than 25% then fail the message
  if ((nonWord / s.length) > percentNonWordCharactersAllowed) {
//    console.log(upper + ' / ' + lower + ' / ' + nonWord + ' percentage is ' + nonWord / s.length);
    return false;
  }
  
  for (var i = 0; i < filters.length; i++) {
    if (s.indexOf(filters[i]) >=0 ) {
      // the string contains one of the filter words
      
      return false
    }
  }
  
  return true
}


$("#robinChatMessageList").bind("DOMSubtreeModified", function() {
  var msgs = $('.robin-message--message');
  console.log('number of msgs: ' + msgs.length + '/' + msgsDeleted);

  for(var i = 0; i < msgs.length; i++) {
    
    if (!isReal(msgs[i].innerText)) {
      msgsDeleted++;
      $(msgs[i]).parent().remove();
    }
  }
});

setTimeout(function(){
  $("#robinSendMessage > input[type='text']").val("/vote " + vote);
  $("#robinSendMessage > input[type='submit']").click();

    setTimeout(function(){
        window.location.reload();
    }, 300000);
}, 5000);
