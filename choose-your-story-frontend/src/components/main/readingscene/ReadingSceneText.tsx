import { FC } from "react"
import { processText } from "../../../service/processer"

interface ReadingSceneTextProps {
    text: string
}

export const ReadingSceneText: FC<ReadingSceneTextProps> = ({text}) => {

    const paragraphList: string[] = text.split("\n")

    return(
        <>
            {
                paragraphList.map((paragraph,i ) => <p className="text_p" key={i} dangerouslySetInnerHTML={{__html: processText(paragraph)}}></p>)
            }
        </>
    )
}