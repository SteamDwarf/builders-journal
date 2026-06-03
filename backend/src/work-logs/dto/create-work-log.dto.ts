import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsPositive,
    IsInt,
} from 'class-validator';

export class CreateWorkLogDto {
    @IsNotEmpty({ message: 'Укажи дату выполнения работ' })
    @IsString()
    date!: string;

    @IsNotEmpty({ message: 'Выбери вид работы из справочника' })
    @IsInt()
    workTypeId!: number;

    @IsNotEmpty({ message: 'Укажи объем выполненных работ' })
    @IsNumber()
    @IsPositive({ message: 'Объем должен быть положительным числом' })
    volume!: number;

    @IsNotEmpty({ message: 'Укажи единицу измерения' })
    @IsString()
    unit!: string;

    @IsNotEmpty({ message: 'Укажи ФИО исполнителя или бригадира' })
    @IsString()
    performerName!: string;
}
