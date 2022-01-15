import { use } from "chai";

const pastBookingsTable = document.querySelector(".past-bookings-details");
const currentBookingsTable = document.querySelector(
  ".current-bookings-details"
);
const loginView = document.querySelector(".login-view");
const logoutButton = document.querySelector(".logout");
const userNameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#pass");
const loginButton = document.querySelector(".login-button");
const loginError = document.querySelector(".login-error");
const futureBookingsTable = document.querySelector(".future-bookings-details");
const dateInput = document.querySelector("#date");
const roomInput = document.querySelector(".rooms-selection");
const bookingsView = document.querySelector(".booking-details");
const roomsView = document.querySelector(".room-details");
const bookYourStaySection = document.querySelector(".book-your-stay-section");
const submitButton = document.querySelector(".submit");
const managerDashBoard = document.querySelector(".manager-dashboard");
const totalRoomsAvailable = document.querySelector(".total-rooms-available");
const totalRevenue = document.querySelector(".total-daily-revenue");
const percentOccupied = document.querySelector(".percentage-occupied");

// ~~~~~~~~~~~~~~~~~ HELPER FUNCTIONS ~~~~~~~~~~~~~~~~~~~~

const roomIsAvailable = (room, date, bookings) => {
  return !bookings.some(
    (booking) => booking.roomNumber === room.number && booking.date === date
  );
};

const costToString = (cost) => {
  return `$${cost.toFixed(2)}`;
};

// ~~~~~~~~~~~~~~~~~ BOOKING TABLES ~~~~~~~~~~~~~~~~~~~~

const renderBookings = (user) => {
  populateBookingRows(pastBookingsTable, user.getPastBookings());
  populateBookingRows(currentBookingsTable, user.getCurrentBookings());
  populateBookingRows(futureBookingsTable, user.getFutureBookings());
};

const createDisplayRoomType = (type) => {
  return type
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};

const createTr = (columns, columnType = "td") => {
  const tr = document.createElement("tr");
  columns.forEach((column) => {
    const td = document.createElement(columnType);
    td.innerText = column;
    tr.appendChild(td);
  });
  return tr;
};

const createBookingRow = (booking) => {
  return createTr([
    booking.date,
    booking.roomNumber,
    createDisplayRoomType(booking.room.roomType),
    costToString(booking.getCost()),
  ]);
};

const populateBookingRows = (table, bookings) => {
  table.innerHTML = "";
  const thead = document.createElement("thead");
  const header = createTr(
    ["Date Booked", "Room Number", "Room Type", "Cost of Room"],
    "th"
  );
  thead.appendChild(header);
  table.appendChild(thead);
  const tbody = document.createElement("tbody");
  bookings.map(createBookingRow).forEach((row) => {
    tbody.appendChild(row);
  });
  tbody.appendChild(createCostRow(bookings));
  table.appendChild(tbody);
};

const createCostRow = (bookings) => {
  const tr = document.createElement("tr");
  const cost = bookings.reduce((acc, booking) => acc + booking.getCost(), 0);
  const labelTd = document.createElement("td");
  labelTd.colSpan = 3;
  labelTd.innerText = "Total Cost";
  tr.appendChild(labelTd);
  const costTd = document.createElement("td");
  costTd.innerText = costToString(cost);
  tr.appendChild(costTd);
  return tr;
};

// ~~~~~~~~~~~~~~~~~ ROOM CREATION ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const typeToImage = (type) => {
  return "images/" + type.split(" ").join("-") + ".jpg";
};

const createRoomDetails = (details) => {
  const ul = document.createElement("ul");
  details.forEach((detail) => {
    const li = document.createElement("li");
    li.innerText = detail.join(": ");
    ul.appendChild(li);
  });
  return ul;
};

const createRoomCard = (room) => {
  const div = document.createElement("div");
  div.classList.add("room-card");
  const img = document.createElement("img");
  img.src = typeToImage(room.roomType);
  img.alt = `Image of ${room.roomType}`;
  img.width = 100;
  div.appendChild(img);
  div.appendChild(
    createRoomDetails([
      ["Room Number", room.number],
      [room.bidet ? "Able to wash your tush" : "Unable to wash your tush"],
      ["Bed Size", room.bedSize],
      ["Number of Beds", room.numBeds],
      ["Cost per Night", costToString(room.costPerNight)],
    ])
  );
  const button = document.createElement("button");
  button.innerText = "Book this Room";
  button.addEventListener("click", () => {
    domUpdates.bookRoom(room);
  });
  div.appendChild(button);
  return div;
};

const convertDate = (date) => {
  return date.split("-").join("/");
};

const showRoomsListener = (event) => {
  console.log("clicked");
  event.preventDefault();
  console.log(dateInput.value, roomInput.value);
  if (dateInput.value && roomInput.value) {
    domUpdates.showRooms(convertDate(dateInput.value), roomInput.value);
  }
};

