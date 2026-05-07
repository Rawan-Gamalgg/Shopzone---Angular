# 🛍️ ShopZone - E-Commerce Angular Application

[![Angular](https://img.shields.io/badge/Angular-21-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5-purple.svg)](https://getbootstrap.com/)
[![Status](https://img.shields.io/badge/status-completed-green.svg)]()

---

##  About The Project

**ShopZone** is a fully functional e-commerce web application built with **Angular 21**. It provides a complete shopping experience including product browsing, shopping cart management, order placement, user authentication with role-based access control (User/Admin), and a clean responsive UI.



---

##  Features

###  Authentication & Authorization
| Feature | Description |
|---------|-------------|
| Login | Email/password validation using Reactive Forms |
| Register | Password confirmation validator |
| Roles | User (shopping) & Admin (dashboard) |
| Route Protection | Auth Guards prevent unauthorized access |
| Session | Persistence via localStorage |

###  Product Management
| Feature | Description |
|---------|-------------|
| Product Grid | Responsive (3 cols desktop / 2 tablet / 1 mobile) |
| Real-time Search | Filter by product name while typing |
| Category Filter | Dropdown with unique categories + "All" option |
| Star Rating | Full, half, and empty stars display |
| Dynamic Badges | "Top Seller" (rating > 4.7), "Almost Sold Out" (stock < 3), "Out of Stock" (stock = 0) |

###  Shopping Cart
| Feature | Description |
|---------|-------------|
| Add to Cart | From product list or detail page |
| Quantity Adjustment | +/- buttons with number input |
| Auto Calculate | Subtotal and total updates automatically |
| Remove Item | SweetAlert2 confirmation dialog |
| Toast Notifications | Success/error messages for all actions |

###  Order System
| Feature | Description |
|---------|-------------|
| Place Order | Convert cart items to order |
| Order Status | pending → processing → delivered / cancelled |
| Cancel Order | Only for pending or processing status |
| Order History | View all orders with expandable item details |
| Status Badges | Color-coded for each status |

###  User Profile
| Feature | Description |
|---------|-------------|
| View Profile | Name, email, role, user ID |
| Logout | Clear localStorage and redirect to login |

###  Admin Dashboard
| Feature | Description |
|---------|-------------|
| Access Control | Only visible to users with admin role |
| Quick Actions | Add, delete, update products |

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| Angular 21 | Core framework |
| TypeScript | Programming language  |
| RxJS | Async operations, Observables |
| Reactive Forms | Login & Register forms |
| Template-Driven Forms | Cart quantity editing |
| HTTP Client | API communication |
| HTTP Interceptor | Add `Authorization: Bearer {userId}` header |
| Auth Guard | Route protection |
| Bootstrap 5 | Responsive styling |
| Font Awesome 6 | Icons |
| SweetAlert2 | Confirmation dialogs |
| JSON Server | Mock backend (development) |

