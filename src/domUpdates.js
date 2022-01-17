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
const userDropdown = document.querySelector(".user-selection");
const managerBookingView = document.querySelector(".manager-booking-view");
const managerDashTiles = document.querySelector(".manager-dash-tiles");
const pastCustomerBookingDetails = document.querySelector(
  ".past-customer-bookings-details"
);
const currentCustomerBookingDetails = document.querySelector(
  ".current-customer-bookings-details"
);
const futureCustomerBookingDetails = document.querySelector(
  ".future-customer-bookings-details"
);
const managerCustomerBookingView = document.querySelector(
  ".manager-customers-booking-section"
);
const managerDateInput = document.querySelector("#manager-date");
const managerRoomInput = document.querySelector(".manager-rooms-selection");
const managerAvailableRooms = document.querySelector(
  ".manager-available-rooms"
);

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

const createBookingRow = (booking, addDeleteColumn) => {
  const tr = createTr([
    booking.date,
    booking.roomNumber,
    createDisplayRoomType(booking.room.roomType),
    costToString(booking.getCost()),
  ]);
  if (addDeleteColumn) {
    const td = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete Booking";
    deleteButton.addEventListener("click", () => {
      domUpdates.deleteBooking(booking);
    });
    td.appendChild(deleteButton);
    tr.appendChild(td);
  }
  return tr;
};

const populateBookingRows = (table, bookings, addDeleteColumn = false) => {
  table.innerHTML = "";
  const thead = document.createElement("thead");
  const headerCols = [
    "Date Booked",
    "Room Number",
    "Room Type",
    "Cost of Room",
  ];
  if (addDeleteColumn) {
    headerCols.push("Delete Booking");
  }
  const header = createTr(headerCols, "th");
  thead.appendChild(header);
  table.appendChild(thead);
  const tbody = document.createElement("tbody");
  bookings
    .map((booking) => createBookingRow(booking, addDeleteColumn))
    .forEach((row) => {
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
  img.width = 200;
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
  event.preventDefault();
  if (dateInput.value && roomInput.value) {
    domUpdates.showRooms(convertDate(dateInput.value), roomInput.value);
  }
};

const renderRooms = (model) => {
  const selectedDate = model.attachments.selectedBookingDate;
  const selectedRoomType = model.attachments.selectedRoomType;
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
    )} available at on ${model.attachments.selectedBookingDate}!`;
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
  totalRoomsAvailable.innerHTML = "";
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

const createUserDropdownOptions = (users) => {
  userDropdown.innerHTML = "";
  const option = document.createElement("option");
  option.innerText = "";
  option.value = "";
  userDropdown.appendChild(option);
  users
    .sort((a, b) => {
      a = a.name.split(" ")[1];
      b = b.name.split(" ")[1];
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    })
    .forEach((user) => {
      const option = document.createElement("option");
      option.value = user.id;
      option.innerText = user.name;
      userDropdown.appendChild(option);
    });
};

const renderManagerDashboard = (model) => {
  createUserDropdownOptions(model.users);
  renderAvailableRooms(calculateRoomsAvailable(model));
  totalRevenue.innerText = costToString(calculateRoomRevenue(model));
  percentOccupied.innerText = `${calculatePercentageOccupied(model)}%`;
};

const renderManagerCustomer = (model) => {
  const customer = model.attachments.selectedCustomer;
  populateBookingRows(pastCustomerBookingDetails, customer.getPastBookings());
  populateBookingRows(
    currentCustomerBookingDetails,
    customer.getCurrentBookings()
  );
  populateBookingRows(
    futureCustomerBookingDetails,
    customer.getFutureBookings(),
    true
  );
  makeManagerBooking(model);
};

const isFutureDate = (date) => {
  const today = new Date(new Date().toDateString());
  return new Date(date) > today;
};

const createManagerBookingTable = (rooms) => {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  table.appendChild(thead);
  thead.appendChild(
    createTr(
      [
        "Room Number",
        "Room Type",
        "Bidet",
        "Bed Size",
        "Number of Beds",
        "Cost Per Night",
        "Book",
      ],
      "th"
    )
  );
  managerAvailableRooms.appendChild(table);
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);
  rooms.forEach((room) => {
    const tr = createTr([
      room.number,
      createDisplayRoomType(room.roomType),
      room.bidet,
      room.bedSize,
      room.numBeds,
      costToString(room.costPerNight),
    ]);
    const td = document.createElement("td");
    tr.appendChild(td);
    const button = document.createElement("button");
    button.innerText = "Add Booking";
    button.addEventListener("click", () => domUpdates.bookCustomerRoom(room));
    td.appendChild(button);
    tbody.appendChild(tr);
  });
};

const makeManagerBooking = (model) => {
  managerAvailableRooms.innerHTML = "";
  const date = model.attachments.selectedDate;
  if (!date || !isFutureDate(date)) {
    const p = document.createElement("p");
    p.innerText = "Please select a future date.";
    managerAvailableRooms.appendChild(p);
    return;
  }
  const roomType = model.attachments.roomType;
  const availableRooms = model.rooms.filter((room) => {
    const isCorrectType = roomType === "" || room.roomType === roomType;
    const isAvailable = roomIsAvailable(room, date, model.bookings);
    return isCorrectType && isAvailable;
  });
  createManagerBookingTable(availableRooms);
};

// ~~~~~~~~~~~~~~~~~ DOM UPDATE FUNCTIONS ~~~~~~~~~~~~~~~~~~~~

const viewsForState = {
  login: [loginView],
  user: [bookingsView, bookYourStaySection],
  rooms: [roomsView],
  manager: [managerDashBoard, managerDashTiles],
  managerCustomer: [managerDashBoard, managerBookingView],
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
  showCustomer(userID, selectedDate, roomType) {
    console.log("Did not define showCustomer");
  },
  deleteBooking(booking) {
    console.log("Did not define deleteBooking");
  },
  bookCustomerRoom(room) {
    console.log("Did not define bookCustomerRoom");
  },
  renderModel(model) {
    showState(model.state);
    if (model.state === "login") {
      loginError.classList.add("hidden");
      if (model.attachments.loginError) {
        loginError.classList.remove("hidden");
        loginError.innerText = model.attachments.loginError;
      }
    } else if (model.state === "user") {
      renderBookings(model.user);
    } else if (model.state === "rooms") {
      renderRooms(model);
    } else if (model.state === "manager") {
      renderManagerDashboard(model);
    } else if (model.state === "managerCustomer") {
      renderManagerCustomer(model);
    }
  },
};

const customerViewListener = () => {
  const value = userDropdown.value;
  const date = managerDateInput.value || "";
  const room = managerRoomInput.value;
  domUpdates.showCustomer(value, convertDate(date), room);
};
submitButton.addEventListener("click", showRoomsListener);
userDropdown.addEventListener("change", customerViewListener);
managerDateInput.addEventListener("change", customerViewListener);
managerRoomInput.addEventListener("change", customerViewListener);

export default domUpdates;
