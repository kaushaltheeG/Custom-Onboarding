# Custom-Onboarding
 ![Screenshot 2024-11-07 at 12 25 09 AM](https://github.com/user-attachments/assets/dbd7beee-4292-4eba-a07b-d109a52283a7)


 Welcome to the Custom Onboarding App! In application is a very simple app that allows users to add customers to their `user` database;
 The onboarding form requires the user to fill out the customer's email, first & last name, and create a password. Some optional fields are birthday, address, and about me.
 The onboarding form has three pages and the first page includes the customer's email, first & last name, and password. The second and third pages could contain the birthday, address, and/or about me.
 The second and third page's layout is based on how the admin organizes those components. If the customer submission is successful, the customer's data will be saved to the database and persist. I hope you enjoy
 this simplistic onboarding app :)

 ## MVP
   1. Able to submit customer data and have it persist
   2. The onboarding form has three pages and there must be an indicator to show the users what state of the form they are on
   3. Able to activate and unactive the `address`, `birthday`, and `about me` fields on the form. Also, allow for the reorganization of those components on the form; There should at least be on component active pages two and three
   4. Able to see all the submitted customer data within a table. The data table should show the most up-to-date data

 ## Tech Stack
   1. **Language**: Typescript
   2. **Database**: MongoDB
   3. **Backend Framework**: Koa.js
   4. **Frontend Library**: React.js

 ## Database
   As mentioned in the tech stack section, MongoDB was used as the central source of truth. There are two collections: `user` and `site`. The `user` collection holds all the submitted users, and the `site` collection only holds one document, which is the main site that everyone interacts with. No Object Data Modeling (ODM) library like Mongoose was used.
### User Model
  ```js
{
    _id: ObjectId,
    firstName: string,
    lastName: string,
    email: string,
    passwordHash: string,
    data: {
      aboutMe: string,
      address: {
        streetName: string,
        city: string,
        state: string,
        zip: string,
      },
      birthday: {
        month: string,
        day: string,
        year: string,
      },
    },
    pendingCustomer: {
        firstName: string,
        lastName: string,
        email: string,
        data: {
          aboutMe: string,
          address: {
            streetName: string,
            city: string,
            state: string,
            zip: string,
          },
          birthday: {
            month: string,
            day: string,
            year: string,
          },
        },
    },
    created: number
}
```

### Site Model
```js
{
    _id: ObjectId,
    name: 'main'
    layout: [
      {
        name: 'address' | 'birthday' | 'aboutMe',
        page: 'two' | 'three' | 'none',
        order: number,
      }
    ],
    created: number,
}
```
 ## API Routes
   This REST API was built using an MVC architecture, so it enters through the route upon entry. From the route, it enters a controller (`/services` dir) that holds the desired logic of that route. The controller then interacts with the model, which is the interface to the specific database collection. This API has two different parent routes, which help the app interact with the `user` and `site` collections.
### User Routes
  - `GET api/user/all`: fetches all the customers within the `user` collection
  - `POST api/user/validation`: checks if the user exists; If so, returns the user document
  - `POST api/user/new`: creates and inserts a new customer into the `user` collection
