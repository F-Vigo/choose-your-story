import axios from "axios";
import { FC, useEffect, useState } from "react";
import { alphabet } from "../../../const/const";
import { Option } from "../../../domain/domain";
import { emptyOption } from "../../../service/builder";
import { setLoadingMode } from "../../../service/service";
import { WritingSceneOption } from "./WritingSceneOption";

interface WritingSceneOptionListProps {
    optionList: Option[]
}

export const WritingSceneOptionList: FC<WritingSceneOptionListProps> = ({optionList}) => {

    const [optionCounter, setOptionCounter] = useState<number>(0)
    const [lastChapter, setLastChapter] = useState<number>(0)
    

    useEffect(
        () => {
            setOptionCounter(optionList.length)
            setLoadingMode(true)
            axios
                .get("http://localhost:9000/last-chapter")
                .then(response => {setLastChapter(response.data); setLoadingMode(false)})
        }, [optionList]
    )

    const minusClicked = (): void => {
        if (optionCounter > 0) {
            setOptionCounter(optionCounter-1)
        }
    }

    return (
        <>
            <div id="writing_scene_optionList_button_div">
                <button type="button" onClick={minusClicked}>-</button>
                <button type="button" onClick={() => setOptionCounter(optionCounter+1)}>+</button>
            </div>
            <div>
                {
                    Array.from(Array(optionCounter).keys()).map(i => <WritingSceneOption key={i} letter={alphabet[i]} lastChapter={lastChapter} option={(i < optionList.length) ? optionList[i] : emptyOption} />)
                }
            </div>
        </>
    )
}