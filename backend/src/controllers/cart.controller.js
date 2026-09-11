export async function addToCart(req, res) {
  try {
    const { productId } = req.body;
    const user = req.user;
    const existingItem = user.cartItems.find(
      (item) => item.product.toString() === productId,
    );
    if (existingItem) {
      existingItem.quantity += 1;
      await user.save();
      res.status(200).json({ data: user.cartItems });
    } else {
      user.cartItems.push({ product: productId, quantity: 1 });
      await user.save();
      res.status(200).json({ data: user.cartItems });
    }
  } catch (error) {
    console.log("Error in addToCart", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}
export async function getCart(req, res) {
  try {
    const user = await req.user.populate("cartItems.product");

    const cartItems = user.cartItems.map((item) => ({
      ...item.product.toJSON(),
      quantity: item.quantity,
    }));

    res.status(200).json({ data: cartItems });
  } catch (error) {
    console.log("Error in getCart", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function removeFromCart(req, res) {
  try {
    const { productId } = req.body;
    const user = req.user;
    const existingItem = user.cartItems.find(
      (item) => item.product.toString() === productId,
    );
    if (!existingItem) {
      return res.status(404).json({ message: "Product not found" });
    }
    user.cartItems = user.cartItems.filter(
      (item) => item.product.toString() !== productId,
    );
    await user.save();
    res.status(200).json({ data: updatedCartItems });
  } catch (error) {
    console.log("Error in removeFromCart", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}
export async function updateQuantity(req, res) {
  try {
    const user = req.user;
    const { productId } = req.params;
    const existingItem = user.cartItems.find(
      (item) => item.product.toString() === productId,
    );
    if (!existingItem) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (existingItem.quantity === 1) {
      user.cartItems = user.cartItems.filter(
        (item) => item.product.toString() !== productId,
      );
      await user.save();
      return res.status(200).json({ data: user.cartItems });
    }
    existingItem.quantity = existingItem.quantity - 1;
    await user.save();
    res.status(200).json({ data: user.cartItems });
  } catch (error) {
    console.log("Error in updateQuantity", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}
