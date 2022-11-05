const genericProcessText = (text: string, pre: string, postOpening: string, postClosing: string): string => {
    
    let finalText: string = text
    let willOpen: boolean = true

    while (finalText.indexOf(pre) !== -1) {
        finalText.replace(pre, willOpen ? postOpening : postClosing)
        willOpen = !willOpen
    }

    if (!willOpen) { // Unclosed tag
        finalText = finalText + postClosing
    }

    return finalText
}

const italicsProcessText = (text: string): string => genericProcessText(text, "_", "<i>", "</i>")
const boldProcessText = (text: string): string => genericProcessText(text, "*", "<b>", "</b>")

// Not working with react. To be investigated...
export const processText = (text: string): string => boldProcessText(italicsProcessText(text))
