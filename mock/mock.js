const proxy = {
    ['GET /demo']: {id: 1, username: 'kenny', sex: 6 },
    'GET /api/user/list': [
        {id: 1, username: 'kenny', sex: 6 },
        {id: 2, username: 'kenny', sex: 6 }
    ],
    'POST /api/login/account': (req, res) => {
        const { password, username } = req.body;
        console.log(req)
        if (password === '888888' && username === 'admin') {
            return res.send({
                status: 'ok',
                code: 0,
                token: "sdfsdfsdfdsf",
                data: {id: 1, username: 'kenny', sex: 6 }
            });
        } else {
            return res.send({status: 'error', code: 403 });
        }
    },
    'DELETE /api/user/:id': (req, res) => {
        console.log('---->', req.body)
        console.log('---->', req.params.id)
        res.send({ status: 'ok', message: '删除成功！' });
    },
    'GET /api/seller/apply/provinceList':(req,res) =>{
        res.send({
            "success": true,
            "errorCode": null,
            "errorMessage": null,
            "info": [
                {
                    "code": "210100",
                    "name": "沈阳市",
                    "provinceCode": "210000"
                },
                {
                    "code": "210200",
                    "name": "大连市",
                    "provinceCode": "210000"
                }
            ]
        })
    },
    'POST /api/seller/apply/cityList':(req,res) =>{
        res.send({
            "success": true,
            "errorCode": null,
            "errorMessage": null,
            "info": [
                {
                    "code": "210100",
                    "name": "成都",
                    "provinceCode": "210000"
                },
                {
                    "code": "210200",
                    "name": "上海",
                    "provinceCode": "210000"
                }
            ]
        })
    },
    'POST /api/seller/apply/checkVerifyCode':(req,res) => {
        res.send({
            "success": true,
            "errorCode": null,
            "errorMessage": null,
            "info": true
        })
    },
    'POST /api/seller/apply/sendVerifyCode':(req,res) => {
        res.send({
            "success": true,
            "errorCode": null,
            "errorMessage": "发送失败！请重试",
            "info": true
        })
    },
    'POST /api/seller/apply/mainCategoryList':(req,res) => {
        res.send({
            "success": true,
            "errorCode": null,
            "errorMessage": null,
            "info": [
                {
                    "id": 1,
                    "name": "电脑、办公",
                    "status": 1
                },
                {
                    "id": 19,
                    "name": "男装、女装、内衣鞋靴",
                    "status": 1
                }
            ]
        })
    },
    'POST /api/seller/apply/storeTypes':(req,res) => {
        res.send({
            "success": true,
            "errorCode": null,
            "errorMessage": null,
            "info": {
                "MONOPOLY_STORE": "专卖店",
                "FRANCHISE_STORE": "专营店",
                "FLAGSHIP_STORE": "旗舰店"
            }
        })
    },
    'POST /api/seller/apply/uploadImage':(req,res) => {
        res.send({
            'success':true,
            "errorCode": null,
            "errorMessage": null,
        })
    },
    'POST /api/seller/apply/submit':(req,res) => {
        res.send({
            'success':true,
            "errorCode": null,
            "errorMessage": null,
            "info": {
                "MONOPOLY_STORE": "专卖店",
                "FRANCHISE_STORE": "专营店",
                "FLAGSHIP_STORE": "旗舰店"
            }
        })
    },
    'POST /api/seller/apply/check':(req,res) => {
        res.send({
            'success':true,
            "errorCode": null,
            "errorMessage": null,

        })
    },


}
module.exports = proxy;