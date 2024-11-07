import { Injectable, Redirect } from '@nestjs/common';
import { CreateSongsDto } from './dto/create-songs.dto';
import { UpdateSongsDto } from './dto/update-songs.dto';

@Injectable()
export class SongsService {
  private songs = [
    { id: 1, name: 'John', city: 'Phnom penh' },
    { id: 2, name: 'Nana', city: 'Sway Reang' },
  ];

  getSongsfilter(ci?: 'PP' | 'CC') {
    if (ci) {
      return this.songs.filter((song) => song.city === ci);
    }
    return this.songs;
  }
  // ====================================================>
  getSongsfind(id: number) {
    const songs = this.songs.find((song) => song.id == id);
    if (!songs) {
      throw new Error('songs not found');
    }
    return songs;
  }
  // =======================================================>

  createSongs(createSongsDto: CreateSongsDto) {
    const newSongs = {
      ...createSongsDto,
      id: Date.now(),
    };
    this.songs.push(newSongs);
    return newSongs;
  }
  // // =====================================================>
  updateSongs(id: number, updateSongsDto: UpdateSongsDto) {
    this.songs = this.songs.map((song) => {
      if (song.id === id) {
        return { ...song, ...updateSongsDto };
      }
      return song;
    });
    return this.getSongsfind(id);
  }

  //=======================================================>

  removeSongs(id: number) {
    const toBeRemoved = this.getSongsfind(id);
    this.songs = this.songs.filter((song) => song.id !== id);
    return toBeRemoved;
  }
}
