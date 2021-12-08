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
      toast("Clean your House!");
    }, MINUTE_MS);
  
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])