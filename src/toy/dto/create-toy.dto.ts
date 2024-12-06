import { IsDefined, IsIn, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateToyDto {
    @IsDefined()
    @IsString()
    name: string;

    @IsDefined()
    @IsString()
    @IsIn(['wood', 'metal', 'plastic', 'other'])
    material: string;

    @IsDefined()
    @IsNumber()
    @IsPositive()
    weight: number;
}
