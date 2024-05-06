mapboxgl.accessToken = 'pk.eyJ1Ijoic2hlZW41IiwiYSI6ImNscmhxanVhYzAxd28ybHF2ejV6ZDdiaDUifQ.DvsKL2DbpALzmZzViQ1QtQ';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [0.04, 51.50], // a coordinates of London
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
        id: 'nearest_main_bua',
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
                ['get', 'nearest_main_bua'],  
                0, '#542788',             
                10, '#998ec3',         
                30, '#d8daeb',          
                50, '#f7f7f7',
                70, '#fee0b6',
                90, '#f1a340',
                100, '#b35806'
                
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
                0, '#2b83ba',             
                5, '#abdda4',         
                10, '#ffffbf',          
                15, '#fdae61',
                20, '#d7191c',
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
                0, '#4dac26',             
                5, '#b8e186',         
                10, '#f1b6da',          
                15, '#d01c8b',
                
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
                0, '#01665e',
                5, '#5ab4ac',
                10, '#c7eae5',
                15, '#f5f5f5',
                20, '#f6e8c3',          
                25, '#d8b365',         
                30, '#8c510a',             
                
            ],
            'fill-opacity': 0.75
        }
    });

    map.addLayer({
        id: 'school_secondary_15',
        type: 'fill',
        source: 'ACL',
        layout: {},
        paint: {
            // 使用 `interpolate` 表达式来为不同的employment_15值设置颜色
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'school_primary_15'],  
                0, '#d7191c',
                2, '#fdae61',
                4, '#ffffbf',
                6, '#a6d96a',
                7, '#1a9641',
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

    document.getElementById('toggle-map-icon-em').addEventListener('click', function() {
        var layerVisibility = map.getLayoutProperty('employment_15', 'visibility');
        var legendList = this.parentNode.nextElementSibling; 
    
        // 切换图层的可见性
        if (layerVisibility === 'visible') {
            map.setLayoutProperty('employment_15', 'visibility', 'none'); // 隐藏图层
            this.className = 'bi bi-eye-slash'; // 更改图标为眼睛关闭
            this.style.color = '#8f8f8f'; // 设置图标颜色为浅灰色
            legendList.style.display = 'none';
        } else {
            map.setLayoutProperty('employment_15', 'visibility', 'visible'); // 显示图层
            this.className = 'bi bi-eye'; // 更改图标为眼睛打开
            this.style.color = '#333';
            legendList.style.display = 'block';
        }
    });

    document.getElementById('toggle-map-icon-urban').addEventListener('click', function() {
        var layerVisibility = map.getLayoutProperty('nearest_main_bua', 'visibility');
        var legendList = this.parentNode.nextElementSibling; 
    
        // 切换图层的可见性
        if (layerVisibility === 'visible') {
            map.setLayoutProperty('nearest_main_bua', 'visibility', 'none'); // 隐藏图层
            this.className = 'bi bi-eye-slash'; // 更改图标为眼睛关闭
            this.style.color = '#8f8f8f'; // 设置图标颜色为浅灰色
            legendList.style.display = 'none';
        } else {
            map.setLayoutProperty('nearest_main_bua', 'visibility', 'visible'); // 显示图层
            this.className = 'bi bi-eye'; // 更改图标为眼睛打开
            this.style.color = '#333';
            legendList.style.display = 'block';
        }
    });
    
    document.getElementById('toggle-map-icon-gp').addEventListener('click', function() {
        var layerVisibility = map.getLayoutProperty('gp_number_15', 'visibility');
        var legendList = this.parentNode.nextElementSibling; 

        if (layerVisibility === 'visible') {
            map.setLayoutProperty('gp_number_15', 'visibility', 'none'); 
            this.className = 'bi bi-eye-slash'; 
            this.style.color = '#8f8f8f'; 
            legendList.style.display = 'none';
        } else {
            map.setLayoutProperty('gp_number_15', 'visibility', 'visible'); 
            this.className = 'bi bi-eye'; 
            this.style.color = '#333';
            legendList.style.display = 'block';
        }
    });

    document.getElementById('toggle-map-icon-hosp').addEventListener('click', function() {
        var layerVisibility = map.getLayoutProperty('hospitals_15', 'visibility');
        var legendList = this.parentNode.nextElementSibling; // 获取紧跟在layer-title后面的ul元素

        if (layerVisibility === 'visible') {
            map.setLayoutProperty('hospitals_15', 'visibility', 'none'); 
            this.className = 'bi bi-eye-slash'; 
            this.style.color = '#8f8f8f'; 
            legendList.style.display = 'none'; // 隐藏列表
        } else {
            map.setLayoutProperty('hospitals_15', 'visibility', 'visible'); 
            this.className = 'bi bi-eye'; 
            this.style.color = '#333';
            legendList.style.display = 'block'; // 显示列表
        }
    });

    document.getElementById('toggle-map-icon-schp').addEventListener('click', function() {
        var layerVisibility = map.getLayoutProperty('school_primary_15', 'visibility');
        var legendList = this.parentNode.nextElementSibling; // 获取紧跟在layer-title后面的ul元素

        if (layerVisibility === 'visible') {
            map.setLayoutProperty('school_primary_15', 'visibility', 'none'); 
            this.className = 'bi bi-eye-slash'; 
            this.style.color = '#8f8f8f'; 
            legendList.style.display = 'none'; // 隐藏列表
        } else {
            map.setLayoutProperty('school_primary_15', 'visibility', 'visible'); 
            this.className = 'bi bi-eye'; 
            this.style.color = '#333';
            legendList.style.display = 'block'; // 显示列表
        }
    });

    document.getElementById('toggle-map-icon-schs').addEventListener('click', function() {
        var layerVisibility = map.getLayoutProperty('school_secondary_15', 'visibility');
        var legendList = this.parentNode.nextElementSibling; // 获取紧跟在layer-title后面的ul元素

        if (layerVisibility === 'visible') {
            map.setLayoutProperty('school_secondary_15', 'visibility', 'none'); 
            this.className = 'bi bi-eye-slash'; 
            this.style.color = '#8f8f8f'; 
            legendList.style.display = 'none'; // 隐藏列表
        } else {
            map.setLayoutProperty('school_secondary_15', 'visibility', 'visible'); 
            this.className = 'bi bi-eye'; 
            this.style.color = '#333';
            legendList.style.display = 'block'; // 显示列表
        }
    });

});




