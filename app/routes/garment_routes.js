const express = require('express')
const router = express.Router()
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const passport = require('passport')
const requireToken = passport.authenticate('bearer', {session: false})
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
// require models
const Garment = require('./../models/garment')
// POST -create- /garment
router.post('/garments', requireToken, (req, res, next) => {
  const garmentData = req.body.garment
  garmentData.owner = req.user.id
  Garment.create(garmentData)
    .then(garment => res.status(201).json({garment: garment.toObject()}))
    .catch(next)
})

// GET -get- garment
router.get('/garments/:id', requireToken, (req, res, next) => {
  const garmentData = req.body.garment
  garmentData.owner = req.user.id
  // const user = req.user
  // only return the garment that are owned by the user making the request
  Garment.findById(req.params.id)
    .then(handle404)
    .then(garment => {
      requireOwnership(req, garment)
    })
    .then(garments => res.status(200).json({ garments: garments }))

    .catch(next)
})

// DELETE -delete- garment
router.delete('/garments/:id', requireToken, (req, res, next) => {
  Garment.findById(req.params.id)
    .then(handle404)
    .then(garment => {
      // throw an error if current user doesn't own `garment`
      requireOwnership(req, garment)
      // delete the garment ONLY IF the above didn't throw
      garment.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// UPDATE
// PATCH
router.patch('/garments/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.garment.owner

  Garment.findById(req.params.id)
    .then(handle404)
    .then(garment => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, garment)

      // pass the result of Mongoose's `.update` to the next `.then`
      return garment.updateOne(req.body.garment)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// GET /garments
router.get('/garments', requireToken, (req, res, next) => {
  // const garmentData = req.body.garment
  // garmentData.owner = req.user.id
  // garmentData.owner = req.user.id
  // req.params.type = toId(req.params.type)
  Garment.find({type: req.params.type})
    .then(garment => {
      // `garments` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      // requireOwnership(req, garment)
      return garment.map(garment => garment.toObject())
    })
    // respond with status 200 and JSON of the garments
    .then(garment => res.status(200).json({ garment: garment }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
