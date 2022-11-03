import { FC } from "react"
import { Mode } from "../../../../const/const"
import "./ModeSelector.scss"

interface ModeSelectorProps {
    changeMode: (newMode: string) => void
}

export const ModeSelector: FC<ModeSelectorProps> = ({changeMode}) => {
    return(
        <div id="mode_selector_div">
            <div id="h1_div"><h1>Choose your story</h1><div id="h1_underline"></div></div>
            <div id="mode_selector_button_div">
                <button type="button" onClick={() => changeMode(Mode.WRITING)}>Escritura</button>
                <button type="button" onClick={() => changeMode(Mode.READING)}>Lectura</button>
            </div>
        </div>
    )
}