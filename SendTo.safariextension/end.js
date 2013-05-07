// used as injected script to capture URL of target tag and
// set into user info so that global page events can get the URL
function sendto_handlecontextmenu_listener(event) {    
  if (event.target) {
    // look for an enclosing anchor tag to get the url
    var data = sendto_findlink(event.target);

    // otherwise look in the document for a feed url
    if (!data) {
      var links = document.getElementsByTagName('link');
      // prefer atom non comment feed first
      // prefer any non comment feed next
      // lastly take whatever feed we find
      for (var p=1; p <= 3; p++) {
        for (var i=0; i < links.length; i++) {
          var link = links[i];
          if (link.getAttribute('rel').indexOf('alternate') >= 0) {
            var linkType = link.getAttribute('type');
            if (!linkType)
              continue;
            linkType = linkType.toLowerCase();
            var href = link.getAttribute('href');
            if (!href)
              continue;
            var title = link.getAttribute('title');
            if (!title)
              title = "";
            title = title.toLowerCase();
            if (linkType.indexOf('rss') >= 0 
            ||  linkType.indexOf('atom') >= 0
            ||  linkType.indexOf('xml') >= 0) {
              if (p === 1 && linkType.indexOf('atom') >= 0 && title.indexOf('comment') < 0) {
                data = href;
                break;
              } else if (p === 2 && title.indexOf('comment') < 0) {
                data = href;
                break;
              } else if (p === 3) {
                data = href;
                break;
              }
            }
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
                
    if (data.indexOf('http://') === 0 
    ||  data.indexOf('https://') === 0
    ||  data.indexOf('feed://') === 0 
    ||  data.indexOf('rss://') === 0) {
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
  var count = 1;
  while (currentElement != null && count < 10) {
    if (currentElement.nodeType == Node.ELEMENT_NODE 
    && currentElement.nodeName.toLowerCase() == 'a'
    && currentElement.href 
    && currentElement.href.length > 2) {
      return currentElement.href;
    }
    currentElement = currentElement.parentNode;
    count++;
  }
}

document.addEventListener('contextmenu', sendto_handlecontextmenu_listener, false);
