# EMI Calculator API

This project provides a REST API for calculating Equated Monthly Installments (EMI) on loans, including prepayment options. It uses Node.js with Sequelize ORM to connect to a PostgreSQL database.

## Prerequisites

- Node.js (v20.11.1 or later)
- Docker (if using Docker)
- PostgreSQL (if not using Docker)

## Setting Up the Database

### Option 1: Using Docker

1. **Pull the PostgreSQL Docker image:**

   ```bash
   docker pull postgres:latest
   ```

2. **Run the PostgreSQL container:**

   ```bash
   docker run -d \
     --name postgres-container \
     -e POSTGRES_USER=postgres \
     -e POSTGRES_PASSWORD=password \
     -e POSTGRES_DB=emi_calculator \
     -p 5432:5432 \
     postgres:latest
   ```

   This command starts a PostgreSQL container with the database named `emi_calculator`, user `postgres`, and password `password`.

### Option 2: Using a Local PostgreSQL Installation

1. **Install PostgreSQL:**

   Follow the instructions for your operating system on the [PostgreSQL official website](https://www.postgresql.org/download/).

2. **Create the database and user:**

   Run the following commands in your PostgreSQL command line interface (psql):

   ```sql
   CREATE DATABASE emi_calculator;
   CREATE USER postgres WITH PASSWORD 'password';
   ALTER ROLE postgres SET client_encoding TO 'utf8';
   ALTER ROLE postgres SET default_transaction_isolation TO 'read committed';
   ALTER ROLE postgres SET timezone TO 'UTC';
   GRANT ALL PRIVILEGES ON DATABASE emi_calculator TO postgres;
   ```

## Running the Project

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-repository/emi-calculator-api.git
   cd emi-calculator-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory of the project with the following content:

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=password
   DB_NAME=emi_calculator
   PORT=3000
   ```

   Adjust the `DB_HOST` and `DB_PORT` if you're using Docker or a different PostgreSQL setup.

4. **Run the application:**

   ```bash
   npm start
   ```

   The server will start on port 3000.

## API Endpoints

- **Calculate EMI:**

  - **Endpoint:** `POST /api/emi`
  - **Request Body:**
    ```json
    {
      "loanAmount": 100000,
      "interestRate": 7.5,
      "loanTenureMonths": 12,
      "prepaymentAmount": 5000
    }
    ```
  - **Response:** Returns EMI details and month-wise payments.

- **Get All EMIs:**

  - **Endpoint:** `GET /api/emis`
  - **Response:** Returns a list of all EMI records.

- **Get EMI by ID:**

  - **Endpoint:** `GET /api/emis/:id`
  - **Response:** Returns details of a specific EMI record by its ID.

## Troubleshooting

- Ensure PostgreSQL is running and accessible at the specified host and port.
- Check if environment variables are correctly set.
- Verify database credentials and configuration.

