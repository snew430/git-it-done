var getUserRepos = function () {
  console.log("function called");
  fetch("https://api.github.com/users/octocat/repos");
};

getUserRepos();
