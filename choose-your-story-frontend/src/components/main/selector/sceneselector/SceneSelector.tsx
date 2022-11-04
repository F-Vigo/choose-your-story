import axios from "axios";
import { FC, useEffect, useState } from "react"
import { Mode } from "../../../../const/const";
import { SceneHeader } from "../../../../domain/domain"
import { buildEmptyScene } from "../../../../service/builder"
import "./SceneSelector.scss";

interface SceneSelectorProps {
    mode: string,
    chapter: number,
    changeScene: (newSceneIdInChapter: number) => void
}

export const SceneSelector: FC<SceneSelectorProps> = ({mode, chapter, changeScene}) => {

    const [sceneHeaderList, setSceneHeaderList] = useState<SceneHeader[]>([])
    const [newPressed, setNewPressed] = useState<boolean>(false)

    useEffect(
        () => {axios
        .get(`http://localhost:9000/scene-header-list/${chapter}`)
        .then(response => setSceneHeaderList(response.data))},
        []
    )

    const addScene = (): void => {
        if (!newPressed) {
            setSceneHeaderList([...sceneHeaderList, buildEmptyScene(chapter, sceneHeaderList.length+1)])
            setNewPressed(true)
        }
    }

    return(
        <>
            <h2> Escena </h2>
            <ol id="scene_selector_ol">
                {sceneHeaderList.map((header, i) => <li key={i} onClick={() => changeScene(header.idInChapter)}>{header.idInChapter}. {header.title}</li>)}
            </ol>
            {
                (mode === Mode.WRITING)
                    ? <button id="new_scene_button" style={{opacity: newPressed ? "0" : "1"}} onClick={addScene}> Nuevo </button>
                    : <></>
            }
        </>
    )
}