const renderRooms = (model) => {
  const selectedDate = model.selectedBookingDate;
  const selectedRoomType = model.selectedRoomType;
  const bookings = model.bookings;
  const rooms = model.rooms;
  roomsView.innerHTML = "";
  const availableRooms = rooms.filter((room) => {
    const isCorrectType = room.roomType === selectedRoomType;
    const isAvailable = roomIsAvailable(room, selectedDate, bookings);
    return isCorrectType && isAvailable;
  });
  if (availableRooms.length === 0) {
    const h3 = document.createElement("h3");
    h3.innerText = `Sorry, no ${createDisplayRoomType(
      selectedRoomType
    )} available at on ${model.selectedBookingDate}!`;
    roomsView.appendChild(h3);
    const homeButton = document.createElement("button");
    homeButton.innerText = "Return to Bookings Page";
    homeButton.addEventListener("click", domUpdates.returnHome);
    roomsView.appendChild(homeButton);
  } else {
    availableRooms
      .map(createRoomCard)
      .forEach((card) => roomsView.appendChild(card));
  }
};

// ~~~~~~~~~~~~~~~~~ LOGIN ~~~~~~~~~~~~~~~~~~~~

const loginListener = (event) => {
  event.preventDefault();
  if (userNameInput.value && passwordInput.value) {
    const userName = userNameInput.value;
    const password = passwordInput.value;
    userNameInput.value = "";
    passwordInput.value = "";
    domUpdates.login(userName, password);
  }
};

loginButton.addEventListener("click", loginListener);

// ~~~~~~~~~~~~~~~~~ LOGOUT ~~~~~~~~~~~~~~~~~~~~

const logoutListener = (event) => {
  event.preventDefault();
  domUpdates.logout();
};

logoutButton.addEventListener("click", logoutListener);

// ~~~~~~~~~~~~~~~~~ MANAGER DASHBOARD ~~~~~~~~~~~~~~~~~~~~

const findTodaysDate = () => {
  const today = new Date();
  const result = `${today.getFullYear()}/${`${today.getMonth() + 1}`.padStart(
    2,
    "0"
  )}/${today.getDate()}`;
  return result;
};

const renderAvailableRooms = (availableRoomsObj) => {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const header = createTr(["Room Type", "Number Available"], "th");
  thead.appendChild(header);
  table.appendChild(thead);
  const tbody = document.createElement("tbody");
  Object.keys(availableRoomsObj).forEach((key) => {
    if (key !== "total") {
      const tr = createTr([createDisplayRoomType(key), availableRoomsObj[key]]);
      tbody.appendChild(tr);
    }
  });
  const tr = createTr(["Total", availableRoomsObj.total]);
  tbody.appendChild(tr);
  table.appendChild(tbody);
  totalRoomsAvailable.appendChild(table);
};

const calculateRoomsAvailable = (model) => {
  return model.rooms
    .filter((room) => {
      return roomIsAvailable(room, findTodaysDate(), model.bookings);
    })
    .reduce(
      (acc, room) => {
        if (!acc[room.roomType]) {
          acc[room.roomType] = 1;
        } else {
          acc[room.roomType] += 1;
        }
        acc.total += 1;
        return acc;
      },
      { total: 0 }
    );
};

const calculateRoomRevenue = (model) => {
  return model.bookings
    .filter((booking) => {
      return booking.date === findTodaysDate();
    })
    .map((booking) => booking.getCost())
    .reduce((acc, cost) => acc + cost, 0);
};

const calculatePercentageOccupied = (model) => {
  return (
    100 - (calculateRoomsAvailable(model).total / model.rooms.length) * 100
  );
};

const renderManagerDashboard = (model) => {
  renderAvailableRooms(calculateRoomsAvailable(model));
  totalRevenue.innerText = costToString(calculateRoomRevenue(model));
  percentOccupied.innerText = `${calculatePercentageOccupied(model)}%`;
};

// ~~~~~~~~~~~~~~~~~ DOM UPDATE FUNCTIONS ~~~~~~~~~~~~~~~~~~~~

const viewsForState = {
  login: [loginView],
  user: [bookingsView, bookYourStaySection],
  rooms: [roomsView],
  manager: [managerDashBoard],
};

const showState = (state) => {
  viewsForState[state].forEach((view) => view.classList.remove("hidden"));
  Object.values(viewsForState).forEach((views) => {
    views.forEach((view) => {
      if (!viewsForState[state].includes(view)) {
        view.classList.add("hidden");
      }
    });
  });
};

const domUpdates = {
  login(username, password) {
    console.log("Did not define login");
  },
  logout() {
    console.log("Did not define logout");
  },
  showRooms(selectedBookingDate, selectedRoomType) {
    console.log("Did not define showRooms");
  },
  bookRoom(selectedRoom) {
    console.log("Did not define bookRoom");
  },
  returnHome() {
    console.log("Did not define returnHome");
  },
  renderModel(model) {
    showState(model.state);
    if (model.state === "login") {
      if (model.loginError) {
        loginError.classList.remove("hidden");
        loginError.innerText = model.loginError;
      }
    } else if (model.state === "user") {
      renderBookings(model.user);
    } else if (model.state === "rooms") {
      renderRooms(model);
    } else if (model.state === "manager") {
      renderManagerDashboard(model);
    }
  },
};

submitButton.addEventListener("click", showRoomsListener);

export default domUpdates;
