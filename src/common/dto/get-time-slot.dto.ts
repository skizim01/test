import { ApiProperty } from '@nestjs/swagger';

export class GetTimeSlotDto {
  @ApiProperty({ example: 120, description: 'тривалість фільму в хвилинах' })
  movieDuration: number;
  @ApiProperty({
    example: ['2023-10-20T19:00:00', '2023-10-21T15:30:00'],
    description: 'масив часу початку фільму',
  })
  movieStartTimes: string[];
}
