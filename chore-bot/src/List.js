import React, { useState } from 'react';

const List = ({ chores }) => {
  const [choreList, setChoreList] = useState(chores);
  const resolveChore = (index) => {
    let array = [...choreList]; // make a separate copy of the array
    array.splice(index, 1);
    setChoreList(array);
  }
  return (
    <>
      {choreList.map((chore, index) => {
        const { id, name, day, status, image } = chore;
        return (
          <article key={id} className='chore'>
            <img src={image} className="chore-images" />
            <div>
                <h4>{name}</h4>
                <p>{day}</p>
                <p>{status}</p>
                <img src="../icons/delete-button.png" onClick={() => resolveChore(index)} className="remove-button"/>   
                <img src="../icons/check.png" onClick={() => resolveChore(index)} className="complete-button"/>
            </div>
          </article>
        );
      })}
    </>
  );
};

export default List;