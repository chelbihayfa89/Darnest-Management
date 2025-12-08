// ======================================================
// ✅ Utility Functions (LocalStorage + inputs + helpers)
// ======================================================

// Get input value by id
function getInpValue(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : "";
}

// Get parsed JSON array from localStorage
function getFromLS(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}

// Save data in localStorage as JSON
function setToLS(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Generate a unique numeric ID by finding the max ID + 1
function generateId(arr) {
  if (!arr || arr.length === 0) return 1;
  let max = arr[0]?.id || 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i]?.id > max) max = arr[i].id;
  }
  return max + 1;
}

// Search object in LS by id + key
function searchObjectByIdAndKey(id, key) {
  let T = getFromLS(key);
  return T.find((e) => e.id == id);
}

//  Validate a field with optional regex
function validateField(inputId, errId, regex = null, msgEmpty, msgRegex) {
  const value = getInpValue(inputId);
  const error = document.getElementById(errId);

  if (value === "") {
    error.textContent = msgEmpty;
    return false;
  }
  if (regex && !regex.test(value)) {
    error.textContent = msgRegex;
    return false;
  }

  error.textContent = ""; // clear previous error
  return true;
}

// Check if email already exists in LS (unicity)
function checkUnicity(email) {
  const usersArr = getFromLS("users");
  return !usersArr.some((user) => user?.email == email);
}

function validateSelect(selectId, errId, errMessage) {
  let select = document.getElementById(selectId);
  let err = document.getElementById(errId);
  if (select.value === "") {
    err.textContent = errMessage;
    return false;
  } else {
    err.textContent = "";
    return true;
  }
}

// -------------------------
//  SIGNUP CLIENT FUNCTION
// -------------------------

function signupClient() {
  // --- Inputs ---/
  const firstnameCl = getInpValue("firstnameCl");
  const lastnameCl = getInpValue("lastnameCl");
  const emailCl = getInpValue("emailCl");
  const passwordCl = getInpValue("passwordCl");
  const confirmPasswordCl = getInpValue("confirmPasswordCl");
  const phoneCl = getInpValue("phoneCl");
  const adrCl = getInpValue("adrCl");

  // --- Regex Patterns ---
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  const phoneRegex = /^[0-9]{8,15}$/;
  const addressRegex = /^[A-Za-z0-9À-ÖØ-öø-ÿ\s,.-]+$/;

  const usersArr = getFromLS("users");

  // --- Field Validations ---
  const isFirstnameValid = validateField(
    "firstnameCl",
    "err-firstnameCl",
    nameRegex,
    "Please enter your first name",
    "Only letters and spaces are allowed"
  );

  const isLastnameValid = validateField(
    "lastnameCl",
    "err-lastnameCl",
    nameRegex,
    "Please enter your last name",
    "Only letters and spaces are allowed"
  );

  const isEmailValid = validateField(
    "emailCl",
    "err-emailCl",
    emailRegex,
    "Please enter your email",
    "Invalid email format"
  );

  const isPasswordValid = validateField(
    "passwordCl",
    "err-passwordCl",
    passwordRegex,
    "Please enter a password",
    "Password must be at least 6 chars, with letters and numbers"
  );

  const isConfirmPasswordValid = validateField(
    "confirmPasswordCl",
    "err-confirmPasswordCl",
    null,
    "Please confirm your password"
  );

  const isPhoneValid = validateField(
    "phoneCl",
    "err-phoneCl",
    phoneRegex,
    "Please enter your phone number",
    "Phone must be 8-15 digits"
  );

  const isAddressValid = validateField(
    "adrCl",
    "err-adrCl",
    addressRegex,
    "Please enter your address",
    "Address contains invalid characters"
  );

  // Email uniqueness
  if (!checkUnicity(emailCl)) {
    document.getElementById("err-emailCl").textContent = "Email already in use";
  } else {
    document.getElementById("err-emailCl").textContent = "";
  }

  // Password confirmation
  if (passwordCl !== confirmPasswordCl) {
    document.getElementById("err-confirmPasswordCl").textContent =
      "Passwords do not match";
  }

  if (
    isFirstnameValid &&
    isLastnameValid &&
    isEmailValid &&
    checkUnicity(emailCl) &&
    isPasswordValid &&
    isConfirmPasswordValid &&
    isPhoneValid &&
    isAddressValid &&
    passwordCl === confirmPasswordCl
  ) {
    const user = {
      id: generateId(usersArr),
      firstName: firstnameCl,
      lastName: lastnameCl,
      phone: phoneCl,
      password: passwordCl,
      address: adrCl,
      email: emailCl,
      role: "client",
    };

    usersArr.push(user);
    setToLS("users", usersArr);
    location.replace("login.html");
  }
}

// -------------------------
//  SIGNUP OWNER FUNCTION
// -------------------------

function signupOwner() {
  // --- Inputs ---/
  const firstnameOw = getInpValue("firstnameOw");
  const lastnameOw = getInpValue("lastnameOw");
  const emailOw = getInpValue("emailOw");
  const passwordOw = getInpValue("passwordOw");
  const confirmPasswordOw = getInpValue("confirmPasswordOw");
  const phoneOw = getInpValue("phoneOw");
  const adrOw = getInpValue("adrOw");

  // --- Regex Patterns ---
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  const phoneRegex = /^[0-9]{8,15}$/;
  const addressRegex = /^[A-Za-z0-9À-ÖØ-öø-ÿ\s,.-]+$/;

  const usersArr = getFromLS("users");

  // --- Field Validations ---
  const isFirstnameValid = validateField(
    "firstnameOw",
    "err-firstnameOw",
    nameRegex,
    "Please enter your first name",
    "Only letters and spaces are allowed"
  );

  const isLastnameValid = validateField(
    "lastnameOw",
    "err-lastnameOw",
    nameRegex,
    "Please enter your last name",
    "Only letters and spaces are allowed"
  );

  const isEmailValid = validateField(
    "emailOw",
    "err-emailOw",
    emailRegex,
    "Please enter your email",
    "Invalid email format"
  );

  const isPasswordValid = validateField(
    "passwordOw",
    "err-passwordOw",
    passwordRegex,
    "Please enter a password",
    "Password must be at least 6 chars, with letters and numbers"
  );

  const isConfirmPasswordValid = validateField(
    "confirmPasswordOw",
    "err-confirmPasswordOw",
    null,
    "Please confirm your password"
  );

  const isPhoneValid = validateField(
    "phoneOw",
    "err-phoneOw",
    phoneRegex,
    "Please enter your phone number",
    "Phone must be 8-15 digits"
  );

  const isAddressValid = validateField(
    "adrOw",
    "err-adrOw",
    addressRegex,
    "Please enter your address",
    "Address contains invalid characters"
  );

  // Email uniqueness
  if (!checkUnicity(emailOw)) {
    document.getElementById("err-emailOw").textContent = "Email already in use";
  } else {
    document.getElementById("err-emailOw").textContent = "";
  }

  // Password confirmation
  if (passwordOw !== confirmPasswordOw) {
    document.getElementById("err-confirmPasswordOw").textContent =
      "Passwords do not match";
  }

  if (
    isFirstnameValid &&
    isLastnameValid &&
    isEmailValid &&
    checkUnicity(emailOw) &&
    isPasswordValid &&
    isConfirmPasswordValid &&
    isPhoneValid &&
    isAddressValid &&
    passwordOw === confirmPasswordOw
  ) {
    const user = {
      id: generateId(usersArr),
      firstName: firstnameOw,
      lastName: lastnameOw,
      phone: phoneOw,
      password: passwordOw,
      address: adrOw,
      email: emailOw,
      role: "owner",
      status: "not validated",
    };

    usersArr.push(user);
    setToLS("users", usersArr);
    location.replace("login.html");
  }
}

// -------------------------
//  LOGIN
// -------------------------

function login() {
  const enteredEmail = getInpValue("enteredEmail").trim();
  const enteredPassword = getInpValue("enteredPassword").trim();

  // Reset error messages
  document.getElementById("err-enteredEmail").textContent = "";
  document.getElementById("err-enteredPassword").textContent = "";
  document.getElementById("err-login").textContent = "";

  const usersArr = getFromLS("users");

  // Validation des champs
  if (!enteredEmail) {
    document.getElementById("err-enteredEmail").textContent =
      "Please enter your email";
    return;
  }
  if (!enteredPassword) {
    document.getElementById("err-enteredPassword").textContent =
      "Please enter your password";
    return;
  }

  // Recherche de l'utilisateur
  const foundUser = usersArr.find(
    (user) => user.email === enteredEmail && user.password === enteredPassword
  );

  if (!foundUser) {
    document.getElementById("err-login").textContent = "Please check again!";
    return; // Important pour ne pas continuer
  }

  // Stockage de l'utilisateur connecté
  localStorage.setItem("connectedUserId", foundUser.id);

  // Redirection selon le rôle
  switch (foundUser.role) {
    case "client":
      location.replace("houses.html");
      break;
    case "owner":
      if (foundUser.status === "validated") {
        location.replace("ownerDashboard.html");
      } else {
        document.getElementById("err-login").textContent =
          "Your account is pending validation by the admin. Please wait for approval.";
      }
      break;
    case "admin":
      location.replace("adminDashboard.html");
      break;
    default:
      document.getElementById("err-login").textContent = "Unknown role";
  }
}

// ======================================================
// ✅ Logout (clear user session)
// ======================================================

function logout() {
  localStorage.removeItem("connectedUserId");
  generateHeader();
}

// ======================================================
// ✅ Header Generator (dynamic navbar by role)
// ======================================================

function generateHeader() {
  const connectedUserId = Number(localStorage.getItem("connectedUserId"));
  const user = connectedUserId
    ? searchObjectByIdAndKey(connectedUserId, "users")
    : null;

  const brandHTML = `
    <a href="index.html" class="navbar-brand">
      <h1 class="m-0 text-primary text-uppercase">DARNEST</h1>
    </a>
  `;

  let navLinks = "";

  if (user) {
    switch (user.role) {
      case "client":
        navLinks = `
          <a href="index.html" class="nav-item nav-link">Home</a>
          <a href="houses.html" class="nav-item nav-link">GuestHouses</a>
          <a href="search.html" class="nav-item nav-link">Search</a>
          <a href="contact.html" class="nav-item nav-link">Contact</a>
          <a href="profile.html" class="nav-item nav-link">My Profile</a>
          <a href="cart.html" class="nav-item nav-link active">
            <i class="fas fa-cart-plus me-2"></i>My Reservations
          </a>`;
        break;
      case "owner":
        navLinks = `
          <a href="index.html" class="nav-item nav-link">Home</a>
          <a href="profile.html" class="nav-item nav-link">Profile</a>
          <a href="ownerDashboard.html" class="nav-item nav-link active">Dashboard</a>`;
        break;
      case "admin":
        navLinks = `
          <a href="index.html" class="nav-item nav-link">Home</a>
          <a href="profile.html" class="nav-item nav-link">Profile</a>
          <a href="adminDashboard.html" class="nav-item nav-link active">Dashboard</a>`;
        break;
    }
  } else {
    navLinks = `
      <a href="index.html" class="nav-item nav-link">Home</a>
      <a href="about.html" class="nav-item nav-link">About</a>
      <a href="houses.html" class="nav-item nav-link">GuestHouses</a>
      <a href="search.html" class="nav-item nav-link">Search</a>
      <a href="contact.html" class="nav-item nav-link">Contact</a>`;
  }

  const authLinks = user
    ? `
    <a href="index.html" class="nav-item nav-link" onclick="logout()" title="Log Out">
      <i class="fas fa-sign-out-alt" style="font-size:25px"></i>
    </a>
  `
    : `
    <a href="login.html" class="nav-item nav-link">LOGIN</a>
    <div class="nav-item dropdown">
      <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">SIGN UP</a>
      <div class="dropdown-menu">
        <a href="signupClient.html" class="dropdown-item">As Client</a>
        <a href="signupOwner.html" class="dropdown-item">As Owner</a>
      </div>
    </div>
  `;

  document.getElementById("header").innerHTML = `
    <div class="container-fluid bg-dark px-0">
      <div class="row gx-0">
        <div class="col-lg-3 bg-dark d-none d-lg-block">${brandHTML}</div>
        <div class="col-lg-9">
          <nav class="navbar navbar-expand-lg bg-dark navbar-dark p-3 p-lg-0">
            <div class="d-block d-lg-none">${brandHTML}</div>
            <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
              <div class="navbar-nav mr-auto py-0">${navLinks}</div>
              <div class="d-flex ms-auto">${authLinks}</div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  `;
}

// ======================================================
// ✅ Profile Display
// ======================================================

function displayProfile() {
  let connectedUserId = Number(localStorage.getItem("connectedUserId"));
  if (!connectedUserId) {
    console.log("No user connected");
    return;
  }
  let user = searchObjectByIdAndKey(connectedUserId, "users");
  if (user) {
    document.getElementById(
      "username"
    ).textContent = `${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}`;
    document.getElementById("userAdr").textContent = `${user.address}`;
    document.getElementById("userEmail").textContent = `${user.email}`;
    document.getElementById("userPhone").textContent = `${user.phone}`;
  } else {
    console.log("No user found in LS");
  }
}

