import { Option, Scene, SceneHeader, SceneReference } from "../domain/domain";

export const buildEmptyScene = (chapter: number, idInChapter: number): Scene => {
    return new Scene(chapter, idInChapter, "", "", [])
}

export const emptyScene: Scene = buildEmptyScene(0,0)

export const emptySceneReference: SceneReference = new SceneReference(0, 0)
export const emptySceneHeader: SceneHeader = new SceneHeader(0, 0, "")
export const emptyOption = new Option("", emptySceneReference)
