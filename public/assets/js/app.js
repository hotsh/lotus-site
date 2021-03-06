function hideAllTabs() {
  $('#new-image').removeClass('current-tab');
  $('#new-image').parent().removeClass('current-tab');
  $('#new-note').removeClass('current-tab');
  $('#new-note').parent().removeClass('current-tab');
  $('#new-post').removeClass('current-tab');
  $('#new-post').parent().removeClass('current-tab');
  $('#new-follow').removeClass('current-tab');
  $('#new-follow').parent().removeClass('current-tab');
  $('#image-input').hide();
  $('#follow-input').hide();
  $('#note-input').hide();
  $('#post-input').hide();
}

$(function() {
//   $('#post-area').ckeditor();

  // Status input tab reveal
  $('#new-note').on('click', function(event) {
    hideAllTabs();
    $('#new-note').addClass('current-tab');
    $('#new-note').parent().addClass('current-tab');
    $('#note-input').show();
    event.stopPropagation();
    event.preventDefault();
  });

  // Post input tab reveal
  $('#new-post').on('click', function(event) {
    hideAllTabs();
    $('#new-post').addClass('current-tab');
    $('#new-post').parent().addClass('current-tab');
    $('#post-input').show();
    event.stopPropagation();
    event.preventDefault();
  });

  // Image input tab reveal
  $('#new-image').on('click', function(event) {
    hideAllTabs();
    $('#new-image').addClass('current-tab');
    $('#new-image').parent().addClass('current-tab');
    $('#image-input').show();
    event.stopPropagation();
    event.preventDefault();
  });

  // Follow input tab reveal
  $('#new-follow').on('click', function(event) {
    hideAllTabs();
    $('#new-follow').addClass('current-tab');
    $('#new-follow').parent().addClass('current-tab');
    $('#follow-input').show();
    event.stopPropagation();
    event.preventDefault();
  });

  // pjax tabs
  $(document).pjax('a[data-pjax]', '#stream');
  $(document).on('pjax:timeout', function(event) {
    event.preventDefault();
  });

  // Status input tab reveal
  $('.tabs .tab').click(function() {
    if ($(this).children('a').data('pjax') == "") {
      $(this).parent().children().removeClass('current-tab');
      $(this).addClass('current-tab');
    }
  });

  // Image upload chooser styles
  $('form#image-input').submit(function(e) {
    return false;
  });

  image_uploader = $('form#image-input > input[type=file]');
  image_uploader.fileupload({
    dataType: 'json',
    autoUpload: false,
    acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
    paramName: 'file',
    dropZone: $('#image-preview'),
    formData: function(e, data) {
      return [
          {
            name:  'type',
            value: 'image'
          },
          {
            name:  'content',
            value: $('form#image-input textarea').val()
          }
        ];
    },
    maxFileSize: 5000000,
    disableImageResize: /Android(?!.*Chrome)|Opera/
      .test(window.navigator.userAgent),
    previewMaxWidth: 100,
    previewMaxHeight: 100,
    previewCrop: true
  }).on('fileuploadadd', function(e, data) {
    // Reset preview spanner
    data.context = $('#image-preview');
    data.context.empty();

    $('form#image-input > input.button').on('click', function () {
      data.submit();
    });
  }).on('fileuploadprocessalways', function(e,data) {
    var index = data.index;
    var file  = data.files[index];
    var node  = data.context;
    if (file.preview) {
      node.append(file.preview);
    }
    if (file.error) {
      node.append('<br>').append(file.error);
    }
  }).on('fileuploadprogressall', function(e,data) {
  }).on('fileuploaddone', function(e,data) {
  }).on('fileuploadfail', function(e,data) {
  }).prop('disabled', !$.support.fileInput)
    .parent().addClass($.support.fileInput ? undefined : 'disabled');

  $('form#image-input > input.title').val("URL");

  file = $("input[type=file]");
  file.css({"display": "inline-block",
            "padding": "0",
            "width": "100%"});
  button = $('<div>').addClass('button').addClass('square').css({
    "position": "absolute",
    "left": "0",
    "top":  "0",
    "text-align": "center",
    "padding-top": "6px",
    "margin": "0",
    "width": "100%",
    "-webkit-box-sizing": "border-box",
    "-moz-box-sizing":    "border-box",
    "box-sizing":         "border-box",
    "height": "26px"
  }).text("upload");
  wrapper = $('<div>').css({
    "display": "inline-block",
    "position": "relative",
    "width": "100%",
    "height": "26px",
    "cursor": "pointer",
    "margin": "0",
    "margin-right": file.css('margin-right')
  });
  file.css({
    "margin-left" : "0",
    "margin-top" : "0",
    "margin-bottom": "0",
    "height": "26px",
    "padding": "0",
    "position": "relative",
    "cursor": "pointer",
    "z-order": "-2",
    "opacity": "0"});
  file.wrap(wrapper);
  file.parent().prepend(button);
});
