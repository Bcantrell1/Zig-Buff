import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import httpClient from "../../httpClient";

const PlayerInfo = (props) => {
    const token = httpClient.getToken();
    const { response, loading, error } = useAxios({
        method: "get",
        url: `${import.meta.env.VITE_DOTA_API}/player/${
            props.accountId
        }/${token}`,
        headers: JSON.stringify({
            accept: "*/*",
        }),
    });
    const [player, setPlayer] = useState(null);
    const [rankTier, setRankTier] = useState(0);
    const [mmr, setMmr] = useState(0);

    useEffect(() => {
        if (response !== null) {
            //LogOut if request for route is denied
            if (response.success === false) {
                return props.logOut();
            }
            setMmr(response.mmr_estimate.estimate);
            setRankTier(response.rank_tier);
            setPlayer(response.profile);
        }
    }, [response]);

    return (
        <div className="App">
            <h1>Player data</h1>
            {loading ? (
                <p>loading...</p>
            ) : (
                <div>
                    {error && (
                        <div>
                            <p>{error.message}</p>
                        </div>
                    )}
                    {player && (
                        <div>
                            <p>Personaname: {player.personaname}</p>
                            <p>Steam Id: {player.steamid}</p>
                            <p>Rank: {rankTier}</p>
                            <p>Mmr: {mmr}</p>
                            <img src={player.avatarfull} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PlayerInfo;
