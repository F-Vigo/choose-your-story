import { Option, Scene, SceneReference } from "../domain/domain";

const buildEmptyScene = (): Scene => {
    return buildEmptySceneWithChapter(0)
}

export const buildEmptySceneWithChapter = (chapter: number): Scene => {
    return new Scene(chapter, 1, "", "", [])
}

export const emptyScene: Scene = buildEmptyScene()

export const sceneExample: Scene = new Scene(
    1,
    1,
    "De lo que aconteció una noche cualquiera",
    "Jane y yo estábamos paseando sin hablar de nada concreto, con una sonrisa que no se despegaba de nuestros labios, cuando de repente...",
    [
        new Option("La coges de la mano y te declaras, sabiendo que bien podría ser la peor decisión de toda tu vida, pero por la que has trabajado tanto tiempo hasta este momento, y que quizá salga bien.", new SceneReference(3, 2)),
        new Option("No haces nada.", new SceneReference(1,3))
    ]
)

export const sceneExample2: Scene = new Scene(
    3,
    2,
    "De lo que aconteció una noche cualquiera, 2",
    "Jane y yo estábamos paseando sin hablar de nada concreto, con una sonrisa que no se despegaba de nuestros labios, cuando de repente..., 2",
    [
        new Option("La coges de la mano y te declaras, sabiendo que bien podría ser la peor decisión de toda tu vida, pero por la que has trabajado tanto tiempo hasta este momento, y que quizá salga bien.", new SceneReference(1, 2)),
        new Option("No haces nada.", new SceneReference(1,3))
    ]
)

export const emptySceneReference: SceneReference = new SceneReference(-1, -1)
