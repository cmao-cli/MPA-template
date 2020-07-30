module.exports = {
  envs: ['production', 'staging', 'test', 'dev'],
  url: function (env) {
    if (env === 'production') {
      return `https://m.codemao.cn/env-status.json`;
    }
    return `https://${env}-m.codemao.cn/env-status.json`;
  },
  gen: 'build/env-status.json'
};
