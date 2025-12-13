/* js/prevalence.js */

document.addEventListener("DOMContentLoaded", function () {

    // 1. 數字跳動動畫 (Counter Animation)
    const counterElement = document.getElementById("patient-counter");
    let hasCounted = false;

    // 定義計數函數
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // 使用 Math.floor 讓數字是整數
            const currentVal = Math.floor(progress * (end - start) + start);
            
            // 加上千分位逗號 (toLocaleString)
            obj.innerHTML = currentVal.toLocaleString();
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // 2. Intersection Observer (監聽元素是否進入畫面)
    const observerOptions = {
        root: null,
        threshold: 0.3, // 露出 30% 時觸發
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                
                // 觸發文字浮現
                if (entry.target.classList.contains('scroll-text-block')) {
                    entry.target.classList.add('visible');
                }

                // 觸發病假單動畫
                if (entry.target.classList.contains('sick-leave-visual')) {
                    entry.target.classList.add('active');
                }

                // 觸發進度條
                if (entry.target.classList.contains('stat-bar-container')) {
                    entry.target.classList.add('active');
                }

                // 觸發數字跳動 (只跳一次)
                if (entry.target.classList.contains('counter-bg') && !hasCounted) {
                    animateValue(counterElement, 0, 2015949, 2500); // 2.5秒跑完
                    hasCounted = true;
                }
            }
        });
    }, observerOptions);

    // 開始監聽所有目標
    document.querySelectorAll('.scroll-text-block').forEach(el => observer.observe(el));
    document.querySelectorAll('.sick-leave-visual').forEach(el => observer.observe(el));
    document.querySelectorAll('.stat-bar-container').forEach(el => observer.observe(el));
    
    // 特別監聽數字背景，以觸發計數
    const counterBg = document.querySelector('.counter-bg');
    if(counterBg) observer.observe(counterBg);
});