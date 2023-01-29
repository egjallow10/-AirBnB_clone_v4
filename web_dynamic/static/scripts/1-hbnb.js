let amenities = {};
$(() => {
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
});
