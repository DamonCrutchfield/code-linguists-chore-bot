import React, { useState, useEffect } from "react";
import data from './data';
import List from './List';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

    const [chores, setChore] = useState(data);
    
    const clearAndNotify = () => {
        
        toast("All cleared!");
        setChore([]);
    }
    //timer to check chore for popup reminder.
    async function checkChoreLoop() {
        const currentdate = new Date(); 
        const datetime = currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
        console.log(datetime);
        toast("Clean your House");
    } 
    const MINUTE_MS = 30000;
    useEffect(() => {
        const interval = setInterval(() => {
        //TODO: add function to loop throught chore and toast when time for chore.
          toast("Clean your House!");
          //checkChoreLoop();
        }, MINUTE_MS);
      
        return () => clearInterval(interval); 
      }, []);


    return (
        <>
            <main>
                <section className="container">
                    <h3 tabIndex="0">{chores.length} Chores Due This Week</h3>
                    <List chores={chores} />
                    <button tabIndex="0" className="add-chore" onClick={() => console.log("Clicked")}>Add Chore</button>
                    <button tabIndex="0" className="clear-all" onClick={() => clearAndNotify() }>Clear all</button>
                </section>
            </main>
            <div>
                <ToastContainer />
            </div>
        </>
    );
}

export default App;