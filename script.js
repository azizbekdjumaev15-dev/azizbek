document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. HEADER SCROLL & PRELOADER --- */
    const header = document.getElementById('main-header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll && currentScroll > 80) {
            header.classList.add('nav-hidden');
        } else {
            header.classList.remove('nav-hidden');
        }
        lastScroll = currentScroll;
        checkReveal();
    });

    const preloader = document.getElementById('preloader');
    if(preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => preloader.style.visibility = 'hidden', 500);
            }, 1000);
        });
    }

    /* --- 2. THEME LOGIC --- */
    const themeBtn = document.getElementById('theme-btn');
    const themeIcon = themeBtn ? themeBtn.querySelector('i') : null;

    function applyTheme(isDark) {
        if (isDark) {
            document.body.classList.add('dark-theme');
            if(themeIcon) themeIcon.className = 'fas fa-sun'; 
            localStorage.setItem('site_theme', 'dark');
        } else {
            document.body.classList.remove('dark-theme');
            if(themeIcon) themeIcon.className = 'fas fa-moon'; 
            localStorage.setItem('site_theme', 'light');
        }
    }

    const savedTheme = localStorage.getItem('site_theme');
    if (savedTheme === 'dark') applyTheme(true);
    else applyTheme(false); 

    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isDark = document.body.classList.contains('dark-theme');
            applyTheme(!isDark);
        });
    }

    /* --- 3. TRANSLATIONS --- */
    const translations = {
        ru: {
            nav_about: "О ПРОЕКТЕ", nav_features: "ФУНКЦИИ", nav_roadmap: "ПЛАН", btn_login: "ВОЙТИ", 
            hero_title: "WhatsApp Style", hero_date: "V 2.0 • 2026",
            badge_about: "ОПИСАНИЕ", about_title: "Просто. Надежно.", about_desc: "Сквозное шифрование и конфиденциальность ваших данных.",
            stat_users: "Контакты", stat_projects: "Группы",
            gallery_title: "Галерея", gal_1_title: "Чаты", gal_2_title: "Статистика", gal_3_title: "Мобайл", gal_4_title: "Настройки",
            feat_1_title: "Скорость", feat_1_desc: "Мгновенно", 
            feat_2_title: "Защита", feat_2_desc: "Шифрование", 
            feat_3_title: "AI", feat_3_desc: "Умные боты",
            roadmap_title: "План", rm_1_title: "Бета тест", rm_2_title: "Android App", rm_3_title: "Мир",
            comments_title: "Общий чат", comment_placeholder: "Введите сообщение...",
            faq_1_q: "Доступ?", faq_1_a: "По номеру телефона.", 
            faq_2_q: "Бесплатно?", faq_2_a: "Да, абсолютно.",
            social_title: "Соцсети",
            modal_login_title: "Вход", ph_email: "Email/Тел", ph_password: "Пароль", btn_enter: "ВОЙТИ",
            modal_settings_title: "Настройки", st_notif: "Уведомления", btn_logout: "ВЫЙТИ"
        },
        en: {
            nav_about: "ABOUT", nav_features: "FEATURES", nav_roadmap: "ROADMAP", btn_login: "LOG IN", 
            hero_title: "WhatsApp Style", hero_date: "V 2.0 • 2026",
            badge_about: "INFO", about_title: "Simple. Secure.", about_desc: "End-to-end encryption for your privacy.",
            stat_users: "Contacts", stat_projects: "Groups",
            gallery_title: "Gallery", gal_1_title: "Chats", gal_2_title: "Stats", gal_3_title: "Mobile", gal_4_title: "Settings",
            feat_1_title: "Speed", feat_1_desc: "Instant", 
            feat_2_title: "Security", feat_2_desc: "Encrypted", 
            feat_3_title: "AI", feat_3_desc: "Smart Bots",
            roadmap_title: "Roadmap", rm_1_title: "Beta Test", rm_2_title: "Android App", rm_3_title: "Global",
            comments_title: "Public Chat", comment_placeholder: "Type a message...",
            faq_1_q: "Access?", faq_1_a: "Via phone number.", 
            faq_2_q: "Free?", faq_2_a: "Yes, completely.",
            social_title: "Socials",
            modal_login_title: "Login", ph_email: "Email/Phone", ph_password: "Password", btn_enter: "LOG IN",
            modal_settings_title: "Settings", st_notif: "Notifications", btn_logout: "LOG OUT"
        },
        uz: {
            nav_about: "LOYIHA", nav_features: "IMKONIYAT", nav_roadmap: "REJA", btn_login: "KIRISH", 
            hero_title: "WhatsApp Style", hero_date: "V 2.0 • 2026",
            badge_about: "MA'LUMOT", about_title: "Oddiy. Ishonchli.", about_desc: "Ma'lumotlaringiz maxfiyligi uchun shifrlash.",
            stat_users: "Kontaktlar", stat_projects: "Guruhlar",
            gallery_title: "Galereya", gal_1_title: "Chatlar", gal_2_title: "Statistika", gal_3_title: "Mobil", gal_4_title: "Sozlamalar",
            feat_1_title: "Tezlik", feat_1_desc: "Bir zumda", 
            feat_2_title: "Xavfsizlik", feat_2_desc: "Himoyalangan", 
            feat_3_title: "AI", feat_3_desc: "Aqlli botlar",
            roadmap_title: "Reja", rm_1_title: "Beta Test", rm_2_title: "Android Ilova", rm_3_title: "Global",
            comments_title: "Umumiy Chat", comment_placeholder: "Xabar yozing...",
            faq_1_q: "Kirish?", faq_1_a: "Telefon raqami orqali.", 
            faq_2_q: "Bepulmi?", faq_2_a: "Ha, mutlaqo.",
            social_title: "Tarmoqlar",
            modal_login_title: "Kirish", ph_email: "Email/Tel", ph_password: "Parol", btn_enter: "KIRISH",
            modal_settings_title: "Sozlamalar", st_notif: "Bildirishnoma", btn_logout: "CHIQISH"
        }
    };
    let currentLang = 'ru';
    const langs = ['ru', 'en', 'uz'];
    const langBtn = document.getElementById('lang-btn');

    function applyLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if(translations[lang][key]) {
                if(el.tagName === 'INPUT') el.placeholder = translations[lang][key];
                else el.innerText = translations[lang][key];
            }
        });
    }

    if(langBtn) {
        langBtn.addEventListener('click', () => {
            let idx = langs.indexOf(currentLang);
            currentLang = langs[(idx + 1) % langs.length];
            langBtn.innerText = currentLang.toUpperCase();
            applyLanguage(currentLang);
        });
    }

    /* --- 4. REAL STATISTICS (STRICT UNIQUE VIEWS) --- */
    const viewEl = document.getElementById('view-count');
    const likeEl = document.getElementById('like-count');
    const likeBtn = document.getElementById('like-btn');
    const video = document.getElementById('content-video');

    // Ключи
    const STORAGE_VIEWS = 'wa_strict_views_count';
    const STORAGE_LIKES = 'wa_strict_likes_count';
    const STORAGE_USER_LIKED = 'wa_user_is_liked';
    const STORAGE_USER_WATCHED = 'wa_user_has_watched'; // Метка: смотрел ли этот человек уже?

    // 1. Загрузка данных
    let currentViews = parseInt(localStorage.getItem(STORAGE_VIEWS)) || 0;
    let currentLikes = parseInt(localStorage.getItem(STORAGE_LIKES)) || 0;
    
    // Проверка статусов конкретного пользователя
    let hasLiked = localStorage.getItem(STORAGE_USER_LIKED) === 'true';
    let hasWatched = localStorage.getItem(STORAGE_USER_WATCHED) === 'true';

    // 2. Отображение при загрузке
    if(viewEl) viewEl.innerText = currentViews;
    if(likeEl) likeEl.innerText = currentLikes;
    
    if(likeBtn && hasLiked) {
        likeBtn.classList.add('active');
    }

    // 3. ЛОГИКА "ОДИН ЧЕЛОВЕК = ОДИН ПРОСМОТР"
    if(video) {
        video.addEventListener('play', () => {
            // Проверяем, смотрел ли уже этот человек
            if (!hasWatched) {
                // Если НЕ смотрел — засчитываем
                currentViews++;
                localStorage.setItem(STORAGE_VIEWS, currentViews);
                
                // Ставим метку "Просмотрено", чтобы больше не накручивалось
                localStorage.setItem(STORAGE_USER_WATCHED, 'true');
                hasWatched = true;

                // Обновляем экран
                if(viewEl) viewEl.innerText = currentViews;
            } 
            // Если hasWatched === true, мы просто ничего не делаем. Счетчик не меняется.
        });
    }

    // 4. Логика Лайков (Тоже честная)
    if(likeBtn) {
        likeBtn.addEventListener('click', () => {
            if (hasLiked) {
                // Убираем лайк
                currentLikes--;
                hasLiked = false;
                likeBtn.classList.remove('active');
            } else {
                // Ставим лайк
                currentLikes++;
                hasLiked = true;
                likeBtn.classList.add('active');
            }
            // Сохраняем
            localStorage.setItem(STORAGE_LIKES, currentLikes);
            localStorage.setItem(STORAGE_USER_LIKED, hasLiked);
            
            if(likeEl) likeEl.innerText = currentLikes;
        });
    }

    /* --- 5. CHAT SYSTEM --- */
    const commentList = document.getElementById('comments-list');
    const input = document.getElementById('comment-input');
    const sendBtn = document.getElementById('send-comment');
    
    let messages = [
        { user: 'Guest', text: 'Дизайн супер! 🔥', me: false },
        { user: 'Admin', text: 'Спасибо, это стиль WhatsApp.', me: true }
    ];

    function renderChat() {
        if(!commentList) return;
        const divider = commentList.querySelector('.date-divider');
        commentList.innerHTML = '';
        if(divider) commentList.appendChild(divider);
        
        messages.forEach(msg => {
            const div = document.createElement('div');
            div.className = `comment-item ${msg.me ? 'me' : 'guest'}`;
            div.innerHTML = `
                ${!msg.me ? `<div class="c-user" style="color:var(--accent); font-weight:bold; font-size:0.8rem;">${msg.user}</div>` : ''}
                <div>${msg.text}</div>
            `;
            commentList.appendChild(div);
        });
        commentList.scrollTop = commentList.scrollHeight;
    }
    renderChat();

    if(sendBtn && input) {
        const send = () => {
            if(!input.value.trim()) return;
            messages.push({ user: 'You', text: input.value, me: true });
            input.value = '';
            renderChat();
        };
        sendBtn.onclick = send;
        input.addEventListener('keypress', (e) => { if(e.key === 'Enter') send(); });
    }

    /* --- 6. SPOTLIGHT EFFECT --- */
    const spotlightCards = document.querySelectorAll('.spotlight-effect');
    spotlightCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    /* --- 7. FAQ LOGIC --- */
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = null;
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 30 + "px"; 
            }
        });
    });

    /* --- 8. UTILS --- */
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            lbImg.src = item.querySelector('img').src;
            lightbox.classList.add('show');
        });
    });
    if(lightbox) {
        lightbox.querySelector('.close-lightbox').onclick = () => lightbox.classList.remove('show');
        lightbox.onclick = (e) => { if(e.target === lightbox) lightbox.classList.remove('show'); };
    }

    const loginModal = document.getElementById('login-modal');
    const profileModal = document.getElementById('profile-modal');
    const loginBtn = document.getElementById('login-btn');
    const profileIcon = document.getElementById('user-profile-icon');

    function toggle(m, s) { s ? m.classList.add('show') : m.classList.remove('show'); }
    
    if(loginBtn) loginBtn.onclick = () => toggle(loginModal, true);
    if(profileIcon) profileIcon.onclick = () => toggle(profileModal, true);
    
    document.querySelectorAll('.close-modal').forEach(b => b.onclick = () => {
        toggle(loginModal, false); toggle(profileModal, false);
    });

    function checkReveal() {
        document.querySelectorAll('.reveal').forEach(el => {
            if(el.getBoundingClientRect().top < window.innerHeight - 50) el.classList.add('active');
        });
    }
    checkReveal();
});