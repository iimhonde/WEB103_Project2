import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "../public")));

const PORT = 3000;



const trails = [
  {
    slug: "arboretum-loop",
    name: "Arboretum Loop",
    location: "UCF Arboretum, Orlando, FL",
    lengthMiles: 2.1,
    elevationGainFt: 85,
    difficulty: "Easy",
    rating: 4.4,
    trailType: "Loop",
    dogFriendly: true,
    fees: "Free",
    keywords: ["flat", "wildflowers", "boardwalk", "shaded"],
    typicalWeather: "Humid subtropical; afternoon thunderstorms in summer",
    recentConditions: "Dry, some muddy spots after rain",
    description:
      "A gentle loop through pine flatwoods and wetlands—great for quick nature breaks and birdwatching.",
    image: "https://i.redd.it/kyb9s54z27g51.jpg" 
    },
  {
    slug: "sandpine-ridge",
    name: "Sandpine Ridge Trail",
    location: "Split Oak Forest, Orange/Osceola, FL",
    lengthMiles: 4.7,
    elevationGainFt: 160,
    difficulty: "Moderate",
    rating: 4.6,
    trailType: "Loop",
    dogFriendly: false,
    fees: "Free",
    keywords: ["scrub", "longleaf", "wildlife", "open"],
    typicalWeather: "Warm; high UV exposure on open ridges",
    recentConditions: "Sandy sections; exposed and hot midday",
    description:
      "Rolling sandhill terrain with longleaf pines and scrub habitats—watch for gopher tortoises.",
    image: "https://photos.smugmug.com/Florida-Hikes/Bald-Point-State-Park/i-7shG57H/0/d61fb836/L/Sand%20Pine%20Trail%20CS%20%286%29-L.jpg"
  },
  {
    slug: "river-hammock",
    name: "River Hammock Path",
    location: "Econlockhatchee River, FL",
    lengthMiles: 5.2,
    elevationGainFt: 220,
    difficulty: "Moderate",
    rating: 4.3,
    trailType: "Out-and-Back",
    dogFriendly: true,
    fees: "$2 parking",
    keywords: ["river", "roots", "cypress", "shade"],
    typicalWeather: "Mosquitoes in warmer months; cooler near water",
    recentConditions: "Some roots and slick banks near the river",
    description:
      "Winds along the Econ with cypress knees and shaded hammocks—nice breeze by the water.",
    image: "https://photos.smugmug.com/Florida-Hikes/Peace-River-Hammock/i-VJmK2TZ/0/DK6SMTThrbpFqWwrfgMSH8cF4hzcSHNdhFghvdfd8/L/2024-04%20Peace%20River%20Hammock%20%2813%29-L.jpg"
  },
  {
    slug: "coastal-dune-lakes",
    name: "Coastal Dune Lakes Track",
    location: "Grayton Beach State Park, FL",
    lengthMiles: 3.8,
    elevationGainFt: 95,
    difficulty: "Easy",
    rating: 4.7,
    trailType: "Lollipop",
    dogFriendly: false,
    fees: "State park entry fee",
    keywords: ["coastal", "dune", "lake", "wildflowers"],
    typicalWeather: "Breezy; salt spray; quick-moving showers possible",
    recentConditions: "Firm sand; occasional puddles after storms",
    description:
      "Unique coastal dune lakes with wildflower edges—great light near sunset.",
    image: "https://cdn.visitsouthwalton.com/userfiles/DuneLake_Outfall_SouthWalton_FL.jpg"
  },
  {
    slug: "scrub-jay-summit",
    name: "Scrub-Jay Summit",
    location: "Merritt Island NWR, FL",
    lengthMiles: 6.0,
    elevationGainFt: 340,
    difficulty: "Moderate/Hard",
    rating: 4.5,
    trailType: "Out-and-Back",
    dogFriendly: false,
    fees: "Refuge pass",
    keywords: ["birding", "scrub", "expansive-views", "exposed"],
    typicalWeather: "Hot, dry wind; limited shade",
    recentConditions: "Dry and sandy; bring extra water",
    description:
      "Long, exposed stretches through scrub habitat—chance to spot Florida scrub-jays.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/California_Scrub_Jay%2C_Richmond%2C_Contra_Costa%2C_California_%2830644196597%29.jpg/1200px-California_Scrub_Jay%2C_Richmond%2C_Contra_Costa%2C_California_%2830644196597%29.jpg"
  }
];


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
