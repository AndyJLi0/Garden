export const addActivities = async(activities:{time:number, date:string, distance:number}) => {
    try {
        const response = await fetch("http://127.0.0.1:5000/add_activity", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(activities),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log("activities:", data.message);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
}

//addActivities({time: 30, date: "some date", distance: 50})

const getActivities = async() => {
    try {
        const response = await fetch("http://127.0.0.1:5000/get_activities", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log("activities:", data.activities);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
}

//getActivities();