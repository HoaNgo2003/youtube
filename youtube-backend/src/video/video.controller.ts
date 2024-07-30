import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Req, Request, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateVideoDto } from './dto/video.create.dto';
import { Video } from './entity/video.entity';
import { VideoService } from './video.service';
 
 
import { UpdateVideoDto } from './dto/update.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { storageconfig } from 'src/helpers/config';
import { extname } from 'path';

@ApiTags("Video")
@Controller('video')
export class VideoController {
  constructor(private videoService: VideoService){}
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('file',{storage: storageconfig('image-folder')  }),
  // FileInterceptor('video', {storage: storageconfig('video-folder')})
   
)
  createVideo(@Body() ceateVideoDto: CreateVideoDto, @Req() request,@UploadedFile() file:Express.Multer.File): Promise<Video>{
   
    ceateVideoDto = {...ceateVideoDto, image: file.destination+"/"+file.filename}
    return this.videoService.create(request['user'].email,ceateVideoDto);
  }
  @Get()
  findAll():Promise<any>{
    return this.videoService.findAllVideo();
  }
  @Get(':id')
  getVideoById(@Param("id") id: string):Promise<Video>{
    return this.videoService.findVideoById(id)
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch("/update/:id")
  updateVideo(@Param("id") id: string, @Body() updateVideo: UpdateVideoDto): Promise<any>{
    return this.videoService.updateVideo(id, updateVideo);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete("/delete/:id")
  deleteVideo(@Param("id") id: string):Promise<any>{
    return this.videoService.deleteVideo(id);
  }


  // @Post('upload-video-image/:id')
  // // @UseGuards(AuthGuard)
  // uploadVideo(@Param('id') id: string,@Request() req:any, @UploadedFile() file: Express.Multer.File ){
  //   if(req.fileValidationError){
  //     throw new BadRequestException(req.fileValidationError)
  //   }
  //   if(!file){
  //     throw new BadRequestException('File not found')
  //   }
  //   this.videoService.updateVideoLink(id, file.destination+'/'+file.filename)
  // }
}
