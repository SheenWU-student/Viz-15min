mapboxgl.accessToken = 'pk.eyJ1Ijoic2hlZW41IiwiYSI6ImNscmhxanVhYzAxd28ybHF2ejV6ZDdiaDUifQ.DvsKL2DbpALzmZzViQ1QtQ';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-0.28, 51.50], // a coordinates of London
    zoom: 9.5
});

map.on('load', function() {
    map.addSource('ACL', {
        type: 'geojson',
        data: 'data/ACL_trans.geojson'
    });

    map.getSource('ACL').on('data', function(e) {
        if (e.isSourceLoaded) {
            // 当数据完全加载时打印出来
            console.log('GeoJSON data:', e.source.data);
        }
    });

    map.addLayer({
        id: 'geojsonLayer',
        type: 'fill',
        source: 'ACL',
        layout: {},
        paint: {
            // 使用 `interpolate` 表达式来为不同的employment_15值设置颜色
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'employment_15'],  // 这里使用数据中的employment_15字段
                0, '#F2F12D',              // employment_15为0时的颜色
                10000, '#EED322',          // employment_15为10000时的颜色
                50000, '#E6B71E',          // employment_15为50000时的颜色
                100000, '#DA9C20',         // employment_15为100000时的颜色
                200000, '#CA8323',         // employment_15为200000时的颜色
                500000, '#B86B25'          // employment_15为500000时的颜色
            ],
            'fill-opacity': 0.75
        }
    });

});




