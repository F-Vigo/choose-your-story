import { FC, useState } from "react";
import { Mode } from "../../const/const";
import { ModeSelector } from "./selector/modeselector/ModeSelector";
import { ContentWrapper } from "./content/ContentWrapper";
import "./Main.scss"

interface MainProps {}

export const Main: FC<MainProps> = () => {

    const [mode, setMode] = useState<string>(Mode.NULL)

    const changeMode = (newMode: string): void => setMode(newMode)

    const goBack = (): void => {
        if (mode !== Mode.NULL) {
            setMode(Mode.NULL)
        }
    }

    const isNull: boolean = mode === Mode.NULL

    return(
        <main>
            <button id="main_back" style={{opacity: isNull ? "0" : "1"}} onClick={goBack}> Menú principal </button>
            <p id="main_p" style={{opacity: isNull ? "0" : "1"}}> Modo: {(mode === Mode.WRITING) ? "ESCRITURA" : "LECTURA"} </p>

            {
                (isNull)
                ? <ModeSelector changeMode={changeMode} />
                : <ContentWrapper mode={mode} />
            }
        </main>
    )
}