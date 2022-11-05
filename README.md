# Choose your story

This projects is and editor —and reader— of "Choose your adventure" stories. This does not intend, for the time being, to be a complex tool such as Twine, but rather a fun app for practising purposes.

## Dependencies

This project has been made using the following:

- Scala 2.13.10
- sbt 1.7.3
- Node 8.15.0

## How to run

1. Go to the backend root folder.
2. `sbt run`.
3. Go to the frontend root folder.
4. `npm run dev`
5. Open a browser and go to `localhost:3000`

## How it works

The user experience can be catogirsed in two modes:

- The first mode is the WRITING mode. This sets the author in an author profile, namely, the user will be able to edit (create, update or delete) chapters and scenes (the basic unit of the stories created with this app). First, the user must select a chapter (after creating it if needed), and then, the scene. Each scene is uniquely identified by the chapter and the seccion, of the id within the chapter. Scenes are linked one another via options (that's what "choose your adventure" is about). The fact that a scene is linked to the scene in chapter `x`, section `y`, by a certain option means that, when the reader goes throught the that first scene, if they decided to choose that narrative option, they will be moved to the scene in chapter `y`, section `y`.

- The other mode is the READING mode. The user will play the role of a reading, having the chance to interactively enjoy the story already created.

## Possible improvements

- Add tests.
- Enhance configurability.
    - For the time being, only one (nameless and anonimous) story can be used.
    - The user language if fixed to Spanish.
    - No special styles like italics is allowed in the texts.
    - Optimise endpoint calls. At the moment, some error response codes are treated as normal behaviour.