// ======================================================
// ✅ Edit Profile
// ======================================================

function editProfile() {
  let connectedUserId = Number(localStorage.getItem("connectedUserId"));
  if (!connectedUserId) {
    console.log("no user connected");
  }
  let user = searchObjectByIdAndKey(connectedUserId, "users");
  let content = "";
  if (user) {
    content = `<div class="container">
    <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
        <h6 class="section-title text-center text-primary text-uppercase">Edit Your Profile</h6>
        <h1 class="mb-5"><span class="text-primary text-uppercase">Update</span> Information</h1>
    </div>

    <div class="row g-4 justify-content-center mb-5">
        <div class="col-md-6 d-flex">
            <div class="wow fadeInUp w-100" data-wow-delay="0.2s">
                <div class="row g-3">

                    <!-- Firstname -->
                    <div class="col-md-6">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="editFirstname" placeholder="First Name" value="${user.firstName}">
                            <label for="editFirstname">First Name</label>
                            <span id="err-editFirstname" class="text-danger small"></span>
                        </div>
                    </div>

                    <!-- Lastname -->
                    <div class="col-md-6">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="editLastname" placeholder="Last Name" value="${user.lastName}">
                            <label for="editLastname">Last Name</label>
                            <span id="err-editLastname" class="text-danger small"></span>
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="col-md-12">
                        <div class="form-floating">
                            <input type="email" class="form-control" id="editEmail" placeholder="Email" value="${user.email}">
                            <label for="editEmail">Email</label>
                            <span id="err-editEmail" class="text-danger small"></span>
                        </div>
                    </div>

                    <!-- Phone -->
                    <div class="col-12">
                        <div class="form-floating">
                            <input type="tel" class="form-control" id="editPhone" placeholder="Phone Number" value="${user.phone}">
                            <label for="editPhone">Phone Number</label>
                            <span id="err-editPhone" class="text-danger small"></span>
                        </div>
                    </div>

                    <!-- Address -->
                    <div class="col-12">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="editAddress" placeholder="Address" value="${user.address}">
                            <label for="editAddress">Address</label>
                            <span id="err-editAddress" class="text-danger small"></span>
                        </div>
                    </div>

                    <!-- Password -->
                    <div class="col-6">
                        <div class="form-floating">
                            <input type="password" class="form-control" id="editPassword" placeholder="Password">
                            <label for="editPassword">Password</label>
                            <span id="err-editPassword" class="text-danger small"></span>
                        </div>
                    </div>

                    <!-- Confirm Password -->
                    <div class="col-6">
                        <div class="form-floating">
                            <input type="password" class="form-control" id="editConfirmPassword" placeholder="Confirm Password">
                            <label for="editConfirmPassword">Confirm Password</label>
                            <span id="err-editConfirmPassword" class="text-danger small"></span>
                        </div>
                    </div>

                    <!-- Submit -->
                    <div class="col-6 d-flex justify-content-center mt-3 mx-auto">
                        <button class="btn btn-primary px-4 py-3"
                                type="submit"
                                id="validateEditProfile-btn"
                                onclick="validateEditProfile()">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`;
  } else {
    console.log("no user found in LS");
  }
  document.getElementById("editProfileForm").innerHTML = content;
}

function validateEditProfile() {
  let connectedUserId = Number(localStorage.getItem("connectedUserId"));
  let usersArr = getFromLS("users");
  let user = usersArr.find((u) => u.id == connectedUserId);

  // --- Regex Patterns ---
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  const phoneRegex = /^[0-9]{8,15}$/;
  const addressRegex = /^[A-Za-z0-9À-ÖØ-öø-ÿ\s,.-]+$/;

  let firstName = getInpValue("editFirstname");
  let lastName = getInpValue("editLastname");
  let email = getInpValue("editEmail");
  let phone = getInpValue("editPhone");
  let address = getInpValue("editAddress");
  let password = getInpValue("editPassword");
  let confirmPassword = getInpValue("editConfirmPassword");

  // --- Field Validations ---
  const isFirstnameValid = validateField(
    "editFirstname",
    "err-editFirstname",
    nameRegex,
    "Please enter your first name",
    "Only letters and spaces are allowed"
  );

  const isLastnameValid = validateField(
    "editLastname",
    "err-editLastname",
    nameRegex,
    "Please enter your last name",
    "Only letters and spaces are allowed"
  );

  const isEmailValid = validateField(
    "editEmail",
    "err-editEmail",
    emailRegex,
    "Please enter your email",
    "Invalid email format"
  );

  let isPasswordValidFinal = true;
  let isConfirmPasswordValidFinal = true;

  if (password || confirmPassword) {
    isPasswordValidFinal = validateField(
      "editPassword",
      "err-editPassword",
      passwordRegex,
      "Please enter a password",
      "Password must be at least 6 chars, with letters and numbers"
    );
    isConfirmPasswordValidFinal = validateField(
      "editConfirmPassword",
      "err-editConfirmPassword",
      null,
      "Please confirm your password"
    );
    // Password confirmation
    if (password !== confirmPassword) {
      document.getElementById("err-editConfirmPassword").textContent =
        "Passwords do not match";
      isConfirmPasswordValidFinal = false;
    } else {
      document.getElementById("err-editConfirmPassword").textContent = "";
    }
  } else {
    document.getElementById("err-editPassword").textContent = "";
    document.getElementById("err-editConfirmPassword").textContent = "";
  }

  const isPhoneValid = validateField(
    "editPhone",
    "err-editPhone",
    phoneRegex,
    "Please enter your phone number",
    "Phone must be 8-15 digits"
  );

  const isAddressValid = validateField(
    "editAddress",
    "err-editAddress",
    addressRegex,
    "Please enter your address",
    "Address contains invalid characters"
  );

  // Email uniqueness
  const isEmailUnique = !usersArr.some(
    (u) => u && u.email == email && u.id !== user.id
  );
  if (!isEmailUnique) {
    document.getElementById("err-editEmail").textContent =
      "Email already in use";
  } else {
    document.getElementById("err-editEmail").textContent = "";
  }

  // If all is valid
  if (
    isFirstnameValid &&
    isLastnameValid &&
    isEmailValid &&
    isEmailUnique &&
    isAddressValid &&
    isPhoneValid &&
    isPasswordValidFinal &&
    isConfirmPasswordValidFinal &&
    password == confirmPassword
  ) {
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phone = phone;
    user.address = address;
    if (password) {
      user.password = password;
    }
    setToLS("users", usersArr);
    displayProfile();
    document.getElementById("editProfileForm").style.display = "none";

    if (!user) {
      console.log("User not found!");
      return;
    }
  }
}

function roomsCount(houseId) {
  let roomsArr = getFromLS("rooms");
  return roomsArr.reduce(
    (acc, room) => (room.houseId == houseId ? acc + 1 : acc),
    0
  );
}

function displayHouses() {
  let housesArr = getFromLS("houses");
  let content = "";
  for (let i = 0; i < housesArr.length; i++) {
    content += `
    <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div class="room-item shadow rounded overflow-hidden">
                <div class="position-relative">
                  <img class="img-fluid" src="${housesArr[i].houseImg}" alt="${housesArr[i].houseName}" 
                  style="max-height: 300px; object-fit: cover; width: 100%;"/>
                  <small
                    class="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4"
                    >Starting From</small
                  >
                </div>
                <div class="p-4 mt-2">
                  <div class="mb-3">
                    <h5 class="mb-0">${housesArr[i].houseName}</h5>
                  </div>
                  <div class="mb-3">
                    <small class="border-end me-3 pe-3"
                      ><i class="fa fa-home text-primary me-2"></i>Rooms</small
                    >
                    <small class="border-end me-3 pe-3"
                      ><i class="fa fa-users text-primary me-2"></i>${housesArr[i].houseCapacity} Guests</small
                    >
                  </div>
                   <div class="mb-3">
                    <small class="border-end me-3 pe-3"
                      ><i class="fa fa-map-marker text-primary me-2"></i>${housesArr[i].houseCity}</small
                    >
                    <small class="border-end me-3 pe-3"
                      ><i class="fa fa-phone text-primary me-2"></i>${housesArr[i].housePhone}</small
                    >
                  </div>
                   <div class="mb-3">
                      <i class="fa fa-road text-primary me-2"></i>${housesArr[i].houseLocation}
                  </div>
                  <p class="text-body mb-3">
                  ${housesArr[i].houseDescription}
                  </p>
                  <div class="d-flex justify-content-center">
                    <a class="btn btn-sm btn-primary rounded py-2 px-4" href="#" onclick= "goToDisplayRooms(${housesArr[i].id})"
                      >View Rooms</a
                    >
                  </div>
                </div>
              </div>
            </div>`;
  }
  document.getElementById("displayedHouses").innerHTML = content;
}

function displayRoomsForSelectedHouse() {
  let displayedHouseId = localStorage.getItem("displayedHouseId");
  let roomsArr = getFromLS("rooms");
  let roomsForThisHouseArr = roomsArr.filter(
    (r) => r.houseId == displayedHouseId
  );

  let content = "";

  if (roomsForThisHouseArr.length == 0) {
    content = `
      <div class="text-center text-muted py-5">
        <p>No rooms available for this guesthouse yet.</p>
      </div>`;
  } else {
    roomsForThisHouseArr.forEach((room) => {
      content += `
        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
          <div class="room-item shadow rounded overflow-hidden">
            <div class="position-relative">
              <img class="img-fluid" src="${room.roomImg}" 
                style="max-height: 300px; object-fit: cover; width: 100%;" />
              <small
                class="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4"
              >
                ${room.roomPrice} TND/Person
              </small>
            </div>

            <div class="p-4 mt-2">
              <div class="mb-3">
                <h5 class="mb-0">${room.roomName}</h5>
                <small class="text-muted">${room.roomType}</small>
              </div>

              <div class="mb-3">
                <small>
                  <i class="fa fa-users text-primary me-2"></i>
                  ${room.roomCapacity} Guests
                </small>
              </div>

              <div class="d-flex justify-content-center">
                <a
                  class="btn btn-sm btn-primary rounded py-2 px-4"
                  href="#"
                  onclick="goToDisplayRoomDetails(${room.id})"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>`;
    });
  }

  document.getElementById("displayedRooms").innerHTML = content;
}

function goToDisplayRoomDetails(roomId) {
  localStorage.setItem("selectedRoomId", roomId);
  location.replace("roomDetails.html");
}

function displaySelectedRoomDetails() {
  let selectedRoomId = localStorage.getItem("selectedRoomId");
  let roomsArr = getFromLS("rooms");
  let selectedRoom = roomsArr.find((r) => r.id == selectedRoomId);

  const serviceIcons = {
    Wifi: '<i class="fa fa-wifi text-primary me-2"></i>',
    AC: '<i class="fa fa-snowflake-o text-primary me-2"></i>',
    TV: '<i class="fa fa-tv text-primary me-2"></i>',
    "Room Services": '<i class="fa fa-bell text-primary me-2"></i>',
    Kitchenette: '<i class="fa fa-utensils  text-primary me-2"></i>',
    Bathtub: '<i class="fa fa-bath text-primary me-2"></i>',
  };

  let content = "";

  if (!selectedRoom) {
    content = `<div class="text-center text-muted py-5">
      <p>Room not found.</p>
    </div>`;
  } else {
    let rServices = `${selectedRoom.roomServices
      .map(
        (s) =>
          `<span class="d-inline-block me-3 mb-2">${
            serviceIcons[s] || ""
          }${s}<span/>`
      )
      .join("")}`;
    content = `<div class="container-xxl py-5 px-0 wow zoomIn" data-wow-delay="0.1s">
            <div class="row g-0">
                <div class="col-md-6 bg-dark d-flex align-items-center">
                    <div class="p-5">
                        <h6 class="section-title text-start text-white text-uppercase mb-3">${selectedRoom.roomType}</h6>
                        <h1 class="text-white mb-4">${selectedRoom.roomName}</h1>
                        <p class="text-white mb-4">${selectedRoom.roomDescription}</p>
                        <h4 class="text-warning mb-4">${selectedRoom.roomPrice} TND / Person</h4>
                        
                        <div class="text-white mb-3 d-flex">
                           <small class="me-3">
                           <i class="fa fa-users text-primary me-2"></i>
                           ${selectedRoom.roomCapacity} Guests
                           </small>
                           <i class="fa fa-bed text-primary me-2"></i>
                           ${selectedRoom.numBeds} Beds
                        </div>
                        
                        <p>${rServices}</p>
                        <button type="button" class="btn btn-light py-md-3 px-md-5" onclick="goToDisplayBooking(${selectedRoom.id})">Book A Room</button>
                    </div>
                </div>
                <div class="col-md-6">
                    <img src="${selectedRoom.roomImg}" alt="${selectedRoom.roomName}" style="object-fit: cover; width: 100%; height: 100%"/>
                </div>
            </div>
        </div>`;
  }
  document.getElementById("selectedRoomDetails").innerHTML = content;
}

