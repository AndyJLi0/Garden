// plant is lowercase string of plant name
const createPlant = async (plant:String) => {
    const plantUrl = "http://127.0.0.1:5000/create_"+plant.toLowerCase()

    try {
      const response = await fetch(plantUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Plants:", data.message);
    } catch (error) {
      console.error("Error fetching plants:", error);
    }
  };

  createPlant('cactus');