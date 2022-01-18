<img width="800" height="400" alt="overlookHotelLogo" src="https://user-images.githubusercontent.com/69861203/149978255-ba5a05c0-5198-4f03-ad4d-93f9b3454ed6.png">

# Overlook Hotel 


- Click [HERE](https://frontend.turing.edu/projects/overlook.html) to view the project spec
- Click [HERE](https://github.com/turingschool-examples/overlook-api) to access the Overlook-API (you will need this to run the website locally)





## Table of Contents
- [Abstract](#abstract)
- [Tech Used](#tech-used)
- [Installation and Set-Up](#installation-and-set-up)
- [Features](#features)
- [See the Site in Action](#see-the-site-in-action)
- [Future Goals](#future-goals)
- [Created By](#created-by)

## Abstract

Overlook Hotel is a hotel management tool for hotel customers and staff to manage room bookings and calculate customer bills.


## Tech Used

- JavaScript
- HTML
- Sass
- Mocha/Chai for testing
- Fetch API to retrieve and add data (bookings, customers, rooms)
- Project Structure Organized with [GitHub Project Board](https://github.com/rjur11/overlook-hotel/projects/1)

## Installation and Set-Up

To install this project, please see below:

```bash
1. Clone down this Repository using `git clone`
2. Run `npm install` to install library dependancies
3. Next, run `npm start` and go to `http://localhost:8080/` to view the website
4. To access the data this site is built upon, clone down the Overlook-api using `git clone` into another terminal window (keep the localhost above running)
5. Run `npm install` and `npm start`
```
After following these steps, you should have access to the fully functioning website.
    
## Features

- Login page 
  - Separate login credentials for Customer vs. Manager (see instructions below)
- Customer Portal:
  - Customer can view all past, present, and future bookings on portal landing page
  - Customer can see how much money they've spent on all rooms
  - Customer can book rooms for today or upcoming dates, and can filter by room type while searching
- Manager Portal:
  - Manager can view total rooms available, total revenue, and percentage of rooms occupied on today's date
  - Manager can view each customer's past, present, and future bookings by searching for their name
  - Manager can book rooms for a customer, or delete upcoming bookings for said customer
- 100% Lighthouse Accessibility Audit Score (before login page and manager dashboard)



## See the Site in Action! 

<img width="500" alt="Login Page" src="https://user-images.githubusercontent.com/69861203/149979514-0bcd2a96-608d-42ec-9166-252767bb2377.png">

The login page is the first point of access to the website. A user can choose to log in using customer credentials, or manager credentials. 

To log into the customer side, a user can log in using the following credentials: 

>username: customer50 (choose a number 01-50 to access different customers)
>
>password: overlook2021

To log into the manager side:

>username: manager
>
>password: overlook2021


Customer Side:

<img width="500" alt="User Landing Page" src="https://user-images.githubusercontent.com/69861203/149987106-19417131-6e82-4b71-9a09-31bb46ca7c81.png">

A customer's landing page shows them their past, present, and future bookings, along with the total amount spent towards each category. They can then choose to book a room using the date selector and room type filter at the top of the page. If rooms are available, the user can look through their options and select the room they want. The site returns them to their landing page, and the new booking will show up in the associated table. If there are no rooms available of that type on the selected date, the user will see an apology message, asking them to return to the booking page to select a new room or date. 

![See the customer dashboard in action!](https://media.giphy.com/media/82Xh0gkZVwXQL436MW/giphy.gif)

Manager Side:

<img width="500" alt="Manager Landing Page" src="https://user-images.githubusercontent.com/69861203/149987599-8a1d1a00-b196-4310-8c6b-2bfcc2e34f6d.png">

The manager portal is a bit more involved. After logging in, a manager can see some quick numbers associated with the total rooms available, revenue earned, and percentage of rooms occupied for today. The manager is able to select any customer from a drop down list in order to see their bookings.

<img width="500" alt="Manager Dashboard" src="https://user-images.githubusercontent.com/69861203/149987807-46df2e46-6a75-4509-bb53-d421e9fdc8d4.png">

Managers have the added ability to delete upcoming bookings from a customer's page, or book a new one for them. Similar to the customer's booking experience, a manager can select a date and room type, and book a room for that customer. 

![See the manager dashboard in action!](https://media.giphy.com/media/uNUosisyNGjXLjgdlC/giphy.gif)

## Future Goals

- Cleaning up the clunky design of the Manager Dashboard 

## Created By:

- [Rana Jurjus](https://github.com/rjur11)