function goToDisplayBooking(roomId) {
  localStorage.setItem("roomIdForBooking", roomId);
  location.replace("booking.html");
}

function checkRoomAv(roomId, checkinBooking, checkoutBooking) {
  let reservationsArr = getFromLS("reservations");
  let roomReservations = reservationsArr.filter((res) => res.roomId == roomId);
  if (roomReservations.length == 0) {
    return true;
  }
  for (let res of roomReservations) {
    let existingCheckin = new Date(res.checkinBooking);
    let existingCheckout = new Date(res.checkoutBooking);
    if (
      checkinBooking < existingCheckout &&
      checkoutBooking > existingCheckin
    ) {
      return false;
    }
  }
  return true;
}

function booking(event) {
  if (event) event.preventDefault();

  let roomId = localStorage.getItem("roomIdForBooking");
  let connectedUserId = localStorage.getItem("connectedUserId");

  let usersArr = getFromLS("users");
  let roomsArr = getFromLS("rooms");
  let reservationsArr = getFromLS("reservations");

  let user = usersArr.find((u) => u.id == connectedUserId);
  let room = roomsArr.find((r) => r.id == roomId);
  console.log(room);

  // Récupération des valeurs
  let firstname = document.getElementById("bookingFirstname").value;
  let lastname = document.getElementById("bookingLastname").value;
  let email = document.getElementById("bookingEmail").value;
  let checkinStr = document.getElementById("bookingCheckin").value;
  let checkoutStr = document.getElementById("bookingCheckout").value;
  let adult = Number(document.getElementById("bookingAdult").value);
  let child = Number(document.getElementById("bookingChild").value);

  let checkinBooking = checkinStr ? new Date(checkinStr) : null;
  let checkoutBooking = checkoutStr ? new Date(checkoutStr) : null;

  let totalGuests = adult + child;
  let nights =
    checkoutBooking && checkinBooking
      ? (checkoutBooking - checkinBooking) / (1000 * 60 * 60 * 24)
      : 0;
  let totalPrice = totalGuests * Number(room.roomPrice) * Number(nights);
  console.log(totalGuests, totalPrice, nights);

  // Spans d'erreur
  let errEmail = document.getElementById("err-emailBooking");
  let errCheckin = document.getElementById("err-checkinBooking");
  let errCapacity = document.getElementById("err-capacityBooking");

  // Regex
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validations
  let isFirstnameValid = validateField(
    "bookingFirstname",
    "err-fnameBooking",
    nameRegex,
    "Please enter your first name",
    "Only letters and spaces are allowed"
  );

  let isLastnameValid = validateField(
    "bookingLastname",
    "err-lnameBooking",
    nameRegex,
    "Please enter your last name",
    "Only letters and spaces are allowed"
  );

  let isEmailValid = validateField(
    "bookingEmail",
    "err-emailBooking",
    emailRegex,
    "Please enter your email",
    "Invalid email format"
  );

  if (isEmailValid && user.email !== email) {
    errEmail.innerHTML = "This email does not match your account email.";
    isEmailValid = false;
  }

  let isAdultSelected = validateSelect(
    "bookingAdult",
    "err-adultBooking",
    "Please select adult."
  );

  let isDateValid = true;

  let today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!checkoutBooking || !checkinBooking) {
    errCheckin.innerHTML = "Please enter check-in and check-out dates.";
    isDateValid = false;
  } else if (checkoutBooking <= checkinBooking) {
    errCheckin.innerHTML = "Check-out must be after check-in.";
    isDateValid = false;
  } else if (checkinBooking < today) {
    errCheckin.innerHTML = "Check-in date cannot be in the past.";
  } else {
    errCheckin.innerHTML = "";
  }

  let isRoomAvailable = checkRoomAv(roomId, checkinBooking, checkoutBooking);
  if (!isRoomAvailable) {
    errCheckin.innerHTML = "This room is not available for the selected dates.";
    return;
  }
  let isCapacityValid = totalGuests <= Number(room.roomCapacity);
  if (!isCapacityValid) {
    errCapacity.innerHTML = "Number of guests exceeds room capacity.";
  } else {
    errCapacity.innerHTML = "";
  }
  if (
    isFirstnameValid &&
    isLastnameValid &&
    isCapacityValid &&
    isDateValid &&
    isEmailValid &&
    isRoomAvailable &&
    isAdultSelected
  ) {
    let reservation = {
      id: generateId(reservationsArr),
      roomId: roomId,
      clientId: connectedUserId,
      clientFname: firstname,
      clientLname: lastname,
      clientEmail: email,
      totalPrice: totalPrice,
      numGuests: totalGuests,
      checkinBooking: checkinBooking,
      checkoutBooking: checkoutBooking,
    };
    reservationsArr.push(reservation);
    setToLS("reservations", reservationsArr);
    location.replace("cart.html");
  }
  console.log("totalGuests:", totalGuests, typeof totalGuests);
  console.log("room.capacity:", room.roomCapacity, typeof room.roomCapacity);
}

function clientReservations() {
  let connectedUserId = localStorage.getItem("connectedUserId");
  let usersArr = getFromLS("users");
  let reservationsArr = getFromLS("reservations");
  let user = usersArr.find((u) => u.id == connectedUserId);

  let content = "";
  let clientReservations = reservationsArr.filter(
    (res) => res.clientId == connectedUserId
  );
  if (clientReservations && clientReservations.length == 0) {
    content = `
    <tr>
        <th scope="row" colspan="10">No reservations found!</th>
      </tr>`;
  } else {
    clientReservations.forEach((res) => {
      let room = searchObjectByIdAndKey(res.roomId, "rooms");
      let house = searchObjectByIdAndKey(
        searchObjectByIdAndKey(res.roomId, "rooms").houseId,
        "houses"
      );
      content += `
      <tr>
        <td>${room.roomName}}</td>
        <td>${house.houseName}</td>
        <td>${room.roomPrice} DT</td>
        <td>${user.firstName} ${user.lastName}</td>
        <td>${res.numGuests}</td>
        <td>${new Date(res.checkinBooking).toLocaleDateString("fr-FR")}</td>
        <td>${new Date(res.checkoutBooking).toLocaleDateString("fr-FR")}</td>
        <td>${res.totalPrice} DT</td>
        <td><button type="button" class="btn btn-danger btn-sm" onclick="deleteClientReservation(${
          res.id
        })">
                <i class="fa fa-trash text-center text-light" title="Delete Reservation"></i>
            </button>
        </td>
      </tr>      
      `;
    });
  }
  document.getElementById("clientReservations").innerHTML = content;
}

function deleteClientReservation(reservationId) {
  let reservationsArr = getFromLS("reservations");
  let pos = reservationsArr.findIndex((res) => res.id == reservationId);
  if (pos == -1) {
    console.log("No reservation found with thid Id");
  } else {
    reservationsArr.splice(pos, 1);
    setToLS("reservations", reservationsArr);
    location.reload();
  }
}

// ======================================================
// ✅ Dashboard Owner
// ======================================================

function addHouseByOwner() {
  const ownerId = localStorage.getItem("connectedUserId");
  let housesArr = getFromLS("houses");

  const houseName = getInpValue("houseName");
  const housePhone = getInpValue("housePhone");
  const houseCity = getInpValue("houseCity");
  const houseLocation = getInpValue("houseLocation");
  const houseCapacity = getInpValue("houseCapacity");
  const houseDescription = getInpValue("houseDescription");

  const houseNameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s'-]{3,50}$/;
  const housePhoneRegex = /^[0-9]{8,15}$/;
  const houseCityRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s-]{2,30}$/;
  const houseLocationRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s,.-]{3,100}$/;
  const houseDescriptionRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s.,;:'"!?()%-]{10,100}$/;
  const houseCapacityRegex = /^(?:[1-9]|[1-9][0-9]|100)$/;

  // 🔹 Validation de l'image ici
  const imgHouseUploadInp = document.getElementById("imgHouseUpload");
  const file = imgHouseUploadInp.files[0];
  const errMsg = document.getElementById("err-imgHouseUpload");
  const previewImg = document.getElementById("preview");

  if (!ownerId) {
    alert("Please log in first!");
    window.location.href = "login.html";
    return;
  }
  
  if (!file) {
    errMsg.textContent = "Please upload an image of the guesthouse";
    previewImg.src = "";
    return;
  } else {
    errMsg.textContent = "";
  }

  // 🔹 Validation des autres champs
  const isHouseNameValid = validateField(
    "houseName",
    "err-houseName",
    houseNameRegex,
    "Please enter house name",
    "Only letters and spaces are allowed"
  );
  const isHousePhoneValid = validateField(
    "housePhone",
    "err-housePhone",
    housePhoneRegex,
    "Please enter house phone number",
    "Phone must be 8–15 digits"
  );
  const isHouseCityValid = validateField(
    "houseCity",
    "err-houseCity",
    houseCityRegex,
    "Please enter city",
    "City must be 2–30 characters long"
  );
  const isHouseLocationValid = validateField(
    "houseLocation",
    "err-houseLocation",
    houseLocationRegex,
    "Please enter location",
    "Location must be 3–100 characters long"
  );
  const isHouseDescValid = validateField(
    "houseDescription",
    "err-houseDescription",
    houseDescriptionRegex,
    "Please enter description",
    "Description must be 10–100 characters long"
  );
  const isHouseCapacityValid = validateField(
    "houseCapacity",
    "err-houseCapacity",
    houseCapacityRegex,
    "Please enter capacity",
    "Capacity must be between 1 and 100 guests."
  );

  if (
    isHouseNameValid &&
    isHouseCityValid &&
    isHouseDescValid &&
    isHouseLocationValid &&
    isHousePhoneValid &&
    isHouseCapacityValid
  ) {
    // 🔹 Lecture du fichier image (FileReader) ici
    const reader = new FileReader();
    reader.onload = function () {
      const imgHouseUrl = reader.result;
      previewImg.src = imgHouseUrl;

      const house = {
        id: generateId(housesArr),
        ownerId: ownerId,
        houseName: houseName,
        housePhone: housePhone,
        houseCity: houseCity,
        houseLocation: houseLocation,
        houseDescription: houseDescription,
        houseCapacity: houseCapacity,
        houseImg: imgHouseUrl,
      };

      housesArr.push(house);
      setToLS("houses", housesArr);
      localStorage.setItem("houseId", house.id);
      alert("House added successfully!");
      location.replace("addRoomByOwner.html");
    };
    reader.readAsDataURL(file);
  }
}

function checkAddMax(houseId) {
  let roomsArr = getFromLS("rooms");
  let roomsForThisHouse = roomsArr.filter((r) => r.houseId == houseId);
  return roomsForThisHouse.length >= 5;
}

function addRoomByOwner() {
  let roomsArr = getFromLS("rooms") || [];
  let houseId = localStorage.getItem("houseId");
  let errBtn = document.getElementById("err-addRoomByOwner-btn");

  const ownerId = localStorage.getItem("connectedUserId");

  // Regex
  const roomNameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s'-]{3,50}$/;
  const roomPriceRegex = /^(1000|[1-9][0-9]{2})$/;
  const roomDescriptionRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s.,;:'"!?()%-]{10,200}$/;
  const numBedsRegex = /^[1-5]$/;
  const roomCapacityRegex = /^[1-5]$/;

  // Inputs
  const roomName = getInpValue("roomName");
  const roomPrice = getInpValue("roomPrice");
  const roomType = getInpValue("roomType");
  const roomCapacity = getInpValue("roomCapacity");
  const numBeds = getInpValue("numBeds");
  const roomDescription = getInpValue("roomDescription");

  const imgRoomUpload = document.getElementById("imgRoomUpload");
  const previewImg = document.getElementById("previewRoom");
  const file = imgRoomUpload.files[0];

  // Services (checkbox)
  const checkboxes = document.querySelectorAll('input[name="options"]:checked');
  let services = [];
  checkboxes.forEach((cb) => services.push(cb.value));

  if (!ownerId) {
  alert("Please log in first!");
  window.location.href = "login.html";
  return;
}

  // --- Validation de l'image ---
  if (!file) {
    previewImg.src = "";
    document.getElementById("err-imgRoomUpload").textContent =
      "Please upload a room image.";
    return;
  } else {
    document.getElementById("err-imgRoomUpload").textContent = "";
  }

  // Vérifier nombre max de chambres
  if (houseId && checkAddMax(houseId)) {
    errBtn.textContent = "You cannot add more than 5 rooms for this house!";
    return;
  } else {
    errBtn.textContent = "";
  }

  // Validation des autres champs
  const isRoomNameValid = validateField(
    "roomName",
    "err-roomName",
    roomNameRegex,
    "Please enter room name",
    "Only letters and spaces are allowed"
  );
  const isRoomPriceValid = validateField(
    "roomPrice",
    "err-roomPrice",
    roomPriceRegex,
    "Please enter price",
    "The room price must be between 100 and 1000 TND."
  );
  const isRoomDescValid = validateField(
    "roomDescription",
    "err-roomDescription",
    roomDescriptionRegex,
    "Please enter description",
    "Description must be 10–200 characters long"
  );
  const isRoomCapacityValid = validateField(
    "roomCapacity",
    "err-roomCapacity",
    roomCapacityRegex,
    "Please enter capacity",
    "The room capacity must be between 1 and 5"
  );
  const isNumBedsValid = validateField(
    "numBeds",
    "err-numBeds",
    numBedsRegex,
    "Please enter number of beds",
    "Please enter a number between 1 and 5."
  );
  const isRoomTypeValid = validateSelect(
    "roomType",
    "err-roomType",
    "Please select room type"
  );

  // --- Si tout est valide, créer la chambre ---
  if (
    isRoomNameValid &&
    isRoomPriceValid &&
    isRoomCapacityValid &&
    isRoomDescValid &&
    isNumBedsValid &&
    isRoomTypeValid
  ) {
    const reader = new FileReader();
    reader.onload = function () {
      const imgRoomUrl = reader.result;

      // Afficher le preview
      previewImg.src = imgRoomUrl;

      // Créer l’objet room et le sauvegarder
      const room = {
        id: generateId(roomsArr),
        houseId: houseId,
        roomName: roomName,
        roomType: roomType,
        roomDescription: roomDescription,
        roomPrice: roomPrice,
        roomCapacity: roomCapacity,
        roomServices: services,
        numBeds: numBeds,
        roomImg: imgRoomUrl,
      };

      roomsArr.push(room);
      setToLS("rooms", roomsArr);

      // Reset du formulaire et du preview
      document.getElementById("addRoomForm")?.reset();
      previewImg.src = "";
      alert("Room added successfully!");
    };
    reader.readAsDataURL(file);
  }
}

