import { IsDefined, IsNumber, IsString } from "class-validator";

export class CreateToyDto {
    @IsDefined()
    @IsString()
    name: string;

    @IsDefined()
    @IsString()
    material: string;

    @IsDefined()
    @IsNumber()
    weight: number;
}
