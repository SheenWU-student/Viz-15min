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
        id: 'employment',
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
        id: 'supermarket',
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
        id: 'gp',
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
        id: 'hospitals',
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
        id: 'primary_school',
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
        id: 'secondary_school',
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
    { id: 'employment', buttonId: 'toggle-map-icon-em' },
    { id: 'supermarket', buttonId: 'toggle-map-icon-retail' },
    { id: 'gp', buttonId: 'toggle-map-icon-gp' },
    { id: 'hospitals', buttonId: 'toggle-map-icon-hosp' },
    { id: 'primary_school', buttonId: 'toggle-map-icon-schp' },
    { id: 'secondary_school', buttonId: 'toggle-map-icon-schs' }
];

// 这里的barchart 下一步做相应的borough边界加粗
    const layerData = {
        employment: [
        { LAD11NM: 'City of London', employment_15: 556820.8 },
        { LAD11NM: 'Westminster', employment_15: 109067.7 },
        { LAD11NM: 'Camden', employment_15: 87368.9 },
        { LAD11NM: 'Tower Hamlets', employment_15: 64663.8 },
        { LAD11NM: 'Islington', employment_15: 50582.7 }
        ],

        gp: [
            { LAD11NM: 'Westminster', gp_15: 8.9 },
            { LAD11NM: 'Kensington and Chelsea', gp_15: 7.9 },
            { LAD11NM: 'Islington', gp_15: 7.6 },
            { LAD11NM: 'Hackney', gp_15: 7.6 },
            { LAD11NM: 'Camden', gp_15: 6.5 }
        ],
    
        hospitals: [
            { LAD11NM: 'Westminster', hospitals_15: 2.7 },
            { LAD11NM: 'City of London', hospitals_15: 2.6 },
            { LAD11NM: 'Camden', hospitals_15: 1.7 },
            { LAD11NM: 'Kensington and Chelsea', hospitals_15: 1.1 },
            { LAD11NM: 'Tower Hamlets', hospitals_15: 1.0 }
        ],
    
        primary_school: [
            { LAD11NM: 'Tower Hamlets', primary_school_15: 10.9 },
            { LAD11NM: 'Hackney', primary_school_15: 10.3 },
            { LAD11NM: 'Southwark', primary_school_15: 10.2 },
            { LAD11NM: 'Islington', primary_school_15: 9.7 },
            { LAD11NM: 'Westminster', primary_school_15: 8.8 }
        ],
    
        secondary_school : [
            { LAD11NM: 'Tower Hamlets', secondary_school_15: 2.86 },
            { LAD11NM: 'Southwark', secondary_school_15: 2.78 },
            { LAD11NM: 'Hackney', secondary_school_15: 2.76 },
            { LAD11NM: 'Westminster', secondary_school_15: 2.1 },
            { LAD11NM: 'Newham', secondary_school_15: 2.08 }
        ],
    
        supermarket: [
            { LAD11NM: 'Islington', supermarket_15: 4.47 },
            { LAD11NM: 'City of London', supermarket_15: 4 },
            { LAD11NM: 'Camden', supermarket_15: 3.93 },
            { LAD11NM: 'Southwark', supermarket_15: 3.51 },
            { LAD11NM: 'Haringey', supermarket_15: 3.02 }
        ]
    };

    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {},
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    function updateChart(layerId) {
        const data = layerData[layerId];
        if (data) {
            chart.data = {
                labels: data.map(item => item.LAD11NM),
                datasets: [{
                    label: `Top 5 boroughs in ${layerId}`,
                    data: data.map(item => item[layerId + '_15']), // dynamically create key
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            };
            chart.update();
        } else {
            // Clear the chart if no data exists
            chart.data.labels = [];
            chart.data.datasets = [];
            chart.update();
        }
    }

    // 页面加载完毕时立即显示 "employment_15" 的数据
    updateChart('employment');

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
                updateChart(layer.id);
            } else {
                map.setLayoutProperty(layer.id, 'visibility', 'none');
                button.className = 'bi bi-eye-slash';
                button.style.color = '#8f8f8f';
                legendList.style.display = 'none';
                updateChart(null);
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



