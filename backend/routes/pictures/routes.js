const fs = require('fs')

// TODO
// Check that image has filetype .png .jpg .jpeg
// Delete pictures when updated to another/deleted
// Give pictures an autogenerated name, so they don't override others with similar names?

// Upload image to React picture-folder
const uploadFile = (req, res) => {
    if (!req.files) {
        return res
            .status(400)
            .json({ error: 'You need to include a file with your request.' })
    }

    // Upload file to React folder
    const { file } = req.files
    file.mv(
        `${__dirname}/../../../frontend/public/assets/uploaded-plants/${file.name}`,
        (err) => {
            if (err) {
                return res.status(500).json({
                    error: `Something went wrong while trying to upload the file. [${err}]`
                })
            }

            res.status(200).json({
                message: 'File successfully uploaded.',
                filename: file.name
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