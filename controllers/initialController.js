"use strict"
const axios = require('axios')
const Models = require('../models')

// Helper function for delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const storeData = async () => {
    try {
        // 1. Get all champions
        const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/15.18.1/data/en_US/champion.json`)
        const champions = response.data.data

        let storedCount = 0 // counter for successfully stored champions

        // 2. Loop through each champion
        for (let champKey in champions) {
            const champ = champions[champKey]

            try {
                // Fetch individual champion file for lore and other details
                const response2 = await axios.get(`https://ddragon.leagueoflegends.com/cdn/15.18.1/data/en_US/champion/${champKey}.json`)
                const champData = response2.data.data[champ.id]

                // Format object for database
                const formatObj = {
                    name: champ.name,
                    title: champ.title,
                    image: champ.image.full,
                    lore: champData.lore,
                    ally_tips: champData.allytips,
                    enemy_tips: champData.enemytips,
                    type: champData.tags,
                    difficulty: champData.info.difficulty
                }

                // Store in database (or skip if already exists)
                const [newChamp, created] = await Models.Champion.findOrCreate({
                    where: { name: champ.name },
                    defaults: formatObj
                })

                storedCount++
                console.log(`Stored: ${champ.name}`)

                // Delay before fetching the next champion
                await delay(50) // 50ms delay
            } catch (err) {
                console.error(`Failed to fetch/store ${champ.name}: ${err.message}`)
                continue // skip to next champion
            }
        }

        console.log(`Data import complete. ${storedCount} champions stored.`)
    } catch (err) {
        console.error("Error fetching champion list:", err.message)
    }
}

module.exports = {
    storeData
}
