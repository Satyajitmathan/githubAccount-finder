let searchBtn = document.querySelector(".search")
let usernameInp = document.querySelector(".usernameinp")
let card = document.querySelector(".card")

function getProfile(username){
    return fetch(`https://api.github.com/users/${username}`).then((raw) => {
    if(!raw.ok) throw new Error("User not found");
    return raw.json();
})
}

function decorateProfileData(details){
    // console.log(details)
    let data = ` <img 
             src="${details.avatar_url}" 
             alt="Avatar" 
             class="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-indigo-500 object-cover flex-shrink-0"
             />

        
        <div class="flex-1 text-center md:text-left">
          <h2 class="text-2xl font-semibold">${details.name}</h2>
          <p class="text-gray-400">@${details.login}</p>

          <p class="mt-3 text-gray-300">
            ${details.bio?details.bio :""}
          </p>

          
          <div class="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-sm">
  <span class="text-white">Location: <span class="text-gray-400 ">${details.location }</span></span>
  <span class="text-white">Company: <span class="text-gray-400 ">${details.company?details.company:"N/A"}</span></span>
  <span class="text-white">Joined: <span class="text-gray-400">${new Date(details.created_at).getFullYear()}</span></span>
</div>

          
          <div class="flex flex-wrap justify-center md:justify-start gap-6 mt-6">
            <div class="text-center">
              <p class="text-xl font-bold text-gray-400">${details.public_repos}</p>
              <p class="">Repos</p>
            </div>
            <div class="text-center">
              <p class="text-xl font-bold text-gray-400">${details.followers}</p>
              <p class="">Followers</p>
            </div>
            <div class="text-center">
              <p class="text-xl font-bold text-gray-400">${details.following}</p>
              <p class="">Following</p>
            </div>
          </div>

        
          <div class="mt-6 flex justify-center md:justify-start">
            
            <button class="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg ">
              <a href="${details.html_url}" target="_blank">View Profile</a>
            </button>
          </div>
        </div>`

    card.innerHTML = data;
}


searchBtn.addEventListener("click", ()=>{
    let username = usernameInp.value.trim()
    if(username.length>0)
    {
        getProfile(username).then((data)=>{
            decorateProfileData(data)
        })
    }
    else{
        alert("Please enter a username")
    }
})
usernameInp.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
        searchBtn.click();
    }
});