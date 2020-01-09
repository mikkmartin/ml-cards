import React, { useContext, useState, useEffect } from "react";
import { motion, transform, useTransform } from "framer-motion";
import styled from "styled-components";
import { clamp } from "./utils";
import { Context } from "./ImageSlider";

export default function() {
  const { pos, setTemporarylyPaused } = useContext(Context);
  let startPos = 0;
  const options = { clamp: false };
  const from = [0, 1];
  const to = [0, 375];

  function onDrag(ev) {
    const _pos = ev.offsetX - startPos;
    const x = transform(_pos, to, from, options);
    const finalX = clamp(x, 0, 1);
    pos.set(finalX);
  }

  function onTapStart(ev) {
    startPos = transform(ev.offsetX, to, from, options);
    pos.set(startPos);
    setTemporarylyPaused(true);
  }

  return (
    <Slider
      drag="x"
      onTapStart={onTapStart}
      onTap={() => setTemporarylyPaused(false)}
      dragElastic={0}
      dragConstraints={{ left: 0, right: 0 }}
      onDrag={onDrag}
    >
      <svg width="100%" height="100%">
        <motion.rect
          width={useTransform(pos, v => v * 100 + "%")}
          opacity=".1"
          height="100%"
        />
        <motion.rect
          x={useTransform(pos, v => v * 100 + "%")}
          width="1"
          height="100%"
        />
        <Text pos={pos} />
      </svg>
    </Slider>
  );
}

function Text({ pos }) {
  const frameCount = 122;
  const [frame, setFrame] = useState(0);
  const epoch = Math.floor(transform(frame, [0, 1], [0, frameCount]));

  useEffect(() => {
    pos.onChange(v => setFrame(v));
  }, [pos]);

  return (
    <text
      y="32"
      fill="#FFF"
      fontFamily="SFMono-Regular, SF Mono"
      fontSize="16"
      letterSpacing="0.06"
    >
      <tspan x="23">{`epoch_${epoch.toString().padStart(4, "0")}.png`}</tspan>
      <tspan x="75%">{`${epoch}/${frameCount}`}</tspan>
    </text>
  );
}

const Slider = styled(motion.div)`
  width: 100%;
  height: 56px;
  svg {
    rect {
      fill: #fdc900;
    }
  }
`;
