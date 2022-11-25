const APIURL = "https://api.github.com/users/";
const searchTerm = document.querySelector(".search-input");
const searchBar = document.querySelector(".search-bar");
let userCard = document.querySelector(".user-card");
let count = 0;

async function getUser(username) {
   try {
      const { data } = await axios(APIURL + username);
      return data;
   } catch (err) {
      console.error(err);
   }
}

async function getRepos(username) {
   try {
      const { data } = await axios(APIURL + username + "/repos");
      return data;
   } catch (err) {
      console.error(err);
   }
}

function generateMarkup(data, repos) {
   return `
    <section class="user-card">
      <div class="img-container">
        <div class="img" style="
        background-image: url(${data.avatar_url});
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        width: 130px;
        height: 130px;
        border-radius: 50%;
        outline: 10px solid #2a2a72;
        "></div>
      </div>
      <div class="text-content">
        <p class="username">${data.name}</p>
        <p class="bio">${data.bio}</p>
        <div class="follower-following-repos">
          <p class="followers">${data.followers} Followers</p>
          <p class="followings">${data.following} Following</p>
          <p class="repos">${data.public_repos} Repos</p>
         </div>
         <div class="repos">
            <a href="${repos[0].html_url}" target="_blank">${repos[0].name}</a>
            <a href="${repos[1].html_url}" target="_blank">${repos[1].name}</a>
            <a href="${repos[2].html_url}" target="_blank">${repos[2].name}</a>
            <a href="${repos[3].html_url}" target="_blank">${repos[3].name}</a>
            <a href="${repos[4].html_url}" target="_blank">${repos[4].name}</a>
         </div>
      </div>
    </section>
    `;
}

function deleteMarkup() {
   userCard.remove();
}

searchTerm.addEventListener("keydown", async (e) => {
   if (e.key === "Enter") {
      // delete the previous markup that got generated after the first search
      if (count !== 0) {
         deleteMarkup();
      }
      // this variable is for counting the searches
      // and to check if this is the first search submition
      // if it's the first search submition then we won't remove the previous markup
      count++;

      // get data and repos and empty the search bar
      const data = await getUser(searchTerm.value);
      const repos = await getRepos(searchTerm.value);
      searchTerm.value = "";

      // generate the markup then append it afterend of the search bar
      const html = generateMarkup(data, repos);
      searchBar.insertAdjacentHTML("afterend", html);

      // re-assign userCard if there is any user card in the docement object
      userCard = document.querySelector(".user-card");
   }
});
