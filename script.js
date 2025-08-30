// 恋爱开始日期：2022年1月1日
const startDate = new Date('2022-01-01T00:00:00');

// 情侣信息
const coupleInfo = {
    male: {
        nickname: '大河马',
        birthday: { month: 7, day: 16 } // 7月16日
    },
    female: {
        nickname: '小水牛',
        birthday: { month: 8, day: 5 } // 8月5日
    }
};

// 里程碑数据
const milestones = [
    { days: 100, label: '百日纪念', icon: '🎉' },
    { days: 365, label: '一周年', icon: '🎂' },
    { days: 500, label: '五百天', icon: '🌟' },
    { days: 730, label: '两周年', icon: '💎' },
    { days: 1000, label: '千日纪念', icon: '🏆' },
    { days: 1095, label: '三周年', icon: '👑' },
    { days: 1500, label: '1500天', icon: '🎊' },
    { days: 1825, label: '五周年', icon: '💍' }
];

// 计算下一个特殊日期的倒计时
function calculateNextDate(month, day, label) {
    const now = new Date();
    const currentYear = now.getFullYear();
    let nextDate = new Date(currentYear, month - 1, day);
    
    // 如果今年的日期已经过了，计算明年的
    if (nextDate < now) {
        nextDate = new Date(currentYear + 1, month - 1, day);
    }
    
    const timeDiff = nextDate - now;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    return { days, date: nextDate, label };
}

// 计算七夕节（农历七月初七，大约公历8月中旬）
function calculateQixi() {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // 2025年七夕是8月10日，每年大约在8月10-20日之间
    // 这里使用近似计算，实际应用中可以使用农历转换库
    let qixiDate = new Date(currentYear, 7, 10); // 8月10日作为近似
    
    if (qixiDate < now) {
        qixiDate = new Date(currentYear + 1, 7, 10);
    }
    
    const timeDiff = qixiDate - now;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    return { days, date: qixiDate, label: '七夕节' };
}

// 更新计数器
function updateCounter() {
    const now = new Date();
    const timeDiff = now - startDate;
    
    // 计算天数、小时、分钟、秒（包含毫秒）
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const totalSeconds = (timeDiff % (1000 * 60)) / 1000;
    const seconds = totalSeconds.toFixed(3); // 保留3位小数显示毫秒
    
    // 直接更新DOM元素，不使用动画
    updateElementSmoothly('days', days.toLocaleString());
    updateElementSmoothly('hours', hours.toString().padStart(2, '0'));
    updateElementSmoothly('minutes', minutes.toString().padStart(2, '0'));
    updateElementSmoothly('seconds', seconds.padStart(6, '0')); // 确保格式为00.000
}

// 更新倒计时（降低频率）
let countdownUpdateCounter = 0;
function updateCountdownsIfNeeded() {
    // 每2秒更新一次倒计时（40次updateCounter调用）
    countdownUpdateCounter++;
    if (countdownUpdateCounter >= 40) {
        updateCountdowns();
        countdownUpdateCounter = 0;
    }
}

// 更新各种倒计时
function updateCountdowns() {
    const qixi = calculateQixi();
    const valentine = calculateNextDate(2, 14, '情人节');
    const maleBirthday = calculateNextDate(coupleInfo.male.birthday.month, coupleInfo.male.birthday.day, `${coupleInfo.male.nickname}生日`);
    const femaleBirthday = calculateNextDate(coupleInfo.female.birthday.month, coupleInfo.female.birthday.day, `${coupleInfo.female.nickname}生日`);
    
    // 更新倒计时显示
    updateCountdownElement('qixi-countdown', qixi);
    updateCountdownElement('valentine-countdown', valentine);
    updateCountdownElement('male-birthday-countdown', maleBirthday);
    updateCountdownElement('female-birthday-countdown', femaleBirthday);
}

// 更新倒计时元素（无动画，平滑更新）
function updateCountdownElement(elementId, countdownData) {
    const daysElement = document.getElementById(elementId + '-days');
    if (daysElement) {
        daysElement.textContent = countdownData.days;
    }
}

// 平滑更新元素（无动画）
function updateElementSmoothly(elementId, newValue) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = newValue;
    }
}

// 带动画的元素更新（仅用于特殊场合）
function updateElementWithAnimation(elementId, newValue) {
    const element = document.getElementById(elementId);
    if (element && element.textContent !== newValue.toString()) {
        element.style.transform = 'scale(1.1)';
        element.textContent = newValue.toLocaleString();
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }
}

// 生成里程碑
function generateMilestones() {
    const now = new Date();
    const currentDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    const milestonesContainer = document.getElementById('milestones');
    
    milestones.forEach(milestone => {
        const milestoneElement = document.createElement('div');
        milestoneElement.className = 'milestone-item';
        
        if (currentDays >= milestone.days) {
            // 已达成的里程碑
            milestoneElement.innerHTML = `
                <div class="milestone-days">${milestone.icon} ${milestone.days}</div>
                <div class="milestone-label">${milestone.label} ✓</div>
            `;
            milestoneElement.style.background = 'linear-gradient(135deg, #00b894, #00cec9)';
            milestoneElement.style.color = 'white';
        } else {
            // 未达成的里程碑
            const remainingDays = milestone.days - currentDays;
            milestoneElement.innerHTML = `
                <div class="milestone-days">${milestone.icon} ${milestone.days}</div>
                <div class="milestone-label">${milestone.label}</div>
                <div style="font-size: 0.8rem; margin-top: 5px; opacity: 0.7;">
                    还有 ${remainingDays} 天
                </div>
            `;
        }
        
        milestonesContainer.appendChild(milestoneElement);
    });
}

