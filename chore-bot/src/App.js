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
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + "00";
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        for(const chore in data){
            //console.log(data[chore].due + ":"+ datetime);
            console.log(time +":"+date);
            const match = false;
            if((time+":"+date) === data[chore].due){
                console.log("match");
                toast(data[chore].name);
            }else{console.log("no match")}
        }
    } 
    const MINUTE_MS = 10000;
    useEffect(() => {
        const interval = setInterval(() => {
        //TODO: add function to loop throught chore and toast when time for chore.
          //toast("Clean your House!");
          checkChoreLoop();
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