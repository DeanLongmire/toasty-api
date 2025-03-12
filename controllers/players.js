import { client, dbname } from "../database.js";

const playersCollection = client.db(dbname).collection("players");

const findPlayer = async (id) => {
    const query = { _id: id };
    let player;

    try {
        player = await playersCollection.findOne(query);
        console.log(player);
    } catch(error) {
        throw error;
    }

    if(player == null) {
        throw new Error("player not found");
    }
    
    return player;
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