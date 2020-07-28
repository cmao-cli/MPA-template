const errorMap:any = {
  'Customer-Existed@Codemaster-Lion-Service': '抱歉，您的手机号码已经领取过了',
  'SMS-Captcha-Send-Max-Times@Codemaster-Landing-Service': '验证码发送已达最大次数',
  'SMS-Captcha-Send-Frequently@Codemaster-Landing-Service': '验证码发送太频繁',
  'SMS-Captcha-Send-Fail@Codemaster-Landing-Service': '短信验证码发送失败',
  'Sms-Validate-Error@Codemaster-Marketing-Api': '验证码错误，请重试',
  'Customer-Existed-Error@Codemaster-Marketing-Api': '提交成功，课程顾问会尽快与您联系。',
  'Land-Page-Repeat@Codemaster-Lion-Service': '请求过于频繁',
  CM_2: '发送验证码过多',
  CRM_0: '抱歉，您的手机号码已经领取过了',
  M_6: '抱歉，您的手机号码已经领取过了',
  'Captcha-Not-Valid@Codemaster-Tiger': '验证码错误，请重试',
  'Valid-Captcha-Cause-Fail@Codemaster-Market': '验证码错误，请重试',
  'Bad-Invitation@Codemaster-Market': '该手机号已领取过试听课',
};

export function errorParse(code:string, defaultMsg?:string):string {
  return errorMap[code] || defaultMsg || '未知错误';
}
