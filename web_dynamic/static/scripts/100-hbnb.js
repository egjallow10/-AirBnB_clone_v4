let amenities = {};
let states = {};
let cities = {};

$(() => {
  let ipAddress = window.location.hostname;
  let uri = 'http://' + ipAddress + ':5001/api/v1/'
  $('input.amenities').on('click', function () {
    if ($(this).is(':checked')) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
      console.log(amenities);
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

  $('input.states').on('click', function () {
    if ($(this).is(':checked')) {
      states[$(this).attr('data-id')] = $(this).attr('data-name');
      console.log(states);
    } else {
      delete states[$(this).attr('data-id')];
    }
    $('DIV.locations H4').text(() => {
      let arr = Object.values(states).concat(Object.values(cities));
      if (arr.length === 0) return String.fromCharCode(160);
      let str = arr.join(', ');
      return str;
    });
  });
  
  $('input.cities').on('click', function () {
    if ($(this).is(':checked')) {
      cities[$(this).attr('data-id')] = $(this).attr('data-name');
      console.log(cities);
    } else {
      delete cities[$(this).attr('data-id')];
    }
    $('DIV.locations H4').text(() => {
      let arr = Object.values(cities).concat(Object.values(states));
      if (arr.length === 0) return String.fromCharCode(160);
      let str = arr.join(', ');
      return str;
    });
  });
  
  $('button').on('click', function () {
    let amen_list = Object.keys(amenities);
    let states_list = Object.keys(states);
    let cities_list = Object.keys(cities);
    let dict = {'amenities': amen_list, 'states': states_list, 'cities': cities_list};
    $.ajax({
      type: 'POST',
      url: uri + 'places_search',
      contentType: 'application/json',
      data: JSON.stringify(dict),
      success: function (result, statusCode) {
	      articleBuilder(result);
      }
    });
  });

  $.ajax({
    url: uri + 'status',
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
      articleBuilder(result);
    }
  });

  function articleBuilder (result) {
    $('SECTION.places article').remove();
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
