/**
 * 简单权限
 * 项目只设置3种角色 0：超级管理员 1：管理员 2：普通用户
 */
import response from '../utils/response'

// 超级管理员才能操作
export const superAdminAcl = (req, res, next) => {
  const { state } = req.auth
  if (state !== 0) {
    return res.status(403).send(response.fail({ msg: '权限不足，请联系管理员', code: '403' }))
  }
  next()
}

// 管理员才能操作
export const adminAcl = (req, res, next) => {
  const { state } = req.auth
  if (state > 1) {
    return res.status(403).send(response.fail({ msg: '权限不足，请联系管理员', code: '403' }))
  }
  next()
}