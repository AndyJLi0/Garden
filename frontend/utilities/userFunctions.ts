import CONFIG from "../config";

const getUsers = async () => {
  try {
    const response = await fetch(`${CONFIG.IP}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Users:", data.users);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

// create user 
 export const createUser = async (username: string, email: string) => {
  try {
    const response = await fetch(`${CONFIG.IP}/create_user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("User created:", data);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

// Delete user
const deleteUser = async (userId: number) => {
  try {
    const response = await fetch(`${CONFIG.IP}/delete_user/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("User deleted:", data);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

const updateUser = async (userId: number, updatedFields: { username?: string; email?: string }) => {
  try {
    const response = await fetch(`${CONFIG.IP}/update_user/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("User updated:", data);
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

//updateUser(2, {email:"jimgeng@gmail.com"});

//deleteUser(1);
createUser("andy li", "andyli@example.com");  


getUsers();