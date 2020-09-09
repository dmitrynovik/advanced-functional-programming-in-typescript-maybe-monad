import { Maybe } from './maybe';

export interface Employee {
    id: number;
    name: string;
    supervisorId: Maybe<number>;
}
