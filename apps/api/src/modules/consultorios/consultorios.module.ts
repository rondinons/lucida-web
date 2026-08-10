import { Module } from "@nestjs/common";
import { PerfilesModule } from "../perfiles/perfiles.module";
import { ConsultoriosController } from "./consultorios.controller";
import { ConsultoriosService } from "./consultorios.service";

@Module({
  imports: [PerfilesModule],
  controllers: [ConsultoriosController],
  providers: [ConsultoriosService],
})
export class ConsultoriosModule {}
