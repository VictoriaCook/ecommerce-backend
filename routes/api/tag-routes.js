const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    let tags = await Tag.findAll({
      include: [Product],
    });
    res.json(tags);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    let singleTag = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: [Product],
    });
    res.json(singleTag)
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    let newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    let updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    res.status(200).json({
      message: 'Tag updated sucessfully!'
    });
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
