import axios from "axios";
import { FC, useEffect, useState, ChangeEvent } from "react";
import { Option } from "../../../domain/domain";
import { setLoadingMode } from "../../../service/service";


interface WritingSceneOptionProps {
    letter: string
    lastChapter: number
    option: Option
}

export const WritingSceneOption: FC<WritingSceneOptionProps> = ({letter, lastChapter, option}) => {

    const [selectedChapter, setSelectedChapter] = useState<string>(option.sceneReference.chapter.toString())
    const [selectedIdInChapter, setSelectedIdInChapter] = useState<string>(option.sceneReference.chapter.toString())
    const [lastIdInChapter, setLastIdInChapter] = useState<number>(+selectedIdInChapter)

    useEffect(
        () => {
            setSelectedChapter(option.sceneReference.chapter.toString())
            console.log(option.sceneReference.idInChapter)
            setSelectedIdInChapter(option.sceneReference.idInChapter.toString())
            if (selectedChapter === "-") {
                setLastIdInChapter(0)
            } else {
                setLoadingMode(true)
                axios
                    .get(`http://localhost:9000/scene-header-list/${selectedChapter}`)
                    .then(response => {setLastIdInChapter(response.data.length); setLoadingMode(false)})
            }
        }, [option]
    )

    const changeSelectedChapter = (event: ChangeEvent<HTMLSelectElement>): void => {
        setSelectedChapter(event.target.value)
        if (event.target.value === "-") {
            setLastIdInChapter(0)
        } else {
            setLoadingMode(true)
            axios
                .get(`http://localhost:9000/scene-header-list/${event.target.value}`)
                .then(response => setLastIdInChapter(response.data.length))
            setLoadingMode(false)
        }
    }

    const changeSelectedIdInChapter = (event: ChangeEvent<HTMLSelectElement>): void => {
        setSelectedIdInChapter(event.target.value)
    }

    const getIdInChapterList = (): number[] => {
        return selectedChapter === "-"
            ? []
            : Array.from(Array(lastIdInChapter).keys())
    }

    return(
        <div className="option_div">
            <p> Opción {letter} </p>
            <div>
                <label> Texto de la opción: </label>
                <input type="text" className="option_text" defaultValue={option ? option.text : ""}></input>
            </div>
            <div className="scene_reference_div">
                <p> Dirige a: </p>
                <div>
                    <label> Capítulo: </label>
                    <select className="option_chapter" value={selectedChapter} onChange={changeSelectedChapter}>
                        <option>-</option>
                        {
                            Array.from(Array(lastChapter).keys()).map(i => <option key={i+1}>{i+1}</option>)
                        }
                    </select>
                </div>
                <div>
                    <label> Sección: </label>
                    <select className="option_idInChapter" value={selectedIdInChapter} onChange={changeSelectedIdInChapter}>
                        <option>-</option>
                        {
                            getIdInChapterList().map(i => <option key={i+1}>{i+1}</option>)
                        }
                    </select>
                </div>
                
            </div>
        </div>
    )
}