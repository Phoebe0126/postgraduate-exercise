const SUBJECT_COLOR = ["color-MY", "color-Mao", "color-CN", "color-SX"];

const BORDER_COLOR = [
  "line-color-MY",
  "line-color-Mao",
  "line-color-CN",
  "line-color-SX"
];

const BG_COLOR = ["bg-color-MY", "bg-color-Mao", "bg-color-CN", "bg-color-SX"];

const SUBJECT_TITLE = [
  "马克思主义基本原理概论",
  "毛泽东思想与中国特色社会主义",
  "中国近代史纲要",
  "思想道德修养"
];

const SUBJECT_SHORT_TITLE = ['马原', '毛概', '史纲', '思修'];

const SUBJECT_ABBR_TITLE = ["马原习题", "毛中特习题", "史纲习题", "思修习题"];

const USER_INFO_ITEMS = [
  { id: 1, name: "nickname", desc: "昵称", val: "" },
  { id: 2, name: "gender", desc: "性别", val: "" },
  { id: 3, name: "school", desc: "学校", val: "" },
  { id: 4, name: "motto", desc: "座右铭", val: "" },
  { id: 5, name: "goal", desc: "目标天数", val: 0 }
];

const QUESTION_NAVBAR_TITLE = ["章节练习", "随机练习", "智能模考", "错题重练","学霸排行"];

const SUBJECT_NAVBAR_COLOR = ['#c9a2a2', '#aaadc2', '#a5b8c8', '#a0bfc0'];

const TABS_TITLE = ['答案解析', '我的笔记'];

const MINE_LISTS = [
  {id: 1, class: 'note', content: '我的笔记', color: '#6A3F3F', navToFunc: 'navToMyNote'},
  {id: 2, class: 'collection', content: '我的收藏', color: '#9F8080', navToFunc: ''},
  {id: 3, class: 'userinfo', content: '个人信息', color: '#C9A2A2', navToFunc: 'navToMyInfo'},
  {id: 4, class: 'admin', content: '管理员入口', color: '#9F8080', navToFunc: 'navToAdmin'}
];

const ADMIN_LISTS = [
  {id: 1, class: 'set-notice-bar', content: '设置公告栏', color: '#6A3F3F', navToFunc: 'navToSetNoticeBar'},
  {id: 2, class: 'add-question', content: '添加题目', color: '#9F8080', navToFunc: 'navToAddQuestion'}
];

export {
  SUBJECT_COLOR,
  BORDER_COLOR,
  BG_COLOR,
  SUBJECT_TITLE,
  SUBJECT_SHORT_TITLE,
  SUBJECT_ABBR_TITLE,
  USER_INFO_ITEMS,
  QUESTION_NAVBAR_TITLE,
  TABS_TITLE,
  SUBJECT_NAVBAR_COLOR,
  MINE_LISTS,
  ADMIN_LISTS
};
