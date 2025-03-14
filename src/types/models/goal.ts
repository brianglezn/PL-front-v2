import type { ISODateString } from '../api/common';

export interface Goal {
    _id: string;
    user_id: string;
    name: string;
    type: GoalType;
    targetAmount: number;
    currentAmount: number;
    deadline?: ISODateString;
    history: GoalHistory[];
    createdAt: ISODateString;
    updatedAt: ISODateString;
}

export type GoalType = 'Saving' | 'Investment' | 'Goal' | 'Debt';

export interface GoalHistory {
    date: ISODateString;
    amount: number;
} 
