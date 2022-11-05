import { Option, Scene, SceneReference } from "../domain/domain";

export const buildSceneFromForm = (): Scene => {
    const chapter: number = +(document.getElementById("chapter_li_span")!.innerHTML)
    const idInChapter: number = +(document.getElementById("id_li_span")!.innerHTML)
    const title: string = (document.getElementById("title_input") as HTMLInputElement)!.value
    const text: string = (document.getElementById("text_input") as HTMLTextAreaElement)!.value.trim()
    const optionList: Option[] = buildOptionListFromForm()
    return new Scene(chapter, idInChapter, title, text, optionList);
}

const buildOptionListFromForm = (): Option[] => {
    let result: Option[] = []
    const n: number = document.getElementsByClassName("option_div").length
    for (let i = 0; i < n; i++) {
        result = appendOptionFromForm(result, i)
    }
    return result
}

const appendOptionFromForm = (optionList: Option[], i: number) => {
    const text: string = (document.getElementsByClassName("option_text")[i] as HTMLInputElement).value.trim()
    const chapter: number = +((document.getElementsByClassName("option_chapter")[i] as HTMLSelectElement).value)
    const idInChapter: number = +((document.getElementsByClassName("option_idInChapter")[i] as HTMLSelectElement).value)
    const option: Option = new Option(text, new SceneReference(chapter, idInChapter))
    return [...optionList, option]
}

export const checkSceneIsReady = (): boolean => {
    
    const chapterCollection = document.getElementsByClassName("option_chapter")
    const idInChapterCollection = document.getElementsByClassName("option_idInChapter")
    const n: number = chapterCollection.length
    let soFarSoGood: boolean = true

    for (let i = 0; i < n && soFarSoGood; i++) {
        if (chapterCollection[i].innerHTML === "-" || idInChapterCollection[i].innerHTML === "-") {
            soFarSoGood = false
        }
    }

    return soFarSoGood
}