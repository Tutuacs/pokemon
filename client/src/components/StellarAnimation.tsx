// StellarAnimation.js
"use client";

import React, { useEffect, useRef } from "react";
import "./stellar.css";

const StellarAnimation = ({ children }: { children: React.ReactNode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    const STAR_COLOR = "#fff";
    const INITIAL_STAR_SIZE = 20;
    let STAR_SIZE = 20;
    const TARGET_STAR_SIZE = 5;
    const STAR_MIN_SCALE = 0.2;
    const OVERFLOW_THRESHOLD = 50;
    const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;
    const SPEED_UP_DURATION = 5000; // Speed up duration in milliseconds
    const INITIAL_Z = 0.05;
    const TARGET_Z = 0.0005;

    let scale = 1,
      width: number,
      height: number;
    let stars: { x: number; y: number; z: number }[] = [];
    let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: INITIAL_Z };
    let startTime = Date.now(); // Record the start time

    const generate = () => {
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: 0,
          y: 0,
          z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
        });
        const STAR_SIZE = 10;
      }
    };

    const placeStar = (star: { x: number; y: number }) => {
      star.x = Math.random() * width;
      star.y = Math.random() * height;
    };

    const recycleStar = (star: { x: any; y: any; z: any }) => {
      let direction = "z";
      let vx = Math.abs(velocity.x),
        vy = Math.abs(velocity.y);

      if (vx > 1 || vy > 1) {
        let axis;

        if (vx > vy) {
          axis = Math.random() < vx / (vx + vy) ? "h" : "v";
        } else {
          axis = Math.random() < vy / (vx + vy) ? "v" : "h";
        }

        if (axis === "h") {
          direction = velocity.x > 0 ? "l" : "r";
        } else {
          direction = velocity.y > 0 ? "t" : "b";
        }
      }

      star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

      if (direction === "z") {
        star.z = 0.1;
        star.x = Math.random() * width;
        star.y = Math.random() * height;
      } else if (direction === "l") {
        star.x = -OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
      } else if (direction === "r") {
        star.x = width + OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
      } else if (direction === "t") {
        star.x = width * Math.random();
        star.y = -OVERFLOW_THRESHOLD;
      } else if (direction === "b") {
        star.x = width * Math.random();
        star.y = height + OVERFLOW_THRESHOLD;
      }
    };

    const resize = () => {
      scale = window.devicePixelRatio || 1;
      width = window.innerWidth * scale;
      height = window.innerHeight * scale;
      canvas!.width = width;
      canvas!.height = height;
      stars.forEach(placeStar);
    };

    const step = () => {
      context!.clearRect(0, 0, width, height);
      update();
      render();
      requestAnimationFrame(step);
    };

    const update = () => {
      const elapsedTime = Date.now() - startTime;

      // Gradually change velocity.z from INITIAL_Z to TARGET_Z over 3 seconds
      const transitionFactor = Math.min(elapsedTime / SPEED_UP_DURATION, 1);
      velocity.z = INITIAL_Z - (INITIAL_Z - TARGET_Z) * transitionFactor;
      // Gradually change velocity.z from INITIAL_Z to TARGET_Z over 3 seconds
      const transitionFactor2 = Math.min(elapsedTime / SPEED_UP_DURATION, 1);
      STAR_SIZE = INITIAL_STAR_SIZE - (INITIAL_STAR_SIZE - TARGET_STAR_SIZE) * transitionFactor2;

      const accelerationFactor = Math.min(elapsedTime / SPEED_UP_DURATION, 1);
      const speedMultiplier = 1 + 4 * accelerationFactor; // Speed up by up to 4 times

      velocity.tx *= 0.96;
      velocity.ty *= 0.96;
      velocity.x += (velocity.tx - velocity.x) * 0.8 * speedMultiplier;
      velocity.y += (velocity.ty - velocity.y) * 0.8 * speedMultiplier;

      stars.forEach((star) => {
        star.x += velocity.x * star.z;
        star.y += velocity.y * star.z;
        star.x += (star.x - width / 2) * velocity.z * star.z;
        star.y += (star.y - height / 2) * velocity.z * star.z;
        star.z += velocity.z;

        if (
          star.x < -OVERFLOW_THRESHOLD ||
          star.x > width + OVERFLOW_THRESHOLD ||
          star.y < -OVERFLOW_THRESHOLD ||
          star.y > height + OVERFLOW_THRESHOLD
        ) {
          recycleStar(star);
        }
      });
    };

    const render = () => {
      stars.forEach((star) => {
        context!.beginPath();
        context!.lineCap = "round";
        context!.lineWidth = STAR_SIZE * star.z * scale;
        context!.globalAlpha = 0.5 + 0.5 * Math.random();
        context!.strokeStyle = STAR_COLOR;
        context!.beginPath();
        context!.moveTo(star.x, star.y);

        let tailX = velocity.x * 2,
          tailY = velocity.y * 2;

        if (Math.abs(tailX) < 0.1) tailX = 0.5;
        if (Math.abs(tailY) < 0.1) tailY = 0.5;

        context!.lineTo(star.x + tailX, star.y + tailY);
        context!.stroke();
      });
    };

    generate();
    resize();
    step();

    window.onresize = resize;

    return () => {
      window.onresize = null;
      document.onmouseleave = null;
    };
  }, []);

  return (
    <div className="stellar-container">
      <canvas ref={canvasRef}></canvas>
      <div className="stellar-content">{children}</div>
    </div>
  );
};

export default StellarAnimation;
