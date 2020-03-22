$(document).ready(function () {
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
        $.post("/login", user, function (results) {
            if (results) {
                $(location).attr('href', '/accounts/view')
            } else {
                $("#account-info").modal("close");
                alert("oops something went wrong, please try again!");
            }
        })
    });

    $("#location").on("click", function (event) {
        event.preventDefault();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                const queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + pos.lat + "&lon=" + pos.lng + "&maxDistance=10&key=200706624-a0ce2059fccca3e98797fa8cdd9232f4"
                $.ajax({
                    url: queryURL,
                    method: "GET",
                }).then(function (response) {
                    console.log(response);
                    const trailObj = [];
                    for (let i = 0; i < response.trails.length; i++) {
                        trailObj.push({
                            trailId: parseInt(response.trails[i].id),
                            name: response.trails[i].name,
                            type: response.trails[i].type,
                            summary: response.trails[i].summary,
                            difficulty: response.trails[i].difficulty,
                            stars: parseInt(response.trails[i].stars)
                        });
                    }
                    $.ajax({
                        type: "POST",
                        url: "/api/trail",
                        data: { trail: trailObj }
                    }).then(function () {
                        location.reload();
                        //window.location.href = "/trails";
                    });
                });
            });
        } else {
            console.log("failed to get location");
        }
    })
});