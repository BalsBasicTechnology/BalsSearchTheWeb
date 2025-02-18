document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('search-query').value;
    const apiUrl = `https://duckduckgo.com/api?q=${encodeURIComponent(query)}&format=json`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.RelatedTopics && data.RelatedTopics.length > 0) {
                const results = data.RelatedTopics;
                let resultHtml = '<ul>';
                results.forEach(result => {
                    if (result.FirstURL) {
                        resultHtml += `<li><a href="${result.FirstURL}" target="_blank">${result.Text}</a></li>`;
                    }
                });
                resultHtml += '</ul>';
                document.body.innerHTML = resultHtml; // Display results
            } else {
                document.body.innerHTML = "<p>No results found.</p>";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.body.innerHTML = "<p>Error occurred while searching.</p>";
        });
});


document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('search-query').value.trim();

    // Check for bangs
    const bangRegex = /^!(\w+)(.*)$/;
    const match = query.match(bangRegex);

    if (match) {
        const bang = match[1];  // Extract the bang (e.g., 'g' for Google)
        const searchQuery = match[2].trim(); // Extract the search term after the bang

        let redirectUrl;

        switch (bang) {
            case 'g': // Google
                redirectUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
                break;
            case 'w': // Wikipedia
                redirectUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(searchQuery)}`;
                break;
            // Add more cases for other bangs
            default:
                redirectUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
        }

        window.location.href = redirectUrl; // Redirect to the appropriate URL
    } else {
        const apiUrl = `https://duckduckgo.com/api?q=${encodeURIComponent(query)}&format=json`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.RelatedTopics && data.RelatedTopics.length > 0) {
                    const results = data.RelatedTopics;
                    let resultHtml = '<ul>';
                    results.forEach(result => {
                        if (result.FirstURL) {
                            resultHtml += `<li><a href="${result.FirstURL}" target="_blank">${result.Text}</a></li>`;
                        }
                    });
                    resultHtml += '</ul>';
                    document.body.innerHTML = resultHtml; // Display results
                } else {
                    document.body.innerHTML = "<p>No results found.</p>";
                }
            })
            .catch(error => {
                console.error('Error:', error);
                document.body.innerHTML = "<p>Error occurred while searching.</p>";
            });
    }
});
