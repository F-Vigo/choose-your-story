import { FC, useState } from "react";
import { Mode } from "../../../const/const";
import { Content } from "./Content";
import "./ContentWrapper.scss";

interface ContentWrapperProps {
    mode: string
}

export const ContentWrapper: FC<ContentWrapperProps> = ({mode}) => {

    const [chapter, setChapter] = useState<number>(-1)
    const [sceneIdInChapter, setSceneInChapter] = useState<number>(-1)

    const changeChapter = (newChapter: number): void => setChapter(newChapter)
    const changeScene = (newSceneIdInChapter: number): void => setSceneInChapter(newSceneIdInChapter)

    const goBack = (): void => {
        if (sceneIdInChapter === -1) {
            changeChapter(-1)
        } else {
            changeScene(-1)
        }
    }

    return(
        <div id="writing_div">
            <button id="writing_back" style={{opacity: (chapter === -1) ? "0" : "1"}} onClick={goBack}> Atrás </button>
            <Content mode={mode} chapter={chapter} sceneIdInChapter={sceneIdInChapter} changeChapter={changeChapter} changeScene={changeScene} />
        </div>
    )
}