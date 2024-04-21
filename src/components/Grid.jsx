import { useState } from 'react';
import Card from './Card.jsx';
import "./Grid.css"
import { useEffect } from 'react';

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
  const [newData, setNewData] = useState([...cardsData])
  const [selectedCard, setSelectedCard] = useState(null)
  const [selectedCardData, setSelectedCardData] = useState(null);

  const [hoveredCards, setHoveredCards] = useState([]);
  const [currentHoveredCards, setCurrentHoveredCards] = useState(null);

  const arrange = (selectedCard, hoveredCard) => {
    console.log(selectedCard)
    let data = newData.filter(card => card.id === selectedCard);

    let ans = newData.filter(card => card.id !== selectedCard);
    let index = newData.findIndex(card => card.id === hoveredCard);
    
    if (index !== -1 && data.length) {
      ans.splice(index, 0, ...data);
      setNewData(ans)
    }
  }

  useEffect(() => {
    arrange(selectedCard, currentHoveredCards)
  }, [selectedCard, currentHoveredCards])

  console.log(newData)

  const handleDrop = e => {
    e.preventDefault();
    setCurrentHoveredCards(null)
    e.dataTransfer.getData('cardId');

    // setSelectedCardData(null);
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
      {newData.map(card => (
        <Card 
          key={card.id} 
          id={card.id}
          title={card.title} 
          content={card.content}
          onHover={handleCardHover}
          isHovered={hoveredCards.includes(card.id)}
          currentHoveredCards={currentHoveredCards}
          setCurrentHoveredCards={setCurrentHoveredCards}
          setSelectedCard={setSelectedCard}
        />
      ))}
    </div>
  );
};

export default Grid;
