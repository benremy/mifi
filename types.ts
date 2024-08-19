export type Transaction = {
    amount: number;
    description: string;
    type: string;
    date: Date | undefined;
    bucket: string;
    user_id: string;
}  