package cys

import play.api.libs.json.Json
import play.api.mvc.{Action, AnyContent, BaseController, ControllerComponents}

import javax.inject.{Inject, Singleton}

@Singleton
class CYSController @Inject() (
		val controllerComponents: ControllerComponents,
		val service: CYSService
) extends BaseController {

		def getLastEpisode(): Action[AnyContent] = Action {
				Ok(Json.toJson(18))
		}

		def getSceneHeaderList(chapter: Int): Action[AnyContent] = Action {
				NoContent // TODO
		}

		def getScene(chapter: Int, idInChapter: Int): Action[AnyContent] = Action {
				NoContent // TODO
		}


		def postScene(): Action[AnyContent] = Action {
				NoContent // TODO
		}

		def putScene(): Action[AnyContent] = Action {
				NoContent // TODO
		}

}
