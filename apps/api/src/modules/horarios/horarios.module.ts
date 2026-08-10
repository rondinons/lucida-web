import { Module } from "@nestjs/common";
import { PerfilesModule } from "../perfiles/perfiles.module";
import { HorariosController } from "./horarios.controller";
import { HorariosService } from "./horarios.service";

@Module({
  imports: [PerfilesModule],
  controllers: [HorariosController],
  providers: [HorariosService],
})
export class HorariosModule {}
