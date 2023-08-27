class Result {
  //   constructor() { }

  success({ data = null, msg = '操作成功' }) {
    return {
      code: '0',
      success: true,
      data,
      msg
    }
  }

  fail({ code = '500', msg = '操作失败' }) {
    return {
      code,
      success: false,
      msg
    }
  }
}

export default new Result