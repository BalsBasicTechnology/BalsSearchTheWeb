document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("search-form");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const query = document.getElementById("search-query").value.trim();
            
            if (!query) return;

            // Check for bangs (!)
            if (query.startsWith("!")) {
                handleBangSearch(query);
            } else {
                // Redirect to results page with query
                window.location.href = `results.html?q=${encodeURIComponent(query)}`;
            }
        });
    }

    // Handle results page
    const resultsList = document.getElementById("results-list");
    if (resultsList) {
        const params = new URLSearchParams(window.location.search);
        const query = params.get("q");

        if (query) {
            fetch(`/search?q=${encodeURIComponent(query)}`)
                .then(response => response.json())
                .then(data => displayResults(data))
                .catch(error => {
                    console.error("Error fetching results:", error);
                    document.getElementById("loading").textContent = "Error loading results.";
                });
        }
    }
});

// Handle bang searches
function handleBangSearch(query) {
    const parts = query.split(" ");
    const bang = parts[0]; 
    const searchQuery = parts.slice(1).join(" "); 

    let redirectUrl;

    switch (bang) {
        case "!g":
            redirectUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
            break;
        case "!w":
            redirectUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(searchQuery)}`;
            break;
        case "!yt":
            redirectUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
            break;
        default:
            redirectUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
    }

    window.location.href = redirectUrl;
}

// Display search results
function displayResults(data) {
    const resultsList = document.getElementById("results-list");
    document.getElementById("loading").style.display = "none";

    if (!data.RelatedTopics || data.RelatedTopics.length === 0) {
        resultsList.innerHTML = "<p>No results found.</p>";
        return;
    }

    data.RelatedTopics.forEach(topic => {
        if (topic.FirstURL && topic.Text) {
            const li = document.createElement("li");
            li.innerHTML = `<a href="${topic.FirstURL}" target="_blank">${topic.Text}</a>`;
            resultsList.appendChild(li);
        }
    });
}
