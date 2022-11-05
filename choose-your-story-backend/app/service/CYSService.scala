package service

import domain.{Option, Scene, SceneHeader, SceneReference}

import java.io.{File, FileWriter}
import java.util.Scanner
import javax.inject.Singleton

@Singleton
class CYSService {

		def getLastChapter(): Int = {
				val fileList: List[File] = new File("story").listFiles().toList
				return fileList.length
		}

		def getSceneHeaderList(chapter: Int): List[SceneHeader] = {
				return getSceneFileList(chapter)
						.map(file => getSceneHeader(file))
						.sortBy(sceneHeader => sceneHeader.idInChapter)
		}

		def getScene(chapter: Int, idInChapter: Int): Scene = {
				return getSceneFileList(chapter)
						.map(file => getSceneFromFile(file))
						.find(scene => scene.idInChapter == idInChapter)
						.get
		}

		def postPutScene(scene: Scene) = {

				val chapterFolder: File = new File(s"story/${scene.chapter}")
				if (!chapterFolder.exists()) {
						chapterFolder.mkdir()
				}

				val file: File = new File(s"story/${scene.chapter}/${scene.idInChapter}")
				file.createNewFile()
				val fileWriter: FileWriter = new FileWriter(file)

				val writeLine: String => Unit = (line: String) => {
						fileWriter.write(line)
						fileWriter.write("\n")
				}

				writeLine(scene.chapter.toString)
				writeLine(scene.idInChapter.toString)
				writeLine(scene.title)
				writeLine(scene.text)
				writeLine("::")
				writeLine(optionListToText(scene.optionList))

				fileWriter.close()
		}

		def delete(chapter: Int, idInChapter: Int): Unit = {

				// 1. Delete the scene file.
				deleteSceneFile(chapter, idInChapter)

				// 2. Check if the chapter ends up empty.
				val chapterSceneFileList: List[File] = getSceneFileList(chapter)
				val chapterIsEmpty: Boolean = chapterSceneFileList.isEmpty

				// 3. If the chapter is empty, delete, and update the rest of chapters. Else, update the rest of files within directory
				if (chapterIsEmpty) {
						deleteChapter(chapter)
						updateChaptersAfterDeletion(chapter)
				} else {
						chapterSceneFileList.foreach(file => updateIdAfterDeletion(file, idInChapter))
				}

				// 4. Update the references in the rest of files, as well as the r
				updateReferencesAndChapters(chapter, idInChapter, chapterIsEmpty)
		}



		private def getSceneFileList(chapter: Int): List[File] = {
				return new File(s"story/${chapter}").listFiles().toList.sortBy(file => file.getName.toInt)
		}

		private def getSceneHeader(file: File): SceneHeader = {
				val scanner: Scanner = new Scanner(file)
				val chapter = scanner.nextLine().toInt
				val idInChapter = scanner.nextLine().toInt
				val title = scanner.nextLine()
				scanner.close()
				return new SceneHeader(chapter, idInChapter, title)
		}


		private def getSceneFromFile(file: File): Scene = {
				val scanner: Scanner = new Scanner(file)
				val chapter = scanner.nextLine().toInt
				val idInChapter = scanner.nextLine().toInt
				val title = scanner.nextLine()
				val text = toTextScene(scanner)
				val optionList = toOptionList(scanner.nextLine())
				scanner.close()
				return new Scene(chapter, idInChapter, title, text, optionList)
		}

		def toTextScene(scanner: Scanner): String = {
				var result: String = ""
				var line: String = scanner.nextLine()
				while(line != "::") {
						result = result + line + "\n"
						line = scanner.nextLine()
				}
				return result
		}


		private def toOptionList(line: String): List[Option] = {
				val toOption: String => Option = (subline: String) => {
						val params: List[String] = subline.split(" : ").toList
						new Option(params(0), new SceneReference(params(1).toInt, params(2).toInt))
				}
				if (line == "") {
						return List()
				} else {
						return line.split(" :: ").toList
								.map(toOption)
				}
		}

		private def optionListToText(optionList: List[Option]): String = {
				val optionToText: Option => String = (option: Option) => s"${option.text} : ${option.sceneReference.chapter} : ${option.sceneReference.idInChapter}"
				return optionList
						.map(optionToText)
						.mkString(" :: ")
		}


		private def deleteSceneFile(chapter: Int, idInChapter: Int): Unit = {
				val file: File = new File(s"story/${chapter}/${idInChapter}")
				file.delete()
		}

		private def updateIdAfterDeletion(file: File, idInChapter: Int): Unit = {
				val scene: Scene = getSceneFromFile(file)
				if (idInChapter < scene.idInChapter) {
						file.delete()
						val newScene: Scene = new Scene(scene.chapter, scene.idInChapter - 1, scene.title, scene.text, scene.optionList)
						postPutScene(scene)
				}
		}

		private def deleteChapter(chapter: Int): Unit = {
				val chapterFolder: File = new File(s"story/${chapter}")
				chapterFolder.delete()
		}

		private def updateChaptersAfterDeletion(chapter: Int): Unit = {
				val chapterFolderList = new File("story").listFiles().toList
				chapterFolderList.foreach(chapterFolder => {
						val name: String = chapterFolder.getName
						if (chapter < name.toInt) {
								val newName: String = (name.toInt - 1).toString
								chapterFolder.renameTo(new File(s"story/${newName}"))
						}
				})
		}

		private def updateReferencesAndChapters(chapter: Int, idInChapter: Int, chapterIsEmpty: Boolean): Unit = {

				val updateReferencesAndChaptersAux: File => Unit = (chapterFolder: File) => {
						val updateReferencesAndChaptersScene: File => Unit = (sceneFile: File) => {

								val scene: Scene = getSceneFromFile(sceneFile)

								val newChapter: Int = {
										if (chapterIsEmpty && chapter <= scene.chapter) {
												scene.chapter - 1
										} else {
												scene.chapter
										}
								}

								val newOptionList: List[Option] = scene.optionList
										.map(option => new Option(option.text, updateReference(option.sceneReference, chapterIsEmpty, chapter, idInChapter)))
										.filter(option => option.sceneReference.idInChapter != 0)

								val newScene: Scene = new Scene(newChapter, scene.idInChapter, scene.title, scene.text, newOptionList)
						}
						chapterFolder.listFiles().toList.foreach(updateReferencesAndChaptersScene)
				}

				(new File("story")).listFiles().toList.foreach(updateReferencesAndChaptersAux)
		}

		private def updateReference(sceneReference: SceneReference, chapterIsEmpty: Boolean, chapter: Int, idInChapter: Int): SceneReference = {

				if (chapterIsEmpty) {
						val newChapter = if (chapter <= sceneReference.chapter) sceneReference.chapter - 1 else sceneReference.chapter
						val newId = if (chapter == sceneReference.chapter - 1) {
								if (idInChapter < sceneReference.idInChapter) {
										sceneReference.idInChapter - 1
								} else if (idInChapter == sceneReference.idInChapter) {
										0
								} else {
										sceneReference.idInChapter
								}
						} else {
								sceneReference.idInChapter
						}
						return new SceneReference(newChapter, sceneReference.idInChapter)

				} else {
						val newId = if (chapter == sceneReference.chapter) {
								if (idInChapter < sceneReference.idInChapter) {
										sceneReference.idInChapter - 1
								} else if (idInChapter == sceneReference.idInChapter) {
										0
								} else {
										sceneReference.idInChapter
								}
						} else {
								sceneReference.idInChapter
						}

						return new SceneReference(sceneReference.chapter, newId)
				}
		}
}
