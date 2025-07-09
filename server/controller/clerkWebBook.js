import User from '../models/user.js';
import { Webhook } from "svix";

const webBook = async (req, res) => {
    try {
        const wHook = new Webhook(process.env.CLERK_WEBBOOK_SECRET);

        const headers = {
            'svix-id': req.headers['svix-id'],
            'svix-timestamp': req.headers['svix-timestamp'],
            'svix-signature': req.headers['svix-signature'],
        };

        // Clerk sends raw body as buffer — convert to string before parsing
        const payloadString = req.body.toString();
        const evt = wHook.verify(payloadString, headers);
        const { data, type } = evt;

        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: `${data.first_name} ${data.last_name}`,
            image: data.image_url,
        };

        switch (type) {
            case 'user.created':
                await User.create(userData);
                break;
            case 'user.updated':
                await User.findByIdAndUpdate(data.id, userData);
                break;
            case 'user.deleted':
                await User.findByIdAndDelete(data.id);
                break;
            default:
                break;
        }

        return res.status(200).json({ success: true, message: 'Webhook processed' });
    } catch (error) {
        console.error('Webhook error:', error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export default webBook;
