function update_meta($, title, description) {
  // Basic meta
  $('title').text(title);
  $('meta[name=description]').attr('content', description);
  // Open Graph meta
  $('meta[property=\'og:title\']').attr('content', title);
  $('meta[property=\'og:description\']').attr('content', description);
  // Twitter meta
  $('meta[name=\'twitter:card\']').attr('content', description);
};

module.exports = function (processor) {
  processor
    .global(function ($, path, meta) {
      $('link[rel=canonical]').attr('href','https://www.virginamerica.com' + path);
    })
    .when(/^\/book/, function ($, path, meta) {
      var title = 'Book Flights, Hotels, Car Rentals &amp; More | Virgin America';
      var description = [
        'Book your next flight, hotel or vacation package with Virgin America. ',
        'Find low-fare plane tickets or bundle your reservation with a car ',
        'rental to save even more.'
      ].join('');
      update_meta($, title, description);
    })
    .when(/^\/flight-check-in/, function ($, path, meta) {
      var title = 'Virgin America Online Check In';
      var description = [
        'Save time at the airport by using Virgin America\'s online check in. ',
        'Find your flight information,check your flight status,print ',
        'boarding passes or check in online.'
      ].join('');
      update_meta($, title, description);
    })
    .when(/^\/manage-itinerary/, function ($, path, meta) {
      var title = 'Manage, View Itinerary &amp; Change Flights | Virgin America';
      var description = [
        'View your travel plans with Virgin America. Review your flight ',
        'information &amp; itinerary or change &amp; cancel your flight. ',
        'Fly with Virgin today &amp; experience award winning service.'
      ].join('');
      update_meta($, title, description);
    })
    .when(/^\/check-flight-status/, function ($, path, meta) {
      var title = 'Check Virgin America Flight Status, Get Updates &amp; More';
      var description = [
        'Use Virgin America\'s notification service to check flight updates, ',
        'arrival or departure times & flight status to assure your travel ',
        'experience is seamless.'
      ].join('');
      update_meta($, title, description);
    })
    .when(/^\/get-flight-alerts/, function ($, path, meta) {
      var title = 'Get Virgin America Flight Alerts, Flight Information &amp; More';
      var description = [
        'Join Virgin America\'s flight alerts program &amp; we will notify ',
        'you via email, SMS, or both about departure times, cancellations, ',
        'or changes to your flight schedule.'
      ].join('');
      update_meta($, title, description);
    })
    .when(/^\/elevate-frequent-flyer$/, function ($, path, meta) {
      var title = 'Virgin America Elevate Frequent Flyer Program';
      var description = [
        'Welcome to Elevate. Join Virgin America\'s frequent flyer program &amp; ',
        'start earning points, perks &amp; flight rewards with no blackouts. ',
        'Fly &amp; discover Virgin\'s award winning service.'
      ].join('');
      update_meta($, title, description);
    })
    .when(/^\/elevate-frequent-flyer\/sign-up/, function ($, path, meta) {
      var title = 'Join Elevate Frequent Flyer Program | Virgin America';
      var description = [
        'Join Elevate, Virgin America\'s frequent flyer program where you can ',
        'receive exclusive deals on flights & other perks by simply being a ',
        'member.'
      ].join('');
      update_meta($, title, description);
    })
    .when(/^\/elevate-frequent-flyer\/buy-gift-points/, function ($, path, meta) {
      var title = 'Buy Points - Elevate Frequent Flyer | Virgin America';
      var description = [
        'Buy Elevate frequent flyer points for your next trip or transfer &amp; ',
        'give the points as a gift to friends and family. Fly free faster ',
        'with Virgin America.'
      ].join('');
      update_meta($, title, description);
    });
};