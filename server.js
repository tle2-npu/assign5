// Import packages, initialize an express app, and define the port you will use
const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Data for the server
const menuItems = [
  {
    id: 1,
    name: "Classic Burger",
    description: "Beef patty with lettuce, tomato, and cheese on a sesame seed bun",
    price: 12.99,
    category: "entree",
    ingredients: ["beef", "lettuce", "tomato", "cheese", "bun"],
    available: true
  },
  {
    id: 2,
    name: "Chicken Caesar Salad",
    description: "Grilled chicken breast over romaine lettuce with parmesan and croutons",
    price: 11.50,
    category: "entree",
    ingredients: ["chicken", "romaine lettuce", "parmesan cheese", "croutons", "caesar dressing"],
    available: true
  },
  {
    id: 3,
    name: "Mozzarella Sticks",
    description: "Crispy breaded mozzarella served with marinara sauce",
    price: 8.99,
    category: "appetizer",
    ingredients: ["mozzarella cheese", "breadcrumbs", "marinara sauce"],
    available: true
  },
  {
    id: 4,
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center, served with vanilla ice cream",
    price: 7.99,
    category: "dessert",
    ingredients: ["chocolate", "flour", "eggs", "butter", "vanilla ice cream"],
    available: true
  },
  {
    id: 5,
    name: "Fresh Lemonade",
    description: "House-made lemonade with fresh lemons and mint",
    price: 3.99,
    category: "beverage",
    ingredients: ["lemons", "sugar", "water", "mint"],
    available: true
  },
  {
    id: 6,
    name: "Fish and Chips",
    description: "Beer-battered cod with seasoned fries and coleslaw",
    price: 14.99,
    category: "entree",
    ingredients: ["cod", "beer batter", "potatoes", "coleslaw", "tartar sauce"],
    available: false
  }
];

// Define routes and implement middleware here
// GET /api/menu - Retrieve all menu items
app.get("/api/menu", (req, res) => {
  res.status(200).json(menuItems);
});

// GET /api/menu/:id - Retrieve a specific menu item
app.get("/api/menu/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = menuItems.find(menuItem => menuItem.id === id);

  if (!item) {
    return res.status(404).json({ message: "Menu item not found" });
  }

  res.status(200).json(item);
});

// POST /api/menu - Add a new menu item 
app.post("/api/menu", (req, res) => {
  const newItem = req.body;

  const newId = menuItems.length > 0
    ? menuItems[menuItems.length - 1].id + 1
    : 1;

  const itemToAdd = {
    id: newId,
    ...newItem
  };

  menuItems.push(itemToAdd);

  res.status(201).json(itemToAdd);
});

// PUT /api/menu/:id - Update an existing menu item
app.put("/api/menu/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = menuItems.findIndex(menuItem => menuItem.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({ message: "Menu item not found" });
  }

  menuItems[itemIndex] = {
    ...menuItems[itemIndex],
    ...req.body
  };

  res.status(200).json(menuItems[itemIndex]);
});

// DELETE /api/menu/:id - Remove a menu item
app.delete("/api/menu/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = menuItems.findIndex(menuItem => menuItem.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({ message: "Menu item not found" });
  }

  const deletedItem = menuItems.splice(itemIndex, 1);

  res.status(200).json({
    message: "Menu item deleted successfully",
    deletedItem: deletedItem[0]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});