# Portfolio Website

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Responsive Design**: Optimized for all devices
- **Contact Form**: Functional contact form with email notifications
- **Newsletter Signup**: Email verification system for newsletter subscriptions
- **Image Slider**: Interactive hero section with multiple images
- **Smooth Animations**: Framer Motion animations throughout
- **Dark/Light Theme**: Customizable theming
- **SEO Optimized**: Meta tags and structured data

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Email Service**: Resend API
- **Deployment**: Vercel/Netlify

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-v3.git
cd portfolio-v3
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.local.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
# Email Configuration (Required)
RESEND_API_KEY="your_resend_api_key_here"
CONTACT_EMAIL="your_email@example.com"

# Google Sheets Configuration (Optional)
GOOGLE_SHEET_ID="your_google_sheet_id_here"
GOOGLE_CLIENT_EMAIL="your_service_account_email@project.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour_private_key_here\n-----END PRIVATE KEY-----\n"

# App Configuration
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build for production:
```bash
npm run build
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Netlify

1. Push your code to GitHub
2. Connect your GitHub repository to Netlify
3. Add environment variables in Netlify dashboard
4. Deploy

### Manual Deployment

Build and export the project:
```bash
npm run build
npm run export
```

Upload the `out/` directory to your hosting provider.

## API Routes

- `POST /api/contact` - Handle contact form submissions
- `POST /api/notify` - Handle newsletter subscriptions
- `GET /api/notify/verify/[token]` - Verify email addresses

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── sections/         # Page sections
│   └── ui/               # UI components
└── data/                 # Static data
    └── content.ts        # Site content configuration
```

## Customization

### Personal Information

Edit `src/data/content.ts` to update:
- Personal details
- Social links
- Skills
- Projects
- Experience

### Styling

- Global styles: `src/app/globals.css`
- Component styles: Individual component files
- Theme colors: Tailwind config and CSS variables

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Prashant Tiwari - [pt286355@gmail.com]

Website Link : [https://portfolio-v3-ten-gray.vercel.app/]

Project Link: [https://github.com/techy-prashant/portfolio-v3](https://github.com/techy-prashant/portfolio-v3)
