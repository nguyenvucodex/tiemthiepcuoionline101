import re

log_path = r"C:\Users\VU\.gemini\antigravity\brain\036d998c-bf7a-4e48-ba01-48df5fe9a6fc\.system_generated\logs\overview.txt"
with open(log_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the block for style.css view_file
# It starts with "File Path: `file:///d:/thiep%20cuoi%2004/style.css`"
# Then "Showing lines 1 to 800"
# Then "1: @font-face {"
start_idx = content.find("File Path: `file:///d:/thiep%20cuoi%2004/style.css`")
if start_idx != -1:
    block = content[start_idx:]
    lines_block = block.split("The above content does NOT show the entire file contents.")[0]
    
    extracted_css = []
    lines = lines_block.split('\n')
    for line in lines:
        # Match lines like "1: @font-face {"
        match = re.match(r'^\d+:\s(.*)', line)
        if match:
            extracted_css.append(match.group(1))
            
    base_css = '\n'.join(extracted_css)

    # Now append all the additions that were truncated (from line 801 onwards)
    additions = """
/* ------------------------------------- */
/* THÔNG TIN TIỆC CƯỚI SECTION */
/* ------------------------------------- */
.party-section {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 60px 20px 80px;
    text-align: center;
    position: relative;
    background-color: transparent;
}

.party-subtitle {
    font-size: 24px;
    color: #ce272c;
    margin-bottom: 20px;
    text-transform: uppercase;
}

.event-year-black {
    font-size: 34px;
    font-weight: 700;
    color: #000;
    margin-bottom: 15px;
}

.event-lunar-uppercase {
    font-size: 18px;
    color: #333;
    text-transform: uppercase;
    margin-bottom: 40px;
    letter-spacing: 1px;
}

.date-text {
    color: #000;
}

.timeline {
    display: flex;
    justify-content: center;
    gap: 60px;
    margin-bottom: 50px;
}

.time-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.time-label {
    font-size: 18px;
    color: #333;
    text-transform: uppercase;
}

.time-value {
    font-size: 32px;
    font-weight: 700;
    color: #ce272c;
}

.countdown-container {
    margin-bottom: 60px;
}

.countdown-title {
    font-size: 22px;
    color: #333;
    margin-bottom: 15px;
    text-transform: uppercase;
}

.countdown-timer {
    font-size: 26px;
    font-weight: 700;
    color: #000;
}

/* Tự vẽ Lịch (Calendar) bằng CSS */
.calendar-wrapper {
    width: 320px;
    margin: 0 auto;
    position: relative;
    padding-top: 25px;
}

.spirals {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    z-index: 2;
}

.spiral {
    width: 12px;
    height: 45px;
    border: 3px solid #ce272c;
    border-radius: 10px;
    background-color: #fffafb;
    box-shadow: inset 0 -3px 3px rgba(0,0,0,0.1), 0 3px 3px rgba(0,0,0,0.1);
}

.calendar-card {
    background: #fff;
    border: 3px solid #ce272c;
    border-radius: 15px;
    padding: 40px 15px 25px;
    position: relative;
    z-index: 1;
    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
}

.cal-month {
    font-weight: 700;
    font-size: 22px;
    margin-bottom: 20px;
    color: #000;
}

.cal-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;
    text-align: center;
}

.cal-header {
    font-size: 14px;
    color: #888;
    padding-bottom: 15px;
    border-bottom: 2px solid #ce272c;
    margin-bottom: 15px;
}

.cal-days {
    font-size: 16px;
    color: #333;
    row-gap: 18px;
}

.cal-highlight {
    position: relative;
    color: #fff;
    font-weight: bold;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.cal-highlight::before {
    content: "♥";
    position: absolute;
    font-family: Arial, sans-serif; /* Dùng icon trái tim có sẵn của text */
    font-size: 40px;
    color: #ce272c;
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);
}

/* ------------------------------------- */
/* ĐỊA ĐIỂM TỔ CHỨC SECTION */
/* ------------------------------------- */
.location-section {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 60px 20px 40px;
    text-align: center;
}

.location-address {
    font-size: 20px;
    color: #000;
    margin-bottom: 30px;
    line-height: 1.5;
    font-weight: 500;
}

.map-container {
    width: 100%;
    height: 350px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    border: 3px solid #f9e1e1; /* Khung viền hồng dễ thương */
}

/* ------------------------------------- */
/* LỊCH TRÌNH NGÀY CƯỚI SECTION */
/* ------------------------------------- */
.schedule-section {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px 80px;
    text-align: center;
}

.timeline-container {
    position: relative;
    max-width: 500px;
    margin: 40px auto 0;
    display: flex;
    flex-direction: column;
    gap: 40px;
}

.timeline-line {
    position: absolute;
    top: 10px;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    background-color: #ce272c;
    opacity: 0.4; /* Làm nhạt bớt để không bị thô */
    z-index: 1;
}

.timeline-item {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 2;
}

.timeline-time {
    flex: 1;
    text-align: right;
    padding-right: 35px;
    font-size: 22px;
    font-weight: 700;
    color: #ce272c;
}

.timeline-content {
    flex: 1;
    text-align: left;
    padding-left: 35px;
    font-size: 20px;
    font-weight: 700;
    color: #333;
}

.timeline-dot {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 16px;
    height: 16px;
    background-color: #ce272c;
    border-radius: 50%;
    box-shadow: 0 0 0 6px #fffafb; /* Viền trắng bao quanh che đi đường kẻ dọc */
}

.timeline-decor {
    position: absolute;
    width: 75px;
    left: -20px; /* Đẩy ra lề bên trái */
    opacity: 0.95;
    z-index: 3;
    pointer-events: none;
}

.decor-left-1 {
    top: -20px;
}

.decor-left-2 {
    top: -30px;
}

@media (max-width: 500px) {
    .timeline-time { padding-right: 20px; font-size: 18px; }
    .timeline-content { padding-left: 20px; font-size: 16px; }
    .timeline-decor {
        left: -10px;
        width: 65px;
    }
}

/* ------------------------------------- */
/* PHONG BAO MỪNG CƯỚI & LỜI CẢM ƠN */
/* ------------------------------------- */
.thanks-section {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 60px 20px 80px;
    text-align: center;
    background-color: transparent; /* Xoá nền trắng để lộ ra nền chấm bi của khối cha */
}

.text-black {
    color: #000;
}

/* Vẽ Phong Bao Lì Xì (Red Envelope) bằng CSS */
.envelope-wrapper {
    position: relative;
    width: 220px;
    height: 300px;
    margin: 50px auto 30px;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.envelope-wrapper:hover {
    transform: translateY(-10px) scale(1.02);
}

.envelope {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #d32f2f, #b71c1c); /* Màu đỏ đô sang trọng */
    border-radius: 12px;
    position: relative;
    box-shadow: 0 15px 35px rgba(183, 28, 28, 0.4), 0 0 40px rgba(241, 196, 15, 0.2); /* Ánh sáng vàng toả ra */
    border: 2px solid #f1c40f; /* Viền vàng */
    overflow: hidden;
    z-index: 2;
}

/* Các góc viền vàng vuông vức của phong bao */
.env-corner {
    position: absolute;
    width: 35px;
    height: 35px;
    border: 3px solid #f1c40f;
    opacity: 0.8;
}
.env-top-left { top: 12px; left: 12px; border-right: none; border-bottom: none; }
.env-top-right { top: 12px; right: 12px; border-left: none; border-bottom: none; }
.env-bottom-left { bottom: 12px; left: 12px; border-right: none; border-top: none; }
.env-bottom-right { bottom: 12px; right: 12px; border-left: none; border-top: none; }

/* Con dấu chữ Hỷ tròn ở giữa */
.envelope-seal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 75px;
    height: 75px;
    background-color: #f1c40f;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 38px;
    color: #b71c1c;
    font-weight: bold;
    box-shadow: inset 0 0 0 5px #b71c1c, inset 0 0 0 7px #f1c40f;
}

/* Đồng xu vàng lơ lửng xung quanh */
.coins {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    z-index: 1;
}
.coin {
    position: absolute;
    width: 35px;
    height: 35px;
    background-color: #f1c40f;
    border-radius: 50%;
    border: 2px solid #f39c12;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 15px rgba(0,0,0,0.15);
    animation: floatCoin 3s infinite ease-in-out alternate;
}
.coin::after {
    content: "■"; /* Lỗ vuông của đồng tiền cổ */
    font-size: 14px;
    color: #e67e22;
}
.c1 { top: -10%; left: -10px; animation-delay: 0s; width: 40px; height: 40px; }
.c2 { top: 15%; right: -25px; animation-delay: -1s; width: 30px; height: 30px; }
.c3 { bottom: 35%; right: -30px; animation-delay: -2s; width: 45px; height: 45px; }
.c4 { bottom: -5%; left: -20px; animation-delay: -1.5s; width: 35px; height: 35px; }
.c5 { top: -20px; right: 10%; animation-delay: -0.5s; width: 45px; height: 45px; }

@keyframes floatCoin {
    from { transform: translateY(0) rotate(0deg); }
    to { transform: translateY(-15px) rotate(20deg); }
}

.envelope-hint {
    font-size: 18px;
    color: #888;
    margin-top: -15px;
    margin-bottom: 70px;
}

/* Lời cảm ơn */
.thanks-text {
    margin-bottom: 70px;
}

.thanks-title {
    font-family: 'DynaPuff', cursive;
    font-size: 50px;
    color: #e05e5e; /* Màu đỏ coral nhẹ nhàng */
    margin-bottom: 25px;
    transform: rotate(-3deg);
}

.thanks-text p {
    font-size: 20px;
    color: #000;
    line-height: 1.6;
}

.footer-names {
    font-family: var(--font-heading);
    font-size: 32px;
    color: #ce272c;
    border-top: 2px solid rgba(206, 39, 44, 0.2);
    padding-top: 40px;
    margin-top: 40px;
    display: inline-block;
    padding-left: 50px;
    padding-right: 50px;
    letter-spacing: 1px;
}

/* ------------------------------------- */
/* QR CODE MODAL */
/* ------------------------------------- */
.qr-container {
    background: #fffafb;
    padding: 40px 20px;
    border-radius: 20px;
    width: 90%;
    max-width: 650px;
    text-align: center;
    position: relative;
    border: 3px solid #f9e1e1;
    box-shadow: 0 15px 40px rgba(0,0,0,0.5);
    z-index: 10000;
}

.qr-title {
    font-family: var(--font-heading);
    color: #ce272c;
    font-size: 32px;
    margin-bottom: 30px;
    text-transform: uppercase;
}

.qr-cards {
    display: flex;
    justify-content: space-around;
    gap: 20px;
    flex-wrap: wrap;
}

.qr-card {
    flex: 1;
    min-width: 240px;
    background: #fff;
    padding: 25px 15px;
    border-radius: 15px;
    border: 2px dashed #ce272c;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.qr-card h4 {
    font-family: var(--font-heading);
    font-size: 22px;
    color: #333;
    margin-bottom: 20px;
}

.qr-card img {
    width: 160px;
    height: 160px;
    margin-bottom: 15px;
    border-radius: 10px;
    border: 1px solid #f1f1f1;
}

.qr-card p {
    margin: 5px 0;
    font-size: 16px;
    color: #555;
    font-weight: 500;
}

.qr-close {
    position: absolute;
    top: 25px;
    right: 35px;
    color: rgba(255,255,255,0.7);
    font-size: 50px;
    font-weight: 300;
    cursor: pointer;
    z-index: 10001;
    line-height: 1;
    transition: color 0.2s;
}

.qr-close:hover {
    color: #ce272c;
}

/* ------------------------------------- */
/* MUSIC CONTROL */
/* ------------------------------------- */
.music-control {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: #ce272c;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 24px;
    box-shadow: 0 4px 15px rgba(206, 39, 44, 0.5);
    cursor: pointer;
    z-index: 9999;
    transition: transform 0.2s, background-color 0.3s;
}

.music-control.hidden {
    display: none;
}

.music-icon {
    display: inline-block;
}

.spinning {
    animation: spinMusic 3s linear infinite;
}

.paused {
    animation-play-state: paused;
    opacity: 0.6;
}

@keyframes spinMusic {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

@media (max-width: 500px) {
    .music-control {
        bottom: 20px;
        right: 20px;
        width: 45px;
        height: 45px;
        font-size: 20px;
    }
}

/* ===================================== */
/* RESPONSIVE TỐI ƯU CHO MÀN HÌNH NHỎ */
/* ===================================== */
@media (max-width: 480px) {
    .section-title {
        font-size: 35px;
        margin-bottom: 40px;
    }
    .couple-names-full .full-name {
        font-size: 42px; /* Thu nhỏ tên cho điện thoại hẹp */
    }
    .event-time {
        font-size: 48px;
    }
    .event-date {
        font-size: 18px;
        gap: 10px;
    }
    .event-date .date-day {
        font-size: 60px;
    }
    .event-date .date-sep {
        font-size: 28px;
    }
    .love-decor {
        font-size: 50px;
    }
    .thanks-title {
        font-size: 40px;
    }
    .footer-names {
        font-size: 24px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .splash-card {
        padding: 30px 20px;
    }
    .couple-name {
        font-size: 28px;
    }
    .hero-title {
        font-size: 32px;
    }
}
"""
    
    full_css = base_css + "\n" + additions
    with open(r"d:\thiep cuoi 04\style.css", "w", encoding="utf-8") as out_f:
        out_f.write(full_css)
        print("Success")
else:
    print("Could not find style.css block in log.")
