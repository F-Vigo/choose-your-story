import { FC } from "react";
import { alphabet } from "../../../const/const";
import { Option, SceneReference } from "../../../domain/domain";

interface ReadingSceneOptionProps {
    option: Option
    i: number
    changeSceneReference: (newSceneReference: SceneReference) => void
}

export const ReadingSceneOption: FC<ReadingSceneOptionProps> = ({option, i, changeSceneReference}) => {
    return(
        <div className="reading_option" onClick={() => changeSceneReference(option.sceneReference)}>
            <label>{alphabet[i]}</label>
            <p>{option.text}</p>
        </div>
    )
}