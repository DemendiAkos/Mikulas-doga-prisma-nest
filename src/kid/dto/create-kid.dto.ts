import { IsBoolean, IsDefined, IsString } from "class-validator";

export class CreateKidDto {
    @IsDefined()
    @IsString()
    name: string;

    @IsDefined()
    @IsString()
    address: string;

    @IsDefined()
    @IsBoolean()
    isGood: boolean;
}
