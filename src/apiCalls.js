const url = "http://localhost:3001/api/v1/";

// ~~~~~~~~~~ GET REQUESTS ~~~~~~~~~~~~~

export const fetchCustomers = () => {
  return fetch(url + "customers")
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const fetchSingleCustomer = (id) => {
  return fetch(url + `customers/${id}`).then((response) => {
    if (!response.ok) {
      const error = new Error("Error response");
      error.response = response;
      throw error;
    }
    return response.json();
  });
};

export const fetchAllRooms = () => {
  return fetch(url + "rooms")
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const fetchAllBookings = () => {
  return fetch(url + "bookings")
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

// ~~~~~~~~~~ POST REQUEST ~~~~~~~~~~~~~

export const addNewBooking = (userID, date, roomNumber) => {
  return fetch(url + "bookings", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userID: userID,
      date: date,
      roomNumber: roomNumber,
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
