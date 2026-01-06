import React, { useEffect, useRef, useState } from "react";

const Wheeler = ({
  min,
  max,
  value,
  size = 120,
  onChange,
}) => {
  const wheelRef = useRef(null)
  const draggingRef = useRef(false)

  // Convert value <-> angle
  const valueToAngle = (v) =>
    ((v - min) / (max - min)) * 360

  const angleToValue = (a) =>
    min + (a / 360) * (max - min)

  const [angle, setAngle] = useState(valueToAngle(value))

  // Sync wheel when input changes
  // useEffect(() => {
  //   setAngle(valueToAngle(value))
  // }, [value])

  // Mouse drag
  useEffect(() => {
    const handleMove = (e) => {
      if (!draggingRef.current || !wheelRef.current) return

      const rect = wheelRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2

      const rad = Math.atan2(e.clientY - cy, e.clientX - cx)
      const deg = (rad * 180) / Math.PI
      const normalized = (deg + 360) % 360

      setAngle(normalized)
      onChange(angleToValue(normalized))
    }

    const stop = () => (draggingRef.current = false)

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("mouseup", stop)

    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mouseup", stop)
    }
  }, [min, max, onChange])

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
      onMouseDown={() => (draggingRef.current = true)}
      
      className="relative flex items-center justify-center rounded-full border bg-muted select-none"
      style={{ width: size, height: size }}
    >
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full bg-[#2a2a2f] shadow-inner" />

      {/* Inner face */}
      <div className="absolute inset-3 rounded-full bg-[#3a3a40]" />

      {/* Tick marks */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-0 h-2.5 w-0.5 bg-muted-foreground"
            style={{
              transform: `rotate(${i * 45}deg) translateX(-50%)`,
              transformOrigin: "center 60px",
            }}
          />
        ))}
      </div>

      {/* Needle */}
      <div
        className="absolute left-1/2 top-1/2 h-1/2 w-0.5 bg-primary"
        style={{
          transform: `rotate(${angle}deg) translateY(-100%)`,
          transformOrigin: "bottom center",
        }}
      />

      {/* Center pivot */}
      <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />

      {/* <span className="text-lg font-semibold">
        {Math.round(value)}
      </span> */}
    </div>
  )
}
export default Wheeler;
