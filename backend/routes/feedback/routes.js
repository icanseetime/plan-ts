// Database schemas
const Feedback = require('../../models/Feedback')

// POST: Create new feedback // TODO: test
const createFeedback = async (req, res) => {
    try {
        // Create new feedback
        const newFeedback = new Feedback({
            name: req.body.name,
            plant_id: req.body.plantID,
            message_body: req.body.message
        })

        // Save feedback to DB
        const feedback = await newFeedback.save()
        res.status(201).json({
            message: 'New feedback successfully saved to database.',
            feedback: feedback
        })
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while trying to save the feedback. [${err}]`
        })
    }
}

// GET: Get list of all feedback // TODO: test
const listFeedback = async (req, res) => {
    try {
        // Find feedback
        let feedback = await Feedback.find(req.query)
        if (feedback.length) {
            res.status(200).json(feedback)
        } else {
            res.status(404).json({ error: 'Could not find any feedback.' })
        }
    } catch (err) {
        res.status(500).json({
            error: `Something went wrong while trying to find feedback. [${err}]`
        })
    }
}

// GET: Get specific feedback object
const getFeedback = async (req, res) => {
    try {
        let existingFeedback = await Feedback.findOne({ _id: req.params.id })
        if (!existingFeedback) {
            res.status(404).json({
                error: `No feedback with this ID.`
            })
        }
        res.status(200).json({
            feedback: existingFeedback
        })
    } catch (err) {
        res.status(500).json(
            `Something went wrong while looking for feedback with ID ${req.params.id}. [${err}]`
        )
    }
}

// DELETE: Delete specific feedback object
const deleteFeedback = async (req, res) => {
    try {
        await Feedback.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: `Successfully deleted feedback.` })
    } catch (err) {
        res.status(500).json(
            `Something went wrong while trying to delete feedback. [${err}]`
        )
    }
}

module.exports = {
    createFeedback,
    listFeedback,
    getFeedback,
    deleteFeedback
}