function goToDisplayRooms(houseId) {
  localStorage.setItem("displayedHouseId", houseId);
  location.replace("rooms.html");
}

function displayHousesByOwner() {
  let ownerId = localStorage.getItem("connectedUserId");
  let housesArr = getFromLS("houses");
  let ownerHousesArr = housesArr.filter((h) => h.ownerId == ownerId);
  let content = ``;

  if (!ownerId) {
    alert("Please log in first!");
    window.location.href = "login.html";
    return;
  }

  if (ownerHousesArr.length === 0) {
    content += `
      <p class="text-muted text-center">No houses found. Click "Add House" to create one.</p>
    `;
  } else {
    ownerHousesArr.forEach((house) => {
      content += `
        <tr>
          <td>${house.houseName}</td>
          <td>
            <img src="${house.houseImg}" class="img-thumbnail" alt="${
        house.houseName
      }"
            style="width: 150px; height: auto; object-fit: cover; border-radius: 10px;">
          </td>
          <td>${house.housePhone}</td>
          <td>${house.houseCity}</td>
          <td>${roomsCount(house.id)}</td>
          <td class="d-flex">
            <button type="button" class="btn btn-success btn-sm me-2" onclick="goToAddRoom(${
              house.id
            })">
              <i class="fa fa-plus text-center text-light" title="Add Room"></i>
            </button>
            <button type="button" class="btn btn-primary btn-sm me-2" onclick="editHouseByOwner(${
              house.id
            })">
              <i class="fa fa-edit text-center text-light" title="Edit House"></i>
            </button>
            <button type="button" class="btn btn-danger btn-sm" onclick="deleteHouseByOwner(${
              house.id
            })">
              <i class="fa fa-trash text-center text-light" title="Delete House"></i>
            </button>
          </td>
        </tr>
      `;
    });
  }

  let addHouseContent = `
    <tr>
      <td colspan="7" class="text-center">
        <button type="button" class="btn btn-success mt-3" onclick="goToAddHouse()">
          <i class="fa fa-plus text-center text-light"></i> ADD HOUSE
        </button>
      </td>
    </tr>
  `;

  document.getElementById("housesOwnerDashboard").innerHTML =
    content + addHouseContent;
}

function goToAddHouse() {
  location.replace("addHouseByOwner.html");
}

function goToAddRoom(houseId) {
  localStorage.setItem("houseId", houseId);
  location.replace("addRoomByOwner.html");
}

function editHouseByOwner(houseId) {
  let housesArr = getFromLS("houses");
  const ownerId = localStorage.getItem("connectedUserId");
  let content = "";
  let foundHouse = housesArr.find((h) => h.id == houseId);

  if (!ownerId) {
    alert("Please log in first!");
    window.location.href = "login.html";
    return;
  }

  if (!foundHouse || foundHouse.ownerId !== ownerId) {
    alert("You cannot edit this house!");
    return;
  }

  if (foundHouse) {
    content = `<div class="container-xxl bg-white p-0">

      <!-- Edit Guesthouse Start -->
      <div class="container-xxl py-5">
        <div class="container">
          <div class="text-center mb-5">
            <h6 class="section-title text-primary text-uppercase">Guesthouse Details</h6>
            <h1 class="mb-3"><span class="text-primary">Edit</span> Guesthouse</h1>
          </div>

          <div class="row justify-content-center">
            <div class="col-md-6">
              <div class="row g-3">
                
                     <!-- Name -->
<div class="col-md-12">
  <div class="form-floating">
    <input type="text" class="form-control" id="editHouseNameO" placeholder="Guesthouse Name" value="${foundHouse.houseName}"/>
    <label for="editHouseNameO">Guesthouse Name</label>
    <span id="err-editHouseNameO" class="text-danger small"></span>
  </div>
</div>

<!-- Phone -->
<div class="col-md-12">
  <div class="form-floating">
    <input type="tel" class="form-control" id="editHousePhoneO" placeholder="Phone" value="${foundHouse.housePhone}"/>
    <label for="editHousePhoneO">Phone</label>
    <span id="err-editHousePhoneO" class="text-danger small"></span>
  </div>
</div>

<!-- City -->
<div class="col-md-12">
  <div class="form-floating">
    <input type="text" class="form-control" id="editHouseCityO" placeholder="City" value="${foundHouse.houseCity}" />
    <label for="editHouseCityO">City</label>
    <span id="err-editHouseCityO" class="text-danger small"></span>
  </div>
</div>

<!-- Location -->
<div class="col-md-12">
  <div class="form-floating">
    <input type="text" class="form-control" id="editHouseLocationO" placeholder="Location" value="${foundHouse.houseLocation}"/>
    <label for="editHouseLocationO">Location</label>
    <span id="err-editHouseLocationO" class="text-danger small"></span>
  </div>
</div>

<!-- Capacity -->
<div class="col-md-12">
  <div class="form-floating">
    <input type="number" class="form-control" id="editHouseCapacityO" placeholder="Capacity" value="${foundHouse.houseCapacity}"/>
    <label for="editHouseCapacityO">Capacity</label>
    <span id="err-editHouseCapacityO" class="text-danger small"></span>
  </div>
</div>

<!-- Description -->
<div class="col-md-12">
  <div class="form-floating">
    <textarea id="editHouseDescriptionO" class="form-control" style="height: 100px">${foundHouse.houseDescription}</textarea>
    <label for="editHouseDescriptionO">Description</label>
    <span id="err-editHouseDescriptionO" class="text-danger small"></span>
  </div>
</div>

<!-- Image -->
<div class="col-md-12">
  <div class="form-floating">
    <input type="file" class="form-control" id="editImgHouseUploadO" accept="image/*" />
    <label for="editImgHouseUploadO">Change Photo</label>
    <img src="${foundHouse.houseImg}" alt="preview" id="editPreviewO" style="width:200px; display:block; margin-top:10px" />
    <span id="err-editImgHouseUploadO" class="text-danger small"></span>
  </div>
</div>

<!-- Submit -->
<div class="col-md-12">
  <button class="btn btn-primary w-100 py-3" type="button" id="editHouseByOwnerBtnO" onclick="validateEditHouseByOwner(${foundHouse.id})">
    Save Changes
  </button>
</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Edit Guesthouse End -->
    </div>`;
  }
  document.getElementById("editHouseByOwner").innerHTML = content;
}

function validateEditHouseByOwner(houseId) {
  let housesArr = getFromLS("houses");
  let foundHouse = housesArr.find((h) => h.id == houseId);

  // Inputs
  let name = getInpValue("editHouseNameO");
  let phone = getInpValue("editHousePhoneO");
  let city = getInpValue("editHouseCityO");
  let location = getInpValue("editHouseLocationO");
  let capacity = getInpValue("editHouseCapacityO");
  let description = getInpValue("editHouseDescriptionO");

  // Regex
  const houseNameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s'-]{3,50}$/;
  const housePhoneRegex = /^[0-9]{8,15}$/;
  const houseCityRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s-]{2,30}$/;
  const houseLocationRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s,.-]{3,100}$/;
  const houseDescriptionRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s.,;:'"!?()%-]{10,100}$/;
  const houseCapacityRegex = /^(?:[1-9]|[1-9][0-9]|100)$/;

  // Img
  let imgInput = document.getElementById("editImgHouseUploadO");
  let preview = document.getElementById("editPreviewO");
  let oldHouseImg = foundHouse.houseImg;

  // Validation
  const isNameValid = validateField(
    "editHouseNameO",
    "err-editHouseNameO",
    houseNameRegex,
    "Please enter the guesthouse name",
    "Only letters and spaces are allowed (3–50 chars)"
  );

  const isPhoneValid = validateField(
    "editHousePhoneO",
    "err-editHousePhoneO",
    housePhoneRegex,
    "Please enter a phone number",
    "Phone number must contain exactly 8 digits"
  );

  const isCityValid = validateField(
    "editHouseCityO",
    "err-editHouseCityO",
    houseCityRegex,
    "Please enter the city name",
    "Invalid city name (letters only)"
  );

  const isLocationValid = validateField(
    "editHouseLocationO",
    "err-editHouseLocationO",
    houseLocationRegex,
    "Please enter the location",
    "Location must be between 3 and 100 characters"
  );

  const isCapacityValid = validateField(
    "editHouseCapacityO",
    "err-editHouseCapacityO",
    houseCapacityRegex,
    "Please enter capacity",
    "Capacity must be a number greater than 0"
  );

  const isDescriptionValid = validateField(
    "editHouseDescriptionO",
    "err-editHouseDescriptionO",
    houseDescriptionRegex,
    "Please enter a description",
    "Description must be between 10 and 200 characters"
  );
  if (
    isNameValid &&
    isCityValid &&
    isDescriptionValid &&
    isLocationValid &&
    isPhoneValid &&
    isCapacityValid
  ) {
    foundHouse.houseName = name;
    foundHouse.houseCity = city;
    foundHouse.houseCapacity = capacity;
    foundHouse.houseLocation = location;
    foundHouse.housePhone = phone;
    foundHouse.houseDescription = description;

    if (imgInput.files && imgInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function () {
        preview.src = reader.result;
        foundHouse.houseImg = reader.result;
        setToLS("houses", housesArr);
      };
      reader.readAsDataURL(imgInput.files[0]);
    } else {
      foundHouse.houseImg = oldHouseImg;
      setToLS("houses", housesArr);
    }
  }
}

function deleteHouseByOwner(houseId) {
  let housesArr = getFromLS("houses");
  const ownerId = localStorage.getItem("connectedUserId");
  let pos = housesArr.findIndex((h) => h.id === houseId);

  if (!ownerId) {
    alert("Please log in first!");
    window.location.href = "login.html";
    return;
  }

  if (pos === -1) {
    console.log("No house found with this Id");
  } else {
    updateRelatedRoomsAndReservations(houseId);
    housesArr.splice(pos, 1);
    setToLS("houses", housesArr);
    displayHousesByOwner();
  }
}

function updateRelatedRoomsAndReservations(houseId) {
  let roomsArr = getFromLS("rooms");
  let reservationsArr = getFromLS("reservations");

  let relatedRooms = roomsArr.filter((r) => r.houseId === houseId);
  let relatedRoomsIds = relatedRooms.map((r) => r.id);

  reservationsArr = reservationsArr.filter(
    (res) => !relatedRoomsIds.includes(res.roomId)
  );
  roomsArr = roomsArr.filter((r) => r.houseId !== houseId);
  setToLS("rooms", roomsArr);
  setToLS("reservations", reservationsArr);
}

