import { createBucketClient } from '@cosmicjs/sdk'
import { 
  Workout, 
  Program, 
  NutritionTip, 
  ProgressEntry, 
  CommunityContent,
  CosmicResponse 
} from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all workouts
export async function getWorkouts(): Promise<Workout[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'workouts' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    return response.objects as Workout[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching workouts:', error);
    return [];
  }
}

// Fetch workouts by type
export async function getWorkoutsByType(type: string): Promise<Workout[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'workouts',
        'metadata.workout_type': type
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    return response.objects as Workout[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching workouts by type:', error);
    return [];
  }
}

// Fetch single workout by slug
export async function getWorkoutBySlug(slug: string): Promise<Workout | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'workouts',
        slug
      })
      .depth(1);
    
    return response.object as Workout;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching workout:', error);
    return null;
  }
}

// Fetch all programs
export async function getPrograms(): Promise<Program[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'programs' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    return response.objects as Program[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching programs:', error);
    return [];
  }
}

// Fetch single program by slug
export async function getProgramBySlug(slug: string): Promise<Program | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'programs',
        slug
      })
      .depth(1);
    
    return response.object as Program;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching program:', error);
    return null;
  }
}

// Fetch nutrition tips
export async function getNutritionTips(): Promise<NutritionTip[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'nutrition-tips' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    return response.objects as NutritionTip[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching nutrition tips:', error);
    return [];
  }
}

// Fetch community content
export async function getCommunityContent(): Promise<CommunityContent[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'community' })
      .props(['id', 'title', 'slug', 'content', 'metadata', 'created_at'])
      .depth(1);
    
    const content = response.objects as CommunityContent[];
    // Sort by created_at descending (newest first)
    return content.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching community content:', error);
    return [];
  }
}

// Create progress entry
export async function createProgressEntry(data: {
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
}): Promise<ProgressEntry | null> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'progress',
      title: `Progress - ${data.date}`,
      metadata: {
        date: data.date,
        weight: data.weight || 0,
        measurements: data.measurements || {},
        completed_workouts: data.completed_workouts,
        notes: data.notes || '',
        energy_level: data.energy_level || 3,
        mood: data.mood || 'okay'
      }
    });
    
    return response.object as ProgressEntry;
  } catch (error) {
    console.error('Error creating progress entry:', error);
    return null;
  }
}

// Fetch user progress entries
export async function getProgressEntries(): Promise<ProgressEntry[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'progress' })
      .props(['id', 'title', 'metadata', 'created_at'])
      .depth(1);
    
    const entries = response.objects as ProgressEntry[];
    // Sort by date descending (newest first)
    return entries.sort((a, b) => {
      const dateA = new Date(a.metadata.date).getTime();
      const dateB = new Date(b.metadata.date).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching progress entries:', error);
    return [];
  }
}