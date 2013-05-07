SendTo Safari Extension
=======================

Safari Extension to provide secondary menu options on anchor tags to send to Instpaper and Feed Wrangler

The extension interface is through the context menu in Safari. When on a page in Safari trigger the context menu. The extension will attempt to find the "best" URL searching for the following in order:

1. The target of the context menu, if it is an anchor or is enclosed by an anchor, and that anchor has an href attribute

2. The link element relative with a type that appears to be an RSS feed

3. The URL of the page itself

Installation
============

[Download the SendTo Safari Extension](https://github.com/prenagha/SendToExtension/raw/master/SendTo.safariextz)

Double-click the downloaded SendTo.safariextz file to install it in Safari.

Visit Safari Preferences, Extensions, SendTo and
enter your Instapaper user name and password (if you use them).

Screenshots
===========

![Settings](settings.png)

![Context Menu](screenshot.png)

Changes
=======

v1.1: Limit look for parent element loop to 10

v1.1: Support feed:// and rss:// URLs

v1.1: Prefer non-comment feeds

v1.0: Initial release

