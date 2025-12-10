/**
 * Navigation Type Definitions
 * 
 * Type-safe navigation parameter lists for all navigators.
 * This enables TypeScript autocomplete and type checking for navigation.
 */

import { NavigatorScreenParams } from '@react-navigation/native';

/**
 * Auth Stack Parameter List
 * Screens: Splash, Login, SignUp, OtpVerify, Onboarding
 */
export type AuthStackParamList = {
    Splash: undefined;
    Login: undefined;
    SignUp: undefined;
    OtpVerify: { phoneNumber: string };
    Onboarding: undefined;
};

/**
 * Home Stack Parameter List
 * Screens: Dashboard, Notifications
 */
export type HomeStackParamList = {
    Dashboard: undefined;
    Notifications: undefined;
};

/**
 * Matches Stack Parameter List
 * Screens: MatchesList, MatchDetails, CreateMatch
 */
export type MatchesStackParamList = {
    MatchesList: undefined;
    MatchDetails: { matchId: string };
    CreateMatch: undefined;
};

/**
 * Turfs Stack Parameter List
 * Screens: TurfsList, TurfDetails, BookTurf, BookingConfirmation
 */
export type TurfsStackParamList = {
    TurfsList: undefined;
    TurfDetails: { turfId: string };
    BookTurf: { turfId: string };
    BookingConfirmation: {
        bookingId: string;
        turfName: string;
        date: string;
        slot: string;
        price: number;
    };
};

/**
 * Scoring Stack Parameter List
 * Screens: ScoringHome, LiveScoring, ScoreHistory
 */
export type ScoringStackParamList = {
    ScoringHome: undefined;
    LiveScoring: { matchId: string };
    ScoreHistory: {
        matchId: string;
        teamName: string;
        runs: number;
        wickets: number;
        overs: number;
    };
};

/**
 * Learn Stack Parameter List
 * Screens: LearnHome, Tutorial, CricketRules
 */
export type LearnStackParamList = {
    LearnHome: undefined;
    LessonDetail: { lessonId: string };
    CricketRules: undefined;
};

/**
 * Profile Stack Parameter List
 * Screens: ProfileMain, EditProfile, Settings, MyMatches, MyBookings
 */
export type ProfileStackParamList = {
    ProfileMain: undefined;
    EditProfile: undefined;
    Settings: undefined;
    MyMatches: undefined;
    MyBookings: undefined;
};

/**
 * Admin Stack Parameter List
 * Screens: AdminDashboard, ManageUsers, ManageTurfs, ManageMatches
 */
export type AdminStackParamList = {
    AdminDashboard: undefined;
    ManageUsers: undefined;
    ManageTurfs: undefined;
    ManageMatches: undefined;
};

/**
 * Main Tab Navigator Parameter List
 * Bottom tabs: Home, Matches, Turfs, Learn, Profile
 */
export type MainTabParamList = {
    Home: NavigatorScreenParams<HomeStackParamList>;
    Matches: NavigatorScreenParams<MatchesStackParamList>;
    Turfs: NavigatorScreenParams<TurfsStackParamList>;
    Learn: NavigatorScreenParams<LearnStackParamList>;
    Profile: NavigatorScreenParams<ProfileStackParamList>;
};

/**
 * Root Navigator Parameter List
 * Top-level navigation: Auth, Main, Admin
 */
export type RootStackParamList = {
    Auth: NavigatorScreenParams<AuthStackParamList>;
    Main: NavigatorScreenParams<MainTabParamList>;
    Admin: NavigatorScreenParams<AdminStackParamList>;
};

/**
 * Navigation Prop Types
 * Use these types for navigation props in components
 */
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}
