# Nigeria Postal Codes - Client-Side Package

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/zipcode-ng.svg)](https://www.npmjs.com/package/zipcode-ng)

## Overview

The "zipcode-ng" package allows you to retrieve postal/zip code details for places in Nigeria. It is designed for use in client-side JavaScript code, making it easy to incorporate postal code data into your web applications or projects. This package simplifies the process of fetching postal code information from two different domains and provides an easy-to-use interface to interact with the VendBox API.

## Installation

To use the "zipcode-ng" package in your client-side JavaScript project, you can install it via npm. Ensure you have npm installed on your system before proceeding.

N.B.: If you don't have an existing npm project, the installation will automatically create a new project for you.

```bash
npm install zipcode-ng --save
```

## Prerequisites

Before using this package, make sure your device is connected to the internet. The package relies on fetching data from the VendBox API, and an active internet connection is required for it to work properly.

## Getting Started

Install the package:

```bash
npm install zipcode-ng --save
```

### Setting up ECMAScript Modules (ESM) Support

This package utilizes ECMAScript modules (`type: "module"`) to take advantage of modern JavaScript features. To use it in your project, you need to set the "type" field to "module" in your `package.json` file.

```json
{
  "type": "module"
}
```

### For Older JavaScript Versions

If you are using an older version of JavaScript that doesn't support ECMAScript modules, you can use Babel or any other transpiler to build your code. This will allow you to import the package using the CommonJS syntax.

In your code :

```javascript
const Zip = require("zipcode-ng");
```

### Creating a User Instance

To start using the package, you need to create a user instance. There are two methods for creating a user instance, depending on your preferred authentication method:

#### Method 1: Email & Password (for VendBox Account)

```javascript
import Zip from 'zipcode-ng'; // or const Zip = require("zipcode-ng");

const verifiedEmail = 'your.verified.vendbox.email@domain.com';
const password = 'your.vendbox.password';
const user = new Zip(verifiedEmail, password);
```

#### Method 2: Public API Key (Get from VendBox after Sign-up)

```javascript
import Zip from 'zipcode-ng';

const publicKey = 'vendbox-pk-your_vendbox_public_key';
const user = new Zip(publicKey);
```

### Retrieving State Data

Once you have created the user instance, you can retrieve postal code data for a specific state. You can pass either the state name or the postal code as an argument, and the state data object would be returned.


```javascript
const stateName = 'Benue'; // Replace with the desired state name or postal code
user.getStateData(stateName)
  .then((data) => {
    // Handle the retrieved data as required
    console.log(data);
    // console.log(JSON.stringify(data, null, 2)); //<-- Uncomment this for an expanded view of the LGAs and Towns under them.
  })
  .catch((error) => {
    // Handle any errors that occur during the API call
    console.error(error);
  });
```

### Sample Response Object

The retrieved state data object will have the following structure:

```json
{
  "id": 7,
  "name": "Benue",
  "postal_code_format": "######",
  "postal_code_regex": "^(\\d{6})$",
  "primary_postal_code": "970001",
  "region": {
    "id": 3,
    "full_name": "North Central",
    "abbreviation": "NC"
  },
  "cities": [
    {
      "id": 25,
      "name": "Makurdi",
      "lgas": [
        {
          "id": 1,
          "name": "Ado"
        },
        {
          "id": 2,
          "name": "Agatu"
        },
        {
          "id": 3,
          "name": "Buruku"
        },
        {
          "id": 4,
          "name": "Guma"
        },
        {
          "id": 5,
          "name": "Logo"
        },
        {
          "id": 6,
          "name": "Makurdi"
        },
        {
          "id": 7,
          "name": "Obi & Oju"
        },
        {
          "id": 8,
          "name": "Otukpo"
        },
        {
          "id": 9,
          "name": "Ogbadibo"
        }
      ]
    },
    {
      "id": 26,
      "name": "Gboko",
      "lgas": []
    },
    {
      "id": 27,
      "name": "Otukpo",
      "lgas": []
    },
    {
      "id": 28,
      "name": "Katsina-Ala",
      "lgas": []
    }
  ]
}
```

Here's an explanation of each property:

**Explanation of Properties:**

- **id:** Unique identifier for the state in the dataset.
- **name:** The name of the state for which the postal code data is retrieved.
- **postal_code_format:** The format of the postal code for the state (here, "######" indicates a 6-digit code).
- **postal_code_regex:** The regular expression that validates the postal code for the state (here, "^(\\d{6})$" matches a 6-digit number).
- **primary_postal_code:** The primary postal code for the state (in this case, "970001").
- **region:** An object representing the region to which the state belongs, with the following properties:
  - **id:** Unique identifier for the region in the dataset.
  - **full_name:** The full name of the region (here, "North Central").
  - **abbreviation:** The abbreviation or code for the region (here, "NC").
- **cities:** An array of objects representing cities in the state, each with the following properties:
  - **id:** Unique identifier for the city in the dataset.
  - **name:** The name of the city.
  - **lgas:** An array of objects representing Local Government Areas (LGAs) in the city. Each LGA object has the following properties:
    - **id:** Unique identifier for the LGA in the dataset.
    - **name:** The name of the LGA.

## Important Notes

1. This package is designed for client-side JavaScript code and utilizes ECMAScript modules (`type: "module"`). Ensure your project supports modern JavaScript features.

2. For user authentication, you can use my public key cos I'm a nice guy: `vendbox-pk-09ecf162-b3b6-436e-8310-a04644f7eb54`, or my email: `test.user@thevendingdepot.co`, and password `password`

3. I know this may never be used, eh eh eh.

## License

This package is open-source and distributed under the [MIT License](https://opensource.org/licenses/MIT).

## Version

Current version: 1.0.0

## Author

Awesome Goodman

## Acknowledgments

Special thanks to the VendBox team for their support and providing the postal code data API.