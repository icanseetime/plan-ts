if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const randomGen = require('generate-password')
const AWS = require('aws-sdk')

// Connection to AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS,
    secretAccessKey: process.env.AWS_SECRET
})

// Upload image to AWS
const uploadFile = (req, res) => {
    if (!req.files) {
        return res
            .status(400)
            .json({ error: 'You need to include a file with your request.' })
    }

    // Extract file
    const { file } = req.files

    // Generate random filename
    const randomFilename = randomGen.generate({
        length: 8,
        numbers: true
    })

    // Get file extension
    const ext = file.name.slice(file.name.indexOf('.'))

    // Upload file
    s3.upload(
        {
            Bucket: process.env.AWS_BUCKET,
            Key: `${randomFilename}${ext}`,
            Body: file.data
        },
        (err, data) => {
            if (err) {
                return res.status(500).json({
                    error: `Something went wrong while trying to upload the file. [${err}]`
                })
            } else {
                res.status(200).json({
                    message: 'File successfully uploaded.',
                    filename: `${randomFilename}${ext}`
                })
            }
        }
    )
}

// Delete file
const deleteFile = async (req, res) => {
    try {
        if (!req.body.picture) {
            return res.status(400).json({
                error: 'You need to include a filename in your request.'
            })
        }

        s3.deleteObject(
            {
                Bucket: process.env.AWS_BUCKET,
                Key: req.body.picture
            },
            (err, data) => {
                if (err) throw err
            }
        )

        res.status(200).json({ message: 'File successfully deleted.' })
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while trying to delete the file. [${err}]`
        })
    }
}

module.exports = {
    uploadFile,
    deleteFile
}
