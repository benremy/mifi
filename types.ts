export type Transaction = {
    id: number;
    amount: number;
    description: string;
    type: string;
    date: Date | undefined;
    bucket: string;
    user_id: string;
}  