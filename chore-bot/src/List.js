import React from 'react';

const List = ({ chores }) => {

    return (
        <>
        {chores.map((chore) => {
            const { id, name, day, image } = chore;
            return (
            <div key={id} className='chore'>
                <img tabIndex="0" alt={name} src={image} className="chore-images" />
                <div>
                    <h4 tabIndex="0">{name}</h4>
                    <p tabIndex="0">Due: {day}</p>
                    <div class="grow">
                        <img tabIndex="0" src="../icons/delete-button.png" onClick={() => console.log("Clicked")} className="remove-button" alt="remove chore" />   
                        <img tabIndex="0" src="../icons/check.png" onClick={() => console.log("Clicked")} className="complete-button" alt="Mark chore as complete" />
                    </div>
                </div>
            </div>
            );
        })}
        </>
    );
};

export default List;