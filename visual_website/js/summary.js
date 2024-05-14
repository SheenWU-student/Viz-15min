// map
mapboxgl.accessToken = 'pk.eyJ1Ijoic2hlZW41IiwiYSI6ImNscmhxanVhYzAxd28ybHF2ejV6ZDdiaDUifQ.DvsKL2DbpALzmZzViQ1QtQ';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [0.1, 51.5072], // starting position [lng, lat]
    zoom: 9.5
});

map.on('load', function () {
    map.addSource('l', {
        type: 'geojson',
        data: '../data/london-boroughs_1179_2.geojson'
    });
    map.addLayer({
        id: 'i',
        type: 'fill',
        source: 'l',
        layout: {
            'visibility': 'none'
        }
    });

    // Load GeoJSON from an external file
    map.addSource('boroughs', {
        type: 'geojson',
        data: '../data/london-boroughs_1179.geojson'
    });

    // Add a new layer to visualize the data
    map.addLayer({
        id: 'borough-choropleth',
        type: 'fill',
        source: 'boroughs',
        paint: {
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'average_rank'],
                1, '#b2182b',
                10, '#ef8a62',
                20, '#d1e5f0',
                30, '#67a9cf',
                40, '#2166ac'
            ],
            'fill-opacity': 0.75
        }
    });

    // Optional: Add a border around each borough
    map.addLayer({
        id: 'borough-borders',
        type: 'line',
        source: 'boroughs',
        paint: {
            'line-color': '#ffffff',
            'line-width': 2
        }
    });

    // 创建一个标记，并设置为可以拖动
    var marker = new mapboxgl.Marker({ draggable: true })
        .setLngLat([-0.13, 51.5]) // 指定标记的经度和纬度坐标
        .addTo(map); // 将标记添加到地图上

    // 监听标记的拖动事件
    marker.on('dragend', function () {

        // 获取标记当前的经纬度坐标
        var markerLngLat = marker.getLngLat();

        // 查询标记所在位置的行政区域
        var features = map.queryRenderedFeatures(map.project(markerLngLat), {
            layers: ['borough-choropleth'] // 替换为实际的行政区域图层名称
        });

        // 如果找到了行政区域
        if (features.length > 0) {
            var boroughName = features[0].properties.name; // 假设行政区域的名称属性为 'name'
            console.log('Marker belongs to borough:', boroughName);

            // 找到对应的雷达图容器
            var radarContainer = document.querySelector('.radar-canvas-wrap[data-borough="' + boroughName + '"]');
            console.log(radarContainer);
            // 检查是否找到雷达图容器
            if (radarContainer) {
                // 使用滚动动画将页面滚动到雷达图容器的位置
                radarContainer.scrollIntoView({ behavior: 'smooth', block: 'center'});
            }
        } else {
            console.log('No borough found at marker location.');
        }
    });




});

