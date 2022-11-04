package domain

case class Scene (
		chapter: Int,
		idInChapter: Int,
		title: String,
		text: String,
		optionList: List[Option]
)