import User from '../models/user.js'
import { Webhook } from "svix";

const webBook = async (req, res) => {  // Fix: req, res as parameters
    try {
        const wHook = new Webhook(process.env.CLERK_WEBBOOK_SECRET);  // Fix: Correct spelling of Webhook
        console.log(process.env.CLERK_WEBBOOK_SECRET);

        const headers = {
            'svix-id': req.headers['svix-id'],
            'svix-timestamp': req.headers['svix-timestamp'],
            'svix-signature': req.headers['svix-signature'],
        };

        console.log('Incoming Headers:', req.headers);


        // Verifying signature to ensure it's from Clerk
        await wHook.verify(JSON.stringify(req.body), headers);

        // Getting data and type from the request body
        const { data, type } = req.body;

        const userData = {
            _id: data.id,  // Fix: use data.id (assuming it's the Clerk ID)
            email: data.email_addresses[0].email_address,
            username: data.first_name + ' ' + data.last_name,
            image: data.image_url,
            recentSearchCities: []
        };

        // Switch case to handle different events
        switch (type) {
            case 'user.created': {
                await User.create(userData);
                break;
            }
            case 'user.updated': {  
                await User.findByIdAndUpdate(data.id, userData);
                break;
            }
            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);  
                break;
            }
            default:
                break;
        }

        res.json({ success: true, message: 'Webhook Received' }); 

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

export default webBook;
