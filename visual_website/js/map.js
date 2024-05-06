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

    map.addSource('ACL', {
        type: 'geojson',
        data: 'data/london-boroughs_1179.geojson'
    });

    map.getSource('ACL').on('data', function(e) {
        if (e.isSourceLoaded) {
            // 当数据完全加载时打印出来
            console.log('GeoJSON data:', e.source.data);
        }
    });

    map.get

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
                0, '#053061',              // employment_15为0时的颜色
                1000, '#2166ac',          // employment_15为10000时的颜色
                5000, '#4393c3',          // employment_15为50000时的颜色
                10000, '#92c5de',         // employment_15为100000时的颜色
                20000, '#fddbc7',         // employment_15为200000时的颜色
                30000, '#f4a582',          // employment_15为300000时的颜色
                40000, '#d6604d',
                100000, '#b2182b',
                500000, '#b2182b',
                700000, '#67001f'
            ],
            'fill-opacity': 0.75
        }
    });

});




