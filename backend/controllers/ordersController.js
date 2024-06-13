const Checkout = require('../models/checkoutModel');
const CheckoutItem = require('../models/checkoutItemsModel');

async function createCheckout(req, res) {
    console.log(req.body);
    const { userId, firstName, lastName, address, city, zip, total, items } = req.body;
    
    try {
        const newCheckout = new Checkout(null, userId, firstName, lastName, address, city, zip, total);
        await newCheckout.save();

        for (const item of items) {
           const newItem = new CheckoutItem(null, newCheckout.checkoutId, item.productId, item.quantity);
            await newItem.save();
        }
        
        res.status(201).json({
            message: 'Checkout erfolgreich abgeschlossen',
        });
    } catch (error) {
        res.status(500).json({ message: `Fehler beim Erstellen des Checkouts 33: ${error.message}` });
    }
};

async function getCheckoutById(req, res) {
    const { checkoutId } = req.params;

    try {
        const checkout = await Checkout.getById(checkoutId);
        const items = await CheckoutItem.getByCheckoutId(checkoutId);

        res.status(200).json({ checkout, items });
    } catch (error) {
        res.status(500).json({ message: `Fehler beim Abrufen des Checkouts: ${error.message}` });
    }
};
async function getAllCheckouts(req, res) {
    try {
        const checkouts = await Checkout.getAll();
        console.log(checkouts );
        const checkoutsWithItems = await Promise.all(checkouts.map(async (checkout) => {
            const items = await CheckoutItem.getByCheckoutId(checkout.checkoutId);
            return { ...checkout, items };
        }));

        res.status(200).json(checkoutsWithItems);
    } catch (error) {
        res.status(500).json({ message: `Fehler beim Abrufen der Checkouts: ${error.message}` });
    }
}

module.exports = {
    createCheckout,
    getCheckoutById,
    getAllCheckouts

};