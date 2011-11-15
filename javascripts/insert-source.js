function sourcePaths() {
  var paths = new Array();

  // html
  paths.push(window.location.href.substr(window.location.href.lastIndexOf('/')+1));
  // css
  $('link[type="text/css"][href]:not([href*="vendor/"])').each(function() {
    paths.push($(this).attr('href'));
  });
  // js
  $('script[type="text/javascript"][src]:not([src*="vendor/"])').each(function() {
    paths.push($(this).attr('src'));
  });

  return paths;
}

$(document).ready(function() {

  var sourceHeader = document.createElement('h2');
  sourceHeader.innerHTML = 'Źródła strony:';

  var sourceDiv = document.createElement('div');
  sourceDiv.id = 'source';
  sourceDiv.appendChild(sourceHeader);

  // go over each path to file linked in the current page
  $.each(sourcePaths(), function(index, path) {
    var fileHeader = document.createElement('h3');
    fileHeader.innerHTML = path;

    var filePre = document.createElement('pre');
    filePre.className = 'prettyprint linenums';

    // get the file as plain text
    $.ajax({
      url: path,
      dataType: 'text',
      async: false,
      success: function(source) {
        var escapedSource = source
          .replace(/\&/g, '&amp;')
          .replace(/[<>]/g, function (m) { return {'<':'&lt;','>':'&gt;'}[m]});

        filePre.innerHTML = escapedSource;
        sourceDiv.appendChild(fileHeader);
        sourceDiv.appendChild(filePre);
      }
    });
  });

  document.body.appendChild(sourceDiv);
  prettyPrint();
  if (!window.location.href.match(/file:\/\//)) {
    $('#source').css('display', 'block');
  }

});
