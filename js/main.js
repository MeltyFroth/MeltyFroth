// BGM機能
class BGMPlayer {
    constructor() {
        this.audio = null;
        this.isPlaying = false;
        this.toggleButton = document.getElementById('bgm-toggle');
        this.volumeSlider = document.getElementById('volume-slider');
        this.icon = document.getElementById('bgm-icon');

        this.init();
    }

    init() {
        // オーディオ要素を作成
        this.audio = new Audio();
        // BGMファイルのパスを設定
        this.audio.src = 'audio/Melty.mp3';
        this.audio.loop = true;
        this.audio.volume = 0.02;

        // イベントリスナーを設定
        this.toggleButton.addEventListener('click', () => this.toggle());
        this.volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));

        // エラーハンドリング
        this.audio.addEventListener('error', () => {
            console.log('BGMファイルが見つかりません。audio/Melty.mp3 にBGMファイルを配置してください。');
        });

        // 保存された状態を復元
        this.restoreState();

        // 定期的に再生位置を保存（1秒ごと）
        setInterval(() => this.saveState(), 1000);

        // ページ離脱時に状態を保存
        window.addEventListener('beforeunload', () => this.saveState());
    }

    saveState() {
        if (this.audio) {
            localStorage.setItem('bgm_isPlaying', this.isPlaying);
            localStorage.setItem('bgm_currentTime', this.audio.currentTime);
            localStorage.setItem('bgm_volume', this.audio.volume);
        }
    }

    restoreState() {
        const wasPlaying = localStorage.getItem('bgm_isPlaying') === 'true';
        const currentTime = parseFloat(localStorage.getItem('bgm_currentTime')) || 0;
        const volume = parseFloat(localStorage.getItem('bgm_volume')) || 0.02;

        this.audio.volume = volume;
        this.volumeSlider.value = volume * 100;

        // メタデータが読み込まれたら再生位置を設定
        this.audio.addEventListener('loadedmetadata', () => {
            this.audio.currentTime = currentTime;
            if (wasPlaying) {
                this.play();
            }
        }, { once: true });

        // 初回アクセスの場合は自動再生
        if (localStorage.getItem('bgm_isPlaying') === null) {
            this.play();
        }
    }

    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        this.audio.play()
            .then(() => {
                this.isPlaying = true;
                this.icon.textContent = '⏸️';
                this.toggleButton.classList.add('playing');
            })
            .catch(error => {
                console.log('BGMの再生に失敗しました:', error);
            });
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.icon.textContent = '🎵';
        this.toggleButton.classList.remove('playing');
    }

    setVolume(value) {
        this.audio.volume = value / 100;
    }
}

// スライドギャラリー機能
class SlideGallery {
    constructor() {
        this.sliderTrack = document.getElementById('slider-track');
        this.prevBtn = document.getElementById('prev-slide');
        this.nextBtn = document.getElementById('next-slide');

        if (!this.sliderTrack) return; // ページにスライダーがない場合は終了

        this.slides = this.sliderTrack.querySelectorAll('.slide-item');
        this.currentIndex = 0;
        this.slidesToShow = 1; // 一度に表示するスライド数
        this.maxIndex = Math.max(0, this.slides.length - this.slidesToShow);

        this.init();
    }

    init() {
        if (!this.prevBtn || !this.nextBtn) return;

        // ボタンのイベントリスナー
        this.prevBtn.addEventListener('click', () => this.slidePrev());
        this.nextBtn.addEventListener('click', () => this.slideNext());

        // レスポンシブ対応
        this.updateSlidesToShow();
        window.addEventListener('resize', () => this.updateSlidesToShow());
    }

    updateSlidesToShow() {
        // 常に1枚ずつ表示
        this.slidesToShow = 1;
        this.maxIndex = Math.max(0, this.slides.length - this.slidesToShow);
        this.updateSlider();
    }

    slidePrev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateSlider();
        }
    }

    slideNext() {
        if (this.currentIndex < this.maxIndex) {
            this.currentIndex++;
            this.updateSlider();
        }
    }

    updateSlider() {
        const slideWidth = this.slides[0].offsetWidth;
        const offset = -(this.currentIndex * slideWidth);
        this.sliderTrack.style.transform = `translateX(${offset}px)`;
    }
}

// スムーススクロール（ページ内リンク用）
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') {
                    e.preventDefault();
                    return;
                }

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// スクロールアニメーション
class ScrollAnimation {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, this.observerOptions);

        // アニメーション対象の要素を設定
        const animatedElements = document.querySelectorAll('.cast-card, .cast-image-item, .slide-item, .social-icon');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// DOMの読み込み完了後に初期化
document.addEventListener('DOMContentLoaded', () => {
    // BGMプレイヤーを初期化
    const bgmPlayer = new BGMPlayer();

    // スライドギャラリーを初期化
    const slideGallery = new SlideGallery();

    // スムーススクロールを初期化
    const smoothScroll = new SmoothScroll();

    // スクロールアニメーションを初期化
    const scrollAnimation = new ScrollAnimation();

    // ヘッダーのスクロールでの表示/非表示
    let lastScrollY = window.scrollY;
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (!header) return;
        const current = window.scrollY;
        if (current > lastScrollY && current > 100) {
            header.classList.add('hide');
        } else {
            header.classList.remove('hide');
        }
        lastScrollY = current;
    });

    // ハンバーガーメニューの制御
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // メニュー内のリンクをクリックしたら閉じる
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // スマホでのドロップダウンメニュー制御（タップで開閉）
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault(); // リンク遷移を無効化
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    console.log('MeltyFroth サイトが読み込まれました！');
});
