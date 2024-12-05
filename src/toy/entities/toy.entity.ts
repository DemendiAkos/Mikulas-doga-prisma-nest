import { IsDefined, IsNumber, IsString } from "class-validator";

export class Toy {
    @IsDefined()
    @IsNumber()
    toyID: number;

    @IsDefined()
    @IsString()
    name: string;

    @IsDefined()
    @IsString()
    material: string;

    @IsDefined()
    @IsNumber()
    weight: 'wood' | 'metal' | 'plastic' | 'other';
}
