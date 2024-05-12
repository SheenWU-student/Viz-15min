mapboxgl.accessToken = 'pk.eyJ1Ijoic2hlZW41IiwiYSI6ImNscmhxanVhYzAxd28ybHF2ejV6ZDdiaDUifQ.DvsKL2DbpALzmZzViQ1QtQ';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-0.02, 51.50], // a coordinates of London
    zoom: 9.5
});

map.on('load', function() {
    map.addSource('ACL', {
        type: 'geojson',
        data: '../data/ACL_dropNA.geojson'
    });

    map.addSource('borough', {
        type: 'geojson',
        data: '../data/london-boroughs_1179.geojson'
    });

    map.addLayer({
        id: 'employment_15',
        type: 'fill',
        source: 'ACL',
        layout: {
            visibility: 'visible' // 设置为可见
        },
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

    map.addLayer({
        id: 'supermarket_15',
        type: 'fill',
        source: 'ACL',
        layout: {
            visibility: 'none' // 设置为不可见
        },
        paint: {
            // 使用 `interpolate` 表达式来为不同的employment_15值设置颜色
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'supermarket_15'],  
                0, '#2166ac',
                2, '#67a9cf',
                4, '#d1e5f0',
                6, '#fddbc7',
                8, '#ef8a62',    
                10, '#b2182b'
                
            ],
            'fill-opacity': 0.75
        }
    });

    map.addLayer({
        id: 'gp_number_15',
        type: 'fill',
        source: 'ACL',
        layout: {
            visibility: 'none' // 设置为不可见
        },
        paint: {
            // 使用 `interpolate` 表达式来为不同的employment_15值设置颜色
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'gp_number_15'],  
                0, '#4575b4',
                2, '#91bfdb',
                4, '#e0f3f8',
                6, '#ffffbf',
                8, '#fee090',
                10, '#fc8d59',
                12, '#d73027',
                
            ],
            'fill-opacity': 0.75
        }
    });

    map.addLayer({
        id: 'hospitals_15',
        type: 'fill',
        source: 'ACL',
        layout: {
            visibility: 'none' // 设置为不可见
        },
        paint: {
            // 使用 `interpolate` 表达式来为不同的employment_15值设置颜色
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'hospitals_15'],  
                0, '#4575b4',
                1, '#91bfdb',
                2, '#e0f3f8',
                3, '#ffffbf',
                5, '#fee090',
                7, '#fc8d59',
                10, '#d73027',
                
            ],
            'fill-opacity': 0.75
        }
    });

    map.addLayer({
        id: 'school_primary_15',
        type: 'fill',
        source: 'ACL',
        layout: {
            visibility: 'none' // 设置为不可见
        },
        paint: {
            // 使用 `interpolate` 表达式来为不同的employment_15值设置颜色
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'school_primary_15'],  
                0, '#542788',             
                2, '#998ec3',
                4, '#d8daeb',
                6, '#f7f7f7',
                8, '#fee0b6',
                10, '#f1a340',          
                12, '#b35806', 
            ],
            'fill-opacity': 0.75
        }
    });

    map.addLayer({
        id: 'school_secondary_15',
        type: 'fill',
        source: 'ACL',
        layout: {
            visibility: 'none' // 设置为不可见
        },
        paint: {
            // 使用 `interpolate` 表达式来为不同的employment_15值设置颜色
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'school_secondary_15'],  
                0, '#542788',             
                1, '#998ec3',
                2, '#d8daeb',
                3, '#fee0b6',
                4, '#f1a340',          
                5, '#b35806', 
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

    // 存储所有图层的信息
const layers = [
    { id: 'employment_15', buttonId: 'toggle-map-icon-em' },
    { id: 'supermarket_15', buttonId: 'toggle-map-icon-retail' },
    { id: 'gp_number_15', buttonId: 'toggle-map-icon-gp' },
    { id: 'hospitals_15', buttonId: 'toggle-map-icon-hosp' },
    { id: 'school_primary_15', buttonId: 'toggle-map-icon-schp' },
    { id: 'school_secondary_15', buttonId: 'toggle-map-icon-schs' }
];

// 通用函数来切换图层的可见性，确保同时只有一个图层可见
function toggleLayerVisibility(selectedLayerId) {
    layers.forEach(layer => {
        const button = document.getElementById(layer.buttonId);
        const legendList = button.parentNode.nextElementSibling;
        const currentVisibility = map.getLayoutProperty(layer.id, 'visibility');

        if (layer.id === selectedLayerId) {
            if (currentVisibility === 'none') {
                map.setLayoutProperty(layer.id, 'visibility', 'visible');
                button.className = 'bi bi-eye';
                button.style.color = '#333';
                legendList.style.display = 'block';
            } else {
                map.setLayoutProperty(layer.id, 'visibility', 'none');
                button.className = 'bi bi-eye-slash';
                button.style.color = '#8f8f8f';
                legendList.style.display = 'none';
            }
        } else {
            map.setLayoutProperty(layer.id, 'visibility', 'none');
            button.className = 'bi bi-eye-slash';
            button.style.color = '#8f8f8f';
            legendList.style.display = 'none';
        }
    });
}

// 给每个按钮添加事件监听器
layers.forEach(layer => {
    document.getElementById(layer.buttonId).addEventListener('click', function() {
        toggleLayerVisibility(layer.id);
    });
});

    
    

});

document.addEventListener('DOMContentLoaded', function () {
    const data = [
        { LAD11NM: 'Tower Hamlets', nearest_main_bua: 67.20 },
        { LAD11NM: 'Hackney', nearest_main_bua: 60.86 },
        { LAD11NM: 'Southwark', nearest_main_bua: 67.42 },
        { LAD11NM: 'Islington', nearest_main_bua: 44.70 },
        { LAD11NM: 'Westminster', nearest_main_bua: 50.46 }
    ];

    var svg = dimple.newSvg("#chartContainer", 270, 230);
    var myChart = new dimple.chart(svg, data);
    // setBounds(left, top, width, height)
    // 减少左边距和顶部边距参数，可以使得轴更靠近绘图区域
    myChart.setBounds(40, 10, 220, 200);

    var x = myChart.addCategoryAxis("x", "LAD11NM");
    x.title = "Boroughs";
    x.fontSize = "7px";  // Adjust font size
    x.tickSize = -5;  // Moves the ticks closer to the chart

    var y = myChart.addMeasureAxis("y", "nearest_main_bua");
    y.title = "Distance to Nearest Main Built-up Area";
    y.fontSize = "7px";  // Adjust font size
    y.tickSize = -5;  // Moves the ticks closer to the chart

    myChart.addSeries(null, dimple.plot.bar);
    myChart.draw();

});
