// used as injected script to capture URL of target tag and
// set into user info so that global page events can get the URL
function sendto_handlecontextmenu_listener(event) {    
  var data = null;
  if (event.target) {
    //data = event.target.href;
    data = sendto_findlink(event.target);
    // handle relative URLs
    if (data && data.indexOf('/') === 0) {
      data = location.protocol + ':/' + url;
    }
    //if (event.target.innerText)
    //  data = data + " " + event.target.innerText;
    console.log("sendto_handlecontextmenu_listener: " + data);
  }
  safari.self.tab.setContextMenuEventUserInfo(event, data);
}

function sendto_findlink(target) {
  var currentElement = target;
  while (currentElement != null) {
    if (currentElement.nodeType == Node.ELEMENT_NODE 
    && currentElement.nodeName.toLowerCase() == 'a'
    && currentElement.href && currentElement.href.length > 2) {
      return currentElement.href;
    }
    currentElement = currentElement.parentNode;
  }
}

document.addEventListener('contextmenu', sendto_handlecontextmenu_listener, false);
