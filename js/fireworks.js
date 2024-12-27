class Firework {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.colors = ['#00ff00', '#0099ff', '#ff0000', '#ffff00', '#ff00ff'];
    }

    createParticles(x, y) {
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount;
            const speed = 2 + Math.random() * 3;
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            });
        }
    }

    animate() {
        this.ctx.save();
        this.ctx.globalCompositeOperation = 'lighter';
        
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // gravity
            p.alpha *= 0.96;

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${this.hexToRgb(p.color)},${p.alpha})`;
            this.ctx.fill();

            if (p.alpha < 0.01) {
                this.particles.splice(i, 1);
            }
        }
        
        this.ctx.restore();
        if (this.particles.length > 0) {
            requestAnimationFrame(() => this.animate());
        }
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? 
            `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : 
            '255,255,255';
    }

    launch(x, y) {
        this.createParticles(x, y);
        this.animate();
    }
}

// 创建全局烟花实例
let fireworks;
window.addEventListener('load', () => {
    const canvas = document.querySelector('.canvas');
    fireworks = new Firework(canvas);
});