### Site Routes
  - `GET api/site/main`: fetches the `main` site document from the `site` collection
  - `PUT api/site/layout`: updates the `main` site's onboarding form layout

 ## Site Paths
  This app has three different paths:
 ### Home(/)
  - This is the landing screen for the user. It prompts the user to enter their email and password to see if their information exists. If so, it temporarily logs the user in. If not, the user will create a new user, in which their information will be onboarded. Also, the newly onboarded user will temporarily log in the user.
 ![Screenshot 2024-11-07 at 12 25 09 AM](https://github.com/user-attachments/assets/dbd7beee-4292-4eba-a07b-d109a52283a7)
  - The controller below the form has two functions: 1. indicate at what stage on the onboarding form the user is on and 2. move to different parts of the form; Before you can go to the next form page, a check is performed to ensure all the rendered input fields have be filled out! The state of the form is saved, so all the entered information will remain in state until the user is inserted into the database. If any checks or API requests fail, an error message will appear.
![Screenshot 2024-11-07 at 12 32 57 AM](https://github.com/user-attachments/assets/5d72fda6-2f92-4926-9803-b7d0962da8db)
![Screenshot 2024-11-07 at 12 34 02 AM](https://github.com/user-attachments/assets/0b942ea6-e552-4b8e-924d-e23fb2f6d515)
  - After a successful onboarding of a customer, the user is taken to the data table found under the `/data` path

 ### Admin(/admin)
  - This allows the user to toggle off and on the `about me`, `address`, and `birthday` form components within pages two and three. It also allows the user to organize the components on a form's page if more than one is active. The rules are there must be at least one component on pages two and three at all times, and if two components are on the same page, they cannot have the same order number. If the new layout is valid, the user can submit this layout and is then taken to the home page(`/`) to onboard another customer with the new form layout. If any checks fail, an error message will appear.
![Screenshot 2024-11-07 at 12 40 05 AM](https://github.com/user-attachments/assets/f1359c60-a8c5-4dec-9200-9ecec3656701)

 ### Data(/data)
  - A simple data table that showcases all the onboarded users within the `user` collection of the database. It fetches the most up-to-date data whenever the user navigates to this path.
![Screenshot 2024-11-07 at 12 44 35 AM](https://github.com/user-attachments/assets/13ab44bf-c283-4878-8a9b-232c6fbfe98a)

 ## Future Features
   1. **Saving unfished customer onboarding**
         - As of now, there is a field called `pendingCustomer` within each user document. This field is used to save an unfinished onboarding the user was doing before exiting the app. This feature can easily be implemented after creating a new route to update that user's document and adding some frontend logic to make these saves
  2. **Auth**
       - There is no auth implemented within the application. The password hash needs salt added to it, JWT needs to be incorporated for proper validation, and session cookies need to be utilized to keep the user logged in
  3. **Customer Search and table improvements**
       - With the customer datable, a search functionality can be added to allow the user to search for a specific customer. Also, filters can be added to the data table, so users can dynamically set desired columns. For example, a user can have only the first name and last name columns active, so the data table only showcases those two fields when displaying the customers.
  4. **Drag and Drop form components**
       - The admin functionality is not the most user-friendly experience. In my opinion, a drag-and-drop functionality will improve the UX when setting the desired layout of the form. It allows the user to visualize the componets and how the form will look before submitting those changes to the site.

 ## Running Locally
 ### Setup
   1. MongoDB
        - create a mongo uri
        - add the `site` and `user` collections to the database
        - insert the `site` document within the `site` collection; To save time,
          ```js
          {
              "_id": {
                "$oid": "672921811ddd9a535ae3cdda"
              },
              "name": "main",
              "layout": [
                {
                  "type": "aboutMe",
                  "page": 3,
                  "order": 1
                },
                {
                  "type": "address",
                  "page": 2,
                  "order": 1
                },
                {
                  "type": "birthday",
                  "page": 0,
                  "order": 0
                }
              ],
              "created": 1730749539545
            }
          ```
  2. Env vars
      - **public**: add `.env` and add these vars `REACT_APP_API_URL='http://localhost:5000'`, `REACT_APP_ENVIRONMENT='development'`
      - **server**: add `.env` and add these vars `MONGO_URI='${YOUR MONGO URI}'`, `MONGO_DB_NAME='${YOUR MONGO DATABASE NAME}`, `ENVIRONMENT='development'`, and `PORT='5000'`
 ### Localhost
   1. install packages:
      ```
      yarn server-install && yarn public-install
      ```
  2. build the project
      ```
      yarn build
      ```
  3. starting the server
     ```
     yarn server
     ```
  4. starting the react app
     ```
     yarn public
     ```

 ### Docker
  - **prerequisites**: must have `Docker` and `docker-compose` installed on your machine
  1. Build `docker-compose.yaml`

    docker compose build --no-cache


  2. Start app
     ```
     docker compose up
     ```

  3. Open localhost:3000 in your browser
