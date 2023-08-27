exports.addData = (req, res, Model) => {
  const newData = new Model(req.body)
  newData
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json({ error: err.message }))
}

// Function to update data by ID
exports.updateData = (req, res, Model) => {
  const { id } = req.params
  Model.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ error: 'Data not found' })
      }
      res.json(data)
    })
    .catch((err) => res.status(400).json({ error: err.message }))
}

// Function to get all data
exports.getData = (req, res, Model) => {
  Model.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json({ error: err.message }))
}

// Function to get data by ID
exports.getDataById = (req, res, Model) => {
  const { id } = req.params
  Model.findById(id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ error: 'Data not found' })
      }
      res.json(data)
    })
    .catch((err) => res.status(400).json({ error: err.message }))
}
