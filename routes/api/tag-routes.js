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

router.delete('/:id', async (req, res) => {
  try {
    // get name of category before deleting
    const tag = await Tag.findOne({
      attributes: ['tag_name'],
      where: {
        id: req.params.id,
      }
    });
    const tagName = tag.getDataValue('tag_name');
    
    // if categoryName is null, return 404, else delete
    if (tagName === null) {
      return res.status(404).json({ message: 'Oops, no tag found with this ID! Try another ID' });
    } else {
      let deleteTag = await Tag.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ message: `${tagName} tag deleted successfully!` });
    }
  }
  catch (err) {
    res.status(500).json(err); 
  }
});

module.exports = router;
