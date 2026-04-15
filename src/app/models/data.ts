
import { Product } from "./product";
import { Category } from "./category";
import { User } from "./user";

export const categoriesData: Category[] = [
    { id: 1, name: 'Waffles' },
    { id: 2, name: 'Crepes' },
    { id: 3, name: 'Desserts' },
    { id: 4, name: 'Ice Cream' }
];

export const productsData: Product[] = [
    new Product('waffle', '/assets/waffle.jpeg', 45, 'Belgian Waffle with a lot Choclate', 'Waffle Type: Belgian, Toppings: Chocolate Syrup, Serving: 1 person. (ID: 1)', 1),
    new Product('crep', '/assets/crep.jpg', 18, 'Frensh Crep with Nuttela', 'Crepe Size: Medium, Filling: Nutella, Origin: France. (ID: 2)', 2),
    new Product('suchi', '/assets/suchi.jpeg', 25, 'Suchie Crep with Bueno', 'Crepe Type: Sweet, Filling: Bueno Chocolate, Special: Sushi-style rolled. (ID: 3)', 2),
    new Product('choros', '/assets/choros.jpeg', 30, 'Spanish Choros with sugar', 'Serving Size: 5 pieces, Dipping Sauce: None, Special: Spanish style. (ID: 4)', 3),
    new Product('ice-cream', '/assets/icecream.jpeg', 15, 'Classic ice cream scoops served in a cone.',
        'Flavors: Vanilla, Chocolate, Strawberry. Serving: 2 Scoops. Includes a cone or cup.', 4
    ),
];

export const usersData: User[] = [
    new User('qablawih74@gmail.com', 'hassan123', 'Hassan Qablawi', '2001-01-14', 'male', undefined, true, false),
    new User('mmslh94@gmail.com', 'mosleh123', 'Mohamed Mosleh', '2000-08-25', 'male', undefined, false, false),
    new User('blocked@test.com', 'blocked123', 'Blocked User', '1995-05-15', 'female', undefined, false, true)
];
