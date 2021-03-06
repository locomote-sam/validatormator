// Generated by CoffeeScript 1.9.3
(function() {
  var match, v;

  match = function(regex, val, msg, cb) {
    if (regex.test(val)) {
      return (typeof cb === "function" ? cb() : void 0) || true;
    }
    return (typeof cb === "function" ? cb(msg) : void 0) || false;
  };

  module.exports = v = {
    emailSync: function(email) {
      var regex;
      regex = /^"?[A-Z0-9_%+-]+\.?[A-Z0-9_%+-]*"?[^\.]@\[?([^-_]([A-Z-_]+\.[A-Z]+)+|[0-9]{3}\.[0-9]{3}\.[0-9]{3}\.[0-9]{3})\]?$/i;
      return match(regex, email);
    },
    email: function(msg) {
      if (msg == null) {
        msg = "Invalid Email specified";
      }
      return function(email, cb) {
        if (!v.emailSync(email)) {
          return cb(msg);
        }
        return cb();
      };
    },
    urlSync: function(url, opts) {
      var excludePrivateAndLocalNetworks, hostFirstPass, hostSecondPass, localStr, post, pre;
      if (opts == null) {
        opts = {};
      }
      excludePrivateAndLocalNetworks = "10(?:\\.\\d{1,3}){3}" + "|127(?:\\.\\d{1,3}){3}" + "|169\\.254(?:\\.\\d{1,3}){2}" + "|192\\.168(?:\\.\\d{1,3}){2}" + "|172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2}";
      pre = "^" + "(?:(?:https?|ftp)://)" + "(?:\\S+(?::\\S*)?@)?";
      post = "(?::\\d{2,5})?" + "(?:/[^\\s]*)?" + "$";
      localStr = "^((?:" + "(?:\\\\)" + "(?:\\\\[^\\s\\\\/]+)+" + "(?:\\.[^\\s\\\\/]*)?" + ")|(?:" + "file:////" + "(?:/[^\\s\\\\/]+)+" + "))(?:\\.[^\\s\\\\/]*)?$";
      hostFirstPass = "(?:.*)\\." + "(?:" + "(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4])" + "|" + "(?:[a-z\\u00a1-\\uffff]{2,10})" + ")";
      hostSecondPass = "(?:" + "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" + "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" + "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" + "|" + "(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)" + "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*" + "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" + ")";
      if (opts.allowLocalFiles) {
        if (match(new RegExp(localStr, "i"), url)) {
          return true;
        }
      }
      if (!match(new RegExp(pre + hostFirstPass + post, "i"), url)) {
        return false;
      }
      if (!match(new RegExp(pre + hostSecondPass + post, "i"), url)) {
        return false;
      }
      if (opts.allowPrivateNetworks) {
        return true;
      }
      return !match(new RegExp(pre + excludePrivateAndLocalNetworks + post, "i"), url);
    },
    url: function(msg, opts) {
      if (msg == null) {
        msg = "Invalid Url specified";
      }
      return function(url, cb) {
        if (!v.urlSync(url, opts)) {
          return cb(msg);
        }
        return cb();
      };
    }
  };

}).call(this);
