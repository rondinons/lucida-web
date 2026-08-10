import { Module } from "@nestjs/common";
import { PerfilesModule } from "../perfiles/perfiles.module";
import { PlantillasNotasController } from "./plantillas-notas.controller";
import { PlantillasNotasService } from "./plantillas-notas.service";

@Module({
  imports: [PerfilesModule],
  controllers: [PlantillasNotasController],
  providers: [PlantillasNotasService],
})
export class PlantillasNotasModule {}
