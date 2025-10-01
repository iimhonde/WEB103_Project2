import { pool } from './database.js'
import './dotenv.js'
import trails from '../data/trails.js'

const createTrailsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS trails;

        CREATE TABLE IF NOT EXISTS trails (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            location VARCHAR(255) NOT NULL,
            length_miles DECIMAL(5,2) NOT NULL,
            elevation_gain_ft INTEGER NOT NULL,
            difficulty VARCHAR(100) NOT NULL,
            rating DECIMAL(2,1) NOT NULL,
            trail_type VARCHAR(100) NOT NULL,
            dog_friendly BOOLEAN NOT NULL,
            fees VARCHAR(255) NOT NULL,
            keywords TEXT[] NOT NULL,
            typical_weather TEXT NOT NULL,
            recent_conditions TEXT NOT NULL,
            description TEXT NOT NULL,
            image VARCHAR(500)
        )
    `

  try {
    const res = await pool.query(createTableQuery);
    console.log("🏔️ Trails table created successfully");
  } catch (error) {
    console.error("❌ Error creating trails table:", error);
  }
}

const seedTrailsTable = async () => {
    await createTrailsTable()

    trails.forEach((trail) => {
        const insertQuery = {
            text: 'INSERT INTO trails (id, name, location, length_miles, elevation_gain_ft, difficulty, rating, trail_type, dog_friendly, fees, keywords, typical_weather, recent_conditions, description, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)'
        }

        const values = [
            trail.id,
            trail.name,
            trail.location,
            trail.lengthMiles,
            trail.elevationGainFt,
            trail.difficulty,
            trail.rating,
            trail.trailType,
            trail.dogFriendly,
            trail.fees,
            trail.keywords,
            trail.typicalWeather,
            trail.recentConditions,
            trail.description,
            trail.image
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting trail', err)
                return
            }

            console.log(`✅ ${trail.name} added successfully`)
        })
    })
}

seedTrailsTable()