import { useEffect } from 'react';

export default function useEmojiEffect(canvasRef, emoji) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    let emojiContainer = [];

    const init = () => {
      requestAnimationFrame(render);

      canvas.width = 320;
      canvas.height = 320;

      for (let i = 0; i < 20; i++) {
        emojiContainer.push(new Emoji());
      }
    };

    const Emoji = class {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.vel = {
          x: (Math.random() - 0.5) * 6,
          y: (Math.random() - 0.5) * 6,
        };
        this.targetScale = Math.random() * 0.8;
        this.scale = this.targetScale * Math.random() + 0.5;
      }

      update() {
        this.x += this.vel.x;
        this.y += this.vel.y;

        this.scale += (this.targetScale - this.scale) * 0.01;
        if (this.x - this.width > canvas.width || this.x + this.width < 0) {
          this.scale = 0;
          this.x = Math.random() * canvas.width;
        }
        if (this.y - this.height > canvas.height || this.y + this.height < 0) {
          this.scale = 0;
          this.y = Math.random() * canvas.height;
        }
        this.width = 480 * this.scale;
        this.height = 400 * this.scale;
      }

      draw() {
        context.globalAlpha = this.opacity;
        context.font = '50px Georgia';

        context.fillText(
          emoji,
          this.x - this.width * 0.5,
          this.y - this.height * 0.5,
        );
      }
    };

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 20; i++) {
        emojiContainer[i].update();
        emojiContainer[i].draw();
      }
      requestAnimationFrame(render);
    };

    init();
  }, [emoji]);
}
