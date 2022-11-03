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

		def postPutScene(scene: Scene) = { // TODO - If chapter is not created
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
				writeLine(optionListToText(scene.optionList))

				fileWriter.close()
		}

		def putScene(scene: Scene) = {

		}




		private def getSceneFileList(chapter: Int): List[File] = {
				return new File(s"story/${chapter}").listFiles().toList
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
				val text = scanner.nextLine()
				val optionList = toOptionList(scanner.nextLine())
				scanner.close()
				return new Scene(chapter, idInChapter, title, text, optionList)
		}

		private def toOptionList(line: String): List[Option] = {
				val toOption: String => Option = (subline: String) => {
						val params: List[String] = subline.split(" : ").toList
						new Option(params(0), new SceneReference(params(1).toInt, params(2).toInt))
				}
				return line.split(" :: ").toList
						.map(toOption)
		}


		def optionListToText(optionList: List[Option]): String = {
				val optionToText: Option => String = (option: Option) => s"${option.text} : ${option.sceneReference.chapter} : ${option.sceneReference.idInChapter}"
				return optionList
						.map(optionToText)
						.mkString(" :: ")
		}
}
