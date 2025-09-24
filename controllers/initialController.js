"use strict"
const axios = require('axios')
const Models = require('../models')

// Helper function for delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const storeChampions = async () => {
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
                const championObj = {
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
                    defaults: championObj
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
        console.error("Error storing champions: ", err.message)
    }
}

const storeAbilities = async () => {
    try {
        // 1. Fetch all champions
        const response = await axios.get(
            "https://ddragon.leagueoflegends.com/cdn/15.18.1/data/en_US/champion.json"
        )
        const champions = response.data.data

        const spellSlots = ["Q", "W", "E", "R"]
        let storedCount = 0

        // 2. Loop through each champion
        for (let champKey in champions) {
            const champ = champions[champKey]

            try {
                // Fetch individual champion data
                const response2 = await axios.get(
                    `https://ddragon.leagueoflegends.com/cdn/15.18.1/data/en_US/champion/${champKey}.json`
                )
                const champData = response2.data.data[champ.id]

                // Find champion in DB to get ID
                const championRecord = await Models.Champion.findOne({
                    where: { name: champ.name }
                })
                if (!championRecord) {
                    console.warn(`Champion ${champ.name} not found, skipping abilities...`)
                    continue
                }

                const championId = championRecord.id

                // Build abilities array (Passive + Q/W/E/R)
                const abilities = []

                // Add Passive if it exists
                if (champData.passive) {
                    abilities.push({
                        champion_id: championId,
                        name: champData.passive.name,
                        description: champData.passive.description,
                        type: "Passive"
                    })
                }

                // Add Q/W/E/R spells
                champData.spells.forEach((spell, i) => {
                    if (!spell) return
                    const type = spellSlots[i] || `Unknown-${i}` // fallback if i > 3
                    if (type.startsWith("Unknown")) {
                        console.warn(`Unexpected spell index ${i} for ${champ.name}`)
                    }

                    abilities.push({
                        champion_id: championId,
                        name: spell.name,
                        description: spell.description,
                        type
                    })
                })

                // Store all abilities
                for (const abilityObj of abilities) {
                    await Models.Ability.findOrCreate({
                        where: { champion_id: championId, type: abilityObj.type },
                        defaults: abilityObj
                    })
                    console.log(`Stored ability for ${champ.name}: ${abilityObj.name}`)
                    storedCount++
                }

                // Delay to prevent hitting API too fast
                await delay(50)

            } catch (err) {
                console.error(`Failed to fetch/store abilities for ${champ.name}: ${err.message}`)
            }
        }

        console.log(`Abilities import complete. Total abilities stored: ${storedCount}`)
    } catch (err) {
        console.error("Error fetching champion list:", err.message)
    }
}

module.exports = {
    storeChampions,
    storeAbilities
}