function displayRoomsByOwner() {
  let ownerId = localStorage.getItem("connectedUserId");
  let housesArr = getFromLS("houses");
  let roomsArr = getFromLS("rooms");
  let ownerRoomsArr = [];
  let content = "";
  let ownerHousesArr = housesArr.filter((h) => h.ownerId == ownerId);

  if (!ownerId) {
    alert("Please log in first!");
    window.location.href = "login.html";
    return;
  }

  for (let i = 0; i < roomsArr.length; i++) {
    for (let j = 0; j < ownerHousesArr.length; j++) {
      if (roomsArr[i].houseId == ownerHousesArr[j].id) {
        ownerRoomsArr.push(roomsArr[i]);
      }
    }
  }
  if (ownerRoomsArr.length > 0) {
    for (let i = 0; i < ownerRoomsArr.length; i++) {
      content += `
    <tr>
        <td>${ownerRoomsArr[i].roomName}</td>
        <td>
        <img src="${ownerRoomsArr[i].roomImg}" class="img-thumbnail" alt="${
        ownerRoomsArr[i].roomName
      }"
        style="width: 150px; height: auto">
        </td>
        <td>${
          searchObjectByIdAndKey(ownerRoomsArr[i].houseId, "houses").houseName
        }</td>
        <td>${ownerRoomsArr[i].roomPrice} TND</td>
        <td>${ownerRoomsArr[i].roomType}</td>
        <td>${ownerRoomsArr[i].numBeds}</td>
        <td>${ownerRoomsArr[i].roomCapacity}</td>
        <td class="d-flex">
            <button type="button" class="btn btn-primary btn-sm me-2" onclick="editRoomByOwner(${
              ownerRoomsArr[i].id
            })">
                <i class="fa fa-edit text-center text-light" title="Edit Room"></i>
            </button>
            <button type="button" class="btn btn-danger btn-sm" onclick="deleteRoomByOwner(${
              ownerRoomsArr[i].id
            })">
                <i class="fa fa-trash text-center text-light" title="Delete Room"></i>
            </button>
        </td>
      </tr>
    `;
    }
    document.getElementById("roomsOwnerDashboard").innerHTML = content;
  } else {
    document.getElementById("roomsOwnerDashboard").innerHTML = `
      <tr>
        <td colspan="9" class="text-center text-muted py-4">
          No rooms found.
        </td>
      </tr>
    `;
  }
}

