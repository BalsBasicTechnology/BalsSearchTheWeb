const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

// API route for search
app.get("/search", async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: "Missing search query" });
    }

    try {
        // Fetch data from DuckDuckGo API
        const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`);
        
        // Check if the response is successful
        if (!response.ok) {
            // Log the error for debugging
            console.error(`Error fetching from DuckDuckGo: ${response.status} - ${response.statusText}`);
            return res.status(500).json({ error: "Failed to fetch results from DuckDuckGo" });
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        // Log the actual error to debug
        console.error("Error occurred while fetching results:", error.message);
        res.status(500).json({ error: "Failed to fetch results", details: error.message });
    }
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
