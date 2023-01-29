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
});