function editRoomByOwner(roomId) {
  let roomsArr = getFromLS("rooms");
  let foundRoom = roomsArr.find((r) => r.id == roomId);
  let ownerId = localStorage.getItem("connectedUserId")
  let content;

  if (!ownerId) {
    alert("Please log in first!");
    window.location.href = "login.html";
    return;
  }
  if (foundRoom) {
    content = `<div class="container">
  <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
    <h6 class="section-title text-center text-primary text-uppercase">
      Edit Room
    </h6>
    <h1 class="mb-5">
      <span class="text-primary text-uppercase">Update</span> Room Details
    </h1>
  </div>

  <div class="row g-4 justify-content-center mb-5">
    <div class="col-md-6 d-flex">
      <div class="wow fadeInUp" data-wow-delay="0.2s">
        <div>
          <div class="row g-3">
            <!-- Hidden Room ID -->
            <input type="hidden" id="editRoomId" />

            <!-- Name -->
            <div class="col-md-12">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  id="editRoomNameO"
                  placeholder="Room Name"
                  value="${foundRoom.roomName}"
                />
                <label for="editRoomNameO">Room Name</label>
                <span id="err-editRoomNameO" class="text-danger small"></span>
              </div>
            </div>

            <!-- Price -->
            <div class="col-md-6">
              <div class="form-floating">
                <input
                  type="number"
                  class="form-control"
                  id="editRoomPriceO"
                  placeholder="Price"
                  value="${foundRoom.roomPrice}"
                />
                <label for="editRoomPriceO">Price</label>
                <span id="err-editRoomPriceO" class="text-danger small"></span>
              </div>
            </div>

            <!-- Type -->
            <div class="col-md-6 form-floating mb-3">
              <select
                class="form-select"
                aria-label="Room Type"
                id="editRoomTypeO"
                required
              >
                <option value="Single" ${
                  foundRoom.roomType == "Single" ? "selected" : ""
                }>Single</option>
                <option value="Double" ${
                  foundRoom.roomType == "Double" ? "selected" : ""
                }>Double</option>
                <option value="Suit" ${
                  foundRoom.roomType == "Suit" ? "selected" : ""
                }>Suit</option>
                <option value="Family" ${
                  foundRoom.roomType == "Family" ? "selected" : ""
                }>Family</option>
              </select>
              <label for="editRoomTypeO">Room Type</label>
            </div>

            <!-- Capacity -->
            <div class="col-md-6">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  id="editRoomCapacityO"
                  value="${foundRoom.roomCapacity}"
                />
                <label for="editRoomCapacityO">Capacity</label>
                <span id="err-editRoomCapacityO" class="text-danger small"></span>
              </div>
            </div>

            <!-- Number Of Beds -->
            <div class="col-md-6">
              <div class="form-floating">
                <input type="text" class="form-control" id="editNumBedsO" value="${
                  foundRoom.numBeds
                }"/>
                <label for="editNumBedsO">Number Of Beds</label>
                <span id="err-editNumBedsO" class="text-danger small"></span>
              </div>
            </div>

            <!-- Description -->
            <div class="col-md-12">
              <div class="form-floating">
                <textarea
                  id="editRoomDescriptionO"
                  cols="100"
                  style="height: 100px"
                  class="form-control"
                >${foundRoom.roomDescription}</textarea>
                <label for="editRoomDescriptionO">Description</label>
                <span id="err-editRoomDescriptionO" class="text-danger small"></span>
              </div>
            </div>

            <!-- Services -->
            <div class="col-md-12 mb-3 d-flex">
              <div class="col-md-3">
                <div class="d-flex flex-column">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="Wifi"
                      id="editCheckWiFiO"
                      name="editOptions"
                      ${
                        foundRoom.roomServices.includes("Wifi") ? "checked" : ""
                      }
                    />
                    <label class="form-check-label" for="editCheckWiFiO">Wi-Fi</label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="Air Conditioning"
                      id="editCheckACO"
                      name="editOptions"
                      ${
                        foundRoom.roomServices.includes("Air Conditioning")
                          ? "checked"
                          : ""
                      }
                    />
                    <label class="form-check-label" for="editCheckACO">AC</label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="TV"
                      id="editCheckTVO"
                      name="editOptions"
                      ${foundRoom.roomServices.includes("TV") ? "checked" : ""}
                    />
                    <label class="form-check-label" for="editCheckTVO">TV</label>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="d-flex flex-column">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="Room Services"
                      id="editCheckRoomServiceO"
                      name="editOptions"
                      ${
                        foundRoom.roomServices.includes("Room Services")
                          ? "checked"
                          : ""
                      }
                    />
                    <label class="form-check-label" for="editCheckRoomServiceO"
                      >Room Services</label
                    >
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="Kitchenette"
                      id="editCheckKitchenetteO"
                      name="editOptions"
                      ${
                        foundRoom.roomServices.includes("Kitchenette")
                          ? "checked"
                          : ""
                      }
                    />
                    <label class="form-check-label" for="editCheckKitchenetteO"
                      >Kitchenette</label
                    >
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="Bathtub"
                      id="editCheckBathO"
                      name="editOptions"
                      ${
                        foundRoom.roomServices.includes("Bathtub")
                          ? "checked"
                          : ""
                      }
                    />
                    <label class="form-check-label" for="editCheckBathO"
                      >Bathtub</label
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- Image -->
            <div class="col-md-12">
              <div class="form-floating">
                <input
                  type="file"
                  class="form-control"
                  id="editImgRoomUploadO"
                  accept="image/*"
                />
                <label for="editImgRoomUploadO">Update Photo</label>
                <span id="err-editImgRoomUploadO" class="text-danger small"></span>
                <img
                  src="${foundRoom.roomImg}"
                  alt="preview"
                  id="editPreviewRO"
                  style="width: 200px; display: block; margin-top: 10px"
                />
              </div>
            </div>

            <!-- Submit -->
            <div class="col-md-12">
              <button
                class="btn btn-warning w-100 py-3"
                type="button"
                id="editRoomByOwner-btn"
                onclick="validateEditRoomByOwner(${foundRoom.id})"
              >
                Save Changes
              </button>
              <span id="err-editRoomByOwner-btn" class="text-danger small"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;
  } else {
    console.log("Room not found!");
    return;
  }
  document.getElementById("editRoomByOwner").innerHTML = content;
}

function validateEditRoomByOwner(roomId) {
  let roomsArr = getFromLS("rooms");
  let foundRoom = roomsArr.find((r) => r.id == roomId);
  console.log(foundRoom);

  // Regex
  const roomNameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s'-]{3,50}$/;
  const roomPriceRegex = /^(1000|[1-9][0-9]{2})$/;
  const roomDescriptionRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s.,;:'"!?()%-]{10,200}$/;
  const numBedsRegex = /^[1-5]$/;
  const roomCapacityRegex = /^[1-5]$/;

  // Inputs
  let editRoomNameO = getInpValue("editRoomNameO");
  let editRoomPriceO = getInpValue("editRoomPriceO");
  let editRoomTypeO = getInpValue("editRoomTypeO");
  let editRoomCapacityO = getInpValue("editRoomCapacityO");
  let editNumBedsO = getInpValue("editNumBedsO");
  let editRoomDescriptionO = getInpValue("editRoomDescriptionO");

  // Img
  let editImgRoomUploadO = document.getElementById("editImgRoomUploadO");
  let editPreviewRO = document.getElementById("editPreviewRO");
  let oldRoomImg = foundRoom.roomImg;

  // Validation
  const isRoomNameValid = validateField(
    "editRoomNameO",
    "err-editRoomNameO",
    roomNameRegex,
    "Please enter room name",
    "Only letters and spaces are allowed"
  );
  const isRoomPriceValid = validateField(
    "editRoomPriceO",
    "err-editRoomPriceO",
    roomPriceRegex,
    "Please enter price",
    "The room price must be between 100 and 1000 TND."
  );
  const isRoomDescValid = validateField(
    "editRoomDescriptionO",
    "err-editRoomDescriptionO",
    roomDescriptionRegex,
    "Please enter description",
    "Description must be 10–200 characters long"
  );
  const isRoomCapacityValid = validateField(
    "editRoomCapacityO",
    "err-editRoomCapacityO",
    roomCapacityRegex,
    "Please enter capacity",
    "The room capacity must be between 1 and 5"
  );
  const isNumBedsValid = validateField(
    "editNumBedsO",
    "err-editNumBedsO",
    numBedsRegex,
    "Please enter number of beds",
    "Please enter a number between 1 and 5."
  );

  if (
    isRoomNameValid &&
    isRoomPriceValid &&
    isNumBedsValid &&
    isRoomCapacityValid &&
    isRoomDescValid
  ) {
    foundRoom.roomName = editRoomNameO;
    foundRoom.roomPrice = editRoomPriceO;
    foundRoom.roomType = editRoomTypeO;
    foundRoom.roomDescription = editRoomDescriptionO;
    foundRoom.roomCapacity = editRoomCapacityO;
    foundRoom.numBeds = editNumBedsO;

    if (editImgRoomUploadO.files && editImgRoomUploadO.files[0]) {
      const reader = new FileReader();
      reader.onload = function () {
        editPreviewRO.src = reader.result;
        foundRoom.roomImg = reader.result;
        setToLS("rooms", roomsArr);
      };
      reader.readAsDataURL(editImgRoomUploadO.files[0]);
    } else {
      foundRoom.roomImg = oldRoomImg;
      setToLS("rooms", roomsArr);
    }
  }
}

function updateReservationsBeforeDelRoom(roomId) {
  let reservationsArr = getFromLS("reservations");
  reservationsArr = reservationsArr.filter(
    (res) => String(res.roomId) !== String(roomId)
  );
  setToLS("reservations", reservationsArr);
}

function deleteRoomByOwner(roomId) {
  let roomsArr = getFromLS("rooms");
  updateReservationsBeforeDelRoom(roomId);
  roomsArr = roomsArr.filter((r) => String(r.id) !== String(roomId));
  setToLS("rooms", roomsArr);
  displayRoomsByOwner();
}

function displayReservationsByOwner() {
  let ownerId = localStorage.getItem("connectedUserId");

  let housesArr = getFromLS("houses");
  let roomsArr = getFromLS("rooms");
  let reservationsArr = getFromLS("reservations");

  let ownerHousesArr = housesArr.filter(
    (h) => String(h.ownerId) === String(ownerId)
  );
  let ownerHousesIds = ownerHousesArr.map((h) => String(h.id));

  let relatedRooms = roomsArr.filter((r) =>
    ownerHousesIds.includes(String(r.houseId))
  );
  let relatedRoomsIds = relatedRooms.map((r) => String(r.id));

  let relatedReservations = reservationsArr.filter((res) =>
    relatedRoomsIds.includes(res.roomId)
  );

  let content = "";
  if (relatedReservations.length > 0) {
    relatedReservations.forEach((r) => {
      let foundRoom = searchObjectByIdAndKey(r.roomId, "rooms");
      let foundHouse = searchObjectByIdAndKey(foundRoom.houseId, "houses");
      let foundGuest = searchObjectByIdAndKey(r.clientId, "users");
      content += `
      <tr>
        <td>${foundHouse.houseName}</td>
        <td>${foundRoom.roomName}</td>
        <td>${foundRoom.roomPrice}</td>
        <td>${foundGuest.firstName} ${foundGuest.lastName}</td>
        <td>${r.numGuests}</td>
        <td>${
          r.checkinBooking
            ? new Date(r.checkinBooking).toLocaleDateString("fr-FR")
            : ""
        }</td>
        <td>${
          r.checkoutBooking
            ? new Date(r.checkoutBooking).toLocaleDateString("fr-FR")
            : ""
        }</td>
        <td>${r.totalPrice} DT</td>
        <td>
        <button class="btn btn-danger btn-sm" onclick="deleteReservationByOwner(${
          r.id
        })">
            <i class="fa fa-trash text-light" title="Delete User"></i></button>
        </td>
      </tr>
      `;
    });
    let totalSum = relatedReservations.reduce(
      (acc, r) => acc + Number(r.totalPrice),
      0
    );
    console.log(totalSum);
    let html = `
  <button type="button" class="btn btn-warning mt-5 rounded" style="white-space: nowrap;">
  <small>Total Sum: ${totalSum} TND</small><span class="badge bg-secondary">${relatedReservations.length}</span>
  </button>
  
  `;
    document.getElementById("reseravtionsOwnerDashboard").innerHTML =
      content + html;
  } else {
    document.getElementById("reseravtionsOwnerDashboard").innerHTML = `
      <tr>
        <td colspan="9" class="text-center text-muted py-4">
          No reservations found.
        </td>
      </tr>
    `;
  }
}

function deleteReservationByOwner(resId) {
  let reservationsArr = getFromLS("reservations");
  reservationsArr = reservationsArr.filter(
    (res) => String(res.id) !== String(resId)
  );
  setToLS("reservations", reservationsArr);
  displayReservationsByOwner();
}
// ======================================================
// ✅ Dashboard Admin
// ======================================================

function displayUsersByAdmin() {
  let usersArr = getFromLS("users").filter(
    (u) => u.role === "owner" || u.role === "client"
  );

  let content = "";
  if (usersArr.length > 0) {
    usersArr.forEach((u) => {
      content += `
    <tr>
      <td>${u.id}</td>
      <td>${u.firstName} ${u.lastName}</td>
      <td>${u.email}</td>
      <td>${u.phone}</td>
      <td>${u.role}</td>
      <td>${u.status ? u.status : "__"}</td>

      <td>
        ${
          u.role === "owner" && u.status == "not validated"
            ? `
              <button class="btn btn-success btn-sm me-1"
                      onclick="validateOwner(${u.id})">
                <i class="fa fa-check text-light" title="Validate Owner"></i>
              </button>

              <button class="btn btn-danger btn-sm"
                      onclick="deleteUser(${u.id})">
                <i class="fa fa-trash text-light" title="Delete User"></i>
              </button>
            `
            : `
              <button class="btn btn-danger btn-sm"
                      onclick="deleteUser(${u.id})">
                <i class="fa fa-trash text-light" title="Delete User"></i>
              </button>
            `
        }
      </td>
    </tr>`;
    });

    document.getElementById("usersAdminDashboard").innerHTML = content;
  } else {
    document.getElementById("usersAdminDashboard").innerHTML = `
      <tr>
        <td colspan="9" class="text-center text-muted py-4">
          No users found.
        </td>
      </tr>
    `;
  }
}

function validateOwner(id) {
  let usersArr = getFromLS("users");
  let foundUser = usersArr.find((u) => u.id === id);
  if (foundUser) {
    foundUser.status = "validated";
    setToLS("users", usersArr);
    displayUsersByAdmin();
  } else {
    console.log("No user found with this Id");
  }
}

function deleteUser(id) {
  let usersArr = getFromLS("users");
  let pos = usersArr.findIndex((u) => u.id === id);

  if (pos === -1) {
    console.log("No user found with this Id");
    return;
  }

  let foundUser = usersArr[pos];

  if (foundUser.role === "owner") {
    deleteResBefDelRoomByAdmin(foundUser.id);
    deleteRooomsBeforeDelHouseByAdmin(foundUser.id);
    deleteRelatedHousesByAdmin(foundUser.id);
  } else if (foundUser.role === "client") {
    updateReservationsBeforeDelClByAdmin(foundUser.id);
  }

  usersArr.splice(pos, 1);
  setToLS("users", usersArr);
  displayUsersByAdmin();
}

function deleteResBefDelRoomByAdmin(userId) {
  let roomsArr = getFromLS("rooms");
  let housesArr = getFromLS("houses");
  let reservationsArr = getFromLS("reservations");

  let ownerHousesIds = housesArr
    .filter((h) => String(h.ownerId) === String(userId))
    .map((h) => String(h.id));

  let relatedRoomsIds = roomsArr
    .filter((r) => ownerHousesIds.includes(String(r.houseId)))
    .map((r) => String(r.id));

  reservationsArr = reservationsArr.filter(
    (res) => !relatedRoomsIds.includes(String(res.roomId))
  );
  setToLS("reservations", reservationsArr);
}

function deleteRooomsBeforeDelHouseByAdmin(userId) {
  let roomsArr = getFromLS("rooms");
  let housesArr = getFromLS("houses");

  let ownerHousesIds = housesArr
    .filter((h) => String(h.ownerId) === String(userId))
    .map((h) => String(h.id));

  let relatedRoomsIds = roomsArr
    .filter((r) => ownerHousesIds.includes(String(r.houseId)))
    .map((r) => String(r.id));
  roomsArr = roomsArr.filter((r) => !relatedRoomsIds.includes(String(r.id)));
  setToLS("rooms", roomsArr);
}

function deleteRelatedHousesByAdmin(userId) {
  let housesArr = getFromLS("houses");
  housesArr = housesArr.filter((h) => String(h.ownerId) !== String(userId));
  setToLS("houses", housesArr);
}

function updateReservationsBeforeDelClByAdmin(userId) {
  let reservationsArr = getFromLS("reservations");
  reservationsArr = reservationsArr.filter(
    (res) => String(res.clientId) !== String(userId)
  );
  setToLS("reservations", reservationsArr);
}

function displayHousesByAdmin() {
  let housesArr = getFromLS("houses");
  let container = document.getElementById("displayHousesByAdmin");

  let addHouseContent = `
  <tr>
    <td colspan="7" class="text-center">
    <button type="button" class="btn btn-success mt-3" onclick="goToAddHouseByAdmin()">
    <i class="fa fa-plus text-center text-light"></i> ADD HOUSE
    </button></td>
  </tr>
  `;

  if (housesArr.length === 0) {
    container.innerHTML = `<tr>
        <td colspan="7" class="text-center text-muted">
          No houses found. Click "Add House" to create one.
        </td>
      </tr> ${addHouseContent}`;
    return;
  }

  let content = "";
  housesArr.forEach((h) => {
    content += `
      <tr>
        <td>${h.id}</td>
        <td>${h.houseName}</td>
        <td>
        <img 
  src="${h.houseImg}" 
  alt="${h.houseName}" 
  style="width: 150px; height: auto; object-fit: cover; border-radius: 10px;">
        </td>
        <td>${searchObjectByIdAndKey(h.ownerId, "users").firstName} ${
      searchObjectByIdAndKey(h.ownerId, "users").lastName
    }</td>
        <td>${h.houseCity}</td>
        <td>${h.housePhone}</td>
        <td class="d-flex">
            <button type="button" class="btn btn-success btn-sm me-2" onclick="goToAddRoomByAdmin(${
              h.id
            })" title="Add Room">
            <i class="fa fa-plus text-center text-light"></i>
            </button>
            <button type="button" class="btn btn-primary btn-sm me-2" onclick="editHouseByAdmin(${
              h.id
            })" title="Edit House">
            <i class="fa fa-edit text-center text-light"></i>
            </button>
            <button type="button" class="btn btn-danger btn-sm" onclick="deleteHouseByAdmin(${
              h.id
            })" title="Delete House">
            <i class="fa fa-trash text-center text-light"></i>
            </button></td>
        </tr>
      `;
  });
  container.innerHTML = content + addHouseContent;
}

function goToAddHouseByAdmin() {
  location.replace("addHouseByAdmin.html");
}

function goToAddRoomByAdmin(houseId) {
  localStorage.setItem("houseId", houseId);
  location.replace("addRoomByAdmin.html");
}

function addRoomByAdmin() {
  let roomsArr = getFromLS("rooms");
  let houseId = localStorage.getItem("houseId");

  // Inputs
  const roomName = getInpValue("adminRoomName");
  const roomPrice = getInpValue("adminRoomPrice");
  const roomType = getInpValue("adminRoomType");
  const roomCapacity = getInpValue("adminRoomCapacity");
  const numBeds = getInpValue("adminNumBeds");
  const roomDescription = getInpValue("adminRoomDescription");

  // Regex
  const roomNameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s'-]{3,50}$/;
  const roomPriceRegex = /^(1000|[1-9][0-9]{2})$/;
  const roomDescriptionRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s.,;:'"!?()%-]{10,200}$/;
  const numBedsRegex = /^[1-5]$/;
  const roomCapacityRegex = /^[1-5]$/;

  const errBtn = document.getElementById("err-addRoomByAdmin-btn");

  const imgRoomUpload = document.getElementById("adminImgRoomUpload");
  const previewImg = document.getElementById("adminPreviewRoom");
  const file = imgRoomUpload.files[0];

  const checkboxes = document.querySelectorAll('input[name="options"]:checked');
  let services = [];
  checkboxes.forEach((cb) => services.push(cb.value));

  // Img Validation
  if (!file) {
    document.getElementById("err-adminImgRoomUpload").textContent =
      "Please upload a room image.";
    previewImg.src = "";
    return;
  } else {
    document.getElementById("err-adminImgRoomUpload").textContent = "";
  }

  // Validation Check Add Max
  if (houseId && checkAddMax(houseId)) {
    errBtn.textContent = "You cannot add more than 5 rooms for this house!";
    return;
  } else {
    errBtn.textContent = "";
  }

  // Validations
  const isRoomNameValid = validateField(
    "adminRoomName",
    "err-adminRoomName",
    roomNameRegex,
    "Please enter room name",
    "Only letters and spaces are allowed"
  );

  const isRoomPriceValid = validateField(
    "adminRoomPrice",
    "err-adminRoomPrice",
    roomPriceRegex,
    "Please enter price",
    "The room price must be between 100 and 1000 TND."
  );

  const isRoomDescValid = validateField(
    "adminRoomDescription",
    "err-adminRoomDescription",
    roomDescriptionRegex,
    "Please enter description",
    "Description must be 10–200 characters long"
  );

  const isRoomCapacityValid = validateField(
    "adminRoomCapacity",
    "err-adminRoomCapacity",
    roomCapacityRegex,
    "Please enter capacity",
    "The room capacity must be between 1 and 5"
  );

  const isNumBedsValid = validateField(
    "adminNumBeds",
    "err-adminNumBeds",
    numBedsRegex,
    "Please enter number of beds",
    "Please enter a number between 1 and 5."
  );

  const isRoomTypeValid = validateSelect(
    "adminRoomType",
    "err-adminRoomType",
    "Please select room type"
  );

  if (
    isRoomNameValid &&
    isRoomCapacityValid &&
    isRoomDescValid &&
    isRoomPriceValid &&
    isNumBedsValid &&
    isRoomTypeValid
  ) {
    const reader = new FileReader();
    reader.onload = function () {
      previewImg.src = reader.result;
      let imgRoomUrl = reader.result;

      const room = {
        id: generateId(roomsArr),
        houseId: houseId,
        roomName: roomName,
        roomPrice: roomPrice,
        roomCapacity: roomCapacity,
        roomDescription: roomDescription,
        roomType: roomType,
        numBeds: numBeds,
        roomServices: services,
        roomImg: imgRoomUrl,
      };
      roomsArr.push(room);
      setToLS("rooms", roomsArr);
    };
    reader.readAsDataURL(file);
  }
}

function editHouseByAdmin(id) {
  let housesArr = getFromLS("houses");
  let foundHouse = housesArr.find((h) => h.id === id);
  let content = "";
  if (foundHouse) {
    content = `<div class="container-xxl bg-white p-0">

      <!-- Edit Guesthouse Start -->
      <div class="container-xxl py-5">
        <div class="container">
          <div class="text-center mb-5">
            <h6 class="section-title text-primary text-uppercase">Guesthouse Details</h6>
            <h1 class="mb-3"><span class="text-primary">Edit</span> Guesthouse</h1>
          </div>

          <div class="row justify-content-center">
            <div class="col-md-6">
              <div class="row g-3">
                
<!-- Name -->
<div class="col-md-12">
  <div class="form-floating">
    <input type="text" class="form-control" id="editHouseNameA" placeholder="Guesthouse Name" value="${foundHouse.houseName}"/>
    <label for="editHouseNameA">Guesthouse Name</label>
    <span id="err-editHouseNameA" class="text-danger small"></span>
  </div>
</div>

<!-- Phone -->
<div class="col-md-12">
  <div class="form-floating">
    <input type="tel" class="form-control" id="editHousePhoneA" placeholder="Phone" value="${foundHouse.housePhone}"/>
    <label for="editHousePhoneA">Phone</label>
    <span id="err-editHousePhoneA" class="text-danger small"></span>
  </div>
</div>

<!-- City -->
<div class="col-md-12">
  <div class="form-floating">
    <input type="text" class="form-control" id="editHouseCityA" placeholder="City" value="${foundHouse.houseCity}" />
    <label for="editHouseCityA">City</label>
    <span id="err-editHouseCityA" class="text-danger small"></span>
  </div>
