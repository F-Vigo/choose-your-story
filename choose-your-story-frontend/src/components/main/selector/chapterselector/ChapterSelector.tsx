import { FC, useState } from "react";
import { Mode } from "../../../../const/const"
import "./ChapterSelector.scss"

interface ChapterSelectorProps {
  mode: string
  changeChapter: (newChapter: number) => void
}

export const ChapterSelector: FC<ChapterSelectorProps> = ({mode, changeChapter}) => {

  const [lastChapter, setLastChapter] = useState<number>(18) // Temporary
  const [newPressed, setNewPressed] = useState<boolean>(false)

  const addChapter = (): void => {
    if (!newPressed) {
      setLastChapter(lastChapter+1)
      setNewPressed(true)
    }
  }

    return (
      <>
      <h2> Capítulo </h2>
        <ol id="chapter_selector_ol">
          {Array.from(Array(lastChapter).keys()).map(i => <li key={i} onClick={() => changeChapter(i)}>{/* Temporary */1+i}</li>)}
       </ol>
       {
        (mode === Mode.WRITING)
          ? <button id="new_chapter_button" onClick={addChapter} style={{visibility: newPressed ? "hidden" : "visible"}}> Nuevo </button>
          : <></>
       }
      </>
    )
}