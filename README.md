# Gearboxe Market Platform

A modern SaaS platform for connecting car sellers and buyers at monthly popup events in the Raleigh area.

## Features

- **Seller Dashboard**: Create vehicle listings, manage registrations, view QR codes
- **Buyer Experience**: Browse vehicles, filter by criteria, message sellers
- **Admin Panel**: Approve listings, manage events, QR code check-in system
- **Event Management**: Create and manage monthly car market events
- **Payment Processing**: Stripe integration for vendor registration fees
- **Real-time Messaging**: Internal messaging system between buyers and sellers
- **QR Code System**: Generate and scan QR codes for event check-in

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Convex (database + real-time functions)
- **Authentication**: Clerk
- **Payments**: Stripe
- **File Storage**: Convex file storage
- **QR Codes**: qrcode library, @yudiel/react-qr-scanner

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Convex account
- Clerk account
- Stripe account

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd car-market
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Fill in your environment variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_JWT_ISSUER_DOMAIN=https://verb-noun-00.clerk.accounts.dev
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/myAccount
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/myAccount

# Convex
CONVEX_DEPLOYMENT=your_convex_deployment_url
NEXT_PUBLIC_CONVEX_URL=your_convex_url

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Set up Convex:

```bash
npx convex dev
```

5. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard pages
│   ├── dashboard/         # Seller dashboard pages
│   ├── events/            # Public event pages
│   ├── vehicles/          # Public vehicle pages
│   └── api/               # API routes
├── components/
│   └── ui/                # Reusable UI components
├── lib/                   # Utility functions
└── convex/               # Convex backend functions
```

## Key Features

### Seller Flow

1. Create account and vehicle listing
2. Upload photos and vehicle details
3. Choose event and pay vendor fee
4. Receive QR code for event check-in
5. Manage listings and messages

### Buyer Flow

1. Browse approved vehicle listings
2. Filter by make, model, price, year, mileage
3. View vehicle details and photos
4. Message sellers through internal system
5. RSVP for events

### Admin Flow

1. Review and approve/reject vehicle listings
2. Create and manage events
3. View event registrations and capacity
4. Use QR scanner for event check-in
5. Monitor platform statistics

## Deployment

### Vercel Deployment

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Convex Deployment

1. Deploy Convex functions:

```bash
npx convex deploy
```

2. Set up production environment variables
3. Configure webhooks for production URLs

## Environment Variables

| Variable                             | Description             | Required |
| ------------------------------------ | ----------------------- | -------- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`  | Clerk publishable key   | Yes      |
| `CLERK_SECRET_KEY`                   | Clerk secret key        | Yes      |
| `CLERK_JWT_ISSUER_DOMAIN`            | Clerk JWT issuer domain | Yes      |
| `CLERK_WEBHOOK_SECRET`               | Clerk webhook secret    | Yes      |
| `NEXT_PUBLIC_CONVEX_URL`             | Convex deployment URL   | Yes      |
| `CONVEX_DEPLOYMENT`                  | Convex deployment ID    | Yes      |
| `STRIPE_SECRET_KEY`                  | Stripe secret key       | Yes      |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key  | Yes      |
| `STRIPE_WEBHOOK_SECRET`              | Stripe webhook secret   | Yes      |
| `NEXT_PUBLIC_APP_URL`                | App URL for redirects   | Yes      |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@gearboxemarket.com or create an issue in the repository.
