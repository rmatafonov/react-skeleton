import React, { CanvasHTMLAttributes, FC } from 'react';
import { useEffect, useRef } from 'react';
import { mathUtil } from '../../util';

type OwnProps = {} & CanvasHTMLAttributes<HTMLCanvasElement>;

type Props = FC<OwnProps>;

const drawShipSide = (
  ctx: CanvasRenderingContext2D,
  xMax: number,
  yMax: number
) => {
  const top = yMax * 0.1;
  const bottom = yMax * 0.85;
  const p1x = xMax * 0.4;
  const p1y = yMax * 0.3;
  const p2x = xMax * 0.7;
  const p2y = yMax * 0.8;

  ctx.beginPath();
  ctx.moveTo(0, top);
  ctx.bezierCurveTo(p1x, p1y, p2x, p2y, 0, bottom);
  ctx.stroke();

  const stayTop = mathUtil.getBezierPoint(
    0.75,
    { x: 0, y: top },
    { x: p1x, y: p1x },
    { x: p2x, y: p2y },
    { x: 0, y: bottom }
  );

  ctx.beginPath();
  ctx.moveTo(stayTop.x, stayTop.y);
  ctx.lineTo(xMax, yMax);
  ctx.stroke();

  const stayBottom = mathUtil.getBezierPoint(
    0.95,
    { x: 0, y: top },
    { x: p1x, y: p1x },
    { x: p2x, y: p2y },
    { x: 0, y: bottom }
  );

  ctx.beginPath();
  ctx.moveTo(stayBottom.x, stayBottom.y);
  ctx.lineTo(xMax, yMax);
  ctx.stroke();
};

const drawShipIlluminator = (
  ctx: CanvasRenderingContext2D,
  xMax: number,
  yMax: number
) => {
    ctx.beginPath();
  ctx.arc(0, yMax * 0.5, xMax * 0.15, 0, Math.PI * 2);
  ctx.closePath();
  ctx.stroke();
}

const CanvasComponent: Props = ({ width, height }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const ctx = ref.current.getContext('2d');
    if (!ctx) {
      return;
    }

    const xMax = width as number;
    const xMid = Math.floor(xMax / 2);

    ctx.lineWidth = 3;

    ctx.translate(xMid, 0);
    drawShipSide(ctx, xMid, height as number);
    ctx.scale(-1, 1);
    drawShipSide(ctx, xMid, height as number);
    drawShipIlluminator(ctx, xMid, height as number)
  }, []);

  return <canvas ref={ref} width={width} height={height} />;
};

export default CanvasComponent;
