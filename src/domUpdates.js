const pastBookingsTable = document.querySelector(".past-bookings-details");
const currentBookingsTable = document.querySelector(
  ".current-bookings-details"
);
const futureBookingsTable = document.querySelector(".future-bookings-details");
const dateInput = document.querySelector("#date");
const roomInput = document.querySelector(".rooms-selection");
const bookingsView = document.querySelector(".booking-details");
const roomsView = document.querySelector(".room-details");
const bookYourStaySection = document.querySelector(".book-your-stay-section");
const submitButton = document.querySelector(".submit");

const renderBookings = (user) => {
  populateBookingRows(pastBookingsTable, user.getPastBookings());
  populateBookingRows(currentBookingsTable, user.getCurrentBookings());
  populateBookingRows(futureBookingsTable, user.getFutureBookings());
};
// ~~~~~~~~~~~~~~~~~ TABLE CREATION ~~~~~~~~~~~~~~~~~~~~
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
    `$${booking.getCost().toFixed(2)}`,
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
  costTd.innerText = `$${cost.toFixed(2)}`;
  tr.appendChild(costTd);
  return tr;
};

// ~~~~~~~~~~~~~~~~~ ROOM CREATION ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const typeToImage = (type) => {
  return (
    "images/" +
    type
      .split("")
      .map((c) => (c === " " ? "-" : c))
      .join("") +
    ".jpg"
  );
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
      ["Cost per Night", `$${room.costPerNight.toFixed(2)}`],
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
    const isAvailable = !bookings.some(
      (booking) =>
        booking.roomNumber === room.number && booking.date === selectedDate
    );
    console.log(room, isCorrectType, isAvailable);
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
// ~~~~~~~~~~~~~~~~~ DOM UPDATE FUNCTIONS ~~~~~~~~~~~~~~~~~~~~

const domUpdates = {
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
    if (model.state === "user") {
      bookingsView.classList.remove("hidden");
      bookYourStaySection.classList.remove("hidden");
      roomsView.classList.add("hidden");
      renderBookings(model.user);
    } else if (model.state === "rooms") {
      bookingsView.classList.add("hidden");
      bookYourStaySection.classList.add("hidden");
      roomsView.classList.remove("hidden");
      renderRooms(model);
    }
  },
};

submitButton.addEventListener("click", showRoomsListener);

export default domUpdates;
