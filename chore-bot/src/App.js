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
        const time = today.getHours() + ":" + today.getMinutes();
        //2021-12-09 @ 23:00
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        console.log("Current Time:",(date+" @ "+time));
        //loop through chore due dates and check for a date time match`
        for(const chore in data){
            console.log("Chore Due:", chores[chore].due);
            //format time and check for match and toast if there is match
            console.log((date+" @ "+time)+" : "+data[chore].due);
            if((date+" @ "+time) === data[chore].due){
                //Sound Effect load and play when match found
                console.log("Chore Alert");
                sfx.play();
                toast(data[chore].name);
            }
        }
    }
    const testNotifacation = () => {
        sfx.play();
        toast("Wash Your Dishes");
    }
    //set timer interval 60000 = 1min  
    const MINUTE_MS = 60000;

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
    
    //Add Chore to list
       const handleSubmit = (e) => {
            e.preventDefault();
            sfxPop.play();
            setAddChore(false);
            const choreList = chores;
            let imageUrl = "../icons/default.png";
            if(!e.target[3].value == ""){
                imageUrl = e.target[3].value;
            }
            choreList.push({
                id: (choreList.length + 1),
                name: e.target[0].value,
                day: "Not used",
                status:true,
                image: imageUrl ,
                due:e.target[1].value+" @ "+e.target[2].value
            });
            setChore(choreList);
            e.target.reset();
        };

    return (
        <>
            <main>
                <section className="container">
                    <h3 tabIndex="0">{!chores.length ? chores.length: count} Chores Due</h3>
                    <List chores={chores} setCount={setCount}/>
                    <button tabIndex="0" type="button" className="add-chore" data-toggle="modal" data-target="#exampleModal" onClick={() => { setAddChore(!addChore); sfxPop.play(); }}>Add Chore</button>
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
                                <form onSubmit={handleSubmit}>  
                                    <div className="form-group" tabIndex ="0" aria-label="Enter a chore name">
                                        <input id="choreName" placeholder="Chore Name" type="text" title="Chore Name" required/>
                                    </div>
                                    <div className="form-group" tabIndex ="0" aria-label="Enter a due Date">
                                        <input id="choreDate" type="date" title="Chore due date"/>
                                    </div>
                                    <div className="form-group" tabIndex ="0" aria-label="Enter the time due">
                                        <input id="choreTime" placeholder="HH:00" required pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$" title="Chore Time: 24 Hour Time Clock"/>
                                    </div>
                                    <div className="form-group" tabIndex ="0" aria-label="Enter an Image URL, not required default image will be applied if none is added">
                                        <input id="choreImage" placeholder="http://" title="not required default image will be applied if none is added"/>
                                    </div>
                                    <div className="form-group">
                                        <button tabIndex ="0" type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button tabIndex ="0" type="submit" className="btn btn-warning submit-button">Add Chore</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <div>
            <button onClick={testNotifacation}>test notifaction</button>
                <ToastContainer />
            </div>
    </>
    );
}

export default App;