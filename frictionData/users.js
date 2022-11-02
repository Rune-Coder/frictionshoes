import bcrypt from 'bcryptjs';

const users = [
    {
        name: "Admin",
        mobile: "9999999999",
        email: "admin@example.com",
        password: bcrypt.hashSync("friction@123", 10),
        gender: "Male",
        isAdmin: true
    },
    {
        name: "user",
        mobile: "9000000000",
        email: "user@example.com",
        password: bcrypt.hashSync("friction@123", 10),
        gender: "Male"
    }
];

export default users;