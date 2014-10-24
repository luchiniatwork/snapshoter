Snapshoter
==========

The Problem
-----------

Highly JS-intensive websites like those built with
[AngularJS](https://angularjs.org/) tend to be penalized in SEO terms. Search
engines' crawlers are not generally able - or trusting enough - to execute
client-side JS in order to understand what would be the end-result DOM.

As a massive [AngularJS](https://angularjs.org/) app,
[Virgin America](https://wwww.virginamerica.com/)'s site serves as a good
example. When users visit an URL such as
`https://www.virginamerica.com/book/ow/a1/nyc_sfo` they expect a visual result
similar to this:

![NYC-SFO Calendar](https://raw.githubusercontent.com/luchiniatwork/snapshoter/master/docs/images/nyc-sfo-calendar.png)

In fact, this rendering is dynamically generated by an AngularJS app. If one
would open the code inspector and search for the keyword 'November', the
following DOM would be visible:

    ...
    <header class="month__header">
        <h1 bo-text="month.monthYear">November 2014</h1>
    </header>
    ...

However a simple HTTP request - like the one below - would yield the basic,
JS-unchanged version of the HTML or no reference to 'November' would be
possible:

    curl https://www.virginamerica.com/book/ow/a1/nyc_sfo

This former method is the most traditional across crawlers and therefore your
AngularJS (or heavy JS) website will not be indexed accordingly.

The Solution
------------

The solution proposed by Google and adopted by most search engines is described
at the [Escaped Fragment Full Specification](https://developers.google.com/webmasters/ajax-crawling/docs/specification). A further detailed how-to can be found on [Google's AJAX-Crawling - Getting Starts](https://developers.google.com/webmasters/ajax-crawling/docs/getting-started).

In practice this specification allows developers to let the crawler know that
this site is rendered via JS. The crawler is then able to call a modified URL
that can be trapped by the server in order to provide a static, previosuly
rendered version of the website back to the crawler.

There are two mechanisms that can be used by developers to let the crawler know
that the site needs this treatment: use hasbangs on the URLs or adding a
fragment meta tag.

The first method, hashbangs, means converting URLs like this:

    www.example.com/ajax.html#key=value

into this:

    www.example.com/ajax.html#!key=value

The crawler will automatically understand that this site is specially-rendered
and would convert the request to:

    www.example.com/ajax.html?_escaped_fragment_=key=value

The second method, adding a fragment meta tag, means including a special meta
tag in the head of the HTML of your page. The meta tag takes the following form:

    <meta name="fragment" content="!">

Independently of the chosen method, you need to set up your server to handle
requests for URLs that contain `_escaped_fragment_`.

Suppose you would like to get `www.example.com/index.html#!key=value` indexed.
Your part of the agreement is to provide the crawler with an HTML snapshot of
this URL, so that the crawler sees the content. How will your server know when
return an HTML snapshot instead of a regular page? The answer is the URL that
is requested by the crawler: the crawler will modify each AJAX URLs.

Snapshoter's Architecture
-------------------------

Snapshoter takes the heavylifting off of your HTTP servers. It servers xxx 
needs:

1. Treats all `_escaped_fragment_` calls that your HTTP servers receive
2. Generates static snapshots of the dynamic pages on the fly
3. Caches snapshots for fast responses
4. Updates cached snapshots on a queued manner
5. Offers queue management facilities 

The following diagram represents the architectural components of Snapshoter:

![Architectural Diagram](https://raw.githubusercontent.com/luchiniatwork/snapshoter/master/docs/images/architectural-diagram.png)

The next session describes each architectural component in details.

Components Described
--------------------

**Your own HTTP Server(s)**

These servers must be set up to mod_redirect and context switch when the
`_escaped_fragment_` URL is identified. These requests must be processed by
the Snapshoter's HTTP Entrypoint.

I.e., considering that Virgin America's website is using the fragment meta tag
method, the following URL:

    https://www.virginamerica.com/book/ow/a1/nyc_sfo

will be converted by crawlers to:

    https://www.virginamerica.com/?_escaped_fragment_=book%2Fow%2Fa1%2Fnyc_sfo

Your HTTP must detect this request and encapsulate (not redirect) a request to
your Snapshoter's HTTP Entrypoint installation (i.e. residing at
`snapshoter.example.com`):

    http://snapshoter.example.com/snapshots?fragment=book%2Fow%2Fa1%2Fnyc_sfo

More details about how to set up your domain on the settings section below.


**Snapshoter's HTTP Entrypoint**

Snapshoter's HTTP Entrypoint is the main component of Snapshoter. It servers as
a HTTP faced to the outside world and orchestrates most of the logic for
taking snapshots of dynamic websites.

It takes in URLs such as:

    http://snapshoter.example.com/snapshots?fragment=book%2Fow%2Fa1%2Fnyc_sfo

This entrypoint will check whether there's a cached version of this snapshot,
if not, it will dynamically generate the snapshot and save it for later use.


**Redis**

Snapshoter uses Redis for its cache as well as for controlling the queue of
cache updates.


**Queue Worker**

A queue worker is a process (or server) that will go through queued up cache
update jobs and update them accordingly.


**Queue UI**

In order to manage the queue, an optional queue management UI is offered as part
of Snapshoter's package.


Setting up Redis (snapshot-redis)
---------------------------------

Setting up Main App (snapshot-app)
----------------------------------

Setting up Worker (snapshot-worker)
-----------------------------------

Setting up Queue UI (snapshot-kue-ui)
-------------------------------------

Setting up your Domain (mod_redirect)
-------------------------------------

Testing Installation
--------------------
