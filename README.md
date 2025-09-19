# FitGirl - Fitness & Wellness App for Women

![App Preview](https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=300&fit=crop&auto=format)

A comprehensive fitness platform designed specifically for women, featuring workout libraries, personalized programs, nutrition guidance, progress tracking, and community support. Built with a mobile-first, feminine design that motivates and empowers users on their wellness journey.

## ✨ Features

- **Workout Library** - Diverse collection of strength, yoga, cardio, and HIIT workouts
- **Fitness Programs** - Goal-oriented programs for fat loss, toning, strength, and flexibility
- **Progress Tracking** - Track weight, measurements, and workout completion
- **Nutrition Tips** - Healthy meal ideas with calorie and macro breakdowns
- **Community** - Daily motivation quotes, tips, and success stories
- **Mobile-First Design** - Responsive interface optimized for mobile devices
- **Video Integration** - Workout videos with thumbnail previews
- **Difficulty Levels** - Workouts categorized by beginner, intermediate, and advanced levels

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68cd2166d7c81076a7d6bce8&clone_repository=68cd22e4d7c81076a7d6bcef)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from existing content structure

### Code Generation Prompt

> Create a fitness app for girls focused on workouts and progress tracking. The app should include: Workouts (name, type: strength, yoga, cardio, HIIT, duration, difficulty level, body part focus, description, video link, thumbnail image). Programs (name, goal: fat loss, toning, strength, flexibility, schedule with weekly plan, linked workouts). Nutrition Tips (meal idea, calories, macros, image). Progress Tracking (date, weight, measurements, completed workouts). Community Section (daily motivation quotes, tips, or success stories). Make the app mobile-friendly, with a clean, feminine, and motivational design. Include sample data for at least 5 workouts, 2 programs, and 3 nutrition tips. Deploy as a responsive Next.js app.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠 Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless content management
- **Responsive Design** - Mobile-first approach

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Add your Cosmic credentials to `.env.local`:
   ```
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

5. Run the development server:
   ```bash
   bun dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Cosmic SDK Examples

### Fetch Workouts
```typescript
import { cosmic } from '@/lib/cosmic'

const workouts = await cosmic.objects
  .find({ type: 'workouts' })
  .props(['title', 'slug', 'metadata'])
  .depth(1)
```

### Fetch Programs
```typescript
const programs = await cosmic.objects
  .find({ type: 'programs' })
  .props(['title', 'slug', 'metadata'])
  .depth(1)
```

### Create Progress Entry
```typescript
await cosmic.objects.insertOne({
  type: 'progress',
  title: 'Progress Entry',
  metadata: {
    date: '2024-01-15',
    weight: 130,
    measurements: {
      waist: 28,
      hips: 36,
      arms: 11
    }
  }
})
```

## 🎯 Cosmic CMS Integration

This app uses Cosmic CMS to manage:

- **Workouts** - Exercise routines with videos, difficulty levels, and body focus areas
- **Programs** - Structured fitness plans with weekly schedules
- **Nutrition Tips** - Meal ideas with nutritional information
- **Progress Tracking** - User progress data and measurements
- **Community Content** - Motivational quotes and success stories

The content model supports rich media, relationships between content types, and flexible metadata for comprehensive fitness tracking.

## 🚀 Deployment Options

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Connect repository to Netlify
2. Set build command: `bun run build`
3. Set environment variables
4. Deploy

Remember to set your Cosmic environment variables in your deployment platform's dashboard.

<!-- README_END -->