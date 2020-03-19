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
            $.ajax({
                method: "POST",
                url: "/api/trail",
                data: response
            }).then(function () {
                window.location.href = "/trails";
            });
        });
    });
}