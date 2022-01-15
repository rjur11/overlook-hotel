const pastBookingsUl = document.querySelector(".past-bookings-details");
const currentBookingsUl = document.querySelector(".current-bookings-details");
const futureBookingsUl = document.querySelector(".future-bookings-details");

const createBookingCard = (booking) => {
  const li = document.createElement("li");
  li.innerText = `${booking.date} : ${booking.roomNumber}`;
  return li;
};
const addBookingsCardsToUl = (ul, bookings) => {
  bookings.map(createBookingCard).forEach((card) => {
    ul.appendChild(card);
  });
};

const domUpdates = {
  renderBookings(pastBookings, currentBookings, futureBookings) {
    addBookingsCardsToUl(pastBookingsUl, pastBookings);
    addBookingsCardsToUl(currentBookingsUl, currentBookings);
    addBookingsCardsToUl(futureBookingsUl, futureBookings);
  },
};

export default domUpdates;
