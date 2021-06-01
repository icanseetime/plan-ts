const fs = require('fs')
const randomGen = require('generate-password')

// Upload image to React picture-folder
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

    // Upload file to React folder
    file.mv(
        `${__dirname}/../../../frontend/public/assets/uploaded-plants/${randomFilename}${ext}`,
        (err) => {
            if (err) {
                return res.status(500).json({
                    error: `Something went wrong while trying to upload the file. [${err}]`
                })
            }

            res.status(200).json({
                message: 'File successfully uploaded.',
                filename: `${randomFilename}${ext}`
            })
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

        await fs.unlink(
            `${__dirname}/../../../frontend/public/assets/uploaded-plants/${req.body.picture}`,
            (err) => {
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
