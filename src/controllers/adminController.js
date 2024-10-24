// import Permissions from "../models/Permissions.js";
// import User from "../models/User.js";
import {User, Permissions, UsersItalSectors} from '../models/associations.js'
// import UsersItalSectors from '../models/UsersItalSectors.js';
const adminController = {
    usersPage: async (req, res) => {
        try {
            // Fetch all permissions
            const allPermissions = await Permissions.findAll();
            console.log('all perm:', allPermissions); 
            // Fetch all users with associated permissions
            const allUsers = await User.findAll({
                include: [
                    {
                        model: Permissions, // The associated model
                        as: 'permissions'   // Alias defined in the association
                    },
                    {
                        model: UsersItalSectors,
                        as: 'italSectors' 
                    }
                ]
            });

            

            // Render the users and permissions to the admin page
            res.render('pages/admin/users.ejs', { permissions: allPermissions, users: allUsers });
        } catch (error) {
            console.error('Error fetching permissions and users:', error);
            res.status(500).send('Internal Server Error');
        }
    }
};

export default adminController;
