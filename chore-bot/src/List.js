import React from 'react';

const List = ({ chores }) => {
  const resolveChore = (id) => {
    let elem = document.getElementById(id);
    elem.remove();
    console.log(id);
  }
  return (
    <>
      {chores.map((chore) => {
        const { id, name, day, status, image } = chore;
        return (
          <article key={id} id={id} className='chore'>
            <img src={image} className="chore-images" />
            <div>
                <h4>{name}</h4>
                <p>{day}</p>
                <p>{status}</p>
                <img src="../icons/delete-button.png" onClick={() => resolveChore(id)} className="remove-button"/>   
                <img src="../icons/check.png" onClick={() => resolveChore(id)} className="complete-button"/>
            </div>
          </article>
        );
      })}
    </>
  );
};

export default List;