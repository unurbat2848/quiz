// sign-up form

$(document).ready(function() {

  $("#sign_up_link").click(function() {
    $(this).closest("#signin_form").addClass("d-none");

    $("#sign_up_link").closest("#signin_form").closest(".sign_wrapper").find("#signup_form").removeClass("d-none");
  });
 
  $("#sign_in_link").click(function() {
    $(this).closest("#signup_form").addClass("d-none");

    $("#sign_in_link").closest("#signup_form").closest(".sign_wrapper").find("#signin_form").removeClass("d-none");
  });
 
});

// Loader
$(window).on('load', function () {
 // $('.loader').css({ "opacity": "0", "visibility": "hidden" });
});


