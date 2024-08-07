const base_URL = "https://api.github.com/users/";

const form = document.querySelector(".form");
const container = document.querySelector(".container");

//! Get User Data From API
const getUser = async (value) => {
  try {
    const { data } = await axios(base_URL + value);
    createUser(data);
  } catch (error) {
    throwError("Happened API error please check the API");
  }
};

//! Throw API Request
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const input = e.target[0];
  getUser(input.value);
  getUserRepo(input.value);
  input.value = "";
});

//! Create User
const createUser = (data) => {
  container.innerHTML = "";

  const { avatar_url, name, login, followers, following, public_repos } = data;

  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
        <figure class="card-img">
          <img src="${avatar_url}" />
        </figure>
        <h3 class="card-name">${name}</h3>
        <span class="card-username">@${login}</span>
        <div class="card-info">
          <div class="box">
            <i class="fa-solid fa-users"></i>
            <span>${followers}</span>
            <h4>Followers</h4>
          </div>

          <div class="box">
            <span>${following}</span>
            <h4>Following</h4>
          </div>

          <div class="box">
            <i class="fa-solid fa-bookmark"></i>
            <span>${public_repos}</span>
            <h4>Repository</h4>
          </div>
        </div>

        <div class="card-bottom">
          <div>
            <i class="fa-solid fa-book-bookmark"></i>
            <a href="#">aave-token-v3</a>
          </div>

          <div>
            <i class="fa-solid fa-book-bookmark"></i>
            <a href="#">gitignore</a>
          </div>

          <div>
            <i class="fa-solid fa-book-bookmark"></i>
            <a href="#">tellor360</a>
          </div>
        </div>
    `;

  container.appendChild(card);
};

//! Get User Repos From API
const getUserRepo = async (value) => {
  try {
    const { data } = await axios(base_URL + value + "/repos");
    addReposToUserCard(data);
  } catch (error) {
    throwError("Happened API error please check the API");
  }
};

//! Add Repos To User Card
const addReposToUserCard = (data) => {
  const reposName = container.querySelectorAll(".card-bottom a");
  const repos = data.slice(0, 3);
  repos.forEach((repo, i) => {
    reposName[i].href = repo.html_url;
    reposName[i].innerHTML = repo.name;
    reposName[i].target = "_blank";
  });
};

//! Throw Error To User From API
const throwError = (message) => {
  const err = `<h1 class="error">${message}</h1>`;
  container.innerHTML = err;
};
