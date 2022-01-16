var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");

var getRepoName = function () {
  var queryString = document.location.search;
  var repoName = queryString.split("=")[1];
  if(repoName){
    repoNameEl.textContent = repoName;
    getRepoIssues(repoName);
  }else {
      document.location.replace("./index.html")
  }
};

var getRepoIssues = function (repo) {
  apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayIssues(data);

        if (response.headers.get("Link")) {
          displayWarning(data);
        }
      });
    } else {
      document.location.replace("./index.html")
    }
  });
};

var displayIssues = function (issues) {
  if (issues.length === 0) {
    issueContainerEl.textContent = "This repo has no open issues!";
    return;
  }

  for (var i = 0; i < issues.length; i++) {
    var issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target", "_blank");

    var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;

    issueEl.appendChild(titleEl);

    var typeEl = document.createElement("span");

    if (issues[i].pull_request) {
      typeEl.textContent = "(Pull request)";
    } else {
      typeEl.textContent = "(Issue)";
    }
    issueEl.appendChild(typeEl);
    issueContainerEl.appendChild(issueEl);
  }
};

var displayWarning = function (repo) {
  limitWarningEl.textContent = "This repo has more than 30 issues. ";
  var linkEl = document.createElement("a");
  linkEl.textContent = "See more issues on GitHub.com";
  linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
  linkEl.setAttribute("target", "_blank");

  limitWarningEl.appendChild(linkEl);
};

getRepoName();
