import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Scene, SceneReference } from "../../../domain/domain";
import { emptyScene } from "../../../service/builder";
import "./ReadingScene.scss";
import { ReadingSceneOption } from "./ReadingSceneOption";
import { ReadingSceneText } from "./ReadingSceneText";

interface ReadingSceneProps {
    sceneReference: SceneReference
    changeSceneReference: (newSceneReference: SceneReference) => void
}

export const ReadingScene: FC<ReadingSceneProps> = ({sceneReference, changeSceneReference}) => {

    const [scene, setScene] = useState<Scene>(emptyScene)
    const [shouldDisplay, setShouldDisplay] = useState<boolean>(true)

    useEffect(
        () => {
            axios
                .get(`http://localhost:9000/scene/${sceneReference.chapter}/${sceneReference.idInChapter}`)
                .then(response => setScene(response.data))

            setTimeout(() => setShouldDisplay(true), 50)
        },
        [sceneReference]
    )

    if (shouldDisplay) {
        return(
            <div id="reading_scene_div">
    
                <ul>
                    <li> Capítulo: {scene.chapter} </li>
                    <li> Sección: {scene.idInChapter} </li>
                </ul>
    
                <div id="reading_scene_title_div">
                    <h2>{scene.title}</h2>
                </div>
    
                <div id="reading_scene_text_div">
                    <ReadingSceneText text={scene.text} />
                </div>
    
                <div id="reading_scene_text_div">
                    {scene.optionList.map((option, i) => <ReadingSceneOption key={i} option={option} i={i} changeSceneReference={() => {setShouldDisplay(false); changeSceneReference(option.sceneReference)}} />)}
                </div>
    
            </div>
        )
    } else {
        return <></>
    }

    
}