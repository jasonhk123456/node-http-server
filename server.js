const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send(JSON.stringify(req.headers, null, 2));
});

app.get('/secure', (req, res) => {
    const email = "user@example.com"; // Replace with real authentication logic
    const timestamp = new Date().toISOString();
    const country = req.headers["cf-ipcountry"] || "Unknown"; // Cloudflare header

    res.send(`
        <html>
          <body>
            <p>${email} authenticated at ${timestamp} from 
              <a href="/secure/${country}">${country}</a>
            </p>
          </body>
        </html>
    `);
});

app.get('/secure/:country', (req, res) => {
    const countryCode = req.params.country.toUpperCase();
    const bucketUrl = `https://your-private-r2-bucket-url/${countryCode}.png`; // Replace with real R2 URL

    res.setHeader('Content-Type', 'text/html');
    res.send(`
        <html>
          <body>
            <img src="${bucketUrl}" alt="Flag of ${countryCode}">
          </body>
        </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
