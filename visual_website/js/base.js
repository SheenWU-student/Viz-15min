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
});
