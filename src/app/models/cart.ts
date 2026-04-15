import { Product } from './product';

export class CartProduct {
    public product: Product;
    public quantity: number;

    constructor(product: Product, quantity: number = 1) {
        this.product = product;
        this.quantity = quantity;
    }
}

export class Cart {
    public user: string;
    public products: CartProduct[];
    public isPaid: boolean;
    public cartTotal: number;

    constructor(
        user: string = '',
        products: CartProduct[] = [],
        isPaid: boolean = false,
        cartTotal: number = 0
    ) {
        this.user = user;
        this.products = products;
        this.isPaid = isPaid;
        this.cartTotal = cartTotal;
    }

    addProduct(product: Product): void {
        const existingItem = this.products.find(item => item.product.name === product.name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.products.push(new CartProduct(product));
        }
        this.calculateTotal();
    }

    removeProduct(product: Product): void {
        this.products = this.products.filter(item => item.product.name !== product.name);
        this.calculateTotal();
    }

    addQuantity(product: Product): void {
        const existingItem = this.products.find(item => item.product.name === product.name);
        if (existingItem) {
            existingItem.quantity++;
        }
        this.calculateTotal();
    }

    reduceQuantity(product: Product): void {
        const existingItem = this.products.find(item => item.product.name === product.name);
        if (existingItem) {
            existingItem.quantity--;
            if (existingItem.quantity <= 0) {
                this.removeProduct(product);
            }
        }
        this.calculateTotal();
    }

    calculateTotal(): void {
        this.cartTotal = this.products.reduce(
            (total, item) => total + (item.product.price * item.quantity), 0
        );
    }

    clearCart(): void {
        this.products = [];
        this.cartTotal = 0;
    }
}
