import React, { FC, useState } from "react";
import { Scene, SceneReference } from "../../../domain/domain";
import { emptyScene } from "../../../service/builder";
import { WritingSceneOptionList } from "./WritingSceneOptionList";
import "./WritingScene.scss";

interface WriginSceneProps {
    sceneReference: SceneReference
}

export const WritingScene: FC<WriginSceneProps> = ({sceneReference}) => {

    const [scene, setScene] = useState<Scene>(emptyScene)

    const submit = (e: React.SyntheticEvent): void => {
        e.preventDefault()
    }

    return (

        <div id="writing_scene_div">

            <ul>
                <li> Capítulo: {sceneReference.chapter} </li>
                <li> Índice en el capítulo: {sceneReference.idInChapter} </li>
            </ul>

            <form onSubmit={submit}>

                <div id="writing_scene_title_div">
                    <label> Título: </label>
                    <input type="text" defaultValue={scene.title}></input>
                </div>

                <div id="writing_scene_text_div">
                    <label> Texto: </label>
                    <textarea></textarea>
                </div>

                <div id="writing_scene_optionList_div">
                    <WritingSceneOptionList />
                </div>

            </form>

            <button type="submit">OK</button>
        </div>
    )
}