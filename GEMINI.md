# Project Context: Thiệp Cưới Hạnh & Tín

This document provides a comprehensive overview of the "Thiệp Cưới Hạnh & Tín" project to help AI assistants (like Gemini) understand the architecture, purpose, and key files of the repository.

## 💍 Overview

This is a modern, responsive, and personalized electronic wedding invitation website built for the couple Hạnh and Tín. It is designed to replace or complement traditional paper invitations.

**Key Features:**
1.  **Multi-side Support (Đa giao diện):** The app dynamically adjusts its content, titles ("Lễ Vu Quy" vs "Lễ Thành Hôn"), event details, and banking information based on whether the guest is invited by the Bride's family (Nhà Gái) or the Groom's family (Nhà Trai).
2.  **Personalized Invitations:** Each guest receives a unique link with their name explicitly mentioned on the invitation.
3.  **Admin Dashboard (`/admin`):** A secure or hidden page to generate personalized guest links and track whether guests have viewed the invitation (status tracking).
4.  **Interactive Elements:** Features a countdown timer, photo gallery, interactive map (Google Maps embed), and digital gifting options (QR codes for bank transfers).
5.  **Guestbook/Wishes:** Allows guests to leave well wishes online.

## 🛠 Tech Stack

-   **Framework:** Next.js 15 (App Router)
-   **Styling:** Tailwind CSS
-   **Animations:** Framer Motion
-   **Icons:** Lucide React
-   **Database/Backend:** Firebase Firestore (used for link generation and view tracking)
-   **Language:** TypeScript

## 📁 Repository Structure

The main application code resides in the `code/` directory.

```
code/
├── app/
│   ├── [side]/            # Dynamic route handling the core invitation UI ('bride' or 'groom')
│   │   └── page.tsx       # Renders the <WeddingPage /> component with side-specific data
│   ├── admin/             # Admin dashboard for link generation and tracking
│   ├── layout.tsx         # Root layout (fonts, global styles)
│   └── page.tsx           # Likely a redirect or landing page
├── components/            # Reusable UI components (layout, UI elements, sections)
├── lib/                   # Utility functions and configuration
│   ├── config/
│   │   └── wedding.ts     # ⚠️ CRITICAL: The single source of truth for all wedding data (names, dates, venues, bank details)
│   └── types.ts           # TypeScript interfaces and types
├── public/                # Static assets (images, QR codes)
│   └── images/
│       ├── couple/        # Main photos of the couple
│       ├── gallery/       # Pre-wedding photo gallery
│       └── qr-*.png       # Bank transfer QR codes
├── firebase.json          # Firebase configuration
└── firestore.rules        # Firestore security rules
```

## 📝 Key Files to Know

1.  **`code/lib/config/wedding.ts`**: This is the most important file for content updates. It contains two main objects (`bride` and `groom`) defining the ceremony title, event dates (solar and lunar), venues, maps links, and bank details. It also defines the gallery image structure.
2.  **`code/app/[side]/page.tsx`**: The main entry point for the guest-facing invitation. It receives the `side` parameter ('bride' or 'groom'), looks up the corresponding data in `wedding.ts`, and renders the UI.
3.  **`code/app/admin/page.tsx`**: The control center for managing guests. It interacts with Firebase to store guest names, generate shareable links, and read view statuses.

## 🚀 Development Workflow

1.  **Environment:** Ensure Node.js is installed.
2.  **Install:** Run `npm install` inside the `code/` directory.
3.  **Run Locally:** Execute `npm run dev` in the `code/` directory to start the Next.js development server.
4.  **Configuration:** If updating any real-world wedding details (time, place), modify `code/lib/config/wedding.ts` first.
5.  **Firebase:** Note that the project relies on Firebase Firestore. For local development or testing the admin features, valid Firebase credentials/configuration might be required in `.env.local` (if applicable) or initialized in the Firebase lib.

## 💡 AI Assistant Instructions

When working on this project:
-   **Always refer to `code/lib/config/wedding.ts`** before modifying any text related to dates, names, or locations.
-   When styling components, stick to **Tailwind CSS** utility classes to maintain consistency.
-   When adding interactivity, consider using **Framer Motion** for smooth transitions, matching the existing "premium" aesthetic.
-   Ensure any new UI features work seamlessly on both mobile and desktop (responsive design is critical for wedding invitations as most guests view them on phones).
