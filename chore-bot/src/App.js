import React, { useState, useEffect } from "react";
import data from './data';
import List from './List';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dingSfx from './sounds/servicebell.mp3';
import popSfx from './sounds/pop.mp3';

function App()   {
    const [chores, setChore] = useState(data);
    const sfx = new Audio(dingSfx);
    const sfxPop = new Audio(popSfx);

    
    const clearAndNotify = () => {
        toast("All cleared!");
        sfxPop.play();
        setChore([]);
    }

    //Toast/Timer
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
    }, []);

      //Download/Load JSON
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
    
    //Add Chore
    const [addChore, setAddChore] = useState(false); 
       const handleSubmit = (e) => {
            e.preventDefault();
            setAddChore(false);
            console.log(`the chore entered was ${e.target[0].value}`);
            e.target.reset();
        };

    return (
        <>
            <main>
                <section className="container">
                    <h3 tabIndex="0">{chores.length} Chores Due This Week</h3>
                    <List chores={chores} />
                    <button tabIndex="0" className="add-chore" onClick={() => setAddChore(!addChore)}>Add Chore</button>
                    <br/>
                    <button tabIndex="0" className="download-chore" onClick={() => download(JSON.stringify(data), 'chore.json', 'text/plain')}>Download Chore list</button>
                    <button tabIndex="0" className="clear-all" onClick={() => clearAndNotify() }>Clear all</button>
                    <img tabIndex="0" id="dust" src="Images/dust.gif" alt="pink rabbit dusting gif"/>
                </section>
                <form onSubmit={handleSubmit} style={{visibility: addChore ? 'visible': 'hidden',}}>
                <input id="choreName" placeholder="chore" type="text" required/>
                <input id="choreDate" type="date"/>
                <input id="choreTime" placeholder="HH:00" required pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$" title="24 Hour Time Clock"/>
                <input id="choreImage" placeholder="http://" title="not required default image will be applied if none is added"/>
                <button type="submit">Add Chore</button>
                </form>
            </main>
            <div>
                <ToastContainer />
            </div>
    </>
    );
}

export default App;