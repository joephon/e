 const avatarBG = require('../images/avatarBG.png')
 const e = require('../images/e.png')
 const categories = require('../images/categories.png')
 const gua = require('../images/gua.png')
 const bu = require('../images/bu.png')
 const user = require('../images/user.png')
 const settings = require('../images/settings.png')
 const back = require('../images/back.png')

export default {
  routes: {
    home: 'home',
    gua: 'gua',
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
      bu: '占卜问路',
      user: '个人中心',
      settings: '设置',
      submit: '提交',
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




