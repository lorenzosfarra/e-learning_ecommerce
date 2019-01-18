class Article {
    constructor(id, inStock, type, title, price, img) {
        this.id = id;
        this.inStock = inStock;
        this.type = type;
        this.title = title;
        this.price = price;
        this.img = img;
    }

    hasId(id) {
        return (this.id === Number.parseInt(id));
    }

    hasType(type) {
        return (this.type === type);
    }

    isInStock() {
        return (this.inStock === true);
    }

    getPrice() {
        return this.price;
    }

    getTitle() {
        return this.title;
    }

    toString() {
        return `{id: "${this.id}", inStock: ${this.inStock}, type: ${this.type}, title: ${this.title}, price: ${this.price}, img: ${this.img}}`;
    }
}

module.exports = Article;