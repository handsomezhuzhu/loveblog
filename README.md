# 我们的爱情时光 ❤️

一个记录恋爱天数的美观网站，用于纪念我们在一起的每一天。

## 🌟 功能特色

- ⏰ **实时计数器** - 精确显示恋爱天数、小时、分钟、秒
- 🎯 **里程碑追踪** - 自动标记重要的恋爱里程碑（百日、周年等）
- 💫 **美观界面** - 渐变背景、浮动爱心、动画效果
- 📱 **响应式设计** - 完美适配手机、平板、电脑
- 🎉 **特殊提醒** - 达成里程碑时的庆祝动画
- ⌨️ **快捷键支持** - 按 'L' 显示爱情宣言，按 'H' 显示帮助

## 🚀 快速开始

### 本地运行

1. 克隆仓库：
```bash
git clone https://github.com/你的用户名/你的仓库名.git
cd 你的仓库名
```

2. 直接在浏览器中打开 `index.html` 文件即可查看网站

### 自定义恋爱开始日期

在 `script.js` 文件中修改第2行的日期：

```javascript
const startDate = new Date('2022-01-01T00:00:00'); // 修改为你们的恋爱开始日期
```

## 📦 部署到GitHub Pages

### 自动部署（推荐）

1. **启用GitHub Pages**：
   - 进入你的GitHub仓库
   - 点击 `Settings` 标签
   - 在左侧菜单中找到 `Pages`
   - 在 `Source` 部分选择 `GitHub Actions`

2. **推送代码**：
   ```bash
   git add .
   git commit -m "Initial commit: Love days counter website"
   git push origin main
   ```

3. **等待部署**：
   - GitHub Actions会自动构建和部署网站
   - 部署完成后，你的网站将在 `https://你的用户名.github.io/你的仓库名` 可访问

### 手动部署

如果你想手动部署，也可以：

1. 在GitHub仓库设置中，将Pages源设置为 `Deploy from a branch`
2. 选择 `main` 分支的 `/ (root)` 目录
3. 推送代码后，GitHub会自动部署静态文件

## 🎨 自定义样式

### 修改颜色主题

在 `styles.css` 中可以修改以下变量来改变主题色彩：

- 背景渐变：修改 `body` 的 `background` 属性
- 主色调：修改各个 `.counter-item` 和 `.milestone-item` 的 `background` 属性
- 爱心颜色：修改 `.hearts i` 和相关元素的 `color` 属性

### 添加新的里程碑

在 `script.js` 的 `milestones` 数组中添加新项目：

```javascript
const milestones = [
    // 现有里程碑...
    { days: 2000, label: '2000天纪念', icon: '🌈' },
    // 添加更多里程碑...
];
```

## 📱 技术栈

- **HTML5** - 网页结构
- **CSS3** - 样式和动画
- **Vanilla JavaScript** - 交互逻辑
- **Font Awesome** - 图标库
- **Google Fonts** - 字体
- **GitHub Actions** - 自动部署

## 🛠️ 项目结构

```
.
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # JavaScript逻辑
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions部署配置
└── README.md           # 项目说明
```

## 💡 使用提示

- 网站会自动每秒更新计数器
- 当达成重要里程碑时会显示庆祝动画
- 支持键盘快捷键操作
- 完全响应式，在任何设备上都能完美显示

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 📄 许可证

MIT License - 详见 LICENSE 文件

---

💕 **愿你们的爱情天长地久！** 💕