</div>

<!-- Location -->
<div class="col-md-12">
  <div class="form-floating">
    <input type="text" class="form-control" id="editHouseLocationA" placeholder="Location" value="${foundHouse.houseLocation}"/>
    <label for="editHouseLocationA">Location</label>
    <span id="err-editHouseLocationA" class="text-danger small"></span>
  </div>
</div>

<!-- Capacity -->
<div class="col-md-12">
  <div class="form-floating">
    <input type="number" class="form-control" id="editHouseCapacityA" placeholder="Capacity" value="${foundHouse.houseCapacity}"/>
    <label for="editHouseCapacityA">Capacity</label>
    <span id="err-editHouseCapacityA" class="text-danger small"></span>
  </div>
</div>

<!-- Description -->
<div class="col-md-12">
  <div class="form-floating">
    <textarea id="editHouseDescriptionA" class="form-control" style="height: 100px">${foundHouse.houseDescription}</textarea>
    <label for="editHouseDescriptionA">Description</label>
    <span id="err-editHouseDescriptionA" class="text-danger small"></span>
  </div>
</div>

<!-- Image -->
<div class="col-md-12">
  <div class="form-floating">
    <input type="file" class="form-control" id="editImgHouseUploadA" accept="image/*" />
    <label for="editImgHouseUploadA">Change Photo</label>
    <img src="${foundHouse.houseImg}" alt="preview" id="editPreviewA" style="width:200px; display:block; margin-top:10px" />
    <span id="err-editImgHouseUploadA" class="text-danger small"></span>
  </div>
</div>

<!-- Submit -->
<div class="col-md-12">
  <button class="btn btn-primary w-100 py-3" type="button" id="editHouseByOwnerBtnA" onclick="validateEditHouseByAdmin(${foundHouse.id})">
    Save Changes
  </button>
</div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Edit Guesthouse End -->
    </div>`;
  }
  document.getElementById("editHouseByAdmin").innerHTML = content;
}

function validateEditHouseByAdmin(id) {
  let housesArr = getFromLS("houses");
  let foundHouse = housesArr.find((h) => h.id === id);
  if (!foundHouse) {
    console.log("No House Founs With This Id");
  } else {
    // Inputs
    let name = getInpValue("editHouseNameA");
    let phone = getInpValue("editHousePhoneA");
    let city = getInpValue("editHouseCityA");
    let location = getInpValue("editHouseLocationA");
    let capacity = getInpValue("editHouseCapacityA");
    let description = getInpValue("editHouseDescriptionA");

    // Regex
    const houseNameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s'-]{3,50}$/;
    const housePhoneRegex = /^[0-9]{8,15}$/;
    const houseCityRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s-]{2,30}$/;
    const houseLocationRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s,.-]{3,100}$/;
    const houseDescriptionRegex =
      /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s.,;:'"!?()%-]{10,100}$/;
    const houseCapacityRegex = /^(?:[1-9]|[1-9][0-9]|100)$/;

    // Img
    let imgInput = document.getElementById("editImgHouseUploadA");
    let preview = document.getElementById("editPreviewA");
    let oldHouseImg = foundHouse.houseImg;

    // Validation
    const isNameValid = validateField(
      "editHouseNameA",
      "err-editHouseNameA",
      houseNameRegex,
      "Please enter the guesthouse name",
      "Only letters and spaces are allowed (3–50 chars)"
    );
    const isPhoneValid = validateField(
      "editHousePhoneA",
      "err-editHousePhoneA",
      housePhoneRegex,
      "Please enter a phone number",
      "Phone number must contain exactly 8 digits"
    );

    const isCityValid = validateField(
      "editHouseCityA",
      "err-editHouseCityA",
      houseCityRegex,
      "Please enter the city name",
      "Invalid city name (letters only)"
    );

    const isLocationValid = validateField(
      "editHouseLocationA",
      "err-editHouseLocationA",
      houseLocationRegex,
      "Please enter the location",
      "Location must be between 3 and 100 characters"
    );

    const isCapacityValid = validateField(
      "editHouseCapacityA",
      "err-editHouseCapacityA",
      houseCapacityRegex,
      "Please enter capacity",
      "Capacity must be a number greater than 0"
    );

    const isDescriptionValid = validateField(
      "editHouseDescriptionA",
      "err-editHouseDescriptionA",
      houseDescriptionRegex,
      "Please enter a description",
      "Description must be between 10 and 200 characters"
    );
    if (
      isNameValid &&
      isCityValid &&
      isDescriptionValid &&
      isCapacityValid &&
      isLocationValid &&
      isPhoneValid
    ) {
      foundHouse.houseName = name;
      foundHouse.houseCity = city;
      foundHouse.houseCapacity = capacity;
      foundHouse.houseLocation = location;
      foundHouse.housePhone = phone;
      foundHouse.houseDescription = description;

      if (imgInput.files && imgInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function () {
          preview.src = reader.result;
          foundHouse.houseImg = reader.result;
          setToLS("houses", housesArr);
        };
        reader.readAsDataURL(imgInput.files[0]);
      } else {
        foundHouse.houseImg = oldHouseImg;
        setToLS("houses", housesArr);
      }
    }
  }
}

function deleteHouseByAdmin(houseId) {
  let housesArr = getFromLS("houses");
  let pos = housesArr.findIndex((h) => h.id === houseId);
  if (pos === -1) {
    console.log("No house found with this Id");
  } else {
    updateRelatedRoomsAndReservationsByAdmin(houseId);
    housesArr.splice(pos, 1);
    setToLS("houses", housesArr);
    displayHousesByAdmin();
  }
}

function updateRelatedRoomsAndReservationsByAdmin(houseId) {
  let roomsArr = getFromLS("rooms");
  let reservationsArr = getFromLS("reservations");

  let relatedRooms = roomsArr.filter((r) => r.houseId === houseId);
  let relatedRoomsIds = relatedRooms.map((r) => r.id);

  reservationsArr = reservationsArr.filter(
    (res) => !relatedRoomsIds.includes(res.roomId)
  );
  roomsArr = roomsArr.filter((r) => r.houseId !== houseId);
  setToLS("rooms", roomsArr);
  setToLS("reservations", reservationsArr);
}

function addHouseByAdmin() {
  let housesArr = getFromLS("houses");
  // Inputs
  let adminHouseName = getInpValue("adminHouseName");
  let selectOwnerId = getInpValue("selectOwner");
  let adminHousePhone = getInpValue("adminHousePhone");
  let adminHouseCity = getInpValue("adminHouseCity");
  let adminHouseLocation = getInpValue("adminHouseLocation");
  let adminHouseCapacity = getInpValue("adminHouseCapacity");
  let adminHouseDescription = getInpValue("houseDescription");

  // Regex
  const houseNameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s'-]{3,50}$/;
  const housePhoneRegex = /^[0-9]{8,15}$/;
  const houseCityRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s-]{2,30}$/;
  const houseLocationRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s,.-]{3,100}$/;
  const houseDescriptionRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s.,;:'"!?()%-]{10,100}$/;
  const houseCapacityRegex = /^(?:[1-9]|[1-9][0-9]|100)$/;

  // Image Validation
  let imgHouseUploadInp = document.getElementById("adminImgHouseUpload");
  let file = imgHouseUploadInp.files[0];
  let errMsg = document.getElementById("err-adminImgHouseUpload");
  let previewImg = document.getElementById("preview");

  if (!file) {
    errMsg.textContent = "Please upload an image of the guesthouse";
    previewImg.src = "";
    return;
  } else {
    errMsg.textContent = "";
  }

  // Validation Des Autres champs

  const isHouseNameValid = validateField(
    "adminHouseName",
    "err-adminHouseName",
    houseNameRegex,
    "Please enter house name",
    "Only letters, numbers and spaces are allowed"
  );

  const isHousePhoneValid = validateField(
    "adminHousePhone",
    "err-adminHousePhone",
    housePhoneRegex,
    "Please enter house phone number",
    "Phone must be 8–15 digits"
  );

  const isHouseCityValid = validateField(
    "adminHouseCity",
    "err-adminHouseCity",
    houseCityRegex,
    "Please enter city",
    "City must be 2–30 characters long"
  );

  const isHouseLocationValid = validateField(
    "adminHouseLocation",
    "err-adminHouseLocation",
    houseLocationRegex,
    "Please enter location",
    "Location must be 3–100 characters long"
  );

  const isHouseCapacityValid = validateField(
    "adminHouseCapacity",
    "err-adminHouseCapacity",
    houseCapacityRegex,
    "Please enter capacity",
    "Capacity must be between 1 and 100 guests."
  );

  const isHouseDescValid = validateField(
    "houseDescription",
    "err-adminHouseDescription",
    houseDescriptionRegex,
    "Please enter description",
    "Description must be 10–100 characters long"
  );

  const isOwnerSelected = validateSelect(
    "selectOwner",
    "err-selectOwner",
    "Please select an owner"
  );

  if (
    isHouseNameValid &&
    isHousePhoneValid &&
    isHouseCityValid &&
    isHouseCapacityValid &&
    isHouseDescValid &&
    isHouseLocationValid &&
    isOwnerSelected
  ) {
    const reader = new FileReader();
    reader.onload = function () {
      const imgHouseUrl = reader.result;
      previewImg.src = reader.result;

      const house = {
        id: generateId(housesArr),
        ownerId: selectOwnerId,
        houseName: adminHouseName,
        housePhone: adminHousePhone,
        houseCity: adminHouseCity,
        houseLocation: adminHouseLocation,
        houseDescription: adminHouseDescription,
        houseCapacity: adminHouseCapacity,
        houseImg: imgHouseUrl,
      };
      housesArr.push(house);
      setToLS("houses", housesArr);
      localStorage.setItem("houseId", house.id);
      location.replace("addRoomByAdmin.html");
    };
    reader.readAsDataURL(file);
  }
}

function showOwners() {
  let usersArr = getFromLS("users");
  let ownersArr = usersArr.filter((u) => u.role === "owner");
  let content = `<option value="">-- Select Owner --</option>`;
  ownersArr.forEach((owner) => {
    content += `
    <option value="${owner.id}">${owner.firstName} ${owner.lastName}</option>
    `;
  });
  document.getElementById("selectOwner").innerHTML = content;
}

function displayRoomsByAdmin() {
  let roomsArr = getFromLS("rooms");
  let content = "";
  if (roomsArr.length > 0) {
    roomsArr.forEach((r) => {
      content += `<tr>
      <td>${r.id}</td>
      <td>${r.roomName}</td>
      <td><img src=${r.roomImg} class="img-thumbnail" alt=${
        r.roomName
      } style="width: 150px; height: auto"></td>
      <td>${searchObjectByIdAndKey(r.houseId, "houses").houseName}</td>
      <td>${r.roomType}</td>
      <td>${r.numBeds}</td>
      <td>${r.roomCapacity}</td>
      <td>${r.roomPrice} DT</td>
      <td class="d-flex">
  <button
    type="button"
    class="btn btn-primary btn-sm me-2"
    onclick="editRoomByAdmin(${r.id})">
    <i class="fa fa-edit text-center text-light" title="Edit Room"></i>
  </button>
  <button type="button" class="btn btn-danger btn-sm" onclick="deleteRoomByAdmin(${
    r.id
  })">
    <i class="fa fa-trash text-center text-light" title="Delete Room"></i>
  </button>
