module.exports = (manu) => {
  return {
    id: manu.id,
    name: manu.name,
    gst: manu.gst,
    turnover: manu.turnover,
    product_category: manu.product_category,
    year: manu.year,
    trademark: manu.trademark,
    legal_status: manu.legal_status,
    main_markets: manu.main_markets,
    number: manu.number,
    owners: user.owners.map((owner) => ({
      id: owner._id,
      name: owner.name,
      image: owner.image,
    })),
  };
};
