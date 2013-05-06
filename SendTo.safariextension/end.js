// used as injected script to capture URL of target tag and
// set into user info so that global page events can get the URL
function sendto_handlecontextmenu_listener(event) {    
  if (event.target) {
    // look for an enclosing anchor tag to get the url
    var data = sendto_findlink(event.target);

    // otherwise look in the document for a feed url
    if (!data) {
      var links = document.getElementsByTagName('link');
      for (var i=0; i < links.length; i++) {
        var link = links[i];
        if (link.getAttribute('rel').indexOf('alternate') >= 0) {
          var linkType = link.getAttribute('type');
          if (linkType.indexOf('application/rss+xml') >= 0 
          ||  linkType.indexOf('text/xml') >= 0 
          ||  linkType.indexOf('atom+xml') >= 0) {
            data = link.getAttribute('href');
          }
        }
      }
    }

    // if no url found then use page url
    if (!data  || data.length <= 2)
      data = location.href;

    // if still no url then done
    if (!data || data.length <= 2)
      return;
                
    if (data.indexOf('http') === 0) {
      // we have a full url so good to go
      
    } else if (data.substring(8).indexOf('://') > 0) {
      // non http URL so ignore it
      return;
      
    } else if (data.indexOf('/') === 0) {
      // we have a protocol relative url so add protocol and host back in front
      data = location.protocol + '://' + location.host + url;
    
    } else {
      // relative url so add protocol and base back
      var firstSlash = location.href.substring(8).indexOf('/');
      data = location.href.substring(0, 8 + firstSlash) + url;
    }
  
    console.log("sendto_handlecontextmenu_listener: " + data);
    safari.self.tab.setContextMenuEventUserInfo(event, data);
  }
}

function sendto_findlink(target) {
  var currentElement = target;
  while (currentElement != null) {
    if (currentElement.nodeType == Node.ELEMENT_NODE 
    && currentElement.nodeName.toLowerCase() == 'a'
    && currentElement.href 
    && currentElement.href.length > 2) {
      return currentElement.href;
    }
    currentElement = currentElement.parentNode;
  }
}

document.addEventListener('contextmenu', sendto_handlecontextmenu_listener, false);
