import { FC, useState } from "react"
import { Mode } from "../../../../const/const";
import { Scene } from "../../../../domain/domain"
import { buildEmptySceneWithChapter, emptyScene } from "../../../../service/builder"
import "./SceneSelector.scss";

interface SceneSelectorProps {
    mode: string,
    chapter: number,
    changeScene: (newSceneIdInChapter: number) => void
}

export const SceneSelector: FC<SceneSelectorProps> = ({mode, chapter, changeScene}) => {


    const [sceneList, setSceneList] = useState<Scene[]>([buildEmptySceneWithChapter(0), buildEmptySceneWithChapter(1)]) // Temporary
    const [newPressed, setNewPressed] = useState<boolean>(false)

    const addChapter = (): void => {
        if (!newPressed) {
            setSceneList([...sceneList, emptyScene])
            setNewPressed(true)
        }
    }

    return(
        <>
            <h2> Escena </h2>
            <ol id="scene_selector_ol">
                {sceneList.map((scene, i) => <li key={i} onClick={() => changeScene(scene.idInChapter)}>{scene.idInChapter}. {scene.title}</li>)}
            </ol>
            {
                (mode === Mode.WRITING)
                    ? <button id="new_scene_button" style={{opacity: newPressed ? "0" : "1"}} onClick={addChapter}> Nuevo </button>
                    : <></>
            }
        </>
    )
}