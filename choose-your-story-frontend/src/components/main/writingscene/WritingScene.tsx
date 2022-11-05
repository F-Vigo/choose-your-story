import axios from "axios";
import React, { FC, useState, useEffect } from "react";
import { Scene, SceneReference } from "../../../domain/domain";
import { emptyScene } from "../../../service/builder";
import { WritingSceneOptionList } from "./WritingSceneOptionList";
import "./WritingScene.scss";
import { buildSceneFromForm, checkSceneIsReady } from "../../../service/service";

interface WriginSceneProps {
    sceneReference: SceneReference
    restart: () => void
}

export const WritingScene: FC<WriginSceneProps> = ({sceneReference, restart}) => {

    const [scene, setScene] = useState<Scene>(emptyScene)

    useEffect(
        () => {
            axios
                .get(`http://localhost:9000/scene/${sceneReference.chapter}/${sceneReference.idInChapter}`)
                .then(response => setScene(response.data))
        },
        [sceneReference]
    )

    const submit = (e: React.SyntheticEvent): void => {
        e.preventDefault()
        if (checkSceneIsReady()) {
            const newScene: Scene = buildSceneFromForm()
            axios
                .post("http://localhost:9000/scene", newScene)
            window.alert("¡Hecho!")
        }
    }

    const deleteScene = (): void => {
        if (window.confirm("¿Seguro?")) {
            const chapter: number = +(document.getElementById("chapter_li_span")!.innerHTML)
            const idInChapter: number = +(document.getElementById("id_li_span")!.innerHTML)
            axios
                .delete(`http://localhost:9000/scene/${chapter}/${idInChapter}`)
            restart()
        }
    }

    return (

        <div id="writing_scene_div">

            <ul>
                <li> Capítulo: <span id="chapter_li_span">{sceneReference.chapter}</span> </li>
                <li> Sección: <span id="id_li_span">{sceneReference.idInChapter}</span> </li>
            </ul>

            <form onSubmit={submit} name="form_name">

                <div id="writing_scene_title_div">
                    <label> Título: </label>
                    <input id="title_input" type="text" defaultValue={scene.title}></input>
                </div>

                <div id="writing_scene_text_div">
                    <label> Texto: </label>
                    <textarea id="text_input" defaultValue={scene.text}></textarea>
                </div>

                <div id="writing_scene_optionList_div">
                    <WritingSceneOptionList optionList={scene.optionList} />
                </div>

            <button type="submit"> OK </button>
            <button type="button" id="delete_button" onClick={deleteScene}> ELIMINAR ESCENA </button>

            </form>
        </div>
    )
}