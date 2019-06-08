export default {
	// base:"http://localhost:8080",
	hotMusic:"/top/list?idx=1",//  idx="1": 云音乐热歌榜,
	login:"/login/cellphone", //手机号网易云登录
  logout:"/captch/register",//注册
  setUser:"/logout",//退出登录
  getCaptcha:"/captch/sent",//获取验证码
  conCaptcha:"/captch/verify",//确认验证码
	myMusiclist:"/user/playlist" ,//我喜欢的列表
	myMusicDetail:"/playlist/detail", //手机号网易云我喜欢的列表详情
	banner:"/banner",// 可获取 banner( 轮播图 ) 数据
	eachMusicUrl:"/song/url",// 每首歌的url
	lyric:"/lyric",// 每首歌的lyric
  djRec:"/dj/recommend",//获取电台推荐
  djSub:"/dj/sublist",//获取订阅的电台
  userFollow:"/user/follows",//用户的关注
  userInfo:"/user/detail",//用户信息
  djDetail:"/dj/detail",//获取电台详情
  djProgram:"/dj/program",//获取电台节目目录
  djSubYn:"/dj/sub",//电台订阅与取消
  djSong:"/song/url",//播放电台歌曲
  mvLized:"/personalized/mv",//推荐MV
  mvRite:"top/mv",//mv排行
  MvCol:"/mv/sublist",//收藏的mv
  mvDetail: "/mv/detail",//mv详情
  mvUrl:"/mv/url",//mv播放地址
  HotRat:"/comment/hot",//获取热门评论（0：歌曲，1：MV）
  mvRatings:"/comment/mv",//mv全部评价
  putRat:"/comment",//发表评论（0：歌曲，1：mv）
  searchAll:"/search",//搜索（ 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频）
  userSub:"/user/subcount",//用户所有的订阅详情
  subEdie:"/playlist/subscribe",//收藏或取消收藏
}



