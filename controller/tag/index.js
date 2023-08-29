import TagSchema from "../../models/tag"
import result from "../../utils/result"

class Tag {
    constructor() { }

    async add(req, res) {
        const { name, decription, status } = req.body
        const tag = await TagSchema.findOne({ where: { name } })
        res.send(result.success({ msg: '操作成功' }))
    }
}

export default new Tag