import React, { useState } from "react";
import data from './data';
import List from './List';

function App() {
    const [chores, setChore] = useState(data);

    return (
        <main>
            <section className="container">
                <h3>{chores.length} Chores Due This Week</h3>
                <List chores={chores} />
                <button onClick={() => console.log("Clicked")}>Add Chore</button>
                <button onClick={() => setChore([])}>Clear all</button>
            </section>
        </main>
    );
}

export default App;