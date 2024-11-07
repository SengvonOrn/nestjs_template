import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateSongsDto } from './dto/create-songs.dto';
import { UpdateSongsDto } from './dto/update-songs.dto';
import { SongsService } from './songs.service';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('songs')
export class SongsController {
  constructor(private readonly songService: SongsService) {}
  // Get /songs?city=fats
  @Get()
  getSongsfilter(@Query('city') city: 'PP' | 'CC') {
    // const service = new SongsService();
    // return service.getSongs(city);
    //---------------------------->
    return this.songService.getSongsfilter(city);
  }

  @Get(':id')
  getOneSongs(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.songService.getSongsfind(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }
  @Post()
  @UseGuards(BeltGuard)
  createSongs(@Body(new ValidationPipe()) createSongsDTO: CreateSongsDto) {
    return this.songService.createSongs(createSongsDTO);
  }

  @Put(':id')
  updateSongs(@Param('id') id: string, @Body() updateSongsDto: UpdateSongsDto) {
    return this.songService.updateSongs(+id, updateSongsDto);
  }

  @Delete(':id')
  removeSongs(@Param('id') id: string) {
    return this.songService.removeSongs(+id);
  }
}
