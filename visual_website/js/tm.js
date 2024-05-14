
//golbal 
var globalGeojsonData = null;

// Add your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiamF5c3ciLCJhIjoiY2xyN3I2aXZ6Mm9ndjJpbXlnM2Frb3c4ZiJ9.I-Ce0Zn7Qc_dpaWEwSP35Q';
const map = new mapboxgl.Map({
    container: 'map', // Specify the container ID
    style:
        'mapbox://styles/mapbox/light-v11', // Specify which map style to use
    center: [-0.13, 51.50], // Specify the starting position
    zoom: 12 // Specify the starting zoom
});
// Create constants to use in getIso()

const urlBase = 'https://api.mapbox.com/isochrone/v1/mapbox/';
let profile = 'cycling'; // Set the default routing profile
let minutes = 10; // Set the default duration

const marker = new mapboxgl.Marker({
    draggable: true,
    color: '#314ccd'
}).setLngLat([-0.13, 51.50]).addTo(map);

// Create a function that sets up the Isochrone API query then makes an fetch call
async function getIso(lon, lat) {
    const query = await fetch(
        `${urlBase}${profile}/${lon},${lat}?contours_minutes=${minutes}&polygons=true&access_token=${mapboxgl.accessToken}`,
        { method: 'GET' }
    );
    const data = await query.json();
    if (map.getSource('iso')) {
        map.getSource('iso').setData(data);
    } else {
        map.addSource('iso', {
            type: 'geojson',
            data: data
        });
        map.addLayer(
            {
                id: 'isoLayer',
                type: 'fill',
                // Use "iso" as the data source for this layer
                source: 'iso',
                layout: {},
                paint: {
                    // The fill color for the layer is set to a light purple
                    'fill-color': '#5a3fc0',
                    'fill-opacity': 0.3
                }
            });


    }
    const points = await getPoints(data);
    // console.log(9999999);
    showbarchart(points);
}



