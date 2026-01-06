import React, { useEffect, useRef, useState } from "react";

const Wheeler = ({ min, max, value, size = 80, onChange }) => {
  const wheelRef = useRef(null);
  const draggingRef = useRef(false);

  // Convert value <-> angle
  const valueToAngle = (v) => ((v - min) / (max - min)) * 360;

  const angleToValue = (a) => min + (a / 360) * (max - min);

  const [angle, setAngle] = useState(valueToAngle(value));

  // Sync wheel when input changes
  useEffect(() => {
    setAngle(valueToAngle(value))
  }, [value])

  // Mouse drag
  useEffect(() => {
    const handleMove = (e) => {
      if (!draggingRef.current || !wheelRef.current) return;

      const rect = wheelRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const rad = Math.atan2(e.clientY - cy, e.clientX - cx);
      const deg = (rad * 180) / Math.PI;
      const normalized = (deg + 360) % 360;

      setAngle(normalized);
      onChange(Math.round(angleToValue(normalized)));
    };

    const stop = () => (draggingRef.current = false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", stop);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", stop);
    };
  }, [min, max, onChange]);

  // Scroll wheel support
  // const handleWheel = (e) => {
  //   e.preventDefault()

  //   setAngle((prev) => {
  //     const next = (prev - e.deltaY * 0.2 + 360) % 360
  //     onChange(angleToValue(next))
  //     return next
  //   })
  // }

  return (
    <div
    ref={wheelRef}
      className="relative flex items-center justify-center rounded-full select-none"
      style={{ width: size, height: size }}
    >
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full bg-[#757579] shadow-inner" />

      {/* Inner face */}
      <div className="absolute inset-2.5 rounded-full bg-[#444447]" />

      {/* Tick marks */} 
      {/* <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-0 h-2.5 w-0.5 bg-[#444447]"
            style={{
              transform: `rotate(${i * 45}deg) translateX(-50%)`,
              transformOrigin: "center 40px",
            }}
          />
        ))}
      </div> */}

      {/* Needle */}
        <div
          
          onMouseDown={() => (draggingRef.current = true)}
          className="absolute left-[48%] top-1/2 h-[35%] w-1 cursor-pointer bg-gray-500 transition-transform duration-75"
          style={{
            transform: `rotate(${angle - 180}deg)`,
            transformOrigin: "center top",
          }}
        />

        {/* <div className="w-2.5 h-2.5 rounded-full absolute left-[44%] top-1 bg-[#302c2c]"></div>
       */}

      {/* Center pivot */}
      <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-500" />

      {/* <span className="text-lg font-semibold">
        {Math.round(value)}
      </span> */}
    </div>
  );
};
export default Wheeler;
