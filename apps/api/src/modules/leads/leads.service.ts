import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import type { LeadInput } from "@lucida/shared";

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}

  async crear(input: LeadInput) {
    const lead = await this.prisma.client.lead.create({
      data: {
        nombre: input.nombre,
        email: input.email,
        profesion: input.profesion,
        aceptaContacto: input.aceptaContacto,
      },
    });
    return { id: lead.id };
  }
}
