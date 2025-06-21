import React, { useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";

// Create 83 small ticks (similar to 1/10 inch on an 8.5 inch paper)
const markers = Array.from({ length: 83 }, (_, i) => i);

export const Ruler = () => {
  const pageWidth = 816; // standard width in px (e.g. A4 width)
  const min_space = 100; // minimum space between left and right
  const snapTo = 10; // snap interval in pixels

  const [leftMargin, setLeftMargin] = useState(56);
  const [rightMargin, setRightMargin] = useState(56);
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  const rulerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (rulerRef.current) {
      const container = rulerRef.current.querySelector("#ruler-container");
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const relativeX = e.clientX - containerRect.left;

        const snappedX = Math.round(relativeX / snapTo) * snapTo;

        if (isDraggingLeft) {
          const maxLeft = pageWidth - rightMargin - min_space;
          const newLeft = Math.min(snappedX, maxLeft);
          setLeftMargin(newLeft);
        }

        if (isDraggingRight) {
          const rawRight = pageWidth - snappedX;
          const snappedRight = Math.round(rawRight / snapTo) * snapTo;
          const maxRight = pageWidth - leftMargin - min_space;
          const constrainedRight = Math.min(snappedRight, maxRight);
          setRightMargin(constrainedRight);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };

  const handleLeftDoubleClick = () => setLeftMargin(56);
  const handleRightDoubleClick = () => setRightMargin(56);

  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="h-6 border-b border-gray-300 flex items-end relative select-none print:hidden"
    >
      <div
        id="ruler-container"
        className="max-w-[816px] mx-auto w-full h-full relative"
      >
        <Marker
          position={leftMargin}
          isLeft={true}
          isDragging={isDraggingLeft}
          onMouseDown={() => setIsDraggingLeft(true)}
          onDoubleClick={handleLeftDoubleClick}
        />
        <Marker
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={() => setIsDraggingRight(true)}
          onDoubleClick={handleRightDoubleClick}
        />

        {/* Ticks and Labels */}
        <div className="absolute inset-x-0 bottom-0 h-full">
          <div className="relative w-[816px] h-full">
            {markers.map((marker) => {
              const position = (marker * pageWidth) / 82;
              return (
                <div
                  key={marker}
                  className="absolute bottom-0"
                  style={{ left: `${position}px` }}
                >
                  {marker % 10 === 0 ? (
                    <>
                      <div className="absolute bottom-0 w-[1px] h-2 bg-neutral-500" />
                      <span className="absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2">
                        {marker / 10 + 1}
                      </span>
                    </>
                  ) : marker % 5 === 0 ? (
                    <div className="absolute bottom-0 w-[1px] h-1.5 bg-neutral-500" />
                  ) : (
                    <div className="absolute bottom-0 w-[1px] h-1 bg-neutral-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

const Marker = ({
  position,
  isLeft,
  isDragging,
  onMouseDown,
  onDoubleClick,
}: MarkerProps) => {
  return (
    <div
      style={{
        [isLeft ? "left" : "right"]: `${position}px`,
        transition: "left 0.1s ease, right 0.1s ease",
      }}
      className="absolute top-0 z-[5] h-full"
    >
      <div
        onMouseDown={onMouseDown}
        onDoubleClick={onDoubleClick}
        className="h-full w-4 -ml-2 cursor-ew-resize relative group"
      >
        <FaCaretDown className="absolute left-1/2 top-0 h-full fill-blue-500 transform -translate-x-1/2 pointer-events-none" />
        {isDragging && (
          <div
            className="absolute left-1/2 top-4 transform -translate-x-1/2"
            style={{
              height: "100vh",
              width: "1px",
              transform: "scaleX(0.5)",
              backgroundColor: "#3b72f6",
            }}
          />
        )}
      </div>
    </div>
  );
};
