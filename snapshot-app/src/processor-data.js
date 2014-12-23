module.exports = function (processor) {
  processor
    .global(function ($, path, meta) {
      $('link[rel=canonical]').attr('href','http://www.virginamerica.com' + path);
    })
    .when(/^\/book/, function ($, path, meta) {
      $('title').text(
        'Book Flights,Hotels,Car Rentals &amp; More | Virgin America'
      );
      $('meta[name=description]').attr(
        'content',
        [
          'Book your next flight,hotel or vacation package with Virgin America. ',
          'Find low-fare plane tickets or bundle your reservation with a car ',
          'rental to save even more.'
        ].join('')
      );
    })
    .when(/^\/flight-check-in/, function ($, path, meta) {
      $('title').text(
        'Virgin America Online Check In'
      );
      $('meta[name=description]').attr(
        'content',
        [
          'Save time at the airport by using Virgin America\'s online check in. ',
          'Find your flight information,check your flight status,print ',
          'boarding passes or check in online.'
        ].join('')
      );
    })
    .when(/^\/manage-itinerary/, function ($, path, meta) {
      $('title').text(
        'Manage, View Itinerary &amp; Change Flights | Virgin America'
      );
      $('meta[name=description]').attr(
        'content',
        [
          'View your travel plans with Virgin America. Review your flight ',
          'information &amp; itinerary or change &amp; cancel your flight. ',
          'Fly with Virgin today &amp; experience award winning service.'
        ].join('')
      );
    })
    .when(/^\/check-flight-status/, function ($, path, meta) {
      $('title').text(
        'Check Virgin America Flight Status, Get Updates &amp; More'
      );
      $('meta[name=description]').attr(
        'content',
        [
          'Use Virgin America\'s notification service to check flight updates, ',
          'arrival or departure times & flight status to assure your travel ',
          'experience is seamless.'
        ].join('')
      );
    })
    .when(/^\/get-flight-alerts/, function ($, path, meta) {
      $('title').text(
        'Get Virgin America Flight Alerts, Flight Information &amp; More'
      );
      $('meta[name=description]').attr(
        'content',
        [
          'Join Virgin America\'s flight alerts program &amp; we will notify ',
          'you via email, SMS, or both about departure times, cancellations, ',
          'or changes to your flight schedule.'
        ].join('')
      );
    })
    .when(/^\/elevate-frequent-flyer$/, function ($, path, meta) {
      $('title').text(
        'Virgin America Elevate Frequent Flyer Program'
      );
      $('meta[name=description]').attr(
        'content',
        [
          'Welcome to Elevate. Join Virgin America\'s frequent flyer program &amp; ',
          'start earning points, perks &amp; flight rewards with no blackouts. ',
          'Fly &amp; discover Virgin\'s award winning service.'
        ].join('')
      );
    })
    .when(/^\/elevate-frequent-flyer\/sign-up/, function ($, path, meta) {
      $('title').text(
        'Join Elevate Frequent Flyer Program | Virgin America'
      );
      $('meta[name=description]').attr(
        'content',
        [
          'Join Elevate, Virgin America\'s frequent flyer program where you can ',
          'receive exclusive deals on flights & other perks by simply being a ',
          'member.'
        ].join('')
      );
    })
    .when(/^\/elevate-frequent-flyer\/buy-gift-points/, function ($, path, meta) {
      $('title').text(
        'Buy Points - Elevate Frequent Flyer | Virgin America'
      );
      $('meta[name=description]').attr(
        'content',
        [
          'Buy Elevate frequent flyer points for your next trip or transfer &amp; ',
          'give the points as a gift to friends and family. Fly free faster ',
          'with Virgin America.'
        ].join('')
      );
    });
};