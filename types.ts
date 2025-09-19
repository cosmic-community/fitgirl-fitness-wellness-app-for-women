// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Workout type
export interface Workout extends CosmicObject {
  type: 'workouts';
  metadata: {
    workout_type: 'strength' | 'yoga' | 'cardio' | 'hiit';
    duration: number;
    difficulty_level: 'beginner' | 'intermediate' | 'advanced';
    body_part_focus: string[];
    description: string;
    video_link?: string;
    thumbnail_image?: {
      url: string;
      imgix_url: string;
    };
    equipment_needed?: string[];
    calories_burned?: number;
  };
}

// Program type
export interface Program extends CosmicObject {
  type: 'programs';
  metadata: {
    goal: 'fat-loss' | 'toning' | 'strength' | 'flexibility';
    duration_weeks: number;
    difficulty_level: 'beginner' | 'intermediate' | 'advanced';
    description: string;
    schedule: {
      week: number;
      workouts: {
        day: string;
        workout: Workout;
      }[];
    }[];
    linked_workouts?: Workout[];
    program_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Nutrition tip type
export interface NutritionTip extends CosmicObject {
  type: 'nutrition-tips';
  metadata: {
    meal_idea: string;
    calories: number;
    macros: {
      protein: number;
      carbs: number;
      fat: number;
      fiber?: number;
    };
    preparation_time?: number;
    servings: number;
    ingredients?: string[];
    instructions?: string;
    meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Progress tracking type
export interface ProgressEntry extends CosmicObject {
  type: 'progress';
  metadata: {
    date: string;
    weight?: number;
    measurements?: {
      waist?: number;
      hips?: number;
      chest?: number;
      arms?: number;
      thighs?: number;
    };
    completed_workouts: string[];
    notes?: string;
    energy_level?: 1 | 2 | 3 | 4 | 5;
    mood?: 'excellent' | 'good' | 'okay' | 'tired' | 'stressed';
    photos?: {
      url: string;
      imgix_url: string;
    }[];
  };
}

// Community content type
export interface CommunityContent extends CosmicObject {
  type: 'community';
  metadata: {
    content_type: 'quote' | 'tip' | 'success-story';
    author?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    tags?: string[];
    is_featured: boolean;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isWorkout(obj: CosmicObject): obj is Workout {
  return obj.type === 'workouts';
}

export function isProgram(obj: CosmicObject): obj is Program {
  return obj.type === 'programs';
}

export function isNutritionTip(obj: CosmicObject): obj is NutritionTip {
  return obj.type === 'nutrition-tips';
}

export function isProgressEntry(obj: CosmicObject): obj is ProgressEntry {
  return obj.type === 'progress';
}

export function isCommunityContent(obj: CosmicObject): obj is CommunityContent {
  return obj.type === 'community';
}

// Utility types
export type WorkoutType = Workout['metadata']['workout_type'];
export type DifficultyLevel = Workout['metadata']['difficulty_level'];
export type ProgramGoal = Program['metadata']['goal'];
export type MealType = NutritionTip['metadata']['meal_type'];