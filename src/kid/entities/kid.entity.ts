import { IsBoolean, IsDefined, IsNumber, IsString } from "class-validator";

export class Kid {
    @IsDefined()
    @IsNumber()
    kidID: number;

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
