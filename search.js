document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload

    const query = document.getElementById('search-query').value.trim();

    // Check for bangs
    if (query.startsWith("!")) {
        // Extract the bang and search term
        const parts = query.split(" ");
        const bang = parts[0];  // First part is the bang (e.g., "!g")
        const searchQuery = parts.slice(1).join(" "); // Everything else is the query

        let redirectUrl;

        switch (bang) {
            case '!g': // Google
                redirectUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
                break;
            case '!w': // Wikipedia
                redirectUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(searchQuery)}`;
                break;
            case '!yt': // YouTube
                redirectUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
                break;
            default:
                // Unknown bang: Redirect to DuckDuckGo
                redirectUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
        }

        window.location.href = redirectUrl;
    } else {
        // Regular search: Redirect to DuckDuckGo search page
        window.location.href = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
    }
});
