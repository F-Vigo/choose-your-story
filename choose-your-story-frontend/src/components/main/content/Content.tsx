import { FC, useState } from "react"
import { WritingScene } from "../writingscene/WritingScene"
import { ChapterSelector } from "../selector/chapterselector/ChapterSelector"
import { SceneSelector } from "../selector/sceneselector/SceneSelector"
import { Mode } from "../../../const/const"
import { ReadingScene } from "../readingscene/ReadingScene"
import { SceneReference } from "../../../domain/domain"
import { emptySceneReference } from "../../../service/builder"

interface ContentProps {
    mode: string
    chapter: number
    sceneIdInChapter: number
    changeChapter: (newChapter: number) => void
    changeScene: (newSceneIdInChapter: number) => void
}

export const Content: FC<ContentProps> = ({mode, chapter, sceneIdInChapter, changeChapter, changeScene}) => {

    const [sceneReference, setSceneReference] = useState<SceneReference>(emptySceneReference)

    const changeSceneReference = (newSceneReference: SceneReference): void => {
        setSceneReference(newSceneReference)
        changeChapter(newSceneReference.chapter)
        changeScene(newSceneReference.idInChapter)
    }

    const changeChapterInReference = (newChapter: number): void => {
        changeSceneReference(new SceneReference(newChapter, 0))
    }

    const changeSceneInReference = (newId: number): void => {
        changeSceneReference(new SceneReference(sceneReference.chapter, newId))
    }

    if (chapter === 0) {
        return(<ChapterSelector mode={Mode.WRITING} changeChapter={changeChapterInReference} />)
    } else if (sceneIdInChapter === 0) {
        return(<SceneSelector mode={Mode.WRITING} chapter={chapter} changeScene={changeSceneInReference} />)
    } else {
        if (mode === Mode.WRITING) {
            return(<WritingScene sceneReference={sceneReference} />)
        } else {
            return(<ReadingScene sceneReference={sceneReference} changeSceneReference={changeSceneReference} />)
        }
    }
}