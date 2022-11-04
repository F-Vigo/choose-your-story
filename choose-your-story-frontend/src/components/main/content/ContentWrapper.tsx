import { FC, useState } from "react";
import { Content } from "./Content";
import "./ContentWrapper.scss";

interface ContentWrapperProps {
    mode: string
}

export const ContentWrapper: FC<ContentWrapperProps> = ({mode}) => {

    const [chapter, setChapter] = useState<number>(0)
    const [sceneIdInChapter, setSceneInChapter] = useState<number>(0)

    const changeChapter = (newChapter: number): void => setChapter(newChapter)
    const changeScene = (newSceneIdInChapter: number): void => setSceneInChapter(newSceneIdInChapter)

    const goBack = (): void => {
        if (sceneIdInChapter === 0) {
            changeChapter(0)
        } else {
            changeScene(0)
        }
    }

    return(
        <div id="writing_div">
            <button id="writing_back" style={{opacity: (chapter === 0) ? "0" : "1"}} onClick={goBack}> Atrás </button>
            <Content mode={mode} chapter={chapter} sceneIdInChapter={sceneIdInChapter} changeChapter={changeChapter} changeScene={changeScene} />
        </div>
    )
}