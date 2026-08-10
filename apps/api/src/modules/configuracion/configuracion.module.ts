import { Module } from "@nestjs/common";
import { PerfilesModule } from "../perfiles/perfiles.module";
import { RecordatoriosController } from "./recordatorios.controller";
import { RecordatoriosService } from "./recordatorios.service";
import { FacturacionController } from "./facturacion.controller";
import { FacturacionService } from "./facturacion.service";

@Module({
  imports: [PerfilesModule],
  controllers: [RecordatoriosController, FacturacionController],
  providers: [RecordatoriosService, FacturacionService],
})
export class ConfiguracionModule {}
