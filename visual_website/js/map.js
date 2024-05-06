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
        data: '../data/ACL_trans.geojson'
    });

    map.addSource('borough', {
        type: 'geojson',
        data: '../data/london-boroughs_1179.geojson'
    });

    map.addLayer({
        id: 'employment_15',
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

    map.addLayer({      // add stroke on boroughs
        id: 'borough-stroke',
        type: 'line',
        source: 'borough',
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': '#ffffff',
            'line-width': 1,
            'line-dasharray': [1, 3]
        }
    });

    // document.getElementById('toggle-map-icon').addEventListener('click', function() {
    //     var mapElement = document.getElementById('map');
    //     if (mapElement.style.display === 'none') {
    //         mapElement.style.display = 'block'; // 显示地图
    //         this.className = 'bi bi-eye'; // 更新图标为眼睛打开
    //     } else {
    //         mapElement.style.display = 'none'; // 隐藏地图
    //         this.className = 'bi bi-eye-slash'; // 更新图标为眼睛关闭
    //     }
    // });

    document.getElementById('toggle-map-icon').addEventListener('click', function() {
        var layerVisibility = map.getLayoutProperty('employment_15', 'visibility');
    
        // 切换图层的可见性
        if (layerVisibility === 'visible') {
            map.setLayoutProperty('employment_15', 'visibility', 'none'); // 隐藏图层
            this.className = 'bi bi-eye-slash'; // 更改图标为眼睛关闭
        } else {
            map.setLayoutProperty('employment_15', 'visibility', 'visible'); // 显示图层
            this.className = 'bi bi-eye'; // 更改图标为眼睛打开
        }
    });
    
});