//radar chart
var ctx0 = document.getElementById('chart0').getContext('2d');
var chart0 = new Chart(ctx0, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Islington',
            data: ['5.058272358', '7.674796748', '0.308943089', '9.739837398', '1.837398374', '4.479674797', '6.6'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        legend: {
            labels: {
                fontStyle: 'bold',    // 设置字体为粗体
                boxWidth: 0           // 将图例色块的宽度设置为0，隐藏色块
            }
        },
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx1 = document.getElementById('chart1').getContext('2d');
var chart1 = new Chart(ctx1, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'City of London',
            data: ['5.568208333', '3.166666667', '2.666666667', '7', '1', '4', '9.6'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx2 = document.getElementById('chart2').getContext('2d');
var chart2 = new Chart(ctx2, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Camden',
            data: ['8.736898496', '6.578947368', '1.721804511', '7.165413534', '1.654135338', '3.939849624', '5.8'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx3 = document.getElementById('chart3').getContext('2d');
var chart3 = new Chart(ctx3, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Southwark',
            data: ['4.175343373', '5.13253012', '0.620481928', '10.24096386', '2.789156627', '3.512048193', '5.2'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx4 = document.getElementById('chart4').getContext('2d');
var chart4 = new Chart(ctx4, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Haringey',
            data: ['0.920358621', '4.779310345', '0.55862069', '8.020689655', '1.434482759', '3.027586207', '8.2'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx5 = document.getElementById('chart5').getContext('2d');
var chart5 = new Chart(ctx5, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Lewisham',
            data: ['0.687162722', '3.331360947', '0.360946746', '6.171597633', '1.213017751', '2.792899408', '12.6'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx6 = document.getElementById('chart6').getContext('2d');
var chart6 = new Chart(ctx6, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Lambeth',
            data: ['1.884980337', '5.640449438', '0.325842697', '7.292134831', '1.91011236', '2.674157303', '9.2'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx7 = document.getElementById('chart7').getContext('2d');
var chart7 = new Chart(ctx7, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Hammersmith and Fulham',
            data: ['2.597150442', '6.327433628', '0.530973451', '6.85840708', '2.079646018', '2.654867257', '8.2'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx8 = document.getElementById('chart8').getContext('2d');
var chart8 = new Chart(ctx8, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Westminster',
            data: ['10.90677734', '8.9921875', '2.703125', '8.8359375', '2.1328125', '2.4609375', '4'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx9 = document.getElementById('chart9').getContext('2d');
var chart9 = new Chart(ctx9, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Merton',
            data: ['0.806850807', '2.451612903', '0.096774194', '4.024193548', '0.830645161', '2.241935484', '21.6'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx10 = document.getElementById('chart10').getContext('2d');
var chart10 = new Chart(ctx10, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Tower Hamlets',
            data: ['6.466385417', '5.277777778', '1.006944444', '10.90277778', '2.861111111', '2.138888889', '5.4'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx11 = document.getElementById('chart11').getContext('2d');
var chart11 = new Chart(ctx11, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Hackney',
            data: ['2.469993056', '7.625', '0.666666667', '10.33333333', '2.763888889', '2.104166667', '5.4'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx12 = document.getElementById('chart12').getContext('2d');
var chart12 = new Chart(ctx12, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Newham',
            data: ['1.113210366', '6.548780488', '0.475609756', '7.884146341', '2.085365854', '2.012195122', '8.2'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx13 = document.getElementById('chart13').getContext('2d');
var chart13 = new Chart(ctx13, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Greenwich',
            data: ['0.644778146', '2.688741722', '0.377483444', '4.814569536', '0.814569536', '1.940397351', '17.8'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx14 = document.getElementById('chart14').getContext('2d');
var chart14 = new Chart(ctx14, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Wandsworth',
            data: ['1.026058659', '3.837988827', '0.363128492', '5.463687151', '0.972067039', '1.860335196', '15.4'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx15 = document.getElementById('chart15').getContext('2d');
var chart15 = new Chart(ctx15, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Waltham Forest',
            data: ['0.739670139', '4.284722222', '0.111111111', '5.291666667', '1.618055556', '1.840277778', '16.8'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx16 = document.getElementById('chart16').getContext('2d');
var chart16 = new Chart(ctx16, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Kensington and Chelsea',
            data: ['3.751446602', '7.941747573', '1.058252427', '6.834951456', '1.262135922', '1.757281553', '9.4'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx17 = document.getElementById('chart17').getContext('2d');
var chart17 = new Chart(ctx17, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Ealing',
            data: ['0.701732143', '4.433673469', '0.168367347', '3.423469388', '0.969387755', '1.678571429', '19.8'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx18 = document.getElementById('chart18').getContext('2d');
var chart18 = new Chart(ctx18, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Sutton',
            data: ['0.585024793', '1.983471074', '0.181818182', '2.94214876', '0.694214876', '1.595041322', '25.6'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx19 = document.getElementById('chart19').getContext('2d');
var chart19 = new Chart(ctx19, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Croydon',
            data: ['0.637209091', '2.986363636', '0.190909091', '3.540909091', '0.659090909', '1.581818182', '23.4'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx20 = document.getElementById('chart20').getContext('2d');
var chart20 = new Chart(ctx20, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Brent',
            data: ['0.88715896', '3.959537572', '0.225433526', '4.786127168', '1.028901734', '1.543352601', '17.8'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx21 = document.getElementById('chart21').getContext('2d');
var chart21 = new Chart(ctx21, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Bromley',
            data: ['0.421317259', '1.695431472', '0.131979695', '2.512690355', '0.299492386', '1.45177665', '29.4'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx22 = document.getElementById('chart22').getContext('2d');
var chart22 = new Chart(ctx22, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Kingston upon Thames',
            data: ['0.746877551', '1.948979592', '0.397959184', '3.418367347', '0.755102041', '1.387755102', '22.8'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx23 = document.getElementById('chart23').getContext('2d');
var chart23 = new Chart(ctx23, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Enfield',
            data: ['0.590308743', '2.142076503', '0.273224044', '3.967213115', '0.989071038', '1.202185792', '21.6'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx24 = document.getElementById('chart24').getContext('2d');
var chart24 = new Chart(ctx24, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Barking and Dagenham',
            data: ['0.573936364', '3.918181818', '0.118181818', '4.727272727', '1.090909091', '1.154545455', '20'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx25 = document.getElementById('chart25').getContext('2d');
var chart25 = new Chart(ctx25, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Barnet',
            data: ['0.577345972', '2.535545024', '0.289099526', '3.616113744', '0.819905213', '1.137440758', '22.4'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx26 = document.getElementById('chart26').getContext('2d');
var chart26 = new Chart(ctx26, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Redbridge',
            data: ['0.561453416', '3.142857143', '0.273291925', '3.440993789', '0.956521739', '1.074534161', '21.8'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx27 = document.getElementById('chart27').getContext('2d');
var chart27 = new Chart(ctx27, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Harrow',
            data: ['0.556091241', '2.364963504', '0.255474453', '2.605839416', '0.927007299', '1.04379562', '25.4'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx28 = document.getElementById('chart28').getContext('2d');
var chart28 = new Chart(ctx28, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Hounslow',
            data: ['0.864373239', '3.14084507', '0.133802817', '3.014084507', '0.978873239', '1.021126761', '24.2'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx29 = document.getElementById('chart29').getContext('2d');
var chart29 = new Chart(ctx29, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Bexley',
            data: ['0.417315069', '1.287671233', '0.102739726', '3.321917808', '0.51369863', '1.020547945', '30.4'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx30 = document.getElementById('chart30').getContext('2d');
var chart30 = new Chart(ctx30, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Havering',
            data: ['0.39966', '1.926666667', '0.06', '2.74', '0.666666667', '1.02', '30.8'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx31 = document.getElementById('chart31').getContext('2d');
var chart31 = new Chart(ctx31, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Richmond upon Thames',
            data: ['0.760186957', '2.156521739', '0.339130435', '3.286956522', '0.686956522', '0.939130435', '25.8'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});

var ctx32 = document.getElementById('chart32').getContext('2d');
var chart32 = new Chart(ctx32, {
    type: 'radar',
    data: {
        labels: ['employment_15(ten thousand)', 'gp_number_15', 'hospitals_15', 'school_primary_15', 'school_secondary_15', 'supermarket_15', 'Average_Rank_15min'],
        datasets: [{
            label: 'Hillingdon',
            data: ['0.555478261', '1.807453416', '0.111801242', '2.546583851', '0.720496894', '0.614906832', '30.4'],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scale: {
            angleLines: {
                display: true
            },
            ticks: {
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        }
    }
});