// 创建浮动爱心动画
function createFloatingHearts() {
    const hearts = document.querySelectorAll('.floating-heart');
    
    hearts.forEach((heart, index) => {
        // 随机设置初始位置和动画延迟
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 6 + 's';
        heart.style.animationDuration = (4 + Math.random() * 4) + 's';
    });
}

// 添加特殊日期提醒
function checkSpecialDates() {
    const now = new Date();
    const currentDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    
    // 检查是否是特殊里程碑
    const todayMilestone = milestones.find(m => m.days === currentDays);
    if (todayMilestone) {
        showCelebration(todayMilestone);
    }
    
    // 检查是否是每月纪念日（1号）
    if (now.getDate() === 1) {
        showMonthlyReminder();
    }
}

// 显示庆祝动画
function showCelebration(milestone) {
    const celebration = document.createElement('div');
    celebration.className = 'celebration';
    celebration.innerHTML = `
        <div class="celebration-content">
            <h2>🎉 恭喜达成 ${milestone.label}！${milestone.icon}</h2>
            <p>今天是我们在一起的第 ${milestone.days} 天！</p>
        </div>
    `;
    
    celebration.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.5s ease-out;
    `;
    
    const content = celebration.querySelector('.celebration-content');
    content.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        animation: bounceIn 0.8s ease-out;
    `;
    
    document.body.appendChild(celebration);
    
    // 3秒后自动关闭
    setTimeout(() => {
        celebration.style.animation = 'fadeOut 0.5s ease-out forwards';
        setTimeout(() => {
            document.body.removeChild(celebration);
        }, 500);
    }, 3000);
    
    // 点击关闭
    celebration.addEventListener('click', () => {
        celebration.style.animation = 'fadeOut 0.5s ease-out forwards';
        setTimeout(() => {
            document.body.removeChild(celebration);
        }, 500);
    });
}

// 显示月度提醒
function showMonthlyReminder() {
    console.log('今天是我们的月度纪念日！💕');
}

// 格式化数字显示
function formatNumber(num) {
    return num.toLocaleString();
}

// 添加页面加载动画
function addLoadingAnimation() {
    const elements = document.querySelectorAll('.counter-item, .milestone-item');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}

// 添加鼠标悬停效果
function addHoverEffects() {
    const counterItems = document.querySelectorAll('.counter-item');
    
    counterItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// 添加键盘快捷键
function addKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // 按 'L' 键显示爱情宣言
        if (e.key.toLowerCase() === 'l') {
            showLoveMessage();
        }
        
        // 按 'H' 键显示帮助
        if (e.key.toLowerCase() === 'h') {
            showHelp();
        }
    });
}

// 显示爱情宣言
function showLoveMessage() {
    const messages = [
        '每一天都因为有你而变得特别 💕',
        '时间见证了我们的爱情 💖',
        '和你在一起的每一秒都是珍贵的 💗',
        '愿我们的爱情天长地久 💝',
        '你是我生命中最美好的遇见 💘'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // 创建临时消息显示
    const messageDiv = document.createElement('div');
    messageDiv.textContent = randomMessage;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 107, 157, 0.9);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-weight: 600;
        z-index: 1000;
        animation: slideDown 0.5s ease-out, fadeOut 0.5s ease-out 2s forwards;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        if (document.body.contains(messageDiv)) {
            document.body.removeChild(messageDiv);
        }
    }, 2500);
}

// 显示帮助信息
function showHelp() {
    const helpDiv = document.createElement('div');
    helpDiv.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 15px; max-width: 300px;">
            <h3 style="margin-bottom: 15px; color: #4a5568;">快捷键帮助</h3>
            <p style="margin-bottom: 10px;"><strong>L</strong> - 显示爱情宣言</p>
            <p style="margin-bottom: 10px;"><strong>H</strong> - 显示此帮助</p>
            <p style="font-size: 0.9rem; color: #666;">点击任意位置关闭</p>
        </div>
    `;
    
    helpDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease-out;
    `;
    
    document.body.appendChild(helpDiv);
    
    helpDiv.addEventListener('click', () => {
        document.body.removeChild(helpDiv);
    });
}

// 初始化函数
function init() {
    // 更新计数器
    updateCounter();
    
    // 生成里程碑
    generateMilestones();
    
    // 创建浮动爱心
    createFloatingHearts();
    
    // 检查特殊日期
    checkSpecialDates();
    
    // 添加加载动画
    addLoadingAnimation();
    
    // 添加悬停效果
    addHoverEffects();
    
    // 添加键盘快捷键
    addKeyboardShortcuts();
    
    // 每50毫秒更新一次，让毫秒变化更流畅
    setInterval(() => {
        updateCounter();
        updateCountdownsIfNeeded();
    }, 50);
    
    // 初始化时立即更新一次倒计时
    updateCountdowns();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);

// 添加页面可见性API，当页面重新获得焦点时更新
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        updateCounter();
    }
});

// 错误处理
window.addEventListener('error', (e) => {
    console.error('页面发生错误:', e.error);
});

// 添加CSS动画样式（通过JavaScript动态添加）
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                transform: translateX(-50%) translateY(-100%);
                opacity: 0;
            }
            to {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
        }
        
        @keyframes bounceIn {
            0% {
                transform: scale(0.3);
                opacity: 0;
            }
            50% {
                transform: scale(1.05);
            }
            70% {
                transform: scale(0.9);
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// 页面加载时添加动态样式
addDynamicStyles();