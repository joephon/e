 const avatarBG = require('../images/avatarBG.png')
 const e = require('../images/yie.png')
 const categories = require('../images/categories.png')
 const gua = require('../images/gua.png')
 const bu = require('../images/bu.png')
 const user = require('../images/user.png')
 const settings = require('../images/settings.png')
 const back = require('../images/back.png')

export default {
  url: {
    feedback: 'https://api.leancloud.cn/1.1/classes/Feedback',
  },
  routes: {
    home: 'home',
    gua: 'gua',
    guaDetails: 'guaDetails',
    bu: 'bu',
    user: 'user',
    settings: 'settings',
  },
  icons: {
    avatarBG: avatarBG,
    e: e,
    categories: categories,
    gua: gua,
    bu: bu,
    user: user,
    settings: settings,
    back: back,
  },
  tips: {
    CN: {
      home: '议易',
      gua: '六十四卦',
      bu: '占卜解惑',
      user: '个人中心',
      settings: '设置',
      submit: '提交',
      success: '提交成功',
      about: '所谓议易，便是大家都来议论《周易》，研读六十四卦，占个卜，点个爻，易就该耍着才好玩。很多人天然觉得《周易》高深莫测，隐涩难懂，实则不然！生活中处处是易：“九五之尊”、“一言九鼎”、“三阳开泰”、“否极泰来”等等诸多被用烂了的词语，都源于易。既然易如此贴近生活，为何不议(易)？',
    },
    EN: {
      home: 'home',
      gua: 'gua',
      bu: 'bu',
      user: 'user center',
      settings: 'settings',
      submit: 'submit',
    }
  },
  tags: {
    CN: {
      gua: '品易',
      bu: '占卜',
      feedback: '给我反馈',
      view: '现在去看',
      youGet: '你占到',
      about: '议易是什么',
      guaci: '卦辞',
      yaoci: '爻辞',
      easy: '简易模式',
      strict: '专业模式',
      yaoOne: '初爻',
      yaoTwo: '二爻',
      yaoThree: '三爻',
      yaoFour: '四爻',
      yaoFive: '五爻',
      yaoSix: '上爻',
      newYin: '少阴',
      newYang: '少阳',
      oldYin: '老阴(变)',
      oldYang: '老阳(变)',
    },
    EN: {

    },
  },
  placeholders: {
    CN: {
      home: {
        feedback: 'Hi 我是Joephon，这款应用的开发及维护者，如果你有什么关于功能或者体验的建议，不妨在此留言，我会跟进反馈的 ：）' ,
      },
    },
    EN: {

    },
  }
}




