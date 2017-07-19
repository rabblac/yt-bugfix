// Bugfix for the great suspender causing 400 error on youtube pages.
// More info here: https://github.com/deanoemcke/thegreatsuspender/issues/537
// Copyright (c) 2017 Rabblac
// Released under WTFPL license.

// Function "borrowed" from https://github.com/jamesdbloom/delete-all-cookies. Thanks! :)
var removeCookie = function (cookie) {
  var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain + cookie.path;
  chrome.cookies.remove({ "url": url, "name": cookie.name });
};

function deleteYTCookies() {
  //DEBUG: console.log("IMMA DELETIN COOKIEZ!!")
  chrome.cookies.getAll({domain: "youtube.com"}, function(cookies){
    for(var i=0; i<cookies.length; i++) {
      //DEBUG: console.log(cookies[i]);
      if (cookies[i].name.indexOf('gsScrollPos') !== -1){
        removeCookie(cookies[i]);
        //DEBUG: console.log("DELETED COOKIE: " + cookies[i].name);
      }
    }
  });
}

function onInit() {
  //DEBUG: console.log("onInit event");
  deleteYTCookies();
  chrome.alarms.create('DELETEMAHCOOKIEZ', {periodInMinutes: 10});
}

function onAlarm(alarm) {
  //DEBUG: console.log("onAlarm event");
  if (alarm && alarm.name == 'DELETEMAHCOOKIEZ') {
    deleteYTCookies();
  }
}

chrome.runtime.onInstalled.addListener(onInit);
chrome.alarms.onAlarm.addListener(onAlarm);