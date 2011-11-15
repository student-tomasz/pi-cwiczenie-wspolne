$(document).ready(function() {

  var referer = encodeURIComponent(document.location.href);
  $('#html_validation a').attr('href', 'http://validator.w3.org/check?uri=' + referer);
  $('#css_validation a').attr('href', 'http://jigsaw.w3.org/css-validator/validator?uri=' + referer);
  if (!window.location.href.match(/file:\/\/|localhost|127\.0\.0\.1|0\.0\.0\.0/)) {
    $('#validations').css('display', 'block');
  }

});

