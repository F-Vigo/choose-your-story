export class Scene {
    constructor(
        chapter: number,
        idInChapter: number,
        title: string,
        text: string,
        optionList: Option[]
    ) {
        this.chapter = chapter
        this.idInChapter = idInChapter
        this.title = title
        this.text = text
        this.optionList = optionList
    }
    chapter: number
    idInChapter: number
    title: string
    text: string
    optionList: Option[]
}

export class Option {
    constructor(
        text: string,
        sceneReference: SceneReference
    ) {
        this.text = text;
        this.sceneReference = sceneReference;
    }
    text: string
    sceneReference: SceneReference
}

export class SceneReference {
    constructor(
        chapter: number,
        idInChapter: number
    ) {
        this.chapter = chapter
        this.idInChapter = idInChapter
    }
    chapter: number
    idInChapter: number
}