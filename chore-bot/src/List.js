import React, { useState } from 'react';
import whooshSfx from './sounds/whoosh.flac';


const List = ({chores, setChore, setCount}) => {
  //const [choreList, setChoreList] = useState(chores);
  const sfxWhoosh = new Audio(whooshSfx);

  const resolveChore = (index) => {
    let array = [...chores];
    array.splice(index, 1);
    setChore(array);
    setCount(array.length);
    sfxWhoosh.play();

  }

  return (
    <>
      {chores.map((chore, index) => {
        const { id, name, day, due,  image } = chore;
        return (
            <div key={id} className='chore'>
                <img tabIndex="0" alt={name} src={image} className="chore-images" />
                <div>
                <h4 tabIndex="0">{name}</h4>
                <p tabIndex="0">Due: {due}</p>
                <div className="grow">
                    <img tabIndex="0" src="../icons/delete-button.png" onClick={() => resolveChore(index)} className="remove-button" alt="remove chore" />   
                </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default List;