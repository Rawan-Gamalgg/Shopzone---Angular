import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IUser } from '../../models/user';
import { Router } from '@angular/router';
import { IProduct } from '../../models/product';
import { CartService } from '../../services/cartservice';
import { ProductService } from '../../services/productservice';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  featuredProducts: IProduct[] = [];
  allProducts: IProduct[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadFeaturedProducts();
  }

  loadFeaturedProducts() {
    this.productService.getAll().subscribe({
      next: (products) => {
        this.allProducts = products;
        const sortedByRating = [...products].sort((a, b) => b.rating - a.rating);
        this.featuredProducts = sortedByRating.slice(0, 4);
        this.cdr.detectChanges()
      },
      error: (err) => {
        console.error('Error loading products', err);
      }
    });
  }

  viewProduct(product: IProduct) {
    this.router.navigate(['/products', product.id]);
  }

  addToCart(product: IProduct) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    const userIdNum = +userId;
    const quantity = 1;

    this.cartService.getCartItems(userIdNum).subscribe({
      next: (cartItems) => {
        const existingItem = cartItems.find(item => item.productId === product.id);

        if (existingItem) {
          const newQty = existingItem.quantity + quantity;
          this.cartService.updateItemQuantity(existingItem.id, newQty).subscribe({
            next: () => {
              alert(`Cart Updated!${product.name} quantity updated to ${newQty}`);
            },
            error: () => alert('Error, Failed to update cart')
          });
        } else {
          const newItem = {
            userId: userIdNum,
            productId: product.id,
            quantity: quantity,
            name: product.name,
            price: product.price,
            image: product.image[0]
          };
          this.cartService.addToCart(newItem).subscribe({
            next: () => {
              alert(`Added to Cart!  ${product.name} added to your cart`);
            },
            error: () =>   alert(`Error Failed to add to cart`)
          });
        }
      },
      error: () =>   alert(`Error Failed to load cart`)
    });
  }
  get currentUser(): IUser | null {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }
}
