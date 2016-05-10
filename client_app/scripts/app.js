(function(document) {
  'use strict';

  // Create IE + others compatible event handler
  var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
  var eventer = window[eventMethod];
  var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

  console.log("Have created event listener");

// Listen to message from child window
  eventer(messageEvent,function(e) {
    console.log('parent received message', e.data);
    if (e.data=='samlLogin' && window.appUser) {
      console.log("Have contacted app user 1");
      window.appUser.loginFromSaml();
      console.log("Have contacted app user 2");
    } else {
      console.error("Can't find appuser")
    }
  },false);

  var splashDiv, splashCore;
  window.app = document.querySelector("#app");

  var setupLocale = function (locale) {

    var storedLocale = localStorage.getItem('yp-user-locale');
    if (storedLocale) {
      window.locale = storedLocale;
    } else {
      window.locale = locale;
    }

    i18n.init({ lng: window.locale }, function(loaded) {
      if (window.app) {
        if (typeof window.app._i18nReady == 'function') {
           window.app._i18nReady();
         } else {
          console.warn("App has not been upgraded to Polymer object when translation is ready");
          setTimeout(function(){
            if (typeof window.app._i18nReady == 'function') {
              window.app._i18nReady();
            } else {
              console.error("App has not been upgraded to Polymer object when translation is ready");
            }
          }, 10000);
        }
      } else {
        console.error("App not ready when i18n is ready");
      }
      window.i18nTranslation = i18n;
      var event = new CustomEvent("iron-signal", { detail: { name: 'yp-18n-ready', data: null } } );
      document.dispatchEvent(event);
    });
  };

  var setupBetterReykjavikSplash = function () {
    splashCore = document.createElement("div");
    splashCore.id = "splashCore";
    splashDiv = document.createElement("div");
    splashDiv.id = "splashSub";
    splashDiv.innerHTML = '<span class="loadingText">Hleð inn...</span><br><span class="loadingHostname">'+window.location.hostname+'</span>';
    splashDiv.innerHTML += '<img width="280px" src="https://s3.amazonaws.com/yrpri-direct-asset/betrireykjavik_merki2_fb400_splash.png">';
    splashDiv.innerHTML += '<img src="https://s3.amazonaws.com/yrpri-direct-asset/heartSpinner.gif">';

    splashDiv.className = "js-fade fade-in";

    splashCore.onclick = onSplashClick;
    splashCore.appendChild(splashDiv);
    document.body.appendChild(splashCore);
    document.title = "Betri Reykjavík";
  };

  var setupBetterIcelandSplash = function () {
    splashCore = document.createElement("div");
    splashCore.id = "splashCore";
    splashDiv = document.createElement("div");
    splashDiv.id = "splashSub";
    splashDiv.innerHTML = '<span class="loadingText">Hleð inn...</span><br><span class="loadingHostname">'+window.location.hostname+'</span>';
    splashDiv.innerHTML += '<img src="https://s3.amazonaws.com/yrpri-direct-asset/BI_Splash_1.png">';
    splashDiv.innerHTML += '<img src="https://s3.amazonaws.com/yrpri-direct-asset/heartSpinner.gif">';

    splashDiv.className = "js-fade fade-in";

    splashCore.onclick = onSplashClick;
    splashCore.appendChild(splashDiv);
    document.body.appendChild(splashCore);

    document.title = "Betra Ísland";
  };

  var setupYourPrioritiesSplash = function () {
    splashCore = document.createElement("div");
    splashCore.id = "splashCore";
    splashDiv = document.createElement("div");
    splashDiv.id = "splashSub";
    // splashDiv.innerHTML = '<img src="">';
    splashDiv.innerHTML = '<span class="loadingText">Loading...</span><br><span class="loadingHostname">'+window.location.hostname+'</span>';
    splashDiv.innerHTML += '<img src="https://i.imgur.com/6MWkhrR.png">';
    splashDiv.innerHTML += '<img src="https://s3.amazonaws.com/yrpri-direct-asset/heartSpinner.gif">';

    splashDiv.className = "js-fade fade-in";

    splashCore.onclick = onSplashClick;
    splashCore.appendChild(splashDiv);
    document.body.appendChild(splashCore);
    document.title = "Your Priorities";
  };

  if (window.location.hostname.indexOf('betrireykjavik') > -1) {
    setupLocale('is');
    setupBetterReykjavikSplash();
  } else if (window.location.hostname.indexOf('betraisland') > -1) {
    setupLocale('is');
    setupBetterIcelandSplash();
  } else {
    setupLocale('en');
    setupYourPrioritiesSplash();
  }

  function onSplashClick() {
    var loadContainer = document.getElementById('splashCore');
    if (loadContainer) {
      loadContainer.parentNode.removeChild(loadContainer);
    }
    document.body.classList.remove('loading');
  }

  window.addEventListener('WebComponentsReady', function(e) {
    console.log("WebComponentsReady");
  });

})(document);
