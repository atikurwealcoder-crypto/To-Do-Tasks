import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

const Wheeler = ({
  min = 0,
  max = 0,
  value = 0,
  size = 70,
  onChange = () => {},
}) => {
  const wheelRef = useRef(null);
  const isPointerDownRef = useRef(false);

  // Convert value <-> angle (0..360)
  const valueToAngle = useCallback(
    (v) => ((clamp(v, min, max) - min) / (max - min)) * 360,
    [min, max]
  );

  const angleToValue = useCallback(
    (a) => min + (a / 360) * (max - min),
    [min, max]
  );

  const [angle, setAngle] = useState(() => valueToAngle(value));

  // Keep wheel in sync when parent value changes
  useEffect(() => {
    setAngle(valueToAngle(value));
  }, [value, valueToAngle]);

  // Core: pointer position -> angle -> value
  const updateFromPointer = useCallback(
    (clientX, clientY) => {
      const el = wheelRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const rad = Math.atan2(clientY - cy, clientX - cx);
      const deg = (rad * 180) / Math.PI;

      // Normalize to 0..360
      const normalized = (deg + 360) % 360;

      setAngle(normalized);

      const nextValue = angleToValue(normalized);
      onChange(Math.round(nextValue));
    },
    [angleToValue, onChange]
  );

  const onPointerDown = useCallback(
    (e) => {
      // capture pointer so we keep receiving move events even if pointer leaves the wheel
      e.preventDefault();
      isPointerDownRef.current = true;
      wheelRef.current?.setPointerCapture?.(e.pointerId);

      // IMPORTANT: update immediately on click
      updateFromPointer(e.clientX, e.clientY);
    },
    [updateFromPointer]
  );

  const onPointerMove = useCallback(
    (e) => {
      if (!isPointerDownRef.current) return;
      e.preventDefault();
      updateFromPointer(e.clientX, e.clientY);
    },
    [updateFromPointer]
  );

  const onPointerUp = useCallback((e) => {
    e.preventDefault();
    isPointerDownRef.current = false;
    wheelRef.current?.releasePointerCapture?.(e.pointerId);
  }, []);

  return (
    <div
      ref={wheelRef}
      className="relative flex items-center justify-center rounded-full select-none"
      style={{
        width: size,
        height: size,
        touchAction: "none",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full bg-[#757579] shadow-inner" />

      {/* Inner face */}
      <div className="absolute inset-2.5 rounded-full bg-[#444447]" />

      {/* Needle */}
      <div
        className="absolute left-1/2 top-1/2 h-[32%] w-1 bg-gray-500 cursor-pointer"
        style={{
          transform: `translate(-50%, 0) rotate(${angle - 90}deg)`,
          transformOrigin: "center 0%",
        }}
      />

      {/* Center pivot */}
      <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-500" />
    </div>
  );
};

export default Wheeler;
