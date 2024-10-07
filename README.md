# StaySafe - Room Rental and Hotel Booking Platform

A full-stack MERN application that allows users to browse, filter, book, and manage hotel accommodations. The platform serves guests, hosts, and admins with dedicated roles for each. It's built with React, Node.js, Express.js, and MongoDB, providing a seamless experience for property rentals.

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [Functionality](#functionality)
3. [Live Demo](#live-demo)
4. [Packages Used](#packages-used)
5. [Installation and Setup](#installation-and-setup)
6. [Contributing](#contributing)

---

## Technology Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose for data modeling)
- **Authentication:** Firebase (Google Sign-In, JWT for session management)
- **Deployment:**
  - **Frontend:** Netlify
  - **Backend:** Vercel

---

## Functionality

### Users:

- **Registration, Login, and Profiles:**

  - Users can create accounts as guests, with options for email/password and Google sign-in.
  - Profile creation with photo upload.
  - Secure login system with JWT authentication stored in browser cookies.

- **Guest Role:**
  - Guests can browse available rooms and make secure bookings.
  - Instant booking or host approval options.
  - Calendar integration for managing reservations.
  - Profile management and ability to request a host role.

### Hosts:

- **Host Role:**
  - Guests can request a host role from the admin.
  - Hosts can list properties for rent, including photos, descriptions, amenities, availability, and pricing.
  - Hosts can manage bookings and view statistics via the dashboard.

### Admins:

- **Admin Role:**
  - Admins manage users and roles.
  - View platform-wide statistics and approve guest-to-host role requests.

### Payments and Transactions:

- Integrated with **Stripe** for secure payment processing.

### Notifications:

- Automated email notifications for booking confirmations, updates, and user actions.

### Technical Highlights:

- **Responsive Design:** Optimized for desktop, tablet, and mobile views.
- **Secure:** Data is encrypted, and sensitive credentials are protected using environment variables.

---

## Live Demo

- **Backend (Vercel):** [StaySafe Backend](https://staysafe-nine.vercel.app/)
- **Frontend (Netlify):** [StaySafe Frontend](https://startling-torrone-7d0f42.netlify.app/)

---

## Packages Used

- [Stripe](https://stripe.com/)
- [Resend Email](https://resend.com/home)
- [@headlessui/react](https://www.npmjs.com/package/@headlessui/react)
- [IMGBB API](https://api.imgbb.com/)
- [@tanstack/react-query](https://www.npmjs.com/package/@tanstack/react-query)
- [axios](https://www.npmjs.com/package/axios)
- [date-fns](https://www.npmjs.com/package/date-fns)
- [react-date-range](https://www.npmjs.com/package/react-date-range)
- [react-helmet-async](https://www.npmjs.com/package/react-helmet-async)
- [react-hot-toast](https://www.npmjs.com/package/react-hot-toast)
- [react-icons](https://www.npmjs.com/package/react-icons)
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [react-spinners](https://www.npmjs.com/package/react-spinners)
- [@stripe/react-stripe-js](https://www.npmjs.com/package/@stripe/react-stripe-js)
- [@stripe/stripe-js](https://www.npmjs.com/package/@stripe/stripe-js)
- [firebase](https://www.npmjs.com/package/firebase)
- [react-google-charts](https://www.react-google-charts.com/examples/line-chart)

---

## Installation and Setup

Follow these instructions to set up the project locally.

### Step 1: Clone the repository

```bash
git clone https://github.com/MdAbdullahIbnNoor/StaySafe-Online-hotel-booking-mern
cd StaySafe-Online-hotel-booking-mern
```

### Step 2: Install dependencies for the frontend (client)

```bash
cd client
npm install
```

### Step 3: Install dependencies for the backend (server)

```bash
cd ../server
npm install
```

### Step 4: Set up environment variables

- **Frontend (client):**:

  - Create a `.env.local` file inside the `client` folder.
  - Add your Firebase API keys and configuration details.
    Example:

  ```bash
  REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
  ```

- **Backend (server):**
  - Create a `.env.local` file inside the `server` folder.
  - Add your Firebase API keys and configuration details.
    Example:
  ```bash
  MONGO_URI=your_mongo_db_connection_string
  STRIPE_SECRET_KEY=your_stripe_secret_key
  ```

### Step 5: Running the project

- **Frontend (client):**
    ```bash
    cd client
    npm run dev
    ```
- **Backend (server):**
    ```bash
    cd server
    npm run start
    ```
### Step 6: Open the app
- Frontend: `http://localhost:5173/`
- Backend:  `http://localhost:8000/`

## Contributing

We welcome contributions! 🎉 If you’d like to contribute, follow these steps:

1. 🍴 **Fork** the repository.
2. 🌿 **Create a new branch** (e.g., `git checkout -b feature-branch`).
3. 🛠 **Make your changes** and **commit** them (e.g., `git commit -m 'Add new feature'`).
4. 🚀 **Push** to the branch (e.g., `git push origin feature-branch`).
5. 🔄 **Create a pull request** explaining your changes.


   
