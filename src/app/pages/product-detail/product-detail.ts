import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/productservice';
import { CartService } from '../../services/cartservice';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  product!: IProduct;
  quantity = 1;
  mainImageIndex = 0;
  quantityError: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {}

  loadProduct(productId: number) {
    this.productService.getById(productId).subscribe({
      next: (data) => {
        this.product = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = Number(params.get('id'));
      if (productId) {
        this.loadProduct(productId);
      }
    });
  }

  changeMainImage(index: number) {
    this.mainImageIndex = index;
  }

  onQuantityChange() {
    if (this.quantity < 1) {
      this.quantityError = 'Quantity cannot be less than 1';
      this.quantity = 1;
    } else if (this.quantity > this.product.stock) {
      this.quantityError = `Maximum quantity is ${this.product.stock}`;
      this.quantity = this.product.stock;
    } else {
      this.quantityError = '';
    }
  }

  getStarArray(rating: number): string[] {
    const stars: string[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) stars.push('full');
    if (hasHalfStar) stars.push('half');
    while (stars.length < 5) stars.push('empty');
    
    return stars;
  }

  addToCart(product: IProduct) {
    if (this.quantity < 1 || this.quantity > product.stock) {
      this.quantityError = `Please enter a quantity between 1 and ${product.stock}`;
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }

    const userIdNum = +userId;
    const quantityToAdd = this.quantity;

    this.cartService.getCartItems(userIdNum).subscribe({
      next: (cartItems) => {
        const existingItem = cartItems.find(item => item.productId === product.id);
        if (existingItem) {
          const newQty = existingItem.quantity + quantityToAdd;
          this.cartService.updateItemQuantity(existingItem.id, newQty).subscribe({
            next: () => {
              this.toastService.showSuccess('Cart Updated', `${product.name} quantity updated to ${newQty}`);
              this.quantity = 1;
            },
            error: (err) => {
              console.error(err);
              this.toastService.showError('Error', 'Failed to update cart');
              this.cdr.detectChanges();

            }
          });
        } else {
          const newItem = {
            userId: userIdNum,
            productId: product.id,
            quantity: quantityToAdd,
            name: product.name,
            price: product.price,
            image: product.image[0] 
          };
          this.cartService.addToCart(newItem).subscribe({
            next: () => {
              this.toastService.showSuccess('Added to Cart', `${quantityToAdd} x ${product.name} added to your cart`);
              this.quantity = 1;
              this.cdr.detectChanges();
            },
            
            error: (err) => {
              console.error(err);
              this.toastService.showError('Error', 'Failed to add to cart');
              this.cdr.detectChanges();

            }
          });
        }
      },
      error: (err) => {
        console.error('Failed to load cart', err);
        this.toastService.showError('Error', 'Failed to load cart');
        this.cdr.detectChanges();

      }
    });
  }

  getByCategory(cat: string) {
    this.router.navigate(['/products'], { queryParams: { category: cat } });
  }
}