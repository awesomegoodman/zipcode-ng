// CallApi is strictly for ease of the package development, and isn't a dependency for the overall package 
const callApi = async (url, options = {}) => {
  const DOMAIN1 = "http://127.0.0.1:8000";
  const DOMAIN2 = "https://vendbox-backend.herokuapp.com";

  try {
    // Try fetching data from the first domain using 'fetch' API
    const response = await fetch(`${DOMAIN1}${url}`, options);
    return response.json();
  } catch (error) {
    // If the first domain fails, try the second one
    try {
      const response = await fetch(`${DOMAIN2}${url}`, options);
      return response.json();
    } catch (error) {
      // If both domains fail, log an error and re-throw the error
      console.error(`Failed to connect to both ${DOMAIN1} and ${DOMAIN2}.`);
      throw new Error('Please make sure you are connected to the internet.');
    }
  }
};


class Zip {
  constructor(emailOrPublicKey, password = null) {
    if (password) {
      // If password is provided, treat it as email and password authentication
      this.email = emailOrPublicKey;
      this.password = password;
      this.isUsingPublicKey = false;
      this.isInitialized = false;
    } else {
      // If password is not provided, treat it as public key authentication
      this.publicKey = emailOrPublicKey;
      this.isUsingPublicKey = true;
    }
     this.password = password;
     this.isValid = false;
     this.userData = null;
     this.isInitializing = false; // Flag to indicate initialization status
     this.initPromise = null; // Promise to track the initialization process

     // Call the 'initialize' method during object creation
    //  this.initialize();
  }

  

  // Method to initialize the user instance
  async initialize() {

    if (this.isInitialized) {
      return;
    }

    try {
      if (this.email && this.password) {
        this.userData = await this.authenticateUserWithEmailPassword();
      } else {
        this.userData = await this.authenticateUserWithPublicKey();
      }
      this.isValid = true;
      this.isInitialized = true;
    } catch (error) {
      console.error(error);
      throw error;
    }

    this.isInitialized = true;
  }

  // Method to authenticate a user with email and password
  async authenticateUserWithEmailPassword() {
    try {
      const data = await callApi('/extras/api/v1/authenticate_user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      });
      if (!data.public_api_key) {
        throw new Error('Please make sure you are connected to the internet, and ensure you are using the right public key');
      }
      this.publicKey = data.public_api_key;
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Method to authenticate a user with a public key
  async authenticateUserWithPublicKey() {
    try {
      if (!this.publicKey) {
        throw new Error('Public key not provided.');
      }

      const data = await callApi('/extras/api/v1/authenticate_user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.publicKey}`, 
        },
      });

      this.email = data.email;
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getStateData(state) {

    if (this.isInitialized) {
      return;
    } else {
      // Wait for initialization to complete before proceeding
      await this.initialize();
    }

     if (!this.isValid || !this.userData) {
        throw new Error('User instance not valid. Cannot call getStateData before user instance is successfully retrieved.');
     }

     try {
        const data = await callApi(`/extras/api/v1/states/${state}/data/`, {
          method: 'OPTIONS',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.publicKey}`,
          },
        });
        // console.log(data.cities[0].lgas);
        return data;
      } catch (error) {
        console.error(error);
        throw error
      }
  }
}

export default Zip;