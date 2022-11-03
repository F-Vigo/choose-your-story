import { FC, useState } from "react";
import { alphabet } from "../../../const/const";

interface WritingSceneOptionListProps {}

export const WritingSceneOptionList: FC<WritingSceneOptionListProps> = () => {

    const [optionCounter, setOptionCounter] = useState<number>(0)

    const minusClicked = (): void => {
        if (optionCounter > 0) {
            setOptionCounter(optionCounter-1)
        }
    }


    return (
        <>
            <div id="writing_scene_optionList_button_div">
                <button onClick={minusClicked}>-</button>
                <button onClick={() => setOptionCounter(optionCounter+1)}>+</button>
            </div>
            <div>
                {
                    Array.from(Array(optionCounter).keys()).map(i => 
                        <div key={i} className="option_div">
                            <p> Opción {alphabet[i]} </p>
                            <div>
                                <label> Texto de la opción: </label>
                                <textarea></textarea>
                            </div>
                            <div className="scene_reference_div">
                                <p> Dirige a: </p>
                                <div>
                                    <label> Capítulo: </label>
                                    <select></select>
                                </div>
                                <div>
                                    <label> Índice en el capítulo: </label>
                                    <select></select>
                                </div>
                                
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}