import React, { useState, useEffect } from "react";
import data from './data';
import List from './List';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dingSfx from './sounds/servicebell.mp3';
import popSfx from './sounds/pop.mp3';

function App()   {
    //States
    const [chores, setChore] = useState(data);
    const [count, setCount] = useState(chores.length);
    const [addChore, setAddChore] = useState(false); 
    const sfx = new Audio(dingSfx);
    const sfxPop = new Audio(popSfx);

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
                    <h3>{!chores.length ? chores.length: count} Chores Due This Week</h3>
                    <List chores={chores} setCount={setCount}/>
                    <button tabIndex="0" type="button" className="add-chore" data-toggle="modal" data-target="#exampleModal" onClick={() => setAddChore(!addChore)}>Add Chore</button>
                    <br/>
                    <button tabIndex="0" className="download-chore" onClick={() => download(JSON.stringify(data), 'chore.json', 'text/plain')}>Download Chore list</button>
                    <img tabIndex="0" id="dust" src="Images/dust.gif" alt="pink rabbit dusting gif"/>
                </section>

                {/* Bootstrap modal */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add a New Chore</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>  
                                    <div className="form-group">
                                        <input id="choreName" placeholder="Chore Name" type="text" title="Chore Name" required/>
                                    </div>
                                    <div className="form-group">
                                        <input id="choreDate" alt="Due by Date" type="date" title="Chore due date"/>
                                    </div>
                                    <div className="form-group">
                                        <input id="choreTime" alt="Due by Time" placeholder="HH:00" required pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$" title="Chore Time: 24 Hour Time Clock"/>
                                    </div>
                                    <div className="form-group">
                                        <input id="choreImage" alt="Add image URL" placeholder="http://" title="not required default image will be applied if none is added"/>
                                    </div>
                                    <div className="form-group">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" onSubmit={handleSubmit} className=" btn btn-warning submit-button" title="submit chore">Add Chore</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <div>
                <ToastContainer />
            </div>
    </>
    );
}

export default App;