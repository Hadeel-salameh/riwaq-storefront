# RIWAQ | Bilingual E-Commerce Storefront

A modern and responsive bilingual storefront showcasing handcrafted and oriental products, with a seamless shopping experience in both Arabic and English.

## About the Project

**RIWAQ** is a bilingual e-commerce storefront designed to present handcrafted and oriental products through an elegant, user-friendly digital experience.

The project focuses on product discovery, interactive image galleries, multilingual content, responsive layouts, and database integration.

It provides users with a consistent browsing experience in both Arabic and English, with full support for Right-to-Left (RTL) and Left-to-Right (LTR) layouts.

## Key Features

### Bilingual Interface
- Full Arabic and English language support.
- Language switching between Arabic and English.
- RTL layout for Arabic.
- LTR layout for English.
- Localized product names and descriptions.
- Language-aware navigation and page content.

### Product Catalog
- Organized product listings.
- Product categories.
- Featured products section.
- Product images, descriptions, and pricing.
- Individual product detail pages.
- Related products recommendations.

### Interactive Gallery
- Product image gallery.
- Category-based image filtering.
- Enlarged image viewing.
- Image navigation.

### User Interface
- Responsive design for desktop, tablet, and mobile.
- Modern and clean visual experience.
- Smooth animations and transitions.
- User-friendly navigation.

### Database & API
- PostgreSQL database integration.
- Database operations using Drizzle ORM.
- API endpoint for retrieving products.
- Database health-check endpoint.

## Technology Stack

| Category | Technologies |
|---|---|
| Frontend Framework | Next.js 16 |
| UI Library | React 19 |
| Programming Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide React |
| Database | PostgreSQL |
| ORM | Drizzle ORM |

## Project Structure

```text
RIWAQ/
├── public/
├── scripts/
├── src/
│   ├── app/
│   ├── db/
│   └── lib/
├── .gitignore
├── README.md
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- PostgreSQL

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/USERNAME/riwaq-storefront.git
```

**2. Navigate to the project directory**

```bash
cd riwaq-storefront
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a local `.env` file and configure the required environment variables.

Example:

```env
DATABASE_URL=your_database_connection_string
```

Never commit your actual `.env` file or expose database credentials.

**5. Run the development server**

```bash
npm run dev
```

**6. Open the application**

Visit:

```text
http://localhost:3000
```

## Project Scope

RIWAQ currently focuses on the storefront and product catalog experience.

The following full e-commerce capabilities are not currently implemented:

- Functional shopping cart.
- User registration and authentication.
- Order management.
- Online payment processing.

## Project Goals

This project demonstrates practical experience in:

- Building modern web applications with Next.js and React.
- Developing bilingual interfaces.
- Implementing RTL and LTR layouts.
- Creating responsive and interactive user interfaces.
- Integrating PostgreSQL databases using Drizzle ORM.
- Organizing product data and building API endpoints.

## Project Status

**Current Status:** Storefront and product catalog implementation.

---

**RIWAQ**  
*A digital experience celebrating handcrafted and oriental products.*

Developed as a web development portfolio project.