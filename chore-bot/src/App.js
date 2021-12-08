import React, { useState, useEffect } from "react";
import data from './data';
import List from './List';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dingSfx from './sounds/servicebell.mp3';

function App() {

    const [chores, setChore] = useState(data);
    const sfx = new Audio(dingSfx);
    const clearAndNotify = () => {
        toast("All cleared!");
        setChore([]);
    }
    //timer function to check chore for popup reminder.
    async function checkChoreLoop() {
        //get Date and time
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + "00";
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

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

      //Function to download chores as json file
      function download(content, fileName, contentType) {
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
                    <h3 tabIndex="0">{chores.length} Chores Due This Week</h3>
                    <List chores={chores} />
                    <button tabIndex="0" className="add-chore" onClick={() => console.log("Clicked")}>Add Chore</button>
                    <button tabIndex="0" className="clear-all" onClick={() => clearAndNotify() }>Clear all</button>
                </section>
                <button tabIndex="0" className="" onClick={() => download(JSON.stringify(data), 'chore.json', 'text/plain')}>Download Chore list</button>
            </main>
            <div>
                <ToastContainer />
            </div>
        </>
    );
}

export default App;