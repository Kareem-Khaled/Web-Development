mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset:25})
        .setHTML(
            `<h3>${campground.title}</h3><p>${campground.location}</p>`
        )
    )
    .addTo(map);
    // mapbox://styles/mapbox/streets-v11
    // mapbox://styles/mapbox/outdoors-v11
    // mapbox://styles/mapbox/light-v10
    // mapbox://styles/mapbox/dark-v10
    // mapbox://styles/mapbox/satellite-v9
    // mapbox://styles/mapbox/satellite-streets-v11
    // mapbox://styles/mapbox/navigation-day-v1
    // mapbox://styles/mapbox/navigation-night-v1