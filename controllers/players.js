import { client, dbname } from "../database.js";

const playersCollection = client.db(dbname).collection("players");

const findPlayer = async (id) => {
    const query = { _id: id };
    let player;

    try {
        player = await playersCollection.findOne(query);
    } catch(error) {
        throw error;
    }

    if(player == null) {
        throw new Error("player not found");
    }

    const trimmedPlayer = {
        firstName: player.first_name,
        lastName: player.last_name,
        birthDate: player.birth_date,
        status: player.status,
        yearsExp: player.years_exp,
        position: player.position,
        college: player.college,
        fullName: player.full_name,
        team: player.team,
        statsId: player.stats_id,
        image: player.image,
    }
    
    return {
        data: {
            attributes: trimmedPlayer,
            id: player._id,
            type: "player",
        },
    };
}

const getPlayer = async(req, res) => {
    const id = req.params.id;

    try {
        let player = await findPlayer(id);
        res.status(200).send(player);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export { getPlayer };