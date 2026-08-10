import { Module } from "@nestjs/common";
import { PerfilesModule } from "../perfiles/perfiles.module";
import { AgendaController } from "./agenda.controller";
import { AgendaService } from "./agenda.service";

@Module({
  imports: [PerfilesModule],
  controllers: [AgendaController],
  providers: [AgendaService],
})
export class AgendaModule {}
