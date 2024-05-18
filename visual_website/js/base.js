document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // 阻止默认跳转行为
            event.preventDefault();

            // 移除所有链接的 active 类
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            // 给当前点击的链接添加 active 类
            this.classList.add('active');
            
            // 获取点击链接的 href 属性值
            const targetId = this.getAttribute('href').substring(1);
            
            // 获取目标 section 元素
            const targetSection = document.getElementById(targetId);
            
            // 滚动到目标 section 的位置
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // var iframe = document.getElementById('sum');
    // console.log(iframe);



    // marker.on('dragend', function () {
    //     // 获取标记当前的经纬度坐标
    //     var markerLngLat = marker.getLngLat();
    //     // 查询标记所在位置的行政区域 map.project(markerLngLat)
    //     var features = map.queryRenderedFeatures(map.project(markerLngLat), {
    //         layers: ['borough-choropleth'] // 替换为实际的行政区域图层名称
    //     });
    //     // 如果找到了行政区域
    //     if (features.length > 0) {
    //         var boroughName = features[0].properties.name; // 假设行政区域的名称属性为 'name'
    //         if (boroughName) {
    //             map.setFilter('lahighlight', ['==', 'name', boroughName]);
    //         } else {
    //             map.setFilter('lahighlight', ['==', 'name', 'null']);
    //         }
    //         // 找到对应的雷达图容器
    //         var radarContainer = document.querySelector('.radar-canvas-wrap[data-borough="' + boroughName + '"]');
    //         // 检查是否找到雷达图容器
    //         if (radarContainer) {
    //             // 使用滚动动画将页面滚动到雷达图容器的位置
    //             radarContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    //         }
    //     } else {
    //         console.log('No borough found at marker location.');
    //     }
    // });
});

