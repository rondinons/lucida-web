import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { PerfilesModule } from "./modules/perfiles/perfiles.module";
import { ConsultoriosModule } from "./modules/consultorios/consultorios.module";
import { HorariosModule } from "./modules/horarios/horarios.module";
import { TiposSesionModule } from "./modules/tipos-sesion/tipos-sesion.module";
import { PacientesModule } from "./modules/pacientes/pacientes.module";
import { AgendaModule } from "./modules/agenda/agenda.module";
import { PlantillasNotasModule } from "./modules/plantillas-notas/plantillas-notas.module";
import { ConfiguracionModule } from "./modules/configuracion/configuracion.module";
import { LeadsModule } from "./modules/leads/leads.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    PerfilesModule,
    ConsultoriosModule,
    HorariosModule,
    TiposSesionModule,
    PacientesModule,
    AgendaModule,
    PlantillasNotasModule,
    ConfiguracionModule,
    LeadsModule,
  ],
})
export class AppModule {}