</td>    
    </tr>`;
    });
    document.getElementById("displayRoomsByAdmin").innerHTML = content;
  } else {
    document.getElementById("displayRoomsByAdmin").innerHTML = `
      <tr>
        <td colspan="9" class="text-center text-muted py-4">
          No rooms found.
        </td>
      </tr>`;
  }
}

function editRoomByAdmin(roomId) {
  let roomsArr = getFromLS("rooms");
  let foundRoom = roomsArr.find((r) => r.id === roomId);
  let content = "";
  let container = document.getElementById("editRoomByAdmin");
  console.log(foundRoom);
  if (!foundRoom) {
    // container.innerHTML = "No room found with this Id";
  } else {
    content = `
    <div class="container">
  <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
    <h6 class="section-title text-center text-primary text-uppercase">
      Edit Room
    </h6>
    <h1 class="mb-5">
      <span class="text-primary text-uppercase">Update</span> Room Details
    </h1>
  </div>

  <div class="row g-4 justify-content-center mb-5">
    <div class="col-md-6 d-flex">
      <div class="wow fadeInUp" data-wow-delay="0.2s">
        <div>
          <div class="row g-3">

            <!-- Room Name -->
            <div class="col-md-12">
              <div class="form-floating">
                <input type="text" class="form-control" id="editAdminRoomName" value="${
                  foundRoom.roomName
                }"/>
                <label for="editAdminRoomName">Room Name</label>
                <span id="err-editAdminRoomName" class="text-danger small"></span>
              </div>
            </div>

            <!-- Price -->
            <div class="col-md-6">
              <div class="form-floating">
                <input type="number" class="form-control" id="editAdminRoomPrice" value="${
                  foundRoom.roomPrice
                }"/>
                <label for="editAdminRoomPrice">Price</label>
                <span id="err-editAdminRoomPrice" class="text-danger small"></span>
              </div>
            </div>

            <!-- Type -->
            <div class="col-md-6 form-floating mb-3">
              <select class="form-select" id="editAdminRoomType">
                <option value="Single" ${
                  foundRoom.roomType == "Single" ? "selected" : ""
                }>Single</option>
                <option value="Double" ${
                  foundRoom.roomType == "Double" ? "selected" : ""
                }>Double</option>
                <option value="Suit" ${
                  foundRoom.roomType == "Suit" ? "selected" : ""
                }>Suit</option>
                <option value="Family" ${
                  foundRoom.roomType == "Family" ? "selected" : ""
                }>Family</option>
              </select>
              <label for="editAdminRoomType">Room Type</label>
              <span id="err-editAdminRoomType" class="text-danger small"></span>
            </div>

            <!-- Capacity -->
            <div class="col-md-6">
              <div class="form-floating">
                <input type="number" class="form-control" id="editAdminRoomCapacity" value="${
                  foundRoom.roomCapacity
                }"/>
                <label for="editAdminRoomCapacity">Capacity</label>
                <span id="err-editAdminRoomCapacity" class="text-danger small"></span>
              </div>
            </div>

            <!-- Beds -->
            <div class="col-md-6">
              <div class="form-floating">
                <input type="number" class="form-control" id="editAdminNumBeds" value="${
                  foundRoom.numBeds
                }"/>
                <label for="editAdminNumBeds">Number Of Beds</label>
                <span id="err-editAdminNumBeds" class="text-danger small"></span>
              </div>
            </div>

            <!-- Description -->
            <div class="col-md-12">
              <div class="form-floating">
                <textarea class="form-control" id="editAdminRoomDescription" style="height:100px">${
                  foundRoom.roomDescription
                }</textarea>
                <label for="editAdminRoomDescription">Description</label>
                <span id="err-editAdminRoomDescription" class="text-danger small"></span>
              </div>
            </div>

            <!-- Services -->
            <div class="col-md-12 mb-3 d-flex">

              <div class="col-md-3">
                <div class="d-flex flex-column">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Wifi" id="editAdminRoomWifi" 
                    ${
                      foundRoom.roomServices.includes("Wifi") ? "checked" : ""
                    }/>
                    <label class="form-check-label" for="editAdminRoomWifi">Wi-Fi</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="AC" id="editAdminRoomAC" 
                    ${foundRoom.roomServices.includes("AC") ? "checked" : ""}/>
                    <label class="form-check-label" for="editAdminRoomAC">AC</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="TV" id="editAdminRoomTV" 
                    ${foundRoom.roomServices.includes("TV") ? "checked" : ""}/>
                    <label class="form-check-label" for="editAdminRoomTV">TV</label>
                  </div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="d-flex flex-column">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Room Services" id="editAdminRoomService" 
                    ${
                      foundRoom.roomServices.includes("Room Services")
                        ? "checked"
                        : ""
                    }/>
                    <label class="form-check-label" for="editAdminRoomService">Room Services</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Kitchenette" id="editAdminRoomKitchenette"
                    ${
                      foundRoom.roomServices.includes("Kitchenette")
                        ? "checked"
                        : ""
                    }/>
                    <label class="form-check-label" for="editAdminRoomKitchenette">Kitchenette</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="Bathhub" id="editAdminRoomBath" 
                    ${
                      foundRoom.roomServices.includes("Bathhub")
                        ? "checked"
                        : ""
                    }/>
                    <label class="form-check-label" for="editAdminRoomBath">Bathhub</label>
                  </div>
                </div>
              </div>

            </div>

            <!-- Image -->
            <div class="col-md-12">
              <div class="form-floating">
                <input type="file" class="form-control" id="editAdminImgRoomUpload" accept="image/*" />
                <label for="editAdminImgRoomUpload">Photo</label>
                <span id="err-editAdminImgRoomUpload" class="text-danger small"></span>

                <img src="${
                  foundRoom.roomImg
                }" id="editAdminPreviewRoom" style="width:200px; display:block; margin-top:10px" />
              </div>
            </div>

            <!-- Submit -->
            <div class="col-md-12">
              <button type="button" class="btn btn-primary w-100 py-3" id="editRoomByAdmin-btn"
                onclick="validateEditRoomByAdmin(${foundRoom.id})">
                Save Changes
              </button>
              <span id="err-editRoomByAdmin-btn" class="text-danger small"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    `;
    container.innerHTML = content;
  }
}

function showSuccessToast(toastId) {
  const toast = document.getElementById(toastId);
  if (!toast) return;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

function validateEditRoomByAdmin(roomId) {
  let roomsArr = getFromLS("rooms");
  let foundRoom = roomsArr.find((r) => r.id === roomId);

  // Regex
  const roomNameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s'-]{3,50}$/;
  const roomPriceRegex = /^(1000|[1-9][0-9]{2})$/;
  const roomDescriptionRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s.,;:'"!?()%-]{10,200}$/;
  const numBedsRegex = /^[1-5]$/;
  const roomCapacityRegex = /^[1-5]$/;

  // Inputs
  let roomName = getInpValue("editAdminRoomName");
  let roomPrice = getInpValue("editAdminRoomPrice");
  let roomType = getInpValue("editAdminRoomType");
  let roomCapacity = getInpValue("editAdminRoomCapacity");
  let numBeds = getInpValue("editAdminNumBeds");
  let roomDescription = getInpValue("editAdminRoomDescription");

  let checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
  let roomServices = Array.from(checkboxes).map((cb) => cb.value);

  // Img
  let editImgRoomUploadA = document.getElementById("editAdminImgRoomUpload");
  let editPreviewRA = document.getElementById("editAdminPreviewRoom");
  let oldRoomImg = foundRoom.roomImg;

  // Validations

  const isRoomNameValid = validateField(
    "editAdminRoomName",
    "err-editAdminRoomName",
    roomNameRegex,
    "Please enter room name",
    "Only letters and spaces are allowed"
  );

  const isRoomPriceValid = validateField(
    "editAdminRoomPrice",
    "err-editAdminRoomPrice",
    roomPriceRegex,
    "Please enter price",
    "The room price must be between 100 and 1000 TND."
  );

  const isRoomDescValid = validateField(
    "editAdminRoomDescription",
    "err-editAdminRoomDescription",
    roomDescriptionRegex,
    "Please enter description",
    "Description must be 10–200 characters long"
  );

  const isRoomCapacityValid = validateField(
    "editAdminRoomCapacity",
    "err-editAdminRoomCapacity",
    roomCapacityRegex,
    "Please enter capacity",
    "The room capacity must be between 1 and 5"
  );

  const isNumBedsValid = validateField(
    "editAdminNumBeds",
    "err-editAdminNumBeds",
    numBedsRegex,
    "Please enter number of beds",
    "Please enter a number between 1 and 5."
  );

  const isRoomTypeValid = validateSelect(
    "editAdminRoomType",
    "err-editAdminRoomType",
    "Please select room type"
  );
  if (
    isRoomNameValid &&
    isRoomDescValid &&
    isRoomCapacityValid &&
    isNumBedsValid &&
    isRoomPriceValid &&
    isRoomTypeValid
  ) {
    foundRoom.roomName = roomName;
    foundRoom.roomPrice = roomPrice;
    foundRoom.roomCapacity = roomCapacity;
    foundRoom.roomDescription = roomDescription;
    foundRoom.numBeds = numBeds;
    foundRoom.roomType = roomType;
    foundRoom.roomServices = roomServices;

    if (editImgRoomUploadA.files && editImgRoomUploadA.files[0]) {
      let reader = new FileReader();
      reader.onload = function () {
        foundRoom.roomImg = reader.result;
        editPreviewRA.src = reader.result;
        setToLS("rooms", roomsArr);
        showSuccessToast("successToast");
        // setTimeout(() => {
        //   window.location.assign("adminDashboard.html");
        // }, 2000);
      };
      reader.readAsDataURL(editImgRoomUploadA.files[0]);
    } else {
      foundRoom.roomImg = oldRoomImg;
      setToLS("rooms", roomsArr);
      showSuccessToast("successToast");
      // setTimeout(() => {
      //   window.location.assign("adminDashboard.html");
      // }, 2000);
    }
  }
}

function deleteRoomByAdmin(roomId) {
  let roomsArr = getFromLS("rooms");
  updateReservationsBeforeDelRoomByAdmin(roomId);
  roomsArr = roomsArr.filter((r) => String(r.id) !== String(roomId));
  setToLS("rooms", roomsArr);
  displayRoomsByAdmin();
}

function updateReservationsBeforeDelRoomByAdmin(roomId) {
  let roomsArr = getFromLS("rooms");
  let reservationsArr = getFromLS("reservations");

  let relatedRooms = roomsArr.filter((r) => String(r.id) === String(roomId));
  let relatedRoomsIds = relatedRooms.map((r) => r.id);

  reservationsArr = reservationsArr.filter(
    (res) => !relatedRoomsIds.includes(res.roomId)
  );
  setToLS("reservations", reservationsArr);
}

function displayReservationsByAdmin() {
  let reservationsArr = getFromLS("reservations");
  let container = document.getElementById("displayReservationsByAdmin");
  let content = "";

  if (reservationsArr.length === 0) {
    container.innerHTML = `
    <tr>
        <td colspan="7" class="text-center text-muted">
          No reservations yet.
        </td>
      </tr>`;
    return;
  }
  reservationsArr.forEach((res) => {
    let foundRoom = searchObjectByIdAndKey(res.roomId, "rooms");
    console.log(foundRoom);
    let foundHouse = searchObjectByIdAndKey(foundRoom.houseId, "houses");
    let foundUser = searchObjectByIdAndKey(res.clientId, "users");
    content += `
      <tr>
       <td>${foundHouse.houseName}</td>
       <td>${foundRoom.roomName}</td>
       <td>${foundRoom.roomPrice} DT</td>
       <td>${foundUser.firstName} ${foundUser.lastName}</td>
       <td>${res.numGuests}</td>
       <td>${
         res.checkinBooking
           ? new Date(res.checkinBooking).toLocaleDateString("FR")
           : "Not Validate Date"
       }</td>
       <td>${
         res.checkoutBooking
           ? new Date(res.checkoutBooking).toLocaleDateString("FR")
           : "Not Validate Date"
       }</td>
       <td>${res.totalPrice} DT</td>
       <td>
         <button type="button" class="btn btn-danger btn-sm" onclick="deleteReservationByAdmin(${
           res.id
         })">
                <i class="fa fa-trash text-center text-light" title="Delete Reservation"></i>
            </button>
       </td>
    </tr>`;
  });
  let totalSum = reservationsArr.reduce(
    (acc, curr) => acc + Number(curr.totalPrice),
    0
  );
  let html = `
  <button type="button" class="btn btn-warning mt-5 rounded" style="white-space: nowrap;">
  <small>Total Sum: ${totalSum} TND</small><span class="badge bg-secondary">${reservationsArr.length}</span>
  </button>`;
  container.innerHTML = content + html;
}

function deleteReservationByAdmin(resId) {
  let reservationsArr = getFromLS("reservations");
  reservationsArr = reservationsArr.filter(
    (res) => String(res.id) !== String(resId)
  );
  setToLS("reservations", reservationsArr);
  displayReservationsByAdmin();
}

// Events

function init() {
  setupEvenets();
}

function setupEvenets() {
  document.getElementById("search").onkeyup = function () {
    search("name");
  };
  document.getElementById("searchName").onclick = function () {
    search("name");
  };
  document.getElementById("searchCity").onclick = function () {
    search("city");
  };
}

function search(type) {
  let housesArr = getFromLS("houses");
  let text = document.getElementById("search").value.toLowerCase().trim();
  let result = [];

  if (type === "name") {
    result = housesArr.filter((h) => h.houseName.toLowerCase().includes(text));
  } else if (type === "city") {
    result = housesArr.filter((h) => h.houseCity.toLowerCase().includes(text));
  }
  displayResult(result);
}

function displayResult(arr) {
  let div = document.getElementById("result");
  div.innerHTML = "";
  if (arr.length === 0) {
    div.innerHTML = "<p class='text-muted text-center'>No guesthouse found</p>";
    return;
  } else {
    arr.forEach((h) => {
      div.innerHTML += `
      <div class="card p-3 mb-3">
        <h4>${h.houseName}</h4>
        <p><i class="fa fa-map-marker-alt"></i> ${h.houseCity}</p>
      </div>
      `;
    });
  }
}

init();

function countHouses() {
  const housesArr = getFromLS("houses");
  const count = housesArr.length;
  document.getElementById("contentHouses").innerHTML = count;
}

function countRooms() {
  const roomsArr = getFromLS("rooms");
  const count = roomsArr.length;
  document.getElementById("contentRooms").innerHTML = count;
}

function countClients() {
  const usersArr = getFromLS("users");
  const count = usersArr.reduce((acc, curr) => {
    curr.role == "client" ? acc++ : acc;
    return acc;
  }, 0);
  document.getElementById("contentClients").innerHTML = count;
}
