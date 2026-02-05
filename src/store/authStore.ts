import { create } from "zustand";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/database.types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

interface AuthState {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  isInitialized: boolean;

  initialize: () => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setRole: (role: "client" | "provider") => Promise<void>;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: ProfileUpdate) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  profile: null,
  isLoading: false,
  isInitialized: false,

  initialize: async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        set({ session, user: session.user });
        await get().fetchProfile();
      }
    } finally {
      set({ isInitialized: true });
    }

    supabase.auth.onAuthStateChange(async (_event, session) => {
      set({ session, user: session?.user ?? null });
      if (session?.user) {
        await get().fetchProfile();
      } else {
        set({ profile: null });
      }
    });
  },

  signUp: async (email, password, fullName) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      if (error) throw error;

      if (data.user) {
        // Create profile
        const { error: profileError } = await supabase
          .from("profiles")
          .insert({
            id: data.user.id,
            email,
            full_name: fullName,
          });
        if (profileError) throw profileError;
      }
    } finally {
      set({ isLoading: false });
    }
  },

  signIn: async (email, password) => {
    set({ isLoading: true });
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    set({ isLoading: true });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ session: null, user: null, profile: null });
    } finally {
      set({ isLoading: false });
    }
  },

  setRole: async (role) => {
    const userId = get().user?.id;
    if (!userId) throw new Error("No user");

    const { error } = await supabase
      .from("profiles")
      .update({ role })
      .eq("id", userId);
    if (error) throw error;

    set((state) => ({
      profile: state.profile ? { ...state.profile, role } : null,
    }));
  },

  fetchProfile: async () => {
    const userId = get().user?.id;
    if (!userId) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    if (error) throw error;

    set({ profile: data as unknown as Profile });
  },

  updateProfile: async (updates) => {
    const userId = get().user?.id;
    if (!userId) throw new Error("No user");

    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId);
    if (error) throw error;

    await get().fetchProfile();
  },
}));
