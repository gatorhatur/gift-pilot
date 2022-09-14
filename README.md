# Gift Pilot -- making gifting slightly less miserable

## Purpose

As a thoughtful person, with crippling social anxiety, I want to make sure I am providing gifts to my friends that they have not already received and make sure they don't give me duplicate presents.

With Gift Pilot, users can expect to create a list of the items they desire for any occasion. Users can also expect to be able to look at the lists of their friends and notate that they have purchased a gift on the list while keeping it a secret from the recipient. How thoughtful!

## Built with

- mySQL
- Sequelize
- Express
- Handlebars
- [LinkPreview API](https://www.linkpreview.net/)

## Setup Locally

### Getting Started

- Install mySQL Community Server - [mySQL Community Download]('https://dev.mysql.com/downloads/mysql/')
- Register for a free account with [LinkPreview API](https://www.linkpreview.net/) to get an API Key
- Clone this repo - `git clone https://github.com/gatorhatur/gift-pilot.git`
- Install the dependencies with - `npm i`
- Create a .env file containing values for DB_USER, DB_PW, SESSION_SECRET, and LINKPREVIEW_API_KEY. Add DB_NAME='gift_pilot_db' to target the correct database.

### Create the Database

- From PowerShell or Command Prompt navigate to the 'db' directory of the cloned repo and log into mysql - `mysql -u root -p`
- Create the database - `source schmea.sql`
- If you wish to seed the database from your command line interface of choice (in the root of the cloned repo directory), type - `npm run seed`

![Database Diagram](/public/images/Database_Diagram.jpg)

### You're Ready!

- From the ../gift-pilot directory - `npm start`
- Use an api tool such as Insomnia or Postman to test the apis or go directly to the [local site](http://localhost:3001)

## Links

[Live Site](https://gift-pilot.herokuapp.com/home)<br>
[Checkout the Code](https://github.com/gatorhatur/gift-pilot)
