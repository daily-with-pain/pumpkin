/* js/video-player.js - 影片播放器控制 */

document.addEventListener("DOMContentLoaded", function () {

    const videoWrappers = document.querySelectorAll('.video-wrapper');

    // 1. 設定 Intersection Observer (滑到才播，滑走暫停)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target.querySelector('video');
            if (!video) return;

            if (entry.isIntersecting) {
                // 進入畫面：嘗試播放
                // 檢查全域靜音狀態（如果 main.js 已經載入）
                const shouldBeMuted = typeof isGlobalMuted !== 'undefined' ? isGlobalMuted : true;

                // 設定影片靜音狀態
                video.muted = shouldBeMuted;

                console.log(`🎬 Video autoplay: muted=${video.muted}, globalMuted=${shouldBeMuted}`);

                video.play().catch(error => {
                    console.log("自動播放被瀏覽器阻擋，嘗試靜音播放:", error);
                    // 如果失敗，強制靜音後再試一次
                    video.muted = true;
                    video.play().catch(err => {
                        console.error("即使靜音也無法播放:", err);
                    });
                });
            } else {
                // 離開畫面：暫停 (節省效能)
                video.pause();
            }
        });
    }, { threshold: 1.0 }); // 完全進入視窗才開始播放

    // 2. 為每個影片區塊綁定功能
    videoWrappers.forEach(wrapper => {
        const video = wrapper.querySelector('video');
        const btn = wrapper.querySelector('.video-mute-btn');

        // 如果沒有自訂按鈕（使用原生 controls），就跳過按鈕綁定
        if (!btn) {
            observer.observe(wrapper);
            return;
        }

        const iconMuted = btn.querySelector('.icon-muted');
        const iconUnmuted = btn.querySelector('.icon-unmuted');

        // 加入觀察名單
        observer.observe(wrapper);

        // 點擊按鈕：切換靜音狀態
        btn.addEventListener('click', function () {
            // 切換靜音屬性
            video.muted = !video.muted;

            // 如果原本沒在播 (例如被阻擋)，點擊時順便強制播放
            if (video.paused) {
                video.play();
            }

            // 切換圖示
            if (video.muted) {
                iconMuted.style.display = 'flex';
                iconUnmuted.style.display = 'none';
                btn.setAttribute('aria-label', '開啟聲音');
            } else {
                iconMuted.style.display = 'none';
                iconUnmuted.style.display = 'flex';
                btn.setAttribute('aria-label', '關閉聲音');
            }
        });
    });
});
