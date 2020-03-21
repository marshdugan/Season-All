$(document).ready(function() {
    $("#sign-up").on("click", function (event) {
        event.preventDefault();
        //$("#sign-up").animateCss('pulse', function () {
          window.location.href = "/signup"
        //});
      });
    //   $("#sign-in").on("click", function (event) {
    //     event.preventDefault();
    //     $("#account-info").modal("show");
    //   });
      $("#go-home").on("click", function (event) {
        event.preventDefault();
        console.log("hello")
        //$("#go-home").animateCss('pulse', function () {
          window.location.href = "/"
        //});
      });
      $("#sign-in").on("click", function (event) {
        event.preventDefault();
        var user = {
          email: $("#email").val().trim(),
          account_key: $("#account_password").val().trim()
        }
        $.post("/login", user, function(results){
          if(results){
             $(location).attr('href', '/accounts/view')
           }else {
            $("#account-info").modal("close");
            alert("oops something went wrong, please try again!");
           }
        })
    });
});