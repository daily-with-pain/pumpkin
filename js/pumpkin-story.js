// // ===== 南瓜「尿遁」故事漩渦效果 JS ======

$(document).ready(function() {
    
    let hasTriggered = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasTriggered) {
                hasTriggered = true;
                runVortexSequence();
            }
        });
    }, { threshold: 0.9 }); // 看到 90% 的區塊時觸發

    const wrapper = document.getElementById('vortexTrigger');
    if (wrapper) {
        observer.observe(wrapper);
    }

    function runVortexSequence() {
        const rings = wrapper.querySelectorAll('.vortex-text');
        const finalText = wrapper.querySelector('.final-text');
        
        const interval = 600; 

        // 1. 依序出現
        rings.forEach((ring, index) => {
            setTimeout(() => {
                ring.classList.add('show');
            }, index * interval);
        });

        // 2. 全部出現後，讓背景變淡，中間文字浮現
        const totalAppearTime = rings.length * interval;
        const holdTime = 1200; // 全亮之後維持 1.2 秒再變淡

        setTimeout(() => {
            // 讓漩渦變淡 (但繼續轉)
            rings.forEach(ring => {
                ring.classList.add('dim');
            });

            // 顯示直排文字
            setTimeout(() => {
                finalText.classList.add('visible');
            }, 500); // 背景開始變淡 0.5 秒後，文字浮現

        }, totalAppearTime + holdTime);
    }
});