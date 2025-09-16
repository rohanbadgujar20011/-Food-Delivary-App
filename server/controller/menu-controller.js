const mongoose = require("mongoose");
const Menu = require("../model/menu");
const addmenu = async (req, res) => {
  const { title, desc, img, price, category } = req.body;

  const menu = new Menu({
    title,
    desc,
    img,
    price,
    category,
  });
  try {
    await menu.save();
    return res.status(201).json({ id: menu._id });
  } catch (error) {
    console.log(error);
  }
};

const allmenu = async (req, res) => {
  let menus;
  try {
    menus = await Menu.find();
  } catch (error) {
    console.log(error);
  }
  if (!menus) {
    return res.status(400).json({ message: "No menu" });

}
return res.status(201).json({ menus });
};
module.exports = {
  allmenu,
  addmenu: addmenu, // or simply addmenu if the key and value have the same name
};
