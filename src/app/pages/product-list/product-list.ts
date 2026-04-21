import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/product';
import { ProductService } from '../../services/productservice';
import { Router } from '@angular/router';
import { CartService } from '../../services/cartservice';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  products: IProduct[] = [];
  allProducts: IProduct[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'All';
  categories: string[] = ['All'];
  noProductsError: boolean = false;
  
  constructor(
    private prodService: ProductService,
    private router: Router,
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {}

  getAll() {
    return this.prodService.getAll().subscribe({
      next: (data) => {
        this.allProducts = data;
        this.products = data;
        this.extractCategories();
        this.cdr.detectChanges();
        console.log(this.products);
      },
      error: (err) => {
        console.error('Failed to load products', err);
        this.noProductsError = true;
      }
    });
  }
  
  extractCategories() {
    const categories: string[] = [];
    
    for (let product of this.allProducts) {
      if (!categories.includes(product.category)) {
        categories.push(product.category);
      }
    }
    
    this.categories = ['All', ...categories];
  }
  
  filterProducts() {
    this.products = this.allProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory === 'All' || product.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
    this.cdr.detectChanges();
  }
  
  onSearchChange() {
    this.filterProducts();
  }
  
  onCategoryChange() {
    this.filterProducts();
  }

 
  ngOnInit(): void {
    this.getAll();
  }

  getById(id: number) {
    return this.prodService.getById(id);
  }
  
  getByCategory(cat: string) {
    return this.prodService.getByCategory(cat).subscribe(filteredProducts => {
      this.products = filteredProducts;
    });
  }
  
  logProducts() {
    console.log(this.products);
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
              this.toastService.showSuccess('Cart Updated', `${product.name} quantity updated to ${newQty}`);
            },
            error: (err) => {
              console.error(err);
              this.toastService.showError('Error', 'Failed to update cart');
            }
          });
        } else {
          const newItem = {
            userId: userIdNum,
            productId: product.id,
            quantity: quantity,
            name: product.name,
            price: product.price,
            image: product.image?.[0] 
          };
          this.cartService.addToCart(newItem).subscribe({
            next: () => {
              this.toastService.showSuccess('Added to Cart', `${product.name} added to your cart`);
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

  viewProduct(product: IProduct) {
    this.router.navigate(['/product', product.id]);
  }
}