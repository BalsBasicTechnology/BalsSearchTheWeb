document.getElementById("searchForm").addEventListener("submit", async function (event) {
    event.preventDefault();  // Prevent the form from submitting normally
    
    const query = document.getElementById("searchInput").value;
    if (!query) return;

    try {
        const response = await fetch(`http://localhost:3000/search?q=${encodeURIComponent(query)}`);
        
        if (!response.ok) {
            document.getElementById("results").innerHTML = `<p>Error fetching results: ${response.statusText}</p>`;
            return;
        }

        const data = await response.json();

        if (data.error) {
            document.getElementById("results").innerHTML = `<p>Error: ${data.error}</p>`;
            return;
        }

        let resultsHtml = "<h2>Search Results:</h2><ul>";
        data.RelatedTopics.forEach(item => {
            if (item.Text && item.FirstURL) {
                resultsHtml += `<li><a href="${item.FirstURL}" target="_blank">${item.Text}</a></li>`;
            }
        });
        resultsHtml += "</ul>";

        document.getElementById("results").innerHTML = resultsHtml;

    } catch (error) {
        document.getElementById("results").innerHTML = `<p>Error fetching results: ${error.message}</p>`;
    }
});
