import React, { useState } from 'react';

const List = ({chores}) => {
  const [choreList, setChoreList] = useState(chores);
  if (choreList.length === 0) {}
  const resolveChore = (index) => {
    let array = [...choreList];
    choreList.splice(index, 1);
    setChoreList(array);
  }
  return (
    <>
      {choreList.map((chore, index) => {
        const { id, name, day, status, image } = chore;
        return (
          <div key={id} className='chore' id={id}>
            <img tabIndex="0" alt={name} src={image} className="chore-images" />
            <div>
              <h4 tabIndex="0">{name}</h4>
              <p tabIndex="0">Due: {day}</p>
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