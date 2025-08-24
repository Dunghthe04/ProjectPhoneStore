//cloundinary
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET // Click 'View API Keys' above to copy your API secret
});

module.exports.upload= (req, res, next)=> {
        //nếu có chọn file-> đợi upfile xong mới next
        if (req.file) {
            let streamUpload = (req) => {
                return new Promise((resolve, reject) => {
                    let stream = cloudinary.uploader.upload_stream(
                        (error, result) => {
                            if (result) {
                                resolve(result);
                            } else {
                                reject(error);
                            }
                        }
                    );

                    streamifier.createReadStream(req.file.buffer).pipe(stream);
                });
            };

            async function upload(req) {
                let result = await streamUpload(req);
                //set url ảnh ở đây luôn , [req.file.fieldname] là bao quát khi đặt tên
                req.body[req.file.fieldname] = result.url;
                next();
            }
            upload(req);
        } else { // nếu ko up file ảnh thì cho next
          next();
        }
    }