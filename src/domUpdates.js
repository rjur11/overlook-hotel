const pastBookingsTable = document.querySelector(".past-bookings-details");
const currentBookingsTable = document.querySelector(
  ".current-bookings-details"
);
const futureBookingsTable = document.querySelector(".future-bookings-details");

const createBookingRow = (booking) => {
  const tr = document.createElement("tr");
  const dateTd = document.createElement("td");
  dateTd.innerText = booking.date;
  tr.appendChild(dateTd);
  const roomTd = document.createElement("td");
  roomTd.innerText = booking.roomNumber;
  tr.appendChild(roomTd);
  const costTd = document.createElement("td");
  costTd.innerText = `$${booking.getCost().toFixed(2)}`;
  tr.appendChild(costTd);
  return tr;
};
const populateBookingRows = (table, bookings) => {
  const thead = document.createElement("thead");
  const header = document.createElement("tr");
  const dateTh = document.createElement("th");
  dateTh.innerText = "Date Booked";
  header.appendChild(dateTh);
  const roomTh = document.createElement("th");
  roomTh.innerText = "Room Number";
  header.appendChild(roomTh);
  const costTh = document.createElement("th");
  costTh.innerText = "Cost of Room";
  header.appendChild(costTh);
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
  labelTd.colSpan = 2;
  labelTd.innerText = "Total Cost";
  tr.appendChild(labelTd);
  const costTd = document.createElement("td");
  costTd.innerText = `$${cost.toFixed(2)}`;
  tr.appendChild(costTd);
  return tr;
};

const domUpdates = {
  renderBookings(user) {
    populateBookingRows(pastBookingsTable, user.getPastBookings());
    populateBookingRows(currentBookingsTable, user.getCurrentBookings());
    populateBookingRows(futureBookingsTable, user.getFutureBookings());
  },
};

export default domUpdates;
