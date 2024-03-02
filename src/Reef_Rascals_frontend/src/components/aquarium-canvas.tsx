import React, { useEffect, useRef } from 'react';
import { Rascal } from '../types/rascal';

interface AquariumCanvasProps {
  rascals: Rascal[];
}

const AquariumCanvas: React.FC<AquariumCanvasProps> = ({ rascals }: AquariumCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rascalSize = window.innerWidth * 0.06;
  let positions: { x: number; y: number; dx: number; dy: number; flip: boolean; rotation: number; changeDirectionTime: number }[] = [];

  useEffect(() => {
    positions = rascals.map(() => ({
      x: Math.random() * (window.innerWidth - rascalSize * 2) + rascalSize,
      y: Math.random() * (window.innerHeight - rascalSize * 2) + rascalSize,
      dx: Math.random() * 1 + 0.5,
      dy: Math.random() * 1 + 0.5,
      flip: false,
      rotation: Math.random() * Math.PI * 2,
      changeDirectionTime: Math.random() * 5000 + 5000,
    }));
  }, [rascals, rascalSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context || rascals.length === 0) {
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      rascals.forEach((rascal, index) => {
        const { x, y, dx, dy, flip, rotation } = positions[index];

        const rascalImg = new Image();
        rascalImg.src = rascal.imageUrl;

        context.save();
        context.translate(x, y);
        if (flip) {
          context.scale(-1, 1);
        }
        context.drawImage(rascalImg, -rascalSize, -rascalSize, rascalSize * 2, rascalSize * 2);
        context.restore();

        positions[index] = {
          x: x + dx,
          y: y + dy,
          dx,
          dy,
          flip,
          rotation,
          changeDirectionTime: positions[index].changeDirectionTime,
        };

        if (x + dx > canvas.width - rascalSize || x + dx < rascalSize) {
          positions[index].dx = -dx;
          positions[index].flip = !positions[index].flip;
        }
        if (y + dy > canvas.height - rascalSize || y + dy < rascalSize) {
          positions[index].dy = -dy;
        }
      });

      window.requestAnimationFrame(animate);
    };

    animate();

    const directionChangeIntervals: NodeJS.Timeout[] = [];
    rascals.forEach((_, index) => {
      const interval = setInterval(() => {
        const randomDirection = Math.random();
        const rotationChange = (Math.random() - 0.5) * Math.PI / 4;
        if (randomDirection < 0.5) {
          positions[index].dx = -positions[index].dx;
          positions[index].flip = !positions[index].flip;
        } else {
          positions[index].dy = -positions[index].dy;
        }
        positions[index].rotation += rotationChange;
      }, Math.random() * 5000 + 5000);
      directionChangeIntervals.push(interval);
    });

    return () => {
      directionChangeIntervals.forEach(interval => clearInterval(interval));
    };
  }, [rascals, positions, rascalSize]);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0 }} />;
};

export default AquariumCanvas;
