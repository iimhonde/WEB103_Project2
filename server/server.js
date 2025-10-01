import express from "express";
import "./config/dotenv.js";
import path from "path";
import { fileURLToPath } from "url";
import trails from "./data/trails.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "../public")));

const PORT = 3000;


function layout({ title, body, backLink }) {
  return /*html*/ `
    <!doctype html>
    <html lang="en" data-theme="light">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${title}</title>
        <!-- PicoCSS -->
        <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css">
        <link rel="stylesheet" href="/main.css">
      </head>
      <body>
        <header class="banner">
            <h1>Florida Trails</h1>
            <nav>
                <ul>
                ${backLink ? `<li><a href="${backLink}" role="button" class="secondary">← Back</a></li>` : ""}
                <li><a href="/" role="button">Home</a></li>
                </ul>
            </nav>
        </header>


        <main class="container">
          ${body}
        </main>

        <footer class="container">
          <small>Built with Express + PicoCSS • Nature Edition</small>
        </footer>
      </body>
    </html>
  `;
}

function placeholderImg(name) {
  return `
    <div class="placeholder-img" aria-label="No image yet for ${name}">
      <span>No Image</span>
    </div>
  `;
}

function listCard(t) {
  return /*html*/ `
    <article>
      <header><h3><a href="/trails/${t.slug}">${t.name}</a></h3></header>
      ${t.image ? `<img src="${t.image}" alt="${t.name}" class="card-img">` : placeholderImg(t.name)}
      <p><strong>Location:</strong> ${t.location}</p>
      <p><strong>Length:</strong> ${t.lengthMiles} mi • <strong>Gain:</strong> ${t.elevationGainFt} ft</p>
      <p><strong>Difficulty:</strong> ${t.difficulty} • <strong>Rating:</strong> ${t.rating.toFixed(1)} / 5</p>
      <footer><a href="/trails/${t.slug}" role="button">View details</a></footer>
    </article>
  `;
}

function homePage() {
  const body = /*html*/ `
    <h1>Hiking Trails</h1>
    <p>Click a trail to view full details (all fields).</p>
    <div class="grid">
      ${trails.map(listCard).join("")}
    </div>
  `;
  return layout({ title: "Hiking Trails", body });
}

function detailPage(trail) {
  const body = /*html*/ `
    <h1>${trail.name}</h1>
    <article>
      <div class="grid">
        <div>
          ${trail.image ? `<img src="${trail.image}" alt="${trail.name}" class="detail-img">` : placeholderImg(trail.name)}
        </div>
        <div>
          <table>
            <tbody>
              
              <tr><th>Name</th><td>${trail.name}</td></tr>
              <tr><th>Location</th><td>${trail.location}</td></tr>
              <tr><th>Length (miles)</th><td>${trail.lengthMiles}</td></tr>
              <tr><th>Elevation Gain (ft)</th><td>${trail.elevationGainFt}</td></tr>
              <tr><th>Difficulty</th><td>${trail.difficulty}</td></tr>
              <tr><th>Rating</th><td>${trail.rating.toFixed(1)} / 5</td></tr>
              <tr><th>Trail Type</th><td>${trail.trailType}</td></tr>
              <tr><th>Dog Friendly</th><td>${trail.dogFriendly ? "Yes" : "No"}</td></tr>
              <tr><th>Fees</th><td>${trail.fees}</td></tr>
              <tr><th>Keywords</th><td>${trail.keywords.join(", ")}</td></tr>
              <tr><th>Typical Weather</th><td>${trail.typicalWeather}</td></tr>
              <tr><th>Recent Conditions</th><td>${trail.recentConditions}</td></tr>
              <tr><th>Description</th><td>${trail.description}</td></tr>
         
            </tbody>
          </table>
        </div>
      </div>
    </article>
  `;
  return layout({ title: trail.name, body, backLink: "/" });
}

function notFoundPage(url) {
  const body = /*html*/ `
    <h1>404 — Not Found</h1>
    <p>No route matches <code>${url}</code>.</p>
    <p>Try going back home.</p>
  `;
  return layout({ title: "404 — Not Found", body, backLink: "/" });
}


app.get("/", (req, res) => {
  res.send(homePage());
});

app.get("/trails/:slug", (req, res) => {
  const trail = trails.find(t => t.slug === req.params.slug);
  if (!trail) return res.status(404).send(notFoundPage(req.originalUrl));
  res.send(detailPage(trail));
});


app.use((req, res) => {
  res.status(404).send(notFoundPage(req.originalUrl));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
