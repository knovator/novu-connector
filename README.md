<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
<h3 align="center">@knovator/novu-connector</h3>

  <p align="center">
    `@knovator/novu-connector` is package built that register and login the user.
    <br />
    <a href="https://github.com/knovator/novu-connector"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/knovator/novu-connector">View Demo</a>
    ·
    <a href="https://github.com/knovator/novu-connector/issues">Report Bug</a>
    ·
    <a href="https://github.com/knovator/novu-connector/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#configuration">Configuration</a></li>
        <li><a href="#registering-user">Registering User</a></li>
        <li><a href="#login-user">Login User</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
`@knovator/novu-connector` is package built to add user to the admin organization and get user login token.

<p align="right">(<a href="#top">back to top</a>)</p>


### Built With

* [Axios](https://www.npmjs.com/package/axios)
* [Typescript](https://www.typescriptlang.org/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
To use this package you have to first setup your account on novu or on self hosted novu, and should be having your setup/admin credentials ready.

### Installation

1. Install NPM packages
   ```sh
   npm install @knovator/novu-connector
   # or
   yarn add @knovator/novu-connector
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

After successfully creating account and having `username` and `password` credentials we can start using it,

#### Configuration
- In app.js/main.js, you have to first configure package to use different baseURL,
  ```js
  const { setConfig } = require('@knovator/novu-connector');

  setConfig('http://localhost:3000', false);
  ```
- `setConfig` function accepts two parameters,
  - `baseUrl` - baseUrl to call the API
  - `log` - boolean to toggle logging in console

#### Registering User
- To new member to current member team, we can use `addUser` function
  ```js
  const { addUser } = require('@knovator/novu-connector');
  await addUser(
    { email: "admin@gmail.com", password: "admin1234" },
    { email: "johndoe@gmail.com", password: "johndoe123", role: "member", firstName: "John", lastName: "Doe"  }
  );
  ```
- first parameter indicates **admin** credentials
- second parameter indicates **new user** credentials, in which role can be `member` or `admin`

#### Login User
- To login the user, we can use `login` function
  ```js
  const { login } = require('@knovator/novu-connector');

  await login("johndoe@gmail.com", "johndoe123");
  ```
- Returns `{ token: '...' }` in case of credentials are correct.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Knovator Technologies
- Twitter [@knovator](https://twitter.com/knovator)
- Web [https://knovator.com/](https://knovator.com/)

Project Link: [https://github.com/knovator/novu-connector](https://github.com/knovator/novu-connector)

<p align="right">(<a href="#top">back to top</a>)</p>