async function downloadData() {
    // URL 地址，指向你的 GeoJSON 文件
    const geojsonUrl = '../data/poi.geojson';

    try {
        // 使用 fetch API 加载 GeoJSON 数据并等待响应
        const response = await fetch(geojsonUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // 将响应体转换为 JSON 并等待结果
        const geojsonData = await response.json();
        // console.log('GeoJSON loaded:', geojsonData);
        return geojsonData;  // 返回加载的 GeoJSON 数据
    } catch (error) {
        console.error('Error fetching GeoJSON:', error);
    }
}


// Call the getIso function
map.on('load', async function () {
    // console.log('Map loaded');
    globalGeojsonData = await downloadData();
    getIso(-0.13, 51.50);
    marker.on('dragend', function () {
        const lngLat = marker.getLngLat();
        getIso(lngLat.lng, lngLat.lat);
    });


    map.addSource('points', {
        type: 'geojson',
        data: '../data/poi.geojson' // 指定你的 GeoJSON 文件路径
    });

    map.addLayer({
        id: 'points-layer',
        type: 'circle', // 使用圆形标记点
        source: 'points',
        paint: {
            // 使用数据驱动的方法来根据 categoryname 属性设置颜色
            'circle-color': [
                'match',
                ['get', 'categoryname'],
                'Health Support Services', '#b2182b',  // 为 Category1 设置橙色
                'Landscape Features', '#d6604d',  // 为 Category1 设置粉红色
                'Eating and Drinking', '#f4a582',  // 为 Category1 设置绿色
                'Public Transport', '#fddbc7',  // 为 Category1 设置橙色
                'Accommodation', '#d1e5f0',  // 为 Category1 设置橙色
                'Entertainment', '#67a9cf',  // 为 Category1 设置橙色
                'Education', '#2166ac',  // 为 Category1 设置橙色
                /* 更多类别颜色 */
                '#FFFFFF' // 其他类别默认颜色
            ],
            'circle-radius': 3, // 点的半径
            'circle-opacity': 0.5

        }
    });

    const visibleCategories = new Set(); // 初始时没有类别是可见的

    // 一开始就设置过滤器隐藏所有类别
    map.setFilter('points-layer', ['in', ['get', 'categoryname'], ['literal', Array.from(visibleCategories)]]);

    const categoryToggles = document.querySelectorAll('.category-toggle');
    categoryToggles.forEach(function (toggle) {
        toggle.addEventListener('change', function (e) {
            const category = e.target.value;
            if (!e.target.checked) {
                visibleCategories.add(category);
            } else {
                visibleCategories.delete(category);
            }

            // 更新地图图层的过滤器以反映当前可见的类别
            map.setFilter('points-layer', [
                'in',
                ['get', 'categoryname'],
                ['literal', Array.from(visibleCategories)]
            ]);
        });
    });


});


// Initialize the marker at the query coordinates
//marker.setLngLat(lngLat).addTo(map);

document.addEventListener('DOMContentLoaded', function () {
    const params = document.getElementById('params');
    if (params) {
        params.addEventListener('change', function (event) {
            if (event.target.name === 'profile') {
                profile = event.target.value;
            } else if (event.target.name === 'duration') {
                minutes = parseInt(event.target.value);
            }
            const currentPos = marker.getLngLat();
            getIso(currentPos.lng, currentPos.lat);
        });
    } else {
        console.log('Element #params not found');
    }
});

// 一个异步函数，用于获取在多边形内的点
async function getPoints(data) {
    // console.log('Getting points within polygon');
    let polygon = data.features[0]; // 取第一个特征作为多边形，确保这个特征是一个多边形

    // 准备一个新的 GeoJSON FeatureCollection 来存储在多边形内的点
    let pointsWithinPolygon = {
        "type": "FeatureCollection",
        "features": []
    };
    // 检查每个点是否在多边形内
    globalGeojsonData.features.forEach(feature => {
        if (turf.booleanPointInPolygon(feature, polygon)) {
            pointsWithinPolygon.features.push(feature);
        }
    });


    // 打印在多边形内的所有点
    // console.log(999, pointsWithinPolygon);
    return pointsWithinPolygon;

}

let myChart = null;

//bar chart show
function showbarchart(points) {
    let categoryCounts = {};

    points.features.forEach(feature => {
        let category = feature.properties.categoryname;
        if (categoryCounts[category]) {
            categoryCounts[category] += 1;
        } else {
            categoryCounts[category] = 1;
        }
    });

    console.log(categoryCounts); // 查看分类计数结果
    //排序
    // 将字典转换为数组，并按值的大小进行排序
    const sortedEntries = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);

    // 将排序后的数组转换回字典
    categoryCounts = Object.fromEntries(sortedEntries);

    //缩写
    // 映射关系
    const keyMapping = {
        'Eating and Drinking': 'EaD',
        'Accommodation': 'ACC',
        'Entertainment': 'ENT',
        'Public Transport': 'PUBT',
        'Health Support Services': 'HSS',
        'Education': 'EDU',
        'Landscape Features': 'LF'
    };

    // 将键修改后的字典
    const modifiedDict = {};

    // 遍历原始字典，根据映射关系修改键
    for (const key in categoryCounts) {
        if (keyMapping.hasOwnProperty(key)) {
            modifiedDict[keyMapping[key]] = categoryCounts[key];
        } else {
            modifiedDict[key] = categoryCounts[key];
        }
    }

    // 打印修改后的字典
    console.log(modifiedDict);



    const ctx = document.getElementById('mychart').getContext('2d');

    // 如果已经有图表存在，则先销毁
    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(modifiedDict), // 类别名称
            datasets: [{
                label: '# of Points',
                data: Object.values(modifiedDict), // 每个类别的计数
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}

document.addEventListener('DOMContentLoaded', function () {
    const toggles = document.querySelectorAll('.toggle-color .toggle');
    // console.log(toggles);
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function () {

            const checkbox = this.previousElementSibling;
            const defaultColor = '#757D82'; // 默认背景颜色

            if (checkbox.checked) {
                this.style.backgroundColor = this.dataset.color; // 设置为复选框的 data-color 属性值

            } else {
                this.style.backgroundColor = defaultColor; // 设置为默认颜色
            }
        });
    });
});


//     const defaultColor = toggle.style.backgroundColor;
