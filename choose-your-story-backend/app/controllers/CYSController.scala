package controllers

import domain.{Option, Scene, SceneHeader, SceneReference}
import play.api.libs.json.Json
import play.api.mvc.{Action, AnyContent, BaseController, ControllerComponents}
import service.CYSService

import javax.inject.{Inject, Singleton}

@Singleton
class CYSController @Inject() (
		val controllerComponents: ControllerComponents,
		val service: CYSService
) extends BaseController {

		implicit val sceneHeaderToJson = Json.format[SceneHeader]
		implicit val sceneReferenceToJson = Json.format[SceneReference]
		implicit val optionToJson = Json.format[Option]
		implicit val sceneToJson = Json.format[Scene]

		def getLastChapter(): Action[AnyContent] = Action {
				Ok(Json.toJson(service.getLastChapter()))
		}

		def getSceneHeaderList(chapter: Int): Action[AnyContent] = Action {
				Ok(Json.toJson(service.getSceneHeaderList(chapter)))
		}

		def getScene(chapter: Int, idInChapter: Int): Action[AnyContent] = Action {
				Ok(Json.toJson(service.getScene(chapter, idInChapter)))
		}

		def postScene(): Action[AnyContent] = Action { request => {
						val jsonData = request.body.asJson.get
						val scene: Scene = jsonData.as[Scene]
						service.postPutScene(scene)
				}
				NoContent
		}

		def putScene(): Action[AnyContent] = Action { request => {
						val jsonData = request.body.asJson.get
						val scene: Scene = jsonData.as[Scene]
						service.postPutScene(scene)
				}
				NoContent
		}

		def delete(chapter: Int, idInChapter: Int) = Action { request => {
						service.delete(chapter: Int, idInChapter: Int)
				}
				NoContent
		}
}
