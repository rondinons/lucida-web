import { Module } from "@nestjs/common";
import { PerfilesModule } from "../perfiles/perfiles.module";
import { PacientesController } from "./pacientes.controller";
import { PacientesService } from "./pacientes.service";

@Module({
  imports: [PerfilesModule],
  controllers: [PacientesController],
  providers: [PacientesService],
  exports: [PacientesService],
})
export class PacientesModule {}
