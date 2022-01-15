const pastBookingsTable = document.querySelector(".past-bookings-details");
const currentBookingsTable = document.querySelector(
  ".current-bookings-details"
);
const futureBookingsTable = document.querySelector(".future-bookings-details");

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
    `$${booking.getCost().toFixed(2)}`,
  ]);
};
const populateBookingRows = (table, bookings) => {
  const thead = document.createElement("thead");
  const header = createTr(["Date Booked", "Room Number", "Cost of Room"], "th");
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
