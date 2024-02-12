### Project Setup: Shared_Transportation

Below are the steps to set up and run the "Shared_Transportation" project in Node.js with Express. Additionally, check the "Examples.txt" file for endpoint details, parameter examples, and expected results. The necessary data for MongoDB is stored in the `config/dataTest.DB.json` file, and basic tokens for API requests are available there.

#### 1. Clone the Repository

```bash
git clone https://github.com/Jonny-Start/pasarela_pagos.git Shared_Transportation
cd Shared_Transportation
```

#### 2. Install Dependencies

Ensure you have Node.js and npm installed. Then, run the following command to install project dependencies:

```bash
npm install
```

#### 3. Configure Environment Variables

Create a `.env` file in the project root and add any necessary configurations such as secret keys, tokens, or other sensitive variables.

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/shared_transportation
```

Adjust the `MONGODB_URI` to match your MongoDB connection string.

#### 4. Start the Application

Run the following command to start the application:

```bash
npm start
```

The application will run at `http://localhost:4000` or the port you specified in the `.env` file.

#### 5. Access the Application

Open your web browser and navigate to the following URL:

```
http://localhost:4000
```

#### 6. Examples and Testing

Refer to the "Examples.txt" file for detailed information on endpoints, parameter examples, and expected results. Use the data stored in `config/dataTest.DB.json` for MongoDB testing, and find basic tokens for API requests in the same file.

### Project Information

- **Project Name:** Shared_Transportation
- **Author:** Jonny-Start
- **Repository:** [https://github.com/Jonny-Start/pasarela_pagos](https://github.com/Jonny-Start/pasarela_pagos)
