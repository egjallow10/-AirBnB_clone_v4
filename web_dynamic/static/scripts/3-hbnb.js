let amenities = {};
$(() => {
  ipAddress = window.location.hostname;
  uri = 'http://' + ipAddress + ':5001/api/v1/';

  $('input').on('click', function () {
    if ($(this).is(':checked')) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenities[$(this).attr('data-id')];
    }
    $('DIV.amenities H4').text(() => {
      let arr = Object.values(amenities);
      if (arr.length === 0) return String.fromCharCode(160);
      let str = arr.join(', ');
      return str;
    });
  });

  $.ajax({
    url: uri + 'status/',
    success: function (result, statusCode) {
      if (result.status === 'OK') {
        $('DIV#api_status').addClass('available');
      } else {
        if ($('DIV#api_status').hasClass('available')) {
          $('DIV#api_status').removeClass('available');
        }
      }
    }
  });

  $.ajax({
    type: 'POST',
    url: uri + 'places_search',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (result, statusCode) {
      result.forEach((object) => {
        $('SECTION.places').append(' \
          <article> \
            <div class="title"> \
              <h2>' + object.name + '</h2> \
              <div class="price_by_night">' + object.price_by_night + '</div> \
            </div> \
            <div class="information"> \
              <div class="max_guest"> \
          <i class="fa fa-users fa-3x" aria-hidden="true"></i> \
          <br /> \
          ' + object.max_guest + 'Guests \
              </div> \
              <div class="number_rooms"> \
          <i class="fa fa-bed fa-3x" aria-hidden="true"></i> \
          <br /> \
          ' + object.number_rooms + 'Bedrooms \
              </div> \
              <div class="number_bathrooms"> \
          <i class="fa fa-bath fa-3x" aria-hidden="true"></i> \
          <br /> \
          ' + object.number_bathrooms + 'Bathroom \
              </div> \
            </div> \
            <div class="description">' + object.description + '</div> \
        </article> <!-- End 1 PLACE Article --> \
        ');
      });
    }
  });
});
