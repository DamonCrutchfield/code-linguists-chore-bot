import React from 'react';

const List = ({ chores }) => {
  return (
    <>
      {chores.map((chore) => {
        const { id, name, day, status, image } = chore;
        return (
          <article key={id} className='chore'>
            <img src={image} />
            <div>
              <h4>{name}</h4>
              <p>{day}</p>
              <p>{status}</p>
            </div>
          </article>
        );
      })}
    </>
  );
};

export default List;