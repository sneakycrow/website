import React, {useEffect, useState} from 'react';
import dynamic from "next/dynamic";
import Intro from "../components/intro";

const Player = dynamic(
    () => {
        return import("../components/VideoPlayer");
    },
    {ssr: false}
);

const Videos = () => {
    const [videoURLList, setVideoURLList] = useState([]);
    useEffect(async () => {
        const res = await fetch("https://qln1awnny3.execute-api.us-east-1.amazonaws.com/default/dionysus-consume", {
            headers: {
                "X-Api-Key": "J3ORQvoTHZ9iuPDAaPxAua7qgwPfd6yD7MIez6vk"
            }
        });
        const json = await res.json()
        setVideoURLList(json)
    }, [])
    return (
        <div className="flex flex-col items-center">
            <Intro subtitle={"videos and clips"}/>

            {videoURLList.map((url, index) => (
                <div className="w-1/2 my-20" key={`hls-${index}`}>
                    <Player url={url}/>
                </div>
            ))}
        </div>
    )
}

export default Videos;
