const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // const categories = await Category.findAll({
  //   include:
  // })
  // be sure to include its associated Products
  try {
    let categories = await Category.findAll({
      include: [Product],
    })
    res.json(categories);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    let singleCategory = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [Product],
    })
    res.json(singleCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    let newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    let updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    })
    res.status(200).json({
      message: 'Category updated successfully!',
    });
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    let deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: 'Category deleted successfully!' , deleteCategory})
  }
  catch (err) {
    res.status(404).json({ message: 'Oops, no category found with this ID! Try another ID' })
    res.status(500).json(err);
  }
  
});

module.exports = router;
