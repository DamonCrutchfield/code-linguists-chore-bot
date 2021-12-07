import React, { useState } from "react";
import data from './data';
import List from './List';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [chores, setChore] = useState(data);
    const notify = () => toast("All cleared!");

    return (
        <>
            <main>
                <section className="container">
                    <h3>{chores.length} Chores Due This Week</h3>
                    <List chores={chores} />
                    <button className="add-chore" onClick={() => console.log("Clicked")}>Add Chore</button>
                    <button className="clear-all" onClick={notify} onClick={() => setChore([])}>Clear all</button>
                </section>
            </main>
            <div>
                <button onClick={notify}>Notify !</button>
                <ToastContainer />
            </div>
        </>
    );
}

export default App;