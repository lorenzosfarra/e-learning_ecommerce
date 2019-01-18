const Article = require('../articles/Article');

const Articles = [
    new Article(
        1,
        true,
        'shoes',
        'My Shoes black/white',
        12.99,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRplZQPsePOero5GTNCWdlVGCQ0BDsUikFBONvQPjVTzf7RUXsZ_Q"
    ), new Article(
        2,
        true,
        'shoes',
        'Shoes with Colors',
        17.99,
        "http://www.oseifrimpong.me/wp-content/uploads/2018/04/sweet-idea-nike-running-shoe-technology-13-just-released-its-first-with-an-all-foam-bottom-techcrunch.jpg"
    ), new Article(
        3,
        true,
        'tshirt',
        'My TShirt black/white',
        9.99,
        "https://cdn.pixabay.com/photo/2016/12/06/09/30/blank-1886001_960_720.png"
    ), new Article(
        4,
        false,
        'tshirt',
        'TShirt with Colors',
        20.99,
        "https://purepng.com/public/uploads/large/purepng.com-white-polo-shirtpolo-shirtcottongarmentsfebricblackwhite-1421526392618wrhyn.png"
    ),
];

module.exports = Articles;