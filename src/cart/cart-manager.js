const key = "it_spa_cart";

export const cartManager = {
  add(item) {
    const cart = localStorage.getItem(key);
    let content;

    if (cart == null) {
      content = {
        [item.name]: { price: item.price, quality: 1 },
      };
    } else {
      content = JSON.parse(cart);

      if (item.name in content) {
        content[item.name].quality += 1;
      } else {
        Object.assign(content, {
          [item.name]: { price: item.price, quality: 1 },
        });
      }
    }

    localStorage.setItem(key, JSON.stringify(content));
  },

  remove(item) {
    const cart = localStorage.getItem(key);
  
    if (cart !== null) {
      let content = JSON.parse(cart);
      if (item.name in content) {
        if (content[item.name].quality > 1) {
          content[item.name].quality -= 1;
        } else {
          delete content[item.name];
        }
        localStorage.setItem(key, JSON.stringify(content));
      }
    }
  },

  getAll() {
    const cart = localStorage.getItem(key);

    if (cart == null) {
      return [];
    } else {
      let content = JSON.parse(cart);

      return Object.entries(content).map((entry) => {
        const [name, value] = entry;

        return {
          name,
          ...value,
        };
      });
    }
  },

  getTotalPrice() {
    const cart = localStorage.getItem(key);

    if (cart == null) {
      return "0.00";
    } else {
      const content = JSON.parse(cart);

      return Object.values(content).reduce(
        (totalPrice, item) => totalPrice + item.quality * item.price, 0
      ).toFixed(2);
    }
  },
};
