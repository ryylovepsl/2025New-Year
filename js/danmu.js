// 弹幕功能
(function() {
  // 创建弹幕容器
  function createDanmuContainer() {
    const container = document.createElement('div');
    container.id = 'danmu-container';
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      overflow: hidden;
      z-index: 9999;
    `;
    document.body.appendChild(container);
    return container;
  }

  // 创建输入区域
  function createDanmuInput() {
    const inputContainer = document.createElement('div');
    inputContainer.className = 'danmu-input';
    inputContainer.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10000;
      text-align: center;
    `;

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'name-input';
    input.placeholder = '请输入你的名字';
    input.style.cssText = `
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #ccc;
      margin-right: 10px;
      width: 200px;
    `;

    const button = document.createElement('button');
    button.textContent = '发送弹幕';
    button.className = 'danmu-button';
    button.style.cssText = `
      padding: 8px 15px;
      border-radius: 4px;
      border: none;
      background: #4CAF50;
      color: white;
      cursor: pointer;
    `;

    button.addEventListener('click', sendDanmu);
    
    inputContainer.appendChild(input);
    inputContainer.appendChild(button);
    document.body.appendChild(inputContainer);

    return { input, button };
  }

  // 发送弹幕
  function sendDanmu() {
    const input = document.getElementById('name-input');
    const text = input.value.trim();
    if (!text) return;

    const container = document.getElementById('danmu-container') || createDanmuContainer();
    const danmu = document.createElement('div');
    
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FDCB6E', '#6C5CE7'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    danmu.textContent = text;
    danmu.style.cssText = `
      position: absolute;
      white-space: nowrap;
      color: ${randomColor};
      font-size: 24px;
      font-weight: bold;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
      transform: translateX(100vw);
      top: ${Math.random() * 70}%;
      animation: danmu 8s linear;
    `;

    container.appendChild(danmu);
    input.value = '';

    // 动画结束后删除弹幕
    danmu.addEventListener('animationend', () => {
      container.removeChild(danmu);
    });
  }

  // 添加全局样式
  const style = document.createElement('style');
  style.textContent = `
    @keyframes danmu {
      from { transform: translateX(100vw); }
      to { transform: translateX(-100%); }
    }
    #name-input:focus {
      outline: 2px solid #4CAF50;
      box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
    }
    .danmu-button:hover {
      background: #45a049 !important;
    }
  `;
  document.head.appendChild(style);

  // 页面加载时创建输入区域和容器
  window.addEventListener('load', () => {
    createDanmuContainer();
    createDanmuInput();
  });

  // 全局暴露发送弹幕的方法
  window.sendDanmu = sendDanmu;
}());
<script src="js/fireworks.js"></script>
<script src="js/danmu.js"></script>