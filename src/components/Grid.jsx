import { useState } from 'react';
import Card from './Card.jsx';
import "./Grid.css"

const Grid = () => {
  const [cardsData, setCardsData] = useState([
    { id: 1, title: 'Card 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mattis finibus mauris id tempus.' },
    { id: 2, title: 'Card 2', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mattis finibus mauris id tempus.' },
    { id: 3, title: 'Card 3', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mattis finibus mauris id tempus.' },
    { id: 4, title: 'Card 4', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mattis finibus mauris id tempus.' },
    { id: 5, title: 'Card 5', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mattis finibus mauris id tempus.' },
    { id: 6, title: 'Card 6', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mattis finibus mauris id tempus.' },
    { id: 7, title: 'Card 7', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mattis finibus mauris id tempus.' },
  ]);

  const [hoveredCards, setHoveredCards] = useState([]);
  const [currentHoveredCards, setCurrentHoveredCards] = useState(null);

  console.log(currentHoveredCards)

  const handleDrop = e => {
    e.preventDefault();
    setCurrentHoveredCards(null)
    e.dataTransfer.getData('cardId');
  }

  const handleCardHover = (cardId, isHovering) => {
    if (isHovering) {
      setHoveredCards(prevState => [...prevState, cardId]);
      setCurrentHoveredCards(cardId)
    } else {
      setHoveredCards(prevState => prevState.filter(id => id !== cardId));
    }
  }

  const handleDragOver = e => {
    e.preventDefault();
  }

  return (
    <div className="grid" onDrop={handleDrop} onDragOver={handleDragOver} data-dropzone="grid">
      {cardsData.map(card => (
        <Card 
          key={card.id} 
          id={card.id}
          title={card.title} 
          content={card.content}
          onHover={handleCardHover}
          isHovered={hoveredCards.includes(card.id)}
          currentHoveredCards={currentHoveredCards}
          setCurrentHoveredCards={setCurrentHoveredCards}
        />
      ))}
    </div>
  );
};

export default Grid;
