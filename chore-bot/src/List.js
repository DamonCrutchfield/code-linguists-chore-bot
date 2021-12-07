import React from 'react';

const List = ({ chores }) => {
  return (
    <>
      {chores.map((chore) => {
        const { id, name, day, status, image } = chore;
        return (
          <article key={id} className='chore'>
            <img src={image} className="chore-images" />
            <div>
                <h4>{name}</h4>
                <p>Due: {day}</p>
                <img src="../icons/delete-button.png" onClick={() => console.log("Clicked")} className="remove-button"/>   
                <img src="../icons/check.png" onClick={() => console.log("Clicked")} className="complete-button"/>
            </div>
          </article>
        );
      })}
    </>
  );
};

export default List;