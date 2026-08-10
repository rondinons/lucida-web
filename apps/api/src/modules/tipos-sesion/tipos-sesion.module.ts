import { Module } from "@nestjs/common";
import { PerfilesModule } from "../perfiles/perfiles.module";
import { TiposSesionController } from "./tipos-sesion.controller";
import { TiposSesionService } from "./tipos-sesion.service";

@Module({
  imports: [PerfilesModule],
  controllers: [TiposSesionController],
  providers: [TiposSesionService],
})
export class TiposSesionModule {}
