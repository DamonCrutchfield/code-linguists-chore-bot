import React, { useState, useEffect } from "react";
import List from './List';
import data from './data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dingSfx from './sounds/servicebell.mp3';
import popSfx from './sounds/pop.mp3';

function App()   {
  const [chores, setChore] = useState(data);
  const [count, setCount] = useState(chores.length);
    const sfx = new Audio(dingSfx);
    const sfxPop = new Audio(popSfx);

    
    const clearAndNotify = () => {
        toast("All cleared!");
        sfxPop.play();
        setChore([]);
    }
    //timer function to check chore for popup reminder.
    async function checkChoreLoop() {
        //get Date and time
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + "00";
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        console.log((time+":"+date));
        //loop through chore due dates and check for a date time match`
        for(const chore in data){
            //format time and check for match and toast if there is match
            if((time+":"+date) === data[chore].due){
                //Sound Effect load and play when match found
                sfx.play();
                toast(data[chore].name);
            }
        }
    }
    //set timer interval 60000 = 1min  
    const MINUTE_MS = 10000;

    useEffect(() => {
        const interval = setInterval(() => {
          //Call function ever timer interval
            checkChoreLoop();
        }, MINUTE_MS);
        return () => clearInterval(interval); 
    }, [chores]);

        // function handleChore(e){
        //     const newChore = chores;
        //     newChore.name = e.target.value;
        //     setChore(newChore);
        //     console.log("New chore added", chores);
        // }
    
        // function handleDay(e){
        //     const newChore = chores;
        //     newChore.day = e.target.value;
        //     setChore(newChore);
        //     console.log("Date added", chores)
        // }
    
        // function handleStatus(e){
        //     const newChore = chores;
        //     newChore.status = e.target.value;
        //     setChore(newChore);
        //     console.log("Status added", chores)
    
        // }
    
        // function handleImage(e){
        //     const newChore = chores;
        //     newChore.image = e.target.value;
        //     setChore(newChore);
        //     console.log("Chore image added", chores)
        // }
    
        // function handleSubmit(e){
        //     props.addChore(chores);
        //     e.target.reset();

        // }

      //Function to download chores as json file
    function download(content, fileName, contentType) {
        toast("Downloading List");
        sfxPop.play();
        const a = document.createElement("a");
        const file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }
    
    return (
        <>
            <main>
                <section className="container">
                    <h3>{!chores.length ? chores.length: count} Chores Due This Week</h3>
                    <List chores={chores} setCount={setCount}/>
                    <button tabIndex="0" className="add-chore" onClick={() => console.log("Clicked")}>Add Chore</button>
                    <button tabIndex="0" className="download-chore" onClick={() => download(JSON.stringify(data), 'chore.json', 'text/plain')}>Download Chore list</button>
                    <button tabIndex="0" className="clear-all" onClick={() => clearAndNotify() }>Clear all</button>
                    <img tabIndex="0" id="dust" src="Images/dust.gif" alt="pink rabbit dusting gif"/>
                </section>
                {/* <form onSubmit={handleSubmit}>
                <input id="chore-name" class="input-chore" placeholder="chore" type="text" onchange={handleChore} required/>
                <br/>
                <input id="chore-day" class="input-day" placeholder="day" type="date"/>
                </form> */}
            </main>
            <div>
                <ToastContainer />
            </div>

    </>
    );
}

export default App;