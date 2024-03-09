import { BattleHistory } from "../types/battle-history";
import { Rascal } from "../types/rascal";
import { User } from "../types/user";
import { HealthBarProps } from "./game_class";

export const getRandomBoolean = () => Math.random() < 0.5;

export function drawHealthBar(context: CanvasRenderingContext2D, healthBarProps: HealthBarProps) {
    const {x, y, width, height, maxHealth, currentHealth} = healthBarProps;
    
    context.save();
    context.fillStyle = 'gray';
    context.fillRect(x, y, width, height);
    context.restore();
    
    context.save();
    context.fillStyle = 'green';
    const healthWidth = ((currentHealth / maxHealth) * width) > 0 ? ((currentHealth / maxHealth) * width) : 0;
    context.fillRect(x, y, healthWidth, height);
    context.restore();
}

export function drawRascal(context: CanvasRenderingContext2D, rascal: Rascal, x: number, y: number, size: number, isFlipped: boolean, isBeingAttacked: boolean) {
    const rascalImg = new Image();
    rascalImg.src = rascal.imageUrl;

    if (!isFlipped) {
        context.save();
        context.drawImage(rascalImg, x, y, size, size);
        context.restore();
    } else {
        context.save();
        context.scale(-1, 1);
        context.drawImage(rascalImg, -x - size, y, size, size);
        context.restore();
    }

    if(isBeingAttacked) {
        context.save();
        context.fillStyle = 'red';
        context.fillRect(x, y - 10, size, 5);
        context.restore();
    }
}

export function drawDamageText(context: CanvasRenderingContext2D, text: string, x: number, y: number) {
    context.save();
    context.fillStyle = 'red';
    context.font = '100px VT323';
    context.strokeStyle = 'white';
    context.lineWidth = 10;
    context.strokeText('-' + text, x, y);
    context.fillText('-' + text, x, y);
    context.restore();
}

export function drawBoom(context: CanvasRenderingContext2D, x: number, y: number, size: number) {
    const boomImg = new Image();
    boomImg.src = "/boom.png";

    context.save();
    context.drawImage(boomImg, x, y, size, size);
    context.restore();
}

export function drawRascalWithHealthBar(
    context: CanvasRenderingContext2D,
    rascal: Rascal,
    x: number,
    y: number,
    size: number,
    isFlipped: boolean,
    isBeingAttacked: boolean,
    healthBarProps: HealthBarProps,
) {
    drawRascal(context, rascal, x, y, size, isFlipped, isBeingAttacked);
    drawHealthBar(context, healthBarProps);
}
