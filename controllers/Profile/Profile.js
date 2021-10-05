const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Manu = require("../../models/Manu");
const Product = require("../../models/Product");
const FilterManuData = require("../../utils/FilterManuData");

exports.createManu = async (req, res) => {
  let {
    name,
    logo,
    gst,
    turnover,
    product_category,
    year,
    trademark,
    legal_status,
    main_markets,
    number,
    address,
    about,
  } = req.body;

  if (!name && name.trim().length === 0) {
    return res.status(422).json({
      error: "Enter name",
    });
  }

  try {
    const profile = new Profile({
      name,
      logo,
      owners: req.userId,
    });

    await profile.save();

    const manu = new Manu({
      profile,
      gst,
      turnover,
      product_category,
      year,
      trademark,
      legal_status,
      main_markets,
      number,
      address,
      about,
    });

    await manu.save();

    const savemanu = await Manu.find().populate("profile");

    res
      .status(201)
      .json({ message: "profile created successfully", profile: savemanu });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

// exports.createManu = async (req, res) => {
//   let {
//     name,
//     gst,
//     turnover,
//     product_category,
//     year,
//     trademark,
//     legal_status,
//     main_markets,
//     number,
//     address,
//     about,
//   } = req.body;

//   if (!name && name.trim().length === 0) {
//     return res.status(422).json({
//       error: "Please enter the name",
//     });
//   }

//   try {
//     const createManu = new Manu({
//       name,
//       gst,
//       turnover,
//       product_category,
//       year,
//       trademark,
//       legal_status,
//       main_markets,
//       number,
//       address,
//       about,
//       owner: req.userId,
//     });

//     const saveManu = await this.createManu.save();

//     const manu = await Manu.findById(saveManu.id).populate("owners");

//     const manuData = FilterManuData(manu);

//     res
//       .status(201)
//       .json({ message: "profile created successfully", profile: manuData });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: "Something went wrong" });
//   }
// };

exports.addproduct = async (req, res) => {
  let { image, product_name, price } = req.body;

  if (!product_name && !image && !price) {
    return res.status(422).json({
      error: "Enter all details",
    });
  }

  try {
    const product = new Product({
      image,
      product_name,
      price,
    });

    console.log("abc");

    await product.save();

    console.log("abc");

    const profile = await Profile.findOne({
      _id: req.params.id,
    });

    profile.products.push(product._id);
    await profile.save();
    res.status(201).json({ message: "product added successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
