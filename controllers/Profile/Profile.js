const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Manu = require("../../models/Manu");
const Product = require("../../models/Product");
const FilterManuData = require("../../utils/FilterManuData");
const Order = require("../../models/Order");

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
    let val = Math.floor(1000 + Math.random() * 9000);
    console.log(val);
    code = visualViewport;

    const profile = new Profile({
      name,
      logo,
      val,
      owners: req.userId,
    });

    const user = await User.findById(req.userId);

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

    profile.manu = manu;

    await manu.save();
    await profile.save();

    user.company_profile = profile;
    await user.save();

    const savemanu = await Manu.find().populate("profile");

    res
      .status(201)
      .json({ message: "profile created successfully", profile: savemanu });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.addproduct = async (req, res) => {
  let { image, product_name, price } = req.body;
  let profile_id = req.params.id;

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

    product.profile = req.params.id;

    const user = await User.findById(req.userId).populate("company_profile");

    const profile = user.company_profile;
    console.log(profile);
    profile.products.push(product);

    await product.save();

    await profile.save();
    res.status(201).json({ message: "product added successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.catalogue = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    await profile.populate("products").execPopulate();
    return res.send(profile.products);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.createorder = async (req, res) => {
  const product = await Product.findById(req.params.productid);
  console.log(product);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  try {
    const order = new Order({
      from: req.userId,
      to: product.profile,
      product: product,
    });

    console.log(product.profile);

    await order.save();

    const user = await User.findById(req.userId);
    const profile = await Profile.findById(product.profile._id);
    user.orders.push(order);
    await user.save();
    profile.orders.push(order);
    await profile.save();

    res.status(200).json({ message: "Order successfull" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.completeorder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.order_id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const profile = await Profile.findById(order.to);
    const user = await User.findById(order.from);

    const index = profile.orders.indexOf(order._id);
    profile.orders.splice(index, 1);
    await profile.save();

    index = user.orders.indexOf(user._id);
    user.orders.splice(index, 1);
    await user.save();

    res.status(200).json({ message: "Order successfull" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getmycompanyprofile = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate({
        path: "company_profile",
        populate: {
          path: "products",
          model: "Product",
        },
      })
      .populate({
        path: "company_profile",
        populate: {
          path: "orders",
          model: "Order",
        },
      })
      .populate({
        path: "company_profile",
        populate: {
          path: "owners",
          model: "User",
          select: "_id name profile_pic",
        },
      })
      .populate({
        path: "company_profile",
        populate: {
          path: "manu",
          model: "Manu",
        },
      });

    res.status(200).json(user.company_profile);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getprofilebyId = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate({
        path: "company_profile",
        populate: {
          path: "products",
          model: "Product",
        },
      })
      .populate({
        path: "company_profile",
        populate: {
          path: "orders",
          model: "Order",
        },
      })
      .populate({
        path: "company_profile",
        populate: {
          path: "owners",
          model: "User",
          select: "_id name profile_pic",
        },
      })
      .populate({
        path: "company_profile",
        populate: {
          path: "manu",
          model: "Manu",
        },
      });

    const manu = user.company_profile.manu;
    console.log(manu);

    res.status(200).json(user.company_profile);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
exports.getproducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate("profile", "name").sort();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getprofilebyId = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.profileid);
    res.status(200).json(profile);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getordersbyprofile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.profileid)
      .populate({
        path: "orders",

        populate: {
          path: "product",
          model: "Product",
        },
      })
      .populate({
        path: "orders",
        populate: {
          path: "from",
          model: "User",
          select: "id name image",
        },
      });

    return res.send(profile.orders);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getuserorders = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate({
        path: "orders",

        populate: {
          path: "product",
          model: "Product",
        },
      })
      .populate({
        path: "orders",

        populate: {
          path: "to",
          model: "Profile",
          select: "name logo",
        },
      });
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    console.log(user);

    res.status(200).json({ order: user.orders });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
