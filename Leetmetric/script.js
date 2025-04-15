document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("search-btn");
    const userInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-card");
    const usernameRegex = /^[a-zA-Z0-9_-]{1,15}$/;


    function validateUsername(name) {
        name = name.trim();
        if (name === "") {
            alert("Username cannot be empty");
            return false;
        }

        if (!usernameRegex.test(name)) {
            alert("Invalid Username");
            return false;
        }

        return true;
    }

    async function fetchUserDetails(name) {
        const url = `https://leetcode-stats-api.herokuapp.com/${name}`;

        try {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;
            statsContainer.style.setProperty("visibility", "hidden");


            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Unable to fetch the user details");
            }

            const parseData = await response.json();
            displayUserData(parseData);

        }
        catch (error) {
            statsContainer.innerHTML = `<p style="color: red;">${error.message}</p>`;

        }
        finally {
            statsContainer.style.setProperty("visibility", "visible");
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    function updateProgress(solved, total, label, circle) {
        const progressDegree = (solved / total) * 100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved} / ${total}`;
    }

    function displayUserData(parseData) {
        const totalQues = parseData.totalQuestions;
        const totalEasyQues = parseData.totalEasy;
        const totalMediumQues = parseData.totalMedium;
        const totalHardQues = parseData.totalHard;

        const solvedTotalQues = parseData.totalSolved;
        const solvedTotalEasyQues = parseData.easySolved;
        const solvedTotalMediumQues = parseData.mediumSolved;
        const solvedTotalHardQues = parseData.hardSolved;

        updateProgress(solvedTotalEasyQues, totalEasyQues, easyLabel, easyProgressCircle);
        updateProgress(solvedTotalMediumQues, totalMediumQues, mediumLabel, mediumProgressCircle);
        updateProgress(solvedTotalHardQues, totalHardQues, hardLabel, hardProgressCircle);

        const cardsData = [
            {
                label: "AcceptanceRate",
                value: parseData.acceptanceRate
            },

            {
                label: "Ranking",
                value: parseData.ranking
            },

            {
                label: "Contribution Points",
                value: parseData.contributionPoints
            },

            {
                label: "Reputation",
                value: parseData.reputation
            },
        ];

        cardStatsContainer.innerHTML = cardsData.map(
            data => {
                return `
                <div class="card">
                    <h4>${data.label} </h4>
                    <p>${data.value} </p>
                </div>
                `
            }
        ).join("");

    }




    searchButton.addEventListener("click", function () {
        const username = userInput.value;

        if (validateUsername(username)) {
            fetchUserDetails(username);
        }
    });
});





// https://leetcode-stats-api.herokuapp.com/<YOUR_USERNAME>

