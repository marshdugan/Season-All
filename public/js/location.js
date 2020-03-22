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
                data: {trail: trailObj}
            }).then(function () {
                //window.location.href = "/trails";
            });
        });
    });
}