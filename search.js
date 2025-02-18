document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload

    const query = document.getElementById('search-query').value.trim();

    // Check if the query starts with a bang
    const bangRegex = /^!(\w+)(.*)$/;
    const match = query.match(bangRegex);

    if (match) {
        // Process the bang and redirect to the corresponding site
        const bang = match[1]; // Extract the bang (e.g., 'g' for Google)
        const searchQuery = match[2].trim(); // Extract the search term after the bang

        let redirectUrl;

        switch (bang) {
            case 'g': // Google
                redirectUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
                break;
            case 'w': // Wikipedia
                redirectUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(searchQuery)}`;
                break;
            // Add more cases for other bangs as needed
            default:
                redirectUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
        }

        window.location.href = redirectUrl; // Redirect to the appropriate URL
    } else {
        // Regular search (no bang), use DuckDuckGo's API
        const apiUrl = `https://duckduckgo.com/api?q=${encodeURIComponent(query)}&format=json`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.RelatedTopics && data.RelatedTopics.length > 0) {
                    const results = data.RelatedTopics;
                    let resultHtml = '<ul>';

                    results.forEach(result => {
                        // Only show links that are not pointing to DuckDuckGo's own search results
                        if (result.FirstURL && !result.FirstURL.includes('duckduckgo.com')) {
                            resultHtml += `<li><a href="${result.FirstURL}" target="_blank" rel="noopener noreferrer">${result.Text}</a></li>`;
                        }
                    });

                    resultHtml += '</ul>';
                    document.body.innerHTML = resultHtml; // Display the results in the page
                } else {
                    document.body.innerHTML = "<p>No results found.</p>"; // If no results, show this message
                }
            })
            .catch(error => {
                console.error('Error:', error);
                document.body.innerHTML = "<p>Error occurred while searching.</p>"; // Handle fetch errors
            });
    }
});
