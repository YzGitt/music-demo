export default {
	// base:"http://localhost:8080",
	hotMusic:"/top/list?idx=1",//  idx="1": 云音乐热歌榜,

	login:"/login/cellphone", //手机号网易云作者登录
	loginforUse:"/login/cellphone", //手机号网易云个人用户登录

	myMusiclist:"/user/playlist" ,//我喜欢的列表
	myMusicDetail:"/playlist/detail", //手机号网易云我喜欢的列表详情
	banner:"/banner",// 可获取 banner( 轮播图 ) 数据
	eachMusicUrl:"/song/url",// 每首歌的url
	lyric:"/lyric",// 每首歌的lyric
  djRec:"/dj/recommend",//获取电台推荐
  djSub:"/user/dj",//获取订阅的电台
  userFollow:"/user/follows",//用户的关注
  userInfo:"/user/detail",//用户信息
  djDetail:"/dj/detail",//获取电台详情
  djProgram:"/dj/program",//获取电台节目目录
  djSong:"/song/url",//播放电台歌曲
  mvLized:"/personalized/mv",//推荐MV
  mvRite:"top/mv",//mv排行
  mvDetail: "/mv/detail",//mv详情
  mvUrl:"/mv/url",//mv播放地址
  HotRat:"/comment/hot",//获取热门评论（0：歌曲，1：MV）
  mvRatings:"/comment/mv",//mv全部评价
  putRat:"/comment",//发表评论（0：歌曲，1：mv）


	tracks:"/playlist/tracks"   //对歌单添加或删除歌曲


}



