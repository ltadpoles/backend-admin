
import AdminSchema from '../models/admin';
import express from 'express'
const router = express.Router();


/* GET users listing. */
router.get('/', async function (req, res, next) {
  // res.send('respond with a resource');
  try {
    const user = await AdminSchema.findOne({
      where: {
        username: { [Op.eq]: req.info.username }
      },
      attributes: { exclude: ['password'] }
    })
    res.send({
      code: 0,
      data: user,
      message: 'success'
    })
  } catch {
    res.send({
      code: 1,
      message: '查询失败'
    })
  }
});

module.exports = router;
