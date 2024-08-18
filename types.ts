export type Transaction = {
    id: number;
    amount: number;
    description: string;
    type: string;
    date: Date | undefined;
}  