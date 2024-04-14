import { useRef } from 'react';
import "./Card.css";
import { useState } from 'react';
import { useEffect } from 'react';

const Card = ({ id, title, content, onHover, isHovered, currentHoveredCards, setCurrentHoveredCards }) => {
  const cardRef = useRef(null);
  const [leftDelyTimer, setLeftDelayTimer] = useState(null);
  const [isDraggingOver, setIsDragging] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    return () => {
      clearTimeout(leftDelyTimer);
    };
  }, [leftDelyTimer]);
  
  const handleDragStart = (e) => {
    e.dataTransfer.setData('cardId', id);
    // console.log("Drag started for card ID:", id);
  };

  const handleDragEnter = () => {
    setIsDragging(true);
    onHover(id, true);
  };

  const handleDragLeave = () => {
    const timer = setTimeout(() => {
      if (!isDraggingOver) {
        onHover(id, false);
      }
    }, 200);
    setLeftDelayTimer(timer)
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseEnter = () => {
    if (cardRef.current) {
      cardRef.current.classList.add("hovered")
    }
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.classList.remove("hovered")
    }
  }

  return (
    <div 
      className={`card ${currentHoveredCards === id && isDraggingOver  ? "hovered" : ""}`} 
      draggable="true" 
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      ref={cardRef}
    >
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{content}</p>
      </div>
    </div>
  );
};

export default Card;
