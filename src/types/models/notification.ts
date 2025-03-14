import type { ISODateString } from '../api/common';

/**
 * Available notification types in the system
 */
export type NotificationType = 
    | 'payment_reminder'    // Payment reminder
    | 'achievement'         // Achievement reached
    | 'goal_progress'       // Progress on a goal
    | 'tip'                 // Financial tip
    | 'announcement';       // Announcement or news

/**
 * Notification origins
 */
export type NotificationOrigin = 
    | 'automatic'           // Automatically generated by the system
    | 'manual';             // Manually created by an administrator

/**
 * Notification read status
 */
export type NotificationStatus = 
    | 'unread'              // Unread
    | 'read'                // Read

/**
 * Type for notification metadata
 */
export interface NotificationMetadata {
    [key: string]: string | number | boolean | null | undefined;
}

/**
 * Interface for notifications
 */
export interface Notification {
    _id: string;
    user_id: string;
    type: NotificationType;
    title: string;
    message: string;
    status: NotificationStatus;
    origin: NotificationOrigin;
    createdAt: ISODateString;
    updatedAt: ISODateString;
    // Optional fields based on notification type
    metadata?: NotificationMetadata; // Additional metadata based on type
    expiresAt?: ISODateString; // Expiration date (optional)
    content?: string;       // Extended content for notifications like announcements. May contain HTML.
}

/**
 * Interface for user notification preferences
 */
export interface NotificationPreferences {
    inApp: {
        enabled: boolean;
        types: {
            [key in NotificationType]: boolean;
        };
    };
    email: {
        enabled: boolean;
        types: {
            [key in NotificationType]: boolean;
        };
    };
} 